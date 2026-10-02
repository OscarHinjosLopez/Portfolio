import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  it('renders Hero, credentials and stack in order inside a single main landmark', async () => {
    TestBed.configureTestingModule({ imports: [HomeComponent], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(HomeComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('main').length).toBe(1);
    expect(element.querySelector('main app-hero')).toBeTruthy();
    expect(element.querySelectorAll('h1').length).toBe(1);
    expect([...element.querySelector('main')!.children].map((child) => child.tagName)).toEqual([
      'APP-HERO',
      'APP-CREDENTIALS-STRIP',
      'APP-TECH-STACK',
    ]);
    expect(element.querySelector('#skills')).toBeTruthy();
  });
});
