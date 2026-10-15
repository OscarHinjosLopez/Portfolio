import { SeoData } from '../models/seo.model';

export const SEO = {
  home: {
    title: 'Oscar Hinjos | Frontend Engineer | Angular & TypeScript',
    description:
      'Frontend Engineer especializado en Angular, TypeScript y RxJS. Conoce la experiencia, las tecnologías y el perfil profesional de Oscar Hinjos.',
    canonicalPath: '/',
    robots: 'index,follow',
    type: 'website',
    schema: 'home',
  },

  designSystem: {
    title: 'Design System | Oscar Hinjos',
    description: 'Catálogo interno de componentes y estilos del portfolio de Oscar Hinjos.',
    canonicalPath: '/design-system',
    robots: 'noindex,follow',
  },

  notFound: {
    title: 'Página no encontrada | Oscar Hinjos',
    description: 'La página solicitada no existe en el portfolio de Oscar Hinjos.',
    robots: 'noindex,nofollow',
  },
} as const satisfies Record<string, SeoData>;
