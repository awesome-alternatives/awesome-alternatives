import type { Fit, Replacement } from "../../../scripts/lib/types.ts";

export interface PairTool {
  slug: string;
  replaces: Replacement[];
  repo: { archived: boolean; stars: number };
}

export interface Relation {
  fit: Fit;
  note: string | null;
}

export interface Edge extends Relation {
  from: string;
  to: string;
}

export interface Shared {
  target: string;
  a: Relation;
  b: Relation;
}

export interface Pair<T extends PairTool> {
  slug: string;
  a: T;
  b: T;
  edges: Edge[];
  shared: Shared[];
}

export function pairSlug(one: string, other: string): string {
  const [first, second] = one < other ? [one, other] : [other, one];
  return `${first}-vs-${second}`;
}

export function comparePath(one: string, other: string): string {
  return `/compare/${pairSlug(one, other)}/`;
}

interface Replacer<T extends PairTool> {
  tool: T;
  relation: Relation;
}

function carriesNote<T extends PairTool>(pair: Pair<T>): boolean {
  return (
    pair.edges.some((edge) => edge.note !== null) ||
    pair.shared.some((shared) => shared.a.note !== null || shared.b.note !== null)
  );
}

export function comparePairs<T extends PairTool>(tools: readonly T[]): Pair<T>[] {
  const live = tools.filter((tool) => !tool.repo.archived);
  const bySlug = new Map(live.map((tool) => [tool.slug, tool]));
  const pairs = new Map<string, Pair<T>>();

  const pairOf = (one: T, other: T): Pair<T> => {
    const [a, b] = one.slug < other.slug ? [one, other] : [other, one];
    const slug = pairSlug(a.slug, b.slug);
    const known = pairs.get(slug);
    if (known) return known;
    const created: Pair<T> = { slug, a, b, edges: [], shared: [] };
    pairs.set(slug, created);
    return created;
  };

  const replacers = new Map<string, Replacer<T>[]>();
  for (const tool of live) {
    for (const replacement of tool.replaces) {
      const relation: Relation = { fit: replacement.fit, note: replacement.note ?? null };
      const other = bySlug.get(replacement.tool);
      if (other && other.slug !== tool.slug) {
        pairOf(tool, other).edges.push({ from: tool.slug, to: other.slug, ...relation });
      }
      replacers.set(replacement.tool, [...(replacers.get(replacement.tool) ?? []), { tool, relation }]);
    }
  }

  for (const [target, group] of replacers) {
    for (const [index, one] of group.entries()) {
      for (const other of group.slice(index + 1)) {
        const pair = pairOf(one.tool, other.tool);
        const [a, b] = pair.a.slug === one.tool.slug ? [one, other] : [other, one];
        pair.shared.push({ target, a: a.relation, b: b.relation });
      }
    }
  }

  return [...pairs.values()]
    .filter(carriesNote)
    .map((pair) => ({
      ...pair,
      edges: [...pair.edges].sort((x, y) => x.from.localeCompare(y.from)),
      shared: [...pair.shared].sort((x, y) => x.target.localeCompare(y.target)),
    }))
    .sort((x, y) => x.slug.localeCompare(y.slug));
}

const totalStars = <T extends PairTool>(pair: Pair<T>) => pair.a.repo.stars + pair.b.repo.stars;

export function pairForTarget<T extends PairTool>(pairs: readonly Pair<T>[], target: string): Pair<T> | null {
  return (
    pairs
      .filter((pair) => pair.shared.some((shared) => shared.target === target))
      .sort((x, y) => totalStars(y) - totalStars(x))[0] ?? null
  );
}

export function pairForTool<T extends PairTool>(pairs: readonly Pair<T>[], slug: string): Pair<T> | null {
  const partnerStars = (pair: Pair<T>) => (pair.a.slug === slug ? pair.b.repo.stars : pair.a.repo.stars);
  return (
    pairs
      .filter((pair) => pair.a.slug === slug || pair.b.slug === slug)
      .sort((x, y) => y.edges.length - x.edges.length || partnerStars(y) - partnerStars(x))[0] ?? null
  );
}
