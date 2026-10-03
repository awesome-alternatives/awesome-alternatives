import { fetchMaintainerClaim, fetchRelease, fetchReleases, fetchRepo } from "./facts.ts";
import type { MappedRepository } from "./facts-graphql.ts";
import type { GitHub } from "./github.ts";
import { platformsOf } from "./platforms.ts";
import { GONE, type Read, type Tool } from "./types.ts";

interface ApiLatest {
  assets: { name: string }[];
}

interface ApiSearch {
  total_count: number;
}

export async function readAnonymously(gh: GitHub, tool: Pick<Tool, "repository" | "path">): Promise<Read<MappedRepository>> {
  const repo = await fetchRepo(gh, tool.repository);
  if (!repo) return GONE;
  const { fullName } = repo;
  const openIssues = `repo:${fullName} is:issue is:open`;
  const [release, releases, claim, latest, issues] = await Promise.all([
    fetchRelease(gh, fullName),
    fetchReleases(gh, fullName),
    fetchMaintainerClaim(gh, fullName, repo.defaultBranch, tool.path),
    gh.get<ApiLatest>(`/repos/${fullName}/releases/latest`),
    gh.get<ApiSearch>(`/search/issues?q=${encodeURIComponent(openIssues)}&per_page=1`),
  ]);
  return {
    status: "read",
    value: {
      repo,
      release,
      releases,
      claim,
      openIssues: issues?.total_count ?? 0,
      platforms: platformsOf(latest?.assets.map((asset) => asset.name) ?? []),
      annotatedTag: null,
      head: null,
    },
  };
}

export async function retryBehindAllowList(
  gh: GitHub,
  tools: readonly Tool[],
  reads: readonly Read<MappedRepository>[],
): Promise<Read<MappedRepository>[]> {
  const retried: Read<MappedRepository>[] = [];
  for (const [i, read] of reads.entries()) {
    const tool = tools[i];
    if (read.status !== "behind-allow-list" || !tool) {
      retried.push(read);
      continue;
    }
    try {
      retried.push(await readAnonymously(gh, tool));
      console.log(`${tool.slug}: behind an IP allow list, read without a token`);
    } catch (error) {
      console.error(`${tool.slug}: behind an IP allow list, and the read without a token failed too (${(error as Error).message})`);
      retried.push(read);
    }
  }
  return retried;
}
