import { vi } from 'vitest';

export function mockIntersectionObserver() {
  const instances: ObserverMock[] = [];
  class ObserverMock {
    readonly observe = vi.fn();
    readonly disconnect = vi.fn();
    constructor(private readonly callback: IntersectionObserverCallback) {
      instances.push(this);
    }
    notify(isIntersecting = true) {
      this.callback(
        [{ isIntersecting } as IntersectionObserverEntry],
        this as unknown as IntersectionObserver,
      );
    }
  }
  vi.stubGlobal('IntersectionObserver', ObserverMock);
  return instances;
}
