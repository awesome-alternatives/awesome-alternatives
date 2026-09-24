import assert from "node:assert/strict";
import { test } from "node:test";

import type { EnrichedTool } from "../../scripts/lib/types.ts";
import { toolMarkdown, type Surroundings } from "../src/lib/markdown.ts";

const around: Surroundings = {
  categoryName: "Python linting and formatting",
  selfHost: false,
  checkedAt: "2026-09-23T03:17:00.000Z",
  migrationNotes: [],
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
    editedAt: "2026-02-01T10:00:00.000Z",
    factsChangedAt: null,
    maintainerVerified: false,
    flags: [],
    terms: "open",
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

test("terms are spelled out, since a bare label means nothing to a reader who has not seen the site", () => {
  assert.match(toolMarkdown(tool({ terms: "open-core" }), around), /- Terms: open core, part of it is under a licence/);
  assert.match(toolMarkdown(tool({ terms: "unknown" }), around), /- Terms: not checked/);
});

test("self-hosting is claimed only for a category of things you run", () => {
  assert.match(toolMarkdown(tool(), { ...around, selfHost: true }), /- Self-hosted: /);
  assert.ok(!toolMarkdown(tool(), around).includes("- Self-hosted:"));
});

test("freshness says when the facts were read and when a person last touched the entry", () => {
  const out = toolMarkdown(tool(), around);
  assert.ok(out.includes("- Read from GitHub: 2026-09-23\n"));
  assert.ok(
    out.includes(
      "- Entry last edited: 2026-02-01, https://github.com/awesome-alternatives/awesome-alternatives/commits/main/data/tools/ruff.yaml",
    ),
  );
});

test("a catalog without a check date leaves that line out rather than inventing one", () => {
  const out = toolMarkdown(tool(), { ...around, checkedAt: null });
  assert.ok(!out.includes("Read from GitHub"));
  assert.match(out, /- Entry last edited: /);
});

test("an official migration guide is linked under the replacement it belongs to", () => {
  const out = toolMarkdown(
    tool({ replaces: [{ tool: "flake8", fit: "full", migration: "https://example.com/from-flake8" }] }),
    around,
  );
  assert.ok(out.includes("  - Official migration guide: https://example.com/from-flake8"));
  assert.ok(!toolMarkdown(tool({ replaces: [{ tool: "black", fit: "full" }] }), around).includes("migration guide"));
});

test("a replacement with a migration page links to it", () => {
  const out = toolMarkdown(tool({ replaces: [{ tool: "flake8", fit: "full" }] }), { ...around, migrationNotes: ["flake8"] });
  assert.ok(out.includes("  - Migration notes: https://awesome-alternatives.com/migrate/flake8/ruff/"));
});
