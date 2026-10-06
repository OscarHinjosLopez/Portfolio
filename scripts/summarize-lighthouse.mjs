import { readFile, writeFile } from 'node:fs/promises';

const metrics = [
  'first-contentful-paint',
  'largest-contentful-paint',
  'speed-index',
  'total-blocking-time',
  'cumulative-layout-shift',
];
const categories = ['performance', 'accessibility', 'best-practices', 'seo'];
const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};
const summaries = {};
for (const phase of ['baseline', 'final'])
  summaries[phase] = JSON.parse(await readFile(`reports/lighthouse/${phase}/summary.json`, 'utf8'));
const comparisons = [];
for (const name of ['home', 'portfolio', 'sentinel']) {
  for (const profile of ['mobile', 'desktop']) {
    const entry = { name, profile };
    for (const phase of ['baseline', 'final']) {
      const runs = summaries[phase].filter((row) => row.name === name && row.profile === profile);
      if (!runs.length) throw new Error(`Missing ${phase}/${name}/${profile}`);
      const scores = Object.fromEntries(
        categories.map((key) => [key, median(runs.map((row) => row.scores[key]))]),
      );
      const values = Object.fromEntries(
        metrics.map((key) => [key, median(runs.map((row) => row.metrics[key]))]),
      );
      const representative = [...runs].sort(
        (a, b) =>
          Math.abs(a.metrics['largest-contentful-paint'] - values['largest-contentful-paint']) -
          Math.abs(b.metrics['largest-contentful-paint'] - values['largest-contentful-paint']),
      )[0];
      const raw = JSON.parse(
        await readFile(
          `reports/lighthouse/${phase}/${name}-${profile}-${representative.run}.json`,
          'utf8',
        ),
      );
      const lcp = raw.audits['lcp-breakdown-insight'].details.items.find(
        (item) => item.type === 'node',
      );
      entry[phase] = {
        runs: runs.length,
        scores,
        metrics: values,
        lcpElement: lcp?.selector,
        lcpText: lcp?.nodeLabel,
        labelMismatchScore: raw.audits['label-content-name-mismatch'].score,
        imageDeliveryWastedBytes:
          raw.audits['image-delivery-insight'].details.debugData?.wastedBytes ?? 0,
        longTasks: raw.audits['long-tasks'].details.items,
        dom: raw.audits['dom-size-insight'].details.items[0],
        runWarnings: runs.flatMap((run) => run.warnings),
        diagnostics: raw.audits['diagnostics'].details.items[0],
      };
    }
    entry.delta = {
      scores: Object.fromEntries(
        categories.map((key) => [key, entry.final.scores[key] - entry.baseline.scores[key]]),
      ),
      metrics: Object.fromEntries(
        metrics.map((key) => [key, entry.final.metrics[key] - entry.baseline.metrics[key]]),
      ),
    };
    comparisons.push(entry);
  }
}
await writeFile('reports/lighthouse/comparison.json', JSON.stringify(comparisons, null, 2));
const table = [
  '| Página / perfil | Fase | P | A | BP | SEO | FCP ms | LCP ms | SI ms | TBT ms | CLS |',
  '| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |',
];
for (const entry of comparisons)
  for (const phase of ['baseline', 'final', 'delta']) {
    const row = entry[phase];
    table.push(
      `| ${entry.name} / ${entry.profile} | ${phase} | ${categories.map((key) => row.scores[key]).join(' | ')} | ${metrics.map((key) => Math.round(row.metrics[key] * 100) / 100).join(' | ')} |`,
    );
  }
await writeFile(
  'reports/lighthouse/README.md',
  `# Lighthouse — Sprint 13\n\nMedianas por métrica de tres ejecuciones por ruta y perfil, baseline y final.\nP: Performance; A: Accessibility; BP: Best Practices; SI: Speed Index.\nLighthouse ${summaries.final[0].lighthouseVersion}, Chrome local headless, producción SSG con gzip.\nPerfiles y throttling oficiales de Lighthouse; no se mide INP de campo.\n\n${table.join('\n')}\n\nLos JSON completos permanecen localmente en baseline/ y final/ y se excluyen de Git.\nLos summary.json, comparison.json y browser-audit.json conservan la evidencia compacta.\nReproducir: npm run build -- --stats-json; npm run audit:lighthouse -- final; node scripts/summarize-lighthouse.mjs.\nNo sobrescribir baseline para comparar con el estado anterior.\n`,
);
console.log(table.join('\n'));
