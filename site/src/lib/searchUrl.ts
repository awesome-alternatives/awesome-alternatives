import type { Filters } from "./types.ts";

export interface Refinement {
  category?: string;
  dropIn?: boolean;
}

export interface SearchUrl {
  q: string;
  refinement: Refinement;
}

export function readSearchUrl(search: string): SearchUrl {
  const params = new URLSearchParams(search);
  const category = params.get("category")?.trim();
  const refinement: Refinement = {};
  if (category) refinement.category = category;
  if (params.get("dropIn") === "true") refinement.dropIn = true;
  return { q: params.get("q")?.trim() ?? "", refinement };
}

export function searchParams(q: string, refinement: Refinement): URLSearchParams {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (refinement.category) params.set("category", refinement.category);
  if (refinement.dropIn) params.set("dropIn", "true");
  return params;
}

export function refined(filters: Filters, refinement: Refinement): Filters {
  const next: Filters = { ...filters };
  if (refinement.category) next.category = refinement.category;
  else delete next.category;
  if (refinement.dropIn !== undefined) next.dropIn = refinement.dropIn;
  if (!next.dropIn) delete next.dropIn;
  return next;
}

export function isRefined(refinement: Refinement): boolean {
  return Boolean(refinement.category) || refinement.dropIn === true;
}
