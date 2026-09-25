import type { ActiveContributors, EnrichedTool, OperatingSystem, Platform } from "../../../scripts/lib/types.ts";
import { cadenceDays } from "./cadence.ts";

const SYSTEM_NAMES: Record<OperatingSystem, string> = {
  linux: "Linux",
  macos: "macOS",
  windows: "Windows",
  freebsd: "FreeBSD",
  openbsd: "OpenBSD",
  netbsd: "NetBSD",
  android: "Android",
};

export interface Vitality {
  created: { year: number; years: number };
  cadenceDays: number | null;
  contributors: (ActiveContributors & { monorepoPath: string | null }) | null;
  platforms: string | null;
}

export function fullYearsBetween(from: Date, to: Date): number {
  const years = to.getUTCFullYear() - from.getUTCFullYear();
  const anniversary = Date.UTC(to.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate());
  return Math.max(0, to.getTime() < anniversary ? years - 1 : years);
}

export function platformLine(platforms: readonly Platform[]): string | null {
  if (platforms.length === 0) return null;
  return platforms
    .map(({ os, architectures }) =>
      architectures.length > 0 ? `${SYSTEM_NAMES[os]} (${architectures.join(", ")})` : SYSTEM_NAMES[os],
    )
    .join(", ");
}

export function vitalityOf(tool: EnrichedTool, readAt: string | null): Vitality {
  const now = readAt ? new Date(readAt) : new Date();
  const created = new Date(tool.repo.createdAt);
  const contributors = tool.contributors;
  return {
    created: { year: created.getUTCFullYear(), years: fullYearsBetween(created, now) },
    cadenceDays: cadenceDays(tool.releases),
    contributors: contributors ? { ...contributors, monorepoPath: tool.path } : null,
    platforms: platformLine(tool.platforms ?? []),
  };
}
