import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { test } from "node:test";

import { badgeStats } from "../src/lib/stats.ts";

test("the numbers the README badges read match the stats published with the catalog", () => {
  const published = JSON.parse(readFileSync(resolve(process.cwd(), "../generated/catalog.json"), "utf8")).stats;
  assert.deepEqual(badgeStats(), {
    tools: published.tools,
    categories: published.categories,
    targets: published.targets,
    verified: published.verified,
  });
});
