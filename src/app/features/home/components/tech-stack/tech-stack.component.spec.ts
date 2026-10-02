import { TestBed } from '@angular/core/testing';
import { TechStackComponent } from './tech-stack.component';

describe('TechStackComponent', () => {
  it('renders the professional stack and complementary backend knowledge under skills', async () => {
    const fixture = TestBed.createComponent(TechStackComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('section')?.id).toBe('skills');
    expect(element.querySelector('h2')?.textContent).toBe('Tecnologías con las que construyo');
    const professional = element.querySelector('.stack-layout')?.textContent ?? '';
    for (const technology of [
      'Angular',
      'TypeScript',
      'RxJS',
      'Signals',
      'React',
      'Redux',
      'Jest',
      'React Testing Library',
      'REST APIs',
      'Git',
    ]) {
      expect(professional).toContain(technology);
    }
    const backend = element.querySelector('.backend-knowledge')?.textContent ?? '';
    for (const technology of ['Node.js', 'C#', '.NET', 'Python'])
      expect(backend).toContain(technology);
    expect(backend).toContain('Conocimiento complementario');
    expect(element.querySelectorAll('article h3').length).toBe(6);
    expect(element.querySelector('h1')).toBeNull();
  });

  it('keeps practical training separate and excludes technologies absent from the CV', async () => {
    const fixture = TestBed.createComponent(TechStackComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const training = element.querySelector('.training');
    expect(training?.textContent).toContain('Formación práctica');
    expect(
      [...training!.querySelectorAll('app-tech-chip')].map((chip) => chip.textContent?.trim()),
    ).toEqual(['Next.js', 'React Query', 'Zustand', 'MERN', 'PERN']);
    const professional = element.querySelector('.stack-layout')?.textContent ?? '';
    for (const technology of ['Next.js', 'React Query', 'Zustand', 'MERN', 'PERN']) {
      expect(professional).not.toContain(technology);
    }
    for (const excluded of [
      'Docker',
      'SQL',
      'GraphQL',
      'AWS',
      'Azure',
      'Kubernetes',
      'NestJS',
      'Vue',
      'Firebase',
    ]) {
      expect(element.textContent).not.toContain(excluded);
    }
  });
});
