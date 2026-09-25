import { TREND_WINDOW_DAYS } from "../../../scripts/lib/trending.ts";
import type { TrendFacts } from "../../../scripts/lib/types.ts";
import type { ToolView } from "./types.ts";

export const TRENDING_SLOTS = 6;

const DAY_MS = 24 * 60 * 60 * 1000;

export interface Boost {
  stars: number;
  days: number;
  growth: number | null;
}

export function boostOf(trend: TrendFacts, stars: number, checkedAt: string): Boost {
  const elapsed = Math.round((Date.parse(checkedAt) - Date.parse(trend.since)) / DAY_MS);
  const before = stars - trend.stars;
  return {
    stars: trend.stars,
    days: Math.min(TREND_WINDOW_DAYS, Math.max(1, elapsed)),
    growth: before > 0 ? trend.stars / before : null,
  };
}

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
