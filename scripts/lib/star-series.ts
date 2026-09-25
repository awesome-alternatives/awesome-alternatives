import { HISTORY_DAYS } from "./history.ts";
import type { StarHistory, StarPoint } from "./types.ts";

const DAY_MS = 24 * 60 * 60 * 1000;

type DayCounts = Map<string, number>;

function dayOf(instant: Date | string): string {
  return new Date(instant).toISOString().slice(0, 10);
}

function addDays(day: string, days: number): string {
  return dayOf(new Date(Date.parse(`${day}T00:00:00.000Z`) + days * DAY_MS));
}

function observedDays(points: readonly StarPoint[]): DayCounts {
  const days: DayCounts = new Map();
  for (const point of [...points].sort((a, b) => a.at.localeCompare(b.at))) days.set(dayOf(point.at), point.stars);
  return days;
}

function daysOf(series: StarHistory | undefined): DayCounts {
  if (!series) return new Map();
  return new Map(series.stars.map((stars, i) => [addDays(series.from, i), stars]));
}

function daysBetween(from: string, to: string): number {
  return Math.round((Date.parse(to) - Date.parse(from)) / DAY_MS);
}

function seriesUntil(counts: DayCounts, lastDay: string): StarHistory {
  const known = [...counts].filter(([day]) => day <= lastDay).sort(([a], [b]) => a.localeCompare(b));
  const [earliest = lastDay] = known[0] ?? [];
  const stars: number[] = [];
  known.forEach(([day, count], i) => {
    const [nextDay, nextCount] = known[i + 1] ?? [day, count];
    const span = Math.max(1, daysBetween(day, nextDay));
    for (let step = 0; step < span; step++) stars.push(Math.round(count + ((nextCount - count) * step) / span));
  });
  const skipped = Math.max(0, daysBetween(earliest, lastDay) - HISTORY_DAYS);
  return { from: addDays(earliest, skipped), stars: stars.slice(skipped) };
}

function lastDayOf(series: StarHistory): string {
  return addDays(series.from, series.stars.length - 1);
}

export function nextSeries(
  previous: StarHistory | undefined,
  observed: readonly StarPoint[],
  stars: number,
  now: Date,
): StarHistory {
  const today = dayOf(now);
  const counts = new Map([...observedDays(observed), ...daysOf(previous), [today, stars]]);
  return seriesUntil(counts, today);
}

export function mergeSeries(older: StarHistory | undefined, newer: StarHistory): StarHistory {
  return seriesUntil(new Map([...daysOf(older), ...daysOf(newer)]), lastDayOf(newer));
}

export function seriesPoints(series: StarHistory, now: Date): StarPoint[] {
  const today = dayOf(now);
  return series.stars.flatMap((stars, i) => {
    const day = addDays(series.from, i);
    return day < today ? [{ at: `${day}T23:59:59.999Z`, stars }] : [];
  });
}
