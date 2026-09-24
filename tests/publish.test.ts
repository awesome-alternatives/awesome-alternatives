import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import type { Catalog } from "../scripts/lib/catalog.ts";
import { CATALOG_PATH, LostTools, lostTools, publish, publishOrExplain } from "../scripts/lib/publish.ts";
import { END, START } from "../scripts/lib/render.ts";
import type { EnrichedTool, Tool } from "../scripts/lib/types.ts";

const slugs = (...names: string[]) => names.map((slug) => ({ slug }));

describe("lostTools", () => {
  it("names a tool that was published and is still declared but did not come back", () => {
    assert.deepEqual(lostTools(slugs("a", "b", "c"), slugs("a", "b", "c"), slugs("a")), ["b", "c"]);
  });

  it("lets a pull request remove a tool: gone from data/tools is not lost", () => {
    assert.deepEqual(lostTools(slugs("a", "b"), slugs("a"), slugs("a")), []);
  });

  it("does not count a tool that was never published", () => {
    assert.deepEqual(lostTools(slugs("a"), slugs("a", "new"), slugs("a")), []);
  });
});

function declared(slug: string): Tool {
  return { slug, name: slug, repository: `https://github.com/acme/${slug}`, category: "c", file: "" };
}

function enriched(slug: string): EnrichedTool {
  return {
    ...declared(slug),
    replaces: [],
    affiliation: null,
    path: null,
    addedAt: "2026-09-22T00:00:00.000Z",
    editedAt: "2026-09-22T00:00:00.000Z",
    factsChangedAt: null,
    repo: {
      fullName: `acme/${slug}`,
      description: null,
      homepage: null,
      language: "Go",
      license: "MIT",
      stars: 1,
      forks: 0,
      topics: [],
      archived: false,
      fork: false,
      private: false,
      createdAt: "2020-01-01T00:00:00Z",
      pushedAt: "2026-09-01T00:00:00Z",
      defaultBranch: "main",
    },
    release: null,
    releases: [],
    maintainerVerified: false,
    flags: [],
    terms: "open",
    capabilities: {},
    deploy: [],
  };
}

const README = `# Catalog\n\n${START}\n\nold table\n\n${END}\n`;

async function published(tools: string[]): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), "aa-publish-"));
  await mkdir(join(root, "generated"));
  await writeFile(join(root, CATALOG_PATH), JSON.stringify({ checkedAt: "x", owners: {}, tools: tools.map(enriched) }));
  await writeFile(join(root, "README.md"), README);
  return root;
}

function catalogOf(...names: string[]): Catalog {
  return { tools: names.map(declared), products: [], categories: new Map([["c", { name: "C", description: "D" }]]) };
}

const snapshot = (...names: string[]) => ({ checkedAt: "2026-09-24T03:17:00.000Z", owners: {}, tools: names.map(enriched) });

describe("publish", () => {
  it("refuses a run that lost a tool and writes neither the catalog nor the README", async () => {
    const root = await published(["a", "b"]);
    const before = await readFile(join(root, CATALOG_PATH), "utf8");
    await assert.rejects(publish(root, catalogOf("a", "b"), snapshot("a")), (error: unknown) => {
      assert.ok(error instanceof LostTools);
      assert.deepEqual(error.slugs, ["b"]);
      return true;
    });
    assert.equal(await readFile(join(root, CATALOG_PATH), "utf8"), before);
    assert.equal(await readFile(join(root, "README.md"), "utf8"), README);
  });

  it("publishes a run where a tool left data/tools through a pull request", async () => {
    const root = await published(["a", "b"]);
    await publish(root, catalogOf("a"), snapshot("a"));
    const written = JSON.parse(await readFile(join(root, CATALOG_PATH), "utf8"));
    assert.deepEqual(
      written.tools.map((t: { slug: string }) => t.slug),
      ["a"],
    );
    assert.match(await readFile(join(root, "README.md"), "utf8"), /\[a\]\(https:\/\/github.com\/acme\/a\)/);
  });

  it("sets a failing exit code and names the lost tools instead of throwing", async () => {
    const root = await published(["a", "b"]);
    const errors: string[] = [];
    const original = console.error;
    console.error = (message: string) => errors.push(message);
    try {
      assert.equal(await publishOrExplain(root, catalogOf("a", "b"), snapshot("a")), false);
    } finally {
      console.error = original;
    }
    assert.equal(process.exitCode, 1);
    process.exitCode = 0;
    assert.match(errors[0] ?? "", /^b: in the published catalog/);
  });
});
