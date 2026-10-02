import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-project-placeholder',
  standalone: true,
  template: `<main id="main-content" tabindex="-1">
    El proyecto se implementará posteriormente.
  </main>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectPlaceholderComponent {}
