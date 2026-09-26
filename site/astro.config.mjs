import { readFileSync } from "node:fs";

import { satteri } from "@astrojs/markdown-satteri";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import { cspDirectives } from "./src/lib/csp.ts";
import { repoLinks } from "./src/lib/repo.ts";
import { SEARCHING_SCRIPT_HASH } from "./src/lib/searching.ts";
import { lastmodByPath } from "./src/lib/sitemap.ts";

const catalog = JSON.parse(readFileSync(new URL("../generated/catalog.json", import.meta.url), "utf8"));
const lastmods = lastmodByPath(catalog.tools);

export default defineConfig({
  site: "https://awesome-alternatives.com",
  trailingSlash: "always",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "es", "de"],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    preact(),
    sitemap({
      i18n: { defaultLocale: "en", locales: { en: "en", fr: "fr", es: "es", de: "de" } },
      serialize(item) {
        const lastmod = lastmods.get(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  markdown: {
    syntaxHighlight: false,
    processor: satteri({ hastPlugins: [repoLinks] }),
  },
  security: {
    csp: {
      directives: cspDirectives(process.env.PUBLIC_API_URL),
      scriptDirective: { hashes: [SEARCHING_SCRIPT_HASH] },
    },
  },
  vite: {
    build: { assetsInlineLimit: 0 },
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
