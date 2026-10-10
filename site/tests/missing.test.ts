import assert from "node:assert/strict";
import { test } from "node:test";

import { closest, missingTerms } from "../src/lib/missing.ts";
import type { SuggestIndex } from "../src/lib/suggest.ts";

const index: SuggestIndex = {
  tools: [
    { slug: "wordpress", name: "WordPress", category: "Content management" },
    { slug: "ghost", name: "Ghost", category: "Content management" },
    { slug: "ferrflow", name: "FerrFlow", category: "Release automation" },
    { slug: "semantic-release", name: "semantic-release", category: "Release automation" },
    { slug: "go", name: "Go", category: "Languages" },
  ],
  targets: ["wordpress"],
};

const alternativesTo = (name: string) => `alternatives to ${name}`;
const names = (...terms: string[]) => closest(index, terms, alternativesTo).map((s) => s.name);

test("a tool, alternatives or comparison path yields the slugs to look for", () => {
  assert.deepEqual(missingTerms("/tools/wordpres/"), ["wordpres"]);
  assert.deepEqual(missingTerms("/fr/alternatives/semantic-releas/"), ["semantic-releas"]);
  assert.deepEqual(missingTerms("/compare/kitty-vs-alacrity/"), ["kitty", "alacrity"]);
  assert.deepEqual(missingTerms("/tools/foo.md"), ["foo"]);
});

test("any other path yields nothing, so the page shows no suggestion block", () => {
  assert.deepEqual(missingTerms("/this-does-not-exist/"), []);
  assert.deepEqual(missingTerms("/fr/outils/inconnu/"), []);
  assert.deepEqual(missingTerms("/tools/"), []);
  assert.deepEqual(missingTerms("/categories/tools/x/"), []);
});

test("a malformed escape falls back to the raw segment instead of throwing", () => {
  assert.deepEqual(missingTerms("/tools/%E0%A4%A/"), ["%E0%A4%A"]);
});

test("a typo finds the tool and a tool others replace offers its alternatives page", () => {
  const [first] = closest(index, ["wordpess"], alternativesTo);
  assert.equal(first.kind, "target");
  assert.equal(first.name, "alternatives to WordPress");
});

test("a renamed tool still finds the shorter name it grew from", () => {
  assert.deepEqual(names("ferrflow-cli"), ["FerrFlow"]);
});

test("a two letter name does not match everything that starts with it", () => {
  assert.deepEqual(names("gopher"), []);
});

test("an exact slug outranks a near one", () => {
  assert.deepEqual(names("ghost", "ghosts"), ["Ghost"]);
});

test("a comparison offers the closest entries for both sides", () => {
  assert.deepEqual(names("ferflow", "gost"), ["FerrFlow", "Ghost"]);
});

test("nothing close returns nothing rather than a stale list", () => {
  assert.deepEqual(names("kubernetes"), []);
  assert.deepEqual(names(""), []);
});

test("the list is capped", () => {
  assert.equal(closest(index, ["release"], alternativesTo, 1).length, 1);
});
