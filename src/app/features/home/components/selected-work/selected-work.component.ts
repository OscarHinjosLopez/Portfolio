import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { ProjectCardComponent } from '../../../../shared/components/project-card/project-card.component';
import { PROJECTS } from '../../data/projects.data';
@Component({
  selector: 'app-selected-work',
  standalone: true,
  imports: [SectionHeadingComponent, ProjectCardComponent],
  template: `<section id="work" class="section" aria-labelledby="work-heading">
    <div class="container">
      <app-section-heading
        id="work-heading"
        eyebrow="03 / SELECTED WORK"
        title="Proyectos seleccionados"
        description="Productos y experimentos donde aplico arquitectura frontend, rendimiento, experiencia de usuario y desarrollo orientado a producto."
      />
      <div class="projects">
        @for (project of projects; track project.slug) {
          <app-project-card
            [project]="project"
            [variant]="project.featured ? 'featured' : 'default'"
          />
        }
      </div>
    </div>
  </section>`,
  styleUrl: './selected-work.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedWorkComponent {
  readonly projects = PROJECTS;
}
