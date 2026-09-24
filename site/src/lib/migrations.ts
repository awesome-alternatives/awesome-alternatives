export interface Review {
  reviewed: string;
  majors: Record<string, number>;
}

export type Staleness = { kind: "age" } | { kind: "major"; slug: string };

export function majorOf(tag: string | null | undefined): number | null {
  const match = /(\d+)/.exec(tag ?? "");
  return match ? Number(match[1]) : null;
}

export function staleness(review: Review, now: Date, currentMajor: (slug: string) => number | null): Staleness[] {
  const out: Staleness[] = [];
  const due = new Date(`${review.reviewed}T00:00:00Z`);
  due.setUTCFullYear(due.getUTCFullYear() + 1);
  if (now.getTime() >= due.getTime()) out.push({ kind: "age" });
  for (const [slug, major] of Object.entries(review.majors)) {
    const current = currentMajor(slug);
    if (current !== null && current > major) out.push({ kind: "major", slug });
  }
  return out;
}

export function pairOf(id: string): { from: string; to: string } | null {
  const [from, to, ...rest] = id.split("--");
  return from && to && rest.length === 0 ? { from, to } : null;
}

export function migrationPath(from: string, to: string): string {
  return `/migrate/${from}/${to}/`;
}
