import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    expect(TestBed.createComponent(AppComponent).componentInstance).toBeTruthy();
  });

  it('should render the layout and skip link', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('header nav')?.textContent).toBe('Oscar Hinjos');
    expect(element.querySelector('footer')?.textContent).toBe('© Oscar Hinjos');
    expect(element.querySelector('router-outlet')).toBeTruthy();
    expect(element.querySelector('.skip-link')?.getAttribute('href')).toBe('#main-content');
  });
});
