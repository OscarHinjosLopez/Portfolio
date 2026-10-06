import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const config = JSON.parse(await readFile('angular.json', 'utf8'));
const project = Object.values(config.projects).find(
  (project) => project.projectType === 'application',
);
const build = project.architect.build;
const options = { ...build.options, ...build.configurations[build.defaultConfiguration] };
const output = options.outputPath;
assert.ok(output, 'Set an explicit outputPath in angular.json');
const root =
  typeof output === 'string'
    ? path.join(output, 'browser')
    : path.join(output.base, output.browser ?? 'browser');
const source = await readFile('src/app/core/config/site.config.ts', 'utf8');
const origin = source.match(/url:\s*'([^']+)'/)?.[1];
assert.ok(origin);
const routes = [
  [
    '/',
    'Oscar Hinjos | Frontend Engineer | Angular & TypeScript',
    'Frontend',
    ['Person', 'WebSite', 'ProfilePage'],
    'home',
  ],
  [
    '/projects/portfolio-engineering',
    'Portfolio Engineering | Angular Case Study | Oscar Hinjos',
    'Portfolio Engineering',
    ['WebPage', 'CreativeWork'],
    'portfolio-engineering',
  ],
  [
    '/projects/sentinel',
    'Sentinel | Angular Cybersecurity Dashboard | Oscar Hinjos',
    'Sentinel',
    ['WebPage', 'CreativeWork'],
    'sentinel',
  ],
];
const decode = (text) =>
  text.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
const attribute = (tag, name) =>
  decode(tag.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1] ?? '');
for (const [route, title, heading, types, image] of routes) {
  const file = path.join(root, route, 'index.html');
  const html = await readFile(file, 'utf8');
  assert.equal(decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? ''), title);
  assert.match(html, /<html[^>]*lang="es"/);
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? '';
  assert.ok(
    decode(
      h1
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim(),
    ).includes(heading),
  );
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  const meta = (key) => {
    const matches = tags.filter(
      (tag) => attribute(tag, 'name') === key || attribute(tag, 'property') === key,
    );
    assert.equal(matches.length, 1, `${route}: ${key} must occur once`);
    const content = attribute(matches[0], 'content');
    assert.ok(content);
    return content;
  };
  assert.ok(meta('description').length > 80);
  assert.equal(meta('robots'), 'index,follow');
  const links = (html.match(/<link\b[^>]*>/gi) ?? []).filter(
    (tag) => attribute(tag, 'rel') === 'canonical',
  );
  assert.equal(links.length, 1);
  assert.equal(attribute(links[0], 'href'), origin + route);
  assert.equal(meta('og:title'), title);
  assert.equal(meta('og:description'), meta('description'));
  assert.equal(meta('og:url'), origin + route);
  assert.equal(meta('og:type'), route === '/' ? 'website' : 'article');
  assert.equal(meta('og:locale'), 'es_ES');
  meta('og:site_name');
  meta('og:image:alt');
  assert.equal(meta('og:image'), `${origin}/assets/og/${image}.png`);
  assert.equal(meta('twitter:card'), 'summary_large_image');
  assert.equal(meta('twitter:title'), title);
  assert.equal(meta('twitter:description'), meta('description'));
  assert.equal(meta('twitter:image'), meta('og:image'));
  meta('twitter:image:alt');
  const scripts = [
    ...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi),
  ];
  assert.equal(scripts.length, 1);
  const data = JSON.parse(scripts[0][1]);
  assert.equal(data['@context'], 'https://schema.org');
  assert.deepEqual(
    data['@graph'].map((node) => node['@type']),
    types,
  );
  console.log(
    `${file}: content + complete metadata + JSON-LD (${Buffer.byteLength(scripts[0][1])} bytes) OK`,
  );
}
for (const image of ['home', 'portfolio-engineering', 'sentinel']) {
  const png = await readFile(path.join(root, 'assets/og', `${image}.png`));
  assert.equal(png.subarray(1, 4).toString(), 'PNG');
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
  assert.ok(png.length < 1_000_000);
  console.log(`${image}.png: 1200×630, ${png.length} bytes`);
}
for (const [route, robots] of [
  ['design-system', 'noindex,follow'],
  ['projects/lol-scenario-trainer', 'noindex,follow'],
  ['404', 'noindex,nofollow'],
]) {
  const html = await readFile(path.join(root, route, 'index.html'), 'utf8');
  const tag = (html.match(/<meta\b[^>]*>/gi) ?? []).find(
    (tag) => attribute(tag, 'name') === 'robots',
  );
  assert.equal(attribute(tag ?? '', 'content'), robots);
  assert.ok(!html.includes('"@type":"Person"'));
}
assert.match(
  await readFile(path.join(root, 'robots.txt'), 'utf8'),
  new RegExp(`Sitemap: ${origin.replaceAll('.', '\\.')}/sitemap.xml`),
);
const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
assert.deepEqual(
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]),
  routes.map((route) => origin + route[0]),
);
await stat(path.join(root, '404/index.html'));
console.log('Six static routes, robots, sitemap (exactly 3 URLs), OG assets: OK');
