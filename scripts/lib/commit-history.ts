import { advance, hasMore, HISTORY_PAGE_SIZE, HISTORY_PAGES, type HistoryPage, type HistoryWalk } from "./contributors.ts";
import { mapLimit } from "./gather.ts";
import type { GraphQL } from "./graphql.ts";
import { aliasOf, BatchRejected, inBatches } from "./graphql-batch.ts";

const HISTORY_BATCH = 10;
const HISTORY_CONCURRENCY = 3;

interface GqlHistoryPage {
  object: { history?: HistoryPage } | null;
}

function historyPageQuery(
  walks: readonly HistoryWalk[],
  since: string,
): { query: string; variables: Record<string, string> } {
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
  return {
    query: `query(${declarations.join(", ")}) {\n  rateLimit { cost remaining }\n  ${fields.join("\n  ")}\n}\nfragment Page on CommitHistoryConnection { pageInfo { hasNextPage endCursor } nodes { author { name email user { login } } } }`,
    variables,
  };
}

function chunks<T>(items: readonly T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(items.length / size) }, (_, i) => items.slice(i * size, (i + 1) * size));
}

export async function walkHistories(
  gql: GraphQL,
  walks: readonly (HistoryWalk | null)[],
  since: string,
): Promise<(HistoryWalk | null)[]> {
  const current = [...walks];
  const nextPages = async (batch: readonly { walk: HistoryWalk }[]): Promise<HistoryWalk[]> => {
    const { query, variables } = historyPageQuery(batch.map((p) => p.walk), since);
    const { data, errors } = await gql.query<Record<string, GqlHistoryPage | null>>(query, variables);
    const fatal = errors.filter((e) => e.type !== "NOT_FOUND" || !aliasOf(e));
    if (fatal.length || !data) throw new BatchRejected(fatal.length ? fatal : [{ message: "no data" }]);
    return batch.map(({ walk }, i) => {
      const history = data[`r${i}`]?.object?.history;
      return history ? advance(walk, history) : walk;
    });
  };
  for (let round = 0; round < HISTORY_PAGES; round++) {
    const pending = current.flatMap((walk, index) => (walk && hasMore(walk) ? [{ walk, index }] : []));
    if (!pending.length) break;
    const advanced = (
      await mapLimit(chunks(pending, HISTORY_BATCH), HISTORY_CONCURRENCY, (chunk) => inBatches(chunk, HISTORY_BATCH, nextPages))
    ).flat();
    advanced.forEach((walk, i) => {
      const slot = pending[i];
      if (slot) current[slot.index] = walk;
    });
  }
  return current;
}
