import assert from "node:assert/strict";
import { test } from "node:test";

import { lastModified } from "../src/lib/freshness.ts";
import { lastmodByPath } from "../src/lib/sitemap.ts";

const edited = "2026-05-01T00:00:00.000Z";
const base = { slug: "ruff", editedAt: edited, factsChangedAt: null, release: { publishedAt: "2026-03-01T00:00:00Z" } };

test("with nothing newer, a tool page was last modified when its entry was edited", () => {
  assert.equal(lastModified(base), edited);
});

test("a star-only change leaves lastmod alone, since stars are not among its inputs", () => {
  const starred = { ...base, repo: { stars: 99_999 } };
  assert.equal(lastModified(starred), lastModified(base));
});

test("a new release moves lastmod forward", () => {
  const released = { ...base, release: { publishedAt: "2026-09-20T12:00:00Z" } };
  assert.equal(lastModified(released), "2026-09-20T12:00:00Z");
});

test("a licence or archive change seen by the refresh moves it too", () => {
  assert.equal(lastModified({ ...base, factsChangedAt: "2026-08-01T03:00:00.000Z" }), "2026-08-01T03:00:00.000Z");
});

test("a tag without a publication date does not count", () => {
  assert.equal(lastModified({ ...base, release: { publishedAt: null } }), edited);
});

test("every locale of a tool page carries the same lastmod", () => {
  const lastmods = lastmodByPath([base]);
  assert.equal(lastmods.get("/tools/ruff/"), edited);
  assert.equal(lastmods.get("/fr/tools/ruff/"), edited);
  assert.equal(lastmods.get("/alternatives/ruff/"), undefined);
});
