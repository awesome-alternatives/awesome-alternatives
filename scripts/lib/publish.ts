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

export async function readPublished(root: string): Promise<Snapshot> {
  return JSON.parse(await readFile(join(root, CATALOG_PATH), "utf8")) as Snapshot;
}

export async function publish(root: string, catalog: Catalog, { checkedAt, owners, tools }: Snapshot): Promise<void> {
  const products: ListedProduct[] = catalog.products
    .map(({ file: _, ...product }) => product)
    .sort((a, b) => a.slug.localeCompare(b.slug));
  const categories = Object.fromEntries(catalog.categories);

  await writeFile(
    join(root, CATALOG_PATH),
    `${JSON.stringify({ stats: statsOf(tools), checkedAt, owners, tools, products, categories }, null, 2)}\n`,
  );

  const readmePath = join(root, "README.md");
  const readme = await readFile(readmePath, "utf8");
  await writeFile(readmePath, spliceReadme(readme, renderCatalog(tools, products, catalog.categories)));
}
