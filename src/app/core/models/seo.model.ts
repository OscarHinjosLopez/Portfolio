export interface SeoData {
  readonly title: string;
  readonly description: string;
  readonly canonicalPath: string;
  readonly robots: 'index,follow' | 'noindex,follow' | 'noindex,nofollow';
  readonly type?: 'website' | 'article';
  readonly image?: string;
  readonly imageAlt?: string;
  readonly schema?: 'home' | 'portfolio' | 'sentinel';
}

export type JsonLdValue = string | readonly JsonLdValue[] | { readonly [key: string]: JsonLdValue };
