import { DOCUMENT, Injectable, inject, signal } from '@angular/core';

/** One reading line prevents tall sections and adjacent boundaries competing. */
@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  readonly homeSection = signal<string | null>(null);
  private readonly document = inject(DOCUMENT);

  observe(sections: readonly HTMLElement[], update: (id: string | null) => void): () => void {
    const window = this.document.defaultView;
    if (!window?.IntersectionObserver || sections.length === 0) return () => {};
    let observer: IntersectionObserver;
    const connect = () => {
      observer?.disconnect();
      const offset =
        Number.parseFloat(
          window.getComputedStyle(this.document.documentElement).scrollPaddingTop,
        ) || 0;
      const line = Math.min(
        window.innerHeight - 1,
        offset + Math.min(140, window.innerHeight * 0.2),
      );
      observer = new window.IntersectionObserver(
        () => {
          const active = sections.find((section) => {
            const rect = section.getBoundingClientRect();
            return rect.top <= line && rect.bottom > line;
          });
          update(active?.id ?? null);
        },
        {
          rootMargin: `-${line}px 0px -${Math.max(0, window.innerHeight - line - 1)}px 0px`,
          threshold: 0,
        },
      );
      sections.forEach((section) => observer.observe(section));
    };
    connect();
    window.addEventListener('resize', connect, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', connect);
      update(null);
    };
  }
}
