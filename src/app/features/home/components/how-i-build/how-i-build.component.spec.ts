import { TestBed } from '@angular/core/testing';
import { HowIBuildComponent } from './how-i-build.component';

describe('HowIBuildComponent', () => {
  it('renders four principles grounded in frontend experience', async () => {
    TestBed.configureTestingModule({ imports: [HowIBuildComponent] });
    const fixture = TestBed.createComponent(HowIBuildComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(
      [...element.querySelectorAll('ol > li h3')].map((heading) => heading.textContent?.trim()),
    ).toEqual(['Arquitectura', 'Rendimiento', 'Calidad', 'UX & Accesibilidad']);
    expect(element.querySelectorAll('ol > li').length).toBe(4);
    expect(element.textContent).toContain('Lazy loading');
    expect(element.textContent).toContain('Testing');
  });
});
