// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://alpacorp.net',
  integrations: [mdx(), sitemap()],
  // Keep old URLs working after a case study is renamed.
  redirects: {
    '/casos/opsit-devoluciones-cashbacks': '/casos/plataforma-refunds',
  },
});
