// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://alpacorp.net',
  integrations: [
    mdx(),
    // Translations are linked with hreflang in each page's <head> (see lib/seo.ts);
    // the sitemap's i18n option can't pair them because the slugs differ per language.
    sitemap(),
  ],
  // The site's CSS is small (~8 KB): inlining it saves render-blocking requests.
  build: { inlineStylesheets: 'always' },
  // Keep old URLs working after a case study is renamed.
  redirects: {
    '/casos/opsit-devoluciones-cashbacks': '/casos/plataforma-refunds',
  },
});
