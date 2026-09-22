import assert from "node:assert/strict";
import { test } from "node:test";

import { scoreLevel, tabFromHash } from "../src/lib/tabs.ts";

test("the hash selects a tab only when the page has it", () => {
  const available = ["readme", "releases", "security"] as const;
  assert.equal(tabFromHash("#security", available), "security");
  assert.equal(tabFromHash("#Releases", available), "releases");
  assert.equal(tabFromHash("#alternatives", available), "readme");
  assert.equal(tabFromHash("", available), "readme");
  assert.equal(tabFromHash("#constructor", available), "readme");
});

test("scorecard levels follow the 0 to 10 scale, with n/a apart", () => {
  assert.equal(scoreLevel(10), "good");
  assert.equal(scoreLevel(7), "good");
  assert.equal(scoreLevel(6.9), "fair");
  assert.equal(scoreLevel(4), "fair");
  assert.equal(scoreLevel(0), "poor");
  assert.equal(scoreLevel(null), "none");
});
