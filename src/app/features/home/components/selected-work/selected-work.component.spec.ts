import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SelectedWorkComponent } from './selected-work.component';

describe('SelectedWorkComponent', () => {
  it('renders three projects with the portfolio featured and a work anchor', async () => {
    TestBed.configureTestingModule({
      imports: [SelectedWorkComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(SelectedWorkComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('#work')).toBeTruthy();
    expect(element.querySelectorAll('article').length).toBe(3);
    expect([...element.querySelectorAll('h3')].map((title) => title.textContent)).toEqual([
      'Portfolio Engineering',
      'Sentinel — Cybersecurity Operations Dashboard',
      'LoL Scenario Trainer',
    ]);
    expect(element.querySelectorAll('app-project-card.featured').length).toBe(1);
    expect(element.querySelector('app-project-card.featured h3')?.textContent).toBe(
      'Portfolio Engineering',
    );
    expect(element.querySelector('h2')?.textContent).toBe('Proyectos seleccionados');
  });
});
