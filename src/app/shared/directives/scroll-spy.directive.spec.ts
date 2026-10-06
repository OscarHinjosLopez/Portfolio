import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi, afterEach } from 'vitest';
import { ScrollSpyDirective } from './scroll-spy.directive';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { mockIntersectionObserver } from '../testing/intersection-observer.mock';

@Component({
  imports: [ScrollSpyDirective],
  template: `<main [appScrollSpy]="['context']" [scrollSpyScope]="scope" #spy="scrollSpy">
    <a [attr.aria-current]="spy.active() === 'context' ? 'location' : null">Context</a>
    <section id="context"></section>
  </main>`,
})
class HostComponent {
  scope: 'local' | 'home' = 'local';
}

describe('ScrollSpyDirective', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });
  for (const scope of ['local', 'home'] as const) {
    it(`shares observer logic in ${scope} scope and clears it on destruction`, async () => {
      const observers = mockIntersectionObserver();
      const fixture = TestBed.createComponent(HostComponent);
      fixture.componentInstance.scope = scope;
      await fixture.whenStable();
      const section = fixture.nativeElement.querySelector('section') as HTMLElement;
      vi.spyOn(section, 'getBoundingClientRect').mockReturnValue({
        top: 0,
        bottom: 500,
      } as DOMRect);
      observers[0].notify();
      await fixture.whenStable();
      expect(fixture.nativeElement.querySelector('a').getAttribute('aria-current')).toBe(
        'location',
      );
      expect(TestBed.inject(ScrollSpyService).homeSection()).toBe(
        scope === 'home' ? 'context' : null,
      );
      fixture.destroy();
      expect(observers[0].disconnect).toHaveBeenCalledOnce();
      expect(TestBed.inject(ScrollSpyService).homeSection()).toBeNull();
    });
  }
});
