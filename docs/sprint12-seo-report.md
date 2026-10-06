# Sprint 12 — SEO y prerender

## Archivos y render

Creado:

- `src/main.server.ts`, `src/app/app.config.server.ts`, `src/app/app.routes.server.ts`.
- `src/app/core/config/site.config.ts`, `seo.config.ts`.
- `src/app/core/models/seo.model.ts`.
- `src/app/core/services/seo.service.ts`, `seo-title.strategy.ts`, `seo.service.spec.ts`.
- `scripts/generate-seo-assets.mjs`, `scripts/check-prerender.mjs`.
- `public/assets/og/home.png`, `portfolio-engineering.png`, `sentinel.png`.
- `public/favicon.svg`, `public/robots.txt`, `public/sitemap.xml`, `vercel.json`, este informe.

Modificado funcionalmente:

- `angular.json`: salida estática explícita, entrada de prerender; budgets intactos.
- `package.json`, `package-lock.json`: soporte oficial SSR, scripts; Express retirado.
- `tsconfig.app.json`: tipos Node añadidos por el schematic oficial.
- `src/app/app.config.ts`: hidratación y estrategia de títulos.
- `src/app/app.routes.ts`: SEO por ruta, LoL explícito y 404 explícita.
- `src/app/app.routes.spec.ts`: títulos actualizados, desconocidos llevan a 404.
- `src/app/features/projects/project-placeholder.component.ts`: slug desde datos de ruta.
- `src/index.html`: fallback, robots conservador, favicon y theme-color.
- `README.md`: documentación SEO.

El favicon ICO anterior se elimina. Prettier normaliza finales de línea en archivos del
Sprint 11; esos archivos no contienen cambios funcionales de esta entrega.

Angular instalado: **22.2.1**. Se ejecutó `ng add @angular/ssr@22.2.1` y se adaptó
el resultado a `outputMode: "static"`. No hay entrada Express ni servidor permanente.
Se conservan `provideClientHydration`, `provideServerRendering(withRoutes(...))`
y las APIs de la [documentación oficial de Angular](https://angular.dev/guide/ssr).

Rutas prerenderizadas: `/`, `/projects/portfolio-engineering`, `/projects/sentinel`,
`/design-system`, `/projects/lol-scenario-trainer`, `/404`.

No fue necesario cambiar las APIs de navegador: ScrollSpy y Reveal ejecutan su trabajo
en `afterNextRender`, con `DOCUMENT.defaultView` e IntersectionObserver/matchMedia
protegidos. El offset del router ya se obtiene mediante DOCUMENT. No existen accesos
productivos a navigator, localStorage o sessionStorage. Menú y foco se ejecutan por eventos.

## Configuración por página

Única fuente del dominio: `SITE_CONFIG.url` = **https://portfolio-phi-flax-36.vercel.app**.
Los enlaces personales se reutilizan desde PROFILE.

| Página        | Title                                                       | Canonical                                                                    | Robots           |
| ------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------- |
| Home          | Oscar Hinjos \| Frontend Engineer \| Angular & TypeScript   | https://portfolio-phi-flax-36.vercel.app/                                    | index,follow     |
| Portfolio     | Portfolio Engineering \| Angular Case Study \| Oscar Hinjos | https://portfolio-phi-flax-36.vercel.app/projects/portfolio-engineering      | index,follow     |
| Sentinel      | Sentinel \| Angular Cybersecurity Dashboard \| Oscar Hinjos | https://portfolio-phi-flax-36.vercel.app/projects/sentinel                   | index,follow     |
| Design System | Design System \| Oscar Hinjos                               | https://portfolio-phi-flax-36.vercel.app/design-system                       | noindex,follow   |
| LoL           | LoL Scenario Trainer \| Oscar Hinjos                        | https://portfolio-phi-flax-36.vercel.app/projects/lol-scenario-trainer       | noindex,follow   |
| 404           | Página no encontrada \| Oscar Hinjos                        | URL solicitada sin query ni fragment; `/404` en el fichero estático de error | noindex,nofollow |

Descriptions:

- Home: Frontend Engineer especializado en Angular, TypeScript y RxJS. Portfolio de Oscar Hinjos con experiencia, proyectos y case studies de frontend.
- Portfolio: Case study del portfolio de Oscar Hinjos: arquitectura Angular, Design System, responsive, accesibilidad, testing y rendimiento.
- Sentinel: Case study de Sentinel, un dashboard SOC construido con Angular, Signals y RxJS con RBAC, tiempo real, accesibilidad y testing.
- Design System: Catálogo interno de componentes y estilos del portfolio de Oscar Hinjos.
- LoL: Case study de LoL Scenario Trainer en construcción.
- 404: La página solicitada no existe en el portfolio de Oscar Hinjos.

Todas las páginas tienen `og:title` y `og:description` iguales a su title y description;
`og:url` igual al canonical; `og:site_name` = Oscar Hinjos — Frontend Engineer;
`og:locale` = es_ES. Home usa `og:type=website`; los dos case studies, `article`;
las páginas no indexables usan website.

| Página          | og:image (también twitter:image)                                             | og:image:alt (también twitter:image:alt)                                     |
| --------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Home y fallback | https://portfolio-phi-flax-36.vercel.app/assets/og/home.png                  | Oscar Hinjos — Frontend Engineer. Angular, TypeScript, RxJS y React.         |
| Portfolio       | https://portfolio-phi-flax-36.vercel.app/assets/og/portfolio-engineering.png | Case study Portfolio Engineering — Angular y TypeScript                      |
| Sentinel        | https://portfolio-phi-flax-36.vercel.app/assets/og/sentinel.png              | Sentinel — Cybersecurity Operations Dashboard con captura real del dashboard |

Twitter: `summary_large_image`, title y description correspondientes, imagen absoluta
y alt. No hay twitter:site ni meta keywords. Canonical y metadatos no se acumulan;
al volver a Home se restablece index,follow y su JSON-LD.

## Imágenes y structured data

Las tres imágenes se capturaron con Chrome local a **1200 × 630**, PNG, sin instalar
dependencias. Estética oscura, tipografía legible y acento violeta. Sentinel incorpora
`public/assets/projects/sentinel/dashboard.webp`, captura real existente.

| PNG                       | Dimensiones |  Bytes | kB decimales |
| ------------------------- | ----------- | -----: | -----------: |
| home.png                  | 1200 × 630  |  28761 |        28,76 |
| portfolio-engineering.png | 1200 × 630  |  26249 |        26,25 |
| sentinel.png              | 1200 × 630  | 122563 |       122,56 |

Home: graph con Person, WebSite y ProfilePage. Person: Oscar Hinjos López, alternateName
Oscar Hinjos, Frontend Engineer, URL Home, GitHub y LinkedIn reales, knowsAbout Angular,
TypeScript, RxJS y React. ID estable `https://portfolio-phi-flax-36.vercel.app/#person`.
WebSite tiene name, url, inLanguage es-ES y author al Person; ProfilePage mainEntity Person.
Sin email, teléfono, dirección ni SearchAction. JSON-LD: **913 bytes**.

Portfolio: WebPage + CreativeWork, nombre Portfolio Engineering, description y URL reales,
creator al Person, inLanguage es-ES, about Angular frontend engineering, keywords Angular,
TypeScript, SCSS, Accessibility, Testing. **1194 bytes**.

Sentinel: WebPage + CreativeWork, nombre Sentinel, description y URL reales, creator al
Person, inLanguage es-ES, about Cybersecurity Operations Dashboard; keywords Angular,
Signals, RxJS, RBAC, Accessibility. **1114 bytes**. Sin ofertas, reseñas ni ratings inventados.

Objetos tipados serializados mediante JSON.stringify y asignados a script.textContent.
Un script vigente por página pública; se elimina al navegar a páginas auxiliares/error.

## Robots, sitemap y hosting

robots.txt:

```text
User-agent: *
Allow: /
Sitemap: https://portfolio-phi-flax-36.vercel.app/sitemap.xml
```

Sitemap XML: exactamente Home, Portfolio Engineering y Sentinel con sus canonicals.
Excluye Design System, LoL y 404; no inventa lastmod ni prioridad.
`npm run build` regenera ambos archivos desde SITE_CONFIG.url.

Vercel sirve `dist/oscar-portfolio/browser`: rutas conocidas a sus HTML propios,
assets mediante filesystem y desconocidos a `/404/index.html` con estado HTTP 404.
La configuración utiliza [routes de Vercel](https://vercel.com/docs/project-configuration/vercel-json).
No se ha desplegado; la verificación de hosting real queda para el sprint de despliegue.

## Validación y métricas

- **64 tests / 23 archivos**, todos pasan; seis tests SEO nuevos. Cubren metadatos Home,
  ambos case studies, schemas, duplicados, noindex y navegación con fragments.
  Los tests existentes se conservan y adaptan a títulos y comportamiento de rutas.
- `npm run check:prerender`: pasa. Obtiene el output desde angular.json y verifica
  contenido h1, title, description, canonical único, OG, Twitter, JSON-LD, robots,
  seis páginas, sitemap de tres URLs y dimensiones/bytes PNG.
- HTML servido por HTTP, sin ejecutar JavaScript: Home **85211 bytes**, Portfolio
  **49290 bytes**, Sentinel **60871 bytes**. Los tres incluyen h1, contenido, metadatos y JSON-LD.
- Axe: **0 infracciones** en Home, Portfolio y Sentinel, tanto a 375 como a 1440 px.
- Regresión Chrome tras hidratación: sin overflow a 375, 430, 768, 1024, 1440 y 1920;
  ScrollSpy Home y ambos TOCs, reveals y desconexión de observers, navbar,
  menú móvil/teclado/foco, touch targets, reduced motion, anclas, retorno a Work,
  Back con restauración de posición, skip link, capturas Sentinel cargadas y títulos
  al navegar/Back. Sin pageerrors. Metadatos únicos y noindex restablecido.
- Prettier: pasa.
- Production build: seis rutas prerenderizadas, **0 warnings**, budgets intactos.

| Métrica                                 |        Antes |       Después |              Diferencia |
| --------------------------------------- | -----------: | ------------: | ----------------------: |
| Bundle inicial                          | 297032 bytes |  339427 bytes | +42395 bytes (+14,27 %) |
| Transferencia inicial estimada          |     78,60 kB |      91,40 kB |               +12,80 kB |
| Output total, incluyendo stats de build | 969756 bytes | 1747347 bytes |           +777591 bytes |

La subida del bundle incluye el soporte de hidratación del framework; el servicio SEO
y sus datos permanecen pequeños. Output servido (`browser/`): **1161022 bytes**.
No se añade un servidor Node al despliegue. El peso en disco incluye seis documentos
estáticos y los tres PNG. No se ejecutó Lighthouse ni se avanzó al Sprint 13.

## Comprobaciones manuales después del despliegue autorizado

Ver el código fuente de las tres páginas, probar deep links y fragments; compartir cada
URL en LinkedIn/X y comprobar las imágenes. Los servicios sociales pueden conservar
caché de previews anteriores. Confirmar robots/sitemap y HTTP 404 real en Vercel.
Esta entrega verifica los archivos locales, no afirma que el sitio público ya los sirva.

URLs exactas:

- https://portfolio-phi-flax-36.vercel.app/
- https://portfolio-phi-flax-36.vercel.app/projects/portfolio-engineering
- https://portfolio-phi-flax-36.vercel.app/projects/sentinel
- https://portfolio-phi-flax-36.vercel.app/design-system
- https://portfolio-phi-flax-36.vercel.app/projects/lol-scenario-trainer
- https://portfolio-phi-flax-36.vercel.app/ruta-inexistente
- https://portfolio-phi-flax-36.vercel.app/robots.txt
- https://portfolio-phi-flax-36.vercel.app/sitemap.xml
- https://portfolio-phi-flax-36.vercel.app/assets/og/home.png
- https://portfolio-phi-flax-36.vercel.app/assets/og/portfolio-engineering.png
- https://portfolio-phi-flax-36.vercel.app/assets/og/sentinel.png
