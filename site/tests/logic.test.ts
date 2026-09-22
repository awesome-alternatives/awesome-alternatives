import assert from "node:assert/strict";
import { test } from "node:test";

import { toQuery } from "../src/lib/query.ts";
import { chips, without } from "../src/lib/chips.ts";
import { alternativesTo, facets, narrow } from "../src/lib/filter.ts";
import { stars } from "../src/lib/format.ts";
import type { Fit, ToolView } from "../src/lib/types.ts";

function tool(slug: string, language: string | null, replaces: [string, Fit][], starCount = 0): ToolView {
  return {
    slug,
    name: slug,
    repository: `https://github.com/example/${slug}`,
    category: "release-automation",
    replaces: replaces.map(([t, fit]) => ({ tool: t, fit })),
    affiliation: null,
    repo: {
      fullName: `example/${slug}`,
      description: null,
      homepage: null,
      language,
      license: "MIT",
      stars: starCount,
      pushedAt: "2026-09-01T00:00:00Z",
      archived: false,
    },
    release: null,
    maintainerVerified: false,
    flags: [],
  };
}

test("alternatives rank by fit, then stars, and skip archived and unrelated tools", () => {
  const archived = tool("archived", "Rust", [["sr", "drop-in"]], 99);
  archived.repo.archived = true;
  const tools = [
    tool("partial", "Go", [["sr", "partial"]], 5000),
    tool("full-small", "Rust", [["sr", "full"]], 1),
    tool("full-big", "Rust", [["sr", "full"]], 50),
    tool("other", "Rust", [["x", "drop-in"]], 1),
    archived,
  ];
  assert.deepEqual(
    alternativesTo(tools, "sr").map((t) => t.slug),
    ["full-big", "full-small", "partial"],
  );
});

test("narrow combines language and fit for the page's target", () => {
  const tools = [tool("a", "Rust", [["sr", "full"]]), tool("b", "Rust", [["sr", "partial"]]), tool("c", "Go", [["sr", "full"]])];
  const shown = narrow(tools, "sr", { language: "Rust", license: null, fit: "full" });
  assert.deepEqual(
    shown.map((t) => t.slug),
    ["a"],
  );
});

test("facets count values, ignore unknowns and sort by count then name", () => {
  assert.deepEqual(facets(["Rust", null, "Go", "Rust", "C"]), [
    { value: "Rust", count: 2 },
    { value: "C", count: 1 },
    { value: "Go", count: 1 },
  ]);
});

test("removing the target chip also drops drop-in, which means nothing without it", () => {
  const filters = { replaces: "sr", dropIn: true, language: "Rust" };
  assert.deepEqual(without(filters, "replaces"), { language: "Rust" });
  assert.deepEqual(without(filters, "dropIn"), { replaces: "sr", language: "Rust" });
});

test("chips name the target and list every filter read from the query", () => {
  const read = chips({ replaces: "sr", dropIn: true, license: "MIT" }, () => "semantic-release");
  assert.deepEqual(
    read.map((c) => c.label),
    ["Replaces semantic-release", "Drop-in only", "MIT"],
  );
  assert.deepEqual(chips({}), []);
});

test("the tools query omits unset filters and a false drop-in", () => {
  assert.equal(toQuery({ replaces: "sr", dropIn: false, language: "C++" }), "replaces=sr&language=C%2B%2B");
  assert.equal(toQuery({ replaces: "sr", dropIn: true }), "replaces=sr&dropIn=true");
});

test("star counts shorten past a thousand", () => {
  assert.equal(stars(999), "999");
  assert.equal(stars(1000), "1k");
  assert.equal(stars(1193), "1.2k");
  assert.equal(stars(23456), "23k");
});
