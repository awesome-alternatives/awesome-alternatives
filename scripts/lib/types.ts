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
  path?: string;
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

export type BlockingCode =
  | "bad-slug"
  | "duplicate-replacement"
  | "duplicate-repository"
  | "fork"
  | "not-found"
  | "private"
  | "replaces-itself"
  | "schema"
  | "too-new"
  | "unknown-category"
  | "unknown-replacement";

export const FLAG_CODES = ["archived", "inactive", "moved", "no-license", "no-release", "star-spike"] as const;

export type FlagCode = (typeof FLAG_CODES)[number];

export type FindingCode = BlockingCode | FlagCode;

export function isFlagCode(code: FindingCode): code is FlagCode {
  return (FLAG_CODES as readonly string[]).includes(code);
}

export interface Finding {
  slug: string;
  severity: Severity;
  code: FindingCode;
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

export interface TrendFacts {
  stars: number;
  exact: boolean;
  since: string;
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
  path: string | null;
  addedAt: string;
  repo: RepoFacts;
  trend?: TrendFacts | null;
  release: ReleaseFacts | null;
  releases: ReleaseEntry[];
  maintainerVerified: boolean;
  flags: FlagCode[];
}

export type OwnerKind = "user" | "organization";

export interface OwnerFacts {
  login: string;
  kind: OwnerKind;
  name: string | null;
  bio: string | null;
  website: string | null;
  url: string;
}

export interface CatalogStats {
  tools: number;
  categories: number;
  targets: number;
}
