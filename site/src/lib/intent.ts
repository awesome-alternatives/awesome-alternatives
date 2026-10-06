import { format, type Locale, type Plural, plural } from "../i18n/index.ts";
import { fitFor } from "./filter.ts";
import type { ToolView } from "./types.ts";

type Listed = Pick<ToolView, "name" | "terms" | "replaces" | "repo">;

export interface TargetStrings {
  title: Plural;
  titleOpen: Plural;
  namesSuffix: string;
  description: string;
  named: string;
  namedMore: string;
  namesSeparator: string;
  dropIns: string;
}

export interface CategoryStrings {
  title: Plural;
  titleOpen: Plural;
  titleSelfHost: Plural;
  description: string;
  descriptionSelfHost: string;
}

export function allOpen(tools: readonly Pick<ToolView, "terms">[]): boolean {
  return tools.length > 0 && tools.every((tool) => tool.terms === "open");
}

export function lowerFirst(name: string): string {
  const [first = "", second = ""] = name;
  return second === second.toLowerCase() ? first.toLowerCase() + name.slice(1) : name;
}

export function targetTitle(locale: Locale, strings: TargetStrings, name: string, tools: readonly Listed[]): string {
  return plural(locale, allOpen(tools) ? strings.titleOpen : strings.title, tools.length, { name });
}

export function targetPageTitle(locale: Locale, strings: TargetStrings, name: string, tools: readonly Listed[]): string {
  const base = targetTitle(locale, strings, name, tools);
  const list = new Intl.ListFormat(locale, { type: "conjunction" });
  const names = tools.slice(0, PAGE_TITLE_NAMES).map((tool) => tool.name);
  const titles = names.map((_, i) => base + format(strings.namesSuffix, { names: list.format(names.slice(0, i + 1)) }));
  return titles.findLast((title) => title.length <= TITLE_MAX) ?? base;
}

export function targetDescription(
  locale: Locale,
  strings: TargetStrings,
  name: string,
  target: string,
  tools: readonly Listed[],
): string {
  const languages = [...new Set(tools.flatMap((tool) => tool.repo.language ?? []))];
  const base = format(strings.description, { count: tools.length, name, languages: languages.join(", ") });
  const named = tools.slice(0, DESCRIPTION_NAMES).map((tool) => tool.name);
  const more = tools.length > named.length;
  const list = more ? named.join(strings.namesSeparator) : new Intl.ListFormat(locale, { type: "conjunction" }).format(named);
  const lead = format(more ? strings.namedMore : strings.named, { names: list });
  const dropIns = tools.filter((tool) => fitFor(tool, target) === "drop-in").map((tool) => tool.name);
  const parts = [...(named.length > 0 ? [lead] : []), base];
  if (dropIns.length > 0) parts.push(format(strings.dropIns, { names: dropIns.join(", ") }));
  return parts.join(SENTENCE_GAP[locale] ?? " ");
}

export function categoryTitle(
  locale: Locale,
  strings: CategoryStrings,
  category: { name: string; selfHost?: boolean },
  tools: readonly Pick<ToolView, "terms">[],
): string {
  return plural(locale, categoryTitleForms(strings, category, tools), tools.length, {
    name: category.name,
    lower: lowerFirst(category.name),
  });
}

function categoryTitleForms(
  strings: CategoryStrings,
  category: { selfHost?: boolean },
  tools: readonly Pick<ToolView, "terms">[],
): Plural {
  if (category.selfHost) return strings.titleSelfHost;
  return allOpen(tools) ? strings.titleOpen : strings.title;
}

export function categoryDescription(
  strings: CategoryStrings,
  category: { description: string; selfHost?: boolean },
  count: number,
): string {
  return format(category.selfHost ? strings.descriptionSelfHost : strings.description, {
    description: category.description,
    count,
  });
}

type Described = { slug: string; name: string; repo: { description: string | null } };

export function toolDescription(tool: Described, tools: readonly Described[], fallback: string): string {
  const description = tool.repo.description?.trim();
  if (!description) return fallback;
  const shared = tools.some((other) => other.slug !== tool.slug && other.repo.description?.trim() === description);
  return shared ? `${tool.name}: ${description}` : description;
}

export interface ToolTitleStrings {
  title: string;
  titleFallbackLanguage: string;
  titleReplaces: string;
  titleReplacesOpen: string;
}

type Titled = Pick<ToolView, "name" | "terms" | "replaces"> & { repo: { language: string | null } };

const FIT_RANK = { "drop-in": 0, full: 1, partial: 2 } as const;
const TITLE_TARGETS = 2;
const TITLE_MAX = 70;
const PAGE_TITLE_NAMES = 2;
const DESCRIPTION_NAMES = 3;
const SENTENCE_GAP: Partial<Record<Locale, string>> = { ja: "" };

export function toolTitle(
  locale: Locale,
  strings: ToolTitleStrings,
  tool: Titled,
  category: string,
  nameOf: (slug: string) => string,
): string {
  if (tool.replaces.length === 0) {
    return format(strings.title, {
      name: tool.name,
      language: tool.repo.language ?? strings.titleFallbackLanguage,
      category,
    });
  }
  const names = [...tool.replaces]
    .sort((a, b) => FIT_RANK[a.fit] - FIT_RANK[b.fit])
    .slice(0, TITLE_TARGETS)
    .map((r) => nameOf(r.tool));
  const list = new Intl.ListFormat(locale, { type: "conjunction" });
  const template = tool.terms === "open" ? strings.titleReplacesOpen : strings.titleReplaces;
  const titles = names.map((_, i) => format(template, { name: tool.name, targets: list.format(names.slice(0, i + 1)) }));
  return titles.findLast((title) => title.length <= TITLE_MAX) ?? titles[0];
}
