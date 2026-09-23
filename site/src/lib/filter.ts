import type { Fit, Terms, ToolView } from "./types.ts";

export interface ListFilters {
  language: readonly string[];
  license: readonly string[];
  fit: readonly Fit[];
  terms: readonly Terms[];
}

export const NO_FILTERS: ListFilters = { language: [], license: [], fit: [], terms: [] };

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

export function dropInCount(alternatives: readonly ToolView[], target: string): number {
  return alternatives.filter((t) => fitFor(t, target) === "drop-in").length;
}

function admits<T>(chosen: readonly T[], value: T | null): boolean {
  return chosen.length === 0 || (value !== null && chosen.includes(value));
}

export function narrow<T extends ToolView>(tools: readonly T[], target: string, f: ListFilters): T[] {
  return tools.filter(
    (t) =>
      admits(f.language, t.repo.language) &&
      admits(f.license, t.repo.license) &&
      admits(f.fit, fitFor(t, target)) &&
      admits(f.terms, t.terms),
  );
}

export function toggled<T>(chosen: readonly T[], value: T): T[] {
  return chosen.includes(value) ? chosen.filter((v) => v !== value) : [...chosen, value];
}

export function matching<T extends string>(
  facets: readonly Facet<T>[],
  query: string,
  describe: (value: T) => string,
): Facet<T>[] {
  const needle = query.trim().toLocaleLowerCase();
  if (!needle) return [...facets];
  return facets.filter(({ value }) => describe(value).toLocaleLowerCase().includes(needle));
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
