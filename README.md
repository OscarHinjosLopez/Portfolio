# Oscar Hinjos — Frontend Portfolio

Base Angular de los Sprints 0 a 3: standalone components, Router, SCSS y TypeScript estricto. Sin SSR.

## Desarrollo

```sh
npm ci
npm start
```

En PowerShell con scripts deshabilitados, utiliza `npm.cmd`.
Abre http://localhost:4200.

## Validación

```sh
npm run format:check
npm test -- --watch=false
npm run build
```

No hay lint configurado. Prettier viene incluido en la base de Angular CLI.

## Estructura

- `src/app/layout/`: navbar y footer.
- `src/app/features/home/`: Hero, credenciales y Tech Stack.
- `src/app/features/projects/`: placeholder de case studies.
- `src/app/features/not-found/`: página 404.
- `src/app/features/design-system/`: catálogo temporal de desarrollo, lazy-loaded.
- `src/app/shared/components/`: Button, TechChip y SectionHeading.
- `src/styles/`: tokens, reset, tipografía y mixins SCSS.

La carpeta core se creará cuando exista código que la necesite.

## Design System — Sprint 1

Abre http://127.0.0.1:4200/design-system con el servidor de desarrollo activo.
Esta ruta temporal no aparece en la navbar y solo muestra ejemplos de desarrollo.

Los tokens de colores, spacing, radios, sombras, transiciones, z-index y tipografía
se centralizan en `src/styles/_variables.scss`. Los mixins se importan directamente
desde `src/styles/_mixins.scss` para no duplicar CSS global en componentes.

Utilidades: `.container`, `.section`, `.grid`, `.card`, `.text-secondary` y la escala
tipográfica desde `.display-xl` hasta `.caption`. El container mide hasta 1280 px
incluyendo padding de 20, 32 o 48 px según el breakpoint. Las cards cambian solo el
borde en hover. El mixin `transition` respeta `prefers-reduced-motion`.

### API de componentes

- `ButtonComponent`: selector `button[appButton], a[appButton]`; inputs `variant`
  (`primary`, `secondary`, `ghost`; por defecto `primary`) y `size`
  (`sm`, `md`, `lg`; por defecto `md`). El texto se proyecta. Usa `type="button"`,
  `disabled` y `(click)` nativos para acciones; `routerLink` o `href` para enlaces.
  `disabled` solo corresponde a botones nativos. Los enlaces externos en una nueva
  pestaña deben llevar `rel="noopener noreferrer"`.
- `TechChipComponent`: selector `app-tech-chip`; input `label` obligatorio y
  `variant` opcional (`default`, `emphasis`, `subtle`; por defecto `default`).
- `SectionHeadingComponent`: selector `app-section-heading`; input `title`
  obligatorio, `eyebrow` y `description` opcionales. Renderiza un `h2`.
- `DesignSystemComponent`: catálogo sin inputs públicos, en `/design-system`.

Los botones primary usan tonos derivados algo más oscuros que el accent base para
mantener un contraste de al menos 4,5:1 con texto blanco pequeño en normal y hover.
La paleta base solicitada se conserva. No se descargan fuentes ni se añaden dependencias.

### Revisión visual

- Comprueba `/design-system` a 375, 768, 1024, 1440 y 1920 px.
- Revisa colores, nueve niveles tipográficos, botones, chips, cards y spacing.
- Comprueba hover, active, disabled y navegación interna/externa.
- Usa Tab y Enter para comprobar foco y salto al contenido en la ruta actual.
- Activa la preferencia de movimiento reducido: las transiciones deben desaparecer.

## Navbar y Hero — Sprint 2

Abre http://127.0.0.1:4200/. La navbar sticky usa la marca OH., enlaces internos
y un menú móvil por debajo de 768 px. El menú se cierra al seleccionar un enlace,
cambiar de ruta o pulsar Escape; Escape devuelve el foco al botón de menú.

Home contiene un único main y el Hero, con un solo h1. El título usa display-xl
(48–88 px), el copy tiene un máximo de 600 px y la metadata aparece a la derecha
desde 1024 px. La altura mínima usa 90svh para dar continuidad a las credenciales.
El footer existente se conserva.

Skills apunta a la sección real `#skills`. Los enlaces Work, Experience, About,
Contact y Ver proyectos apuntan a anchors futuros de Home. El
router queda preparado para desplazar a esos anchors cuando existan, con offset
para la navbar y scroll automático al activar movimiento reducido.

### CV

`CV_URL` en `hero.component.ts` apunta a `/assets/cv-oscar-hinjos.pdf`.
El PDF proporcionado por Oscar está en `public/assets/cv-oscar-hinjos.pdf`.
El enlace del Hero lo descarga como `CV_Oscar_Hinjos.pdf`.

### Revisión del Sprint 2

- Comprueba Home a 375, 430, 768, 1024, 1440 y 1920 px.
- Comprueba apertura/cierre del menú, aria-expanded, Escape y navegación con Tab.
- Desde `/design-system`, pulsa Work: debe volver a Home con `#work`.
- Comprueba foco visible, skip-link, navbar sticky y movimiento reducido.
- Comprueba la descarga del CV; los anchors restantes tendrán contenido en futuros sprints.
- `/design-system` sigue disponible y no aparece en la navbar.

## Tech Stack y credenciales — Sprint 3

Contenido contrastado con el CV real de Oscar, sin niveles de dominio ni años calculados.
Las credenciales son Desde 2022 / Experiencia profesional, Angular / Especialización
principal, TypeScript / Stack principal y React / Experiencia profesional.

El stack se organiza en Frontend Core, Angular Ecosystem, React Ecosystem,
Quality & Performance, APIs & Delivery y Backend Knowledge. Angular, TypeScript
y RxJS tienen mayor relevancia; backend se presenta como conocimiento complementario.
Reactive Forms y Routing se muestran como capacidades del stack Angular.

Next.js, React Query, Zustand, MERN y PERN aparecen únicamente en Formación / Exploración,
etiquetados como Formación práctica. No se incluyen tecnologías ausentes del CV.

La composición pasa de una columna en móvil a dos en tablet y una distribución
editorial de 12 columnas desde 1024 px. Las credenciales usan 2 × 2 en móvil y
cuatro columnas desde 768 px. Los chips envuelven su contenido sin ocultar texto.

### Revisión del Sprint 3

- Abre http://127.0.0.1:4200/#skills o pulsa Skills en la navbar.
- Comprueba 375, 430, 768, 1024, 1440 y 1920 px.
- Revisa la transición Hero → credenciales → Tech Stack.
- Comprueba la jerarquía de Angular y la separación de formación y backend.
- Desde `/design-system`, Skills debe volver a Home y desplazar hasta la sección.
- Comprueba menú móvil, foco visible y preferencia de movimiento reducido.
- El CV y `/design-system` siguen disponibles; no se han creado secciones del Sprint 4.

## Comprobaciones manuales

- `/`: Home con navbar y footer.
- `/projects/example`: placeholder.
- `/ruta-inexistente`: 404 y enlace al inicio.
- Pulsa Tab y activa «Saltar al contenido principal».
- Comprueba título y meta description en el documento.

En un despliegue SPA, el servidor debe devolver index.html para rutas de la aplicación.

## Selected Work — Sprint 9

Orden de proyectos: **01 Portfolio Engineering** (LIVE, featured),
**02 Sentinel — Cybersecurity Operations Dashboard** (LIVE) y
**03 LoL Scenario Trainer** (IN DEVELOPMENT, stack planificado).

Sentinel usa Angular, TypeScript, Signals, RxJS y Material/CDK. Su acción principal
«Ver demo» abre https://sentinel-cybersecurity-operations-d.vercel.app/ en una nueva
pestaña con `noopener noreferrer`. No se publica un repositorio de Sentinel sin
validación. El visual SOC es una representación abstracta HTML/CSS, no una captura.

`Project.actions` declara enlaces tipados (`internal` / `external`) con etiqueta,
URL y variante (`primary` / `secondary`); `Project.visual` selecciona la composición
sin depender del estado LIVE. `repositoryUrl` se conserva para el case study existente.

- `/projects/portfolio-engineering`: case study real.
- `/projects/sentinel`: placeholder con demo; case study en construcción.
- `/projects/lol-scenario-trainer`: placeholder existente.
- `/#work`: Portfolio featured y Sentinel + LoL en dos columnas desde 1024 px;
  una columna por debajo, con cards que estiran sin altura fija.

Revisión manual: http://127.0.0.1:4200/#work a 375, 430, 768, 1024, 1440 y 1920 px;
comprobar título largo, chips, CTA demo, ausencia de overflow, navegación con Tab,
foco visible y apertura de la demo. Este sprint no incluye el case study de Sentinel.
