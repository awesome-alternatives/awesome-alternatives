import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { pairs } from "../src/lib/catalog.ts";
import { pairMap, reversedPairs } from "../src/lib/redirects.ts";

const OUT = resolve(import.meta.dirname, "../generated/compare-pairs.conf");

const table = reversedPairs(pairs);
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, pairMap(table));
console.log(`compare-pairs.conf redirects ${table.size} reversed comparison URLs to their page`);
