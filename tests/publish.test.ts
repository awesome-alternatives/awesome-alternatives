import assert from "node:assert/strict";
import { access, mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import type { Catalog } from "../scripts/lib/catalog.ts";
import { EVENTS_PATH, eventsJson, parseEventLog } from "../scripts/lib/event-log.ts";
import { mergeEntries } from "../scripts/lib/merge.ts";
import { CATALOG_PATH, catalogJson, LostTools, lostTools, publish, publishOrExplain } from "../scripts/lib/publish.ts";
import { END, START } from "../scripts/lib/render.ts";
import type { CatalogEvent, EnrichedTool, Tool } from "../scripts/lib/types.ts";

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

describe("catalogJson", () => {
  it("writes a star series on one line and everything else indented, without changing the data", () => {
    const catalog = { tools: [{ slug: "a", topics: ["x", "y"], starHistory: { from: "2026-09-24", stars: [1, 20, 300] } }], empty: [] };
    const json = catalogJson(catalog);
    assert.match(json, /\n {8}"stars": \[1,20,300\]\n/);
    assert.match(json, /"topics": \[\n {8}"x",\n {8}"y"\n {6}\]/);
    assert.deepEqual(JSON.parse(json), catalog);
    assert.ok(json.endsWith("}\n"));
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
    await assert.rejects(access(join(root, EVENTS_PATH)));
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

  it("writes each tool's star series on one line", async () => {
    const root = await published(["a"]);
    const tools = [{ ...enriched("a"), starHistory: { from: "2026-09-23", stars: [3, 5] } }];
    await publish(root, catalogOf("a"), { checkedAt: "2026-09-24T03:17:00.000Z", owners: {}, tools });
    assert.match(await readFile(join(root, CATALOG_PATH), "utf8"), /\n {8}"stars": \[3,5\]\n/);
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

describe("publish and the event log", () => {
  const now = new Date("2026-09-25T03:00:00.000Z");
  const context = { now, history: null };
  const events = async (root: string) => parseEventLog(await readFile(join(root, EVENTS_PATH), "utf8"));
  const archivedTool = (slug: string) => ({ ...enriched(slug), repo: { ...enriched(slug).repo, archived: true } });
  const released = (slug: string, tag: string) => ({
    ...enriched(slug),
    release: { tag, publishedAt: now.toISOString(), url: "", source: "release" as const, signed: false },
  });

  it("starts the log on the first run and records what changed against the published catalog", async () => {
    const root = await published(["a", "b"]);
    await publish(root, catalogOf("a", "c"), { ...snapshot("a", "c"), tools: [archivedTool("a"), enriched("c")] }, context);
    assert.deepEqual(
      (await events(root)).map((e) => `${e.slug} ${e.type} ${e.at} ${e.commit}`),
      [
        "a archived 2026-09-25T03:00:00.000Z null",
        "b removed 2026-09-25T03:00:00.000Z null",
        "c added 2026-09-25T03:00:00.000Z null",
      ],
    );
  });

  it("appends to the published log and does not repeat itself when the same catalog is published again", async () => {
    const root = await published(["a"]);
    const earlier: CatalogEvent = { type: "added", slug: "a", at: "2026-09-22T00:00:00.000Z", commit: "abc" };
    await writeFile(join(root, EVENTS_PATH), eventsJson([earlier]));
    const next = { ...snapshot("a"), tools: [archivedTool("a")] };
    await publish(root, catalogOf("a"), next, context);
    await publish(root, catalogOf("a"), next, { now: new Date("2026-09-26T03:00:00.000Z"), history: null });
    assert.deepEqual(
      (await events(root)).map((e) => `${e.slug} ${e.type}`),
      ["a added", "a archived"],
    );
  });

  it("records the release of a tool refreshed on its own and nothing for the tools left as they were", async () => {
    const root = await published(["a", "b"]);
    const previous = JSON.parse(await readFile(join(root, CATALOG_PATH), "utf8"));
    const merged = mergeEntries(previous, [{ slug: "b", tool: released("b", "v2.0.0"), owner: null }]);
    await publish(root, catalogOf("a", "b"), merged, context);
    assert.deepEqual(await events(root), [
      { type: "released", slug: "b", at: now.toISOString(), commit: null, from: null, to: "v2.0.0" },
    ]);
  });

  it("links earlier events to the commit found in the history", async () => {
    const root = await published(["a"]);
    const pending: CatalogEvent = { type: "archived", slug: "a", at: "2026-09-24T03:00:00.000Z", commit: null };
    await writeFile(join(root, EVENTS_PATH), eventsJson([pending]));
    const history = { revisionsSince: () => [{ sha: "c0ffee", events: [pending] }] };
    await publish(root, catalogOf("a"), snapshot("a"), { now, history });
    assert.equal((await events(root))[0]?.commit, "c0ffee");
  });
});
