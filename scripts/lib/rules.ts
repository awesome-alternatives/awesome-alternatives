import type { Finding, FindingCode, ReleaseFacts, RepoFacts, StarPoint, Tool } from "./types.ts";

export const MIN_AGE_DAYS = 30;
export const INACTIVE_DAYS = 365;
export const SPIKE_THRESHOLD = 50;
export const SPIKE_FACTOR = 5;
export const SPIKE_BASELINE_DAYS = 7;

const DAY_MS = 24 * 60 * 60 * 1000;

export interface Evidence {
  repo: RepoFacts | null;
  release: ReleaseFacts | null;
  starHistory: StarPoint[];
}

export function replacedSlugs(tools: readonly Tool[]): Set<string> {
  return new Set(tools.flatMap((t) => (t.replaces ?? []).map((r) => r.tool)));
}

export function judge(tool: Tool, evidence: Evidence, now: Date, replaced: ReadonlySet<string>): Finding[] {
  const { repo } = evidence;
  const out: Finding[] = [];
  const add = (severity: Finding["severity"], code: FindingCode, message: string) =>
    out.push({ slug: tool.slug, severity, code, message });

  if (!repo) {
    add("error", "not-found", `${tool.repository} does not exist or is not public`);
    return out;
  }
  if (repo.private) add("error", "private", "the repository is private");
  if (repo.archived) {
    if (replaced.has(tool.slug) && !tool.replaces?.length) {
      add("warning", "archived", "the repository is archived, listed only as something other entries replace");
    } else {
      add("error", "archived", "the repository is archived, it can only be listed as something other entries replace");
    }
  }
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
  if (idle > INACTIVE_DAYS && !repo.archived) add("warning", "inactive", `no push for ${idle} days`);

  const spike = spikeOf(evidence.starHistory, repo.stars, now);
  if (spike) {
    add(
      "warning",
      "star-spike",
      `${spike.gained} stars on ${spike.on}, against about ${spike.usual} a day, needs a human look`,
    );
  }

  return out;
}

export interface Spike {
  gained: number;
  usual: number;
  on: string;
}

export function spikeOf(history: readonly StarPoint[], stars: number, now: Date): Spike | null {
  const points = [...history, { at: now.toISOString(), stars }].sort((a, b) => a.at.localeCompare(b.at));
  const daily = points.slice(1).map((point, i) => {
    const previous = points[i] as StarPoint;
    const days = Math.max(1, Math.round((Date.parse(point.at) - Date.parse(previous.at)) / DAY_MS));
    return { rate: (point.stars - previous.stars) / days, on: point.at.slice(0, 10) };
  });
  if (daily.length < SPIKE_BASELINE_DAYS) return null;
  const peak = daily.reduce((best, day) => (day.rate > best.rate ? day : best));
  const usual = median(daily.filter((day) => day !== peak).map((day) => day.rate));
  if (peak.rate < SPIKE_THRESHOLD || peak.rate < SPIKE_FACTOR * Math.max(usual, 1)) return null;
  return { gained: Math.round(peak.rate), usual: Math.round(usual), on: peak.on };
}

function median(values: readonly number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? (sorted[middle] as number) : ((sorted[middle - 1] as number) + (sorted[middle] as number)) / 2;
}

export function daysBetween(iso: string, now: Date): number {
  return Math.floor((now.getTime() - Date.parse(iso)) / DAY_MS);
}
