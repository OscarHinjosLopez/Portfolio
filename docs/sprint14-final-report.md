> Documento histórico anterior a la retirada de los proyectos. Sus rutas, capturas y resultados no describen la versión actual.

# Sprint 14 — Recruiter Review + Deploy Final

Fecha: 6 de octubre de 2026. **NOT READY** para cerrar la release: el candidato local
está validado, pero aún no se ha publicado ni auditado después del despliegue.
La producción existente sigue teniendo canonical en la 404 y carece de dimensiones OG.

## Alcance y evidencia

Snapshot inicial: árbol Git limpio, rama `feature/sprint13`, commit
`3331053616c739b98d101fe4d4b72c2453622a16`. Se revisaron configuración, rutas, datos,
README, dependencias, build, tests y prerender. No se reseteó ni limpió trabajo del usuario.
No se añadieron dependencias, secciones, proyectos ni funcionalidades.

**CURRENT PRODUCTION** significa la versión pública existente en
https://portfolio-phi-flax-36.vercel.app/. **FINAL LOCAL CANDIDATE** significa este
árbol de trabajo, con las correcciones aún pendientes de publicar. Los resultados no
acreditan que Vercel esté sirviendo este candidato.

Evidencia reproducible:

- [HTTP público](../reports/final-audit/http-current-production.json) y [HTTP local](../reports/final-audit/http-local-candidate.json).
- [Enlaces públicos](../reports/final-audit/links-current-production.json) y [enlaces locales](../reports/final-audit/links-local-candidate.json).
- [Axe, teclado y consola públicos](../reports/final-audit/browser-current-production.json) y [candidato local](../reports/final-audit/browser-local-candidate.json).
- [Recorridos recruiter, responsive y descargas](../reports/final-audit/recruiter-browser-current-production.json).
- [Lighthouse público: 18 runs](../reports/lighthouse/current-production/summary.json).
- [Review y scorecards](recruiter-review.md) y [checklist NVDA/VoiceOver](manual-accessibility-checklist.md).

## Entrega final: los 39 puntos solicitados

| #   | Punto                        | Resultado                                                                                                                                                                                                                |
| --- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Estado inicial de producción | Navegable, prerender real, HTTPS, rutas y recursos públicos accesibles. Dos defectos SEO detectados.                                                                                                                     |
| 2   | Blockers                     | Publicación pendiente: Vercel CLI devuelve **Logged out**; sin sesión/token ni proyecto local vinculado.                                                                                                                 |
| 3   | Should-fix                   | Canonical de error, dimensiones OG y README desactualizado. Resueltos en el candidato; los dos primeros siguen pendientes en Vercel.                                                                                     |
| 4   | Nice-to-have                 | Sentinel primero para candidaturas enterprise; TTL largo para assets hashed y headers mínimos. Documentados, sin cambios de riesgo.                                                                                      |
| 5   | Cambios                      | Canonical opcional y limpieza de og:url en error; recuperación al volver a Home; OG 1200/630/image/png; tests/prerender; scripts de HTTP/enlaces y auditorías remotas; README, checklist e informes; `.vercel` ignorado. |
| 6   | Home recruiter               | 8/10: nombre, rol, tecnologías, disponibilidad y proyectos/CV visibles en primera vista.                                                                                                                                 |
| 7   | Portfolio recruiter          | 8/10: decisiones técnicas verificables en la propia aplicación.                                                                                                                                                          |
| 8   | Sentinel recruiter           | 9/10: mayor profundidad de producto, con límites de demo explicados.                                                                                                                                                     |
| 9   | Scorecard recruiter          | First impression 8; Role clarity 9; Technical credibility 8; Projects 8; Experience 8; Scannability 8; Mobile 8; Accessibility 8; Performance 9; Contactability 9. Justificaciones en el review.                         |
| 10  | Scorecard tech lead          | Architecture 8; Angular knowledge 8; State management 8; Testing 8; Accessibility 8; Performance 9; Product thinking 8. Solo evidencia visible, sin inferir operación empresarial.                                       |
| 11  | Links                        | 107 enlaces y 15 recursos comprobados, sin incidencias internas. GitHub perfil/repo y demo Sentinel 200. LinkedIn devuelve 999 al robot: pendiente manual, no demostrado roto. Mailto coincide con PROFILE.              |
| 12  | CV                           | 200, application/pdf, 78.104 bytes, PDF de una página abierto visualmente. Hero y Contact descargan `cv-oscar-hinjos.pdf`; hash público/local idéntico. No se modifica.                                                  |
| 13  | HTTP público                 | Home, Portfolio, Sentinel, Design System y LoL 200; desconocida 404; robots, sitemap, favicon, OG, CV y capturas 200.                                                                                                    |
| 14  | 404                          | Vercel devuelve HTTP 404 real y noindex,nofollow. Canonical todavía presente en producción; ausente en candidato.                                                                                                        |
| 15  | SEO público                  | Contenido, title y description presentes sin JavaScript; titles diferenciados; exactamente un canonical correcto en cada página indexable, sin query/fragment.                                                           |
| 16  | OG público                   | OG/Twitter, imágenes y alt accesibles. Faltan width/height públicos; candidato añade 1200/630 y image/png.                                                                                                               |
| 17  | JSON-LD                      | JSON válido y sin duplicados: Home Person/WebSite/ProfilePage; cases WebPage/CreativeWork.                                                                                                                               |
| 18  | robots.txt                   | 200, User-agent: *, Allow: / y Sitemap con host canonical.                                                                                                                                                               |
| 19  | sitemap.xml                  | XML válido; exactamente Home, Portfolio y Sentinel. Excluye Design System, LoL y 404.                                                                                                                                    |
| 20  | Lighthouse Home              | Medianas móvil/escritorio: 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO.                                                                                                                              |
| 21  | Lighthouse Portfolio         | Medianas móvil/escritorio: 100/100/100/100.                                                                                                                                                                              |
| 22  | Lighthouse Sentinel          | Medianas móvil/escritorio: 100/100/100/100.                                                                                                                                                                              |
| 23  | Axe público                  | Cero infracciones en las tres páginas a 375 y 1440 px, incluida comprobación adicional de nombre visible.                                                                                                                |
| 24  | Accesibilidad manual         | Semántica/foco/reduced motion revisados; NVDA/VoiceOver real no ejecutado. Checklist preparada, pendiente manual.                                                                                                        |
| 25  | Teclado                      | Tab, Shift+Tab, Enter, Escape, skip link y retorno de foco del menú pasan. Sin trampas de foco detectadas.                                                                                                               |
| 26  | Responsive                   | Home 375/430/768/1024/1440/1920; cases 375/768/1440/1920. Sin overflow; container máximo 1280 px; targets móviles de 44 px. Recorrido móvil proyectos → Sentinel → volver → contacto validado.                           |
| 27  | Consola                      | Cero errores, pageerrors o warnings en seis combinaciones página/viewport; navegación, fragments y rutas auxiliares también comprobados.                                                                                 |
| 28  | Bundle final                 | Inicial 339,69 kB, transferencia estimada Angular 91,46 kB. Cases lazy: Portfolio 23,52 kB; Sentinel 33,17 kB. Home no solicita chunks de cases ni capturas.                                                             |
| 29  | Peso de página               | HTML público descomprimido: Home 85.347 bytes, Portfolio 49.440, Sentinel 62.254. JS+CSS inicial público 339.563 bytes sin comprimir; no confundir con transferencia Brotli ni peso total con imágenes.                  |
| 30  | Tests                        | 65 tests, 23 archivos, todos pasan. Incluye transición case → 404 → Home y OG dimensions.                                                                                                                                |
| 31  | Build                        | Build de producción y seis rutas prerender completados; check:prerender pasa.                                                                                                                                            |
| 32  | Warnings                     | Cero warnings del build; cero runWarnings en Lighthouse público.                                                                                                                                                         |
| 33  | Budgets                      | Intactos: initial warning 500 kB/error 1 MB; estilos warning 4 kB/error 8 kB.                                                                                                                                            |
| 34  | Git                          | Cambios locales de este sprint sin commit/stage/push. Código SEO, scripts, README, .gitignore, documentos y JSON compactos. Sin cambios en package.json/lock.                                                            |
| 35  | Deploy                       | No realizado: CLI sin autenticar. No se creó proyecto temporal ni se escribió al remoto. Instrucciones concretas abajo.                                                                                                  |
| 36  | URL final prevista           | https://portfolio-phi-flax-36.vercel.app/; actualmente sirve la versión anterior.                                                                                                                                        |
| 37  | Veredicto                    | **NOT READY** para declarar cerrado el sprint y la release final.                                                                                                                                                        |
| 38  | Razones exactas              | Falta publicar las correcciones de canonical 404 y OG dimensions en el proyecto existente y pasar auditoría post-deploy. El candidato local ya pasa sus comprobaciones.                                                  |
| 39  | Mejoras futuras              | No aplica el bloque condicionado a READY. Se detiene el refinamiento; solo resta publicar y verificar.                                                                                                                   |

El orden sigue 01 Portfolio Engineering / 02 Sentinel / 03 LoL. LoL continúa IN
DEVELOPMENT, noindex,follow y fuera del sitemap. No hay GitHub Sentinel inventado.
La demo abre su pantalla de login/cuentas de demostración sin errores. Empresas,
cargos y fechas coinciden visualmente con el CV; no se alteró experiencia, copy ni PDF.

## Lighthouse y entrega HTTP

Tres runs por página/perfil en Vercel real, Lighthouse 13.5.0 y Chrome headless 154,
con perfiles/throttling oficiales. Valores siguientes: medianas en milisegundos.
Las cuatro categorías dan 100 en todas las combinaciones; CLS es 0 en todas.

| Página    | Perfil  |     FCP |     LCP | Speed Index | TBT | Diferencia LCP vs Sprint 13 local |
| --------- | ------- | ------: | ------: | ----------: | --: | --------------------------------: |
| Home      | Mobile  | 1536,97 | 1536,97 |     1536,97 |  59 |                            +22,24 |
| Home      | Desktop |  396,33 |  396,33 |      396,33 |   0 |                            +22,37 |
| Portfolio | Mobile  | 1384,27 | 1384,27 |     1384,27 |   0 |                           −281,66 |
| Portfolio | Desktop |  354,50 |  354,50 |      354,50 |   0 |                            −18,93 |
| Sentinel  | Mobile  | 1091,78 | 1241,78 |     1091,78 |  44 |                           −572,47 |
| Sentinel  | Desktop |  365,59 |  445,59 |      365,59 |   0 |                            +29,36 |

Comparar local y CDN no demuestra una mejora causada por código: influyen red,
cache, entorno y variación entre runs. Estas mediciones de laboratorio no prueban
INP ni Core Web Vitals de usuarios reales. Lighthouse SEO 100 tampoco comprueba
todos los requisitos OG/canonical de este sprint.

HTML, JS y CSS públicos usan Brotli; un chunk de 495 bytes puede llegar sin compresión.
Cache-Control observado en HTML, assets hashed e imágenes: `public, max-age=0,
must-revalidate`; x-vercel-cache: HIT. No se afirma cache immutable. HSTS está presente;
HTTP redirige a HTTPS. No hay dominio personalizado ni variantes www que configurar.
Los headers X-Content-Type-Options, Referrer-Policy, Permissions-Policy y CSP no están
presentes. Se valoran los tres primeros como mejora opcional; no se cambian headers
sin verificar el siguiente despliegue. CSP queda fuera del sprint. No se fuerza cache
agresiva de HTML ni compresión manual.

Tiempos observados hasta headers: Home 184 ms, Portfolio 34,5 ms, Sentinel 50,7 ms.
Son muestras de la petición de auditoría, no un percentil de TTFB ni garantía de SLA.
Capturas Sentinel responsive 720/1440 y lazy/async están comprobadas; hero eager.
OG PNG 1200 × 630: Home 28.761 bytes, Portfolio 26.249 y Sentinel 122.563.

## Publicación pendiente e instrucciones

Se comprobó autenticación con Vercel CLI: **Logged out**. El repositorio no tiene
vínculo `.vercel` ni credenciales disponibles. Se conserva el flujo de commits manuales.

Opción Git: revisar el diff, crear `chore/finalize-portfolio`, añadir únicamente los
archivos del sprint y hacer el commit manual sugerido:

```powershell
git switch -c chore/finalize-portfolio
git add .gitignore README.md docs/manual-accessibility-checklist.md docs/recruiter-review.md docs/sprint14-final-report.md scripts/audit-production.mjs scripts/check-links.mjs scripts/audit-browser.mjs scripts/check-prerender.mjs scripts/lighthouse.mjs src/app/core/config/seo.config.ts src/app/core/models/seo.model.ts src/app/core/services/seo-title.strategy.ts src/app/core/services/seo.service.ts src/app/core/services/seo.service.spec.ts reports/final-audit reports/lighthouse/current-production/summary.json
git diff --cached --stat
git commit -m "chore: finalize portfolio production audit"
git push -u origin chore/finalize-portfolio
```

El push anterior es una instrucción para ejecución manual del usuario, no una acción
realizada. Crear PR hacia la Production Branch configurada en Vercel y publicarla
según el flujo existente; no se ha verificado que dicha rama sea main.

Alternativa CLI, usando la cuenta y **el proyecto existente que sirve la URL canonical**:

```powershell
npm.cmd exec --yes --package=vercel -- vercel login
npm.cmd exec --yes --package=vercel -- vercel link
npm.cmd exec --yes --package=vercel -- vercel deploy --prod
```

No elegir un proyecto nuevo ni deploy temporal. Esperar estado Ready y comprobar
que la URL canonical sirve la nueva versión. Después ejecutar:

```powershell
$env:AUDIT_BASE_URL='https://portfolio-phi-flax-36.vercel.app'
$env:AUDIT_PHASE='production'
node scripts/audit-production.mjs
$env:CHECK_EXTERNAL='1'
node scripts/check-links.mjs
$env:BROWSER_AUDIT_REPORT='reports/final-audit/browser-production.json'
node scripts/audit-browser.mjs
npm.cmd run audit:lighthouse -- production
```

El nuevo HTTP audit debe terminar sin incidencias; exigir 404 sin canonical y OG
1200/630 en source público. Reconfirmar rutas, robots/sitemap, CV, axe, consola y
Lighthouse. `reports/lighthouse/production/` se reserva para ese despliegue final;
`current-production/` documenta exclusivamente la versión pública auditada hoy.
Playwright/axe requieren el tooling ya disponible, indicado por BROWSER_TOOLS_ROOT
si se ejecuta desde otro entorno. No se añadió al proyecto una librería nueva.

Para volver a auditorías locales, eliminar AUDIT_BASE_URL y CHECK_EXTERNAL del entorno.
Dist, node_modules, `.vercel`, capturas/debug en tmp y JSON completos de Lighthouse
están ignorados; solo informes compactos se proponen para commit. No hay source maps
publicables en el build ni secretos añadidos. Las dependencias existentes se conservan:
no se elimina un paquete basándose únicamente en ausencia de import directo.

## Comprobaciones manuales restantes

Abrir las tres URLs indexables en [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
y, si se utilizan esas redes, [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
y la vista previa del compositor de X. No se acredita una caché de terceros refrescada.
Verificar el perfil LinkedIn en navegador normal y ejecutar la checklist con un lector
real. Las capturas headless y el teclado automatizado no sustituyen esos recorridos.

Las únicas tareas necesarias para cambiar el veredicto de release son publicar el
candidato y confirmar la evidencia crítica post-deploy. No se abre otro sprint.
