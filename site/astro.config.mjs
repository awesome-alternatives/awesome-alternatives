import { satteri } from "@astrojs/markdown-satteri";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import { repoLinks } from "./src/lib/repo.ts";

export default defineConfig({
  site: "https://awesome-alternatives.com",
  trailingSlash: "always",
  integrations: [react(), sitemap()],
  markdown: {
    syntaxHighlight: false,
    processor: satteri({ hastPlugins: [repoLinks] }),
  },
  vite: {
    server: {
      fs: { allow: [".."] },
      proxy: {
        "/api": {
          target: process.env.API_PROXY_TARGET ?? "https://awesome-alternatives.com",
          changeOrigin: true,
        },
      },
    },
  },
});
