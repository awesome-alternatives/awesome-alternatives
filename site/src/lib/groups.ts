import { slugify } from "./slug.ts";
import type { ToolView } from "./types.ts";

export interface Group<T extends ToolView> {
  slug: string;
  label: string;
  tools: T[];
}

export function groupTools<T extends ToolView>(tools: readonly T[], pick: (tool: T) => string | null): Group<T>[] {
  const groups = new Map<string, Group<T>>();
  for (const tool of tools) {
    const label = pick(tool);
    if (label === null) continue;
    const slug = slugify(label);
    const group = groups.get(slug);
    if (!group) groups.set(slug, { slug, label, tools: [tool] });
    else if (group.label === label) group.tools.push(tool);
    else throw new Error(`"${group.label}" and "${label}" both slugify to "${slug}"`);
  }
  return [...groups.values()]
    .map((group) => ({ ...group, tools: group.tools.sort((a, b) => b.repo.stars - a.repo.stars) }))
    .sort((a, b) => b.tools.length - a.tools.length || a.label.localeCompare(b.label));
}
