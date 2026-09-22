export const TABS = ["readme", "releases", "security", "alternatives", "replaces"] as const;

export type TabId = (typeof TABS)[number];

export function isTab(value: string): value is TabId {
  return (TABS as readonly string[]).includes(value);
}

export function tabFromHash(hash: string, available: readonly TabId[]): TabId {
  const wanted = hash.replace(/^#/, "").toLowerCase();
  const first = available[0] ?? "readme";
  return isTab(wanted) && available.includes(wanted) ? wanted : first;
}

export function scoreLevel(score: number | null): "good" | "fair" | "poor" | "none" {
  if (score === null) return "none";
  if (score >= 7) return "good";
  if (score >= 4) return "fair";
  return "poor";
}
