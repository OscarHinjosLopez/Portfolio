import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from './button.component';

@Component({
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  template: `
    <button appButton type="button" variant="secondary" size="sm" (click)="clicks = clicks + 1">
      Action
    </button>
    <button appButton type="button" disabled (click)="clicks = clicks + 1">Disabled</button>
    <a appButton routerLink="/destination">Internal</a>
    <a appButton href="https://angular.dev/" target="_blank" rel="noopener noreferrer">External</a>
  `,
})
class ButtonHost {
  clicks = 0;
}

describe('ButtonComponent', () => {
  it('preserves native button rendering, input variants and disabled behavior', async () => {
    TestBed.configureTestingModule({ imports: [ButtonHost], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(ButtonHost);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const buttons = element.querySelectorAll('button');
    expect(buttons[0].textContent?.trim()).toBe('Action');
    expect(buttons[0].dataset['variant']).toBe('secondary');
    expect(buttons[0].dataset['size']).toBe('sm');
    buttons[0].click();
    buttons[1].click();
    expect(buttons[1].disabled).toBe(true);
    expect(fixture.componentInstance.clicks).toBe(1);
  });

  it('preserves routerLink navigation and external link attributes', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', component: ButtonHost },
          { path: 'destination', component: ButtonHost },
        ]),
      ],
    });
    const harness = await RouterTestingHarness.create('/');
    const links = harness.routeNativeElement?.querySelectorAll('a');
    expect(links?.[1].href).toBe('https://angular.dev/');
    expect(links?.[1].target).toBe('_blank');
    expect(links?.[1].rel).toContain('noopener');
    links?.[0].click();
    await harness.fixture.whenStable();
    expect(TestBed.inject(Router).url).toBe('/destination');
  });
});
