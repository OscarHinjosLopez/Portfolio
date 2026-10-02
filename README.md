# Oscar Hinjos — Frontend Portfolio

Base Angular de los Sprints 0, 1 y 2: standalone components, Router, SCSS y TypeScript estricto. Sin SSR.

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
- `src/app/features/home/`: página inicial y Hero.
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
- `TechChipComponent`: selector `app-tech-chip`; input `label` obligatorio.
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
desde 1024 px. La altura mínima usa 100svh para adaptarse a la interfaz móvil.
El footer existente se conserva.

Los enlaces Work, Experience, Skills, About, Contact y Ver proyectos apuntan a
anchors futuros de Home. No se han creado destinos ni secciones ficticias. El
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
- Comprueba la descarga del CV; los anchors tendrán contenido en futuros sprints.
- `/design-system` sigue disponible y no aparece en la navbar.

## Comprobaciones manuales

- `/`: Home con navbar y footer.
- `/projects/example`: placeholder.
- `/ruta-inexistente`: 404 y enlace al inicio.
- Pulsa Tab y activa «Saltar al contenido principal».
- Comprueba título y meta description en el documento.

En un despliegue SPA, el servidor debe devolver index.html para rutas de la aplicación.
