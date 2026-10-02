import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent],
  template: '<main id="main-content" tabindex="-1"><app-hero /></main>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
