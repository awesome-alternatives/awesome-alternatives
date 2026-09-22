import react from "@astrojs/react";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://awesome-alternatives.com",
  trailingSlash: "always",
  integrations: [react()],
  vite: {
    server: { fs: { allow: [".."] } },
  },
});
