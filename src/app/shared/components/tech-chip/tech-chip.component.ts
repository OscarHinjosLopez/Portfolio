import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type TechChipVariant = 'default' | 'emphasis' | 'subtle';

@Component({
  selector: 'app-tech-chip',
  standalone: true,
  template: '{{ label() }}',
  styleUrl: './tech-chip.component.scss',
  host: { '[attr.data-variant]': 'variant()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechChipComponent {
  readonly label = input.required<string>();
  readonly variant = input<TechChipVariant>('default');
}
