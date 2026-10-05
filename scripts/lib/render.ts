import type { Category, EnrichedTool, ListedProduct } from "./types.ts";

export const START = "<!-- catalog:start -->";
export const END = "<!-- catalog:end -->";

export function renderCatalog(
  tools: readonly EnrichedTool[],
  products: readonly ListedProduct[],
  categories: ReadonlyMap<string, Category>,
): string {
  const bySlug = new Map<string, { name: string }>([...tools, ...products].map((t) => [t.slug, t]));
  const sections: string[] = [];

  for (const [key, category] of categories) {
    const members = tools.filter((t) => t.category === key).sort((a, b) => b.repo.stars - a.repo.stars);
    if (members.length) sections.push(...categorySection(category, members, bySlug));
  }

  return sections.join("\n").trimEnd();
}

type Names = ReadonlyMap<string, { name: string }>;

function categorySection(category: Category, members: readonly EnrichedTool[], bySlug: Names): string[] {
  const count = members.length === 1 ? "1 tool" : `${members.length} tools`;
  return [
    "<details>",
    `<summary><b>${category.name}</b>, ${count}</summary>`,
    "",
    category.description,
    "",
    "| Tool | Language | Licence | Latest | Stars | Replaces |",
    "|---|---|---|---|---:|---|",
    ...members.map((t) => toolRow(t, bySlug)),
    "",
    "</details>",
    "",
  ];
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
