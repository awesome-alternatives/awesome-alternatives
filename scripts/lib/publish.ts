import { mkdir, readdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { loadCategoryRedirects } from "./catalog.ts";
import { type EventHistory, EVENTS_PATH, eventsJson, nextEventLog, PENDING_GRACE_DAYS, readEventLog } from "./event-log.ts";
import type { ListedCatalog } from "./listed.ts";
import { CATALOG_DIR, renderCatalog, spliceReadme } from "./render.ts";
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

const NUMBER_ARRAY = /\[\n\s+(-?\d+(?:,\n\s+-?\d+)*)\n\s*\]/g;

export function catalogJson(catalog: unknown): string {
  const indented = JSON.stringify(catalog, null, 2);
  const compacted = indented.replace(NUMBER_ARRAY, (_, numbers: string) => `[${numbers.replaceAll(/,\s+/g, ",")}]`);
  return `${compacted}\n`;
}

export async function readPublished(root: string): Promise<Snapshot> {
  return JSON.parse(await readFile(join(root, CATALOG_PATH), "utf8")) as Snapshot;
}

export interface PublishContext {
  now: Date;
  history: EventHistory | null;
}

async function writeTogether(root: string, files: readonly (readonly [string, string])[]): Promise<void> {
  await Promise.all(files.map(([path]) => mkdir(join(root, dirname(path)), { recursive: true })));
  await Promise.all(files.map(([path, content]) => writeFile(join(root, `${path}.tmp`), content)));
  for (const [path] of files) await rename(join(root, `${path}.tmp`), join(root, path));
}

async function removeStalePages(root: string, kept: ReadonlySet<string>): Promise<void> {
  const present = await readdir(join(root, CATALOG_DIR)).catch(() => []);
  await Promise.all(
    present
      .map((name) => `${CATALOG_DIR}/${name}`)
      .filter((path) => path.endsWith(".md") && !kept.has(path))
      .map((path) => rm(join(root, path))),
  );
}

export async function publish(
  root: string,
  catalog: ListedCatalog,
  { checkedAt, owners, tools }: Snapshot,
  { now = new Date(), history = null }: Partial<PublishContext> = {},
): Promise<void> {
  const previous = await readPublished(root);
  const lost = lostTools(previous.tools, catalog.tools, tools);
  if (lost.length) throw new LostTools(lost);

  const { events, unresolved } = nextEventLog(await readEventLog(root), previous.tools, tools, now, history);
  if (unresolved.length) {
    console.error(
      `${unresolved.length} events older than ${PENDING_GRACE_DAYS} days are on no commit of ${EVENTS_PATH}, so they link to the day instead of the commit. Commit links need the refresh commits to stay on main as they were pushed, not squashed or rewritten.`,
    );
  }

  const products: ListedProduct[] = catalog.products
    .map(({ file: _, ...product }) => product)
    .sort((a, b) => a.slug.localeCompare(b.slug));
  const categories = Object.fromEntries(catalog.categories);
  const banned = catalog.banned;
  const categoryRedirects = await loadCategoryRedirects(root);
  const { index, pages } = renderCatalog(tools, products, catalog.categories);
  const readme = spliceReadme(await readFile(join(root, "README.md"), "utf8"), index);

  await writeTogether(root, [
    [CATALOG_PATH, catalogJson({ stats: statsOf(tools), checkedAt, owners, tools, products, banned, categories, categoryRedirects })],
    [EVENTS_PATH, eventsJson(events)],
    ["README.md", readme],
    ...pages,
  ]);
  await removeStalePages(root, new Set(pages.keys()));
}

export async function publishOrExplain(
  root: string,
  catalog: ListedCatalog,
  snapshot: Snapshot,
  context?: PublishContext,
): Promise<boolean> {
  try {
    await publish(root, catalog, snapshot, context);
    return true;
  } catch (error) {
    if (!(error instanceof LostTools)) throw error;
    console.error(error.message);
    process.exitCode = 1;
    return false;
  }
}
