import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { installationsFromEnv } from "./lib/app.ts";
import { loadSoundCatalog } from "./lib/catalog.ts";
import { createGitHub } from "./lib/github.ts";
import { createGraphQL } from "./lib/graphql.ts";
import type { RefreshedEntry } from "./lib/merge.ts";
import { readPublished } from "./lib/publish.ts";
import { refreshTools } from "./lib/refresh-run.ts";

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

const clients = {
  gh: createGitHub(process.env.GITHUB_TOKEN),
  gql: createGraphQL(process.env.GITHUB_TOKEN),
  installations: installationsFromEnv(process.env),
};
const { tools, owners } = await refreshTools(root, await readPublished(root), clients, catalog.tools, [tool], new Date());
const [enriched = null] = tools;
const [owner = null] = Object.values(owners);
const entry: RefreshedEntry = { slug, tool: enriched, owner };

await mkdir(outDir, { recursive: true });
await writeFile(join(outDir, `${slug}.json`), `${JSON.stringify(entry)}\n`);
console.log(`refreshed ${slug}`);
