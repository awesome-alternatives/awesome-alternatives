import type { DeployMethod, EnrichedTool, RepoFacts, Terms } from "../../../scripts/lib/types.ts";

export { DEPLOY_METHODS } from "../../../scripts/lib/types.ts";

export type { DeployMethod, Fit, Terms } from "../../../scripts/lib/types.ts";

export type ToolView = Omit<EnrichedTool, "repo" | "releases" | "addedAt" | "editedAt" | "factsChangedAt"> & {
  repo: Pick<
    RepoFacts,
    "fullName" | "description" | "homepage" | "language" | "license" | "stars" | "forks" | "topics" | "pushedAt" | "archived"
  >;
};

export interface FeedLink {
  title: string;
  path: string;
}

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
  deploy?: DeployMethod[];
}

export interface NearMiss {
  tool: ToolView;
  missing: string[];
  missingDeploy?: DeployMethod[];
}

export interface Unchecked {
  kind: "platform";
  value: string;
}

export interface SearchResult {
  query: string;
  filters: Filters;
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
  count?: number;
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
