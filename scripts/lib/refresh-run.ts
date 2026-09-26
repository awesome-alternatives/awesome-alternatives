import type { Installations } from "./app.ts";
import { createEnricher, fetchOwners, ownerLogins } from "./enrich.ts";
import { completeRepositories, readRepositories, type RepositoryFacts } from "./facts-graphql.ts";
import type { GitHub } from "./github.ts";
import type { GraphQL } from "./graphql.ts";
import type { Snapshot } from "./publish.ts";
import { timed } from "./timing.ts";
import { type EnrichedTool, GONE, type OwnerFacts, type Read, type Tool } from "./types.ts";

export interface RefreshClients {
  gql: GraphQL;
  gh: GitHub;
  installations: Installations | null;
}

export interface Refreshed {
  tools: EnrichedTool[];
  owners: Record<string, OwnerFacts>;
  facts: ReadonlyMap<string, Read<RepositoryFacts>>;
}

export async function refreshTools(
  root: string,
  previous: Snapshot,
  clients: RefreshClients,
  declared: readonly Tool[],
  targets: readonly Tool[],
  now: Date,
): Promise<Refreshed> {
  const { gql, gh, installations } = clients;
  const releases = new Map(previous.tools.map((t) => [t.slug, t.release]));
  const readFacts = async () => {
    const mapped = await timed("repositories", () => readRepositories(gql, targets));
    return Promise.all([
      completeRepositories(gql, gh, targets, mapped, now, releases),
      timed("owners", () => fetchOwners(gql, ownerLogins(targets, mapped, previous), previous.owners)),
    ]);
  };
  const [[facts, owners], installed] = await Promise.all([
    readFacts(),
    timed("installations", async () => (installations ? installations.list() : null)),
  ]);
  const enricher = createEnricher(root, previous, installed, declared, now);
  const tools = targets
    .flatMap((tool) => enricher.enrich(tool, facts.get(tool.slug) ?? GONE) ?? [])
    .sort((a, b) => a.slug.localeCompare(b.slug));
  return { tools, owners, facts };
}
