# Oscar Hinjos — Frontend Portfolio

Base Angular de los Sprints 0 y 1: standalone components, Router, SCSS y TypeScript estricto. Sin SSR.

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
- `src/app/features/home/`: página inicial mínima.
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

## Comprobaciones manuales

- `/`: Home con navbar y footer.
- `/projects/example`: placeholder.
- `/ruta-inexistente`: 404 y enlace al inicio.
- Pulsa Tab y activa «Saltar al contenido principal».
- Comprueba título y meta description en el documento.

En un despliegue SPA, el servidor debe devolver index.html para rutas de la aplicación.
