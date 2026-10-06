import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readdir, mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { startStaticServer, browserOutput } from './static-server.mjs';

// Reuse the browser tooling already installed alongside this workspace.
// BROWSER_TOOLS_ROOT may point to another directory containing node_modules.
const parent = path.resolve('..');
const toolsRoot =
  process.env['BROWSER_TOOLS_ROOT'] ??
  path.join(parent, (await readdir(parent)).find((name) => name.startsWith('Sentinel')) ?? '');
const requireTools = createRequire(path.join(toolsRoot, 'package.json'));
const { chromium, expect } = requireTools('@playwright/test');
const AxeBuilder = requireTools('@axe-core/playwright').default;
const server = await startStaticServer();
const base = 'http://127.0.0.1:4173';
const browser = await chromium.launch({
  executablePath:
    process.env['CHROME_PATH'] ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
});
const results = [];
const stats = JSON.parse(
  await readFile(path.join(path.dirname(await browserOutput()), 'browser-stats.json'), 'utf8'),
);
const lazyChunks = Object.entries(stats.outputs).filter(
  ([, output]) =>
    output.entryPoint?.includes('/features/') && !output.entryPoint.includes('/home/'),
);
try {
  for (const width of [375, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 1000 },
      deviceScaleFactor: width === 375 ? 2 : 1,
      isMobile: width === 375,
      hasTouch: width === 375,
    });
    const page = await context.newPage();
    for (const route of ['/', '/projects/portfolio-engineering', '/projects/sentinel']) {
      const requests = [],
        errors = [],
        warnings = [];
      const requestListener = (req) => requests.push(req.url());
      const errorListener = (error) => errors.push(error.message);
      const consoleListener = (message) => {
        if (message.type() === 'error') errors.push(message.text());
        if (message.type() === 'warning') warnings.push(message.text());
      };
      page.on('request', requestListener);
      page.on('pageerror', errorListener);
      page.on('console', consoleListener);
      const response = await page.goto(base + route);
      assert.equal(response.status(), 200);
      await page.waitForTimeout(800);
      const initialRequests = [...requests];
      assert.ok(
        initialRequests.every((url) => url.startsWith(base)),
        'No third-party requests',
      );
      assert.ok(
        initialRequests.every((url) => !url.includes('/assets/og/')),
        'No OG downloads',
      );
      if (route !== '/projects/sentinel')
        assert.ok(initialRequests.every((url) => !url.includes('/assets/projects/sentinel/')));
      for (const [chunk, output] of lazyChunks) {
        const belongsToRoute =
          (route === '/projects/sentinel' && output.entryPoint.includes('/sentinel/')) ||
          (route === '/projects/portfolio-engineering' &&
            output.entryPoint.includes('/portfolio-engineering/'));
        assert.equal(
          initialRequests.some((url) => url.endsWith('/' + chunk)),
          belongsToRoute,
          `Route isolation: ${chunk}`,
        );
      }
      const structure = await page.evaluate(() => {
        const elements = [...document.body.querySelectorAll('*')];
        const ids = elements.map((node) => node.id).filter(Boolean);
        const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((node) =>
          Number(node.tagName[1]),
        );
        return {
          main: document.querySelectorAll('main').length,
          h1: document.querySelectorAll('h1').length,
          idsUnique: new Set(ids).size === ids.length,
          brokenReferences: elements.flatMap((node) =>
            ['aria-labelledby', 'aria-describedby', 'aria-controls'].flatMap((name) =>
              (node.getAttribute(name) ?? '')
                .split(/\s+/)
                .filter((id) => id && !document.getElementById(id)),
            ),
          ),
          positiveTabindex: elements.filter((node) => Number(node.getAttribute('tabindex')) > 0)
            .length,
          skippedHeadings: headings.some(
            (level, index) => index > 0 && level > headings[index - 1] + 1,
          ),
          overflow: document.documentElement.scrollWidth > innerWidth,
          screenshotsFocusable: [...document.images].some((img) => img.tabIndex >= 0),
        };
      });
      assert.deepEqual(structure, {
        main: 1,
        h1: 1,
        idsUnique: true,
        brokenReferences: [],
        positiveTabindex: 0,
        skippedHeadings: false,
        overflow: false,
        screenshotsFocusable: false,
      });
      const axe = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      const labels = await new AxeBuilder({ page })
        .withRules(['label-content-name-mismatch'])
        .analyze();
      assert.deepEqual(axe.violations, []);
      assert.deepEqual(labels.violations, []);
      // Traverse the actual tab order, including project actions, Contact, Footer and case links.
      await page.locator('.skip-link').focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('main')).toBeFocused();
      await page.locator('.skip-link').focus();
      const visited = [];
      for (let i = 0; i < 100; i++) {
        await page.keyboard.press('Tab');
        const focus = await page.evaluate(() => {
          const node = document.activeElement;
          if (node === document.body) return null;
          const style = getComputedStyle(node);
          return {
            tag: node.tagName,
            text: (node.textContent ?? '').trim().slice(0, 70),
            label: node.getAttribute('aria-label'),
            href: node.getAttribute('href'),
            outline: style.outlineStyle,
            outlineWidth: style.outlineWidth,
            area: node.getBoundingClientRect().width * node.getBoundingClientRect().height,
          };
        });
        if (!focus) break;
        if (focus.tag === 'A' && focus.href === '#main-content') break;
        assert.notEqual(focus.outline, 'none', `Visible focus: ${focus.text}`);
        assert.ok(Number.parseFloat(focus.outlineWidth) >= 2);
        assert.ok(focus.area > 0);
        visited.push(focus);
      }
      assert.ok(
        visited.some((focus) => focus.href === '/#top'),
        'Footer is keyboard reachable',
      );
      if (route === '/')
        assert.ok(
          visited.some((focus) => focus.href?.startsWith('mailto:')),
          'Contact is keyboard reachable',
        );
      if (width === 1440 && route !== '/')
        assert.ok(
          visited.some((focus) => focus.href?.includes('#context')),
          'TOC is keyboard reachable',
        );
      if (route === '/projects/portfolio-engineering')
        assert.ok(
          visited.some((focus) => focus.tag === 'PRE'),
          'Scrollable code is keyboard reachable',
        );
      await page.locator('app-footer nav a').first().focus();
      await page.keyboard.press('Shift+Tab');
      assert.ok(await page.evaluate(() => document.activeElement !== document.body));
      const images = [];
      for (const img of await page.locator('img').all()) {
        await img.scrollIntoViewIfNeeded();
        await expect
          .poll(() => img.evaluate((node) => node.complete && node.naturalWidth > 0))
          .toBe(true);
        images.push(
          await img.evaluate((node) => ({
            src: node.currentSrc,
            naturalWidth: node.naturalWidth,
            renderedWidth: node.getBoundingClientRect().width,
            decoding: node.decoding,
            loading: node.loading,
          })),
        );
      }
      const targets = await page
        .locator('app-navbar .brand, app-footer a, #work .actions a, .menu-toggle')
        .evaluateAll((nodes) =>
          nodes
            .filter((node) => node.getBoundingClientRect().width > 0)
            .map((node) => ({
              text: node.textContent.trim(),
              height: node.getBoundingClientRect().height,
              width: node.getBoundingClientRect().width,
            })),
        );
      if (width === 375)
        for (const target of targets) {
          assert.ok(target.height >= 44, target.text);
          assert.ok(target.width >= 44, target.text);
        }
      assert.deepEqual(errors, []);
      assert.deepEqual(warnings, []);
      results.push({
        route,
        width,
        initialRequests,
        structure,
        axeViolations: 0,
        labelMismatchViolations: 0,
        errors,
        warnings,
        keyboardStops: visited,
        targets,
        images,
      });
      page.off('request', requestListener);
      page.off('pageerror', errorListener);
      page.off('console', consoleListener);
      console.log(
        `Browser audit ${route} ${width}: axe, labels, structure, keyboard, focus, images, hydration OK`,
      );
    }
    await context.close();
  }
  const context = await browser.newContext({
    viewport: { width: 375, height: 1000 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  await page.goto(base);
  const toggle = page.locator('.menu-toggle');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Tab');
  await expect(page.locator('#primary-navigation a').first()).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(toggle).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
  for (const route of ['/', '/projects/portfolio-engineering', '/projects/sentinel']) {
    await page.goto(base + route);
    assert.equal(
      await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
      'auto',
    );
    assert.equal(
      await page.evaluate(
        () =>
          document
            .getAnimations()
            .filter(
              (animation) =>
                animation.playState === 'running' && animation.effect.getTiming().duration > 0,
            ).length,
      ),
      0,
    );
  }
  for (const route of ['/design-system', '/projects/lol-scenario-trainer', '/unknown']) {
    const errors = [];
    const handler = (error) => errors.push(error.message);
    page.on('pageerror', handler);
    const response = await page.goto(base + route);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      route === '/unknown' ? 'noindex,nofollow' : 'noindex,follow',
    );
    assert.equal(response.status(), route === '/unknown' ? 404 : 200);
    assert.deepEqual(errors, []);
    page.off('pageerror', handler);
  }
  await mkdir('reports/lighthouse', { recursive: true });
  await writeFile(
    'reports/lighthouse/browser-audit.json',
    JSON.stringify(
      {
        results,
        mobileMenu: 'PASS',
        reducedMotion: 'PASS',
        auxiliaryRoutes: 'PASS',
        screenReader: 'Manual NVDA/VoiceOver recommended; not executed',
      },
      null,
      2,
    ),
  );
  console.log('Mobile keyboard, reduced motion, noindex and HTTP 404: PASS');
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
