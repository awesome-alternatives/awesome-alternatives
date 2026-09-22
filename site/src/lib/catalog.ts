import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { parse } from "yaml";

import type { Category, EnrichedTool } from "../../../scripts/lib/types.ts";
import { alternativesTo } from "./filter.ts";

const ROOT = resolve(process.cwd(), "..");

export interface Target {
  slug: string;
  name: string;
  listed: EnrichedTool | null;
  alternatives: EnrichedTool[];
}

export const tools: EnrichedTool[] = JSON.parse(
  readFileSync(resolve(ROOT, "generated/catalog.json"), "utf8"),
).tools;

export const categories: Record<string, Category> = parse(
  readFileSync(resolve(ROOT, "data/categories.yaml"), "utf8"),
);

export function toolBySlug(slug: string): EnrichedTool | null {
  return tools.find((t) => t.slug === slug) ?? null;
}

export function targets(): Target[] {
  const slugs = new Set(tools.flatMap((t) => t.replaces.map((r) => r.tool)));
  return [...slugs]
    .map((slug) => {
      const listed = toolBySlug(slug);
      return {
        slug,
        name: listed?.name ?? slug,
        listed,
        alternatives: alternativesTo(tools, slug),
      };
    })
    .sort((a, b) => b.alternatives.length - a.alternatives.length || a.name.localeCompare(b.name));
}
