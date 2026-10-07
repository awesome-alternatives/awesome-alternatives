import type { Catalog } from "./catalog.ts";
import { byCodeUnit } from "./order.ts";
import { replacedSlugs } from "./rules.ts";
import type { BannedTool, Tool } from "./types.ts";

export interface ListedCatalog extends Catalog {
  banned: BannedTool[];
}

type BannedEntry = Tool & { banned: string };

export const isBanned = (tool: Tool): tool is BannedEntry => tool.banned !== undefined;

export const checkable = (tools: readonly Tool[], slugs: readonly string[]): Tool[] =>
  tools.filter((t) => slugs.includes(t.slug) && !isBanned(t));

export function listedCatalog(catalog: Catalog): ListedCatalog {
  const bannedEntries = catalog.tools.filter(isBanned);
  const bannedSlugs = new Set(bannedEntries.map((t) => t.slug));
  const tools = catalog.tools
    .filter((t) => !isBanned(t))
    .map((t) => (t.replaces?.some((r) => bannedSlugs.has(r.tool)) ? { ...t, replaces: t.replaces.filter((r) => !bannedSlugs.has(r.tool)) } : t));
  const replaced = replacedSlugs(tools);
  const banned = bannedEntries
    .map(({ slug, name, repository, category, banned: reason }) => ({ slug, name, repository, category, reason }))
    .sort((a, b) => byCodeUnit(a.slug, b.slug));
  return { ...catalog, tools, products: catalog.products.filter((p) => replaced.has(p.slug)), banned };
}
