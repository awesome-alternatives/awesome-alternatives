import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { judge, replacedSlugs, spikeOf } from "../scripts/lib/rules.ts";
import type { RepoFacts, StarPoint, Tool } from "../scripts/lib/types.ts";

const NOW = new Date("2026-09-22T12:00:00Z");

const tool: Tool = {
  slug: "sample",
  name: "sample",
  repository: "https://github.com/acme/sample",
  category: "release-automation",
  file: "data/tools/sample.yaml",
};

function repo(overrides: Partial<RepoFacts> = {}): RepoFacts {
  return {
    fullName: "acme/sample",
    description: null,
    homepage: null,
    language: "Rust",
    license: "MIT",
    stars: 400,
    forks: 20,
    topics: [],
    archived: false,
    fork: false,
    private: false,
    createdAt: "2024-01-01T00:00:00Z",
    pushedAt: "2026-09-01T00:00:00Z",
    defaultBranch: "main",
    ...overrides,
  };
}

const release = { tag: "v1.0.0", publishedAt: null, url: "u", source: "release" as const, signed: false };

function codes(
  r: RepoFacts | null,
  starHistory: StarPoint[] = [],
  withRelease = true,
  entry: Tool = tool,
  replaced: ReadonlySet<string> = new Set(),
) {
  return judge(entry, { repo: r, release: withRelease ? release : null, starHistory }, NOW, replaced).map(
    (f) => `${f.severity}:${f.code}`,
  );
}

describe("judge", () => {
  it("passes a healthy, established repository", () => {
    assert.deepEqual(codes(repo()), []);
  });

  it("stops at not-found when the repository does not resolve", () => {
    assert.deepEqual(codes(null), ["error:not-found"]);
  });

  it("refuses archived repositories and forks", () => {
    assert.deepEqual(codes(repo({ archived: true, fork: true })), ["error:archived", "error:fork"]);
  });

  it("accepts an archived repository that is only listed as something to replace", () => {
    const old = repo({ archived: true, pushedAt: "2024-01-01T00:00:00Z" });
    assert.deepEqual(codes(old, [], true, tool, new Set(["sample"])), ["warning:archived"]);
  });

  it("still refuses an archived repository nothing replaces", () => {
    assert.deepEqual(codes(repo({ archived: true }), [], true, tool, new Set(["other"])), ["error:archived"]);
  });

  it("still refuses an archived repository offered as an alternative", () => {
    const alternative: Tool = { ...tool, replaces: [{ tool: "other", fit: "full" }] };
    assert.deepEqual(codes(repo({ archived: true }), [], true, alternative, new Set(["sample"])), ["error:archived"]);
  });

  it("refuses a repository younger than the minimum age, the cheapest spam filter", () => {
    assert.deepEqual(codes(repo({ createdAt: "2026-09-10T00:00:00Z" })), ["error:too-new"]);
  });

  it("accepts a repository exactly at the minimum age", () => {
    assert.deepEqual(codes(repo({ createdAt: "2026-08-23T12:00:00Z" })), []);
  });

  it("flags a rename so the entry gets its URL updated, without blocking", () => {
    assert.deepEqual(codes(repo({ fullName: "acme-org/sample" })), ["warning:moved"]);
  });

  it("ignores case differences in the repository name", () => {
    assert.deepEqual(codes(repo({ fullName: "Acme/Sample" })), []);
  });

  it("warns on missing licence, missing release and a long silence", () => {
    assert.deepEqual(codes(repo({ license: null, pushedAt: "2025-01-01T00:00:00Z" }), [], false), [
      "warning:no-license",
      "warning:no-release",
      "warning:inactive",
    ]);
  });

  it("flags a day that gained far more stars than usual, for a human look", () => {
    assert.deepEqual(codes(repo({ stars: 400 }), daily([100, 110, 120, 130, 140, 150, 160, 170, 330])), ["warning:star-spike"]);
  });

  it("does not flag the same number of stars spread over the days", () => {
    assert.deepEqual(codes(repo({ stars: 400 }), daily([130, 160, 190, 220, 250, 280, 310, 340, 370])), []);
  });
});

function daily(stars: number[]): StarPoint[] {
  return stars.map((n, i) => ({
    at: new Date(NOW.getTime() - (stars.length - i) * 24 * 60 * 60 * 1000).toISOString(),
    stars: n,
  }));
}

describe("spikeOf", () => {
  it("reports the biggest daily gain against the median of the others", () => {
    assert.deepEqual(spikeOf(daily([100, 110, 120, 130, 140, 150, 160, 170]), 330, NOW), {
      gained: 160,
      usual: 10,
      on: NOW.toISOString().slice(0, 10),
    });
  });

  it("stays quiet for a popular tool whose usual pace is already high", () => {
    const busy = daily([1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400]);
    assert.equal(spikeOf(busy, 2900, NOW), null);
  });

  it("stays quiet under the absolute threshold, whatever the ratio", () => {
    assert.equal(spikeOf(daily([10, 10, 10, 10, 10, 10, 10, 10]), 49, NOW), null);
  });

  it("needs a week of history before judging", () => {
    assert.equal(spikeOf(daily([100, 100, 100]), 400, NOW), null);
  });

  it("spreads a gain across the days a missed refresh left out", () => {
    const gap: StarPoint[] = [
      ...daily([100, 110, 120, 130, 140, 150, 160]).map((p) => ({ ...p, at: new Date(Date.parse(p.at) - 10 * 86_400_000).toISOString() })),
      { at: new Date(NOW.getTime() - 86_400_000).toISOString(), stars: 460 },
    ];
    assert.equal(spikeOf(gap, 470, NOW), null);
  });
});

describe("replacedSlugs", () => {
  it("collects every slug some entry replaces", () => {
    const tools: Tool[] = [
      { ...tool, slug: "a", replaces: [{ tool: "x", fit: "full" }, { tool: "y", fit: "partial" }] },
      { ...tool, slug: "b", replaces: [{ tool: "x", fit: "drop-in" }] },
      { ...tool, slug: "x" },
    ];
    assert.deepEqual([...replacedSlugs(tools)].sort(), ["x", "y"]);
  });
});
