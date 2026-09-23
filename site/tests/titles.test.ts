import assert from "node:assert/strict";
import { test } from "node:test";

import { clashes, metaOf } from "../src/lib/titles.ts";

const page = (path: string, title: string, description: string, noindex = false, lang = "en") => ({
  path,
  lang,
  title,
  description,
  noindex,
});

test("two indexed pages sharing a title or a description are reported with both paths", () => {
  const found = clashes([
    page("/a/", "Same", "One"),
    page("/b/", "Same", "Two"),
    page("/c/", "Other", "Two"),
  ]);
  assert.deepEqual(found, [
    { field: "title", lang: "en", value: "Same", paths: ["/a/", "/b/"] },
    { field: "description", lang: "en", value: "Two", paths: ["/b/", "/c/"] },
  ]);
});

test("the same page in two languages may share a title made only of names", () => {
  assert.deepEqual(clashes([page("/compare/a-vs-b/", "A vs B", "D1"), page("/fr/compare/a-vs-b/", "A vs B", "D2", false, "fr")]), []);
});

test("a page kept out of the index does not count as a duplicate", () => {
  assert.deepEqual(clashes([page("/a/", "Same", "D1"), page("/404.html", "Same", "D2", true)]), []);
});

test("title, description and noindex are read from the built head", () => {
  const html =
    '<html lang="fr"><head><title> Ruff: Rust </title><meta name="description" content="A linter."><meta name="robots" content="noindex"></head>';
  assert.deepEqual(metaOf("/x/", html), { path: "/x/", lang: "fr", title: "Ruff: Rust", description: "A linter.", noindex: true });
});
