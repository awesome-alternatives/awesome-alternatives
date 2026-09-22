import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { judge, maxInWindow, replacedSlugs } from "../scripts/lib/rules.ts";
import type { RepoFacts, Tool } from "../scripts/lib/types.ts";

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
  recentStars: string[] = [],
  withRelease = true,
  entry: Tool = tool,
  replaced: ReadonlySet<string> = new Set(),
) {
  return judge(entry, { repo: r, release: withRelease ? release : null, recentStars }, NOW, replaced).map(
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

  it("flags a burst of stars inside 24 hours for a human look", () => {
    const burst = Array.from({ length: 60 }, (_, i) => `2026-09-20T10:${String(i % 60).padStart(2, "0")}:00Z`);
    assert.deepEqual(codes(repo(), burst), ["warning:star-spike"]);
  });

  it("does not flag the same number of stars spread over weeks", () => {
    const steady = Array.from({ length: 60 }, (_, i) => new Date(Date.UTC(2026, 7, 1 + (i % 30), i)).toISOString());
    assert.deepEqual(codes(repo(), steady), []);
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

describe("maxInWindow", () => {
  const H = 60 * 60 * 1000;

  it("counts the densest window, not the first one", () => {
    const t = ["2026-01-01T00:00:00Z", "2026-01-05T00:00:00Z", "2026-01-05T01:00:00Z", "2026-01-05T02:00:00Z"];
    assert.equal(maxInWindow(t, 24 * H), 3);
  });

  it("does not depend on input order", () => {
    const t = ["2026-01-05T02:00:00Z", "2026-01-01T00:00:00Z", "2026-01-05T00:00:00Z"];
    assert.equal(maxInWindow(t, 24 * H), 2);
  });

  it("includes both ends of a window exactly as wide as the limit", () => {
    assert.equal(maxInWindow(["2026-01-01T00:00:00Z", "2026-01-02T00:00:00Z"], 24 * H), 2);
  });

  it("skips unparseable timestamps instead of counting them", () => {
    assert.equal(maxInWindow(["not a date", "2026-01-01T00:00:00Z"], 24 * H), 1);
  });

  it("is zero for no timestamps", () => {
    assert.equal(maxInWindow([], 24 * H), 0);
  });
});
