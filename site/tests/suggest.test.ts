import assert from "node:assert/strict";
import { test } from "node:test";

import { href, normalise, suggest, type SuggestIndex } from "../src/lib/suggest.ts";

const alternativesTo = (name: string) => `alternatives to ${name}`;

const index: SuggestIndex = {
  tools: [
    { slug: "webpack", name: "webpack", category: "JavaScript bundlers" },
    { slug: "esbuild", name: "esbuild", category: "JavaScript bundlers" },
    { slug: "rspack", name: "Rspack", category: "JavaScript bundlers" },
    { slug: "ruff", name: "Ruff", category: "Python linting and formatting" },
    { slug: "cocogitto", name: "Cocogitto", category: "Release automation" },
  ],
  targets: ["webpack"],
};

const names = (query: string) => suggest(index, query, alternativesTo).map((s) => s.name);

test("normalise folds case, accents and punctuation so a French query matches", () => {
  assert.equal(normalise("Générateur de Changelog"), "generateur de changelog");
  assert.equal(normalise("  Rspack!  "), "rspack");
});

test("a name that starts with the query comes before one that merely contains it", () => {
  assert.deepEqual(names("pack"), ["Rspack", "alternatives to webpack"]);
});

test("a tool others replace offers its alternatives page rather than its own", () => {
  const [first] = suggest(index, "webpack", alternativesTo);
  assert.equal(first.kind, "target");
  assert.equal(first.name, "alternatives to webpack");
  assert.equal(href(first), "/alternatives/webpack/");
});

test("a tool nothing replaces offers its own page", () => {
  const [first] = suggest(index, "cocogitto", alternativesTo);
  assert.equal(first.kind, "tool");
  assert.equal(href(first), "/tools/cocogitto/");
});

test("the category is matched too, so a job finds the tools that do it", () => {
  assert.deepEqual(names("python linting"), ["Ruff"]);
});

test("a name match outranks a category match", () => {
  assert.deepEqual(names("bundler"), ["esbuild", "Rspack", "alternatives to webpack"]);
  assert.deepEqual(names("esbuild"), ["esbuild"]);
});

test("an empty or punctuation-only query suggests nothing rather than everything", () => {
  assert.deepEqual(names(""), []);
  assert.deepEqual(names("   "), []);
  assert.deepEqual(names("!!!"), []);
});

test("a query matching nothing returns nothing rather than a stale list", () => {
  assert.deepEqual(names("kubernetes"), []);
});

test("the list is capped, so the dropdown cannot grow without end", () => {
  assert.equal(suggest(index, "a", alternativesTo, 2).length, 2);
});
