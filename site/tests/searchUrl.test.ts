import assert from "node:assert/strict";
import { test } from "node:test";

import { isRefined, readSearchUrl, refined, searchParams } from "../src/lib/searchUrl.ts";

test("a query and its refinement survive a round trip through the address bar", () => {
  const refinement = { category: "release-automation", dropIn: true };
  const round = readSearchUrl(`?${searchParams("webpack but faster", refinement)}`);
  assert.equal(round.q, "webpack but faster");
  assert.deepEqual(round.refinement, refinement);
});

test("an address with no refinement reads as a plain query", () => {
  assert.deepEqual(readSearchUrl("?q=redis"), { q: "redis", refinement: {} });
  assert.deepEqual(readSearchUrl(""), { q: "", refinement: {} });
});

test("an empty or blank category is not a refinement", () => {
  assert.deepEqual(readSearchUrl("?q=redis&category=").refinement, {});
  assert.deepEqual(readSearchUrl("?q=redis&category=%20%20").refinement, {});
});

test("dropIn is only true when it says so, so a stray value does not filter silently", () => {
  assert.equal(readSearchUrl("?dropIn=true").refinement.dropIn, true);
  assert.equal(readSearchUrl("?dropIn=1").refinement.dropIn, undefined);
  assert.equal(readSearchUrl("?dropIn=false").refinement.dropIn, undefined);
});

test("the address carries nothing it does not need", () => {
  assert.equal(searchParams("redis", {}).toString(), "q=redis");
  assert.equal(searchParams("", {}).toString(), "");
  assert.equal(searchParams("redis", { dropIn: false }).toString(), "q=redis");
});

test("a chosen category replaces whatever the query was read as", () => {
  const filters = { replaces: "webpack", category: "javascript-runtime" };
  assert.equal(refined(filters, { category: "javascript-bundler" }).category, "javascript-bundler");
});

test("choosing every category drops the filter rather than sending an empty one", () => {
  const filters = { replaces: "webpack", category: "javascript-bundler" };
  assert.ok(!("category" in refined(filters, {})));
});

test("the query keeps its other filters when a refinement is applied", () => {
  const filters = { replaces: "webpack", language: "Rust" };
  assert.deepEqual(refined(filters, { category: "javascript-bundler" }), {
    replaces: "webpack",
    language: "Rust",
    category: "javascript-bundler",
  });
});

test("an unchecked drop-in overrides what the query implied rather than being ignored", () => {
  assert.ok(!("dropIn" in refined({ replaces: "webpack", dropIn: true }, { dropIn: false })));
  assert.equal(refined({ replaces: "webpack" }, { dropIn: true }).dropIn, true);
});

test("isRefined ignores a refinement that would change nothing", () => {
  assert.equal(isRefined({}), false);
  assert.equal(isRefined({ dropIn: false }), false);
  assert.equal(isRefined({ category: "" }), false);
  assert.equal(isRefined({ category: "release-automation" }), true);
});
