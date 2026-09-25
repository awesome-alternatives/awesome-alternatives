import assert from "node:assert/strict";
import { test } from "node:test";

import type { EnrichedTool, ReleaseEntry } from "../../scripts/lib/types.ts";
import { fullYearsBetween, platformLine, vitalityOf } from "../src/lib/vitality.ts";

const READ_AT = "2026-09-24T03:00:00.000Z";

const release = (tag: string, publishedAt: string): ReleaseEntry => ({ tag, name: null, publishedAt, url: tag, prerelease: false });

function tool(over: Partial<EnrichedTool> = {}): EnrichedTool {
  return {
    slug: "ripgrep",
    name: "ripgrep",
    repository: "https://github.com/BurntSushi/ripgrep",
    category: "search",
    replaces: [],
    affiliation: null,
    path: null,
    addedAt: "2026-01-01T00:00:00Z",
    editedAt: "2026-01-01T00:00:00Z",
    factsChangedAt: null,
    repo: { createdAt: "2016-03-11T02:02:33Z" } as EnrichedTool["repo"],
    release: null,
    releases: [],
    maintainerVerified: false,
    flags: [],
    terms: "open",
    capabilities: {},
    deploy: [],
    ...over,
  };
}

test("age counts only the years that have fully passed", () => {
  assert.equal(fullYearsBetween(new Date("2016-03-11T00:00:00Z"), new Date("2026-03-10T23:00:00Z")), 9);
  assert.equal(fullYearsBetween(new Date("2016-03-11T00:00:00Z"), new Date("2026-03-11T00:00:00Z")), 10);
  assert.equal(fullYearsBetween(new Date("2026-01-01T00:00:00Z"), new Date("2026-09-24T00:00:00Z")), 0);
  assert.deepEqual(vitalityOf(tool(), READ_AT).created, { year: 2016, years: 10 });
});

test("a tool with no platform read from its release has no platform line at all", () => {
  assert.equal(vitalityOf(tool({ platforms: [] }), READ_AT).platforms, null);
  assert.equal(vitalityOf(tool(), READ_AT).platforms, null);
  assert.equal(platformLine([]), null);
});

test("platforms read as operating systems with their architectures", () => {
  assert.equal(
    platformLine([
      { os: "linux", architectures: ["x86_64", "arm64"] },
      { os: "macos", architectures: [] },
      { os: "windows", architectures: ["x86_64"] },
    ]),
    "Linux (x86_64, arm64), macOS, Windows (x86_64)",
  );
});

test("cadence is left out until there are three stable releases", () => {
  const two = [release("v2", "2026-03-01T00:00:00Z"), release("v1", "2026-02-01T00:00:00Z")];
  assert.equal(vitalityOf(tool({ releases: two }), READ_AT).cadenceDays, null);
  assert.equal(vitalityOf(tool({ releases: [...two, release("v0", "2026-01-01T00:00:00Z")] }), READ_AT).cadenceDays, 30);
});

test("contributors are missing on a catalog written before they were counted, and say when they cover a whole monorepo", () => {
  assert.equal(vitalityOf(tool(), READ_AT).contributors, null);
  assert.equal(vitalityOf(tool({ contributors: null }), READ_AT).contributors, null);
  assert.deepEqual(vitalityOf(tool({ contributors: { count: 7, capped: false } }), READ_AT).contributors, {
    count: 7,
    capped: false,
    monorepoPath: null,
  });
  assert.equal(
    vitalityOf(tool({ path: "apps/oxlint", contributors: { count: 50, capped: true } }), READ_AT).contributors?.monorepoPath,
    "apps/oxlint",
  );
});
