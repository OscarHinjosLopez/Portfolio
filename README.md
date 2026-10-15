# Oscar Hinjos — Portfolio

Portfolio personal con Angular, TypeScript y SCSS. Incluye presentación con foto,
stack, experiencia, forma de trabajo, perfil y contacto directo con CV.
La sección de proyectos queda pendiente de recibir el contenido definitivo.

## Desarrollo

```sh
npm ci
npm start
```

Abrir http://localhost:4200. En PowerShell con scripts deshabilitados, usar npm.cmd.

## Estructura

- `src/app/features/home/`: secciones de la portada y datos de experiencia.
- `src/app/core/config/`: perfil, dominio y metadatos SEO.
- `src/app/layout/`: navegación y pie de página.
- `src/app/shared/`: componentes y directivas reutilizables.
- `src/styles/`: estilos, tokens y movimiento reducido.
- `public/assets/`: foto, CV, fuentes locales e imagen social de Home.

Los datos de contacto se editan en `profile.config.ts`; el dominio, en
`site.config.ts`. Home tiene su plantilla en `home.component.html`.
Los proyectos anteriores y sus recursos se han retirado; no hay tarjetas de ejemplo.

## Validación

```sh
npm test -- --watch=false
npm run build
npm run check:prerender
node scripts/check-links.mjs
node scripts/audit-browser.mjs
```

La auditoría de navegador comprueba responsive, axe, consola, foto y menú móvil.
Requiere Playwright y axe instalados en el directorio indicado por
`BROWSER_TOOLS_ROOT`; `CHROME_PATH` permite seleccionar Chrome.
`npm run audit:lighthouse -- current` mide Home en móvil y escritorio.
Las capturas de comprobación se generan en `reports/redesign/` y no se versionan.

## Publicación y SEO

El build genera HTML estático para Home, el catálogo interno `/design-system`
y la página 404. Solo Home aparece en el sitemap. Vercel sirve las rutas
desconocidas con HTTP 404. No se requiere un servidor Node permanente.

Los informes de sprints en `docs/` y `reports/` se conservan como historial;
no acreditan el estado actual. La [revisión manual de accesibilidad](docs/manual-accessibility-checklist.md)
sigue pendiente de ejecutarse con NVDA o VoiceOver.
