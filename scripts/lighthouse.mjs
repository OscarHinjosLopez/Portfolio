import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import * as chromeLauncher from 'chrome-launcher';
import { mkdir, writeFile } from 'node:fs/promises';
import { startStaticServer } from './static-server.mjs';

const phase = process.argv[2] ?? 'final';
if (!/^[a-z0-9-]+$/.test(phase)) throw new Error('Use a simple report phase name');
const runs = Number(process.env['LIGHTHOUSE_RUNS'] ?? 3);
if (!Number.isInteger(runs) || runs < 1 || runs > 5) throw new Error('LIGHTHOUSE_RUNS must be 1–5');
const directory = `reports/lighthouse/${phase}`;
await mkdir(directory, { recursive: true });
const server = await startStaticServer();
let chrome;
const results = [];
try {
  chrome = await chromeLauncher.launch({
    chromePath:
      process.env['CHROME_PATH'] ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    chromeFlags: ['--headless', '--disable-gpu', '--no-first-run'],
  });
  for (const [name, route] of [
    ['home', '/'],
    ['portfolio', '/projects/portfolio-engineering'],
    ['sentinel', '/projects/sentinel'],
  ]) {
    for (const profile of ['mobile', 'desktop']) {
      for (let run = 1; run <= runs; run++) {
        const result = await lighthouse(
          `http://127.0.0.1:4173${route}`,
          {
            port: chrome.port,
            logLevel: 'error',
            onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
          },
          profile === 'desktop' ? desktopConfig : undefined,
        );
        if (!result || result.lhr.runtimeError)
          throw new Error(JSON.stringify(result?.lhr.runtimeError ?? 'No Lighthouse result'));
        const lhr = result.lhr;
        await writeFile(`${directory}/${name}-${profile}-${run}.json`, JSON.stringify(lhr));
        const metrics = Object.fromEntries(
          [
            'first-contentful-paint',
            'largest-contentful-paint',
            'speed-index',
            'total-blocking-time',
            'cumulative-layout-shift',
          ].map((key) => [key, lhr.audits[key].numericValue]),
        );
        const entry = {
          name,
          route,
          profile,
          run,
          lighthouseVersion: lhr.lighthouseVersion,
          chrome: lhr.environment.hostUserAgent,
          settings: lhr.configSettings,
          scores: Object.fromEntries(
            Object.entries(lhr.categories).map(([key, value]) => [
              key,
              Math.round(value.score * 100),
            ]),
          ),
          metrics,
          warnings: lhr.runWarnings,
        };
        results.push(entry);
        await writeFile(`${directory}/summary.json`, JSON.stringify(results, null, 2));
        console.log(
          `${phase} ${name} ${profile} ${run}/${runs}: ${JSON.stringify(entry.scores)} LCP=${Math.round(metrics['largest-contentful-paint'])}ms CLS=${metrics['cumulative-layout-shift']}`,
        );
      }
    }
  }
} finally {
  try {
    await chrome?.kill();
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}
