# Oscar Hinjos — Frontend Portfolio

Base Angular del Sprint 0: standalone components, Router, SCSS y TypeScript estricto. Sin SSR.

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
- `src/styles/`: tokens, reset, tipografía y mixins SCSS.

Las carpetas core y shared se crearán cuando exista código que las necesite.

## Comprobaciones manuales

- `/`: Home con navbar y footer.
- `/projects/example`: placeholder.
- `/ruta-inexistente`: 404 y enlace al inicio.
- Pulsa Tab y activa «Saltar al contenido principal».
- Comprueba título y meta description en el documento.

En un despliegue SPA, el servidor debe devolver index.html para rutas de la aplicación.
