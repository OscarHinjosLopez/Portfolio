import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project, PROJECT_STATUS_LABELS } from '../../../core/models/project.model';
import { TechChipComponent } from '../tech-chip/tech-chip.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink, TechChipComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  host: { '[class.featured]': 'variant() === "featured"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
  readonly variant = input<'default' | 'featured'>('default');
  readonly statusLabels = PROJECT_STATUS_LABELS;
}
