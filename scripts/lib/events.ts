import { type CatalogEvent, EVENT_ORDER } from "./types.ts";

const PRERELEASE_TAG = /(?:[-.+_](?:alpha|beta|rc|pre|preview|next|canary|dev|nightly|snapshot)(?![a-z])|\d(?:a|b|rc)\d+$)/i;

interface TrackedRelease {
  tag: string;
  publishedAt: string | null;
  fromTags: boolean;
  prerelease: boolean;
}

export interface TrackedTool {
  slug: string;
  license: string | null | undefined;
  fullName: string | undefined;
  archived: boolean | undefined;
  release: TrackedRelease | null | undefined;
  inactive: boolean | undefined;
}

type Fields = Record<string, unknown>;

function isFields(value: unknown): value is Fields {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringOrNull(value: unknown): string | null | undefined {
  if (value === null || typeof value === "string") return value;
  return undefined;
}

export function isPrereleaseTag(tag: string): boolean {
  return PRERELEASE_TAG.test(tag);
}

function flaggedPrerelease(releases: unknown, tag: string): boolean {
  return Array.isArray(releases) && releases.some((r) => isFields(r) && r.tag === tag && r.prerelease === true);
}

function trackRelease(release: unknown, releases: unknown): TrackedRelease | null | undefined {
  if (release === null) return null;
  if (!isFields(release) || typeof release.tag !== "string") return undefined;
  const fromTags = release.source === "tag";
  return {
    tag: release.tag,
    publishedAt: typeof release.publishedAt === "string" ? release.publishedAt : null,
    fromTags,
    prerelease: fromTags ? isPrereleaseTag(release.tag) : flaggedPrerelease(releases, release.tag),
  };
}

export function trackTool(raw: unknown): TrackedTool | null {
  if (!isFields(raw) || typeof raw.slug !== "string") return null;
  const repo = isFields(raw.repo) ? raw.repo : {};
  return {
    slug: raw.slug,
    license: "license" in repo ? stringOrNull(repo.license) : undefined,
    fullName: typeof repo.fullName === "string" ? repo.fullName : undefined,
    archived: typeof repo.archived === "boolean" ? repo.archived : undefined,
    release: "release" in raw ? trackRelease(raw.release, raw.releases) : undefined,
    inactive: Array.isArray(raw.flags) ? raw.flags.includes("inactive") : undefined,
  };
}

function bySlug(tools: readonly unknown[]): Map<string, TrackedTool> {
  const out = new Map<string, TrackedTool>();
  for (const raw of tools) {
    const tool = trackTool(raw);
    if (!tool) continue;
    if (out.has(tool.slug)) throw new Error(`${tool.slug} appears twice in one catalog, so its changes cannot be told apart`);
    out.set(tool.slug, tool);
  }
  return out;
}

function isNewRelease(before: TrackedRelease | null, after: TrackedRelease): boolean {
  if (before?.tag === after.tag || after.prerelease) return false;
  if (before && !before.fromTags && after.fromTags) return false;
  if (before?.publishedAt && after.publishedAt && after.publishedAt <= before.publishedAt) return false;
  return true;
}

type Unstamped<T> = T extends unknown ? Omit<T, "slug" | "at" | "commit"> : never;

type Change = Unstamped<CatalogEvent>;

export function changesOf(before: TrackedTool, after: TrackedTool): Change[] {
  const out: Change[] = [];
  if (before.fullName !== undefined && after.fullName !== undefined && before.fullName !== after.fullName) {
    out.push({ type: "renamed", from: before.fullName, to: after.fullName });
  }
  if (before.license !== undefined && after.license !== undefined && before.license !== after.license) {
    out.push({ type: "license-changed", from: before.license, to: after.license });
  }
  if (before.archived !== undefined && after.archived !== undefined && before.archived !== after.archived) {
    out.push({ type: after.archived ? "archived" : "unarchived" });
  }
  if (before.inactive !== undefined && after.inactive !== undefined && before.inactive !== after.inactive) {
    if (after.inactive) out.push({ type: "inactive" });
    else if (after.archived !== true) out.push({ type: "reactivated" });
  }
  if (before.release !== undefined && after.release && isNewRelease(before.release, after.release)) {
    out.push({ type: "released", from: before.release?.tag ?? null, to: after.release.tag });
  }
  return out;
}

export function diffCatalogs(
  before: readonly unknown[],
  after: readonly unknown[],
  at: string,
  commit: string | null,
): CatalogEvent[] {
  const old = bySlug(before);
  const next = bySlug(after);
  const stamp = (slug: string) => ({ slug, at, commit });
  const events: CatalogEvent[] = [];
  for (const [slug, tool] of next) {
    const previous = old.get(slug);
    if (!previous) events.push({ type: "added", ...stamp(slug) });
    else events.push(...changesOf(previous, tool).map((change) => ({ ...change, ...stamp(slug) })));
  }
  for (const slug of old.keys()) if (!next.has(slug)) events.push({ type: "removed", ...stamp(slug) });
  return events.sort((a, b) => a.slug.localeCompare(b.slug) || EVENT_ORDER[a.type] - EVENT_ORDER[b.type]);
}
