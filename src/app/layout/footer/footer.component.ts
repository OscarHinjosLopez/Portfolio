import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `<footer class="container layout-spacing body-sm text-secondary">
    © Oscar Hinjos
  </footer>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
