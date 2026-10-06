import { SeoData } from '../models/seo.model';

export const SEO = {
  home: {
    title: 'Oscar Hinjos | Frontend Engineer | Angular & TypeScript',
    description:
      'Frontend Engineer especializado en Angular, TypeScript y RxJS. Portfolio de Oscar Hinjos con experiencia, proyectos y case studies de frontend.',
    canonicalPath: '/',
    robots: 'index,follow',
    type: 'website',
    schema: 'home',
  },
  portfolio: {
    title: 'Portfolio Engineering | Angular Case Study | Oscar Hinjos',
    description:
      'Case study del portfolio de Oscar Hinjos: arquitectura Angular, Design System, responsive, accesibilidad, testing y rendimiento.',
    canonicalPath: '/projects/portfolio-engineering',
    robots: 'index,follow',
    type: 'article',
    schema: 'portfolio',
    image: '/assets/og/portfolio-engineering.png',
    imageAlt: 'Case study Portfolio Engineering — Angular y TypeScript',
  },
  sentinel: {
    title: 'Sentinel | Angular Cybersecurity Dashboard | Oscar Hinjos',
    description:
      'Case study de Sentinel, un dashboard SOC construido con Angular, Signals y RxJS con RBAC, tiempo real, accesibilidad y testing.',
    canonicalPath: '/projects/sentinel',
    robots: 'index,follow',
    type: 'article',
    schema: 'sentinel',
    image: '/assets/og/sentinel.png',
    imageAlt: 'Sentinel — Cybersecurity Operations Dashboard con captura real del dashboard',
  },
  designSystem: {
    title: 'Design System | Oscar Hinjos',
    description: 'Catálogo interno de componentes y estilos del portfolio de Oscar Hinjos.',
    canonicalPath: '/design-system',
    robots: 'noindex,follow',
  },
  placeholder: {
    title: 'LoL Scenario Trainer | Oscar Hinjos',
    description: 'Case study de LoL Scenario Trainer en construcción.',
    canonicalPath: '/projects/lol-scenario-trainer',
    robots: 'noindex,follow',
  },
  notFound: {
    title: 'Página no encontrada | Oscar Hinjos',
    description: 'La página solicitada no existe en el portfolio de Oscar Hinjos.',
    canonicalPath: '/404',
    robots: 'noindex,nofollow',
  },
} as const satisfies Record<string, SeoData>;
