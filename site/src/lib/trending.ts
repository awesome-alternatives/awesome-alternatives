import type { TrendFacts } from "../../../scripts/lib/types.ts";
import type { ToolView } from "./types.ts";

export const TRENDING_SLOTS = 6;

export interface Trending<T extends ToolView> {
  tool: T;
  trend: TrendFacts;
}

export function trending<T extends ToolView>(tools: readonly T[], slots: number = TRENDING_SLOTS): Trending<T>[] {
  return tools
    .flatMap((tool) =>
      tool.trend && tool.trend.stars > 0 && tool.replaces.length > 0 && !tool.repo.archived
        ? [{ tool, trend: tool.trend }]
        : [],
    )
    .sort(
      (a, b) =>
        b.trend.stars - a.trend.stars ||
        Date.parse(b.trend.since) - Date.parse(a.trend.since) ||
        a.tool.slug.localeCompare(b.tool.slug),
    )
    .slice(0, slots);
}
