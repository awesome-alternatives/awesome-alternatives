import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve, sep } from "node:path";

import { missingImages } from "../src/lib/socialImage.ts";

const DIST = resolve(import.meta.dirname, "../dist");

const pages = readdirSync(DIST, { recursive: true, encoding: "utf8" })
  .filter((file) => file.endsWith(".html"))
  .map((file) => ({ path: `/${file.split(sep).join("/")}`, html: readFileSync(resolve(DIST, file), "utf8") }));

const missing = missingImages(pages, (path) => existsSync(resolve(DIST, `.${path}`)));
for (const { page, image } of missing) console.error(`${page} points at ${image}, which the build did not write`);
if (missing.length > 0) process.exit(1);
const images = readdirSync(resolve(DIST, "og"), { recursive: true, encoding: "utf8" }).filter((file) => file.endsWith(".png"));
console.log(`${pages.length} pages, every social image written (${images.length} generated)`);
