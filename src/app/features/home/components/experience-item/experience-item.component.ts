import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TechChipComponent } from '../../../../shared/components/tech-chip/tech-chip.component';
import { Experience } from '../../data/experience.model';

@Component({
  selector: 'app-experience-item',
  standalone: true,
  imports: [TechChipComponent],
  templateUrl: './experience-item.component.html',
  styleUrl: './experience-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceItemComponent {
  readonly experience = input.required<Experience>();
  readonly index = input.required<number>();
}
