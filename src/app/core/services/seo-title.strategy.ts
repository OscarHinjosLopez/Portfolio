import { Injectable, inject } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { SEO } from '../config/seo.config';
import { SeoData } from '../models/seo.model';
import { SeoService } from './seo.service';

@Injectable()
export class SeoTitleStrategy extends TitleStrategy {
  private readonly seo = inject(SeoService);
  override updateTitle(snapshot: RouterStateSnapshot): void {
    let route = snapshot.root;
    while (route.firstChild) route = route.firstChild;
    const data = route.data['seo'] as SeoData | undefined;
    this.seo.update(data ?? { ...SEO.notFound, canonicalPath: snapshot.url.split(/[?#]/)[0] });
  }
}
