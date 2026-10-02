import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { CredentialsStripComponent } from './components/credentials-strip/credentials-strip.component';
import { TechStackComponent } from './components/tech-stack/tech-stack.component';

import { SelectedWorkComponent } from './components/selected-work/selected-work.component';
import { ExperienceSectionComponent } from './components/experience-section/experience-section.component';
import { HowIBuildComponent } from './components/how-i-build/how-i-build.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    CredentialsStripComponent,
    TechStackComponent,
    SelectedWorkComponent,
    ExperienceSectionComponent,
    HowIBuildComponent,
    AboutComponent,
    ContactComponent,
  ],
  template:
    '<main id="main-content" tabindex="-1"><app-hero /><app-credentials-strip /><app-tech-stack /><app-selected-work /><app-experience-section /><app-how-i-build /><app-about /><app-contact /></main>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
