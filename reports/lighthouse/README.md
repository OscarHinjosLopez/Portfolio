# Lighthouse — Sprint 13

Medianas por métrica de tres ejecuciones por ruta y perfil, baseline y final.
P: Performance; A: Accessibility; BP: Best Practices; SI: Speed Index.
Lighthouse 13.5.0, Chrome local headless, producción SSG con gzip.
Perfiles y throttling oficiales de Lighthouse; no se mide INP de campo.

| Página / perfil     | Fase     |   P |   A |  BP | SEO |  FCP ms |  LCP ms |   SI ms | TBT ms | CLS |
| ------------------- | -------- | --: | --: | --: | --: | ------: | ------: | ------: | -----: | --: |
| home / mobile       | baseline | 100 | 100 | 100 | 100 | 1365.02 | 1365.94 | 1365.02 |     30 |   0 |
| home / mobile       | final    | 100 | 100 | 100 | 100 | 1364.73 | 1514.73 | 1364.73 |     31 |   0 |
| home / mobile       | delta    |   0 |   0 |   0 |   0 |   -0.29 |  148.79 |   -0.29 |      1 |   0 |
| home / desktop      | baseline | 100 | 100 | 100 | 100 |  333.07 |  373.07 |  333.07 |      0 |   0 |
| home / desktop      | final    | 100 | 100 | 100 | 100 |  333.96 |  373.96 |  333.96 |      0 |   0 |
| home / desktop      | delta    |   0 |   0 |   0 |   0 |    0.89 |    0.89 |    0.89 |      0 |   0 |
| portfolio / mobile  | baseline |  99 | 100 | 100 | 100 |  1515.6 |  1665.6 |  1515.6 |     42 |   0 |
| portfolio / mobile  | final    |  99 | 100 | 100 | 100 | 1515.92 | 1665.92 | 1515.92 |     38 |   0 |
| portfolio / mobile  | delta    |   0 |   0 |   0 |   0 |    0.33 |    0.33 |    0.33 |     -4 |   0 |
| portfolio / desktop | baseline | 100 | 100 | 100 | 100 |  374.72 |  374.72 |  374.72 |      0 |   0 |
| portfolio / desktop | final    | 100 | 100 | 100 | 100 |  373.43 |  373.43 |  373.43 |      0 |   0 |
| portfolio / desktop | delta    |   0 |   0 |   0 |   0 |   -1.29 |   -1.29 |   -1.29 |      0 |   0 |
| sentinel / mobile   | baseline |  99 | 100 | 100 | 100 | 1521.64 | 1971.64 | 1521.64 |   20.5 |   0 |
| sentinel / mobile   | final    |  99 | 100 | 100 | 100 | 1515.19 | 1814.26 | 1515.19 |     20 |   0 |
| sentinel / mobile   | delta    |   0 |   0 |   0 |   0 |   -6.45 | -157.39 |   -6.45 |   -0.5 |   0 |
| sentinel / desktop  | baseline | 100 | 100 | 100 | 100 |  375.41 |  455.41 |  375.41 |      0 |   0 |
| sentinel / desktop  | final    | 100 | 100 | 100 | 100 |  376.22 |  416.22 |  376.22 |      0 |   0 |
| sentinel / desktop  | delta    |   0 |   0 |   0 |   0 |    0.82 |  -39.18 |    0.82 |      0 |   0 |

Los JSON completos permanecen localmente en baseline/ y final/ y se excluyen de Git.
Los summary.json, comparison.json y browser-audit.json conservan la evidencia compacta.
Reproducir: npm run build -- --stats-json; npm run audit:lighthouse -- final; node scripts/summarize-lighthouse.mjs.
No sobrescribir baseline para comparar con el estado anterior.
