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
    expect(graph().map((node) => node['@type'])).toEqual(['Person', 'WebSite', 'ProfilePage']);
    expect(graph()[0]['name']).toBe('Oscar Hinjos López');
    expect(graph()[0]['sameAs']).toEqual([
      SITE_CONFIG.profile.linkedin,
      SITE_CONFIG.profile.github,
    ]);
    expect(graph()[0]).not.toHaveProperty('email');
  });

  for (const page of [SEO.sentinel, SEO.portfolio]) {
    it(`provides specific metadata and CreativeWork for ${page.schema}`, async () => {
      await RouterTestingHarness.create(page.canonicalPath);
      expect(TestBed.inject(Title).getTitle()).toBe(page.title);
      expect(canonical()).toBe(SITE_CONFIG.url + page.canonicalPath);
      expect(content('og:image')).toBe(SITE_CONFIG.url + page.image);
      expect(content('og:type')).toBe('article');
      expect(graph().map((node) => node['@type'])).toEqual(['WebPage', 'CreativeWork']);
      expect(graph()[1]['creator']).toEqual({ '@id': `${SITE_CONFIG.url}/#person` });
    });
  }

  it('replaces metadata on navigation, fragments and Back without retaining noindex or old JSON-LD', async () => {
    const harness = await RouterTestingHarness.create('/projects/sentinel');
    await harness.navigateByUrl('/projects/portfolio-engineering');
    expect(content('og:title')).toBe(SEO.portfolio.title);
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

  it('keeps placeholders and unknown URLs out of the index', async () => {
    const harness = await RouterTestingHarness.create('/projects/lol-scenario-trainer');
    expect(content('robots')).toBe('noindex,follow');
    await harness.navigateByUrl('/projects/unknown');
    expect(content('robots')).toBe('noindex,nofollow');
    expect(TestBed.inject(Title).getTitle()).toBe(SEO.notFound.title);
    expect(canonical()).toBe(`${SITE_CONFIG.url}/projects/unknown`);
    expect(document.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(0);
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
