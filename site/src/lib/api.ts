import { SearchError, failureFromResponse, failureFromThrown } from "./failure.ts";
import { toQuery } from "./query.ts";
import type { Filters, Readme, SearchResult, SecurityReport, ToolList } from "./types.ts";

const API_URL = (import.meta.env.PUBLIC_API_URL ?? "/api").replace(/\/+$/, "");
const TIMEOUT_MS = 15_000;

async function send<T>(path: string, init: RequestInit & { signal: AbortSignal }): Promise<T> {
  const signal = AbortSignal.any([init.signal, AbortSignal.timeout(TIMEOUT_MS)]);
  try {
    const response = await fetch(`${API_URL}${path}`, { ...init, signal });
    if (!response.ok) {
      const body: unknown = await response.json().catch(() => null);
      throw new SearchError(
        failureFromResponse(response.status, body, response.headers.get("retry-after"), Date.now()),
      );
    }
    return await response.json();
  } catch (error) {
    if (init.signal.aborted) throw error;
    throw new SearchError(failureFromThrown(error));
  }
}

export function search(q: string, signal: AbortSignal): Promise<SearchResult> {
  return send("/v1/search", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ q }),
    signal,
  });
}

export const LIST_LIMIT = 200;

export function listTools(filters: Filters, signal: AbortSignal): Promise<ToolList> {
  return send(`/v1/tools?${toQuery(filters)}&limit=${LIST_LIMIT}`, { signal });
}

export function readme(slug: string, signal: AbortSignal): Promise<Readme> {
  return send(`/v1/tools/${encodeURIComponent(slug)}/readme`, { signal });
}

export function security(slug: string, signal: AbortSignal): Promise<SecurityReport> {
  return send(`/v1/tools/${encodeURIComponent(slug)}/security`, { signal });
}
