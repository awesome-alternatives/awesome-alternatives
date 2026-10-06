import { APPLIED_TRAILER, REFRESH_COMMITTERS } from "./maintainer-write.ts";

export const ADDED_LOG_ARGS = [
  "log",
  "--diff-filter=A",
  "--no-renames",
  "--format=%x00%cI",
  "--name-only",
  "--",
  "data/tools",
];

export const EDITED_LOG_ARGS = [
  "log",
  "--first-parent",
  "--no-renames",
  `--format=%x00%cI%x01%ce%x01%(trailers:key=${APPLIED_TRAILER},valueonly,separator=%x02)`,
  "--name-only",
  "--",
  "data/tools",
];

const TOOL_FILE = /^data\/tools\/([a-z0-9-]+)\.yaml$/;

interface ToolCommit {
  at: string;
  slugs: string[];
  applied: Set<string>;
}

function appliedSlugs(committer: string, trailers: string): Set<string> {
  if (!REFRESH_COMMITTERS.includes(committer)) return new Set();
  return new Set(trailers.split("\u0002").flatMap((value) => TOOL_FILE.exec(value.trim().split(" ")[0] ?? "")?.[1] ?? []));
}

function* toolCommits(output: string): Generator<ToolCommit> {
  for (const commit of output.split("\0").slice(1)) {
    const [header = "", ...files] = commit.trim().split("\n");
    const [date = "", committer = "", trailers = ""] = header.split("\u0001");
    const slugs = files.flatMap((file) => TOOL_FILE.exec(file.trim())?.[1] ?? []);
    yield { at: new Date(date.trim()).toISOString(), slugs, applied: appliedSlugs(committer.trim(), trailers) };
  }
}

export function parseAddedLog(output: string): Map<string, string> {
  const added = new Map<string, string>();
  for (const { at, slugs } of toolCommits(output)) {
    for (const slug of slugs) added.set(slug, at);
  }
  return added;
}

export function parseEditedLog(output: string): Map<string, string> {
  const edited = new Map<string, string>();
  for (const { at, slugs, applied } of toolCommits(output)) {
    for (const slug of slugs) if (!edited.has(slug) && !applied.has(slug)) edited.set(slug, at);
  }
  return edited;
}

export function carriedAddedAt(previous: { tools: { slug: string; addedAt?: string }[] }): Map<string, string> {
  return new Map(previous.tools.flatMap((t) => (t.addedAt ? [[t.slug, t.addedAt] as const] : [])));
}

export function addedAt(slug: string, carried: Map<string, string>, history: Map<string, string>, now: Date): string {
  return carried.get(slug) ?? history.get(slug) ?? now.toISOString();
}
