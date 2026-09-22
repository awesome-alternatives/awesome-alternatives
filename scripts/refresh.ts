import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { loadCatalog } from "./lib/catalog.ts";
import { gather, mapLimit } from "./lib/gather.ts";
import { createGitHub } from "./lib/github.ts";
import { renderCatalog, spliceReadme } from "./lib/render.ts";
import { judge, replacedSlugs } from "./lib/rules.ts";
import type { EnrichedTool } from "./lib/types.ts";

const root = process.cwd();
const { catalog, findings } = await loadCatalog(root);
const structural = findings.filter((f) => f.severity === "error");
if (structural.length) {
  for (const f of structural) console.error(`${f.slug}: ${f.code}: ${f.message}`);
  process.exit(1);
}

const gh = createGitHub(process.env.GITHUB_TOKEN);
const now = new Date();
const replaced = replacedSlugs(catalog.tools);

const enriched = await mapLimit(catalog.tools, 4, async (tool) => {
  const evidence = await gather(gh, tool, false);
  const flags = judge(tool, evidence, now, replaced).map((f) => f.code);
  if (!evidence.repo) {
    console.error(`${tool.slug}: ${tool.repository} is gone, left out of the catalog`);
    return null;
  }
  const entry: EnrichedTool = {
    slug: tool.slug,
    name: tool.name,
    repository: tool.repository,
    category: tool.category,
    replaces: tool.replaces ?? [],
    affiliation: tool.affiliation ?? null,
    repo: evidence.repo,
    release: evidence.release,
    maintainerVerified: evidence.maintainerVerified,
    flags,
  };
  return entry;
});

const tools = enriched.filter((t) => t !== null).sort((a, b) => a.slug.localeCompare(b.slug));
await writeFile(join(root, "generated/catalog.json"), `${JSON.stringify({ tools }, null, 2)}\n`);

const readmePath = join(root, "README.md");
const readme = await readFile(readmePath, "utf8");
await writeFile(readmePath, spliceReadme(readme, renderCatalog(tools, catalog.categories)));

console.log(`refreshed ${tools.length} tools`);
