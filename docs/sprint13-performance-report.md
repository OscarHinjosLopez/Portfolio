# Sprint 13 — Performance y accessibility hardening

## Método y reproducibilidad

Se midió **antes de cambiar la aplicación**, con un production build SSG, no con ng serve.
Baseline del commit `7aae7490b61eb767f6b989cc3687d9e893d68d41` (Sprint 12).
Angular instalado: 22.2.1. Lighthouse: 13.5.0. Chrome local headless: 154.0.0.0,
Windows, HTTP localhost, servidor estático con gzip para respuestas de texto.
Las rutas profundas sirven su fichero prerenderizado; los errores devuelven 404.

Se hicieron tres runs por cada una de las seis combinaciones en baseline y final.
La comparación usa **mediana por métrica**. Los perfiles móvil y escritorio y el
throttling simulado son los predeterminados oficiales; no se desactiva CPU throttling
ni se oculta contenido para mejorar el resultado. Véase la
[documentación de Lighthouse sobre throttling](https://github.com/GoogleChrome/lighthouse/blob/main/docs/throttling.md).
Estas son mediciones de laboratorio; **no se ha medido INP de campo**.

Comandos:

```sh
npm run build -- --stats-json
npm run audit:lighthouse -- final
node scripts/summarize-lighthouse.mjs
node scripts/audit-browser.mjs
npm run format:check
npm test -- --watch=false
npm run check:prerender
```

`CHROME_PATH` permite usar otra instalación local de Chrome;
`LIGHTHOUSE_RUNS` puede variar entre 1 y 5 (por defecto 3).
La auditoría de navegador reutiliza Playwright y axe ya instalados en el proyecto
Sentinel contiguo; `BROWSER_TOOLS_ROOT` permite indicar otra raíz con esas dependencias.
No se instalaron herramientas globales ni dependencias de runtime.
No sobrescribir baseline con la aplicación optimizada al repetir la comparación.

## Lighthouse: baseline, final y delta

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

Las categorías A, BP y SEO permanecen en 100 en todas las combinaciones.
Las pequeñas variaciones de timings no prueban causalidad por sí solas; se registran
también las métricas que empeoran. CLS es cero; no se eliminan contenidos ni funcionalidad.
No hay runWarnings de Lighthouse en las mediciones guardadas.

Sentinel móvil reduce la mediana LCP de 1971,64 a 1814,26 ms (−157,39 ms), y escritorio
de 455,41 a 416,22 ms. Home móvil aumenta de 1365,94 a 1514,73 ms (+148,79 ms), aunque
FCP permanece prácticamente igual y Performance sigue en 100: no se presenta como una
mejora. El informe conserva las tres ejecuciones y las condiciones para contrastarlo.

## LCP y trabajo de carga

| Ruta      | Móvil                | Escritorio      |
| --------- | -------------------- | --------------- |
| Home      | `p.hero-description` | `h1#hero-title` |
| Portfolio | `p.intro`            | `h1.display-xl` |
| Sentinel  | `p.intro`            | `p.subtitle`    |

Los elementos se obtienen del audit `lcp-breakdown-insight`, no se presuponen.
La captura del hero Sentinel **no es LCP** en estos perfiles. Sigue siendo eager,
pero se retira `fetchpriority="high"`, porque aparecía debajo del viewport y competía
con los recursos que sí participan en la primera vista. No se aplica lazy al hero.

Home renderiza H1, copy y CTAs desde el HTML estático. La animación parte de opacity
0.65, nunca de cero, y utiliza transform/opacity; se conserva. Reveals inferiores no
alteran el flujo ni provocan CLS. Lighthouse no detecta animaciones no compositadas.

Lighthouse registra tareas largas de carga/Angular en móvil y la oportunidad de JS
no usado durante la primera vista. No son motivos para eliminar hidratación o quitar
router/funcionalidad. TBT y las tareas concretas constan en `comparison.json`.
No se refactorizan observers: Home crea un ScrollSpy y siete reveals de secciones,
que se desconectan al revelarse; cada case tiene un ScrollSpy. La regresión comprueba
su limpieza y funcionamiento. No hay observer por cada pequeño chip o enlace.

## Cambios basados en evidencia

| Problema                                             | Medición baseline                                                                              | Cambio                                                                                                                | Resultado comprobado                                                                                                          |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Captura Sentinel sobredimensionada en móvil          | Dashboard 70028 bytes; Lighthouse estima 55869 bytes sobrantes para unos 648 px efectivos      | Una variante 720 × 450 por captura, srcset 720w/1440w y sizes según layout; lazy inferiores con sizes auto y fallback | Dashboard móvil 24616 bytes, ahorro real 45412 bytes (64,85 %); el navegador elige variantes móviles y originales desktop     |
| Prioridad alta para imagen fuera del primer viewport | Hero-capture comienza a 1066 px en Lighthouse móvil; LCP es texto                              | Prioridad automática; se conserva carga eager del hero                                                                | Desaparece la prioridad alta injustificada; los timings finales se registran sin atribuir toda su variación a un único cambio |
| Decodificación de capturas                           | No había decoding explícito                                                                    | decoding async en las cuatro imágenes                                                                                 | Reservan 1440 × 900; inferiores siguen lazy; CLS 0                                                                            |
| Marca visible y nombre accesible diferentes          | `label-content-name-mismatch` falla en OH. de navbar y footer, aunque Accessibility puntúa 100 | Nombre accesible incluye «OH. — Oscar Hinjos · Inicio»                                                                | Regla de axe ampliada pasa en las seis combinaciones                                                                          |
| Controles móviles pequeños                           | Marca y enlaces footer: 38,39 px de alto; botón Menú afectado por min-height del tamaño sm     | Targets de al menos 44 px con selector que prevalece sobre el estilo de botón                                         | Dimensiones verificadas en móvil, foco y menú sin regresiones                                                                 |

## Imágenes Sentinel: antes y después

Los originales no se alteran. Cada variante se genera a partir de la captura real
mediante canvas en Chrome existente, WebP calidad 0.85, sin instalar otro procesador.
La variante conserva el contenido completo. Se revisó visualmente la captura reducida
y se comprobó la selección real del navegador; desktop conserva originales legibles.

| Imagen              | Original 1440 × 900 | Variante 720 × 450 |        Ahorro en móvil |
| ------------------- | ------------------: | -----------------: | ---------------------: |
| dashboard           |         70028 bytes |        24616 bytes |            45412 bytes |
| threats             |         59606 bytes |        19840 bytes |            39766 bytes |
| devices             |         49050 bytes |        16454 bytes |            32596 bytes |
| command-palette     |         47184 bytes |        16650 bytes |            30534 bytes |
| Total de las cuatro |        225868 bytes |        77560 bytes | 148308 bytes (65,66 %) |

El total de cuatro corresponde a leer todas las capturas, no a la carga inicial:
en Sentinel inicialmente solo se descarga dashboard; las otras siguen lazy.
Las OG permanecen fuera de los requests de interfaz y no se alteran.

## Bundle, chunks e imports

| Métrica                                    |     Baseline |        Final |                             Delta |
| ------------------------------------------ | -----------: | -----------: | --------------------------------: |
| JS inicial                                 | 334519 bytes | 334535 bytes |                         +16 bytes |
| CSS global                                 |   4908 bytes |   5028 bytes |                        +120 bytes |
| Initial JS + CSS                           | 339427 bytes | 339563 bytes |              +136 bytes (+0,04 %) |
| Transferencia inicial estimada por Angular |     91,40 kB |     91,49 kB |                          +0,09 kB |
| Portfolio lazy                             |  23525 bytes |  23525 bytes |                                 0 |
| Sentinel lazy                              |  31918 bytes |  33173 bytes | +1255 bytes, atributos responsive |
| Design System lazy                         |   8739 bytes |   8739 bytes |                                 0 |
| LoL lazy                                   |   1605 bytes |   1605 bytes |                                 0 |

Los tamaños exactos de los chunks se verifican con stats; las cifras estimadas de
transferencia dependen de compresión. El aumento mínimo inicial procede del hardening,
no de Lighthouse. Lighthouse está únicamente en devDependencies.

El chunk compartido Angular es 269,83 kB; main, 64,71 kB. El análisis de inputs identifica
Angular core/router, platform-browser/common, RxJS y la aplicación como contribuciones
principales; no hay Material en este portfolio (se menciona como tecnología de Sentinel),
analytics, widgets, módulos de servidor en el cliente ni duplicados grandes propios.
SSR solo interviene en build. Las rutas de case study, Design System y LoL siguen lazy;
no hay preloading global. El CSS de ambos case studies y ProjectCard no se modifica.
No hay archivos .map en el output de producción.

Budgets intactos: initial warning 500 kB/error 1 MB; anyComponentStyle warning 4 kB/error
8 kB. No se suben límites. No se añade un guard de bundle más estricto que estos budgets
sin una necesidad demostrada.

## Requests, hidratación y SEO

Home solicita cinco recursos: documento HTML, chunk Angular compartido, main, CSS y
favicon SVG. **Cero** conexiones externas, capturas Sentinel, OG, fonts o chunks de
Portfolio/Sentinel/Design System/LoL. Portfolio añade solo su chunk, sin imágenes Sentinel.
Sentinel añade solo su chunk y dashboard (720 móvil / original desktop). Network verificado
a 375 px DPR 2 y 1440 px DPR 1, con evidencia en `browser-audit.json`.

Se conserva `provideClientHydration`. No se activan event replay ni incremental hydration
sin beneficio medido. Las tres páginas y ambos viewports tienen **0 console errors,
0 pageerrors y 0 warnings**, sin mismatch, IDs duplicados ni main duplicado.
El navegador mantiene el layout y scroll tras hidratar; CLS 0. Hero, reveals, ScrollSpy,
TOCs, anchors, retorno a Work y Back siguen funcionando.

`check:prerender` pasa: seis rutas, contenido, canonical, OG/Twitter, JSON-LD, robots y
sitemap exacto de tres URLs. Respuestas estáticas sin JS verificadas por HTTP:
Home 85347 bytes, Portfolio 49426 bytes, Sentinel 62240 bytes.
Design System y LoL siguen noindex; desconocidos conservan HTTP 404 y noindex,nofollow,
sin pageerrors. No se altera la configuración Vercel ni el contenido SEO.

## Accesibilidad y validación

- Axe WCAG 2 A/AA y 2.1 A/AA: **0 infracciones** en Home, Portfolio y Sentinel a
  375 y 1440 px; también cero en la regla adicional de label-content-name-mismatch.
- Teclado: Tab recorre controles reales, Project actions, Contact, Footer, TOCs desktop
  y bloque de código; Shift+Tab probado; Enter activa skip link/menú, Escape cierra menú
  y devuelve foco. No se siguen enlaces externos al auditar.
- Foco visible: outline de al menos 2 px en cada parada; no hay controles ocultos en
  el tab order. Skip link mueve **el foco** a main en las tres páginas.
- Headings: exactamente un H1 y un main por página, sin saltos de nivel. Landmarks
  header/nav/main/footer presentes. No tabindex positivo, referencias ARIA rotas o IDs
  duplicados. Capturas no interactivas se omiten del orden de foco.
- Reduced motion: scroll auto y cero animaciones activas de duración positiva en las tres
  rutas; teclado y navegación funcionan. Regresión en anchos 375, 430, 768, 1024, 1440,
  1920 sin overflow.
- No se ejecutó un lector de pantalla real: **se recomienda auditoría manual NVDA/VoiceOver**.
- **64 tests / 23 archivos pasan**. Se actualizan dos tests existentes para nombre
  accesible y atributos responsive; no se añaden tests que midan Lighthouse.
- Production build: **0 warnings**, seis rutas prerenderizadas, budgets intactos.
- Prettier y check:prerender pasan.

## Auditado sin cambios y decisiones descartadas

- Fuentes: stack del sistema; ninguna externa bloqueante, no se añade Google Fonts.
- Hidratación: conservar reutilización del HTML SSG y navegación existente; no quitar
  funcionalidad ni habilitar providers nuevos por defecto.
- Animaciones: visibles y compositadas; no se oculta H1 ni se eliminan reveals para puntuar.
- DOM: tamaños moderados; se conserva contenido valioso, sin warning de DOM excesivo.
- CSS: global pequeño y component budgets limpios; no limpieza general por unos bytes.
- Imágenes: se mantienen originales y proporción; no se inventan screenshots ni cinco
  variantes por imagen. No lazy en hero; no preload/prefetch indiscriminado.
- Cache: Lighthouse local señala TTL ausente porque este servidor no simula CDN. Los
  assets JS/CSS tienen hash. No se añaden headers complejos ni cache manual al HTML;
  validar las respuestas reales de Vercel al desplegar.
- Paleta, textos, estructura y color-scheme: no se cambian sin un fallo medido.
- Design System/LoL: noindex, lazy, aislados de Home; sin optimizaciones innecesarias.
- No deploy, analytics, dominio personalizado ni avance al Sprint 14.

## Archivos y evidencias

Creado:

- `scripts/lighthouse.mjs`, `scripts/static-server.mjs`, `scripts/audit-browser.mjs`,
  `scripts/summarize-lighthouse.mjs`.
- Cuatro `public/assets/projects/sentinel/*-720.webp`.
- `reports/lighthouse/baseline/summary.json`, `final/summary.json`, `comparison.json`,
  `browser-audit.json`, `README.md`.
- Este informe.

Modificado:

- `.gitignore`: ignora JSON completos de runs locales para no versionar decenas de MB.
- `package.json`, `package-lock.json`: Lighthouse dev y script de auditoría.
- `src/app/features/projects/sentinel/sentinel-case-study.component.html` y su spec.
- `src/app/layout/navbar/navbar.component.html`, `footer/footer.component.html`.
- `src/app/app.component.spec.ts`, `src/styles/_motion.scss`, `README.md`.

Prettier normaliza también finales de línea en archivos del Sprint 12;
los archivos adicionales que aparecen modificados sin diff semántico son solo formato.

Los 18 JSON completos de baseline y 18 finales están localmente en
`reports/lighthouse/{baseline,final}/`; los resúmenes compactos se versionan.
Se repitieron mediciones finales después del último hardening: los archivos finales
corresponden al build definitivo. No se guardan decenas de HTML grandes.
Para tablas y detalles de tareas/LCP, consultar [comparison.json](../reports/lighthouse/comparison.json)
y [resumen Lighthouse](../reports/lighthouse/README.md).

## Revisión manual recomendada

Probar NVDA/VoiceOver reales, legibilidad de screenshots en un móvil físico y navegación
con teclado; después del despliegue autorizado, repetir Lighthouse sobre HTTPS real,
comprobar caché CDN, status 404 y deep links. Los resultados locales no son métricas CrUX
ni validan la CDN o dispositivos físicos. URLs:

- https://portfolio-phi-flax-36.vercel.app/
- https://portfolio-phi-flax-36.vercel.app/projects/portfolio-engineering
- https://portfolio-phi-flax-36.vercel.app/projects/sentinel
