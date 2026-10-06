import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { CredentialsStripComponent } from './components/credentials-strip/credentials-strip.component';
import { TechStackComponent } from './components/tech-stack/tech-stack.component';

import { SelectedWorkComponent } from './components/selected-work/selected-work.component';
import { ExperienceSectionComponent } from './components/experience-section/experience-section.component';
import { HowIBuildComponent } from './components/how-i-build/how-i-build.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ScrollSpyDirective } from '../../shared/directives/scroll-spy.directive';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

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
    ScrollSpyDirective,
    RevealOnScrollDirective,
  ],
  template:
    '<main id="main-content" tabindex="-1" [appScrollSpy]="sections" scrollSpyScope="home"><app-hero /><app-credentials-strip appReveal /><app-tech-stack appReveal /><app-selected-work appReveal /><app-experience-section appReveal /><app-how-i-build appReveal /><app-about appReveal /><app-contact appReveal /></main>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly sections = ['skills', 'work', 'experience', 'about', 'contact'];
}
