import type { ReleaseEntry } from "../../../scripts/lib/types.ts";

const DAY = 86_400_000;

const CADENCE_MIN_RELEASES = 3;

export function cadenceDays(releases: readonly ReleaseEntry[]): number | null {
  const published = releases
    .filter((release) => !release.prerelease && release.publishedAt !== null)
    .map((release) => Date.parse(release.publishedAt as string))
    .filter((time) => Number.isFinite(time))
    .sort((a, b) => b - a);
  if (published.length < CADENCE_MIN_RELEASES) return null;
  const gaps = published.slice(1).map((time, index) => (published[index] - time) / DAY).sort((a, b) => a - b);
  const middle = Math.floor(gaps.length / 2);
  const median = gaps.length % 2 === 1 ? gaps[middle] : (gaps[middle - 1] + gaps[middle]) / 2;
  return Math.max(1, Math.round(median));
}
