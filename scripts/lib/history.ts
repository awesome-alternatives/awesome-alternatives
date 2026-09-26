import { execFileSync } from "node:child_process";
import { CATALOG_PATH } from "./publish.ts";

export interface Revision {
  sha: string;
  at: string;
}

export function fileLogArgs(path: string, since: Date | null = null): string[] {
  return ["log", ...(since ? [`--since=${since.toISOString()}`] : []), "--format=%H %cI", "--", path];
}

export function catalogLogArgs(since: Date | null = null): string[] {
  return fileLogArgs(CATALOG_PATH, since);
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

export function git(root: string, args: readonly string[]): string {
  return execFileSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 256 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"] });
}

export function logRevisions(root: string, logArgs: readonly string[]): Revision[] {
  return parseRevisions(git(root, logArgs));
}

export interface FileRevision extends Revision {
  content: unknown;
}

export function* fileRevisions(root: string, path: string, revisions: readonly Revision[]): Generator<FileRevision> {
  for (const revision of revisions) {
    let content: unknown;
    try {
      content = JSON.parse(git(root, ["show", `${revision.sha}:${path}`]));
    } catch {
      continue;
    }
    yield { ...revision, content };
  }
}

export interface CatalogRevision extends Revision {
  catalog: unknown;
}

export function* dailyCatalogs(root: string, logArgs: readonly string[]): Generator<CatalogRevision> {
  for (const { content, ...revision } of fileRevisions(root, CATALOG_PATH, lastPerDay(logRevisions(root, logArgs)))) {
    yield { ...revision, catalog: content };
  }
}
