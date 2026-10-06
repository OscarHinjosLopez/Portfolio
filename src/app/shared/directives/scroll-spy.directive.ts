import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';

@Directive({ selector: '[appScrollSpy]', exportAs: 'scrollSpy' })
export class ScrollSpyDirective {
  readonly appScrollSpy = input.required<readonly string[]>();
  readonly scrollSpyScope = input<'local' | 'home'>('local');
  readonly active = signal<string | null>(null);
  private readonly spy = inject(ScrollSpyService);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    let disconnect = () => {};
    inject(DestroyRef).onDestroy(() => disconnect());
    afterNextRender(() => {
      const sections = [
        ...this.element.nativeElement.querySelectorAll<HTMLElement>('section[id]'),
      ].filter((section) => this.appScrollSpy().includes(section.id));
      disconnect = this.spy.observe(sections, (id) => {
        this.active.set(id);
        if (this.scrollSpyScope() === 'home') this.spy.homeSection.set(id);
      });
    });
  }
}
