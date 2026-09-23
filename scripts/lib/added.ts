export const ADDED_LOG_ARGS = [
  "log",
  "--diff-filter=A",
  "--no-renames",
  "--format=%x00%cI",
  "--name-only",
  "--",
  "data/tools",
];

export const EDITED_LOG_ARGS = ["log", "--no-renames", "--format=%x00%cI", "--name-only", "--", "data/tools"];

const TOOL_FILE = /^data\/tools\/([a-z0-9-]+)\.yaml$/;

function* toolCommits(output: string): Generator<{ at: string; slugs: string[] }> {
  for (const commit of output.split("\0").slice(1)) {
    const [date = "", ...files] = commit.trim().split("\n");
    const slugs = files.flatMap((file) => TOOL_FILE.exec(file.trim())?.[1] ?? []);
    yield { at: new Date(date.trim()).toISOString(), slugs };
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
  for (const { at, slugs } of toolCommits(output)) {
    for (const slug of slugs) if (!edited.has(slug)) edited.set(slug, at);
  }
  return edited;
}

export function carriedAddedAt(previous: { tools: { slug: string; addedAt?: string }[] }): Map<string, string> {
  return new Map(previous.tools.flatMap((t) => (t.addedAt ? [[t.slug, t.addedAt] as const] : [])));
}

export function addedAt(slug: string, carried: Map<string, string>, history: Map<string, string>, now: Date): string {
  return carried.get(slug) ?? history.get(slug) ?? now.toISOString();
}
