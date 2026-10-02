import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProjectCardComponent } from './project-card.component';
import { PROJECTS } from '../../../features/home/data/projects.data';
import { PROJECT_STATUS_LABELS } from '../../../core/models/project.model';

describe('ProjectCardComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ProjectCardComponent],
      providers: [provideRouter([])],
    }),
  );
  for (const project of PROJECTS) {
    it(`renders ${project.title} with honest status, stack and actions`, async () => {
      const fixture = TestBed.createComponent(ProjectCardComponent);
      fixture.componentRef.setInput('project', project);
      await fixture.whenStable();
      const element = fixture.nativeElement as HTMLElement;
      expect(element.querySelector('h3')?.textContent).toBe(project.title);
      expect(element.querySelector('.status')?.textContent).toBe(
        PROJECT_STATUS_LABELS[project.status],
      );
      expect(
        [...element.querySelectorAll('app-tech-chip')].map((chip) => chip.textContent?.trim()),
      ).toEqual(project.technologies);
      expect(element.querySelector('.stack .label')?.textContent?.trim()).toBe(
        project.stackStatus === 'planned' ? 'Stack planificado' : 'Stack implementado',
      );
      expect(element.querySelector('article')?.getAttribute('aria-labelledby')).toBe(
        element.querySelector('h3')?.id,
      );
      expect(element.querySelector('.visual')?.getAttribute('aria-hidden')).toBe('true');
      expect(element.textContent).not.toContain('Live Demo');
      const details = element.querySelector(`a[href="/projects/${project.slug}"]`);
      if (project.status === 'coming-soon') {
        expect(element.querySelectorAll('a').length).toBe(0);
      } else {
        expect(details).toBeTruthy();
        expect(details?.textContent).toContain(
          project.status === 'live' ? 'Ver caso de estudio' : 'Ver detalles',
        );
      }
      if (project.status === 'live') {
        expect(
          element.querySelector('a[href="' + project.repositoryUrl + '"]')?.getAttribute('rel'),
        ).toBe('noopener noreferrer');
        expect(element.textContent).toContain('Est\u00e1s viendo este proyecto');
        expect(element.querySelector('a[href="/"]')).toBeNull();
      } else {
        expect(element.querySelector('a[target="_blank"]')).toBeNull();
      }
    });
  }
});
