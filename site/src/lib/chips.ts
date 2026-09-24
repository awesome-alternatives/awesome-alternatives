import { format } from "../i18n/index.ts";
import type { Islands } from "../i18n/islands.en.ts";
import type { Filters, Terms } from "./types.ts";

export type ChipKey =
  | "replaces"
  | "language"
  | "license"
  | "dropIn"
  | "terms"
  | "selfHost"
  | "maintained"
  | "capabilities";

export type ChipStrings = Islands["search"]["chips"];

export interface Chip {
  key: ChipKey;
  label: string;
  value?: string;
}

export function chips(
  filters: Filters,
  strings: ChipStrings,
  nameOf: (slug: string) => string = (s) => s,
  describeTerms: (terms: Terms) => string = (t) => t,
  describeCapability: (key: string) => string = (k) => k,
): Chip[] {
  const out: Chip[] = [];
  if (filters.replaces) {
    out.push({ key: "replaces", label: format(strings.replaces, { name: nameOf(filters.replaces) }) });
  }
  if (filters.dropIn) out.push({ key: "dropIn", label: strings.dropIn });
  if (filters.language) out.push({ key: "language", label: filters.language });
  if (filters.license) out.push({ key: "license", label: filters.license });
  if (filters.terms) out.push({ key: "terms", label: describeTerms(filters.terms) });
  if (filters.maintained) out.push({ key: "maintained", label: strings.maintained });
  if (filters.selfHost) out.push({ key: "selfHost", label: strings.selfHost });
  for (const capability of filters.capabilities ?? []) {
    out.push({ key: "capabilities", value: capability, label: describeCapability(capability) });
  }
  return out;
}

export function without(filters: Filters, key: ChipKey, value?: string): Filters {
  const next: Filters = { ...filters, [key]: undefined };
  if (key === "capabilities") {
    const kept = (filters.capabilities ?? []).filter((c) => c !== value);
    next.capabilities = kept.length > 0 ? kept : undefined;
  }
  if (key === "replaces") next.dropIn = undefined;
  return Object.fromEntries(Object.entries(next).filter(([, v]) => v !== undefined && v !== false));
}
