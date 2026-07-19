import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://fjsmart.com.br',
  integrations: [react(), sitemap()],
  output: "hybrid",
  adapter: cloudflare()
});