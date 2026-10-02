import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PortfolioEngineeringComponent } from './portfolio-engineering.component';

describe('PortfolioEngineeringComponent', () => {
  async function render() {
    TestBed.configureTestingModule({
      imports: [PortfolioEngineeringComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(PortfolioEngineeringComponent);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('presents the project identity and implemented stack', async () => {
    const element = await render();
    expect(element.querySelectorAll('h1').length).toBe(1);
    expect(element.querySelector('h1')?.textContent).toContain('PortfolioEngineering');
    expect(element.querySelector('.status')?.textContent).toBe('LIVE');
    const stack = element.querySelector('.case-hero .chips')?.textContent;
    expect(stack).toContain('Angular');
    expect(stack).toContain('TypeScript');
    expect(stack).toContain('Vitest');
    expect(element.querySelector('main')?.getAttribute('tabindex')).toBe('-1');
  });

  it('renders all nine sections in reading order with accessible labels', async () => {
    const element = await render();
    const sections = [...element.querySelectorAll('section')];
    expect(sections.map((section) => section.id)).toEqual([
      'context',
      'architecture',
      'design-system',
      'responsive',
      'performance',
      'testing',
      'challenges',
      'result',
      'learnings',
    ]);
    for (const section of sections) {
      const label = element.querySelector(`#${section.getAttribute('aria-labelledby')}`);
      expect(label?.querySelector('h2')?.textContent).toBeTruthy();
    }
    const toc = element.querySelector('nav[aria-label="Índice del case study"]');
    expect([...toc!.querySelectorAll('a')].map((link) => link.getAttribute('href'))).toEqual(
      sections.map((section) => `/#${section.id}`),
    );
  });

  it('links back to Home fragments and uses the real repository safely', async () => {
    const element = await render();
    const backLinks = [...element.querySelectorAll('a')].filter((link) =>
      link.textContent?.includes('Volver a proyectos'),
    );
    expect(backLinks.length).toBe(2);
    expect(backLinks.every((link) => link.getAttribute('href') === '/#work')).toBe(true);
    expect(element.querySelector('.closing a[href="/#contact"]')?.textContent).toBe('Contactar');
    const github = element.querySelector<HTMLAnchorElement>('.closing a[target="_blank"]');
    expect(github?.href).toBe('https://github.com/OscarHinjosLopez/Portfolio');
    expect(github?.rel).toBe('noopener noreferrer');
  });
});
