import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { installationsFromEnv } from "./lib/app.ts";
import { loadSoundCatalog } from "./lib/catalog.ts";
import { createEnricher, fetchOwners } from "./lib/enrich.ts";
import { fetchRepositories } from "./lib/facts-graphql.ts";
import { createGitHub } from "./lib/github.ts";
import { createGraphQL } from "./lib/graphql.ts";
import type { RefreshedEntry } from "./lib/merge.ts";

const [slug, outDir] = process.argv.slice(2);
if (!slug || !outDir) {
  console.error("usage: node scripts/refresh-tool.ts <slug> <out-dir>");
  process.exit(2);
}

const root = process.cwd();
const catalog = await loadSoundCatalog(root);
const tool = catalog.tools.find((t) => t.slug === slug);
if (!tool) {
  console.error(`${slug}: no such tool in data/tools`);
  process.exit(1);
}

const gh = createGitHub(process.env.GITHUB_TOKEN);
const gql = createGraphQL(process.env.GITHUB_TOKEN);
const enricher = await createEnricher(root, installationsFromEnv(process.env), catalog.tools, new Date());
const facts = await fetchRepositories(gql, gh, [tool]);
const enriched = await enricher.enrich(tool, facts.get(slug) ?? null);
const [owner = null] = enriched ? Object.values(await fetchOwners(gql, [enriched])) : [];
const entry: RefreshedEntry = { slug, tool: enriched, owner };

await mkdir(outDir, { recursive: true });
await writeFile(join(outDir, `${slug}.json`), `${JSON.stringify(entry)}\n`);
console.log(`refreshed ${slug}`);
