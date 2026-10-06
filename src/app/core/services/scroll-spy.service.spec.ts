import { TestBed } from '@angular/core/testing';
import { vi, afterEach } from 'vitest';
import { ScrollSpyService } from './scroll-spy.service';
import { mockIntersectionObserver } from '../../shared/testing/intersection-observer.mock';

describe('ScrollSpyService', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });
  it('observes registered sections and selects one stable reading location', () => {
    const observers = mockIntersectionObserver();
    const service = TestBed.inject(ScrollSpyService);
    const skills = document.createElement('section');
    skills.id = 'skills';
    const work = document.createElement('section');
    work.id = 'work';
    const skillsRect = vi
      .spyOn(skills, 'getBoundingClientRect')
      .mockReturnValue({ top: 0, bottom: 150 } as DOMRect);
    const workRect = vi
      .spyOn(work, 'getBoundingClientRect')
      .mockReturnValue({ top: 150, bottom: 400 } as DOMRect);
    const update = vi.fn();
    const stop = service.observe([skills, work], update);
    expect(observers[0].observe.mock.calls.map((call) => call[0])).toEqual([skills, work]);
    observers[0].notify();
    expect(update).toHaveBeenLastCalledWith('skills');
    skillsRect.mockReturnValue({ top: -30, bottom: 120 } as DOMRect);
    workRect.mockReturnValue({ top: 120, bottom: 370 } as DOMRect);
    observers[0].notify();
    expect(update).toHaveBeenLastCalledWith('work');
    workRect.mockReturnValue({ top: 300, bottom: 550 } as DOMRect);
    observers[0].notify();
    expect(update).toHaveBeenLastCalledWith(null);
    stop();
  });

  it('rebuilds the reading band on resize and cleans up observation and the listener', () => {
    const observers = mockIntersectionObserver();
    const update = vi.fn();
    const stop = TestBed.inject(ScrollSpyService).observe(
      [document.createElement('section')],
      update,
    );
    window.dispatchEvent(new Event('resize'));
    expect(observers[0].disconnect).toHaveBeenCalledOnce();
    expect(observers).toHaveLength(2);
    stop();
    expect(observers[1].disconnect).toHaveBeenCalledOnce();
    expect(update).toHaveBeenLastCalledWith(null);
    window.dispatchEvent(new Event('resize'));
    expect(observers).toHaveLength(2);
  });

  it('supports environments without IntersectionObserver', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    expect(() =>
      TestBed.inject(ScrollSpyService).observe([document.createElement('section')], vi.fn())(),
    ).not.toThrow();
  });
});
