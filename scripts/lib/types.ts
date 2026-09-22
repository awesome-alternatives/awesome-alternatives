export type Fit = "drop-in" | "full" | "partial";

export interface Replacement {
  tool: string;
  fit: Fit;
  note?: string;
}

export interface ToolEntry {
  name: string;
  repository: string;
  category: string;
  replaces?: Replacement[];
  affiliation?: string;
}

export interface Tool extends ToolEntry {
  slug: string;
  file: string;
}

export interface Category {
  name: string;
  description: string;
}

export type Severity = "error" | "warning";

export interface Finding {
  slug: string;
  severity: Severity;
  code: string;
  message: string;
}

export interface RepoFacts {
  fullName: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  license: string | null;
  stars: number;
  forks: number;
  topics: string[];
  archived: boolean;
  fork: boolean;
  private: boolean;
  createdAt: string;
  pushedAt: string;
  defaultBranch: string;
}

export interface ReleaseFacts {
  tag: string;
  publishedAt: string | null;
  url: string;
  source: "release" | "tag";
  signed: boolean;
}

export interface ReleaseEntry {
  tag: string;
  name: string | null;
  publishedAt: string | null;
  url: string;
  prerelease: boolean;
}

export interface EnrichedTool {
  slug: string;
  name: string;
  repository: string;
  category: string;
  replaces: Replacement[];
  affiliation: string | null;
  addedAt: string;
  repo: RepoFacts;
  release: ReleaseFacts | null;
  releases: ReleaseEntry[];
  maintainerVerified: boolean;
  flags: string[];
}
