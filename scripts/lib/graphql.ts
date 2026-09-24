export interface GraphQLErrorEntry {
  type?: string;
  path?: (string | number)[];
  message: string;
}

export interface GraphQLResponse<T> {
  data: T | null;
  errors: GraphQLErrorEntry[];
}

export interface GraphQLSpend {
  queries: number;
  cost: number;
  remaining: number | null;
}

export interface GraphQL {
  query<T>(query: string, variables: Record<string, string>): Promise<GraphQLResponse<T>>;
  spent(): GraphQLSpend;
}

export class GraphQLTransportError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(status ? `GitHub GraphQL answered ${status}: ${message}` : `GitHub GraphQL answer unreadable: ${message}`);
    this.status = status;
  }

  get retriable(): boolean {
    return this.status === 0 || this.status >= 500;
  }
}

interface RateLimited {
  rateLimit?: { cost: number; remaining: number } | null;
}

const ENDPOINT = "https://api.github.com/graphql";

export function createGraphQL(token: string | undefined, fetchImpl: typeof fetch = fetch): GraphQL {
  const spend: GraphQLSpend = { queries: 0, cost: 0, remaining: null };
  return {
    async query<T>(query: string, variables: Record<string, string>) {
      const headers: Record<string, string> = {
        "content-type": "application/json",
        "user-agent": "awesome-alternatives-verifier",
      };
      if (token) headers.authorization = `Bearer ${token}`;
      spend.queries++;
      const res = await fetchImpl(ENDPOINT, { method: "POST", headers, body: JSON.stringify({ query, variables }) });
      if (!res.ok) throw new GraphQLTransportError(res.status, (await res.text()).slice(0, 200));
      const body = await res.json().catch((error: unknown) => {
        throw new GraphQLTransportError(0, (error as Error).message);
      }) as { data?: (T & RateLimited) | null; errors?: GraphQLErrorEntry[] };
      const rateLimit = body.data?.rateLimit;
      if (rateLimit) {
        spend.cost += rateLimit.cost;
        spend.remaining = rateLimit.remaining;
        console.log(`graphql query ${spend.queries}: cost ${rateLimit.cost}, ${rateLimit.remaining} left`);
      }
      return { data: body.data ?? null, errors: body.errors ?? [] };
    },
    spent: () => ({ ...spend }),
  };
}
