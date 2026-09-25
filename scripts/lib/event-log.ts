import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { diffCatalogs } from "./events.ts";
import { type CatalogEvent, EVENT_ORDER, type EventType } from "./types.ts";

export const EVENTS_PATH = "generated/events.json";
export const RETENTION_DAYS = 365;
export const RELEASES_KEPT = 10;

const DAY_MS = 24 * 60 * 60 * 1000;

export function eventKey(event: Pick<CatalogEvent, "at" | "slug" | "type">): string {
  return `${event.at} ${event.slug} ${event.type}`;
}

function dimension(type: EventType): string {
  switch (type) {
    case "added":
    case "removed":
      return "presence";
    case "archived":
    case "unarchived":
      return "archived";
    case "inactive":
    case "reactivated":
      return "inactive";
    case "license-changed":
      return "license";
    case "renamed":
      return "name";
    case "released":
      return "release";
  }
}

function sameChange(a: CatalogEvent, b: CatalogEvent): boolean {
  return a.type === b.type && ("from" in a ? a.from : null) === ("from" in b ? b.from : null) && ("to" in a ? a.to : null) === ("to" in b ? b.to : null);
}

export function sortEvents(events: readonly CatalogEvent[]): CatalogEvent[] {
  return [...events].sort(
    (a, b) => a.at.localeCompare(b.at) || a.slug.localeCompare(b.slug) || EVENT_ORDER[a.type] - EVENT_ORDER[b.type],
  );
}

export function recordEvents(log: readonly CatalogEvent[], fresh: readonly CatalogEvent[]): CatalogEvent[] {
  const latest = new Map<string, CatalogEvent>();
  const remember = (event: CatalogEvent) => latest.set(`${event.slug} ${dimension(event.type)}`, event);
  sortEvents(log).forEach(remember);
  const kept: CatalogEvent[] = [];
  for (const event of sortEvents(fresh)) {
    const last = latest.get(`${event.slug} ${dimension(event.type)}`);
    if (last && sameChange(last, event)) continue;
    kept.push(event);
    remember(event);
  }
  return sortEvents([...log, ...kept]);
}

export function pruneEvents(log: readonly CatalogEvent[], now: Date): CatalogEvent[] {
  const cutoff = new Date(now.getTime() - RETENTION_DAYS * DAY_MS).toISOString();
  const releases = new Map<string, number>();
  const kept: CatalogEvent[] = [];
  for (const event of sortEvents(log).reverse()) {
    if (event.at < cutoff) continue;
    if (event.type === "released") {
      const seen = releases.get(event.slug) ?? 0;
      releases.set(event.slug, seen + 1);
      if (seen >= RELEASES_KEPT) continue;
    }
    kept.push(event);
  }
  return kept.reverse();
}

export interface PublishedRevision {
  sha: string;
  events: readonly CatalogEvent[];
}

export interface EventHistory {
  revisionsSince(at: string): PublishedRevision[];
}

export function resolveCommits(log: readonly CatalogEvent[], revisions: readonly PublishedRevision[]): CatalogEvent[] {
  const pending = new Set(log.filter((e) => e.commit === null).map(eventKey));
  const found = new Map<string, string>();
  for (const { sha, events } of revisions) {
    for (const event of events) {
      const key = eventKey(event);
      if (pending.has(key) && !found.has(key)) found.set(key, sha);
    }
  }
  return log.map((event) => {
    const commit = event.commit ?? found.get(eventKey(event)) ?? null;
    return commit === event.commit ? event : { ...event, commit };
  });
}

const FIELD_ORDER = ["type", "slug", "at", "commit", "from", "to"];

export function eventsJson(log: readonly CatalogEvent[]): string {
  const lines = sortEvents(log).map((event) => `  ${JSON.stringify(event, FIELD_ORDER)}`);
  return lines.length ? `[\n${lines.join(",\n")}\n]\n` : "[]\n";
}

function isEvent(value: unknown): value is CatalogEvent {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    typeof value.type === "string" &&
    Object.hasOwn(EVENT_ORDER, value.type) &&
    "slug" in value &&
    typeof value.slug === "string" &&
    "at" in value &&
    typeof value.at === "string" &&
    "commit" in value &&
    (value.commit === null || typeof value.commit === "string")
  );
}

export function eventsOf(parsed: unknown): CatalogEvent[] {
  if (!Array.isArray(parsed)) throw new Error(`${EVENTS_PATH} should hold an array of events`);
  const bad = parsed.findIndex((value) => !isEvent(value));
  if (bad >= 0) throw new Error(`${EVENTS_PATH}: entry ${bad} is not an event: ${JSON.stringify(parsed[bad])}`);
  return parsed.filter(isEvent);
}

export function parseEventLog(text: string): CatalogEvent[] {
  return eventsOf(JSON.parse(text));
}

export async function readEventLog(root: string): Promise<CatalogEvent[]> {
  try {
    return parseEventLog(await readFile(join(root, EVENTS_PATH), "utf8"));
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return [];
    throw error;
  }
}

export const PENDING_GRACE_DAYS = 2;

export interface EventUpdate {
  events: CatalogEvent[];
  unresolved: CatalogEvent[];
}

export function nextEventLog(
  log: readonly CatalogEvent[],
  before: readonly unknown[],
  after: readonly unknown[],
  now: Date,
  history: EventHistory | null,
): EventUpdate {
  const oldestPending = sortEvents(log).find((event) => event.commit === null);
  const resolved = history && oldestPending ? resolveCommits(log, history.revisionsSince(oldestPending.at)) : [...log];
  const grace = new Date(now.getTime() - PENDING_GRACE_DAYS * DAY_MS).toISOString();
  const unresolved = history ? resolved.filter((event) => event.commit === null && event.at < grace) : [];
  const events = pruneEvents(recordEvents(resolved, diffCatalogs(before, after, now.toISOString(), null)), now);
  return { events, unresolved };
}
