import assert from "node:assert/strict";
import { test } from "node:test";

import { badge, message } from "../src/lib/badge.ts";
import type { Fit, ToolView } from "../src/lib/types.ts";

const nameOf = (slug: string) => ({ "semantic-release": "semantic-release", flake8: "Flake8", black: "Black" })[slug] ?? slug;

function tool(replaces: [string, Fit][] = [], maintainerVerified = false): ToolView {
  return {
    slug: "ferrflow",
    name: "FerrFlow",
    category: "release-automation",
    repository: "https://github.com/FerrLabs/FerrFlow",
    maintainerVerified,
    flags: [],
    replaces: replaces.map(([target, fit]) => ({ tool: target, fit })),
    repo: {
      fullName: "FerrLabs/FerrFlow",
      description: null,
      homepage: null,
      language: "Rust",
      license: "MIT",
      stars: 1,
      forks: 0,
      topics: [],
      pushedAt: "2026-09-22",
      archived: false,
    },
    release: null,
  } as unknown as ToolView;
}

test("a tool that replaces something says what it replaces", () => {
  assert.equal(message(tool([["semantic-release", "full"]]), nameOf, 0), "alternative to semantic-release");
});

test("a tool that replaces several names them all, so the badge does not undersell it", () => {
  assert.equal(
    message(tool([["flake8", "full"], ["black", "full"]]), nameOf, 0),
    "alternative to Flake8, Black",
  );
});

test("a tool nothing replaces but that others replace counts its alternatives", () => {
  assert.equal(message(tool([], false), nameOf, 7), "7 alternatives");
});

test("a single alternative is not pluralised", () => {
  assert.equal(message(tool([], false), nameOf, 1), "1 alternative");
});

test("what it replaces wins over how many replace it, since that is what a maintainer shows", () => {
  assert.equal(message(tool([["semantic-release", "full"]]), nameOf, 7), "alternative to semantic-release");
});

test("a tool at neither end of a replacement still gets a message", () => {
  assert.equal(message(tool([], false), nameOf, 0), "listed");
});

test("verification is the only thing that changes the colour", () => {
  const listed = badge(tool([["semantic-release", "full"]], false), nameOf, 0);
  const verified = badge(tool([["semantic-release", "full"]], true), nameOf, 0);
  assert.notEqual(listed.color, verified.color);
  assert.equal(listed.message, verified.message);
  assert.equal(listed.label, verified.label);
});

test("the payload is the shields endpoint schema", () => {
  const payload = badge(tool([["semantic-release", "full"]]), nameOf, 0);
  assert.equal(payload.schemaVersion, 1);
  assert.equal(payload.label, "awesome-alternatives");
  assert.match(payload.color, /^[0-9a-f]{6}$/);
  assert.match(payload.labelColor, /^[0-9a-f]{6}$/);
  assert.ok(payload.cacheSeconds >= 300);
});
