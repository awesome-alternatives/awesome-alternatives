import type { EnrichedTool, Fit, RepoFacts } from "../../../scripts/lib/types.ts";

export type { Fit };

export type ToolView = Omit<EnrichedTool, "repo" | "releases"> & {
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
  tools: ToolView[];
}

export interface GridItem {
  href: string;
  name: string;
  detail?: string;
  count: number;
  archived?: boolean;
}
