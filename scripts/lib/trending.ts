import type { TrendFacts } from "./types.ts";

export const TREND_WINDOW_DAYS = 30;

const DAY_MS = 24 * 60 * 60 * 1000;

export function trendOf(starredAt: readonly string[], stars: number, now: Date): TrendFacts | null {
  const times = starredAt
    .map((t) => Date.parse(t))
    .filter((t) => !Number.isNaN(t))
    .sort((a, b) => a - b);
  const oldest = times[0];
  if (oldest === undefined) return null;

  const start = now.getTime() - TREND_WINDOW_DAYS * DAY_MS;
  return {
    stars: times.filter((t) => t >= start).length,
    exact: oldest < start || times.length >= stars,
    since: new Date(oldest).toISOString(),
  };
}
