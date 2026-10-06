import {
  DOCUMENT,
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';

/** Progressive enhancement: the element is never hidden while awaiting JS. */
@Directive({ selector: '[appReveal]', host: { '[class.reveal-enter]': 'revealed()' } })
export class RevealOnScrollDirective {
  readonly revealed = signal(false);

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const window = inject(DOCUMENT).defaultView;
    let cleanup = () => {};
    inject(DestroyRef).onDestroy(() => cleanup());
    afterNextRender(() => {
      if (!window?.IntersectionObserver || !window.matchMedia) return;
      const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (preference.matches) return;
      const reveal = () => {
        this.revealed.set(true);
        cleanup();
      };
      const observer = new window.IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) reveal();
        },
        { threshold: 0, rootMargin: '0px 0px -24px 0px' },
      );
      const onPreference = () => {
        if (preference.matches) cleanup();
      };
      cleanup = () => {
        observer.disconnect();
        preference.removeEventListener('change', onPreference);
      };
      preference.addEventListener('change', onPreference);
      observer.observe(element);
    });
  }
}
