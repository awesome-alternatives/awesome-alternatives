import { fetchMaintainerClaim, fetchRelease, fetchRepo } from "./facts.ts";
import type { GitHub } from "./github.ts";
import type { Evidence } from "./rules.ts";
import type { Tool } from "./types.ts";

export interface Gathered extends Evidence {
  maintainerVerified: boolean;
}

export async function gather(gh: GitHub, tool: Tool): Promise<Gathered> {
  const repo = await fetchRepo(gh, tool.repository);
  if (!repo) return { repo, release: null, starHistory: [], maintainerVerified: false };

  const [release, claim] = await Promise.all([
    fetchRelease(gh, repo.fullName),
    fetchMaintainerClaim(gh, repo.fullName, repo.defaultBranch, tool.path),
  ]);

  return { repo, release, starHistory: [], maintainerVerified: claim.includes(tool.slug) };
}

export async function mapLimit<T, R>(items: readonly T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i] as T);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}
