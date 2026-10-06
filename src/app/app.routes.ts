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
    path: 'projects/portfolio-engineering',
    title: SEO.portfolio.title,
    data: { seo: SEO.portfolio },
    loadComponent: () =>
      import('./features/projects/portfolio-engineering/portfolio-engineering.component').then(
        (m) => m.PortfolioEngineeringComponent,
      ),
  },
  {
    path: 'projects/sentinel',
    title: SEO.sentinel.title,
    data: { seo: SEO.sentinel },
    loadComponent: () =>
      import('./features/projects/sentinel/sentinel-case-study.component').then(
        (m) => m.SentinelCaseStudyComponent,
      ),
  },
  {
    path: 'projects/lol-scenario-trainer',
    title: SEO.placeholder.title,
    data: { seo: SEO.placeholder, slug: 'lol-scenario-trainer' },
    loadComponent: () =>
      import('./features/projects/project-placeholder.component').then(
        (m) => m.ProjectPlaceholderComponent,
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
