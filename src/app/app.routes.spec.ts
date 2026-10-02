import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { HomeComponent } from './features/home/home.component';
import { ProjectPlaceholderComponent } from './features/projects/project-placeholder.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { DesignSystemComponent } from './features/design-system/design-system.component';

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
    await harness.navigateByUrl('/projects/portfolio-engineering', ProjectPlaceholderComponent);
    expect(harness.routeNativeElement?.textContent).toContain('Case study en construcción');
  });

  it('updates the project title when reusing the placeholder route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/projects/portfolio-engineering', ProjectPlaceholderComponent);
    expect(harness.routeNativeElement?.textContent).toContain('Portfolio Engineering');
    await harness.navigateByUrl('/projects/lol-scenario-trainer', ProjectPlaceholderComponent);
    expect(harness.routeNativeElement?.textContent).toContain('LoL Scenario Trainer');
    expect(harness.routeNativeElement?.querySelector('a')?.getAttribute('href')).toBe('/#work');
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
