import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `<header><nav aria-label="Navegación principal">Oscar Hinjos</nav></header>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {}
