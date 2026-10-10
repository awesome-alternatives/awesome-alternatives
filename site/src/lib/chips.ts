import { format } from "../i18n/index.ts";
import type { Islands } from "../i18n/islands.en.ts";
import type { DeployMethod, Filters, Terms } from "./types.ts";

export type ChipKey =
  | "replaces"
  | "language"
  | "license"
  | "dropIn"
  | "terms"
  | "selfHost"
  | "maintained"
  | "capabilities"
  | "deploy";

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
  for (const method of filters.deploy ?? []) {
    out.push({ key: "deploy", value: method, label: strings.deploy[method] });
  }
  return out;
}

export interface Gap {
  missing: readonly string[];
  missingDeploy?: readonly DeployMethod[];
}

export function requirementLabels(
  filters: Filters,
  strings: ChipStrings,
  describeCapability: (key: string) => string,
  lacking: Gap = { missing: [] },
): string[] {
  return [
    ...(filters.capabilities ?? []).filter((c) => !lacking.missing.includes(c)).map(describeCapability),
    ...(filters.deploy ?? []).filter((m) => !lacking.missingDeploy?.includes(m)).map((m) => strings.deploy[m]),
  ];
}

export function gapLabels(gap: Gap, strings: ChipStrings, describeCapability: (key: string) => string): string[] {
  return [...gap.missing.map(describeCapability), ...(gap.missingDeploy ?? []).map((m) => strings.deploy[m])];
}

function keeping<T extends string>(all: readonly T[] | undefined, dropped: string | undefined): T[] | undefined {
  const kept = (all ?? []).filter((v) => v !== dropped);
  return kept.length > 0 ? kept : undefined;
}

export function without(filters: Filters, key: ChipKey, value?: string): Filters {
  const next: Filters = { ...filters, [key]: undefined };
  if (key === "capabilities") next.capabilities = keeping(filters.capabilities, value);
  if (key === "deploy") next.deploy = keeping(filters.deploy, value);
  if (key === "replaces") next.dropIn = undefined;
  return Object.fromEntries(Object.entries(next).filter(([, v]) => v !== undefined && v !== false));
}
