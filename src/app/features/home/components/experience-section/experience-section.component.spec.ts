import { TestBed } from '@angular/core/testing';
import { ExperienceSectionComponent } from './experience-section.component';

describe('ExperienceSectionComponent', () => {
  async function render(): Promise<HTMLElement> {
    TestBed.configureTestingModule({ imports: [ExperienceSectionComponent] });
    const fixture = TestBed.createComponent(ExperienceSectionComponent);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders four experiences in reverse chronological order with an accessible anchor', async () => {
    const element = await render();
    expect(element.querySelector('#experience')).toBeTruthy();
    expect(element.querySelectorAll('article').length).toBe(4);
    expect(
      [...element.querySelectorAll('.company')].map((company) => company.textContent?.trim()),
    ).toEqual(['Equipo TIC XXI', 'Ayesa', 'Indra', 'Avirato']);
    for (const article of element.querySelectorAll('article')) {
      const headingId = article.getAttribute('aria-labelledby');
      expect(article.querySelector('h3')?.id).toBe(headingId);
      expect(article.querySelectorAll('time').length).toBe(2);
    }
  });

  it('shows the supplied technologies and the precise scope of the Ayesa migration', async () => {
    const element = await render();
    const articles = [...element.querySelectorAll('article')];
    const technologies = articles.map((article) =>
      [...article.querySelectorAll('app-tech-chip')].map((chip) => chip.textContent?.trim()),
    );
    expect(technologies).toEqual([
      ['Angular', 'React', 'TypeScript', 'REST APIs'],
      ['Angular 16', 'TypeScript', 'RxJS', 'Angular Material', 'Git', 'CI/CD'],
      ['Angular', 'TypeScript', 'C#', '.NET', 'DXL'],
      ['Angular', 'Node.js', 'REST APIs'],
    ]);
    expect(articles[1].querySelector('.highlights')?.textContent).toContain(
      'Migración de interfaces de sistemas Java a Angular 16.',
    );
  });
});
