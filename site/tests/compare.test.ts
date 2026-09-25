import assert from "node:assert/strict";
import { test } from "node:test";

import type { ReleaseEntry, Replacement } from "../../scripts/lib/types.ts";
import { cadenceDays } from "../src/lib/cadence.ts";
import { comparableWith, comparePairs, comparePath, pairForTool, pairSlug } from "../src/lib/compare.ts";

interface Fixture {
  slug: string;
  replaces: Replacement[];
  repo: { archived: boolean; stars: number };
}

function tool(slug: string, replaces: Replacement[], stars = 0, archived = false): Fixture {
  return { slug, replaces, repo: { archived, stars } };
}

const replacement = (target: string, note?: string): Replacement => ({
  tool: target,
  fit: "partial",
  ...(note === undefined ? {} : { note }),
});

const release = (tag: string, publishedAt: string | null, prerelease = false): ReleaseEntry => ({
  tag,
  name: null,
  publishedAt,
  url: `https://example.com/${tag}`,
  prerelease,
});

test("an edge with a note produces one page", () => {
  const pairs = comparePairs([
    tool("ferrflow", [replacement("semantic-release", "Rust workspaces only.")]),
    tool("semantic-release", []),
  ]);
  assert.deepEqual(
    pairs.map((pair) => pair.slug),
    ["ferrflow-vs-semantic-release"],
  );
  assert.deepEqual(pairs[0].edges, [
    { from: "ferrflow", to: "semantic-release", fit: "partial", note: "Rust workspaces only." },
  ]);
});

test("a shared target with a note on either side produces one page", () => {
  const pairs = comparePairs([
    tool("ferrflow", [replacement("semantic-release", "Rust workspaces only.")]),
    tool("cocogitto", [replacement("semantic-release")]),
  ]);
  assert.deepEqual(
    pairs.map((pair) => pair.slug),
    ["cocogitto-vs-ferrflow"],
  );
  assert.deepEqual(pairs[0].shared, [
    {
      target: "semantic-release",
      a: { fit: "partial", note: null },
      b: { fit: "partial", note: "Rust workspaces only." },
    },
  ]);
});

test("a pair whose relations carry no note produces nothing, being a thin copy of the alternatives page", () => {
  const pairs = comparePairs([
    tool("ferrflow", [replacement("semantic-release")]),
    tool("cocogitto", [replacement("semantic-release")]),
  ]);
  assert.deepEqual(pairs, []);
});

test("two tools with no edge and no shared target produce nothing", () => {
  const pairs = comparePairs([
    tool("ferrflow", [replacement("semantic-release", "Rust workspaces only.")]),
    tool("ferrvault", [replacement("vault", "Fork of the last MPL release.")]),
  ]);
  assert.deepEqual(pairs, []);
});

test("an archived repository is left out, whichever side of the pair it sits on", () => {
  const pairs = comparePairs([
    tool("ferrflow", [replacement("semantic-release", "Rust workspaces only.")], 900),
    tool("retired", [replacement("semantic-release", "No longer maintained.")], 10, true),
  ]);
  assert.deepEqual(pairs, []);
});

test("the pair order is alphabetical, so a pair has one page and never its mirror", () => {
  assert.equal(pairSlug("kitty", "alacritty"), "alacritty-vs-kitty");
  assert.equal(pairSlug("alacritty", "kitty"), pairSlug("kitty", "alacritty"));
  assert.equal(comparePath("kitty", "alacritty"), "/compare/alacritty-vs-kitty/");

  const forward = comparePairs([
    tool("kitty", [replacement("iterm2", "Tabs and splits of its own.")]),
    tool("alacritty", [replacement("iterm2", "No tabs or splits of its own.")]),
  ]);
  const reversed = comparePairs([
    tool("alacritty", [replacement("iterm2", "No tabs or splits of its own.")]),
    tool("kitty", [replacement("iterm2", "Tabs and splits of its own.")]),
  ]);
  assert.deepEqual(forward, reversed);
  assert.deepEqual(
    forward.map((pair) => pair.slug),
    ["alacritty-vs-kitty"],
  );
  assert.deepEqual(
    forward.map((pair) => [pair.a.slug, pair.b.slug]),
    [["alacritty", "kitty"]],
  );
});

test("a pair that is both an edge and a shared target is still one page, carrying both relations", () => {
  const pairs = comparePairs([
    tool("cocogitto", [replacement("semantic-release", "Conventional commits only."), replacement("ferrflow")]),
    tool("ferrflow", [replacement("semantic-release", "Rust workspaces only.")]),
  ]);
  assert.equal(pairs.length, 1);
  assert.equal(pairs[0].edges.length, 1);
  assert.equal(pairs[0].shared.length, 1);
});

test("a target names every alternative it can be compared against", () => {
  const pairs = comparePairs([
    tool("big", [replacement("sr", "Covers the whole job.")], 9000),
    tool("medium", [replacement("sr", "Covers part of it.")], 500),
    tool("sr", [], 20_000),
  ]);
  assert.deepEqual(comparableWith(pairs, "sr").sort(), ["big", "medium"]);
});

test("an alternative with no reviewed note has no page to offer, so it is left out", () => {
  const pairs = comparePairs([
    tool("noted", [replacement("sr", "Covers part of it.")], 500),
    tool("bare", [replacement("sr")], 500),
    tool("sr", [], 20_000),
  ]);
  assert.deepEqual(comparableWith(pairs, "sr"), ["noted"]);
});

test("a target nothing is paired with names nobody rather than throwing", () => {
  assert.deepEqual(comparableWith(comparePairs([]), "vault"), []);
});

test("a tool page offers a tool it has an edge with before one it merely shares a target with", () => {
  const pairs = comparePairs([
    tool("ferrflow", [replacement("semantic-release", "Rust workspaces only.")], 900),
    tool("cocogitto", [replacement("semantic-release", "Conventional commits only.")], 50_000),
    tool("semantic-release", [], 20_000),
  ]);
  assert.equal(pairForTool(pairs, "ferrflow")?.slug, "ferrflow-vs-semantic-release");
  assert.equal(pairForTool(pairs, "unlisted"), null);
});

test("release cadence is the median gap between stable releases", () => {
  assert.equal(
    cadenceDays([
      release("v3", "2026-04-01T00:00:00Z"),
      release("v2", "2026-03-01T00:00:00Z"),
      release("v1", "2026-01-01T00:00:00Z"),
    ]),
    45,
  );
});

test("release cadence ignores pre-releases and undated tags", () => {
  assert.equal(
    cadenceDays([
      release("v3", "2026-03-29T00:00:00Z"),
      release("v2", "2026-03-01T00:00:00Z"),
      release("v2-rc1", "2026-02-28T00:00:00Z", true),
      release("v1", "2026-02-01T00:00:00Z"),
      release("v0", null),
    ]),
    28,
  );
});

test("release cadence needs three stable releases, since one gap is not a rhythm", () => {
  const two = [release("v2", "2026-03-01T00:00:00Z"), release("v1", "2026-02-01T00:00:00Z")];
  assert.equal(cadenceDays(two), null);
  assert.equal(cadenceDays([...two, release("v1-rc1", "2026-01-20T00:00:00Z", true)]), null);
  assert.equal(cadenceDays([...two, release("v0", "2026-01-01T00:00:00Z")]), 30);
  assert.equal(cadenceDays([]), null);
});
