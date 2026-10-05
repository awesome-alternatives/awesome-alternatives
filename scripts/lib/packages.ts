import type { RepositoryFacts } from "./facts-graphql.ts";
import type { Read, ReleaseFacts, Tool } from "./types.ts";

const REGISTRY = "https://registry.npmjs.org";
const NPM = "npm:";
const TIMEOUT_MS = 30_000;

interface Packument {
  "dist-tags"?: { latest?: string };
  time?: Record<string, string>;
}

export async function fetchPackageRelease(spec: string, fetchImpl: typeof fetch = fetch): Promise<ReleaseFacts | null> {
  if (!spec.startsWith(NPM)) throw new Error(`${spec} names no supported registry`);
  const name = spec.slice(NPM.length);
  const res = await fetchImpl(`${REGISTRY}/${name.replace("/", "%2F")}`, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`npm answered ${res.status} for ${name}`);
  const packument = (await res.json()) as Packument;
  const version = packument["dist-tags"]?.latest;
  if (!version) return null;
  return {
    tag: version,
    publishedAt: packument.time?.[version] ?? null,
    url: `https://www.npmjs.com/package/${name}/v/${version}`,
    source: "package",
    signed: false,
  };
}

async function packageRelease(
  slug: string,
  spec: string,
  fallback: ReleaseFacts | null,
  fetchImpl: typeof fetch,
): Promise<ReleaseFacts | null> {
  try {
    return (await fetchPackageRelease(spec, fetchImpl)) ?? fallback;
  } catch (error) {
    console.error(`${slug}: ${(error as Error).message}, kept ${fallback ? fallback.tag : "no version"}`);
    return fallback;
  }
}

export async function withPackageReleases(
  tools: readonly Tool[],
  facts: ReadonlyMap<string, Read<RepositoryFacts>>,
  published: ReadonlyMap<string, ReleaseFacts | null>,
  fetchImpl: typeof fetch = fetch,
): Promise<Map<string, Read<RepositoryFacts>>> {
  const out = new Map(facts);
  for (const tool of tools) {
    const read = out.get(tool.slug);
    if (!tool.package || read?.status !== "read") continue;
    const before = published.get(tool.slug);
    const fallback = before?.source === "package" ? before : read.value.release;
    const release = await packageRelease(tool.slug, tool.package, fallback, fetchImpl);
    out.set(tool.slug, { status: "read", value: { ...read.value, release } });
  }
  return out;
}
