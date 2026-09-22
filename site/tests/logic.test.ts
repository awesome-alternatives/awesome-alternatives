import assert from "node:assert/strict";
import { test } from "node:test";

import { islands } from "../src/i18n/islands.en.ts";
import { toQuery } from "../src/lib/query.ts";
import { chips, without } from "../src/lib/chips.ts";
import { alternativesTo, facets, narrow } from "../src/lib/filter.ts";
import { stars } from "../src/lib/format.ts";
import { groupTools } from "../src/lib/groups.ts";
import { TRENDING_SLOTS, trending } from "../src/lib/trending.ts";
import { slugify } from "../src/lib/slug.ts";
import type { Fit, ToolView } from "../src/lib/types.ts";

function trendingTool(slug: string, trend: ToolView["trend"], starCount = 100): ToolView {
  return { ...tool(slug, "Rust", [["sr", "full"]], starCount), trend };
}

const gained = (stars: number, since: string, exact = true) => ({ stars, exact, since });

function tool(slug: string, language: string | null, replaces: [string, Fit][], starCount = 0): ToolView {
  return {
    slug,
    name: slug,
    repository: `https://github.com/example/${slug}`,
    category: "release-automation",
    replaces: replaces.map(([t, fit]) => ({ tool: t, fit })),
    affiliation: null,
    path: null,
    repo: {
      fullName: `example/${slug}`,
      description: null,
      homepage: null,
      language,
      license: "MIT",
      stars: starCount,
      forks: 0,
      topics: [],
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
  const read = chips({ replaces: "sr", dropIn: true, license: "MIT" }, islands.search.chips, () => "semantic-release");
  assert.deepEqual(
    read.map((c) => c.label),
    ["Replaces semantic-release", "Drop-in only", "MIT"],
  );
  assert.deepEqual(chips({}, islands.search.chips), []);
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

test("slugs keep SPDX dots and spell out the symbols that tell languages apart", () => {
  assert.equal(slugify("Apache-2.0"), "apache-2.0");
  assert.equal(slugify("BSD-3-Clause"), "bsd-3-clause");
  assert.equal(slugify("Other"), "other");
  assert.equal(slugify("C++"), "c-plus-plus");
  assert.equal(slugify("C#"), "c-sharp");
  assert.equal(slugify("C"), "c");
  assert.equal(slugify("F#"), "f-sharp");
  assert.equal(slugify("Jupyter Notebook"), "jupyter-notebook");
  assert.equal(slugify("Vim Script"), "vim-script");
  assert.equal(slugify("Objective-C++"), "objective-c-plus-plus");
});

test("groups skip missing values, rank tools by stars and groups by size", () => {
  const groups = groupTools(
    [tool("a", "Go", [], 1), tool("b", "Rust", [], 5), tool("c", null, []), tool("d", "Rust", [], 9)],
    (t) => t.repo.language,
  );
  assert.deepEqual(
    groups.map((g) => [g.slug, g.label, g.tools.map((t) => t.slug)]),
    [
      ["rust", "Rust", ["d", "b"]],
      ["go", "Go", ["a"]],
    ],
  );
});

test("two values that slugify alike fail the build instead of sharing a page", () => {
  assert.throws(() => groupTools([tool("a", "Vim Script", []), tool("b", "Vim script", [])], (t) => t.repo.language), /vim-script/);
});

test("trending ranks on stars gained, then on how fast they came, then on the slug", () => {
  const ranked = trending([
    trendingTool("slow", gained(40, "2026-08-25T00:00:00Z")),
    trendingTool("fast", gained(200, "2026-09-18T00:00:00Z", false)),
    trendingTool("steady", gained(200, "2026-09-02T00:00:00Z", false)),
    trendingTool("b-tie", gained(40, "2026-08-25T00:00:00Z")),
  ]);
  assert.deepEqual(
    ranked.map((t) => t.tool.slug),
    ["fast", "steady", "b-tie", "slow"],
  );
});

test("trending leaves out a tool with no measurement rather than ranking it last", () => {
  const ranked = trending([
    trendingTool("unmeasured", null, 90_000),
    trendingTool("missing-field", undefined, 80_000),
    trendingTool("measured", gained(3, "2026-07-01T00:00:00Z")),
    trendingTool("flat", gained(0, "2026-01-01T00:00:00Z")),
  ]);
  assert.deepEqual(
    ranked.map((t) => t.tool.slug),
    ["measured"],
  );
});

test("trending leaves out a tool that replaces nothing, since the section lists alternatives", () => {
  const target = { ...tool("target", "Rust", [], 900), trend: gained(500, "2026-09-15T00:00:00Z") };
  const ranked = trending([target, trendingTool("alternative", gained(5, "2026-08-01T00:00:00Z"))]);
  assert.deepEqual(
    ranked.map((t) => t.tool.slug),
    ["alternative"],
  );
});

test("trending skips an archived repository, like the rest of the catalog", () => {
  const archived = trendingTool("archived", gained(900, "2026-09-10T00:00:00Z"));
  archived.repo.archived = true;
  const ranked = trending([archived, trendingTool("live", gained(5, "2026-08-01T00:00:00Z"))]);
  assert.deepEqual(
    ranked.map((t) => t.tool.slug),
    ["live"],
  );
});

test("trending shows what it has when fewer tools qualify than there are slots", () => {
  const two = [trendingTool("a", gained(9, "2026-09-01T00:00:00Z")), trendingTool("b", gained(4, "2026-09-01T00:00:00Z"))];
  assert.equal(trending(two).length, 2);
  assert.equal(trending([]).length, 0);
  const many = Array.from({ length: TRENDING_SLOTS + 3 }, (_, i) =>
    trendingTool(`t${i}`, gained(TRENDING_SLOTS + 3 - i, "2026-09-01T00:00:00Z")),
  );
  assert.equal(trending(many).length, TRENDING_SLOTS);
});
