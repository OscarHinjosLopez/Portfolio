import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `<main id="main-content" tabindex="-1">
    <h1>404</h1>
    <p>Página no encontrada</p>
    <a routerLink="/">Volver al inicio</a>
  </main>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
