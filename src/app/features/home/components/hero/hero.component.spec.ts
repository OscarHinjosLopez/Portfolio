import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeroComponent, CV_URL } from './hero.component';

describe('HeroComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HeroComponent],
      providers: [provideRouter([])],
    }),
  );

  it('renders the role, name, availability and real copy', async () => {
    const fixture = TestBed.createComponent(HeroComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const title = element.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim();
    expect(title).toMatch(/Frontend\s*Engineer\./);
    expect(element.querySelectorAll('h1').length).toBe(1);
    expect(element.textContent).toContain('Oscar Hinjos');
    expect(element.textContent).toContain('Disponible para nuevas oportunidades');
    expect(element.textContent).toContain(
      'Construyo aplicaciones web modernas, escalables y orientadas a producto',
    );
    expect(element.textContent).toContain('Madrid · España');
    expect(element.textContent).toContain('Disponible para remoto / híbrido');
  });

  it('renders exactly the primary technologies and prepared CTAs', async () => {
    const fixture = TestBed.createComponent(HeroComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const chips = [...element.querySelectorAll('app-tech-chip')].map((chip) =>
      chip.textContent?.trim(),
    );
    expect(chips).toEqual(['Angular', 'TypeScript', 'React', 'RxJS']);
    expect(element.querySelector('a[href="/#work"]')?.textContent).toContain('Ver proyectos');
    const cvLink = element.querySelector<HTMLAnchorElement>('a[download]');
    expect(cvLink?.getAttribute('href')).toBe(CV_URL);
    expect(cvLink?.getAttribute('download')).toBe('CV_Oscar_Hinjos.pdf');
  });
});
