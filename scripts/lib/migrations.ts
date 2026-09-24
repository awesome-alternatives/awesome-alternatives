import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { parse } from "yaml";
import type { Finding, Tool } from "./types.ts";

const FILE = /^([a-z0-9]+(?:-[a-z0-9]+)*)--([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const FRONTMATTER = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;

interface Frontmatter {
  reviewed?: unknown;
  majors?: unknown;
  sources?: unknown;
}

export function checkMigrationPage(file: string, text: string, tools: readonly Tool[]): Finding[] {
  const problems: string[] = [];
  const name = FILE.exec(file);
  const [from, to] = name ? [name[1] as string, name[2] as string] : ["", ""];
  if (!name) problems.push("the file name must be {from}--{to}.md with two slugs");

  const parts = FRONTMATTER.exec(text.replace(/\r\n/g, "\n"));
  const meta: Frontmatter = parts ? ((parse(parts[1] as string) as Frontmatter | null) ?? {}) : {};
  if (!parts) problems.push("the file must start with a frontmatter block");
  if (parts && !(parts[2] ?? "").trim()) problems.push("the page has no content");

  if (typeof meta.reviewed !== "string" || !DATE.test(meta.reviewed)) {
    problems.push("reviewed must be a YYYY-MM-DD date");
  }
  const majors = meta.majors as Record<string, unknown> | undefined;
  const keys = majors && typeof majors === "object" ? Object.keys(majors).sort() : [];
  const validMajors =
    keys.join() === [from, to].sort().join() && keys.every((k) => Number.isInteger(majors?.[k]) && (majors?.[k] as number) >= 0);
  if (name && !validMajors) problems.push(`majors must give the major version of exactly ${from} and ${to}`);
  const sources = meta.sources;
  if (!Array.isArray(sources) || sources.length === 0 || !sources.every((s) => typeof s === "string" && s.startsWith("https://"))) {
    problems.push("sources must list at least one https URL");
  }

  if (name) {
    const replacing = tools.find((t) => t.slug === to);
    const replacement = replacing?.replaces?.find((r) => r.tool === from);
    if (!replacement) problems.push(`${to} does not list ${from} in its replaces`);
    else if (!replacement.migration) problems.push(`${to} gives no official migration guide for ${from}`);
  }

  return problems.map((message) => ({ slug: file, severity: "error", code: "migration-page", message }));
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
