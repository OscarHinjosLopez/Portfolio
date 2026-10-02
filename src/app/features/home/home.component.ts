import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { CredentialsStripComponent } from './components/credentials-strip/credentials-strip.component';
import { TechStackComponent } from './components/tech-stack/tech-stack.component';

import { SelectedWorkComponent } from './components/selected-work/selected-work.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, CredentialsStripComponent, TechStackComponent, SelectedWorkComponent],
  template:
    '<main id="main-content" tabindex="-1"><app-hero /><app-credentials-strip /><app-tech-stack /><app-selected-work /></main>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
