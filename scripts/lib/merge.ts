import type { Snapshot } from "./publish.ts";
import type { EnrichedTool, OwnerFacts } from "./types.ts";

export interface RefreshedEntry {
  slug: string;
  tool: EnrichedTool | null;
  owner: OwnerFacts | null;
}

export function mergeEntries(previous: Snapshot, entries: readonly RefreshedEntry[]): Snapshot {
  const tools = new Map(previous.tools.map((t) => [t.slug, t]));
  const owners = { ...previous.owners };
  for (const { slug, tool, owner } of entries) {
    if (tool) tools.set(slug, tool);
    else tools.delete(slug);
    if (owner) owners[owner.login] = owner;
  }
  return {
    checkedAt: previous.checkedAt,
    owners,
    tools: [...tools.values()].sort((a, b) => a.slug.localeCompare(b.slug)),
  };
}
