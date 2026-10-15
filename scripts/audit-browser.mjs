import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { startStaticServer } from './static-server.mjs';
const parent = path.resolve('..');
const toolsRoot =
  process.env['BROWSER_TOOLS_ROOT'] ??
  path.join(parent, (await readdir(parent)).find((n) => n.startsWith('Sentinel')) ?? '');
const require = createRequire(path.join(toolsRoot, 'package.json'));
const { chromium } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const server = await startStaticServer(4175);
const browser = await chromium.launch({
  executablePath:
    process.env['CHROME_PATH'] ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
});
await mkdir('reports/redesign', { recursive: true });
try {
  for (const width of [375, 768, 1280]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('http://127.0.0.1:4175/');
    await page.evaluate(() => document.fonts.ready);
    for (const section of await page.locator('main > *').all()) {
      await section.scrollIntoViewIfNeeded();
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `reports/redesign/home-${width}.png`, fullPage: true });
    await page.screenshot({ path: `reports/redesign/hero-${width}.png` });
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false,
      'overflow',
    );
    assert.deepEqual(errors, []);
    const axe = await new AxeBuilder({ page }).analyze();
    console.log(
      width,
      'axe',
      JSON.stringify(
        axe.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
      ),
    );
    assert.equal(axe.violations.length, 0);
    if (width === 375) {
      await page.getByRole('button', { name: 'Abrir menú de navegación' }).click();
      await page.locator('#primary-navigation').getByText('Proyectos', { exact: true }).click();
      await page.waitForURL('**/#work');
    }
    assert.equal(await page.locator('#work app-project-card').count(), 0);
    assert.equal(
      await page.locator('.portrait-photo').evaluate((img) => img.complete && img.naturalWidth > 0),
      true,
    );
    await page.goto('http://127.0.0.1:4175/design-system');
    assert.equal(await page.locator('h1').count(), 1);
    await context.close();
  }
} finally {
  await browser.close();
  await new Promise((r) => server.close(r));
}
