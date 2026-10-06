import {
  ApplicationConfig,
  DOCUMENT,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { provideRouter, TitleStrategy, withInMemoryScrolling } from '@angular/router';
import { SeoTitleStrategy } from './core/services/seo-title.strategy';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: TitleStrategy, useClass: SeoTitleStrategy },
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
    provideClientHydration(),
  ],
};
