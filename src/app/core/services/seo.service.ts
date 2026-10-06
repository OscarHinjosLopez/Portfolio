import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE_CONFIG } from '../config/site.config';
import { JsonLdValue, SeoData } from '../models/seo.model';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  update(data: SeoData): void {
    const url = new URL(data.canonicalPath, SITE_CONFIG.url).href;
    const image = new URL(data.image ?? '/assets/og/home.png', SITE_CONFIG.url).href;
    const imageAlt =
      data.imageAlt ?? 'Oscar Hinjos — Frontend Engineer. Angular, TypeScript, RxJS y React.';
    this.title.setTitle(data.title);
    for (const [name, content] of Object.entries({
      description: data.description,
      robots: data.robots,
      'twitter:card': 'summary_large_image',
      'twitter:title': data.title,
      'twitter:description': data.description,
      'twitter:image': image,
      'twitter:image:alt': imageAlt,
    }))
      this.setMeta('name', name, content);
    for (const [property, content] of Object.entries({
      'og:title': data.title,
      'og:description': data.description,
      'og:type': data.type ?? 'website',
      'og:url': url,
      'og:image': image,
      'og:image:alt': imageAlt,
      'og:site_name': SITE_CONFIG.name,
      'og:locale': SITE_CONFIG.locale,
    }))
      this.setMeta('property', property, content);
    this.document.querySelectorAll('link[rel="canonical"]').forEach((node) => node.remove());
    const canonical = this.document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = url;
    this.document.head.appendChild(canonical);
    this.document
      .querySelectorAll('script[type="application/ld+json"]')
      .forEach((node) => node.remove());
    if (data.schema) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(this.structuredData(data, url));
      this.document.head.appendChild(script);
    }
  }

  private setMeta(attribute: 'name' | 'property', key: string, content: string): void {
    const selector = `${attribute}="${key}"`;
    this.meta
      .getTags(selector)
      .slice(1)
      .forEach((node) => this.meta.removeTagElement(node));
    this.meta.updateTag({ [attribute]: key, content }, selector);
  }

  private structuredData(data: SeoData, url: string): JsonLdValue {
    const home = `${SITE_CONFIG.url}/`;
    const person = { '@id': `${home}#person` };
    const graph: JsonLdValue[] =
      data.schema === 'home'
        ? [
            {
              '@type': 'Person',
              ...person,
              name: SITE_CONFIG.author,
              alternateName: 'Oscar Hinjos',
              jobTitle: 'Frontend Engineer',
              url: home,
              sameAs: [SITE_CONFIG.profile.linkedin, SITE_CONFIG.profile.github],
              knowsAbout: ['Angular', 'TypeScript', 'RxJS', 'React'],
            },
            {
              '@type': 'WebSite',
              '@id': `${home}#website`,
              name: SITE_CONFIG.name,
              url: home,
              inLanguage: SITE_CONFIG.language,
              author: person,
            },
            {
              '@type': 'ProfilePage',
              '@id': `${home}#profile`,
              url: home,
              inLanguage: SITE_CONFIG.language,
              mainEntity: person,
            },
          ]
        : [
            {
              '@type': 'WebPage',
              '@id': `${url}#page`,
              name: data.title,
              description: data.description,
              url,
              inLanguage: SITE_CONFIG.language,
              author: person,
              mainEntity: { '@id': `${url}#work` },
            },
            {
              '@type': 'CreativeWork',
              '@id': `${url}#work`,
              name: data.schema === 'portfolio' ? 'Portfolio Engineering' : 'Sentinel',
              description: data.description,
              url,
              inLanguage: SITE_CONFIG.language,
              creator: person,
              about:
                data.schema === 'portfolio'
                  ? 'Angular frontend engineering'
                  : 'Cybersecurity Operations Dashboard',
              keywords:
                data.schema === 'portfolio'
                  ? ['Angular', 'TypeScript', 'SCSS', 'Accessibility', 'Testing']
                  : ['Angular', 'Signals', 'RxJS', 'RBAC', 'Accessibility'],
            },
          ];
    return { '@context': 'https://schema.org', '@graph': graph };
  }
}
