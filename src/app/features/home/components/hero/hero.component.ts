import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TechChipComponent } from '../../../../shared/components/tech-chip/tech-chip.component';

import { PROFILE } from '../../../../core/config/profile.config';

export const CV_URL = PROFILE.cv;

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, ButtonComponent, TechChipComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  readonly cvUrl = CV_URL;
  readonly technologies = ['Angular', 'TypeScript', 'React', 'RxJS'] as const;
}
