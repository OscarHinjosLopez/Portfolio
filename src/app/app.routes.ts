import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'design-system',
    loadComponent: () =>
      import('./features/design-system/design-system.component').then(
        (m) => m.DesignSystemComponent,
      ),
  },
  {
    path: 'projects/:slug',
    loadComponent: () =>
      import('./features/projects/project-placeholder.component').then(
        (m) => m.ProjectPlaceholderComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
