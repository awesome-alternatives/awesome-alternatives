import type { EnrichedTool, Fit, RepoFacts, Terms } from "../../../scripts/lib/types.ts";

export type { Fit, Terms };

export type ToolView = Omit<EnrichedTool, "repo" | "releases" | "addedAt" | "editedAt" | "factsChangedAt"> & {
  repo: Pick<
    RepoFacts,
    "fullName" | "description" | "homepage" | "language" | "license" | "stars" | "forks" | "topics" | "pushedAt" | "archived"
  >;
};

export interface Filters {
  replaces?: string;
  language?: string;
  license?: string;
  category?: string;
  dropIn?: boolean;
  terms?: Terms;
  selfHost?: boolean;
  maintained?: boolean;
  capabilities?: string[];
}

export interface NearMiss {
  tool: ToolView;
  missing: string[];
}

export interface Unchecked {
  kind: "platform" | "deploy";
  value: string;
}

export interface SearchResult {
  query: string;
  filters: Filters;
  interpretedBy: "jev" | "local";
  unchecked?: Unchecked[];
  near?: NearMiss[];
  count: number;
  limit: number;
  offset: number;
  tools: ToolView[];
}

export interface ToolList {
  count: number;
  limit: number;
  offset: number;
  tools: ToolView[];
  near?: NearMiss[];
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
