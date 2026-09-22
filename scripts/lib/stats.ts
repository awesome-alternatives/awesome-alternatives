import type { CatalogStats, EnrichedTool } from "./types.ts";

export function statsOf(tools: readonly EnrichedTool[]): CatalogStats {
  return {
    tools: tools.length,
    categories: new Set(tools.map((t) => t.category)).size,
    targets: new Set(tools.flatMap((t) => t.replaces.map((r) => r.tool))).size,
  };
}
