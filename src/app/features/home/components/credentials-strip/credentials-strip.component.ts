import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-credentials-strip',
  standalone: true,
  templateUrl: './credentials-strip.component.html',
  styleUrl: './credentials-strip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CredentialsStripComponent {
  readonly credentials = [
    { value: 'Desde 2022', description: 'Experiencia profesional' },
    { value: 'Angular', description: 'Especialización principal' },
    { value: 'TypeScript', description: 'Stack principal' },
    { value: 'React', description: 'Experiencia profesional' },
  ] as const;
}
