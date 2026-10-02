import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `<main id="main-content" tabindex="-1">Oscar Hinjos — Frontend Portfolio</main>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
