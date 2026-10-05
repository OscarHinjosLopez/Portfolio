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
    visual: 'portfolio',
    actions: [
      {
        label: 'Ver caso de estudio',
        url: '/projects/portfolio-engineering',
        type: 'internal',
        variant: 'primary',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/OscarHinjosLopez/Portfolio',
        type: 'external',
        variant: 'secondary',
      },
    ],
  },
  {
    slug: 'sentinel',
    index: '02',
    category: 'ENTERPRISE PRODUCT',
    title: 'Sentinel — Cybersecurity Operations Dashboard',
    shortDescription:
      'Dashboard SOC empresarial construido con Angular y TypeScript para gestionar amenazas, dispositivos y operaciones de seguridad.',
    problem:
      'Diseñar una interfaz data-dense capaz de presentar información de seguridad, estados críticos y operaciones en tiempo real sin perder claridad.',
    solution:
      'Arquitectura Angular orientada a producto con Signals y RxJS, componentes reutilizables y una interfaz preparada para flujos operativos complejos.',
    technologies: ['Angular', 'TypeScript', 'Signals', 'RxJS', 'Material/CDK'],
    stackStatus: 'implemented',
    status: 'live',
    featured: false,
    visual: 'sentinel',
    actions: [
      {
        label: 'Ver caso de estudio',
        url: '/projects/sentinel',
        type: 'internal',
        variant: 'primary',
      },
      {
        label: 'Ver demo',
        url: 'https://sentinel-cybersecurity-operations-d.vercel.app/',
        type: 'external',
        variant: 'secondary',
      },
    ],
  },
  {
    slug: 'lol-scenario-trainer',
    visual: 'scenario',
    actions: [
      {
        label: 'Ver detalles del proyecto',
        url: '/projects/lol-scenario-trainer',
        type: 'internal',
        variant: 'primary',
      },
    ],
    index: '03',
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
];
