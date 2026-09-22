import type { Filters } from "./types.ts";

export type ChipKey = "replaces" | "language" | "license" | "category" | "dropIn";

export interface Chip {
  key: ChipKey;
  label: string;
}

export function chips(filters: Filters, nameOf: (slug: string) => string = (s) => s): Chip[] {
  const out: Chip[] = [];
  if (filters.replaces) out.push({ key: "replaces", label: `Replaces ${nameOf(filters.replaces)}` });
  if (filters.dropIn) out.push({ key: "dropIn", label: "Drop-in only" });
  if (filters.language) out.push({ key: "language", label: filters.language });
  if (filters.license) out.push({ key: "license", label: filters.license });
  if (filters.category) out.push({ key: "category", label: filters.category });
  return out;
}

export function without(filters: Filters, key: ChipKey): Filters {
  const next: Filters = { ...filters, [key]: undefined };
  if (key === "replaces") next.dropIn = undefined;
  return Object.fromEntries(Object.entries(next).filter(([, v]) => v !== undefined && v !== false));
}
