import { readFileSync } from "node:fs";
import { basename, resolve } from "node:path";

import config from "../astro.config.mjs";
import { tools } from "../src/lib/catalog.ts";
import { auditSitemap, locs } from "../src/lib/sitemap.ts";

const DIST = resolve(import.meta.dirname, "../dist");
const read = (file: string) => readFileSync(resolve(DIST, file), "utf8");

const site = config.site;
if (!site) throw new Error("astro.config.mjs sets no site");

const listed = locs(read("sitemap-index.xml")).flatMap((sitemap) => locs(read(basename(new URL(sitemap).pathname))));
const { missing, unwanted } = auditSitemap(site, tools, listed);

for (const url of missing) console.error(`sitemap is missing ${url}`);
for (const url of unwanted) console.error(`sitemap should not list ${url}`);
if (missing.length > 0 || unwanted.length > 0) process.exit(1);
console.log(`sitemap lists ${listed.length} URLs, every tool and target included`);
