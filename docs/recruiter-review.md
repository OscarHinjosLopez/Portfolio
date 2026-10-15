> Documento histórico anterior a la retirada de los proyectos. Sus rutas, capturas y resultados no describen la versión actual.

# Revisión recruiter y Frontend Lead — Sprint 14

Fecha: 6 de octubre de 2026. Evaluación humana del contenido y de capturas/navegación
en producción. Las ventanas de 10/30 segundos y dos minutos son recorridos simulados,
no un estudio con recruiters reales. Puntuaciones de criterio profesional, no métricas
automatizadas ni garantía de contratación.

## Primera lectura y proyectos

**Home: 8/10.** Nombre, Frontend Engineer, disponibilidad, Angular/TypeScript/React y
CTAs a proyectos/CV aparecen en la primera vista a 375 y 1920 px. La jerarquía funciona
y no necesita cambios de copy. La página completa es larga en móvil, pero el menú
lleva directamente a la información importante.

En el recorrido de 30 segundos, credenciales «Desde 2022» y enlaces Work/Experience/
Contact permiten descubrir especialización, proyectos, empresas y contacto. En dos
minutos, Skills → Work → Experience → About → Contact aporta detalle sin depender de
efectos ni de un formulario. About repite la especialización como resumen útil; no se
elimina contenido válido por esa repetición.

**Portfolio Engineering: 8/10.** Demuestra decisiones sobre una aplicación que se está
usando: arquitectura Angular, componentes, responsive, pruebas y accesibilidad.
Tiene profundidad y TOC desktop; un recruiter generalista puede quedarse con el hero.

**Sentinel: 9/10.** Es la evidencia más cercana a problemas empresariales: datos densos,
roles/permisos, estados y realtime, con demo y capturas reales. Explica honestamente
mock auth, datos ficticios, realtime simulado y Audit preview. No acredita por sí solo
una operación empresarial real ni impacto comercial medido.

Se conserva el orden **01 Portfolio Engineering / 02 Sentinel / 03 LoL Scenario Trainer**.
Para candidaturas Angular enterprise podría ser útil destacar Sentinel primero, pero
es una propuesta futura, no un motivo para reordenar este portfolio en el cierre.
LoL se identifica claramente como IN DEVELOPMENT y su stack es planificado/noindex.

## Scorecard recruiter

| Criterio              | 0–10 | Evaluación                                                                                                          |
| --------------------- | ---: | ------------------------------------------------------------------------------------------------------------------- |
| First impression      |    8 | Presentación clara y sobria, con espacio y acciones visibles.                                                       |
| Role clarity          |    9 | Frontend Engineer y Angular/TypeScript aparecen inmediatamente.                                                     |
| Technical credibility |    8 | Case studies, GitHub y límites explícitos sostienen los claims; faltan resultados de operación real para subir más. |
| Projects              |    8 | Dos trabajos explicados y una propuesta claramente en desarrollo.                                                   |
| Experience            |    8 | Cuatro empresas, fechas y responsabilidades concretas; se conserva la información profesional existente.            |
| Scannability          |    8 | Eyebrows, headings, chips y TOCs ayudan, aunque los case studies requieren lectura larga en móvil.                  |
| Mobile                |    8 | Hero, menú, proyectos, retorno, CV y contacto funcionan sin overflow; falta contraste en un dispositivo físico.     |
| Accessibility         |    8 | Axe, foco y teclado pasan, pero aún no se ha ejecutado NVDA/VoiceOver real.                                         |
| Performance           |    9 | Producción obtiene medianas Lighthouse 100; no equivale a métricas CrUX de usuarios reales.                         |
| Contactability        |    9 | Email y CV directos, GitHub público y LinkedIn identificado; este último requiere revisión manual por bloqueo 999.  |

## Scorecard Frontend Lead

Evaluación basada únicamente en lo visible en el portfolio y sus case studies.

| Criterio          | 0–10 | Evaluación                                                                                                           |
| ----------------- | ---: | -------------------------------------------------------------------------------------------------------------------- |
| Architecture      |    8 | Features, shared y core con responsabilidades claras y rutas lazy, sin estructura innecesaria.                       |
| Angular knowledge |    8 | Standalone, Signals, RxJS, Router, SSG e hidratación muestran uso consciente del framework.                          |
| State management  |    8 | Sentinel explica separación de estado local y streams; no se observa carga operativa real de producción.             |
| Testing           |    8 | Hay pruebas y validaciones reproducibles de rutas/SEO/interacción; el recuento no sustituye la calidad del conjunto. |
| Accessibility     |    8 | Semántica, teclado, reduced motion y axe están comprobados; lector de pantalla pendiente.                            |
| Performance       |    9 | Lazy loading y capturas responsive se sostienen con mediciones y network, sin perseguir puntuaciones con hacks.      |
| Product thinking  |    8 | Sentinel presenta flujos, estados y trade-offs; la experiencia profesional explica colaboración con backend/QA.      |

## Exactitud y decisiones editoriales

Se revisan los datos existentes sin introducir experiencia nueva:

| Empresa        | Cargo                  | Periodo visible     |
| -------------- | ---------------------- | ------------------- |
| Equipo TIC XXI | Frontend Developer     | Oct 2025 – Ago 2026 |
| Ayesa          | Frontend Developer     | Ago 2024 – Oct 2025 |
| Indra          | Software Developer     | Feb 2023 – Jul 2024 |
| Avirato        | Programador Full Stack | Mar 2022 – Jun 2022 |

Las empresas, cargos y periodos también se contrastaron visualmente con la página del CV,
renderizada por el visor PDF de Chrome. El comienzo en marzo de 2022 es coherente con «Desde 2022». Angular, TypeScript,
RxJS y React están presentados según los datos profesionales existentes; los cargos,
fechas y tecnologías no se modifican. La mezcla editorial español/inglés es deliberada.
El CV se conserva byte por byte. No se detecta una razón factual para reescribir copy,
eliminar secciones, alterar orden ni convertir Sentinel en software empresarial en producción.

## Hallazgos clasificados antes de cambiar

| Clase        | Hallazgo                                                                                 | Decisión / estado                                                                                                                             |
| ------------ | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| BLOCKER      | No hay sesión Vercel disponible para publicar este candidato en el proyecto del usuario. | Vercel CLI devuelve Logged out; no se hace deploy temporal, commit ni push. Sigue pendiente publicación y post-deploy.                        |
| SHOULD FIX   | La 404 pública contiene canonical a `/404`.                                              | Corregido localmente: sin canonical ni og:url heredado; test de recuperación de canonical al volver a Home. Producción aún debe actualizarse. |
| SHOULD FIX   | Faltan og:image:width/height en las tres páginas públicas.                               | Corregido localmente: 1200/630 y MIME image/png; tests y prerender los verifican. Pendiente publicar.                                         |
| SHOULD FIX   | README describía sprints antiguos, «Sin SSR» y navegación SPA que ya no corresponden.    | Sustituido por una presentación técnica breve y actual del repositorio.                                                                       |
| NICE TO HAVE | Destacar Sentinel primero para candidaturas enterprise.                                  | Propuesta opcional; se mantiene el orden solicitado.                                                                                          |
| NICE TO HAVE | TTL largo para assets hashed y headers mínimos de seguridad.                             | Se observa CDN HIT y compresión Brotli; no se cambian cache/headers a ciegas con Performance 100. CSP queda fuera.                            |
| ACCEPTED     | LoL es un placeholder.                                                                   | Estado y stack planificado explícitos, noindex y fuera del sitemap.                                                                           |
| ACCEPTED     | Case studies extensos.                                                                   | Profundidad útil para técnicos; TOCs y headings permiten escanear.                                                                            |
| ACCEPTED     | LinkedIn limita bots con HTTP 999.                                                       | No se declara enlace roto ni se sustituye el perfil real; revisión manual recomendada.                                                        |
| ACCEPTED     | No hay auditoría con lector de pantalla real.                                            | Checklist accionable creada; no se afirma ejecución NVDA/VoiceOver.                                                                           |

El candidato tiene resueltos sus should-fix. El veredicto final de publicación y la
evidencia HTTP se detallan en [sprint14-final-report.md](sprint14-final-report.md).
