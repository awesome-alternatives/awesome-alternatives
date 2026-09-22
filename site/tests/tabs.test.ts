import assert from "node:assert/strict";
import { test } from "node:test";

import { scoreLevel, tabFromHash, tabsFor } from "../src/lib/tabs.ts";

test("the hash selects a tab only when the page has it", () => {
  const available = ["readme", "releases", "security"] as const;
  assert.equal(tabFromHash("#security", available), "security");
  assert.equal(tabFromHash("#Releases", available), "releases");
  assert.equal(tabFromHash("#alternatives", available), "readme");
  assert.equal(tabFromHash("", available), "readme");
  assert.equal(tabFromHash("#constructor", available), "readme");
});

test("a tool others replace opens on its alternatives, one that replaces opens on the README", () => {
  assert.equal(tabsFor({ alternatives: 7, replaces: 0 })[0], "alternatives");
  assert.equal(tabsFor({ alternatives: 7, replaces: 2 })[0], "alternatives");
  assert.equal(tabsFor({ alternatives: 0, replaces: 2 })[0], "readme");
  assert.equal(tabsFor({ alternatives: 0, replaces: 0 })[0], "readme");
});

test("a tab with nothing in it is left out rather than rendered empty", () => {
  assert.deepEqual(tabsFor({ alternatives: 0, replaces: 0 }), ["readme", "releases", "security"]);
  assert.deepEqual(tabsFor({ alternatives: 3, replaces: 1 }), [
    "alternatives",
    "readme",
    "releases",
    "security",
    "replaces",
  ]);
});

test("the hash still wins over the tab the page opens on", () => {
  const available = tabsFor({ alternatives: 4, replaces: 0 });
  assert.equal(tabFromHash("#security", available), "security");
  assert.equal(tabFromHash("", available), "alternatives");
  assert.equal(tabFromHash("#replaces", available), "alternatives");
});

test("scorecard levels follow the 0 to 10 scale, with n/a apart", () => {
  assert.equal(scoreLevel(10), "good");
  assert.equal(scoreLevel(7), "good");
  assert.equal(scoreLevel(6.9), "fair");
  assert.equal(scoreLevel(4), "fair");
  assert.equal(scoreLevel(0), "poor");
  assert.equal(scoreLevel(null), "none");
});
