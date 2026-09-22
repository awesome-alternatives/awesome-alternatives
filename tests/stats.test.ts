import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { statsOf } from "../scripts/lib/stats.ts";
import type { EnrichedTool } from "../scripts/lib/types.ts";

function tool(slug: string, category: string, replaces: string[] = []): EnrichedTool {
  return {
    slug,
    category,
    replaces: replaces.map((t) => ({ tool: t, fit: "full" as const })),
  } as unknown as EnrichedTool;
}

describe("statsOf", () => {
  it("counts tools, distinct categories and distinct tools something replaces", () => {
    const stats = statsOf([
      tool("npm", "pm"),
      tool("pnpm", "pm", ["npm"]),
      tool("yarn", "pm", ["npm"]),
      tool("bun", "runtime", ["npm", "nodejs"]),
    ]);
    assert.deepEqual(stats, { tools: 4, categories: 2, targets: 2 });
  });

  it("is all zeros for an empty catalog", () => {
    assert.deepEqual(statsOf([]), { tools: 0, categories: 0, targets: 0 });
  });
});
