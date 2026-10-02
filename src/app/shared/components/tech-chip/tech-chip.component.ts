import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tech-chip',
  standalone: true,
  template: '{{ label() }}',
  styleUrl: './tech-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechChipComponent {
  readonly label = input.required<string>();
}
