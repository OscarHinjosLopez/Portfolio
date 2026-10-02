import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  it('renders the Hero inside a single main landmark', async () => {
    TestBed.configureTestingModule({ imports: [HomeComponent], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(HomeComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('main').length).toBe(1);
    expect(element.querySelector('main app-hero')).toBeTruthy();
    expect(element.querySelectorAll('h1').length).toBe(1);
  });
});
