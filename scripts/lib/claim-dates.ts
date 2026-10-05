import { claimedSlugs, claimLocations } from "./facts.ts";
import { readClaimFilesAnonymously } from "./facts-anonymous.ts";
import type { GitHub } from "./github.ts";
import type { GraphQL } from "./graphql.ts";
import { aliasedBatches, aliasedQuery, type BatchShape, describeErrors, type Outcome } from "./graphql-batch.ts";
import { type EnrichedTool, GONE, type Read, type RepoFacts, type Tool } from "./types.ts";

export const CLAIM_DATE_SHAPE: BatchShape = { size: 20, concurrency: 1 };

export interface ClaimFile {
  slugs: readonly string[];
  at: string | null;
}

interface History {
  nodes: { committedDate: string }[];
}

interface Blob {
  text?: string | null;
}

export interface GqlClaimDates {
  root: Blob | null;
  nested?: Blob | null;
  defaultBranchRef: { target: { root?: History; nested?: History } | null } | null;
}

export interface ClaimRead {
  claim: readonly string[];
  repo: Pick<RepoFacts, "fullName" | "defaultBranch">;
}

interface Claimed {
  slug: string;
  fullName: string;
  branch: string;
  path: string | null;
}

export function claimDatesQuery(claimed: readonly Pick<Claimed, "fullName" | "path">[]): { query: string; variables: Record<string, string> } {
  const declarations: string[] = [];
  const variables: Record<string, string> = {};
  const fields = claimed.map(({ fullName, path }, i) => {
    const [owner = "", name = ""] = fullName.split("/");
    const [root, nested] = claimLocations(path);
    variables[`o${i}`] = owner;
    variables[`n${i}`] = name;
    variables[`c${i}`] = `HEAD:${root}`;
    variables[`f${i}`] = root ?? "";
    declarations.push(`$o${i}: String!`, `$n${i}: String!`, `$c${i}: String!`, `$f${i}: String!`);
    let blobs = `root: object(expression: $c${i}) { ... on Blob { text } }`;
    let histories = `root: history(path: $f${i}, first: 1) { nodes { committedDate } }`;
    if (nested) {
      variables[`p${i}`] = `HEAD:${nested}`;
      variables[`q${i}`] = nested;
      declarations.push(`$p${i}: String!`, `$q${i}: String!`);
      blobs += ` nested: object(expression: $p${i}) { ... on Blob { text } }`;
      histories += ` nested: history(path: $q${i}, first: 1) { nodes { committedDate } }`;
    }
    return `r${i}: repository(owner: $o${i}, name: $n${i}) { ${blobs} defaultBranchRef { target { ... on Commit { ${histories} } } } }`;
  });
  return { query: aliasedQuery(declarations, fields), variables };
}

export function claimFilesOf(node: GqlClaimDates): ClaimFile[] {
  const target = node.defaultBranchRef?.target;
  return [
    { blob: node.root, history: target?.root },
    { blob: node.nested, history: target?.nested },
  ].map(({ blob, history }) => ({ slugs: blob?.text ? claimedSlugs(blob.text) : [], at: history?.nodes[0]?.committedDate ?? null }));
}

export function verifiedAtOf(slug: string, files: readonly ClaimFile[]): string | null {
  const times = files.flatMap((file) => (file.at && file.slugs.includes(slug) ? [Date.parse(file.at)] : [])).filter(Number.isFinite);
  return times.length ? new Date(Math.max(...times)).toISOString() : null;
}

function claimedTools(tools: readonly Tool[], mapped: readonly Read<ClaimRead>[]): Claimed[] {
  return tools.flatMap((tool, i) => {
    const read = mapped[i] ?? GONE;
    if (read.status !== "read" || !read.value.claim.includes(tool.slug)) return [];
    const { fullName, defaultBranch } = read.value.repo;
    return [{ slug: tool.slug, fullName, branch: defaultBranch, path: tool.path ?? null }];
  });
}

async function readOutcomes(gql: GraphQL, claimed: readonly Claimed[], shape: BatchShape): Promise<Outcome<ClaimFile[]>[]> {
  try {
    return await aliasedBatches(gql, claimed, shape, { alias: "r", query: claimDatesQuery, read: claimFilesOf, failures: "report" });
  } catch (error) {
    return claimed.map(() => ({ status: "failed", errors: [{ message: (error as Error).message }] }));
  }
}

async function settle(anonymous: GitHub, claimed: Claimed, outcome: Outcome<ClaimFile[]>, kept: string | null): Promise<string | null> {
  switch (outcome.status) {
    case "read":
      return verifiedAtOf(claimed.slug, outcome.value) ?? kept;
    case "behind-allow-list":
      try {
        return verifiedAtOf(claimed.slug, await readClaimFilesAnonymously(anonymous, claimed.fullName, claimed.branch, claimed.path)) ?? kept;
      } catch (error) {
        console.error(`${claimed.slug}: verification date unreadable without a token either (${(error as Error).message}), kept the published one`);
        return kept;
      }
    case "failed":
      console.error(`${claimed.slug}: verification date unreadable (${describeErrors(outcome.errors)}), kept the published one`);
      return kept;
    case "unreadable":
      console.error(`${claimed.slug}: verification date unreadable (${outcome.reason}), kept the published one`);
      return kept;
    case "gone":
      return kept;
  }
}

export async function readVerifiedAt(
  gql: GraphQL,
  anonymous: GitHub,
  tools: readonly Tool[],
  mapped: readonly Read<ClaimRead>[],
  published: ReadonlyMap<string, Pick<EnrichedTool, "verifiedAt">>,
  shape = CLAIM_DATE_SHAPE,
): Promise<Map<string, string | null>> {
  const claimed = claimedTools(tools, mapped);
  if (claimed.length === 0) return new Map();
  const outcomes = await readOutcomes(gql, claimed, shape);
  const dates = await Promise.all(
    claimed.map((entry, i) => settle(anonymous, entry, outcomes[i] ?? GONE, published.get(entry.slug)?.verifiedAt ?? null)),
  );
  return new Map(claimed.map((entry, i) => [entry.slug, dates[i] ?? null]));
}
