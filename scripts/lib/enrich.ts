import { execFileSync } from "node:child_process";
import {
  ADDED_LOG_ARGS,
  addedAt,
  carriedAddedAt,
  EDITED_LOG_ARGS,
  parseAddedLog,
  parseEditedLog,
} from "./added.ts";
import { type Installed, isMaintainerVerified } from "./app.ts";
import { factsChangedAt } from "./changed.ts";
import { ownerOf } from "./facts.ts";
import { repoPath } from "./github.ts";
import { fetchOwnerFacts, type RepositoryFacts } from "./facts-graphql.ts";
import type { GraphQL } from "./graphql.ts";
import type { Snapshot } from "./publish.ts";
import { judge, replacedSlugs } from "./rules.ts";
import { nextSeries, seriesPoints } from "./star-series.ts";
import { termsOf } from "./terms.ts";
import { trendOf } from "./trending.ts";
import { type EnrichedTool, GONE, isFlagCode, type OwnerFacts, type Read, type RepoFacts, type Tool } from "./types.ts";

export interface Enricher {
  enrich(tool: Tool, read: Read<RepositoryFacts>): EnrichedTool | null;
}

function keptBehindAllowList(tool: Tool, published: EnrichedTool | undefined, editedAt: string): EnrichedTool | null {
  const owner = ownerOf(repoPath(tool.repository));
  if (!published) {
    console.error(`${tool.slug}: ${owner} has an IP allow list that refuses this runner, and no earlier run read it, left out of the catalog`);
    return null;
  }
  console.error(`${tool.slug}: ${owner} has an IP allow list that refuses this runner, kept with its last published facts and maintainer mark`);
  return {
    ...published,
    name: tool.name,
    repository: tool.repository,
    category: tool.category,
    replaces: tool.replaces ?? [],
    affiliation: tool.affiliation ?? null,
    path: tool.path ?? null,
    editedAt,
    terms: termsOf(tool.terms, published.repo.license),
    capabilities: tool.capabilities ?? {},
    deploy: tool.deploy ?? [],
  };
}

export function createEnricher(
  root: string,
  previous: Snapshot,
  installed: Installed | null,
  tools: readonly Tool[],
  now: Date,
): Enricher {
  const replaced = replacedSlugs(tools);
  const carried = carriedAddedAt(previous);
  const before = new Map(previous.tools.map((t) => [t.slug, t]));
  const git = (args: string[]) => execFileSync("git", args, { cwd: root, encoding: "utf8" });
  const history = parseAddedLog(git(ADDED_LOG_ARGS));
  const edits = parseEditedLog(git(EDITED_LOG_ARGS));

  return {
    enrich(tool, read) {
      const editedAt = edits.get(tool.slug) ?? now.toISOString();
      if (read.status === "gone") {
        console.error(`${tool.slug}: ${tool.repository} is gone, left out of the catalog`);
        return null;
      }
      if (read.status === "behind-allow-list") return keptBehindAllowList(tool, before.get(tool.slug), editedAt);
      const facts = read.value;
      const series = nextSeries(before.get(tool.slug)?.starHistory, facts.repo.stars, now);
      const starHistory = seriesPoints(series, now);
      const flags = judge(tool, { ...facts, starHistory }, now, replaced)
        .map((f) => f.code)
        .filter(isFlagCode);
      return {
        slug: tool.slug,
        name: tool.name,
        repository: tool.repository,
        category: tool.category,
        replaces: tool.replaces ?? [],
        affiliation: tool.affiliation ?? null,
        path: tool.path ?? null,
        addedAt: addedAt(tool.slug, carried, history, now),
        editedAt,
        factsChangedAt: factsChangedAt(before.get(tool.slug), facts.repo, now),
        repo: facts.repo,
        trend: trendOf(starHistory, facts.repo.stars, now),
        starHistory: series,
        release: facts.release,
        releases: facts.releases,
        contributors: facts.contributors,
        platforms: facts.platforms,
        maintainerVerified: isMaintainerVerified(tool.slug, facts.claim, facts.repo.fullName, installed),
        flags,
        terms: termsOf(tool.terms, facts.repo.license),
        capabilities: tool.capabilities ?? {},
        deploy: tool.deploy ?? [],
      };
    },
  };
}

export function ownerLogins(tools: readonly Tool[], reads: readonly Read<{ repo: RepoFacts }>[], previous: Snapshot): string[] {
  const before = new Map(previous.tools.map((t) => [t.slug, t]));
  const listed = tools.flatMap((tool, i) => {
    const read = reads[i] ?? GONE;
    if (read.status === "read") return [read.value.repo.fullName];
    const kept = read.status === "behind-allow-list" ? before.get(tool.slug) : undefined;
    return kept ? [kept.repo.fullName] : [];
  });
  return [...new Set(listed.map(ownerOf))].sort((a, b) => a.localeCompare(b));
}

export async function fetchOwners(
  gql: GraphQL,
  logins: readonly string[],
  published: Readonly<Record<string, OwnerFacts>>,
): Promise<Record<string, OwnerFacts>> {
  const fetched = await fetchOwnerFacts(gql, logins);
  const owners: Record<string, OwnerFacts> = {};
  for (const login of logins) {
    const read = fetched.get(login) ?? GONE;
    switch (read.status) {
      case "read":
        owners[read.value.login] = read.value;
        break;
      case "behind-allow-list": {
        const kept = published[login];
        if (kept) owners[login] = kept;
        console.error(`${login}: IP allow list refuses this runner, ${kept ? "kept the owner published before" : "listed without an owner"}`);
        break;
      }
      case "gone":
        console.error(`${login}: GitHub reports no such account, listed without an owner`);
        break;
    }
  }
  return owners;
}
