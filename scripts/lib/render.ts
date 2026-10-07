import type { Category, EnrichedTool, ListedProduct } from "./types.ts";

export const START = "<!-- catalog:start -->";
export const END = "<!-- catalog:end -->";
export const CATALOG_DIR = "catalog";

export interface RenderedCatalog {
  index: string;
  pages: ReadonlyMap<string, string>;
}

type Names = ReadonlyMap<string, { name: string }>;

export function renderCatalog(
  tools: readonly EnrichedTool[],
  products: readonly ListedProduct[],
  categories: ReadonlyMap<string, Category>,
): RenderedCatalog {
  const bySlug: Names = new Map([...tools, ...products].map((t) => [t.slug, t]));
  const rows: string[] = [];
  const pages = new Map<string, string>();

  for (const [key, category] of categories) {
    const members = tools.filter((t) => t.category === key).sort((a, b) => b.repo.stars - a.repo.stars);
    if (!members.length) continue;
    pages.set(`${CATALOG_DIR}/${key}.md`, categoryPage(category, members, bySlug));
    rows.push(`| [${category.name}](${CATALOG_DIR}/${key}.md) | ${members.length} | ${category.description} |`);
  }

  return { index: ["| Category | Tools | What it covers |", "|---|---:|---|", ...rows].join("\n"), pages };
}

function categoryPage(category: Category, members: readonly EnrichedTool[], bySlug: Names): string {
  return [
    `# ${category.name}`,
    "",
    category.description,
    "",
    "| Tool | Language | Licence | Latest | Stars | Replaces |",
    "|---|---|---|---|---:|---|",
    ...members.map((t) => toolRow(t, bySlug)),
    "",
    "[All categories](../README.md#catalog)",
    "",
  ].join("\n");
}

function toolRow(t: EnrichedTool, bySlug: Names): string {
  const replaces = t.replaces.map((r) => `${bySlug.get(r.tool)?.name ?? r.tool} (${r.fit})`).join(", ");
  return `| ${nameCell(t)} | ${t.repo.language ?? "unknown"} | ${t.repo.license ?? "none"} | ${latestCell(t.release)} | ${t.repo.stars} | ${replaces || "none"} |`;
}

function nameCell(t: EnrichedTool): string {
  const link = `[${t.name}](${t.repository})`;
  const marks = [t.maintainerVerified && "verified", t.repo.archived && "archived"].filter(Boolean).join(" ");
  return marks ? `${link} ${marks}` : link;
}

function latestCell(release: EnrichedTool["release"]): string {
  if (!release) return "none";
  const link = `[${release.tag}](${release.url})`;
  return release.signed ? `${link} signed` : link;
}

export function spliceReadme(readme: string, body: string): string {
  const start = readme.indexOf(START);
  const end = readme.indexOf(END);
  if (start < 0 || end < start) throw new Error(`README is missing the ${START} / ${END} markers`);
  return `${readme.slice(0, start + START.length)}\n\n${body}\n\n${readme.slice(end)}`;
}
