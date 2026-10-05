import type { EnrichedTool } from "./types.ts";

export const RECHECK_DAYS = 7;
const DAY_MS = 24 * 60 * 60 * 1000;

export interface PulseSignals {
  repo: { fullName: string; pushedAt: string };
  newest: string | null;
}

export function isRecheckDay(slug: string, now: Date): boolean {
  const offset = [...slug].reduce((sum, char) => sum + (char.codePointAt(0) ?? 0), 0);
  return (Math.floor(now.getTime() / DAY_MS) + offset) % RECHECK_DAYS === 0;
}

export function isCurrent(before: EnrichedTool | undefined, seen: PulseSignals, now: Date): before is EnrichedTool {
  if (before?.repo.fullName !== seen.repo.fullName) return false;
  const newest = before.releases[0];
  if ((newest?.tag ?? null) !== seen.newest) return false;
  if (!newest && before.repo.pushedAt !== seen.repo.pushedAt) return false;
  if (newest?.publishedAt && now.getTime() - Date.parse(newest.publishedAt) < DAY_MS) return false;
  return !isRecheckDay(before.slug, now);
}
