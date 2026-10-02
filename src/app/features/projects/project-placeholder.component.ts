import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { PROJECTS } from '../home/data/projects.data';
@Component({
  selector: 'app-project-placeholder',
  standalone: true,
  imports: [RouterLink],
  template: `<main id="main-content" tabindex="-1" class="container section">
    <p class="caption text-secondary">{{ projectTitle() }}</p>
    <h1>Case study en construcción</h1>
    <p class="text-secondary">Los detalles de este proyecto estarán disponibles próximamente.</p>
    <a routerLink="/" fragment="work">Volver a proyectos</a>
  </main>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectPlaceholderComponent {
  private readonly params = toSignal(inject(ActivatedRoute).paramMap);
  projectTitle(): string {
    const slug = this.params()?.get('slug');
    return PROJECTS.find((project) => project.slug === slug)?.title ?? 'Proyecto';
  }
}
