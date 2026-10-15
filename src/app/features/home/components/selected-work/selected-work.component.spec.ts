import { TestBed } from '@angular/core/testing';
import { SelectedWorkComponent } from './selected-work.component';
describe('SelectedWorkComponent', () => {
  it('keeps the projects anchor without provisional projects or links', async () => {
    TestBed.configureTestingModule({ imports: [SelectedWorkComponent] });
    const fixture = TestBed.createComponent(SelectedWorkComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('#work')).toBeTruthy();
    expect(element.querySelector('h2')?.textContent).toBe('Proyectos');
    expect(element.querySelectorAll('article, a').length).toBe(0);
  });
});
