import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([])],
    }),
  );

  it('renders the brand, navigation and contact CTA with coherent anchors', async () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const links = [...element.querySelectorAll('#primary-navigation a')];
    expect(links.map((link) => link.textContent?.trim())).toEqual([
      'Work',
      'Experience',
      'Skills',
      'About',
      'Contact',
    ]);
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/#work',
      '/#experience',
      '/#skills',
      '/#about',
      '/#contact',
    ]);
    expect(element.querySelector('.brand')?.textContent).toBe('OH.');
    expect(element.querySelector('nav')?.getAttribute('aria-label')).toBe('Navegación principal');
  });

  it('toggles the mobile menu and synchronizes aria-expanded and its label', async () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const toggle = element.querySelector<HTMLButtonElement>('button');
    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
    expect(toggle?.getAttribute('aria-controls')).toBe('primary-navigation');
    toggle?.click();
    await fixture.whenStable();
    expect(fixture.componentInstance.menuOpen()).toBe(true);
    expect(toggle?.getAttribute('aria-expanded')).toBe('true');
    expect(toggle?.getAttribute('aria-label')).toBe('Cerrar menú de navegación');
    toggle?.click();
    await fixture.whenStable();
    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
  });

  it('closes on Escape and restores focus to the toggle', async () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const toggle = element.querySelector<HTMLButtonElement>('button');
    toggle?.click();
    await fixture.whenStable();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fixture.whenStable();
    expect(fixture.componentInstance.menuOpen()).toBe(false);
    expect(document.activeElement).toBe(toggle);
  });

  it('closes after clicking a navigation link', async () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    element.querySelector<HTMLButtonElement>('button')?.click();
    await fixture.whenStable();
    element.querySelector<HTMLAnchorElement>('#primary-navigation a')?.click();
    await fixture.whenStable();
    expect(fixture.componentInstance.menuOpen()).toBe(false);
    expect(TestBed.inject(Router).url).toBe('/#work');
  });

  it('navigates to About and closes the mobile menu', async () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    await fixture.whenStable();
    fixture.componentInstance.toggleMenu();
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    element.querySelector<HTMLAnchorElement>('a[href="/#about"]')?.click();
    await fixture.whenStable();
    expect(TestBed.inject(Router).url).toBe('/#about');
    expect(fixture.componentInstance.menuOpen()).toBe(false);
  });

  it('navigates to Experience and closes the mobile menu', async () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    await fixture.whenStable();
    fixture.componentInstance.toggleMenu();
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    element.querySelector<HTMLAnchorElement>('a[href="/#experience"]')?.click();
    await fixture.whenStable();
    expect(TestBed.inject(Router).url).toBe('/#experience');
    expect(fixture.componentInstance.menuOpen()).toBe(false);
  });
});
