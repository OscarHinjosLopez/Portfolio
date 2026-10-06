import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi, afterEach } from 'vitest';
import { RevealOnScrollDirective } from './reveal-on-scroll.directive';
import { mockIntersectionObserver } from '../testing/intersection-observer.mock';

@Component({
  imports: [RevealOnScrollDirective],
  template: '<section appReveal>Visible content</section>',
})
class HostComponent {}

describe('RevealOnScrollDirective', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });
  function motionPreference(matches: boolean) {
    const preference = { matches, addEventListener: vi.fn(), removeEventListener: vi.fn() };
    vi.stubGlobal('matchMedia', () => preference);
    return preference;
  }
  it('reveals once and immediately disconnects while retaining content', async () => {
    const observers = mockIntersectionObserver();
    motionPreference(false);
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    const section = fixture.nativeElement.querySelector('section');
    expect(section.textContent).toBe('Visible content');
    expect(section.classList.contains('reveal-enter')).toBe(false);
    observers[0].notify(false);
    await fixture.whenStable();
    expect(section.classList.contains('reveal-enter')).toBe(false);
    observers[0].notify();
    await fixture.whenStable();
    expect(section.classList.contains('reveal-enter')).toBe(true);
    expect(observers[0].disconnect).toHaveBeenCalledOnce();
  });
  it('keeps reduced-motion content immediately available without an observer', async () => {
    const observers = mockIntersectionObserver();
    motionPreference(true);
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toBe('Visible content');
    expect(observers).toHaveLength(0);
  });
  it('cleans up both the observer and preference listener on destruction', async () => {
    const observers = mockIntersectionObserver();
    const preference = motionPreference(false);
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    fixture.destroy();
    expect(observers[0].disconnect).toHaveBeenCalledOnce();
    expect(preference.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
  it('keeps content available when IntersectionObserver is unavailable', async () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    motionPreference(false);
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toBe('Visible content');
    expect(fixture.nativeElement.querySelector('.reveal-enter')).toBeNull();
  });
  it('stops watching when reduced motion is enabled while awaiting intersection', async () => {
    const observers = mockIntersectionObserver();
    const preference = motionPreference(false);
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    preference.matches = true;
    preference.addEventListener.mock.calls[0][1]();
    expect(observers[0].disconnect).toHaveBeenCalledOnce();
    expect(fixture.nativeElement.textContent).toBe('Visible content');
  });
});
