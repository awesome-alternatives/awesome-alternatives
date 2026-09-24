import type { StarPoint, TrendFacts } from "./types.ts";

export const TREND_WINDOW_DAYS = 30;

const DAY_MS = 24 * 60 * 60 * 1000;

export function trendOf(history: readonly StarPoint[], stars: number, now: Date): TrendFacts | null {
  const start = now.getTime() - TREND_WINDOW_DAYS * DAY_MS;
  const points = [...history].sort((a, b) => a.at.localeCompare(b.at));
  const covering = points.filter((p) => Date.parse(p.at) <= start).at(-1);
  const baseline = covering ?? points[0];
  if (!baseline) return null;
  return {
    stars: Math.max(0, stars - baseline.stars),
    exact: covering !== undefined,
    since: new Date(Math.max(Date.parse(baseline.at), start)).toISOString(),
  };
}
