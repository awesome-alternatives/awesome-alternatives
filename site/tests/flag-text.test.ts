import assert from "node:assert/strict";
import { test } from "node:test";
import { flagText } from "../src/lib/flags.ts";

test("a young repository's mark carries the day it was created", () => {
  assert.equal(flagText("too-new", "New repository", "2026-10-12T08:30:00Z"), "New repository (2026-10-12)");
});

test("other marks keep their label as it is", () => {
  assert.equal(flagText("no-license", "No licence detected", "2026-10-12T08:30:00Z"), "No licence detected");
});
