import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { parse } from "yaml";

import type { Locale } from "../i18n/index.ts";
import { pathFor } from "../i18n/index.ts";

import type { CatalogEvent, Category, EnrichedTool, ListedProduct, OwnerFacts } from "../../../scripts/lib/types.ts";
import { comparePairs, type Pair } from "./compare.ts";
import { alternativesTo } from "./filter.ts";
import { groupTools } from "./groups.ts";
import { listedOwners, loginOf } from "./owners.ts";
import type { GridItem } from "./types.ts";

const ROOT = resolve(process.cwd(), "..");

export interface Target {
  slug: string;
  name: string;
  listed: EnrichedTool | null;
  product: ListedProduct | null;
  alternatives: EnrichedTool[];
}

type Deploy = Pick<EnrichedTool, "deploy">;

export function withDeploy<T extends object>(tool: T & Partial<Deploy>): Omit<T, "deploy"> & Deploy {
  return { ...tool, deploy: tool.deploy ?? [] };
}

const catalog: {
  checkedAt?: string;
  owners: Record<string, OwnerFacts>;
  tools: (Omit<EnrichedTool, "deploy"> & Partial<Deploy>)[];
  products: ListedProduct[];
} = JSON.parse(
  readFileSync(resolve(ROOT, "generated/catalog.json"), "utf8"),
);

export const tools: EnrichedTool[] = catalog.tools.map(withDeploy);

export const events: CatalogEvent[] = JSON.parse(readFileSync(resolve(ROOT, "generated/events.json"), "utf8"));

export const checkedAt: string | null = catalog.checkedAt ?? null;

export const products: ListedProduct[] = catalog.products;

export const categories: Record<string, Category> = parse(
  readFileSync(resolve(ROOT, "data/categories.yaml"), "utf8"),
);

export const pairs: Pair<EnrichedTool>[] = comparePairs(tools);

export function toolBySlug(slug: string): EnrichedTool | null {
  return tools.find((t) => t.slug === slug) ?? null;
}

export function productBySlug(slug: string): ListedProduct | null {
  return products.find((p) => p.slug === slug) ?? null;
}

export function nameOf(slug: string): string {
  return toolBySlug(slug)?.name ?? productBySlug(slug)?.name ?? slug;
}

export function targets(): Target[] {
  const slugs = new Set(tools.flatMap((t) => t.replaces.map((r) => r.tool)));
  return [...slugs]
    .map((slug) => {
      return {
        slug,
        name: nameOf(slug),
        listed: toolBySlug(slug),
        product: productBySlug(slug),
        alternatives: alternativesTo(tools, slug),
      };
    })
    .sort((a, b) => b.alternatives.length - a.alternatives.length || a.name.localeCompare(b.name));
}

const withPage = new Set(listedOwners(tools));

export const ownerGroups = groupTools(tools, (t) => loginOf(t.repo.fullName)).filter((g) => withPage.has(g.label));

export function ownerFacts(login: string): OwnerFacts | null {
  return catalog.owners[login] ?? null;
}

export function ownerName(login: string): string {
  return ownerFacts(login)?.name ?? login;
}

export function ownerHref(locale: Locale, login: string): string {
  const group = ownerGroups.find((g) => g.label === login);
  return group ? pathFor(locale, `/owners/${group.slug}/`) : (ownerFacts(login)?.url ?? `https://github.com/${login}`);
}

export const categoryGroups = groupTools(tools, (t) => t.category);
export const languageGroups = groupTools(tools, (t) => t.repo.language);
export const licenseGroups = groupTools(tools, (t) => t.repo.license);

export function capabilityLabels(): Record<string, string> {
  return Object.fromEntries(
    Object.values(categories).flatMap((category) =>
      Object.entries(category.capabilities ?? {}).map(([key, term]) => [key, term.label]),
    ),
  );
}

export function categoryName(key: string): string {
  return categories[key]?.name ?? key;
}

export function targetItems(from: readonly Target[] = targets()): GridItem[] {
  return from.map((target) => {
    const key = target.listed?.category ?? target.product?.category ?? target.alternatives[0]?.category;
    return {
      href: `/alternatives/${target.slug}/`,
      name: target.name,
      detail: key ? categoryName(key) : undefined,
      count: target.alternatives.length,
      archived: target.listed?.repo.archived,
    };
  });
}

