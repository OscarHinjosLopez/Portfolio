import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';

interface BuildPrinciple {
  readonly index: string;
  readonly label: string;
  readonly title: string;
  readonly description: string;
}

@Component({
  selector: 'app-how-i-build',
  standalone: true,
  imports: [SectionHeadingComponent],
  templateUrl: './how-i-build.component.html',
  styleUrl: './how-i-build.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowIBuildComponent {
  readonly principles: readonly BuildPrinciple[] = [
    {
      index: '01',
      label: 'ARCHITECTURE',
      title: 'Arquitectura',
      description:
        'Componentes reutilizables, separación clara de responsabilidades y TypeScript para construir una base preparada para crecer.',
    },
    {
      index: '02',
      label: 'PERFORMANCE',
      title: 'Rendimiento',
      description:
        'Lazy loading, optimización de bundles y atención al coste de carga y renderizado de la aplicación.',
    },
    {
      index: '03',
      label: 'QUALITY',
      title: 'Calidad',
      description:
        'Testing, code review y procesos de entrega continua para mantener el código estable y mantenible.',
    },
    {
      index: '04',
      label: 'UX & ACCESSIBILITY',
      title: 'UX & Accesibilidad',
      description:
        'Interfaces responsive, estados claros y buenas prácticas de accesibilidad siguiendo criterios WCAG.',
    },
  ];
}
