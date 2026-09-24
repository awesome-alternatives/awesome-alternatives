import type { Finding, Product, Tool } from "./types.ts";

const TIMEOUT_MS = 15_000;
const USER_AGENT = "awesome-alternatives-validate (+https://awesome-alternatives.com/contribute/)";

export async function unreachable(url: string, fetchImpl: typeof fetch = fetch): Promise<string | null> {
  try {
    const res = await fetchImpl(url, {
      headers: { "user-agent": USER_AGENT },
      redirect: "follow",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    await res.body?.cancel();
    return res.ok ? null : `${url} answered ${res.status}`;
  } catch (e) {
    return `${url} did not answer: ${(e as Error).message}`;
  }
}

export async function checkHomepage(
  product: Pick<Product, "slug" | "homepage">,
  fetchImpl: typeof fetch = fetch,
): Promise<Finding[]> {
  const problem = await unreachable(product.homepage, fetchImpl);
  return problem
    ? [{ slug: product.slug, severity: "warning", code: "homepage-unreachable", message: `${problem}, check it in a browser` }]
    : [];
}

export async function checkCapabilityDocs(
  tool: Pick<Tool, "slug" | "capabilities">,
  fetchImpl: typeof fetch = fetch,
): Promise<Finding[]> {
  const findings: Finding[] = [];
  for (const [key, capability] of Object.entries(tool.capabilities ?? {})) {
    const problem = await unreachable(capability.docs, fetchImpl);
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
  fetchImpl: typeof fetch = fetch,
): Promise<Finding[]> {
  const findings: Finding[] = [];
  for (const replacement of tool.replaces ?? []) {
    if (!replacement.migration) continue;
    const problem = await unreachable(replacement.migration, fetchImpl);
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
