import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    expect(TestBed.createComponent(AppComponent).componentInstance).toBeTruthy();
  });

  it('should focus the main content without navigating away from the catalog', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/design-system');
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    element.querySelector<HTMLAnchorElement>('.skip-link')?.click();
    await fixture.whenStable();
    expect(router.url).toBe('/design-system');
    expect(document.activeElement).toBe(element.querySelector('main'));
  });

  it('should render the layout and skip link', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('header nav .brand')?.getAttribute('aria-label')).toBe(
      'OH. — Oscar Hinjos · Inicio',
    );
    expect(element.querySelector('footer')?.textContent).toContain(
      `© ${new Date().getFullYear()} Oscar Hinjos`,
    );
    expect(element.querySelector('footer')?.textContent).toContain('Built with Angular');
    expect(element.querySelector('router-outlet')).toBeTruthy();
    expect(element.querySelector('.skip-link')?.getAttribute('href')).toBe('#main-content');
  });
});
