import { toQuery } from "./query.ts";
import type { Filters, Readme, SearchResult, SecurityReport, ToolList } from "./types.ts";

const API_URL = (import.meta.env.PUBLIC_API_URL ?? "/api").replace(/\/+$/, "");

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function send<T>(path: string, init: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, init);
  if (!response.ok) {
    const body: { error?: string } = await response.json().catch(() => ({}));
    throw new ApiError(response.status, body.error ?? `The API answered ${response.status}.`);
  }
  return response.json();
}

export function search(q: string, signal: AbortSignal): Promise<SearchResult> {
  return send("/v1/search", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ q }),
    signal,
  });
}

export function listTools(filters: Filters, signal: AbortSignal): Promise<ToolList> {
  return send(`/v1/tools?${toQuery(filters)}`, { signal });
}

export function readme(slug: string, signal: AbortSignal): Promise<Readme> {
  return send(`/v1/tools/${encodeURIComponent(slug)}/readme`, { signal });
}

export function security(slug: string, signal: AbortSignal): Promise<SecurityReport> {
  return send(`/v1/tools/${encodeURIComponent(slug)}/security`, { signal });
}
