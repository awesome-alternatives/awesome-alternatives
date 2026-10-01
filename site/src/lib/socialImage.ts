import { stars } from "./format.ts";

export interface SocialCard {
  label: string;
  title: string;
  lines: string[];
}

interface CardTool {
  name: string;
  repo: { stars: number; language: string | null; license: string | null };
}

const LISTED = 3;

export function socialImagePath(canonicalPath: string): string {
  return `/og${canonicalPath.replace(/\/$/, "")}.png`;
}

export function namesList(names: readonly string[], listed = LISTED): string {
  if (names.length <= 1) return names.join("");
  if (names.length <= listed) return `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
  return `${names.slice(0, listed).join(", ")} and ${names.length - listed} more`;
}

export function toolCard(tool: CardTool, category: string, replaces: readonly string[]): SocialCard {
  const facts = [`${stars(tool.repo.stars)} stars`, tool.repo.language, tool.repo.license].filter(Boolean).join(", ");
  return {
    label: `Open source ${category}`,
    title: tool.name,
    lines: [replaces.length ? `Replaces ${namesList(replaces)}` : "", facts].filter(Boolean),
  };
}

export function alternativesCard(name: string, alternatives: readonly string[]): SocialCard {
  return {
    label: "Open source alternatives",
    title: `Alternatives to ${name}`,
    lines: [alternatives.length === 1 ? alternatives.join("") : `${alternatives.length} tools: ${namesList(alternatives)}`],
  };
}

export function migrationCard(from: string, to: string): SocialCard {
  return {
    label: "Migration guide",
    title: `${from} to ${to}`,
    lines: ["Compatibility, steps and pitfalls, from the official guide"],
  };
}

export function titleSize(title: string): number {
  if (title.length <= 14) return 104;
  if (title.length <= 22) return 84;
  if (title.length <= 32) return 68;
  return 56;
}

const OG_IMAGE = /<meta property="og:image" content="([^"]+)"/;

export function missingImages(
  pages: readonly { path: string; html: string }[],
  exists: (path: string) => boolean,
): { page: string; image: string }[] {
  return pages.flatMap(({ path, html }) => {
    const url = OG_IMAGE.exec(html)?.[1];
    if (!url) return [];
    const image = new URL(url).pathname;
    return exists(image) ? [] : [{ page: path, image }];
  });
}
