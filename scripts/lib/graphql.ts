import { canWait, type Clock, isSecondaryRateLimit, patientFetch, pause, SYSTEM_CLOCK, toldWait, UNTOLD_RATE_LIMIT_WAIT_MS } from "./rate-limit.ts";

export interface GraphQLErrorEntry {
  type?: string;
  path?: (string | number)[];
  extensions?: Record<string, unknown>;
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

interface Body<T> {
  data?: (T & RateLimited) | null;
  errors?: GraphQLErrorEntry[];
}

const ENDPOINT = "https://api.github.com/graphql";

function isRateLimitError(error: GraphQLErrorEntry): boolean {
  return error.type === "RATE_LIMITED" || isSecondaryRateLimit(error.message);
}

async function bodyOf<T>(res: Response): Promise<Body<T>> {
  try {
    return JSON.parse(await res.text()) as Body<T>;
  } catch (error) {
    throw new GraphQLTransportError(0, error instanceof Error ? error.message : String(error));
  }
}

export function createGraphQL(token: string | undefined, fetchImpl: typeof fetch = fetch, clock: Clock = SYSTEM_CLOCK): GraphQL {
  const spend: GraphQLSpend = { queries: 0, cost: 0, remaining: null };
  const send = patientFetch(fetchImpl, clock);
  const headers: Record<string, string> = {
    "content-type": "application/json",
    "user-agent": "awesome-alternatives-verifier",
  };
  if (token) headers.authorization = `Bearer ${token}`;
  return {
    async query<T>(query: string, variables: Record<string, string>) {
      for (let attempt = 1; ; attempt++) {
        spend.queries++;
        const res = await send(ENDPOINT, { method: "POST", headers, body: JSON.stringify({ query, variables }) });
        if (!res.ok) throw new GraphQLTransportError(res.status, (await res.text()).slice(0, 200));
        const body = await bodyOf<T>(res);
        const limited = body.errors?.find(isRateLimitError);
        if (limited) {
          const wait = toldWait(res.headers, clock.now()) ?? UNTOLD_RATE_LIMIT_WAIT_MS;
          if (!canWait(wait, attempt)) throw new GraphQLTransportError(res.status, limited.message.slice(0, 200));
          await pause(clock, wait, ENDPOINT, `${limited.type ?? res.status} ${limited.message}`, attempt);
          continue;
        }
        const rateLimit = body.data?.rateLimit;
        if (rateLimit) {
          spend.cost += rateLimit.cost;
          spend.remaining = rateLimit.remaining;
          console.log(`graphql query ${spend.queries}: cost ${rateLimit.cost}, ${rateLimit.remaining} left`);
        }
        return { data: body.data ?? null, errors: body.errors ?? [] };
      }
    },
    spent: () => ({ ...spend }),
  };
}
