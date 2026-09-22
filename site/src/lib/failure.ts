export type SearchFailure =
  | { kind: "unavailable" }
  | { kind: "timeout" }
  | { kind: "rate-limited"; retryAfter: number | null }
  | { kind: "rejected"; message: string };

export class SearchError extends Error {
  failure: SearchFailure;

  constructor(failure: SearchFailure) {
    super(describe(failure));
    this.failure = failure;
  }
}

export function parseRetryAfter(value: string | null, now: number): number | null {
  const raw = value?.trim();
  if (!raw) return null;
  if (/^\d+$/.test(raw)) return Number(raw);
  const at = /^[a-z]{3}, /i.test(raw) ? Date.parse(raw) : Number.NaN;
  if (Number.isNaN(at)) return null;
  return Math.max(0, Math.ceil((at - now) / 1000));
}

export function failureFromResponse(
  status: number,
  body: unknown,
  retryAfter: string | null,
  now: number,
): SearchFailure {
  if (status === 429) return { kind: "rate-limited", retryAfter: parseRetryAfter(retryAfter, now) };
  if (status >= 500) return { kind: "unavailable" };
  return { kind: "rejected", message: errorMessage(body) ?? `The search was refused (${status}).` };
}

export function failureFromThrown(error: unknown): SearchFailure {
  if (error instanceof SearchError) return error.failure;
  if (error instanceof DOMException && error.name === "TimeoutError") return { kind: "timeout" };
  return { kind: "unavailable" };
}

export function offersFallback(failure: SearchFailure): boolean {
  return failure.kind === "unavailable" || failure.kind === "timeout";
}

export function describe(failure: SearchFailure): string {
  switch (failure.kind) {
    case "unavailable":
      return "Search is unavailable right now. Every tool page still works without it.";
    case "timeout":
      return "Search took too long to answer. Every tool page still works without it.";
    case "rate-limited":
      return failure.retryAfter === null
        ? "Too many searches from your connection. Wait a minute and try again."
        : `Too many searches from your connection. Try again in ${seconds(failure.retryAfter)}.`;
    case "rejected":
      return failure.message;
  }
}

export function guessTarget(query: string, names: Record<string, string>): string | null {
  const text = query.toLowerCase();
  let best: { slug: string; length: number } | null = null;
  for (const [slug, name] of Object.entries(names)) {
    for (const candidate of new Set([slug, name.toLowerCase()])) {
      if (mentions(text, candidate) && candidate.length > (best?.length ?? 0)) {
        best = { slug, length: candidate.length };
      }
    }
  }
  return best?.slug ?? null;
}

function mentions(text: string, word: string): boolean {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9])${escaped}($|[^a-z0-9])`).test(text);
}

function errorMessage(body: unknown): string | null {
  if (typeof body !== "object" || body === null || !("error" in body)) return null;
  const { error } = body;
  return typeof error === "string" && error.trim() ? error : null;
}

function seconds(count: number): string {
  return count <= 1 ? "1 second" : `${count} seconds`;
}
