import type { EnrichedTool, Fit, RepoFacts } from "../../../scripts/lib/types.ts";

export type { Fit };

export type ToolView = Omit<EnrichedTool, "repo"> & {
  repo: Pick<
    RepoFacts,
    "fullName" | "description" | "homepage" | "language" | "license" | "stars" | "pushedAt" | "archived"
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
  interpretedBy: "jev" | "lexical";
  count: number;
  tools: ToolView[];
}

export interface ToolList {
  count: number;
  tools: ToolView[];
}
