import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  ...[
    '',
    'projects/portfolio-engineering',
    'projects/sentinel',
    'design-system',
    'projects/lol-scenario-trainer',
    '404',
  ].map((path): ServerRoute => ({ path, renderMode: RenderMode.Prerender })),
  { path: '**', renderMode: RenderMode.Client },
];
