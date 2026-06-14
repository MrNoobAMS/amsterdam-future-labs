import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Build-time date used as the sitemap `lastmod` for every page. Regenerated
// on each deploy, so search engines get a fresh modification signal.
const LASTMOD = new Date().toISOString();

export default defineConfig({
  site: 'https://amsterdamfuturelabs.com',
  integrations: [
    sitemap({
      serialize(item) {
        item.lastmod = LASTMOD;
        // Home and app detail pages are the most important; legal/utility
        // pages change rarely.
        const path = new URL(item.url).pathname;
        const isAppDetail = /^\/apps\/[^/]+\/$/.test(path);

        if (path === '/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (isAppDetail || path === '/apps/') {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (path.includes('/privacy')) {
          item.priority = 0.3;
          item.changefreq = 'yearly';
        } else {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
  build: {
    // Inline all CSS into the HTML: the total is small (~25 KB) and this
    // removes the render-blocking stylesheet request on first paint, which
    // helps FCP/LCP on these landing pages.
    inlineStylesheets: 'always',
  },
});
