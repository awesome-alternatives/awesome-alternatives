import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

import { missingImages } from "../src/lib/socialImage.ts";
import { builtPages, DIST, htmlFiles } from "./builtPages.ts";

const missing = missingImages(builtPages(), (path) => existsSync(resolve(DIST, `.${path}`)));
for (const { page, image } of missing) console.error(`${page} points at ${image}, which the build did not write`);
if (missing.length > 0) process.exit(1);
const images = readdirSync(resolve(DIST, "og"), { recursive: true, encoding: "utf8" }).filter((file) => file.endsWith(".png"));
console.log(`${htmlFiles.length} pages, every social image written (${images.length} generated)`);
