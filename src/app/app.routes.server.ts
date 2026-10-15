import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  ...['', 'design-system', '404'].map((path): ServerRoute => ({
    path,
    renderMode: RenderMode.Prerender,
  })),
  { path: '**', renderMode: RenderMode.Client },
];
