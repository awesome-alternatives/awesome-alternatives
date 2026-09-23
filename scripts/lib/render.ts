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
    if (!members.length) continue;
    const count = members.length === 1 ? "1 tool" : `${members.length} tools`;
    sections.push("<details>", `<summary><b>${category.name}</b>, ${count}</summary>`, "", category.description, "");
    sections.push("| Tool | Language | Licence | Latest | Stars | Replaces |", "|---|---|---|---|---:|---|");
    for (const t of members) {
      const replaces = t.replaces
        .map((r) => `${bySlug.get(r.tool)?.name ?? r.tool} (${r.fit})`)
        .join(", ");
      const latest = t.release ? `[${t.release.tag}](${t.release.url})${t.release.signed ? " signed" : ""}` : "none";
      const marks = [t.maintainerVerified && "verified", t.repo.archived && "archived"].filter(Boolean).join(" ");
      const name = `[${t.name}](${t.repository})${marks ? ` ${marks}` : ""}`;
      sections.push(
        `| ${name} | ${t.repo.language ?? "unknown"} | ${t.repo.license ?? "none"} | ${latest} | ${t.repo.stars} | ${replaces || "none"} |`,
      );
    }
    sections.push("", "</details>", "");
  }

  return sections.join("\n").trimEnd();
}

export function spliceReadme(readme: string, body: string): string {
  const start = readme.indexOf(START);
  const end = readme.indexOf(END);
  if (start < 0 || end < start) throw new Error(`README is missing the ${START} / ${END} markers`);
  return `${readme.slice(0, start + START.length)}\n\n${body}\n\n${readme.slice(end)}`;
}
