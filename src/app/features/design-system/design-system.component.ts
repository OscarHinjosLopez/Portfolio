import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ButtonComponent,
  ButtonSize,
  ButtonVariant,
} from '../../shared/components/button/button.component';
import { TechChipComponent } from '../../shared/components/tech-chip/tech-chip.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';

@Component({
  selector: 'app-design-system',
  standalone: true,
  imports: [ButtonComponent, RouterLink, TechChipComponent, SectionHeadingComponent],
  templateUrl: './design-system.component.html',
  styleUrl: './design-system.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignSystemComponent {
  readonly variants: readonly ButtonVariant[] = ['primary', 'secondary', 'ghost'];
  readonly sizes: readonly ButtonSize[] = ['sm', 'md', 'lg'];
  readonly technologies = ['Angular', 'TypeScript', 'RxJS', 'React'] as const;
  readonly colors = [
    { token: 'background-primary', value: '#FAFAF7' },
    { token: 'surface-primary', value: '#ECEEE6' },
    { token: 'surface-elevated', value: '#E4E7DE' },
    { token: 'accent', value: '#2446D9' },
    { token: 'accent-secondary', value: '#2446D9' },
    { token: 'text-primary', value: '#0E1116' },
    { token: 'text-secondary', value: '#4A515C' },
    { token: 'success', value: '#247445' },
    { token: 'danger', value: '#B32E3B' },
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
