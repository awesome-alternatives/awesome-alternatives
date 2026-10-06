import type { Installations } from "./app.ts";
import type { CommitWindow } from "./commit-window.ts";
import { readVerifiedAt } from "./claim-dates.ts";
import { createEnricher, fetchOwners, ownerLogins } from "./enrich.ts";
import { retryBehindAllowList } from "./facts-anonymous.ts";
import { completeRepositories, readRepositories, type RepositoryFacts } from "./facts-graphql.ts";
import type { GitHub } from "./github.ts";
import type { GraphQL } from "./graphql.ts";
import { type Applied, applyMaintainerFiles, type MaintainerApply } from "./maintainer-apply.ts";
import type { Proposal } from "./maintainer-editorial.ts";
import type { Snapshot } from "./publish.ts";
import { withPackageReleases } from "./packages.ts";
import { timed } from "./timing.ts";
import { type EnrichedTool, GONE, type OwnerFacts, type Read, type Tool } from "./types.ts";

export interface RefreshClients {
  gql: GraphQL;
  gh: GitHub;
  anonymous: GitHub;
  installations: Installations | null;
  registry?: typeof fetch;
}

export interface Refreshed {
  tools: EnrichedTool[];
  owners: Record<string, OwnerFacts>;
  facts: ReadonlyMap<string, Read<RepositoryFacts>>;
  windows: ReadonlyMap<string, CommitWindow>;
  applied: Applied[];
  proposed: Proposal[];
}

export interface RefreshOptions {
  windows?: ReadonlyMap<string, CommitWindow>;
  force?: boolean;
  maintainerFiles?: MaintainerApply;
}

export async function refreshTools(
  root: string,
  previous: Snapshot,
  clients: RefreshClients,
  declared: readonly Tool[],
  targets: readonly Tool[],
  now: Date,
  { windows = new Map(), force = false, maintainerFiles }: RefreshOptions = {},
): Promise<Refreshed> {
  const { gql, gh, anonymous, installations, registry } = clients;
  const published = new Map(previous.tools.map((t) => [t.slug, t]));
  const releases = new Map(previous.tools.map((t) => [t.slug, t.release]));
  const readFacts = async () => {
    const read = await timed("repositories", () => readRepositories(gql, targets, now, force ? new Map() : published));
    const mapped = await retryBehindAllowList(anonymous, targets, read);
    return Promise.all([
      completeRepositories(gql, gh, targets, mapped, now, { releases, windows }).then(async (completed) => ({
        ...completed,
        facts: await timed("packages", () => withPackageReleases(targets, completed.facts, releases, registry)),
      })),
      timed("owners", () => fetchOwners(gql, anonymous, ownerLogins(targets, mapped, previous), previous.owners)),
      timed("verification", () => readVerifiedAt(gql, anonymous, targets, mapped, published)),
    ]);
  };
  const [[completed, owners, verifiedAt], installed] = await Promise.all([
    readFacts(),
    timed("installations", async () => (installations ? installations.list() : null)),
  ]);
  const maintained = maintainerFiles
    ? await timed("maintainer files", () => applyMaintainerFiles(declared, targets, completed.facts, published, maintainerFiles))
    : { tools: [...targets], applied: [], proposed: [] };
  const enricher = createEnricher(root, previous, installed, declared, now);
  const tools = maintained.tools
    .flatMap((tool) => enricher.enrich(tool, completed.facts.get(tool.slug) ?? GONE, verifiedAt.get(tool.slug) ?? null) ?? [])
    .sort((a, b) => a.slug.localeCompare(b.slug));
  return { tools, owners, facts: completed.facts, windows: completed.windows, applied: maintained.applied, proposed: maintained.proposed };
}
