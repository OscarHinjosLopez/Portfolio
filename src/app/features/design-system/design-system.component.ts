import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ButtonComponent,
  ButtonSize,
  ButtonVariant,
} from '../../shared/components/button/button.component';
import { TechChipComponent } from '../../shared/components/tech-chip/tech-chip.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';

import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { PROJECTS } from '../home/data/projects.data';

@Component({
  selector: 'app-design-system',
  standalone: true,
  imports: [
    ButtonComponent,
    RouterLink,
    TechChipComponent,
    SectionHeadingComponent,
    ProjectCardComponent,
  ],
  templateUrl: './design-system.component.html',
  styleUrl: './design-system.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignSystemComponent {
  readonly sampleProject = PROJECTS[0];
  readonly variants: readonly ButtonVariant[] = ['primary', 'secondary', 'ghost'];
  readonly sizes: readonly ButtonSize[] = ['sm', 'md', 'lg'];
  readonly technologies = ['Angular', 'TypeScript', 'RxJS', 'React'] as const;
  readonly colors = [
    { token: 'background-primary', value: '#090B10' },
    { token: 'surface-primary', value: '#11151C' },
    { token: 'surface-elevated', value: '#161B24' },
    { token: 'accent', value: '#6C63FF' },
    { token: 'accent-secondary', value: '#7C73FF' },
    { token: 'text-primary', value: '#F5F7FA' },
    { token: 'text-secondary', value: '#8B95A5' },
    { token: 'success', value: '#73C69A' },
    { token: 'danger', value: '#EF8B92' },
  ] as const;
  readonly typography = [
    { token: 'display-xl', label: 'Display XL' },
    { token: 'display-lg', label: 'Display LG' },
    { token: 'heading-1', label: 'Heading 1' },
    { token: 'heading-2', label: 'Heading 2' },
    { token: 'heading-3', label: 'Heading 3' },
    { token: 'body-lg', label: 'Body large · Texto de ejemplo' },
    { token: 'body', label: 'Body · Texto de ejemplo' },
    { token: 'body-sm', label: 'Body small · Texto de ejemplo' },
    { token: 'caption', label: 'Caption · Texto de ejemplo' },
  ] as const;
  readonly spacing = ['1', '2', '4', '6', '8', '12', '16'] as const;
}
