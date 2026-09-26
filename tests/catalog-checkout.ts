import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { Catalog } from "../scripts/lib/catalog.ts";
import { CATALOG_PATH, type Snapshot } from "../scripts/lib/publish.ts";
import { END, START } from "../scripts/lib/render.ts";
import type { EnrichedTool, Tool } from "../scripts/lib/types.ts";

export function declared(slug: string, owner: string, category = "c"): Tool {
  return { slug, name: slug, repository: `https://github.com/${owner}/${slug}`, category, file: "" };
}

export function published(tool: Tool, stars: number, maintainerVerified: boolean): EnrichedTool {
  const fullName = tool.repository.replace("https://github.com/", "");
  return {
    slug: tool.slug,
    name: tool.name,
    repository: tool.repository,
    category: tool.category,
    replaces: [],
    affiliation: null,
    path: null,
    addedAt: "2026-09-01T00:00:00.000Z",
    editedAt: "2026-09-01T00:00:00.000Z",
    factsChangedAt: null,
    repo: {
      fullName,
      description: "d",
      homepage: null,
      language: "Rust",
      license: "Apache-2.0",
      stars,
      forks: 1,
      topics: [],
      archived: false,
      fork: false,
      private: false,
      createdAt: "2021-03-26T00:00:00Z",
      pushedAt: "2026-09-25T00:00:00Z",
      defaultBranch: "main",
    },
    trend: null,
    starHistory: { from: "2026-09-24", stars: [stars - 2, stars - 1, stars] },
    release: { tag: "v1", publishedAt: "2026-09-20T00:00:00Z", url: "u", source: "release", signed: false },
    releases: [],
    contributors: { count: 12, capped: false },
    platforms: [],
    maintainerVerified,
    flags: [],
    terms: "open",
    capabilities: {},
    deploy: [],
  };
}

export async function checkout(snapshot: Snapshot): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), "aa-enrich-"));
  await mkdir(join(root, "generated"));
  await mkdir(join(root, "data", "tools"), { recursive: true });
  await writeFile(join(root, CATALOG_PATH), JSON.stringify(snapshot));
  await writeFile(join(root, "README.md"), `# Catalog\n\n${START}\n\n${END}\n`);
  for (const tool of snapshot.tools) await writeFile(join(root, "data", "tools", `${tool.slug}.yaml`), `name: ${tool.name}\n`);
  const git = (...args: string[]) =>
    execFileSync("git", ["-c", "user.name=t", "-c", "user.email=t@example.com", "-c", "commit.gpgsign=false", "-c", "core.autocrlf=false", ...args], { cwd: root });
  git("init", "--quiet");
  git("add", ".");
  git("commit", "--quiet", "-m", "catalog");
  return root;
}

export function catalogOf(...tools: Tool[]): Catalog {
  return { tools, products: [], categories: new Map([["c", { name: "C", description: "D" }], ["relational-database", { name: "R", description: "D" }]]) };
}
