import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { parse } from "yaml";
import { byCodeUnit } from "./order.ts";
import type { Finding, Tool } from "./types.ts";

const FILE = /^([a-z0-9]+(?:-[a-z0-9]+)*)--([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const FRONTMATTER = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;

interface Frontmatter {
  reviewed?: unknown;
  majors?: unknown;
  sources?: unknown;
}

interface Pair {
  from: string;
  to: string;
}

export function checkMigrationPage(file: string, text: string, tools: readonly Tool[]): Finding[] {
  const name = FILE.exec(file);
  const pair = name ? { from: name[1] as string, to: name[2] as string } : null;
  const parts = FRONTMATTER.exec(text.replaceAll("\r\n", "\n"));
  const meta: Frontmatter = parts ? ((parse(parts[1] as string) as Frontmatter | null) ?? {}) : {};

  const problems: string[] = [];
  if (!pair) problems.push("the file name must be {from}--{to}.md with two slugs");
  problems.push(...frontmatterProblems(parts));
  if (typeof meta.reviewed !== "string" || !DATE.test(meta.reviewed)) {
    problems.push("reviewed must be a YYYY-MM-DD date");
  }
  const versioned = pair ? versionedSides(pair, tools) : [];
  if (pair && !hasExactMajors(meta.majors, versioned)) {
    problems.push(`majors must give the major version of exactly ${versioned.join(" and ")}`);
  }
  if (!hasHttpsSources(meta.sources)) problems.push("sources must list at least one https URL");
  if (pair) problems.push(...replacementProblems(pair, tools));

  return problems.map((message) => ({ slug: file, severity: "error", code: "migration-page", message }));
}

function frontmatterProblems(parts: RegExpExecArray | null): string[] {
  if (!parts) return ["the file must start with a frontmatter block"];
  return (parts[2] ?? "").trim() ? [] : ["the page has no content"];
}

function versionedSides({ from, to }: Pair, tools: readonly Tool[]): string[] {
  return [from, to].filter((slug) => tools.some((t) => t.slug === slug));
}

function hasExactMajors(value: unknown, versioned: readonly string[]): boolean {
  const majors = value as Record<string, unknown> | undefined;
  const keys = majors && typeof majors === "object" ? Object.keys(majors).sort(byCodeUnit) : [];
  return (
    keys.join() === [...versioned].sort(byCodeUnit).join() &&
    keys.every((k) => Number.isInteger(majors?.[k]) && (majors?.[k] as number) >= 0)
  );
}

function hasHttpsSources(sources: unknown): boolean {
  return Array.isArray(sources) && sources.length > 0 && sources.every((s) => typeof s === "string" && s.startsWith("https://"));
}

function replacementProblems({ from, to }: Pair, tools: readonly Tool[]): string[] {
  const replacement = tools.find((t) => t.slug === to)?.replaces?.find((r) => r.tool === from);
  if (!replacement) return [`${to} does not list ${from} in its replaces`];
  return replacement.migration ? [] : [`${to} gives no official migration guide for ${from}`];
}

export async function checkMigrationPages(root: string, tools: readonly Tool[]): Promise<Finding[]> {
  const dir = join(root, "data", "migrations");
  let files: string[];
  try {
    files = (await readdir(dir)).filter((f) => f.endsWith(".md")).sort();
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw e;
  }
  const findings = await Promise.all(
    files.map(async (file) => checkMigrationPage(file, await readFile(join(dir, file), "utf8"), tools)),
  );
  return findings.flat();
}
