import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import type { Catalog } from "../scripts/lib/catalog.ts";
import { createEnricher, fetchOwners } from "../scripts/lib/enrich.ts";
import type { GraphQL } from "../scripts/lib/graphql.ts";
import { CATALOG_PATH, publish, type Snapshot } from "../scripts/lib/publish.ts";
import { END, START } from "../scripts/lib/render.ts";
import { BEHIND_ALLOW_LIST, type EnrichedTool, type OwnerFacts, type Tool } from "../scripts/lib/types.ts";

const NOW = new Date("2026-09-26T03:17:00.000Z");

function declared(slug: string, owner: string, category = "c"): Tool {
  return { slug, name: slug, repository: `https://github.com/${owner}/${slug}`, category, file: "" };
}

function published(tool: Tool, stars: number, maintainerVerified: boolean): EnrichedTool {
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

const neon = declared("neon", "neondatabase");
const ripgrep = declared("ripgrep", "BurntSushi");
const owner: OwnerFacts = { login: "neondatabase", kind: "organization", name: "Neon", bio: null, website: null, url: "https://github.com/neondatabase" };

async function checkout(snapshot: Snapshot): Promise<string> {
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

function catalogOf(...tools: Tool[]): Catalog {
  return { tools, products: [], categories: new Map([["c", { name: "C", description: "D" }], ["relational-database", { name: "R", description: "D" }]]) };
}

describe("refresh of a tool behind an IP allow list", () => {
  it("keeps its last published facts, series and maintainer mark, and publishes without losing it", async () => {
    const before = published(neon, 23132, true);
    const root = await checkout({ checkedAt: "2026-09-25T03:17:00.000Z", owners: { neondatabase: owner }, tools: [before] });
    const enricher = await createEnricher(root, null, [neon, ripgrep], NOW);
    const edited = { ...neon, category: "relational-database" };

    const kept = await enricher.enrich(edited, BEHIND_ALLOW_LIST);
    assert.ok(kept);
    assert.deepEqual(kept.repo, before.repo);
    assert.deepEqual(kept.starHistory, before.starHistory);
    assert.deepEqual(kept.release, before.release);
    assert.deepEqual(kept.contributors, before.contributors);
    assert.equal(kept.maintainerVerified, true);
    assert.equal(kept.category, "relational-database");

    await publish(root, catalogOf(edited, ripgrep), { checkedAt: NOW.toISOString(), owners: { neondatabase: owner }, tools: [kept] });
    const written = JSON.parse(await readFile(join(root, CATALOG_PATH), "utf8")) as Snapshot;
    assert.deepEqual(
      written.tools.map((t) => [t.slug, t.repo.stars, t.maintainerVerified]),
      [["neon", 23132, true]],
    );
  });

  it("leaves out a tool no run has read yet, which the lost-tool guard does not count", async () => {
    const listed = published(ripgrep, 68622, false);
    const root = await checkout({ checkedAt: "2026-09-25T03:17:00.000Z", owners: {}, tools: [listed] });
    const enricher = await createEnricher(root, null, [neon, ripgrep], NOW);
    assert.equal(await enricher.enrich(neon, BEHIND_ALLOW_LIST), null);
    await publish(root, catalogOf(neon, ripgrep), { checkedAt: NOW.toISOString(), owners: {}, tools: [listed] });
  });
});

describe("fetchOwners", () => {
  it("keeps the published owner of an organisation behind an IP allow list", async () => {
    const gql: GraphQL = {
      async query<T>() {
        const message = "the `neondatabase` organization has an IP allow list enabled, and your IP address is not permitted to access this resource.";
        return { data: { o0: null } as T, errors: [{ type: "FORBIDDEN", path: ["o0"], message }] };
      },
      spent: () => ({ queries: 0, cost: 0, remaining: null }),
    };
    assert.deepEqual(await fetchOwners(gql, [published(neon, 1, false)], { neondatabase: owner }), { neondatabase: owner });
  });
});
