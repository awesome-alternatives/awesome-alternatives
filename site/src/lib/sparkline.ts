import type { StarHistory } from "../../../scripts/lib/types.ts";

export interface DayStars {
  day: string;
  stars: number;
}

export interface ChartPoint extends DayStars {
  x: number;
  y: number;
}

export interface Chart {
  line: string;
  area: string;
  points: ChartPoint[];
  step: number;
}

const DAY_MS = 24 * 60 * 60 * 1000;

export function daysOf(series: StarHistory): DayStars[] {
  const start = Date.parse(`${series.from}T00:00:00Z`);
  return series.stars.map((stars, i) => ({ day: new Date(start + i * DAY_MS).toISOString().slice(0, 10), stars }));
}

export function chartOf(series: StarHistory, width: number, height: number): Chart | null {
  const days = daysOf(series);
  if (days.length < 2) return null;
  const values = days.map((d) => d.stars);
  const min = Math.min(...values);
  const span = Math.max(...values) - min;
  const step = width / (days.length - 1);
  const yOf = (stars: number) => (span === 0 ? height / 2 : height - ((stars - min) / span) * height);
  const points = days.map((d, i) => ({ ...d, x: tenth(i * step), y: tenth(yOf(d.stars)) }));
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join("");
  return { line, area: `${line}L${width} ${height}L0 ${height}Z`, points, step: tenth(step) };
}

function tenth(n: number): number {
  return Math.round(n * 10) / 10;
}
