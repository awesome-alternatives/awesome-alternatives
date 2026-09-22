import type { Finding, ReleaseFacts, RepoFacts, Tool } from "./types.ts";

export const MIN_AGE_DAYS = 30;
export const INACTIVE_DAYS = 365;
export const SPIKE_WINDOW_MS = 24 * 60 * 60 * 1000;
export const SPIKE_THRESHOLD = 50;

const DAY_MS = 24 * 60 * 60 * 1000;

export interface Evidence {
  repo: RepoFacts | null;
  release: ReleaseFacts | null;
  recentStars: string[];
}

export function judge(tool: Tool, evidence: Evidence, now: Date): Finding[] {
  const { repo } = evidence;
  const out: Finding[] = [];
  const add = (severity: Finding["severity"], code: string, message: string) =>
    out.push({ slug: tool.slug, severity, code, message });

  if (!repo) {
    add("error", "not-found", `${tool.repository} does not exist or is not public`);
    return out;
  }
  if (repo.private) add("error", "private", "the repository is private");
  if (repo.archived) add("error", "archived", "the repository is archived");
  if (repo.fork) add("error", "fork", "forks are not listed, point at the upstream repository");

  const declared = tool.repository.replace("https://github.com/", "").toLowerCase();
  if (repo.fullName.toLowerCase() !== declared) {
    add("warning", "moved", `the repository now lives at https://github.com/${repo.fullName}`);
  }

  const age = daysBetween(repo.createdAt, now);
  if (age < MIN_AGE_DAYS) {
    add("error", "too-new", `created ${age} days ago, entries need ${MIN_AGE_DAYS} days of history`);
  }

  if (!repo.license) add("warning", "no-license", "GitHub detects no licence for this repository");
  if (!evidence.release) add("warning", "no-release", "the repository has no release and no tag");

  const idle = daysBetween(repo.pushedAt, now);
  if (idle > INACTIVE_DAYS) add("warning", "inactive", `no push for ${idle} days`);

  const spike = maxInWindow(evidence.recentStars, SPIKE_WINDOW_MS);
  if (spike >= SPIKE_THRESHOLD) {
    add(
      "warning",
      "star-spike",
      `${spike} of the last ${evidence.recentStars.length} stars arrived within 24 hours, needs a human look`,
    );
  }

  return out;
}

export function maxInWindow(timestamps: readonly string[], windowMs: number): number {
  const times = timestamps.map((t) => Date.parse(t)).filter((t) => !Number.isNaN(t)).sort((a, b) => a - b);
  let best = 0;
  let start = 0;
  for (let end = 0; end < times.length; end++) {
    while ((times[end] as number) - (times[start] as number) > windowMs) start++;
    best = Math.max(best, end - start + 1);
  }
  return best;
}

export function daysBetween(iso: string, now: Date): number {
  return Math.floor((now.getTime() - Date.parse(iso)) / DAY_MS);
}
