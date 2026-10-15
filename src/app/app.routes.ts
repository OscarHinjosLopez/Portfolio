import { SEO } from './core/config/seo.config';
import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    title: SEO.home.title,
    data: { seo: SEO.home },
  },
  {
    path: 'design-system',
    title: SEO.designSystem.title,
    data: { seo: SEO.designSystem },
    loadComponent: () =>
      import('./features/design-system/design-system.component').then(
        (m) => m.DesignSystemComponent,
      ),
  },

  {
    path: '404',
    title: SEO.notFound.title,
    loadComponent: () =>
      import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
  {
    path: '**',
    title: SEO.notFound.title,
    loadComponent: () =>
      import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
