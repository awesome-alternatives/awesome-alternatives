import { execFileSync } from "node:child_process";
import {
  ADDED_LOG_ARGS,
  addedAt,
  carriedAddedAt,
  EDITED_LOG_ARGS,
  parseAddedLog,
  parseEditedLog,
} from "./added.ts";
import type { Installations } from "./app.ts";
import { factsChangedAt } from "./changed.ts";
import { fetchOwner, fetchReleases, ownerOf } from "./facts.ts";
import { gather, mapLimit } from "./gather.ts";
import type { GitHub } from "./github.ts";
import { readPublished } from "./publish.ts";
import { judge, replacedSlugs } from "./rules.ts";
import { termsOf } from "./terms.ts";
import { trendOf } from "./trending.ts";
import { isFlagCode, type EnrichedTool, type OwnerFacts, type Tool } from "./types.ts";

export interface Enricher {
  enrich(tool: Tool): Promise<EnrichedTool | null>;
}

export async function createEnricher(
  root: string,
  gh: GitHub,
  installations: Installations | null,
  tools: readonly Tool[],
  now: Date,
): Promise<Enricher> {
  const previous = await readPublished(root);
  const replaced = replacedSlugs(tools);
  const carried = carriedAddedAt(previous);
  const before = new Map(previous.tools.map((t) => [t.slug, t]));
  const git = (args: string[]) => execFileSync("git", args, { cwd: root, encoding: "utf8" });
  const history = parseAddedLog(git(ADDED_LOG_ARGS));
  const edits = parseEditedLog(git(EDITED_LOG_ARGS));

  return {
    async enrich(tool) {
      const evidence = await gather(gh, tool, true, installations);
      const flags = judge(tool, evidence, now, replaced)
        .map((f) => f.code)
        .filter(isFlagCode);
      if (!evidence.repo) {
        console.error(`${tool.slug}: ${tool.repository} is gone, left out of the catalog`);
        return null;
      }
      return {
        slug: tool.slug,
        name: tool.name,
        repository: tool.repository,
        category: tool.category,
        replaces: tool.replaces ?? [],
        affiliation: tool.affiliation ?? null,
        path: tool.path ?? null,
        addedAt: addedAt(tool.slug, carried, history, now),
        editedAt: edits.get(tool.slug) ?? now.toISOString(),
        factsChangedAt: factsChangedAt(before.get(tool.slug), evidence.repo, now),
        repo: evidence.repo,
        trend: trendOf(evidence.recentStars, evidence.repo.stars, now),
        release: evidence.release,
        releases: await fetchReleases(gh, evidence.repo.fullName),
        maintainerVerified: evidence.maintainerVerified,
        flags,
        terms: termsOf(tool.terms, evidence.repo.license),
        capabilities: tool.capabilities ?? {},
        deploy: tool.deploy ?? [],
      };
    },
  };
}

export async function fetchOwners(gh: GitHub, tools: readonly EnrichedTool[]): Promise<Record<string, OwnerFacts>> {
  const logins = [...new Set(tools.map((t) => ownerOf(t.repo.fullName)))].sort((a, b) => a.localeCompare(b));
  const fetched = await mapLimit(logins, 4, (login) => fetchOwner(gh, login));
  const owners: Record<string, OwnerFacts> = {};
  fetched.forEach((owner, i) => {
    if (owner) owners[owner.login] = owner;
    else console.error(`${logins[i]}: GitHub reports no such account, listed without an owner`);
  });
  return owners;
}
