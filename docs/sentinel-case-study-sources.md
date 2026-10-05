# Sentinel case study — fuentes y alcance

Revisión del 5 de octubre de 2026. Fuente técnica: repositorio local independiente
**Sentinel — Cybersecurity Operations Dashboard**, sin modificarlo ni instalar dependencias.

## Claims contrastados

| Contenido publicado                                              | Evidencia en Sentinel                                                                                           |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Standalone, lazy routes, feature-first                           | `src/app/app.routes.ts`, `docs/architecture.md`, componentes de features                                        |
| Signals y RxJS                                                   | `core/auth/auth.service.ts`, `features/threats/data-access/threat-list.store.ts`, stores de Devices y Dashboard |
| Permisos Admin / Analyst / Viewer                                | `core/auth/auth.models.ts`, `core/auth/permissions.ts`, guards y repositorios mock                              |
| Sesión y límite HTTP                                             | `core/auth/auth.service.ts`, `core/interceptors/auth.interceptor.ts`, `app.config.ts`                           |
| Backend mock y ausencia de API REST activa                       | `app.config.ts`, repositorios de amenazas y dispositivos, `docs/architecture.md`                                |
| Realtime simulado, reconexión, validación, orden y deduplicación | `core/realtime/mock-realtime.transport.ts`, `realtime.service.ts`, `realtime.models.ts`                         |
| Estado URL, búsqueda, filtros y paginación                       | Threat/Device list stores, query parsers y `docs/decisions.md`                                                  |
| Skeleton, empty, error y retry                                   | `features/threats/threats.html`, UI compartida y stores                                                         |
| Command Palette y foco                                           | `shared/ui/command-palette/`, `layout/shell/`, `layout/header/`                                                 |
| Dark/light persistentes                                          | `core/services/theme.service.ts`                                                                                |
| Audit es preview sin eventos                                     | `features/audit/audit.html`                                                                                     |
| Vitest, Playwright y axe                                         | `package.json`, tests de core/features y `e2e/specs/accessibility.spec.ts`, `zoom.spec.ts`                      |
| Lazy charts, SVG, instancia reutilizada y budgets                | `features/dashboard/dashboard.html`, `ui/dashboard-chart`, `docs/architecture.md`, `scripts/check-bundles.mjs`  |

No se afirma OnPush como técnica de Sentinel: no se constató una declaración
explícita en los componentes inspeccionados. No se publican cifras de tests,
coverage, Lighthouse o LCP de Sentinel; sus suites no se ejecutaron en este sprint.
Tampoco se publican Storybook, exportación no constatada, auditoría terminada,
clientes, incidentes reales, backend persistente o WebSockets de producción.

## Capturas reales

Origen: https://sentinel-cybersecurity-operations-d.vercel.app/

Capturadas con Chrome headless y acceso **Admin demo** seleccionado mediante el
botón público de autorrelleno. No se emplearon tokens ni credenciales privadas.
Viewport: **1440 × 900**, tema oscuro, movimiento reducido.

| Asset                  | Ruta capturada       | Tamaño       |
| ---------------------- | -------------------- | ------------ |
| `dashboard.webp`       | `/dashboard`         | 70 028 bytes |
| `threats.webp`         | `/threats`           | 59 606 bytes |
| `devices.webp`         | `/devices`           | 49 050 bytes |
| `command-palette.webp` | `/devices`, Ctrl + K | 47 184 bytes |

Los archivos están en `public/assets/projects/sentinel/`. Son capturas reales,
sin reconstrucción ni retoque. Chrome las codificó en WebP con calidad 85;
total **225 868 bytes**. Se revisaron visualmente las cuatro imágenes.
Los nombres de personas visibles son fixtures ficticios: `demo-accounts.ts` y
`device.fixtures.ts` confirman, por ejemplo, Alex Morgan. Las imágenes no contienen
passwords, tokens ni datos privados. Las cifras visibles pertenecen al dataset demo,
no son métricas empresariales. Los captions aclaran que se trata de datos ficticios.

La captura hero reserva dimensiones y usa prioridad alta. Las otras tres imágenes
reservan dimensiones y tienen `loading="lazy"`. No se cargan assets de Sentinel en Home.

## Enlaces y límites

La URL de demo proviene de `PROJECTS`. Se omite GitHub: no se verificó una URL pública
accesible y la configuración local no basta para publicarla. El login público permite
elegir un rol demo; el portfolio explica este acceso sin duplicar passwords.
REST y WebSockets productivos se describen como futuras posibilidades.

## Validación del portfolio — Sprint 10

- Prettier global: PASS.
- Suite Angular/Vitest del portfolio: **47 tests**, **19 archivos**, PASS.
- Production build: PASS, **0 warnings**, budgets sin modificar.
- Bundle inicial: **289,88 kB**, transferencia estimada **76,56 kB**.
- Chunk lazy Sentinel: **31,69 kB**, transferencia estimada **9,09 kB**.
- CSS optimizado según `browser-stats.json`: Sentinel **3 990 bytes**,
  ProjectCard **3 960 bytes**, Portfolio Engineering **3 951 bytes**.
- Chrome: 375, 430, 768, 1024, 1440 y 1920 px sin overflow horizontal,
  sin elementos del case study fuera del viewport y con imágenes decodificadas.
- axe WCAG A/AA sobre el case study: **0 infracciones** en los seis anchos.
- Navegación: TOC y offset de navbar, vuelta a work/contact, apertura real de
  demo en otra pestaña, título de documento y ausencia de errores de navegador: PASS.
- Home no solicita capturas ni el chunk lazy del case study Sentinel: PASS.

Estos resultados pertenecen a la integración en el portfolio. No representan una
nueva ejecución de tests o de Lighthouse del producto Sentinel ni una certificación
de accesibilidad. La revisión manual con tecnologías de asistencia sigue siendo útil.
