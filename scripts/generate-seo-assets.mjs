import { readFile, writeFile } from 'node:fs/promises';

// Read the single origin source without adding a TypeScript runtime dependency.
export async function siteUrl() {
  const config = await readFile(
    new URL('../src/app/core/config/site.config.ts', import.meta.url),
    'utf8',
  );
  const url = config.match(/url:\s*'([^']+)'/)?.[1];
  if (!url) throw new Error('SITE_CONFIG.url is missing');
  return url;
}

export const indexablePaths = ['/', '/projects/portfolio-engineering', '/projects/sentinel'];
const origin = await siteUrl();
await writeFile(
  new URL('../public/robots.txt', import.meta.url),
  `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
);
await writeFile(
  new URL('../public/sitemap.xml', import.meta.url),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexablePaths.map((path) => `  <url><loc>${origin}${path}</loc></url>`).join('\n')}\n</urlset>\n`,
);
