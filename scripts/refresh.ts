import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
  ADDED_LOG_ARGS,
  addedAt,
  carriedAddedAt,
  EDITED_LOG_ARGS,
  parseAddedLog,
  parseEditedLog,
} from "./lib/added.ts";
import { factsChangedAt, type PreviousFacts } from "./lib/changed.ts";
import { loadCatalog } from "./lib/catalog.ts";
import { fetchOwner, fetchReleases, ownerOf } from "./lib/facts.ts";
import { gather, mapLimit } from "./lib/gather.ts";
import { createGitHub } from "./lib/github.ts";
import { renderCatalog, spliceReadme } from "./lib/render.ts";
import { statsOf } from "./lib/stats.ts";
import { judge, replacedSlugs } from "./lib/rules.ts";
import { termsOf } from "./lib/terms.ts";
import { trendOf } from "./lib/trending.ts";
import { isFlagCode, type EnrichedTool, type ListedProduct, type OwnerFacts } from "./lib/types.ts";

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
const catalogPath = join(root, "generated/catalog.json");
const previous: { tools: (PreviousFacts & { slug: string; addedAt?: string })[] } = JSON.parse(
  await readFile(catalogPath, "utf8"),
);
const carried = carriedAddedAt(previous);
const before = new Map(previous.tools.map((t) => [t.slug, t]));
const git = (args: string[]) => execFileSync("git", args, { cwd: root, encoding: "utf8" });
const history = parseAddedLog(git(ADDED_LOG_ARGS));
const edits = parseEditedLog(git(EDITED_LOG_ARGS));

const enriched = await mapLimit(catalog.tools, 4, async (tool) => {
  const evidence = await gather(gh, tool, true);
  const flags = judge(tool, evidence, now, replaced)
    .map((f) => f.code)
    .filter(isFlagCode);
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
    path: tool.path ?? null,
    addedAt: addedAt(tool.slug, carried, history, now),
    editedAt: edits.get(tool.slug) ?? now.toISOString(),
    factsChangedAt: factsChangedAt(before.get(tool.slug), evidence.repo, now),
    repo: evidence.repo,
    trend: trendOf(evidence.recentStars, evidence.repo.stars, now),
    release: evidence.release,
    releases: await fetchReleases(gh, evidence.repo.fullName),
    maintainerVerified: evidence.maintainerVerified,
    flags,
    terms: termsOf(tool.terms, evidence.repo.license),
    capabilities: tool.capabilities ?? {},
  };
  return entry;
});

const tools = enriched.filter((t) => t !== null).sort((a, b) => a.slug.localeCompare(b.slug));

const logins = [...new Set(tools.map((t) => ownerOf(t.repo.fullName)))].sort((a, b) => a.localeCompare(b));
const fetched = await mapLimit(logins, 4, (login) => fetchOwner(gh, login));
const owners: Record<string, OwnerFacts> = {};
fetched.forEach((owner, i) => {
  if (owner) owners[owner.login] = owner;
  else console.error(`${logins[i]}: GitHub reports no such account, listed without an owner`);
});

const products: ListedProduct[] = catalog.products
  .map(({ file: _, ...product }) => product)
  .sort((a, b) => a.slug.localeCompare(b.slug));

const categories = Object.fromEntries(catalog.categories);

await writeFile(
  catalogPath,
  `${JSON.stringify({ stats: statsOf(tools), checkedAt: now.toISOString(), owners, tools, products, categories }, null, 2)}\n`,
);

const readmePath = join(root, "README.md");
const readme = await readFile(readmePath, "utf8");
await writeFile(readmePath, spliceReadme(readme, renderCatalog(tools, products, catalog.categories)));

console.log(`refreshed ${tools.length} tools`);
