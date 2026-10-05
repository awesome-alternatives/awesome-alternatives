export type TabId = "readme" | "releases" | "security" | "alternatives" | "replaces";

export interface TabCounts {
  alternatives: number;
  replaces: number;
}

export function tabsFor(counts: TabCounts): [TabId, ...TabId[]] {
  const rest: TabId[] = ["releases", "security", ...(counts.replaces > 0 ? (["replaces"] as const) : [])];
  return counts.alternatives > 0 ? ["alternatives", "readme", ...rest] : ["readme", ...rest];
}

export function tabFromHash<T extends string>(hash: string, available: readonly T[]): T | undefined {
  const wanted = hash.replace(/^#/, "").toLowerCase();
  return available.find((tab) => tab === wanted) ?? available[0];
}

export function scoreLevel(score: number | null): "good" | "fair" | "poor" | "none" {
  if (score === null) return "none";
  if (score >= 7) return "good";
  if (score >= 4) return "fair";
  return "poor";
}
