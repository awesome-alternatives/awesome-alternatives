import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { activeToolRedirects } from "../../scripts/lib/tool-redirects.ts";
import { categoryRedirects, pairs, toolRedirects } from "../src/lib/catalog.ts";
import { redirectMaps, reversedPairs, toolPairRedirects } from "../src/lib/redirects.ts";

const OUT = resolve(import.meta.dirname, "../generated/redirects.conf");

const renamed = activeToolRedirects(toolRedirects, new Date());
const reversed = reversedPairs(pairs);
const table = new Map([...reversed, ...toolPairRedirects(pairs, renamed)]);
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, redirectMaps(table, categoryRedirects, renamed));
console.log(
  `redirects.conf redirects ${reversed.size} reversed comparison URLs to their page, ${Object.keys(categoryRedirects).length} merged categories to the one that took their tools and ${Object.keys(renamed).length} renamed tools to their new name`,
);
