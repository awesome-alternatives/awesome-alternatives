export interface Clock {
  now(): number;
  sleep(ms: number): Promise<void>;
}

export const SYSTEM_CLOCK: Clock = {
  now: () => Date.now(),
  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
};

export const MAX_RATE_LIMIT_WAIT_MS = 60_000;
export const RATE_LIMIT_ATTEMPTS = 4;
export const UNTOLD_RATE_LIMIT_WAIT_MS = 60_000;

const SECONDARY_RATE_LIMIT = /secondary rate limit/i;
const SECONDS = /^\d+$/;

function seconds(value: string | null): number | null {
  return value !== null && SECONDS.test(value.trim()) ? Number(value) : null;
}

export function isSecondaryRateLimit(message: string): boolean {
  return SECONDARY_RATE_LIMIT.test(message);
}

export function toldWait(headers: Headers, now: number): number | null {
  const retryAfter = seconds(headers.get("retry-after"));
  if (retryAfter !== null) return retryAfter * 1000;
  const reset = seconds(headers.get("x-ratelimit-reset"));
  return headers.get("x-ratelimit-remaining") === "0" && reset !== null ? Math.max(0, reset * 1000 - now) : null;
}

export function rateLimitWait(res: Response, body: string, now: number): number | null {
  if (res.status !== 403 && res.status !== 429) return null;
  return toldWait(res.headers, now) ?? (isSecondaryRateLimit(body) ? UNTOLD_RATE_LIMIT_WAIT_MS : null);
}

export function canWait(wait: number | null, attempt: number): wait is number {
  return wait !== null && wait <= MAX_RATE_LIMIT_WAIT_MS && attempt < RATE_LIMIT_ATTEMPTS;
}

export async function pause(clock: Clock, wait: number, what: string, reason: string, attempt: number): Promise<void> {
  console.log(`GitHub rate limit on ${what} (${reason.slice(0, 120)}): waiting ${Math.ceil(wait / 1000)} s before attempt ${attempt + 1}`);
  await clock.sleep(wait);
}

function urlOf(input: string | URL | Request): string {
  return input instanceof Request ? input.url : String(input);
}

export function patientFetch(fetchImpl: typeof fetch, clock: Clock = SYSTEM_CLOCK): typeof fetch {
  return async (input, init) => {
    for (let attempt = 1; ; attempt++) {
      const res = await fetchImpl(input, init);
      if (res.status !== 403 && res.status !== 429) return res;
      const body = await res.clone().text();
      const wait = rateLimitWait(res, body, clock.now());
      if (!canWait(wait, attempt)) return res;
      await pause(clock, wait, urlOf(input), `${res.status} ${body}`, attempt);
    }
  };
}
