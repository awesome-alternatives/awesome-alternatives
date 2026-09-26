import { fetchMaintainerClaim, fetchRelease, fetchRepo } from "./facts.ts";
import { AllowListRefusal, type GitHub } from "./github.ts";
import type { Evidence } from "./rules.ts";
import type { RepoFacts, Tool } from "./types.ts";

export type Gathered =
  | { status: "read"; evidence: Evidence; maintainerVerified: boolean }
  | { status: "behind-allow-list"; repo: RepoFacts | null };

const REFUSED = Symbol("refused by an IP allow list");

async function unlessRefused<T>(read: Promise<T>): Promise<T | typeof REFUSED> {
  try {
    return await read;
  } catch (error) {
    if (error instanceof AllowListRefusal) return REFUSED;
    throw error;
  }
}

export async function gather(gh: GitHub, tool: Tool): Promise<Gathered> {
  const repo = await unlessRefused(fetchRepo(gh, tool.repository));
  if (repo === REFUSED) return { status: "behind-allow-list", repo: null };
  if (!repo) return { status: "read", evidence: { repo, release: null, starHistory: [] }, maintainerVerified: false };

  const details = await unlessRefused(
    Promise.all([fetchRelease(gh, repo.fullName), fetchMaintainerClaim(gh, repo.fullName, repo.defaultBranch, tool.path)]),
  );
  if (details === REFUSED) return { status: "behind-allow-list", repo };
  const [release, claim] = details;
  return { status: "read", evidence: { repo, release, starHistory: [] }, maintainerVerified: claim.includes(tool.slug) };
}

export async function mapLimit<T, R>(items: readonly T[], limit: number, fn: (item: T, index: number) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  let failed = false;
  const worker = async () => {
    while (!failed && next < items.length) {
      const i = next++;
      try {
        results[i] = await fn(items[i] as T, i);
      } catch (error) {
        failed = true;
        throw error;
      }
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

export function chunks<T>(items: readonly T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(items.length / size) }, (_, i) => items.slice(i * size, (i + 1) * size));
}
