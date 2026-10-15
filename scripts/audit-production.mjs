import { mkdir, writeFile, readFile } from 'node:fs/promises';

const siteConfig = await readFile('src/app/core/config/site.config.ts', 'utf8');
const canonicalBase = siteConfig.match(/url:\s*'([^']+)'/)?.[1];
if (!canonicalBase) throw new Error('SITE_CONFIG.url is missing');
const base = process.env['AUDIT_BASE_URL'] ?? canonicalBase;
const phase = process.env['AUDIT_PHASE'] ?? 'production';
if (!/^[a-z0-9-]+$/.test(phase)) throw new Error('Use a simple phase name');
const decode = (text) => text.replaceAll('&amp;', '&').replaceAll('&quot;', '"');
const attr = (tag, name) => decode(tag.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1] ?? '');
const results = {
  phase,
  base,
  date: new Date().toISOString(),
  pages: [],
  assets: [],
  issues: [],
  robots: '',
  sitemap: '',
  httpsRedirect: null,
};
const check = (valid, message) => {
  if (!valid) results.issues.push(message);
};
const get = async (pathname) => {
  const start = performance.now();
  const response = await fetch(new URL(pathname, base), {
    headers: { 'Accept-Encoding': 'br, gzip' },
    signal: AbortSignal.timeout(20000),
  });
  const headersMs = performance.now() - start;
  const buffer = Buffer.from(await response.arrayBuffer());
  return {
    response,
    buffer,
    headersMs,
    headers: Object.fromEntries(
      [
        'content-type',
        'content-encoding',
        'cache-control',
        'strict-transport-security',
        'x-content-type-options',
        'referrer-policy',
        'permissions-policy',
        'content-security-policy',
        'x-vercel-cache',
      ].map((key) => [key, response.headers.get(key)]),
    ),
  };
};
const routes = [
  [
    '/',
    'Oscar Hinjos | Frontend Engineer | Angular & TypeScript',
    ['Person', 'WebSite', 'ProfilePage'],
  ],

  ['/design-system', 'Design System | Oscar Hinjos', []],
  ['/ruta-inexistente', 'Página no encontrada | Oscar Hinjos', []],
];
const hashedAssets = new Set();
for (const [route, title, types] of routes) {
  const { response, buffer, headersMs, headers } = await get(route);
  const html = buffer.toString();
  const metas = html.match(/<meta\b[^>]*>/gi) ?? [];
  const meta = (key) => {
    const tags = metas.filter((tag) => attr(tag, 'name') === key || attr(tag, 'property') === key);
    return { count: tags.length, value: attr(tags[0] ?? '', 'content') };
  };
  const canonical = (html.match(/<link\b[^>]*>/gi) ?? [])
    .filter((tag) => attr(tag, 'rel') === 'canonical')
    .map((tag) => attr(tag, 'href'));
  const schemas = [
    ...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi),
  ];
  const robots =
    route === '/ruta-inexistente'
      ? 'noindex,nofollow'
      : types.length
        ? 'index,follow'
        : 'noindex,follow';
  check(
    response.status === (route === '/ruta-inexistente' ? 404 : 200),
    `${route}: HTTP ${response.status}`,
  );
  check(decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '') === title, `${route}: title`);
  check(
    /<h1\b/.test(html) && !/<app-root><\/app-root>/.test(html),
    `${route}: missing static content`,
  );
  check(meta('robots').value === robots, `${route}: robots`);
  if (route === '/ruta-inexistente') check(canonical.length === 0, '404 still has canonical');
  else
    check(canonical.length === 1 && canonical[0] === canonicalBase + route, `${route}: canonical`);
  const metadata = {};
  for (const key of [
    'description',
    'og:title',
    'og:description',
    'og:type',
    'og:url',
    'og:image',
    'og:image:alt',
    'og:image:width',
    'og:image:height',
    'twitter:card',
    'twitter:title',
    'twitter:description',
    'twitter:image',
    'twitter:image:alt',
  ]) {
    const value = meta(key);
    metadata[key] = value;
    if (types.length) check(value.count === 1 && value.value.length > 0, `${route}: ${key}`);
  }
  if (types.length) {
    check(
      meta('og:image:width').value === '1200' && meta('og:image:height').value === '630',
      `${route}: OG dimensions`,
    );
    check(meta('og:url').value === canonicalBase + route, `${route}: og:url`);
    check(meta('twitter:card').value === 'summary_large_image', `${route}: Twitter card`);
    check(schemas.length === 1, `${route}: JSON-LD count`);
  }
  const parsedSchemas = [];
  for (const script of schemas) {
    try {
      parsedSchemas.push(JSON.parse(script[1]));
    } catch {
      check(false, `${route}: invalid JSON-LD`);
    }
  }
  if (types.length)
    check(
      JSON.stringify(parsedSchemas[0]?.['@graph']?.map((node) => node['@type'])) ===
        JSON.stringify(types),
      `${route}: schema types`,
    );
  for (const tag of html.match(/<(?:script|link)\b[^>]*>/gi) ?? []) {
    const src = attr(tag, 'src') || attr(tag, 'href');
    if (/^(?:main|chunk|styles)-[^/]+\.(?:js|css)$/.test(src)) hashedAssets.add('/' + src);
  }
  results.pages.push({
    route,
    status: response.status,
    url: response.url,
    headersMs,
    htmlBytes: buffer.length,
    headers,
    title,
    canonical,
    robots,
    metadata,
    schemas: parsedSchemas,
    staticH1: decode(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  });
}
for (const pathname of [
  '/robots.txt',
  '/sitemap.xml',
  '/favicon.svg',
  '/assets/cv-oscar-hinjos.pdf',
  '/assets/og/home.png',
  ...hashedAssets,
]) {
  const { response, buffer, headersMs, headers } = await get(pathname);
  check(response.status === 200, `${pathname}: HTTP ${response.status}`);
  const entry = { pathname, status: response.status, bytes: buffer.length, headersMs, headers };
  if (pathname.includes('/og/')) {
    check(headers['content-type']?.includes('image/png'), `${pathname}: MIME`);
    check(
      buffer.length > 24 && buffer.readUInt32BE(16) === 1200 && buffer.readUInt32BE(20) === 630,
      `${pathname}: PNG dimensions`,
    );
    entry.dimensions = [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
  }
  if (pathname.endsWith('.pdf'))
    check(
      headers['content-type']?.includes('application/pdf') &&
        buffer.subarray(0, 5).toString() === '%PDF-',
      'CV MIME/header',
    );
  if (pathname === '/robots.txt') {
    results.robots = buffer.toString();
    check(
      results.robots.includes(`Sitemap: ${canonicalBase}/sitemap.xml`) &&
        results.robots.includes('Allow: /'),
      'robots.txt content',
    );
  }
  if (pathname === '/sitemap.xml') {
    results.sitemap = buffer.toString();
    check(
      /<urlset\b[^>]*xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9"/.test(
        results.sitemap,
      ) && /<\/urlset>\s*$/.test(results.sitemap),
      'XML root',
    );
    check(
      JSON.stringify(
        [...results.sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]),
      ) === JSON.stringify(routes.slice(0, 1).map((route) => canonicalBase + route[0])),
      'Sitemap URLs',
    );
  }
  results.assets.push(entry);
}
if (base.startsWith('https:')) {
  const response = await fetch(base.replace('https:', 'http:'), {
    redirect: 'manual',
    signal: AbortSignal.timeout(20000),
  });
  results.httpsRedirect = { status: response.status, location: response.headers.get('location') };
  check(
    [301, 302, 307, 308].includes(response.status) &&
      response.headers.get('location')?.startsWith('https:'),
    'HTTP -> HTTPS redirect',
  );
}
await mkdir('reports/final-audit', { recursive: true });
await writeFile(`reports/final-audit/http-${phase}.json`, JSON.stringify(results, null, 2));
console.log(
  `${phase}: ${results.pages.length} pages, ${results.assets.length} assets, ${results.issues.length} issues`,
);
console.log(JSON.stringify(results.issues));
if (results.issues.length) process.exitCode = 1;
