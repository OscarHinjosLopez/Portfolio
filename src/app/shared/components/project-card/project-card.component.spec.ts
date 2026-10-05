import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLink, provideRouter } from '@angular/router';
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
      for (const action of project.actions) {
        const link = element.querySelector(`a[href="${action.url}"]`);
        expect(link?.textContent).toContain(action.label);
        if (action.type === 'external') {
          expect(link?.getAttribute('target')).toBe('_blank');
          expect(link?.getAttribute('rel')).toBe('noopener noreferrer');
          expect(link?.getAttribute('aria-label')).toContain('nueva pestaña');
          expect(link?.hasAttribute('routerLink')).toBe(false);
        } else {
          expect(
            fixture.debugElement
              .queryAll(By.directive(RouterLink))
              .some((node) => node.nativeElement === link),
          ).toBe(true);
          expect(link?.hasAttribute('target')).toBe(false);
        }
      }
      expect(element.textContent?.includes('Estás viendo este proyecto')).toBe(
        !!project.currentProject,
      );
    });
  }
  it('shows Sentinel as LIVE with its real demo as the primary and only action', async () => {
    const fixture = TestBed.createComponent(ProjectCardComponent);
    fixture.componentRef.setInput('project', PROJECTS[1]);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.status')?.textContent).toBe('LIVE');
    expect(
      [...element.querySelectorAll('app-tech-chip')].map((chip) => chip.textContent?.trim()),
    ).toEqual(['Angular', 'TypeScript', 'Signals', 'RxJS', 'Material/CDK']);
    const link = element.querySelector('.actions a');
    expect(link?.getAttribute('href')).toBe(
      'https://sentinel-cybersecurity-operations-d.vercel.app/',
    );
    expect(link?.textContent).toContain('Ver demo');
    expect(link?.classList.contains('project-link')).toBe(true);
    expect(element.querySelectorAll('.actions a')).toHaveLength(1);
    expect(element.textContent).not.toContain('GitHub');
    expect(element.textContent).not.toContain('Ver caso de estudio');
  });
});
