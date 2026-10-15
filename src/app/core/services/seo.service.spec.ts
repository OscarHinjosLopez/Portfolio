import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { TitleStrategy, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { SEO } from '../config/seo.config';
import { SITE_CONFIG } from '../config/site.config';
import { SeoService } from './seo.service';
import { SeoTitleStrategy } from './seo-title.strategy';

describe('Route SEO', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [provideRouter(routes), { provide: TitleStrategy, useClass: SeoTitleStrategy }],
    }),
  );
  const content = (key: string) =>
    document.querySelector(`meta[name="${key}"],meta[property="${key}"]`)?.getAttribute('content');
  const canonical = () => document.querySelector('link[rel="canonical"]')?.getAttribute('href');
  const graph = () =>
    JSON.parse(document.querySelector('script[type="application/ld+json"]')?.textContent ?? '{}')[
      '@graph'
    ] as Record<string, unknown>[];

  it('renders complete Home metadata and a truthful profile graph', async () => {
    await RouterTestingHarness.create('/');
    expect(TestBed.inject(Title).getTitle()).toBe(SEO.home.title);
    expect(content('description')).toBe(SEO.home.description);
    expect(canonical()).toBe(`${SITE_CONFIG.url}/`);
    expect(content('robots')).toBe('index,follow');
    expect(content('og:title')).toBe(SEO.home.title);
    expect(content('og:url')).toBe(`${SITE_CONFIG.url}/`);
    expect(content('twitter:card')).toBe('summary_large_image');
    expect(content('og:image')).toBe(`${SITE_CONFIG.url}/assets/og/home.png`);
    expect(content('og:image:width')).toBe('1200');
    expect(content('og:image:height')).toBe('630');
    expect(content('og:image:type')).toBe('image/png');
    expect(graph().map((node) => node['@type'])).toEqual(['Person', 'WebSite', 'ProfilePage']);
    expect(graph()[0]['name']).toBe('Oscar Hinjos López');
    expect(graph()[0]['sameAs']).toEqual([
      SITE_CONFIG.profile.linkedin,
      SITE_CONFIG.profile.github,
    ]);
    expect(graph()[0]).not.toHaveProperty('email');
  });

  it('replaces metadata on navigation, fragments and Back without retaining noindex or old JSON-LD', async () => {
    const harness = await RouterTestingHarness.create('/');
    await harness.navigateByUrl('/design-system');
    expect(content('robots')).toBe('noindex,follow');
    expect(document.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(0);
    await harness.navigateByUrl('/#work');
    for (const selector of [
      'meta[name="description"]',
      'meta[property="og:title"]',
      'meta[property="og:url"]',
      'meta[name="twitter:title"]',
      'link[rel="canonical"]',
      'script[type="application/ld+json"]',
    ]) {
      expect(document.querySelectorAll(selector)).toHaveLength(1);
    }
    expect(content('robots')).toBe('index,follow');
    expect(canonical()).toBe(`${SITE_CONFIG.url}/`);
    expect(TestBed.inject(Title).getTitle()).toBe(SEO.home.title);
  });

  it('keeps non-public and unknown URLs out of the index', async () => {
    const harness = await RouterTestingHarness.create('/design-system');
    expect(content('robots')).toBe('noindex,follow');
    await harness.navigateByUrl('/projects/unknown');
    expect(content('robots')).toBe('noindex,nofollow');
    expect(TestBed.inject(Title).getTitle()).toBe(SEO.notFound.title);
    expect(canonical()).toBeUndefined();
    expect(content('og:url')).toBeUndefined();
    expect(document.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(0);
  });

  it('removes canonical on errors and restores it when returning to a valid route', async () => {
    const harness = await RouterTestingHarness.create('/');
    expect(canonical()).toBe(`${SITE_CONFIG.url}/`);
    await harness.navigateByUrl('/ruta-inexistente');
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(0);
    expect(content('robots')).toBe('noindex,nofollow');
    await harness.navigateByUrl('/#contact');
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(canonical()).toBe(`${SITE_CONFIG.url}/`);
    expect(content('og:url')).toBe(`${SITE_CONFIG.url}/`);
    expect(content('robots')).toBe('index,follow');
  });

  it('deduplicates stale head metadata inherited from a document', () => {
    for (let i = 0; i < 2; i++) {
      const tag = document.createElement('meta');
      tag.name = 'description';
      tag.content = 'stale';
      document.head.appendChild(tag);
    }
    TestBed.inject(SeoService).update(SEO.home);
    expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(content('description')).toBe(SEO.home.description);
  });
});
