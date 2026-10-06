import { createHash } from "node:crypto";
import { isDeepStrictEqual } from "node:util";
import type { Catalog } from "./catalog.ts";
import type { MaintainerEntry, MaintainerReplacement } from "./maintainer-file.ts";
import type { Replacement, Tool } from "./types.ts";

export type Editorial = Pick<MaintainerEntry, "replaces" | "category" | "affiliation">;

export interface Source {
  fullName: string;
  location: string;
  commit: string | null;
}

export interface Proposal {
  slug: string;
  source: Source;
  editorial: Editorial;
}

export interface Proposed {
  tool: Tool;
  skipped: string[];
}

export function editorialOf({ replaces, category, affiliation }: MaintainerEntry): Editorial | null {
  if (replaces === undefined && category === undefined && affiliation === undefined) return null;
  return {
    ...(replaces !== undefined && { replaces }),
    ...(category !== undefined && { category }),
    ...(affiliation !== undefined && { affiliation }),
  };
}

export function proposalHash(slug: string, { replaces, category, affiliation }: Editorial): string {
  const sorted = replaces && [...replaces].sort((a, b) => a.tool.localeCompare(b.tool)).map(({ tool, fit, note }) => [tool, fit, note ?? null]);
  return createHash("sha256")
    .update(JSON.stringify([slug, category ?? null, affiliation ?? null, sorted ?? null]))
    .digest("hex");
}

function wantedReplacements(slug: string, proposed: readonly MaintainerReplacement[], known: ReadonlySet<string>, skipped: string[]) {
  const wanted = new Map<string, MaintainerReplacement>();
  for (const replacement of proposed) {
    if (replacement.tool === slug) skipped.push(`replaces ${replacement.tool}, the tool itself`);
    else if (!known.has(replacement.tool)) skipped.push(`replaces ${replacement.tool}, which the catalog does not have`);
    else if (wanted.has(replacement.tool)) skipped.push(`lists ${replacement.tool} more than once`);
    else wanted.set(replacement.tool, replacement);
  }
  return wanted;
}

function withNote({ tool, fit, note }: MaintainerReplacement): Replacement {
  return note === undefined ? { tool, fit } : { tool, fit, note };
}

function replacementsFor(tool: Tool, proposed: readonly MaintainerReplacement[], known: ReadonlySet<string>, skipped: string[]): Replacement[] {
  const wanted = wantedReplacements(tool.slug, proposed, known, skipped);
  const current = tool.replaces ?? [];
  const kept = current.flatMap((existing) => {
    const update = wanted.get(existing.tool);
    return update ? [{ ...existing, fit: update.fit, ...(update.note !== undefined && { note: update.note }) }] : [];
  });
  const added = [...wanted.values()].filter((update) => !current.some((existing) => existing.tool === update.tool)).map(withNote);
  return [...kept, ...added];
}

export function proposedTool(tool: Tool, editorial: Editorial, catalog: Catalog): Proposed {
  const skipped: string[] = [];
  let next = tool;
  if (editorial.category !== undefined && editorial.category !== tool.category) {
    if (catalog.categories.has(editorial.category)) next = { ...next, category: editorial.category };
    else skipped.push(`category ${editorial.category} is not in data/categories.yaml`);
  }
  if (editorial.affiliation !== undefined) next = { ...next, affiliation: editorial.affiliation };
  if (editorial.replaces !== undefined) {
    const known = new Set([...catalog.tools.map((other) => other.slug), ...catalog.products.map((product) => product.slug)]);
    const { replaces: _, ...rest } = next;
    const replaces = replacementsFor(tool, editorial.replaces, known, skipped);
    next = replaces.length ? { ...rest, replaces } : rest;
  }
  return { tool: isDeepStrictEqual(next, tool) ? tool : next, skipped };
}
