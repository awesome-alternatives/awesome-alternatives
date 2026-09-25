import type { EnrichedTool } from "../../../scripts/lib/types.ts";
import { LOCALES, pathFor } from "../i18n/index.ts";
import { comparePairs } from "./compare.ts";
import { type Dated, lastModified } from "./freshness.ts";
import { listedOwners } from "./owners.ts";
import { slugify } from "./slug.ts";

type CatalogEntry = Pick<EnrichedTool, "slug" | "replaces"> & {
  repo: { fullName: string; archived: boolean; stars: number };
};

export interface SitemapAudit {
  missing: string[];
  unwanted: string[];
}

const UNWANTED = ["/404/"];
const INDEXES = ["/tools/", "/alternatives/", "/categories/", "/languages/", "/licenses/", "/owners/", "/changes/"];

export function barePaths(tools: CatalogEntry[]): string[] {
  const targets = new Set(tools.flatMap((t) => t.replaces.map((r) => r.tool)));
  return [
    "/",
    ...INDEXES,
    ...tools.map((t) => `/tools/${t.slug}/`),
    ...[...targets].map((slug) => `/alternatives/${slug}/`),
    ...listedOwners(tools).map((login) => `/owners/${slugify(login)}/`),
    ...comparePairs(tools).map((pair) => `/compare/${pair.slug}/`),
  ];
}

export function lastmodByPath(tools: readonly (Dated & { slug: string })[]): Map<string, string> {
  const out = new Map<string, string>();
  for (const tool of tools) {
    for (const locale of LOCALES) out.set(pathFor(locale, `/tools/${tool.slug}/`), lastModified(tool));
  }
  return out;
}

export function expectedPaths(tools: CatalogEntry[]): string[] {
  return LOCALES.flatMap((locale) => barePaths(tools).map((path) => pathFor(locale, path)));
}

export function unwantedPaths(): string[] {
  return LOCALES.flatMap((locale) => UNWANTED.map((path) => pathFor(locale, path)));
}

export function locs(xml: string): string[] {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => m[1]);
}

export function auditSitemap(site: string, tools: CatalogEntry[], listed: string[]): SitemapAudit {
  const urls = new Set(listed);
  const url = (path: string) => new URL(path, site).href;
  return {
    missing: expectedPaths(tools)
      .map(url)
      .filter((u) => !urls.has(u)),
    unwanted: unwantedPaths()
      .map(url)
      .filter((u) => urls.has(u)),
  };
}
