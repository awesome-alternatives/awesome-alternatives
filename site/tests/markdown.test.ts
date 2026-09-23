import assert from "node:assert/strict";
import { test } from "node:test";

import type { EnrichedTool } from "../../scripts/lib/types.ts";
import { toolMarkdown, type Surroundings } from "../src/lib/markdown.ts";

const around: Surroundings = {
  categoryName: "Python linting and formatting",
  nameOf: (slug) => ({ flake8: "Flake8", black: "Black" })[slug] ?? slug,
  replacedBy: [],
};

function tool(over: Partial<EnrichedTool> = {}, repo: Partial<EnrichedTool["repo"]> = {}): EnrichedTool {
  return {
    slug: "ruff",
    name: "Ruff",
    repository: "https://github.com/astral-sh/ruff",
    category: "python-lint-format",
    replaces: [],
    affiliation: null,
    path: null,
    addedAt: "2026-01-01",
    maintainerVerified: false,
    flags: [],
    release: null,
    releases: [],
    ...over,
    repo: {
      fullName: "astral-sh/ruff",
      description: "A linter.",
      homepage: null,
      language: "Rust",
      license: "MIT",
      stars: 1,
      forks: 0,
      topics: [],
      pushedAt: "2026-09-23T10:00:00Z",
      archived: false,
      fork: false,
      private: false,
      createdAt: "2022-01-01T00:00:00Z",
      ...repo,
    } as EnrichedTool["repo"],
  } as EnrichedTool;
}

test("a replacement carries the fit and the note that explains it", () => {
  const out = toolMarkdown(
    tool({ replaces: [{ tool: "flake8", fit: "full", note: "Reimplements its plugins." }] }),
    around,
  );
  assert.match(out, /- Flake8 \(full\): Reimplements its plugins\./);
});

test("a replacement with no note says so rather than trailing a bare colon", () => {
  const out = toolMarkdown(tool({ replaces: [{ tool: "black", fit: "drop-in" }] }), around);
  assert.match(out, /- Black \(drop-in\): no note/);
  assert.ok(!out.includes("(drop-in): \n"));
});

test("a tool others replace points at their markdown, so an agent can walk the graph", () => {
  const out = toolMarkdown(tool(), { ...around, replacedBy: [{ slug: "rspack", name: "Rspack" }] });
  assert.match(out, /## Replaced by/);
  assert.match(out, /- Rspack: https:\/\/awesome-alternatives\.com\/tools\/rspack\.md/);
});

test("an archived repository says so, since that is why someone is reading this", () => {
  assert.match(toolMarkdown(tool({}, { archived: true }), around), /- Archived: /);
  assert.ok(!toolMarkdown(tool(), around).includes("- Archived:"));
});

test("a missing language, licence or release reads as absent rather than as a null", () => {
  const out = toolMarkdown(tool({ release: null }, { language: null, license: null }), around);
  assert.match(out, /- Language: not detected/);
  assert.match(out, /- Licence: not detected/);
  assert.match(out, /- Latest release: none/);
  assert.ok(!out.includes("null") && !out.includes("undefined"));
});

test("a signed release is distinguished from an unsigned one", () => {
  const release = { tag: "1.0.0", publishedAt: null, url: "https://example.com/r", source: "release" as const };
  assert.match(toolMarkdown(tool({ release: { ...release, signed: true } }), around), /1\.0\.0, signed/);
  assert.match(toolMarkdown(tool({ release: { ...release, signed: false } }), around), /1\.0\.0, unsigned/);
});

test("affiliation is printed when the entry declares one and omitted otherwise", () => {
  const declared = toolMarkdown(tool({ affiliation: "Maintained by FerrLabs." }), around);
  assert.match(declared, /## Affiliation\n\nMaintained by FerrLabs\./);
  assert.ok(!toolMarkdown(tool(), around).includes("## Affiliation"));
});

test("verification and warnings surface only when they are true", () => {
  assert.match(toolMarkdown(tool({ maintainerVerified: true }), around), /- Verified: /);
  assert.match(toolMarkdown(tool({ flags: ["inactive"] }), around), /- Warnings: inactive/);
  const plain = toolMarkdown(tool(), around);
  assert.ok(!plain.includes("- Verified:") && !plain.includes("- Warnings:"));
});

test("the last push is a date, not a timestamp nobody asked for", () => {
  assert.match(toolMarkdown(tool(), around), /- Last push: 2026-09-23\n/);
});
