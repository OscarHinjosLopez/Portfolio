import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SentinelCaseStudyComponent } from './sentinel-case-study.component';

describe('SentinelCaseStudyComponent', () => {
  async function render() {
    TestBed.configureTestingModule({
      imports: [SentinelCaseStudyComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(SentinelCaseStudyComponent);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('presents Sentinel with LIVE status and six stack chips', async () => {
    const element = await render();
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toBe('Sentinel');
    expect(element.querySelector('.subtitle')?.textContent).toBe(
      'Cybersecurity Operations Dashboard',
    );
    expect(element.querySelector('.status')?.textContent).toBe('LIVE');
    expect(
      [...element.querySelectorAll('.chips app-tech-chip')].map((chip) => chip.textContent?.trim()),
    ).toEqual(['Angular', 'TypeScript', 'Signals', 'RxJS', 'Material/CDK', 'WebSockets']);
    expect(element.querySelector('main')?.getAttribute('tabindex')).toBe('-1');
    expect(element.querySelector('main > article')).toBeTruthy();
  });

  it('renders all thirteen sections with labelled headings and matching TOC', async () => {
    const element = await render();
    const ids = [
      'context',
      'product',
      'architecture',
      'authorization',
      'threats',
      'realtime',
      'ux-states',
      'accessibility',
      'testing',
      'performance',
      'challenges',
      'result',
      'learnings',
    ];
    const sections = [...element.querySelectorAll('section')];
    expect(sections.map((section) => section.id)).toEqual(ids);
    for (const section of sections) {
      expect(
        element.querySelector(`#${section.getAttribute('aria-labelledby')} h2`)?.textContent,
      ).toBeTruthy();
    }
    expect(
      [...element.querySelectorAll('.toc a')].map((link) => link.getAttribute('href')),
    ).toEqual(ids.map((id) => `/#${id}`));
    expect(element.querySelector('.roles caption')?.textContent).toContain('ROLE_PERMISSIONS');
    expect(
      [...element.querySelectorAll('.roles tbody tr')].map((row) =>
        [...row.querySelectorAll('td')].map((cell) => cell.textContent),
      ),
    ).toEqual([
      ['Sí', 'Sí', 'Sí'],
      ['Sí', 'Sí', 'No'],
      ['Sí', 'No', 'No'],
      ['Sí', 'Sí', 'No'],
      ['Sí', 'No', 'No'],
    ]);
    expect(element.querySelector('#realtime')?.textContent).toContain('Realtime simulation');
    expect(element.querySelector('#product')?.textContent).toContain('Audit · Preview');
    expect(element.querySelector('#testing')?.textContent).toContain('Vitest');
    expect(element.querySelector('#testing')?.textContent).toContain('Playwright');
    expect(element.querySelector('#authorization')?.textContent).toContain(
      'autenticación es simulada',
    );
  });

  it('links safely to the verified demo and back to work and contact without GitHub', async () => {
    const element = await render();
    const demoLinks = [...element.querySelectorAll('a[target="_blank"]')];
    expect(demoLinks).toHaveLength(3);
    for (const link of demoLinks) {
      expect(link.getAttribute('href')).toBe(
        'https://sentinel-cybersecurity-operations-d.vercel.app/',
      );
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      expect(link.getAttribute('aria-label')).toContain('nueva pestaña');
    }
    expect(element.querySelectorAll('a[href="/#work"]')).toHaveLength(2);
    expect(element.querySelector('.closing a[href="/#contact"]')?.textContent).toBe('Contactar');
    expect(element.querySelector('a[href*="github.com"]')).toBeNull();
    expect(element.textContent).not.toContain('Sentinel123');
  });

  it('reserves space for four real captures and loads below-fold images lazily', async () => {
    const element = await render();
    const images = [...element.querySelectorAll('img')];
    expect(images.map((img) => img.getAttribute('src'))).toEqual(
      ['dashboard', 'threats', 'devices', 'command-palette'].map(
        (name) => `/assets/projects/sentinel/${name}.webp`,
      ),
    );
    for (const img of images) {
      expect(img.getAttribute('width')).toBe('1440');
      expect(img.getAttribute('height')).toBe('900');
      expect(img.alt.length).toBeGreaterThan(20);
    }
    expect(images[0].hasAttribute('fetchpriority')).toBe(false);
    expect(images[0].getAttribute('loading')).not.toBe('lazy');
    for (const img of images) {
      expect(img.getAttribute('srcset')).toMatch(/-720\.webp\s+720w/);
      expect(img.getAttribute('srcset')).toMatch(/\/[^/]+\.webp\s+1440w/);
      expect(img.getAttribute('sizes')).toBeTruthy();
      expect(img.getAttribute('decoding')).toBe('async');
    }
    expect(images.slice(1).every((img) => img.getAttribute('loading') === 'lazy')).toBe(true);
  });
});
