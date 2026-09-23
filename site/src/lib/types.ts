import type { EnrichedTool, Fit, RepoFacts } from "../../../scripts/lib/types.ts";

export type { Fit };

export type ToolView = Omit<EnrichedTool, "repo" | "releases" | "addedAt"> & {
  repo: Pick<
    RepoFacts,
    "fullName" | "description" | "homepage" | "language" | "license" | "stars" | "forks" | "topics" | "pushedAt" | "archived"
  >;
};

export interface Filters {
  replaces?: string;
  language?: string;
  license?: string;
  dropIn?: boolean;
}

export interface SearchResult {
  query: string;
  filters: Filters;
  interpretedBy: "jev" | "local";
  count: number;
  tools: ToolView[];
}

export interface ToolList {
  count: number;
  limit: number;
  offset: number;
  tools: ToolView[];
}

export interface GridItem {
  href: string;
  name: string;
  detail?: string;
  count: number;
  archived?: boolean;
}

export interface Readme {
  html: string | null;
}

export interface ScorecardCheck {
  name: string;
  score: number | null;
  reason: string;
  url: string | null;
}

export interface Scorecard {
  score: number;
  date: string;
  checks: ScorecardCheck[];
}

export interface Advisory {
  ghsaId: string;
  cveId: string | null;
  summary: string;
  severity: string | null;
  publishedAt: string | null;
  url: string;
}

export interface SecurityReport {
  scorecard: Scorecard | null;
  advisories: Advisory[];
}
