import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { categoryRedirects, pairs } from "../src/lib/catalog.ts";
import { redirectMaps, reversedPairs } from "../src/lib/redirects.ts";

const OUT = resolve(import.meta.dirname, "../generated/redirects.conf");

const table = reversedPairs(pairs);
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, redirectMaps(table, categoryRedirects));
console.log(
  `redirects.conf redirects ${table.size} reversed comparison URLs to their page and ${Object.keys(categoryRedirects).length} merged categories to the one that took their tools`,
);
