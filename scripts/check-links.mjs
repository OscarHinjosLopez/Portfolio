import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { browserOutput, startStaticServer } from './static-server.mjs';

const base = process.env['AUDIT_BASE_URL'] ?? 'http://127.0.0.1:4173';
const server = process.env['AUDIT_BASE_URL'] ? undefined : await startStaticServer();
const phase = process.env['AUDIT_PHASE'] ?? 'local-candidate';
assert.match(phase, /^[a-z0-9-]+$/);
const external = process.env['CHECK_EXTERNAL'] === '1';
const root = await browserOutput();
const profileConfig = await readFile('src/app/core/config/profile.config.ts', 'utf8');
const email = profileConfig.match(/email:\s*'([^']+)'/)?.[1];
const decode = (text) => text.replaceAll('&amp;', '&').replaceAll('&quot;', '"');
const attr = (tag, name) => decode(tag.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1] ?? '');
const routes = ['/', '/design-system'];
const results = { phase, base, routes: [], links: [], resources: [], external: [], issues: [] };
const pages = new Map();
const getPage = async (url) => {
  const normalized = new URL(url);
  normalized.hash = '';
  normalized.search = '';
  if (!pages.has(normalized.href)) {
    const response = await fetch(normalized, { signal: AbortSignal.timeout(20000) });
    pages.set(normalized.href, { status: response.status, html: await response.text() });
  }
  return pages.get(normalized.href);
};
const check = (valid, message) => {
  if (!valid) results.issues.push(message);
};
const destinations = new Set();
const assets = new Set([
  '/robots.txt',
  '/sitemap.xml',
  '/favicon.svg',
  '/assets/cv-oscar-hinjos.pdf',
  '/assets/og/home.png',
]);
try {
  for (const route of routes) {
    const page = await getPage(new URL(route, base));
    results.routes.push({ route, status: page.status, bytes: Buffer.byteLength(page.html) });
    check(page.status === 200, `${route}: HTTP ${page.status}`);
    for (const tag of page.html.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) ?? []) {
      const href = attr(tag, 'href');
      if (!href) continue;
      const label = decode(
        tag
          .replace(/<[^>]*>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim(),
      );
      const url = new URL(href, new URL(route, base));
      const type = href.startsWith('mailto:')
        ? 'MAILTO'
        : attr(tag, 'download')
          ? 'DOWNLOAD'
          : url.origin !== new URL(base).origin
            ? 'EXTERNAL'
            : url.hash
              ? 'ANCHOR'
              : 'INTERNAL';
      results.links.push({
        route,
        href,
        type,
        label,
        target: attr(tag, 'target'),
        rel: attr(tag, 'rel'),
      });
      if (type === 'MAILTO') {
        check(href === `mailto:${email}`, 'Unexpected contact address');
        continue;
      }
      if (type === 'EXTERNAL') {
        destinations.add(url.href);
        if (attr(tag, 'target') === '_blank')
          check(
            /\bnoopener\b/.test(attr(tag, 'rel')) && /\bnoreferrer\b/.test(attr(tag, 'rel')),
            `Unsafe external link ${href}`,
          );
        continue;
      }
      if (type === 'DOWNLOAD') {
        assets.add(url.pathname);
        continue;
      }
      const destination = await getPage(url);
      check(destination.status === 200, `Broken link ${route} -> ${href}`);
      if (url.hash) {
        const id = decodeURIComponent(url.hash.slice(1));
        check(
          (destination.html.match(/\bid="([^"]+)"/g) ?? []).some((value) => value === `id="${id}"`),
          `Missing anchor ${href}`,
        );
      }
    }
    for (const tag of page.html.match(/<img\b[^>]*>/gi) ?? []) {
      assets.add(new URL(attr(tag, 'src'), base).pathname);
      for (const entry of attr(tag, 'srcset').split(','))
        if (entry.trim()) assets.add(new URL(entry.trim().split(/\s+/)[0], base).pathname);
    }
  }
  for (const asset of assets) {
    const response = await fetch(new URL(asset, base), { signal: AbortSignal.timeout(20000) });
    const buffer = Buffer.from(await response.arrayBuffer());
    const entry = {
      asset,
      status: response.status,
      type: response.headers.get('content-type'),
      bytes: buffer.length,
      cache: response.headers.get('cache-control'),
    };
    check(response.status === 200 && buffer.length > 0, `Asset unavailable: ${asset}`);
    if (asset.endsWith('.pdf')) {
      check(entry.type?.includes('application/pdf'), 'CV Content-Type');
      check(
        buffer.subarray(0, 5).toString() === '%PDF-' &&
          buffer.subarray(-1024).toString().includes('%%EOF'),
        'CV PDF structure',
      );
      const local = await readFile(`${root}${asset}`);
      entry.sha256 = createHash('sha256').update(buffer).digest('hex');
      check(
        entry.sha256 === createHash('sha256').update(local).digest('hex'),
        'Public CV differs from supplied PDF',
      );
    }
    if (asset.includes('/og/')) {
      check(entry.type?.includes('image/png'), `OG Content-Type ${asset}`);
      check(
        buffer.length > 24 && buffer.readUInt32BE(16) === 1200 && buffer.readUInt32BE(20) === 630,
        `OG dimensions ${asset}`,
      );
    }
    results.resources.push(entry);
  }
  if (external)
    for (const url of destinations) {
      try {
        const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
        results.external.push({
          url,
          status: response.status,
          finalUrl: response.url,
          manualReview: response.status >= 400,
        });
      } catch (error) {
        results.external.push({ url, error: error.message, manualReview: true });
      }
    }
  await mkdir('reports/final-audit', { recursive: true });
  await writeFile(`reports/final-audit/links-${phase}.json`, JSON.stringify(results, null, 2));
  console.log(
    `${phase}: ${results.links.length} visible links, ${results.resources.length} resources; ${results.issues.length} internal issues`,
  );
  if (external) console.log('External checks:', JSON.stringify(results.external));
  assert.deepEqual(results.issues, []);
} finally {
  if (server) await new Promise((resolve) => server.close(resolve));
}
