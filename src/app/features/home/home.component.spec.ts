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
      'APP-SELECTED-WORK',
      'APP-EXPERIENCE-SECTION',
      'APP-HOW-I-BUILD',
      'APP-ABOUT',
      'APP-CONTACT',
    ]);
    expect(element.querySelector('#work')).toBeTruthy();
    expect(element.querySelector('#skills')).toBeTruthy();
    expect(element.querySelector('#experience')).toBeTruthy();
    expect(element.querySelector('#how-i-build')).toBeTruthy();
    expect(element.querySelector('#about')).toBeTruthy();
    const contact = element.querySelector('#contact')!;
    const about = element.querySelector('#about')!;
    expect(contact).toBeTruthy();
    expect(about.compareDocumentPosition(contact) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(element.querySelector('#top')).toBeTruthy();
  });
});
