import {
  claimedSlugs,
  encodeRef,
  isAnnotatedTagSigned,
  licenseOf,
  MAINTAINER_FILE,
  RELEASE_HISTORY,
  releaseEntry,
  trimmed,
  websiteOf,
} from "./facts.ts";
import { type CommitWindow, walkContributors } from "./commit-window.ts";
import { mapLimit } from "./gather.ts";
import { type GitHub, repoPath } from "./github.ts";
import type { GraphQL } from "./graphql.ts";
import { aliasedBatches, aliasedQuery, type BatchShape, everyRead } from "./graphql-batch.ts";
import { platformsOf } from "./platforms.ts";
import { isCurrent } from "./recheck.ts";
import { timed } from "./timing.ts";
import {
  type ActiveContributors,
  type EnrichedTool,
  GONE,
  type OwnerFacts,
  type Platform,
  type Read,
  type ReleaseEntry,
  type ReleaseFacts,
  type RepoFacts,
  type Tool,
} from "./types.ts";

export const REPOSITORY_SHAPE: BatchShape = { size: 20, concurrency: 1 };
export const OWNER_SHAPE: BatchShape = { size: 100, concurrency: 1 };
const SIGNATURE_CONCURRENCY = 4;

type GitObject =
  | { __typename: "Commit"; oid: string; signature: { isValid: boolean } | null }
  | { __typename: "Tag" | "Tree" | "Blob"; oid: string };

interface Blob {
  text?: string | null;
}

interface GqlPulseFields {
  nameWithOwner: string;
  description: string | null;
  homepageUrl: string | null;
  primaryLanguage: { name: string } | null;
  licenseInfo: { spdxId: string | null } | null;
  stargazerCount: number;
  forkCount: number;
  issues: { totalCount: number };
  isArchived: boolean;
  isFork: boolean;
  isPrivate: boolean;
  createdAt: string;
  pushedAt: string | null;
  defaultBranchRef: { name: string; target: { oid?: string } | null } | null;
  claim: Blob | null;
  claimAt?: Blob | null;
}

export interface GqlPulse extends GqlPulseFields {
  newest: { nodes: { tagName: string }[] };
}

export interface GqlDetail {
  nameWithOwner: string;
  repositoryTopics: { nodes: { topic: { name: string } }[] };
  latestRelease: {
    tagName: string;
    publishedAt: string | null;
    url: string;
    tag: { target: GitObject } | null;
    releaseAssets: { nodes: { name: string }[] };
  } | null;
  tags: { nodes: { name: string; target: GitObject }[] };
  releases: {
    nodes: {
      tagName: string;
      name: string | null;
      description: string | null;
      publishedAt: string | null;
      url: string;
      isPrerelease: boolean;
      isDraft: boolean;
    }[];
  };
}

export interface GqlRepository extends GqlPulseFields, GqlDetail {}

export interface GqlOwner {
  __typename: "Organization" | "User";
  login: string;
  url: string;
  name: string | null;
  description?: string | null;
  bio?: string | null;
  websiteUrl: string | null;
}

export interface RepositoryFacts {
  repo: RepoFacts;
  release: ReleaseFacts | null;
  releases: ReleaseEntry[];
  claim: string[];
  openIssues: number;
  contributors: ActiveContributors | null;
  platforms: Platform[];
}

export interface MappedRepository extends Omit<RepositoryFacts, "contributors"> {
  annotatedTag: string | null;
  head: string | null;
}

type PulseRepo = Omit<RepoFacts, "topics">;

interface Pulse {
  repo: PulseRepo;
  claim: string[];
  openIssues: number;
  head: string | null;
}

interface Seen extends Pulse {
  newest: string | null;
}

interface Detail {
  topics: string[];
  release: ReleaseFacts | null;
  annotatedTag: string | null;
  releases: ReleaseEntry[];
  platforms: Platform[];
}

const PULSE = `
fragment Pulse on Repository {
  nameWithOwner description homepageUrl
  primaryLanguage { name }
  licenseInfo { spdxId }
  stargazerCount forkCount
  issues(states: OPEN) { totalCount }
  isArchived isFork isPrivate createdAt pushedAt
  defaultBranchRef { name target { ... on Commit { oid } } }
  newest: releases(first: 1, orderBy: {field: CREATED_AT, direction: DESC}) { nodes { tagName } }
}`;

const DETAIL = `
fragment Signed on GitObject { __typename oid ... on Commit { signature { isValid } } }
fragment Detail on Repository {
  nameWithOwner
  repositoryTopics(first: 20) { nodes { topic { name } } }
  latestRelease { tagName publishedAt url tag { target { ...Signed } } releaseAssets(first: 100) { nodes { name } } }
  tags: refs(refPrefix: "refs/tags/", first: 1, orderBy: {field: ALPHABETICAL, direction: DESC}) { nodes { name target { ...Signed } } }
  releases(first: ${RELEASE_HISTORY}, orderBy: {field: CREATED_AT, direction: DESC}) {
    nodes { tagName name description publishedAt url isPrerelease isDraft }
  }
}`;

export function pulseQuery(tools: readonly Pick<Tool, "repository" | "path">[]): {
  query: string;
  variables: Record<string, string>;
} {
  const declarations: string[] = [];
  const fields: string[] = [];
  const variables: Record<string, string> = {};
  tools.forEach((tool, i) => {
    const [owner = "", name = ""] = repoPath(tool.repository).split("/");
    variables[`o${i}`] = owner;
    variables[`n${i}`] = name;
    variables[`c${i}`] = `HEAD:${MAINTAINER_FILE}`;
    declarations.push(`$o${i}: String!`, `$n${i}: String!`, `$c${i}: String!`);
    let claimAt = "";
    if (tool.path) {
      variables[`p${i}`] = `HEAD:${tool.path}/${MAINTAINER_FILE}`;
      declarations.push(`$p${i}: String!`);
      claimAt = ` claimAt: object(expression: $p${i}) { ... on Blob { text } }`;
    }
    fields.push(
      `r${i}: repository(owner: $o${i}, name: $n${i}) { ...Pulse claim: object(expression: $c${i}) { ... on Blob { text } }${claimAt} }`,
    );
  });
  return { query: aliasedQuery(declarations, fields, PULSE), variables };
}

export function detailQuery(fullNames: readonly string[]): { query: string; variables: Record<string, string> } {
  const declarations: string[] = [];
  const variables: Record<string, string> = {};
  const fields = fullNames.map((fullName, i) => {
    const [owner = "", name = ""] = fullName.split("/");
    variables[`o${i}`] = owner;
    variables[`n${i}`] = name;
    declarations.push(`$o${i}: String!`, `$n${i}: String!`);
    return `r${i}: repository(owner: $o${i}, name: $n${i}) { ...Detail }`;
  });
  return { query: aliasedQuery(declarations, fields, DETAIL), variables };
}

export function ownerQuery(logins: readonly string[]): { query: string; variables: Record<string, string> } {
  const variables: Record<string, string> = {};
  const fields = logins.map((login, i) => {
    variables[`l${i}`] = login;
    return `o${i}: repositoryOwner(login: $l${i}) { __typename login url ... on Organization { name description websiteUrl } ... on User { name bio websiteUrl } }`;
  });
  const declarations = logins.map((_, i) => `$l${i}: String!`);
  return { query: `query(${declarations.join(", ")}) {\n  rateLimit { cost remaining }\n  ${fields.join("\n  ")}\n}`, variables };
}

function signedCommit(target: GitObject | undefined): boolean {
  return target?.__typename === "Commit" && target.signature?.isValid === true;
}

function annotated(target: GitObject | undefined): string | null {
  return target?.__typename === "Tag" ? target.oid : null;
}

function withTopics({ fullName, description, homepage, language, license, stars, forks, ...rest }: PulseRepo, topics: string[]): RepoFacts {
  return { fullName, description, homepage, language, license, stars, forks, topics, ...rest };
}

function mapPulse(node: GqlPulseFields): Pulse {
  const repo: PulseRepo = {
    fullName: node.nameWithOwner,
    description: node.description,
    homepage: websiteOf(node.homepageUrl),
    language: node.primaryLanguage?.name ?? null,
    license: licenseOf(node.licenseInfo ? { spdx_id: node.licenseInfo.spdxId } : null),
    stars: node.stargazerCount,
    forks: node.forkCount,
    archived: node.isArchived,
    fork: node.isFork,
    private: node.isPrivate,
    createdAt: node.createdAt,
    pushedAt: node.pushedAt ?? node.createdAt,
    defaultBranch: node.defaultBranchRef?.name ?? "main",
  };
  const claim = [node.claim, node.claimAt].flatMap((blob) => (blob?.text ? claimedSlugs(blob.text) : []));
  return { repo, claim, openIssues: node.issues.totalCount, head: node.defaultBranchRef?.target?.oid ?? null };
}

function readPulse(node: GqlPulse): Seen {
  return { ...mapPulse(node), newest: node.newest.nodes[0]?.tagName ?? null };
}

function mapDetail(node: GqlDetail): Detail {
  const fullName = node.nameWithOwner;
  let release: ReleaseFacts | null = null;
  let annotatedTag: string | null = null;
  const latest = node.latestRelease;
  const tag = node.tags.nodes[0];
  if (latest) {
    const target = latest.tag?.target;
    release = { tag: latest.tagName, publishedAt: latest.publishedAt, url: latest.url, source: "release", signed: signedCommit(target) };
    annotatedTag = annotated(target);
  } else if (tag) {
    release = {
      tag: tag.name,
      publishedAt: null,
      url: `https://github.com/${fullName}/releases/tag/${encodeRef(tag.name)}`,
      source: "tag",
      signed: signedCommit(tag.target),
    };
    annotatedTag = annotated(tag.target);
  }

  const releases = node.releases.nodes
    .filter((r) => !r.isDraft)
    .slice(0, RELEASE_HISTORY)
    .map((r) =>
      releaseEntry({
        tag: r.tagName,
        name: r.name,
        body: r.description ?? "",
        publishedAt: r.publishedAt,
        url: r.url,
        prerelease: r.isPrerelease,
      }),
    );

  return {
    topics: node.repositoryTopics.nodes.map((n) => n.topic.name).sort(),
    release,
    annotatedTag,
    releases,
    platforms: platformsOf(latest?.releaseAssets.nodes.map((asset) => asset.name) ?? []),
  };
}

function joined({ repo, claim, openIssues, head }: Pulse, { topics, release, annotatedTag, releases, platforms }: Detail): MappedRepository {
  return { repo: withTopics(repo, topics), release, annotatedTag, releases, claim, openIssues, head, platforms };
}

function carried(pulse: Pulse, before: EnrichedTool): MappedRepository {
  return joined(pulse, {
    topics: before.repo.topics,
    release: before.release,
    annotatedTag: null,
    releases: before.releases,
    platforms: before.platforms ?? [],
  });
}

export function mapRepository(node: GqlRepository): MappedRepository {
  return joined(mapPulse(node), mapDetail(node));
}

export function mapOwner(node: GqlOwner): OwnerFacts {
  const organization = node.__typename === "Organization";
  return {
    login: node.login,
    kind: organization ? "organization" : "user",
    name: organization && node.name === node.login ? null : trimmed(node.name),
    bio: trimmed(organization ? node.description : node.bio),
    website: websiteOf(node.websiteUrl),
    url: node.url,
  };
}

export async function readRepositories(
  gql: GraphQL,
  tools: readonly Tool[],
  now: Date,
  published: ReadonlyMap<string, EnrichedTool> = new Map(),
  shape = REPOSITORY_SHAPE,
): Promise<Read<MappedRepository>[]> {
  const pulses = everyRead(await aliasedBatches(gql, tools, shape, { alias: "r", query: pulseQuery, read: readPulse, failures: "throw" }));
  const settled = tools.map((tool, i): Read<MappedRepository> | Seen => {
    const pulse = pulses[i] ?? GONE;
    if (pulse.status !== "read") return pulse;
    const before = published.get(tool.slug);
    return isCurrent(before, pulse.value, now) ? { status: "read", value: carried(pulse.value, before) } : pulse.value;
  });
  const due = settled.filter((entry): entry is Seen => !("status" in entry));
  console.log(`repositories: ${due.length} of ${tools.length} read in full`);
  const details = everyRead(
    await aliasedBatches(gql, due.map((seen) => seen.repo.fullName), shape, { alias: "r", query: detailQuery, read: mapDetail, failures: "throw" }),
  );
  let next = 0;
  return settled.map((entry) => {
    if ("status" in entry) return entry;
    const detail = details[next++] ?? GONE;
    return detail.status === "read" ? { status: "read", value: joined(entry, detail.value) } : detail;
  });
}

async function signedRelease(
  gh: GitHub,
  fullName: string,
  release: ReleaseFacts,
  tagOid: string,
  published: ReleaseFacts | null | undefined,
): Promise<ReleaseFacts> {
  if (published?.tag === release.tag && published.tagOid === tagOid) return { ...release, tagOid, signed: published.signed };
  return { ...release, tagOid, signed: await isAnnotatedTagSigned(gh, fullName, tagOid) };
}

async function releasesOf(
  gh: GitHub,
  tools: readonly Tool[],
  mapped: readonly Read<MappedRepository>[],
  published: ReadonlyMap<string, ReleaseFacts | null>,
): Promise<(ReleaseFacts | null)[]> {
  return mapLimit(tools, SIGNATURE_CONCURRENCY, async (tool, i) => {
    const entry = mapped[i] ?? GONE;
    if (entry.status !== "read") return null;
    const { release, annotatedTag, repo } = entry.value;
    if (!release || !annotatedTag) return release;
    return signedRelease(gh, repo.fullName, release, annotatedTag, published.get(tool.slug));
  });
}

export interface Previous {
  releases?: ReadonlyMap<string, ReleaseFacts | null>;
  windows?: ReadonlyMap<string, CommitWindow>;
}

export interface Completed {
  facts: Map<string, Read<RepositoryFacts>>;
  windows: Map<string, CommitWindow>;
}

export async function completeRepositories(
  gql: GraphQL,
  gh: GitHub,
  tools: readonly Tool[],
  mapped: readonly Read<MappedRepository>[],
  now: Date,
  previous: Previous = {},
): Promise<Completed> {
  const heads = mapped.map((entry) => (entry.status === "read" && entry.value.head ? { fullName: entry.value.repo.fullName, head: entry.value.head } : null));
  const [walked, releases] = await Promise.all([
    timed("history", () => walkContributors(gql, heads, previous.windows ?? new Map(), now)),
    timed("signatures", () => releasesOf(gh, tools, mapped, previous.releases ?? new Map())),
  ]);
  const facts = new Map(
    tools.map((tool, i): [string, Read<RepositoryFacts>] => {
      const entry = mapped[i] ?? GONE;
      if (entry.status !== "read") return [tool.slug, entry];
      const { head: _, annotatedTag: __, ...rest } = entry.value;
      return [
        tool.slug,
        {
          status: "read",
          value: {
            ...rest,
            release: releases[i] ?? null,
            platforms: tool.path ? [] : rest.platforms,
            contributors: walked.contributors[i] ?? null,
          },
        },
      ];
    }),
  );
  return { facts, windows: walked.windows };
}

export async function fetchRepositories(
  gql: GraphQL,
  gh: GitHub,
  tools: readonly Tool[],
  now: Date,
  published: ReadonlyMap<string, ReleaseFacts | null> = new Map(),
  shape = REPOSITORY_SHAPE,
): Promise<Map<string, Read<RepositoryFacts>>> {
  const mapped = await readRepositories(gql, tools, now, new Map(), shape);
  return (await completeRepositories(gql, gh, tools, mapped, now, { releases: published })).facts;
}

export async function fetchOwnerFacts(gql: GraphQL, logins: readonly string[], shape = OWNER_SHAPE): Promise<Map<string, Read<OwnerFacts>>> {
  const owners = everyRead(await aliasedBatches(gql, logins, shape, { alias: "o", query: ownerQuery, read: mapOwner, failures: "throw" }));
  return new Map(logins.map((login, i) => [login, owners[i] ?? GONE]));
}
