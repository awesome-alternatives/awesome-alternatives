export type Fit = "drop-in" | "full" | "partial";

export interface Replacement {
  tool: string;
  fit: Fit;
  note?: string;
  migration?: string;
}

export type DeclaredTerms = "open" | "source-available" | "open-core";

export type Terms = DeclaredTerms | "unknown";

export const DEPLOY_METHODS = ["container", "compose", "helm", "binary", "package"] as const;

export type DeployMethod = (typeof DEPLOY_METHODS)[number];

export interface ToolEntry {
  name: string;
  repository: string;
  category: string;
  replaces?: Replacement[];
  affiliation?: string;
  path?: string;
  terms?: DeclaredTerms;
  capabilities?: Record<string, Capability>;
  deploy?: DeployMethod[];
}

export interface Tool extends ToolEntry {
  slug: string;
  file: string;
}

export interface ProductEntry {
  name: string;
  homepage: string;
  vendor: string;
  category: string;
  description: string;
}

export interface Product extends ProductEntry {
  slug: string;
  file: string;
}

export type ListedProduct = Omit<Product, "file">;

export interface CapabilityTerm {
  label: string;
  match: string[];
}

export interface Category {
  name: string;
  description: string;
  selfHost?: boolean;
  capabilities?: Record<string, CapabilityTerm>;
}

export interface Capability {
  docs: string;
  note?: string;
}

export type Severity = "error" | "warning";

export type BlockingCode =
  | "bad-slug"
  | "capability-unreachable"
  | "deploy-outside-self-host"
  | "duplicate-replacement"
  | "duplicate-repository"
  | "fork"
  | "migration-page"
  | "migration-unreachable"
  | "not-found"
  | "private"
  | "product-collides"
  | "replaces-itself"
  | "schema"
  | "too-new"
  | "unknown-capability"
  | "unknown-category"
  | "unknown-replacement"
  | "unused-product";

export const FLAG_CODES = ["archived", "inactive", "moved", "no-license", "no-release", "star-spike"] as const;

export type FlagCode = (typeof FLAG_CODES)[number];

export type FindingCode = BlockingCode | FlagCode | "deploy-unproven" | "homepage-unreachable";

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

export interface StarPoint {
  at: string;
  stars: number;
}

export interface StarHistory {
  from: string;
  stars: number[];
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

export const OPERATING_SYSTEMS = ["linux", "macos", "windows", "freebsd", "openbsd", "netbsd", "android"] as const;

export type OperatingSystem = (typeof OPERATING_SYSTEMS)[number];

export const ARCHITECTURES = ["x86_64", "arm64", "x86", "armv7", "arm", "riscv64", "ppc64le", "s390x", "universal"] as const;

export type Architecture = (typeof ARCHITECTURES)[number];

export interface Platform {
  os: OperatingSystem;
  architectures: Architecture[];
}

export interface ActiveContributors {
  count: number;
  capped: boolean;
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
  editedAt: string;
  factsChangedAt: string | null;
  repo: RepoFacts;
  trend?: TrendFacts | null;
  starHistory?: StarHistory;
  release: ReleaseFacts | null;
  releases: ReleaseEntry[];
  contributors?: ActiveContributors | null;
  platforms?: Platform[];
  maintainerVerified: boolean;
  flags: FlagCode[];
  terms: Terms;
  capabilities: Record<string, Capability>;
  deploy: DeployMethod[];
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

interface EventStamp {
  slug: string;
  at: string;
  commit: string | null;
}

export type CatalogEvent = EventStamp &
  (
    | { type: "added" | "removed" | "archived" | "unarchived" | "inactive" | "reactivated" }
    | { type: "license-changed"; from: string | null; to: string | null }
    | { type: "renamed"; from: string; to: string }
    | { type: "released"; from: string | null; to: string }
  );

export type EventType = CatalogEvent["type"];

export const EVENT_ORDER: Record<EventType, number> = {
  added: 0,
  removed: 1,
  renamed: 2,
  "license-changed": 3,
  archived: 4,
  unarchived: 5,
  inactive: 6,
  reactivated: 7,
  released: 8,
};
