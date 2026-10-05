import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { HomeComponent } from './features/home/home.component';
import { ProjectPlaceholderComponent } from './features/projects/project-placeholder.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { DesignSystemComponent } from './features/design-system/design-system.component';
import { PortfolioEngineeringComponent } from './features/projects/portfolio-engineering/portfolio-engineering.component';
import { Title } from '@angular/platform-browser';

describe('Application routes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
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
    await harness.navigateByUrl('/projects/unknown-project', ProjectPlaceholderComponent);
    expect(harness.routeNativeElement?.textContent).toContain('Case study en construcción');
  });

  it('updates the project title when reusing the placeholder route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/projects/sentinel', ProjectPlaceholderComponent);
    expect(harness.routeNativeElement?.textContent).toContain('Sentinel');
    const demo = harness.routeNativeElement?.querySelector('a[target="_blank"]');
    expect(demo?.getAttribute('href')).toBe(
      'https://sentinel-cybersecurity-operations-d.vercel.app/',
    );
    expect(demo?.getAttribute('rel')).toBe('noopener noreferrer');
    await harness.navigateByUrl('/projects/lol-scenario-trainer', ProjectPlaceholderComponent);
    expect(harness.routeNativeElement?.textContent).toContain('LoL Scenario Trainer');
    expect(harness.routeNativeElement?.querySelector('a')?.getAttribute('href')).toBe('/#work');
  });

  it('loads the portfolio case study and returns to projects and contact', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/projects/portfolio-engineering', PortfolioEngineeringComponent);
    expect(TestBed.inject(Title).getTitle()).toBe('Portfolio Engineering | Oscar Hinjos');
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
