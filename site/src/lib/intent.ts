import { format, type Locale, type Plural, plural } from "../i18n/index.ts";
import { fitFor } from "./filter.ts";
import type { ToolView } from "./types.ts";

type Listed = Pick<ToolView, "name" | "terms" | "replaces" | "repo">;

export interface TargetStrings {
  title: Plural;
  titleOpen: Plural;
  description: string;
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

export function targetDescription(
  strings: TargetStrings,
  name: string,
  target: string,
  tools: readonly Listed[],
): string {
  const languages = [...new Set(tools.flatMap((tool) => tool.repo.language ?? []))];
  const base = format(strings.description, { count: tools.length, name, languages: languages.join(", ") });
  const dropIns = tools.filter((tool) => fitFor(tool, target) === "drop-in").map((tool) => tool.name);
  return dropIns.length > 0 ? `${base} ${format(strings.dropIns, { names: dropIns.join(", ") })}` : base;
}

export function categoryTitle(
  locale: Locale,
  strings: CategoryStrings,
  category: { name: string; selfHost?: boolean },
  tools: readonly Pick<ToolView, "terms">[],
): string {
  const forms = category.selfHost ? strings.titleSelfHost : allOpen(tools) ? strings.titleOpen : strings.title;
  return plural(locale, forms, tools.length, { name: category.name, lower: lowerFirst(category.name) });
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
