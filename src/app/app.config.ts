import {
  ApplicationConfig,
  DOCUMENT,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAppInitializer(() => {
      const scroller = inject(ViewportScroller);
      const document = inject(DOCUMENT);
      // Router scrolling uses coordinates, so reuse the CSS offset for the sticky navbar.
      scroller.setOffset(() => [
        0,
        Number.parseFloat(
          document.defaultView?.getComputedStyle(document.documentElement).scrollPaddingTop ?? '0',
        ) || 0,
      ]);
    }),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    ),
  ],
};
