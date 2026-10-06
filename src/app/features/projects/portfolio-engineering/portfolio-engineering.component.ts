import { ScrollSpyDirective } from '../../../shared/directives/scroll-spy.directive';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { TechChipComponent } from '../../../shared/components/tech-chip/tech-chip.component';
import { SectionHeadingComponent } from '../../../shared/components/section-heading/section-heading.component';
import { PROJECTS } from '../../home/data/projects.data';

@Component({
  selector: 'app-portfolio-engineering',
  standalone: true,
  imports: [
    ScrollSpyDirective,
    RouterLink,
    ButtonComponent,
    TechChipComponent,
    SectionHeadingComponent,
  ],
  templateUrl: './portfolio-engineering.component.html',
  styleUrl: './portfolio-engineering.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioEngineeringComponent {
  readonly project = PROJECTS.find((project) => project.slug === 'portfolio-engineering')!;
  readonly year = 2026;
  readonly sections = [
    { id: 'context', label: 'Context' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'design-system', label: 'Design System' },
    { id: 'responsive', label: 'Responsive' },
    { id: 'performance', label: 'Performance' },
    { id: 'testing', label: 'Testing' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'result', label: 'Result' },
    { id: 'learnings', label: 'Learnings' },
  ] as const;
  readonly goals = [
    {
      title: 'Comunicación rápida',
      text: 'Permitir entender el perfil técnico y la experiencia de Oscar en pocos segundos.',
    },
    {
      title: 'Arquitectura mantenible',
      text: 'Construir una base Angular preparada para crecer con proyectos y case studies.',
    },
    {
      title: 'Calidad visual',
      text: 'Crear una identidad propia sin depender de templates o librerías UI.',
    },
    {
      title: 'Calidad técnica',
      text: 'Aplicar TypeScript estricto, componentes reutilizables, testing, responsive y accesibilidad.',
    },
  ];
  readonly decisions = [
    {
      title: 'Standalone + OnPush',
      text: 'Cada componente declara sus imports. OnPush hace explícito el modelo de actualización sin añadir módulos de feature.',
    },
    {
      title: 'Datos tipados',
      text: 'Project vive en core/models; PROJECTS y EXPERIENCE se mantienen junto a Home. La configuración del perfil se centraliza en core/config.',
    },
    {
      title: 'Features y UI compartida',
      text: 'Home compone secciones independientes. Button, TechChip, SectionHeading y ProjectCard pertenecen a shared; ExperienceItem pertenece a Home.',
    },
    {
      title: 'Rutas lazy',
      text: 'Home se carga directamente. El catálogo visual, los proyectos y la página 404 se resuelven con loadComponent.',
    },
    {
      title: 'Strict en dos capas',
      text: 'TypeScript strict y strictTemplates permiten comprobar tanto los modelos como su uso en las plantillas.',
    },
    {
      title: 'Tokens SCSS',
      text: 'Variables y mixins compartidos definen superficies, espaciado y breakpoints. La tipografía y las utilidades tienen una base global.',
    },
  ];
  readonly tree = `src/app/
├── core/          config · models
├── shared/        components
├── layout/        navbar · footer
└── features/      home · projects
                   design-system · not-found`;
  readonly widths = [375, 430, 768, 1024, 1440, 1920];
  readonly sectionIds = this.sections.map((section) => section.id);
}
