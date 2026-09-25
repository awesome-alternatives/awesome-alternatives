import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { mergeEntries } from "../scripts/lib/merge.ts";
import type { EnrichedTool, OwnerFacts, StarHistory } from "../scripts/lib/types.ts";

function tool(slug: string, stars: number, starHistory?: StarHistory): EnrichedTool {
  return { slug, repo: { stars }, ...(starHistory ? { starHistory } : {}) } as unknown as EnrichedTool;
}

function owner(login: string, name: string): OwnerFacts {
  return { login, name } as unknown as OwnerFacts;
}

const previous = {
  checkedAt: "2026-09-24T03:17:00.000Z",
  owners: { acme: owner("acme", "Acme"), zed: owner("zed", "Zed") },
  tools: [tool("alpha", 1), tool("beta", 2), tool("gamma", 3)],
};

describe("mergeEntries", () => {
  it("replaces the refreshed tools and keeps every other one as published", () => {
    const merged = mergeEntries(previous, [{ slug: "beta", tool: tool("beta", 20), owner: null }]);
    assert.deepEqual(
      merged.tools.map((t) => [t.slug, t.repo.stars]),
      [
        ["alpha", 1],
        ["beta", 20],
        ["gamma", 3],
      ],
    );
  });

  it("drops a tool whose repository is gone", () => {
    const merged = mergeEntries(previous, [{ slug: "gamma", tool: null, owner: null }]);
    assert.deepEqual(
      merged.tools.map((t) => t.slug),
      ["alpha", "beta"],
    );
  });

  it("adds a tool the published catalog did not have yet, in slug order", () => {
    const merged = mergeEntries(previous, [{ slug: "aardvark", tool: tool("aardvark", 5), owner: null }]);
    assert.deepEqual(
      merged.tools.map((t) => t.slug),
      ["aardvark", "alpha", "beta", "gamma"],
    );
  });

  it("updates the owner of a refreshed tool and keeps the others", () => {
    const merged = mergeEntries(previous, [{ slug: "beta", tool: tool("beta", 2), owner: owner("acme", "Acme Inc") }]);
    assert.equal(merged.owners.acme?.name, "Acme Inc");
    assert.equal(merged.owners.zed?.name, "Zed");
  });

  it("keeps the time of the last full check", () => {
    const merged = mergeEntries(previous, [{ slug: "beta", tool: tool("beta", 2), owner: null }]);
    assert.equal(merged.checkedAt, previous.checkedAt);
  });

  it("does not touch the published snapshot it was given", () => {
    mergeEntries(previous, [{ slug: "alpha", tool: null, owner: owner("acme", "Other") }]);
    assert.equal(previous.tools.length, 3);
    assert.equal(previous.owners.acme.name, "Acme");
  });

  it("extends the published star series with the refreshed day and keeps the days the refresh did not read", () => {
    const published = { ...previous, tools: [tool("beta", 12, { from: "2026-09-20", stars: [10, 11, 12] })] };
    const refreshed = tool("beta", 15, { from: "2026-09-23", stars: [15] });
    const [beta] = mergeEntries(published, [{ slug: "beta", tool: refreshed, owner: null }]).tools;
    assert.deepEqual(beta?.starHistory, { from: "2026-09-20", stars: [10, 11, 12, 15] });
  });

  it("publishes a new tool's one-day series as refreshed", () => {
    const refreshed = tool("aardvark", 5, { from: "2026-09-23", stars: [5] });
    const merged = mergeEntries(previous, [{ slug: "aardvark", tool: refreshed, owner: null }]);
    assert.deepEqual(merged.tools[0]?.starHistory, { from: "2026-09-23", stars: [5] });
  });
});
