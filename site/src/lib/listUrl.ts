import { type Hosting, type ListFilters, type Maintenance, NO_FILTERS } from "./filter.ts";
import type { Filters, Fit, Terms, Unchecked } from "./types.ts";

const FITS: readonly Fit[] = ["drop-in", "full", "partial"];
const TERMS: readonly Terms[] = ["open", "open-core", "source-available", "unknown"];
const MAINTENANCE: readonly Maintenance[] = ["maintained", "inactive"];
const HOSTING: readonly Hosting[] = ["self-hosted", "local"];
const KEYS = ["language", "license", "fit", "terms", "maintenance", "hosting"] as const satisfies readonly (keyof ListFilters)[];

export interface ListView {
  filters: ListFilters;
  unchecked: readonly string[];
}

function values(params: URLSearchParams, key: string): string[] {
  const all = (params.get(key) ?? "").split(",").map((v) => v.trim()).filter(Boolean);
  return [...new Set(all)];
}

function among<T extends string>(found: readonly string[], allowed: readonly T[]): T[] {
  return found.filter((v): v is T => (allowed as readonly string[]).includes(v));
}

export function readListUrl(search: string): ListView {
  const params = new URLSearchParams(search);
  return {
    filters: {
      language: values(params, "language"),
      license: values(params, "license"),
      fit: among(values(params, "fit"), FITS),
      terms: among(values(params, "terms"), TERMS),
      maintenance: among(values(params, "maintenance"), MAINTENANCE),
      hosting: among(values(params, "hosting"), HOSTING),
    },
    unchecked: values(params, "unchecked"),
  };
}

export function listParams({ filters, unchecked }: ListView): URLSearchParams {
  const params = new URLSearchParams();
  for (const key of KEYS) {
    if (filters[key].length > 0) params.set(key, filters[key].join(","));
  }
  if (unchecked.length > 0) params.set("unchecked", unchecked.join(","));
  return params;
}

export function fromSearch(filters: Filters, unchecked: readonly Unchecked[] = []): ListView {
  return {
    filters: {
      ...NO_FILTERS,
      language: filters.language ? [filters.language] : [],
      license: filters.license ? [filters.license] : [],
      fit: filters.dropIn ? ["drop-in"] : [],
      terms: filters.terms ? [filters.terms] : [],
      maintenance: filters.maintained ? ["maintained"] : [],
      hosting: filters.selfHost ? ["self-hosted"] : [],
    },
    unchecked: unchecked.map((u) => u.value),
  };
}

export function alternativesHref(filters: Filters, unchecked: readonly Unchecked[] = []): string | null {
  if (!filters.replaces) return null;
  const query = listParams(fromSearch(filters, unchecked)).toString();
  return `/alternatives/${filters.replaces}/${query ? `?${query}` : ""}`;
}
