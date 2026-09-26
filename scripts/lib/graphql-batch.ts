import { chunks, mapLimit } from "./gather.ts";
import { isAllowListRefusal } from "./github.ts";
import { type GraphQL, type GraphQLErrorEntry, type GraphQLResponse, GraphQLTransportError } from "./graphql.ts";
import { BEHIND_ALLOW_LIST, GONE, type Read } from "./types.ts";

export function describeErrors(errors: readonly GraphQLErrorEntry[]): string {
  return [...new Set(errors.map((e) => (e.path?.length ? `${e.path.join(".")}: ${e.message}` : e.message)))].join("; ");
}

export class BatchRejected extends Error {
  constructor(errors: readonly GraphQLErrorEntry[]) {
    super(`GitHub GraphQL rejected the batch: ${describeErrors(errors)}`);
  }
}

export interface Failed {
  status: "failed";
  errors: readonly GraphQLErrorEntry[];
}

export type Outcome<T> = Read<T> | Failed;

export interface AliasedQuery {
  query: string;
  variables: Record<string, string>;
}

export interface AliasedBatch<I, N, T> {
  alias: string;
  query(batch: readonly I[]): AliasedQuery;
  read(node: N): T;
  failures: "throw" | "report";
}

export interface BatchShape {
  size: number;
  concurrency: number;
}

export function aliasedQuery(declarations: readonly string[], fields: readonly string[], fragments = ""): string {
  return `query(${declarations.join(", ")}) {\n  rateLimit { cost remaining }\n  ${fields.join("\n  ")}\n}\n${fragments}`;
}

export function aliasOf(error: GraphQLErrorEntry): string | undefined {
  const [alias] = error.path ?? [];
  return typeof alias === "string" ? alias : undefined;
}

const DIGITS = /^\d+$/;

function isAliasOf(prefix: string, alias: string): boolean {
  return alias.startsWith(prefix) && DIGITS.test(alias.slice(prefix.length));
}

function isQueryError(error: GraphQLErrorEntry): boolean {
  return typeof error.extensions?.code === "string" || aliasOf(error) === "query";
}

export function isAllowListError(error: GraphQLErrorEntry): boolean {
  return error.type === "FORBIDDEN" && isAllowListRefusal(error.message);
}

function outcomeOf<N, T>(node: N | null | undefined, errors: readonly GraphQLErrorEntry[], read: (node: N) => T): Outcome<T> {
  if (errors.some((e) => e.type !== "NOT_FOUND" && !isAllowListError(e))) return { status: "failed", errors };
  if (errors.some(isAllowListError)) return BEHIND_ALLOW_LIST;
  if (errors.length || !node) return GONE;
  return { status: "read", value: read(node) };
}

function failed<I, N, T>(spec: AliasedBatch<I, N, T>, errors: readonly GraphQLErrorEntry[]): Failed {
  if (spec.failures === "throw") throw new BatchRejected(errors);
  return { status: "failed", errors };
}

async function apart<I, N, T>(
  gql: GraphQL,
  batch: readonly I[],
  spec: AliasedBatch<I, N, T>,
  errors: readonly GraphQLErrorEntry[],
): Promise<Outcome<T>[]> {
  if (batch.length === 1) return [failed(spec, errors)];
  const half = Math.ceil(batch.length / 2);
  console.log(`graphql batch of ${batch.length} failed (${describeErrors(errors)}), retrying in halves`);
  return [...(await aliasedBatch(gql, batch.slice(0, half), spec)), ...(await aliasedBatch(gql, batch.slice(half), spec))];
}

export async function aliasedBatch<I, N, T>(gql: GraphQL, batch: readonly I[], spec: AliasedBatch<I, N, T>): Promise<Outcome<T>[]> {
  let answer: GraphQLResponse<Record<string, N | null>>;
  try {
    const { query, variables } = spec.query(batch);
    answer = await gql.query<Record<string, N | null>>(query, variables);
  } catch (error) {
    if (!(error instanceof GraphQLTransportError && error.retriable)) throw error;
    return apart(gql, batch, spec, [{ message: error.message }]);
  }

  const byAlias = new Map<string, GraphQLErrorEntry[]>();
  const global: GraphQLErrorEntry[] = [];
  for (const error of answer.errors) {
    const alias = aliasOf(error);
    if (alias && isAliasOf(spec.alias, alias)) byAlias.set(alias, [...(byAlias.get(alias) ?? []), error]);
    else global.push(error);
  }
  if (global.some(isQueryError)) throw new BatchRejected(global);
  const { data } = answer;
  if (global.length || !data) return apart(gql, batch, spec, global.length ? global : [{ message: "no data" }]);

  const answered = batch.map((item, i) => {
    const alias = `${spec.alias}${i}`;
    return { item, outcome: outcomeOf(data[alias], byAlias.get(alias) ?? [], spec.read) };
  });
  if (batch.length === 1) return answered.map(({ outcome }) => (outcome.status === "failed" ? failed(spec, outcome.errors) : outcome));
  const settled: Outcome<T>[] = [];
  for (const { item, outcome } of answered) {
    if (outcome.status === "failed") settled.push(...(await aliasedBatch(gql, [item], spec)));
    else settled.push(outcome);
  }
  return settled;
}

export async function aliasedBatches<I, N, T>(
  gql: GraphQL,
  items: readonly I[],
  shape: BatchShape,
  spec: AliasedBatch<I, N, T>,
): Promise<Outcome<T>[]> {
  return (await mapLimit(chunks(items, shape.size), shape.concurrency, (batch) => aliasedBatch(gql, batch, spec))).flat();
}

export function everyRead<T>(outcomes: readonly Outcome<T>[]): Read<T>[] {
  const reads: Read<T>[] = [];
  const errors: GraphQLErrorEntry[] = [];
  for (const outcome of outcomes) {
    if (outcome.status === "failed") errors.push(...outcome.errors);
    else reads.push(outcome);
  }
  if (errors.length) throw new BatchRejected(errors);
  return reads;
}
