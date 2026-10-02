import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { HomeComponent } from './features/home/home.component';
import { ProjectPlaceholderComponent } from './features/projects/project-placeholder.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

describe('Application routes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
  });

  it('should show Home at / with an accessible main target', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/', HomeComponent);
    const main = harness.routeNativeElement?.querySelector('main');
    expect(main?.textContent).toBe('Oscar Hinjos — Frontend Portfolio');
    expect(main?.id).toBe('main-content');
    expect(main?.getAttribute('tabindex')).toBe('-1');
  });

  it('should show a placeholder for a project slug', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/projects/example', ProjectPlaceholderComponent);
    expect(harness.routeNativeElement?.textContent).toContain(
      'El proyecto se implementará posteriormente.',
    );
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
    expect(harness.routeNativeElement?.textContent).toContain('Oscar Hinjos — Frontend Portfolio');
  });
});
