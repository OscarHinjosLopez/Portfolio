import { TestBed } from '@angular/core/testing';
import { SeoTitleStrategy } from './core/services/seo-title.strategy';
import { Router, TitleStrategy, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { HomeComponent } from './features/home/home.component';
import { ProjectPlaceholderComponent } from './features/projects/project-placeholder.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { DesignSystemComponent } from './features/design-system/design-system.component';
import { PortfolioEngineeringComponent } from './features/projects/portfolio-engineering/portfolio-engineering.component';
import { Title } from '@angular/platform-browser';
import { SentinelCaseStudyComponent } from './features/projects/sentinel/sentinel-case-study.component';

describe('Application routes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes), { provide: TitleStrategy, useClass: SeoTitleStrategy }],
    });
  });

  it('should show the design system catalog at /design-system', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/design-system', DesignSystemComponent);
    const element = harness.routeNativeElement;
    expect(element?.querySelector('h1')?.textContent).toBe('Design System');
    expect(element?.querySelectorAll('section').length).toBe(7);
    expect(element?.querySelectorAll('button[appButton]').length).toBe(12);
    expect(element?.querySelector('main')?.id).toBe('main-content');
  });

  it('should show Home at / with an accessible main target', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/', HomeComponent);
    const main = harness.routeNativeElement?.querySelector('main');
    expect(main?.querySelector('app-hero')).toBeTruthy();
    expect(main?.querySelector('h1')?.textContent).toContain('Frontend');
    expect(main?.id).toBe('main-content');
    expect(main?.getAttribute('tabindex')).toBe('-1');
  });

  it('should show a placeholder for a project slug', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/projects/lol-scenario-trainer', ProjectPlaceholderComponent);
    expect(harness.routeNativeElement?.textContent).toContain('Case study en construcción');
  });

  it('navigates from an unknown project to the known placeholder', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/projects/unknown-project', NotFoundComponent);
    expect(harness.routeNativeElement?.textContent).toContain('404');
    await harness.navigateByUrl('/projects/lol-scenario-trainer', ProjectPlaceholderComponent);
    expect(harness.routeNativeElement?.textContent).toContain('LoL Scenario Trainer');
    expect(harness.routeNativeElement?.querySelector('a')?.getAttribute('href')).toBe('/#work');
  });

  it('lazy-loads Sentinel with its title, section links and Home return actions', async () => {
    const route = routes.find((route) => route.path === 'projects/sentinel');
    expect(route?.component).toBeUndefined();
    expect(route?.loadComponent).toBeDefined();
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/projects/sentinel', SentinelCaseStudyComponent);
    expect(TestBed.inject(Title).getTitle()).toBe(
      'Sentinel | Angular Cybersecurity Dashboard | Oscar Hinjos',
    );
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toBe('Sentinel');
    expect(harness.routeNativeElement?.textContent).not.toContain('Case study en construcción');
    const link = harness.routeNativeElement?.querySelector<HTMLAnchorElement>(
      '.toc a[href="/projects/sentinel#architecture"]',
    );
    expect(link).toBeTruthy();
    link?.click();
    await harness.fixture.whenStable();
    expect(TestBed.inject(Router).url).toBe('/projects/sentinel#architecture');
    harness.routeNativeElement
      ?.querySelector<HTMLAnchorElement>('.closing a[href="/#work"]')
      ?.click();
    await harness.fixture.whenStable();
    expect(TestBed.inject(Router).url).toBe('/#work');
    await harness.navigateByUrl('/projects/sentinel', SentinelCaseStudyComponent);
    harness.routeNativeElement
      ?.querySelector<HTMLAnchorElement>('.closing a[href="/#contact"]')
      ?.click();
    await harness.fixture.whenStable();
    expect(TestBed.inject(Router).url).toBe('/#contact');
  });

  it('loads the portfolio case study and returns to projects and contact', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/projects/portfolio-engineering', PortfolioEngineeringComponent);
    expect(TestBed.inject(Title).getTitle()).toBe(
      'Portfolio Engineering | Angular Case Study | Oscar Hinjos',
    );
    expect(harness.routeNativeElement?.querySelector('#architecture')).toBeTruthy();
    const contextLink = harness.routeNativeElement?.querySelector<HTMLAnchorElement>('.toc a');
    expect(contextLink?.getAttribute('href')).toBe('/projects/portfolio-engineering#context');
    contextLink?.click();
    await harness.fixture.whenStable();
    expect(TestBed.inject(Router).url).toBe('/projects/portfolio-engineering#context');
    harness.routeNativeElement
      ?.querySelector<HTMLAnchorElement>('.closing a[href="/#work"]')
      ?.click();
    await harness.fixture.whenStable();
    expect(TestBed.inject(Router).url).toBe('/#work');
    await harness.navigateByUrl('/projects/portfolio-engineering', PortfolioEngineeringComponent);
    harness.routeNativeElement
      ?.querySelector<HTMLAnchorElement>('.closing a[href="/#contact"]')
      ?.click();
    await harness.fixture.whenStable();
    expect(TestBed.inject(Router).url).toBe('/#contact');
  });

  it('should show 404 and return Home through routerLink', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/ruta-inexistente', NotFoundComponent);
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toBe('404');
    expect(harness.routeNativeElement?.textContent).toContain('Página no encontrada');
    const link = harness.routeNativeElement?.querySelector<HTMLAnchorElement>('a');
    expect(link?.textContent).toBe('Volver al inicio');
    link?.click();
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(TestBed.inject(Router).url).toBe('/');
    expect(harness.routeNativeElement?.querySelector('app-hero')).toBeTruthy();
  });
});
