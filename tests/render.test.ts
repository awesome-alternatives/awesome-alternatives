import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { END, renderCatalog, START, spliceReadme } from "../scripts/lib/render.ts";
import type { EnrichedTool } from "../scripts/lib/types.ts";

function entry(slug: string, overrides: Partial<EnrichedTool> = {}, archived = false): EnrichedTool {
  return {
    slug,
    name: slug,
    repository: `https://github.com/acme/${slug}`,
    category: "c",
    replaces: [],
    affiliation: null,
    addedAt: "2026-01-01T00:00:00.000Z",
    repo: {
      fullName: `acme/${slug}`,
      description: null,
      homepage: null,
      language: "Go",
      license: "MIT",
      stars: 1,
      forks: 0,
      topics: [],
      archived,
      fork: false,
      private: false,
      createdAt: "2020-01-01T00:00:00Z",
      pushedAt: "2026-01-01T00:00:00Z",
      defaultBranch: "main",
    },
    release: null,
    releases: [],
    maintainerVerified: false,
    flags: [],
    ...overrides,
  };
}

describe("spliceReadme", () => {
  it("replaces only what sits between the markers", () => {
    const before = `intro\n${START}\nold table\n${END}\noutro\n`;
    assert.equal(spliceReadme(before, "new table"), `intro\n${START}\n\nnew table\n\n${END}\noutro\n`);
  });

  it("is stable when run twice, so the nightly job only commits real changes", () => {
    const once = spliceReadme(`a\n${START}\n${END}\nb`, "x");
    assert.equal(spliceReadme(once, "x"), once);
  });

  it("refuses a README without markers instead of appending blindly", () => {
    assert.throws(() => spliceReadme("no markers here", "x"), /markers/);
  });
});

describe("renderCatalog", () => {
  const categories = new Map([["c", { name: "C", description: "d" }]]);
  const row = (tools: EnrichedTool[], slug: string) =>
    renderCatalog(tools, categories)
      .split("\n")
      .find((line) => line.startsWith(`| [${slug}]`));

  it("marks an archived target so nobody mistakes it for a live option", () => {
    const old = entry("old", {}, true);
    const next = entry("next", { replaces: [{ tool: "old", fit: "full" }] });
    assert.match(row([old, next], "old") ?? "", /\) archived \|/);
    assert.doesNotMatch(row([old, next], "next") ?? "", /archived/);
  });

  it("keeps both marks when a verified tool is later archived", () => {
    assert.match(row([entry("both", { maintainerVerified: true }, true)], "both") ?? "", /\) verified archived \|/);
  });
});
