import { execFileSync } from "node:child_process";
import { CATALOG_PATH } from "./publish.ts";
import type { StarPoint } from "./types.ts";
import { TREND_WINDOW_DAYS } from "./trending.ts";

export const HISTORY_DAYS = TREND_WINDOW_DAYS + 1;

export interface Revision {
  sha: string;
  at: string;
}

interface Snapshot {
  tools: { slug: string; repo: { stars: number } }[];
}

export function catalogLogArgs(since: Date | null = null): string[] {
  return ["log", ...(since ? [`--since=${since.toISOString()}`] : []), "--format=%H %cI", "--", CATALOG_PATH];
}

export function historyLogArgs(now: Date): string[] {
  return catalogLogArgs(new Date(now.getTime() - HISTORY_DAYS * 24 * 60 * 60 * 1000));
}

export function parseRevisions(output: string): Revision[] {
  return output
    .split("\n")
    .map((line) => line.trim().split(" "))
    .flatMap(([sha, at]) => (sha && at ? [{ sha, at: new Date(at).toISOString() }] : []));
}

export function lastPerDay(revisions: readonly Revision[]): Revision[] {
  const byDay = new Map<string, Revision>();
  for (const revision of revisions) {
    const day = revision.at.slice(0, 10);
    const kept = byDay.get(day);
    if (!kept || revision.at > kept.at) byDay.set(day, revision);
  }
  return [...byDay.values()].sort((a, b) => a.at.localeCompare(b.at));
}

export function starSeries(snapshots: readonly { at: string; catalog: Snapshot }[]): Map<string, StarPoint[]> {
  const series = new Map<string, StarPoint[]>();
  for (const { at, catalog } of [...snapshots].sort((a, b) => a.at.localeCompare(b.at))) {
    for (const tool of catalog.tools) {
      const points = series.get(tool.slug) ?? [];
      points.push({ at, stars: tool.repo.stars });
      series.set(tool.slug, points);
    }
  }
  return series;
}

export interface CatalogRevision {
  at: string;
  catalog: unknown;
}

export function* dailyCatalogs(root: string, logArgs: readonly string[]): Generator<CatalogRevision> {
  const git = (args: string[]) => execFileSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
  for (const { sha, at } of lastPerDay(parseRevisions(git([...logArgs])))) {
    let catalog: unknown;
    try {
      catalog = JSON.parse(git(["show", `${sha}:${CATALOG_PATH}`]));
    } catch {
      continue;
    }
    yield { at, catalog };
  }
}

export function readStarHistory(root: string, now: Date): Map<string, StarPoint[]> {
  const snapshots = [...dailyCatalogs(root, historyLogArgs(now))].map(({ at, catalog }) => ({ at, catalog: catalog as Snapshot }));
  return starSeries(snapshots);
}
