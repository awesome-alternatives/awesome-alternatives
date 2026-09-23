import { readdirSync, readFileSync } from "node:fs";
import { resolve, sep } from "node:path";

import { clashes, metaOf } from "../src/lib/titles.ts";

const DIST = resolve(import.meta.dirname, "../dist");

const pages = readdirSync(DIST, { recursive: true, encoding: "utf8" })
  .filter((file) => file.endsWith(".html"))
  .map((file) => metaOf(`/${file.split(sep).join("/")}`, readFileSync(resolve(DIST, file), "utf8")));

const found = clashes(pages);
for (const clash of found) {
  console.error(`${clash.paths.length} ${clash.lang} pages share the ${clash.field} "${clash.value}": ${clash.paths.join(", ")}`);
}
if (found.length > 0) process.exit(1);
console.log(`${pages.length} pages, every indexed title and description unique`);
