import type { RepoFacts } from "./types.ts";

export interface PreviousFacts {
  repo: Pick<RepoFacts, "license" | "archived">;
  factsChangedAt?: string | null;
}

export function factsChangedAt(
  previous: PreviousFacts | undefined,
  repo: Pick<RepoFacts, "license" | "archived">,
  now: Date,
): string | null {
  if (!previous) return null;
  const changed = previous.repo.license !== repo.license || previous.repo.archived !== repo.archived;
  return changed ? now.toISOString() : (previous.factsChangedAt ?? null);
}
