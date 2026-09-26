import { isAllowListRefusal } from "./github.ts";
import { type GraphQLErrorEntry, GraphQLTransportError } from "./graphql.ts";

export class BatchRejected extends Error {
  constructor(errors: readonly GraphQLErrorEntry[]) {
    const described = errors.map((e) => (e.path?.length ? `${e.path.join(".")}: ${e.message}` : e.message));
    super(`GitHub GraphQL rejected the batch: ${[...new Set(described)].join("; ")}`);
  }
}

export async function inBatches<T, R>(items: readonly T[], size: number, run: (batch: readonly T[]) => Promise<R[]>): Promise<R[]> {
  const out: R[] = [];
  for (let start = 0; start < items.length; start += size) {
    out.push(...(await splitting(items.slice(start, start + size), run)));
  }
  return out;
}

async function splitting<T, R>(batch: readonly T[], run: (batch: readonly T[]) => Promise<R[]>): Promise<R[]> {
  try {
    return await run(batch);
  } catch (error) {
    const retriable = error instanceof BatchRejected || (error instanceof GraphQLTransportError && error.retriable);
    if (!retriable || batch.length === 1) throw error;
    const half = Math.ceil(batch.length / 2);
    console.log(`graphql batch of ${batch.length} failed (${(error as Error).message}), retrying in halves`);
    return [...(await splitting(batch.slice(0, half), run)), ...(await splitting(batch.slice(half), run))];
  }
}

export function aliasOf(error: GraphQLErrorEntry): string | undefined {
  const [alias] = error.path ?? [];
  return typeof alias === "string" ? alias : undefined;
}

export function isAllowListError(error: GraphQLErrorEntry): boolean {
  return error.type === "FORBIDDEN" && isAllowListRefusal(error.message);
}
