import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { TechChipComponent } from '../../../../shared/components/tech-chip/tech-chip.component';

interface StackCategory {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly technologies: readonly string[];
}

// Content checked against Oscar's CV. Training is kept separate from professional experience.
@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [SectionHeadingComponent, TechChipComponent],
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackComponent {
  readonly categories: readonly StackCategory[] = [
    {
      id: 'frontend-core',
      title: 'Frontend Core',
      description: 'Interfaces modernas y aplicaciones web orientadas a producto.',
      technologies: ['Angular', 'TypeScript', 'RxJS', 'React', 'JavaScript', 'HTML5', 'CSS3'],
    },
    {
      id: 'angular-ecosystem',
      title: 'Angular Ecosystem',
      description: 'Arquitectura basada en componentes, estado reactivo y flujos asíncronos.',
      technologies: [
        'Angular 16+',
        'Signals',
        'RxJS',
        'Reactive Forms',
        'Angular Material',
        'Routing',
        'Lazy Loading',
      ],
    },
    {
      id: 'react-ecosystem',
      title: 'React Ecosystem',
      description: 'Interfaces y funcionalidades desarrolladas con React y su ecosistema.',
      technologies: ['React', 'Hooks', 'Context', 'Redux', 'MUI'],
    },
    {
      id: 'quality-performance',
      title: 'Quality & Performance',
      description: 'Testing, rendimiento, accesibilidad y mantenibilidad.',
      technologies: [
        'Jest',
        'React Testing Library',
        'Code Review',
        'Lazy Loading',
        'Bundle Optimization',
        'Responsive Design',
        'WCAG',
      ],
    },
    {
      id: 'apis-delivery',
      title: 'APIs & Delivery',
      description: 'Integración con servicios y trabajo dentro de procesos de entrega continua.',
      technologies: ['REST APIs', 'Git', 'CI/CD', 'Jira', 'Scrum', 'Kanban'],
    },
    {
      id: 'backend-knowledge',
      title: 'Backend Knowledge',
      description: 'Conocimiento complementario para colaborar eficazmente con equipos backend.',
      technologies: ['Node.js', 'C#', '.NET', 'Python'],
    },
  ];
  readonly training = ['Next.js', 'React Query', 'Zustand', 'MERN', 'PERN'] as const;
}
