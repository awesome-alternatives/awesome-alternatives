import type { Fit, ToolView } from "./types.ts";

export interface ListFilters {
  language: string | null;
  license: string | null;
  fit: Fit | null;
}

export interface Facet<T extends string = string> {
  value: T;
  count: number;
}

const FIT_ORDER: readonly Fit[] = ["drop-in", "full", "partial"];

export function fitFor(tool: ToolView, target: string): Fit | null {
  return tool.replaces.find((r) => r.tool === target)?.fit ?? null;
}

export function alternativesTo<T extends ToolView>(tools: readonly T[], target: string): T[] {
  const rank = (tool: T) => {
    const fit = fitFor(tool, target);
    return fit === null ? -1 : FIT_ORDER.indexOf(fit);
  };
  return tools
    .filter((t) => !t.repo.archived && rank(t) >= 0)
    .sort((a, b) => rank(a) - rank(b) || b.repo.stars - a.repo.stars);
}

export function narrow<T extends ToolView>(tools: readonly T[], target: string, f: ListFilters): T[] {
  return tools.filter(
    (t) =>
      (f.language === null || t.repo.language === f.language) &&
      (f.license === null || t.repo.license === f.license) &&
      (f.fit === null || fitFor(t, target) === f.fit),
  );
}

export function facets<T extends string>(values: readonly (T | null)[]): Facet<T>[] {
  const counts = new Map<T, number>();
  for (const value of values) {
    if (value !== null) counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
}
