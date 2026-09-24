import { execFileSync } from "node:child_process";
import {
  ADDED_LOG_ARGS,
  addedAt,
  carriedAddedAt,
  EDITED_LOG_ARGS,
  parseAddedLog,
  parseEditedLog,
} from "./added.ts";
import { type Installations, isMaintainerVerified } from "./app.ts";
import { factsChangedAt } from "./changed.ts";
import { readStarHistory } from "./history.ts";
import { ownerOf } from "./facts.ts";
import { fetchOwnerFacts, type RepositoryFacts } from "./facts-graphql.ts";
import type { GraphQL } from "./graphql.ts";
import { readPublished } from "./publish.ts";
import { judge, replacedSlugs } from "./rules.ts";
import { termsOf } from "./terms.ts";
import { trendOf } from "./trending.ts";
import { isFlagCode, type EnrichedTool, type OwnerFacts, type Tool } from "./types.ts";

export interface Enricher {
  enrich(tool: Tool, facts: RepositoryFacts | null): Promise<EnrichedTool | null>;
}

export async function createEnricher(
  root: string,
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
  const stars = readStarHistory(root, now);

  return {
    async enrich(tool, facts) {
      if (!facts) {
        console.error(`${tool.slug}: ${tool.repository} is gone, left out of the catalog`);
        return null;
      }
      const starHistory = stars.get(tool.slug) ?? [];
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
        editedAt: edits.get(tool.slug) ?? now.toISOString(),
        factsChangedAt: factsChangedAt(before.get(tool.slug), facts.repo, now),
        repo: facts.repo,
        trend: trendOf(starHistory, facts.repo.stars, now),
        release: facts.release,
        releases: facts.releases,
        maintainerVerified: await isMaintainerVerified(tool.slug, facts.claim, facts.repo.fullName, installations),
        flags,
        terms: termsOf(tool.terms, facts.repo.license),
        capabilities: tool.capabilities ?? {},
        deploy: tool.deploy ?? [],
      };
    },
  };
}

export async function fetchOwners(gql: GraphQL, tools: readonly EnrichedTool[]): Promise<Record<string, OwnerFacts>> {
  const logins = [...new Set(tools.map((t) => ownerOf(t.repo.fullName)))].sort((a, b) => a.localeCompare(b));
  const fetched = await fetchOwnerFacts(gql, logins);
  const owners: Record<string, OwnerFacts> = {};
  for (const login of logins) {
    const owner = fetched.get(login);
    if (owner) owners[owner.login] = owner;
    else console.error(`${login}: GitHub reports no such account, listed without an owner`);
  }
  return owners;
}
