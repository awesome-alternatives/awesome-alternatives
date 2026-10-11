import assert from "node:assert/strict";
import { test } from "node:test";

import { categories, categoryGroups, sectionList, sections } from "../src/lib/catalog.ts";
import { sectionPages } from "../src/lib/sections.ts";

const tool = (slug: string, stars: number) => ({ slug, name: slug.toUpperCase(), repo: { stars } }) as never;

test("a section lists its own categories with their three most starred tools, and drops a section with none", () => {
  const sections = {
    development: { name: "Development", description: "D", display: "table" as const },
    games: { name: "Games", description: "G", display: "cards" as const },
  };
  const categories = { lint: { group: "development" }, ide: { group: "development" } };
  const pages = sectionPages(sections, categories, [
    { slug: "lint", label: "lint", tools: [tool("a", 9), tool("b", 8), tool("c", 7), tool("d", 6)] },
    { slug: "ide", label: "ide", tools: [tool("e", 1)] },
  ]);
  assert.deepEqual(
    pages.map((page) => [page.slug, page.tools, page.categories.map((c) => [c.slug, c.count, c.top.map((t) => t.slug)])]),
    [["development", 5, [["lint", 4, ["a", "b", "c"]], ["ide", 1, ["e"]]]]],
  );
});

test("every category with tools sits in a declared section, so no category page loses its place in the browse tree", () => {
  const listed = new Set(sectionList.flatMap((page) => page.categories.map((c) => c.key)));
  for (const group of categoryGroups) {
    assert.ok(categories[group.label]?.group in sections, `${group.label}: ${categories[group.label]?.group}`);
    assert.ok(listed.has(group.label), group.label);
  }
});
