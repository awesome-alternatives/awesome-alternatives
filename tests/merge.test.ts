import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { mergeEntries } from "../scripts/lib/merge.ts";
import type { EnrichedTool, OwnerFacts } from "../scripts/lib/types.ts";

function tool(slug: string, stars: number): EnrichedTool {
  return { slug, repo: { stars } } as unknown as EnrichedTool;
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
});
