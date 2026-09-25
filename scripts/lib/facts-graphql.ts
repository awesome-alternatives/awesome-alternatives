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
import { walkHistories } from "./commit-history.ts";
import { activeSince, contributorsOf, startWalk } from "./contributors.ts";
import { mapLimit } from "./gather.ts";
import { type GitHub, repoPath } from "./github.ts";
import type { GraphQL } from "./graphql.ts";
import { aliasOf, BatchRejected, inBatches } from "./graphql-batch.ts";
import { platformsOf } from "./platforms.ts";
import type { ActiveContributors, OwnerFacts, Platform, ReleaseEntry, ReleaseFacts, RepoFacts, Tool } from "./types.ts";

export const REPOSITORY_BATCH = 20;
export const OWNER_BATCH = 100;

type GitObject =
  | { __typename: "Commit"; oid: string; signature: { isValid: boolean } | null }
  | { __typename: "Tag" | "Tree" | "Blob"; oid: string };

interface Blob {
  text?: string | null;
}

export interface GqlRepository {
  nameWithOwner: string;
  description: string | null;
  homepageUrl: string | null;
  primaryLanguage: { name: string } | null;
  licenseInfo: { spdxId: string | null } | null;
  stargazerCount: number;
  forkCount: number;
  issues: { totalCount: number };
  repositoryTopics: { nodes: { topic: { name: string } }[] };
  isArchived: boolean;
  isFork: boolean;
  isPrivate: boolean;
  createdAt: string;
  pushedAt: string | null;
  defaultBranchRef: { name: string; target: { oid?: string } | null } | null;
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
  claim: Blob | null;
  claimAt?: Blob | null;
}

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

const FRAGMENTS = `
fragment Signed on GitObject { __typename oid ... on Commit { signature { isValid } } }
fragment Facts on Repository {
  nameWithOwner description homepageUrl
  primaryLanguage { name }
  licenseInfo { spdxId }
  stargazerCount forkCount
  issues(states: OPEN) { totalCount }
  repositoryTopics(first: 20) { nodes { topic { name } } }
  isArchived isFork isPrivate createdAt pushedAt
  defaultBranchRef { name target { ... on Commit { oid } } }
  latestRelease { tagName publishedAt url tag { target { ...Signed } } releaseAssets(first: 100) { nodes { name } } }
  tags: refs(refPrefix: "refs/tags/", first: 1, orderBy: {field: ALPHABETICAL, direction: DESC}) { nodes { name target { ...Signed } } }
  releases(first: ${RELEASE_HISTORY}, orderBy: {field: CREATED_AT, direction: DESC}) {
    nodes { tagName name description publishedAt url isPrerelease isDraft }
  }
}`;

export function repositoryQuery(tools: readonly Pick<Tool, "repository" | "path">[]): {
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
      `r${i}: repository(owner: $o${i}, name: $n${i}) { ...Facts claim: object(expression: $c${i}) { ... on Blob { text } }${claimAt} }`,
    );
  });
  return {
    query: `query(${declarations.join(", ")}) {\n  rateLimit { cost remaining }\n  ${fields.join("\n  ")}\n}\n${FRAGMENTS}`,
    variables,
  };
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

export function mapRepository(node: GqlRepository): MappedRepository {
  const fullName = node.nameWithOwner;
  const repo: RepoFacts = {
    fullName,
    description: node.description,
    homepage: websiteOf(node.homepageUrl),
    language: node.primaryLanguage?.name ?? null,
    license: licenseOf(node.licenseInfo ? { spdx_id: node.licenseInfo.spdxId } : null),
    stars: node.stargazerCount,
    forks: node.forkCount,
    topics: node.repositoryTopics.nodes.map((n) => n.topic.name).sort(),
    archived: node.isArchived,
    fork: node.isFork,
    private: node.isPrivate,
    createdAt: node.createdAt,
    pushedAt: node.pushedAt ?? node.createdAt,
    defaultBranch: node.defaultBranchRef?.name ?? "main",
  };

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

  const claim = [node.claim, node.claimAt].flatMap((blob) => (blob?.text ? claimedSlugs(blob.text) : []));
  const head = node.defaultBranchRef?.target?.oid ?? null;
  const platforms = platformsOf(latest?.releaseAssets.nodes.map((asset) => asset.name) ?? []);

  return { repo, release, annotatedTag, releases, claim, openIssues: node.issues.totalCount, head, platforms };
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

export async function fetchRepositories(
  gql: GraphQL,
  gh: GitHub,
  tools: readonly Tool[],
  now: Date,
  size = REPOSITORY_BATCH,
): Promise<Map<string, RepositoryFacts | null>> {
  const mapped = await inBatches(tools, size, async (batch) => {
    const { query, variables } = repositoryQuery(batch);
    const { data, errors } = await gql.query<Record<string, GqlRepository | null>>(query, variables);
    const missing = new Set(errors.filter((e) => e.type === "NOT_FOUND").map(aliasOf));
    const fatal = errors.filter((e) => e.type !== "NOT_FOUND" || !aliasOf(e));
    if (fatal.length || !data) throw new BatchRejected(fatal.length ? fatal : [{ message: "no data" }]);
    return batch.map((_, i) => {
      const node = data[`r${i}`];
      return node && !missing.has(`r${i}`) ? mapRepository(node) : null;
    });
  });

  const histories = await walkHistories(
    gql,
    mapped.map((entry) => (entry?.head ? startWalk(entry.repo.fullName, entry.head) : null)),
    activeSince(now),
  );
  const counted = mapped.map((entry, i) => {
    if (!entry) return null;
    const { head: _, ...rest } = entry;
    const walked = histories[i];
    const platforms = tools[i]?.path ? [] : rest.platforms;
    return { ...rest, platforms, contributors: walked ? contributorsOf(walked) : null };
  });
  const resolved = await mapLimit(counted, 4, async (entry): Promise<RepositoryFacts | null> => {
    if (!entry) return null;
    const { annotatedTag, ...facts } = entry;
    if (!annotatedTag || !facts.release) return facts;
    return { ...facts, release: { ...facts.release, signed: await isAnnotatedTagSigned(gh, facts.repo.fullName, annotatedTag) } };
  });
  return new Map(tools.map((tool, i) => [tool.slug, resolved[i] ?? null]));
}

export async function fetchOwnerFacts(gql: GraphQL, logins: readonly string[], size = OWNER_BATCH): Promise<Map<string, OwnerFacts>> {
  const owners = await inBatches(logins, size, async (batch) => {
    const { query, variables } = ownerQuery(batch);
    const { data, errors } = await gql.query<Record<string, GqlOwner | null>>(query, variables);
    const fatal = errors.filter((e) => e.type !== "NOT_FOUND");
    if (fatal.length || !data) throw new BatchRejected(fatal.length ? fatal : [{ message: "no data" }]);
    return batch.map((_, i) => data[`o${i}`] ?? null);
  });
  const out = new Map<string, OwnerFacts>();
  owners.forEach((owner, i) => {
    if (owner) out.set(logins[i] as string, mapOwner(owner));
  });
  return out;
}
