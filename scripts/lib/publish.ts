import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { Catalog } from "./catalog.ts";
import { renderCatalog, spliceReadme } from "./render.ts";
import { statsOf } from "./stats.ts";
import type { EnrichedTool, ListedProduct, OwnerFacts } from "./types.ts";

export const CATALOG_PATH = "generated/catalog.json";

export interface Snapshot {
  checkedAt: string;
  owners: Record<string, OwnerFacts>;
  tools: EnrichedTool[];
}

export class LostTools extends Error {
  readonly slugs: string[];

  constructor(slugs: string[]) {
    super(
      `${slugs.join(", ")}: in the published catalog and still in data/tools, but this run got nothing for ${slugs.length === 1 ? "it" : "them"} from GitHub, so nothing was written. If a repository is gone for good, remove its entry in a pull request.`,
    );
    this.slugs = slugs;
  }
}

type Slugged = { slug: string };

export function lostTools(published: readonly Slugged[], declared: readonly Slugged[], next: readonly Slugged[]): string[] {
  const listed = new Set(declared.map((t) => t.slug));
  const kept = new Set(next.map((t) => t.slug));
  return published
    .map((t) => t.slug)
    .filter((slug) => listed.has(slug) && !kept.has(slug))
    .sort((a, b) => a.localeCompare(b));
}

export async function readPublished(root: string): Promise<Snapshot> {
  return JSON.parse(await readFile(join(root, CATALOG_PATH), "utf8")) as Snapshot;
}

export async function publish(root: string, catalog: Catalog, { checkedAt, owners, tools }: Snapshot): Promise<void> {
  const lost = lostTools((await readPublished(root)).tools, catalog.tools, tools);
  if (lost.length) throw new LostTools(lost);

  const products: ListedProduct[] = catalog.products
    .map(({ file: _, ...product }) => product)
    .sort((a, b) => a.slug.localeCompare(b.slug));
  const categories = Object.fromEntries(catalog.categories);
  const readmePath = join(root, "README.md");
  const readme = spliceReadme(await readFile(readmePath, "utf8"), renderCatalog(tools, products, catalog.categories));

  await writeFile(
    join(root, CATALOG_PATH),
    `${JSON.stringify({ stats: statsOf(tools), checkedAt, owners, tools, products, categories }, null, 2)}\n`,
  );
  await writeFile(readmePath, readme);
}

export async function publishOrExplain(root: string, catalog: Catalog, snapshot: Snapshot): Promise<boolean> {
  try {
    await publish(root, catalog, snapshot);
    return true;
  } catch (error) {
    if (!(error instanceof LostTools)) throw error;
    console.error(error.message);
    process.exitCode = 1;
    return false;
  }
}
