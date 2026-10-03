import type { Installations } from "./app.ts";
import type { CommitWindow } from "./commit-window.ts";
import { createEnricher, fetchOwners, ownerLogins } from "./enrich.ts";
import { retryBehindAllowList } from "./facts-anonymous.ts";
import { completeRepositories, readRepositories, type RepositoryFacts } from "./facts-graphql.ts";
import type { GitHub } from "./github.ts";
import type { GraphQL } from "./graphql.ts";
import type { Snapshot } from "./publish.ts";
import { timed } from "./timing.ts";
import { type EnrichedTool, GONE, type OwnerFacts, type Read, type Tool } from "./types.ts";

export interface RefreshClients {
  gql: GraphQL;
  gh: GitHub;
  anonymous: GitHub;
  installations: Installations | null;
}

export interface Refreshed {
  tools: EnrichedTool[];
  owners: Record<string, OwnerFacts>;
  facts: ReadonlyMap<string, Read<RepositoryFacts>>;
  windows: ReadonlyMap<string, CommitWindow>;
}

export async function refreshTools(
  root: string,
  previous: Snapshot,
  clients: RefreshClients,
  declared: readonly Tool[],
  targets: readonly Tool[],
  now: Date,
  windows: ReadonlyMap<string, CommitWindow> = new Map(),
): Promise<Refreshed> {
  const { gql, gh, anonymous, installations } = clients;
  const published = new Map(previous.tools.map((t) => [t.slug, t]));
  const releases = new Map(previous.tools.map((t) => [t.slug, t.release]));
  const readFacts = async () => {
    const read = await timed("repositories", () => readRepositories(gql, targets, now, published));
    const mapped = await retryBehindAllowList(anonymous, targets, read);
    return Promise.all([
      completeRepositories(gql, gh, targets, mapped, now, { releases, windows }),
      timed("owners", () => fetchOwners(gql, anonymous, ownerLogins(targets, mapped, previous), previous.owners)),
    ]);
  };
  const [[completed, owners], installed] = await Promise.all([
    readFacts(),
    timed("installations", async () => (installations ? installations.list() : null)),
  ]);
  const enricher = createEnricher(root, previous, installed, declared, now);
  const tools = targets
    .flatMap((tool) => enricher.enrich(tool, completed.facts.get(tool.slug) ?? GONE) ?? [])
    .sort((a, b) => a.slug.localeCompare(b.slug));
  return { tools, owners, facts: completed.facts, windows: completed.windows };
}
