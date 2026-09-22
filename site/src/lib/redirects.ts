import { pairSlug } from "./compare.ts";

export interface Sides {
  a: { slug: string };
  b: { slug: string };
}

function mirrorSlug(one: string, other: string): string {
  const [first, second] = one < other ? [other, one] : [one, other];
  return `${first}-vs-${second}`;
}

export function reversedPairs(pairs: readonly Sides[]): Map<string, string> {
  const canonical = new Set(pairs.map((pair) => pairSlug(pair.a.slug, pair.b.slug)));
  const table = new Map<string, string>();
  const ambiguous = new Set<string>();

  for (const pair of pairs) {
    const reversed = mirrorSlug(pair.a.slug, pair.b.slug);
    if (canonical.has(reversed)) continue;
    if (table.has(reversed)) ambiguous.add(reversed);
    table.set(reversed, pairSlug(pair.a.slug, pair.b.slug));
  }
  for (const reversed of ambiguous) table.delete(reversed);

  return table;
}

const HASH_OVERHEAD = 16;

function bucketSize(keys: readonly string[]): number {
  const longest = Math.max(0, ...keys.map((key) => key.length));
  let size = 64;
  while (size < longest + HASH_OVERHEAD) size *= 2;
  return size;
}

export function pairMap(table: ReadonlyMap<string, string>): string {
  const entries = [...table].sort(([one], [other]) => one.localeCompare(other));
  return [
    `map_hash_bucket_size ${bucketSize([...table.keys()])};`,
    "map $compare_pair $compare_canonical {",
    `    default "";`,
    ...entries.map(([reversed, canonical]) => `    ${reversed} ${canonical};`),
    "}",
    "",
  ].join("\n");
}
