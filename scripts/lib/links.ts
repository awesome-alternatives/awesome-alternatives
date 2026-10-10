import { TIMEOUT_MS, unsafeOrUnreachable, USER_AGENT } from "./safe-link.ts";
import type { Finding, Product, Tool } from "./types.ts";

export type LinkCheck = (url: string) => Promise<string | null>;

const safely: LinkCheck = (url) => unsafeOrUnreachable(url);

const ATTEMPTS = 3;
const BACKOFF_MS = 1000;

const pause = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function transient(status: number): boolean {
  return status === 429 || status >= 500;
}

export async function unreachable(
  url: string,
  fetchImpl: typeof fetch = fetch,
  wait: (ms: number) => Promise<void> = pause,
): Promise<string | null> {
  let problem = "";
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const res = await fetchImpl(url, {
        headers: { "user-agent": USER_AGENT },
        redirect: "follow",
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      await res.body?.cancel();
      if (res.ok) return null;
      problem = `${url} answered ${res.status}`;
      if (!transient(res.status)) return problem;
    } catch (e) {
      problem = `${url} did not answer: ${(e as Error).message}`;
    }
    if (attempt < ATTEMPTS) await wait(BACKOFF_MS * attempt);
  }
  return problem;
}

export async function checkHomepage(
  product: Pick<Product, "slug" | "homepage">,
  check: LinkCheck = safely,
): Promise<Finding[]> {
  const problem = await check(product.homepage);
  return problem
    ? [{ slug: product.slug, severity: "warning", code: "homepage-unreachable", message: `${problem}, check it in a browser` }]
    : [];
}

export async function checkCapabilityDocs(
  tool: Pick<Tool, "slug" | "capabilities">,
  check: LinkCheck = safely,
): Promise<Finding[]> {
  const findings: Finding[] = [];
  for (const [key, capability] of Object.entries(tool.capabilities ?? {})) {
    const problem = await check(capability.docs);
    if (problem) {
      findings.push({
        slug: tool.slug,
        severity: "error",
        code: "capability-unreachable",
        message: `the documentation for ${key}: ${problem}`,
      });
    }
  }
  return findings;
}

export async function checkMigrations(
  tool: Pick<Tool, "slug" | "replaces">,
  check: LinkCheck = safely,
): Promise<Finding[]> {
  const findings: Finding[] = [];
  for (const replacement of tool.replaces ?? []) {
    if (!replacement.migration) continue;
    const problem = await check(replacement.migration);
    if (problem) {
      findings.push({
        slug: tool.slug,
        severity: "error",
        code: "migration-unreachable",
        message: `the migration guide from ${replacement.tool}: ${problem}`,
      });
    }
  }
  return findings;
}
