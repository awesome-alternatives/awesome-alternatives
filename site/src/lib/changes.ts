import { INACTIVE_DAYS } from "../../../scripts/lib/rules.ts";
import type { CatalogEvent, EnrichedTool } from "../../../scripts/lib/types.ts";
import { format, type Locale, type Messages, plural } from "../i18n/index.ts";
import type { FeedItem } from "./feed.ts";
import { REPO } from "./repo.ts";

export const CHANGES_PAGE_SIZE = 200;
export const CHANGES_FEED_SIZE = 50;
export const ADDED_NAMES_SHOWN = 30;

export type ChangeStrings = Messages["changes"];

export function newestFirst(events: readonly CatalogEvent[]): CatalogEvent[] {
  return [...events].sort((a, b) => b.at.localeCompare(a.at) || a.slug.localeCompare(b.slug) || a.type.localeCompare(b.type));
}

export function eventsOfTool(events: readonly CatalogEvent[], slug: string): CatalogEvent[] {
  return events.filter((event) => event.slug === slug);
}

export function eventsOfCategory(
  events: readonly CatalogEvent[],
  tools: readonly Pick<EnrichedTool, "slug" | "category">[],
  category: string,
): CatalogEvent[] {
  const members = new Set(tools.filter((tool) => tool.category === category).map((tool) => tool.slug));
  return events.filter((event) => members.has(event.slug));
}

export type ChangeEntry =
  | { kind: "event"; day: string; event: CatalogEvent }
  | { kind: "additions"; day: string; at: string; slugs: string[] };

function dayOf(event: CatalogEvent): string {
  return event.at.slice(0, 10);
}

export function changeEntries(events: readonly CatalogEvent[], groupAdditions: boolean): ChangeEntry[] {
  const days = new Map<string, CatalogEvent[]>();
  for (const event of newestFirst(events)) {
    const ofDay = days.get(dayOf(event)) ?? [];
    ofDay.push(event);
    days.set(dayOf(event), ofDay);
  }
  return [...days].flatMap(([day, ofDay]): ChangeEntry[] => {
    const single = (event: CatalogEvent): ChangeEntry => ({ kind: "event", day, event });
    const added = ofDay.filter((event) => event.type === "added");
    const [newest] = added;
    if (!groupAdditions || added.length < 2 || !newest) return ofDay.map(single);
    return [
      ...ofDay.filter((event) => event.type !== "added").map(single),
      { kind: "additions", day, at: newest.at, slugs: added.map((event) => event.slug).sort() },
    ];
  });
}

export interface DayOfChanges {
  day: string;
  entries: ChangeEntry[];
}

export function changeDays(events: readonly CatalogEvent[], limit = CHANGES_PAGE_SIZE): DayOfChanges[] {
  const days: DayOfChanges[] = [];
  for (const entry of changeEntries(events, true).slice(0, limit)) {
    const last = days.at(-1);
    if (last?.day === entry.day) last.entries.push(entry);
    else days.push({ day: entry.day, entries: [entry] });
  }
  return days;
}

export function daySourceUrl(day: string): string {
  return `${REPO}/commits/main/generated/events.json?since=${day}&until=${day}`;
}

export function sourceUrl(event: Pick<CatalogEvent, "at" | "commit">): string {
  return event.commit ? `${REPO}/commit/${event.commit}` : daySourceUrl(event.at.slice(0, 10));
}

export function sourceLabel(event: Pick<CatalogEvent, "commit">, strings: ChangeStrings): string {
  return event.commit ? strings.commit : strings.commitsOfDay;
}

export interface Sentence {
  before: string;
  name: string;
  after: string;
}

function values(event: CatalogEvent, strings: ChangeStrings): Record<string, string | number> {
  switch (event.type) {
    case "license-changed":
      return { from: event.from ?? strings.noLicense, to: event.to ?? strings.noLicense };
    case "renamed":
      return { from: event.from, to: event.to };
    case "released":
      return { to: event.to };
    case "inactive":
      return { days: INACTIVE_DAYS };
    case "added":
    case "removed":
    case "archived":
    case "unarchived":
    case "reactivated":
      return {};
  }
}

export function sentence(event: CatalogEvent, strings: ChangeStrings, name: string): Sentence {
  const text = format(strings.events[event.type], values(event, strings));
  const cut = text.indexOf("{name}");
  return { before: text.slice(0, cut), name, after: text.slice(cut + "{name}".length) };
}

export function sentenceText({ before, name, after }: Sentence): string {
  return `${before}${name}${after}`;
}

export interface ChangeItem extends FeedItem {
  customData: string;
}

export function changeItem(
  event: CatalogEvent,
  strings: ChangeStrings,
  tool: Pick<EnrichedTool, "slug" | "name"> | null,
  link: (path: string) => string,
): ChangeItem {
  const text = sentenceText(sentence(event, strings, tool?.name ?? event.slug));
  return {
    title: text,
    link: link(tool ? `/tools/${tool.slug}/` : "/changes/"),
    pubDate: new Date(event.at),
    description: `${text} ${sourceLabel(event, strings)}: ${sourceUrl(event)}`,
    customData: `<guid isPermaLink="false">awesome-alternatives:${event.type}:${event.slug}:${event.at}</guid>`,
  };
}

export function additionsTitle(locale: Locale, strings: ChangeStrings, count: number): string {
  return plural(locale, strings.addedGroup, count);
}

export function additionsItem(
  entry: Extract<ChangeEntry, { kind: "additions" }>,
  locale: Locale,
  strings: ChangeStrings,
  nameOf: (slug: string) => string,
  link: (path: string) => string,
): ChangeItem {
  return {
    title: additionsTitle(locale, strings, entry.slugs.length),
    link: link(`/changes/#${entry.day}`),
    pubDate: new Date(entry.at),
    description: `${entry.slugs.map(nameOf).join(", ")}. ${strings.commitsOfDay}: ${daySourceUrl(entry.day)}`,
    customData: `<guid isPermaLink="false">awesome-alternatives:added:${entry.day}</guid>`,
  };
}

export interface ChangeChannel {
  title: string;
  description: string;
  site: string;
  items: ChangeItem[];
}

export interface ChannelInput {
  title: string;
  description: string;
  site: string;
  events: readonly CatalogEvent[];
  groupAdditions: boolean;
  locale: Locale;
  strings: ChangeStrings;
  toolOf: (slug: string) => Pick<EnrichedTool, "slug" | "name"> | null;
  link: (path: string) => string;
}

export function changeChannel(input: ChannelInput): ChangeChannel {
  const { title, description, site, events, groupAdditions, locale, strings, toolOf, link } = input;
  const nameOf = (slug: string) => toolOf(slug)?.name ?? slug;
  return {
    title,
    description,
    site,
    items: changeEntries(events, groupAdditions)
      .slice(0, CHANGES_FEED_SIZE)
      .map((entry) =>
        entry.kind === "event"
          ? changeItem(entry.event, strings, toolOf(entry.event.slug), link)
          : additionsItem(entry, locale, strings, nameOf, link),
      ),
  };
}
