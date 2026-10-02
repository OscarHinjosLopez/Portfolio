import { TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  it('renders the professional introduction and semantic metadata', async () => {
    TestBed.configureTestingModule({ imports: [AboutComponent] });
    const fixture = TestBed.createComponent(AboutComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h2')?.textContent).toBe('Sobre mí');
    for (const technology of ['Angular', 'TypeScript', 'RxJS', 'React']) {
      expect(element.querySelector('.intro')?.textContent).toContain(technology);
    }
    expect([...element.querySelectorAll('dl dt')].map((label) => label.textContent)).toEqual([
      'BASE',
      'EXPERIENCE',
      'FOCUS',
      'LANGUAGES',
      'AVAILABILITY',
    ]);
    for (const value of ['Madrid · España', 'Desde 2022', 'Inglés B2']) {
      expect(element.querySelector('dl')?.textContent).toContain(value);
    }
  });
});
