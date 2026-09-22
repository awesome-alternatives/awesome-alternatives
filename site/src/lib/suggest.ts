export interface IndexEntry {
  slug: string;
  name: string;
  category: string;
}

export interface SuggestIndex {
  tools: IndexEntry[];
  targets: string[];
}

export interface Suggestion {
  kind: "tool" | "target";
  slug: string;
  name: string;
  detail: string;
}

const LIMIT = 8;

export function normalise(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function rank(entry: IndexEntry, needle: string): number {
  const name = normalise(entry.name);
  const slug = normalise(entry.slug);
  if (name.startsWith(needle) || slug.startsWith(needle)) return 0;
  if (name.includes(needle) || slug.includes(needle)) return 1;
  if (normalise(entry.category).includes(needle)) return 2;
  return -1;
}

export function suggest(
  index: SuggestIndex,
  query: string,
  alternativesTo: (name: string) => string,
  limit = LIMIT,
): Suggestion[] {
  const needle = normalise(query);
  if (!needle) return [];
  const targets = new Set(index.targets);
  const nameOf = new Map(index.tools.map((tool) => [tool.slug, tool.name]));

  const scored = index.tools
    .map((entry) => ({ entry, score: rank(entry, needle) }))
    .filter(({ score }) => score >= 0)
    .sort((a, b) => a.score - b.score || a.entry.name.localeCompare(b.entry.name));

  const out: Suggestion[] = [];
  for (const { entry } of scored) {
    if (targets.has(entry.slug)) {
      out.push({
        kind: "target",
        slug: entry.slug,
        name: alternativesTo(nameOf.get(entry.slug) ?? entry.slug),
        detail: entry.category,
      });
    } else {
      out.push({ kind: "tool", slug: entry.slug, name: entry.name, detail: entry.category });
    }
    if (out.length === limit) break;
  }
  return out;
}

export function href(suggestion: Suggestion): string {
  return suggestion.kind === "target"
    ? `/alternatives/${suggestion.slug}/`
    : `/tools/${suggestion.slug}/`;
}
