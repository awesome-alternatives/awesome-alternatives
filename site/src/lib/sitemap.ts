import type { EnrichedTool } from "../../../scripts/lib/types.ts";

type CatalogEntry = Pick<EnrichedTool, "slug" | "replaces">;

export interface SitemapAudit {
  missing: string[];
  unwanted: string[];
}

const UNWANTED = ["/404/"];
const INDEXES = ["/tools/", "/alternatives/", "/categories/", "/languages/", "/licenses/"];

export function expectedPaths(tools: CatalogEntry[]): string[] {
  const targets = new Set(tools.flatMap((t) => t.replaces.map((r) => r.tool)));
  return [
    "/",
    ...INDEXES,
    ...tools.map((t) => `/tools/${t.slug}/`),
    ...[...targets].map((slug) => `/alternatives/${slug}/`),
  ];
}

export function locs(xml: string): string[] {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => m[1]);
}

export function auditSitemap(site: string, tools: CatalogEntry[], listed: string[]): SitemapAudit {
  const urls = new Set(listed);
  const url = (path: string) => new URL(path, site).href;
  return {
    missing: expectedPaths(tools).map(url).filter((u) => !urls.has(u)),
    unwanted: UNWANTED.map(url).filter((u) => urls.has(u)),
  };
}
