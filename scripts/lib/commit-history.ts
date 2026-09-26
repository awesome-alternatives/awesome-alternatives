import { advance, hasMore, HISTORY_PAGE_SIZE, HISTORY_PAGES, type HistoryPage, type HistoryWalk, stop } from "./contributors.ts";
import type { GraphQL } from "./graphql.ts";
import { type AliasedBatch, aliasedBatches, aliasedQuery, BatchRejected, type BatchShape, describeErrors, type Outcome } from "./graphql-batch.ts";

export const HISTORY_SHAPE: BatchShape = { size: 10, concurrency: 3 };

interface GqlHistoryPage {
  object: { history?: HistoryPage } | null;
}

export function historyPageQuery(walks: readonly HistoryWalk[], since: string): { query: string; variables: Record<string, string> } {
  const declarations = ["$since: GitTimestamp!"];
  const fields: string[] = [];
  const variables: Record<string, string> = { since };
  walks.forEach((walk, i) => {
    const [owner = "", name = ""] = walk.fullName.split("/");
    Object.assign(variables, { [`o${i}`]: owner, [`n${i}`]: name, [`h${i}`]: walk.head });
    declarations.push(`$o${i}: String!`, `$n${i}: String!`, `$h${i}: GitObjectID!`);
    let after = "";
    if (walk.cursor) {
      variables[`a${i}`] = walk.cursor;
      declarations.push(`$a${i}: String!`);
      after = `, after: $a${i}`;
    }
    fields.push(
      `r${i}: repository(owner: $o${i}, name: $n${i}) { object(oid: $h${i}) { ... on Commit { history(first: ${HISTORY_PAGE_SIZE}, since: $since${after}) { ...Page } } } }`,
    );
  });
  const fragment = "fragment Page on CommitHistoryConnection { pageInfo { hasNextPage endCursor } nodes { author { name email user { login } } } }";
  return { query: aliasedQuery(declarations, fields, fragment), variables };
}

function nextWalk(walk: HistoryWalk, page: Outcome<HistoryPage | null>): HistoryWalk {
  if (page.status === "read" && page.value) return advance(walk, page.value);
  if (page.status === "failed") {
    const outcome = walk.pages ? `its count stops at page ${walk.pages}` : "published without an active contributor count";
    console.error(`${walk.fullName}: commit history unreadable (${describeErrors(page.errors)}), ${outcome}`);
  }
  return stop(walk);
}

export async function walkHistories(
  gql: GraphQL,
  walks: readonly (HistoryWalk | null)[],
  since: string,
  shape: BatchShape = HISTORY_SHAPE,
): Promise<(HistoryWalk | null)[]> {
  const current = [...walks];
  const spec: AliasedBatch<HistoryWalk, GqlHistoryPage, HistoryPage | null> = {
    alias: "r",
    query: (batch) => historyPageQuery(batch, since),
    read: (node) => node.object?.history ?? null,
    failures: "report",
  };
  for (let round = 0; round < HISTORY_PAGES; round++) {
    const pending = current.flatMap((walk, index) => (walk && hasMore(walk) ? [{ walk, index }] : []));
    if (!pending.length) break;
    const pages = await aliasedBatches(gql, pending.map(({ walk }) => walk), shape, spec);
    const failures = pages.flatMap((page) => (page.status === "failed" ? page.errors : []));
    if (pending.length > 1 && pages.every((page) => page.status === "failed")) throw new BatchRejected(failures);
    pending.forEach(({ walk, index }, i) => {
      const page = pages[i];
      if (page) current[index] = nextWalk(walk, page);
    });
  }
  return current;
}
