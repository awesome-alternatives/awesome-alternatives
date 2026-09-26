import type { Snapshot } from "./publish.ts";
import type { EnrichedTool, RepoFacts } from "./types.ts";

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

export const STALE_LABEL = "refresh-stale";

export type PublishedCatalog = Pick<Snapshot, "checkedAt"> & {
  tools: (Pick<EnrichedTool, "slug"> & { repo: Pick<RepoFacts, "stars"> })[];
};

export interface MainCatalog {
  checkedAt: string;
  sha: string;
  committedAt: string;
  stars: ReadonlyMap<string, number>;
}

export type Surface = "site" | "api";

export interface Sample {
  readFromGitHub: string | null;
  stars: ReadonlyMap<string, number>;
}

export type Reading = { kind: "served"; sample: Sample } | { kind: "unreachable"; reason: string };

export type Served =
  | { kind: "current" }
  | { kind: "behind"; readFromGitHub: string | null }
  | { kind: "unreachable"; reason: string };

export interface Thresholds {
  staleAfterHours: number;
  deployGraceHours: number;
}

export type Problem =
  | { kind: "not-refreshed"; ageHours: number }
  | { kind: "not-deployed"; surface: Surface; readFromGitHub: string | null }
  | { kind: "unreachable"; surface: Surface; reason: string };

export interface OpenIssue {
  number: number;
  url: string;
  lastUpdateAt: string;
}

export type Action =
  | { kind: "none" }
  | { kind: "open" }
  | { kind: "comment"; issue: OpenIssue }
  | { kind: "close"; issue: OpenIssue };

export function mainCatalog(catalog: PublishedCatalog, sha: string, committedAt: string): MainCatalog {
  return {
    checkedAt: catalog.checkedAt,
    sha,
    committedAt,
    stars: new Map(catalog.tools.map((tool) => [tool.slug, tool.repo.stars])),
  };
}

export function probeSlug(main: MainCatalog): string {
  const [top] = [...main.stars].sort(([a, x], [b, y]) => y - x || a.localeCompare(b));
  if (!top) throw new Error("the catalog on main lists no tools");
  return top[0];
}

export function parseToolMarkdown(slug: string, markdown: string): Sample {
  const day = /^- Read from GitHub: (\d{4}-\d{2}-\d{2})$/m.exec(markdown)?.[1];
  const stars = /^- Stars: (\d+)$/m.exec(markdown)?.[1];
  if (!day || !stars) throw new Error(`/tools/${slug}.md no longer carries "Read from GitHub" and "Stars" lines`);
  return { readFromGitHub: day, stars: new Map([[slug, Number(stars)]]) };
}

export function servedBy(reading: Reading, main: MainCatalog): Served {
  if (reading.kind === "unreachable") return reading;
  const { readFromGitHub, stars } = reading.sample;
  const sameDay = readFromGitHub === null || readFromGitHub === main.checkedAt.slice(0, 10);
  const sameStars = [...stars].every(([slug, count]) => main.stars.get(slug) === count);
  return sameDay && sameStars ? { kind: "current" } : { kind: "behind", readFromGitHub };
}

export function hoursBetween(from: string, to: Date): number {
  return (to.getTime() - Date.parse(from)) / HOUR_MS;
}

export function problemsOf(
  now: Date,
  main: MainCatalog,
  served: Readonly<Record<Surface, Served>>,
  thresholds: Thresholds,
): Problem[] {
  const problems: Problem[] = [];
  const ageHours = hoursBetween(main.checkedAt, now);
  if (ageHours > thresholds.staleAfterHours) problems.push({ kind: "not-refreshed", ageHours });
  const graceOver = hoursBetween(main.committedAt, now) > thresholds.deployGraceHours;
  for (const surface of ["site", "api"] as const) {
    const state = served[surface];
    if (state.kind === "unreachable") problems.push({ kind: "unreachable", surface, reason: state.reason });
    if (state.kind === "behind" && graceOver) {
      problems.push({ kind: "not-deployed", surface, readFromGitHub: state.readFromGitHub });
    }
  }
  return problems;
}

export function planAction(problems: readonly Problem[], open: OpenIssue | null, now: Date): Action {
  if (problems.length === 0) return open ? { kind: "close", issue: open } : { kind: "none" };
  if (!open) return { kind: "open" };
  return now.getTime() - Date.parse(open.lastUpdateAt) >= DAY_MS ? { kind: "comment", issue: open } : { kind: "none" };
}

export function thresholdsFrom(env: NodeJS.ProcessEnv): Thresholds {
  return {
    staleAfterHours: positiveHours(env, "STALE_AFTER_HOURS", 26),
    deployGraceHours: positiveHours(env, "DEPLOY_GRACE_HOURS", 3),
  };
}

function positiveHours(env: NodeJS.ProcessEnv, name: string, fallback: number): number {
  const raw = env[name];
  if (raw === undefined || raw === "") return fallback;
  const hours = Number(raw);
  if (!Number.isFinite(hours) || hours <= 0) throw new Error(`${name} must be a positive number of hours, got "${raw}"`);
  return hours;
}
