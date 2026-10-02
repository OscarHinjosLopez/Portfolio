import { Project } from '../../../core/models/project.model';

export const PROJECTS: readonly Project[] = [
  {
    slug: 'portfolio-engineering',
    index: '01',
    category: 'FEATURED',
    title: 'Portfolio Engineering',
    shortDescription:
      'Portfolio profesional construido desde cero con Angular, TypeScript y SCSS, con arquitectura basada en componentes y atención a rendimiento, responsive y accesibilidad.',
    problem: 'Comunicar perfil técnico y proyectos en pocos segundos con una experiencia propia.',
    solution:
      'Design System propio, componentes reutilizables, TypeScript estricto, testing y diseño responsive.',
    technologies: ['Angular 22', 'TypeScript', 'SCSS', 'Angular Router', 'Vitest'],
    stackStatus: 'implemented',
    status: 'live',
    featured: true,
    currentProject: true,
    repositoryUrl: 'https://github.com/OscarHinjosLopez/Portfolio',
  },
  {
    slug: 'lol-scenario-trainer',
    index: '02',
    category: 'PRODUCT',
    title: 'LoL Scenario Trainer',
    shortDescription:
      'Aplicación de entrenamiento basada en escenarios para mejorar la toma de decisiones en League of Legends.',
    problem: 'Practicar decisiones de partida con ejercicios breves y repetibles.',
    solution: 'Propuesta móvil con escenarios, decisiones y feedback posterior.',
    technologies: ['Ionic', 'Angular', 'Capacitor', 'Supabase', 'PostgreSQL'],
    stackStatus: 'planned',
    status: 'development',
    featured: false,
  },
  {
    slug: 'ai-knowledge-assistant',
    index: '03',
    category: 'CONCEPT',
    title: 'AI Knowledge Assistant',
    shortDescription:
      'Concepto de aplicación frontend para interactuar con sistemas de conocimiento y respuestas generadas mediante IA.',
    problem: 'Mostrar consultas, respuestas progresivas y fuentes con estados claros.',
    solution: 'Frontend propuesto con streaming, historial, feedback y estados.',
    technologies: ['Angular', 'TypeScript', 'RxJS', 'REST / Streaming'],
    stackStatus: 'planned',
    status: 'coming-soon',
    featured: false,
  },
];
