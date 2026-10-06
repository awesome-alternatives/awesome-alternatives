import type { LocatedFile, MaintainerEntry } from "./maintainer-file.ts";
import type { DeployMethod, Replacement, Tool } from "./types.ts";

export type FieldChange =
  | { field: "path"; value: string | null }
  | { field: "deploy"; value: DeployMethod[] | null }
  | { field: "capability"; key: string; value: string | null }
  | { field: "migration"; tool: string; value: string | null };

export interface Speaking {
  entry: MaintainerEntry;
  file: LocatedFile;
}

const CAPABILITY = "capabilities.";
const MIGRATION = "migration.";

export function own<T>(record: Readonly<Record<string, T>> | undefined, key: string): T | undefined {
  return record && Object.hasOwn(record, key) ? record[key] : undefined;
}

export function replacementOf(tool: Pick<Tool, "replaces">, target: string): Replacement | undefined {
  return tool.replaces?.find((replacement) => replacement.tool === target);
}

function sameMethods(a: readonly DeployMethod[], b: readonly DeployMethod[]): boolean {
  return a.length === b.length && a.every((method) => b.includes(method));
}

function suffixed(names: ReadonlySet<string>, prefix: string): string[] {
  return [...names].filter((name) => name.startsWith(prefix)).map((name) => name.slice(prefix.length));
}

export function fieldName(change: FieldChange): string {
  switch (change.field) {
    case "path":
    case "deploy":
      return change.field;
    case "capability":
      return `${CAPABILITY}${change.key}`;
    case "migration":
      return `${MIGRATION}${change.tool}`;
  }
}

export function speakingFor(slug: string, files: readonly LocatedFile[]): Speaking | null {
  const ordered = [...files].sort((a, b) => (a.scope === b.scope ? 0 : a.scope === "path" ? -1 : 1));
  for (const file of ordered) {
    if (file.file.form !== "fields") continue;
    const entry = file.file.tools.get(slug);
    if (entry) return { entry, file };
  }
  return null;
}

export function proposals(tool: Tool, entry: MaintainerEntry, previous: ReadonlySet<string>): FieldChange[] {
  const changes: FieldChange[] = [];
  if (entry.path !== undefined) {
    if (entry.path !== tool.path) changes.push({ field: "path", value: entry.path });
  } else if (previous.has("path") && tool.path !== undefined) {
    changes.push({ field: "path", value: null });
  }

  if (entry.deploy !== undefined) {
    if (!sameMethods(entry.deploy, tool.deploy ?? [])) changes.push({ field: "deploy", value: entry.deploy });
  } else if (previous.has("deploy") && tool.deploy?.length) {
    changes.push({ field: "deploy", value: null });
  }

  for (const [key, { docs }] of Object.entries(entry.capabilities ?? {})) {
    if (own(tool.capabilities, key)?.docs !== docs) changes.push({ field: "capability", key, value: docs });
  }
  for (const key of suffixed(previous, CAPABILITY)) {
    if (!own(entry.capabilities, key) && own(tool.capabilities, key)) changes.push({ field: "capability", key, value: null });
  }

  for (const [target, url] of Object.entries(entry.migration ?? {})) {
    if (replacementOf(tool, target)?.migration !== url) changes.push({ field: "migration", tool: target, value: url });
  }
  for (const target of suffixed(previous, MIGRATION)) {
    if (!own(entry.migration, target) && replacementOf(tool, target)?.migration) changes.push({ field: "migration", tool: target, value: null });
  }
  return changes;
}

function withCapability({ capabilities, ...rest }: Tool, key: string, docs: string | null): Tool {
  const next = Object.fromEntries(Object.entries(capabilities ?? {}).filter(([name]) => name !== key));
  if (docs !== null) next[key] = { ...own(capabilities, key), docs };
  return Object.keys(next).length ? { ...rest, capabilities: next } : rest;
}

function withMigration(tool: Tool, target: string, url: string | null): Tool {
  const replaces = tool.replaces?.map((replacement) => {
    if (replacement.tool !== target) return replacement;
    const { migration: _, ...rest } = replacement;
    return url === null ? rest : { ...rest, migration: url };
  });
  return replaces ? { ...tool, replaces } : tool;
}

export function withChange(tool: Tool, change: FieldChange): Tool {
  switch (change.field) {
    case "path": {
      const { path: _, ...rest } = tool;
      return change.value === null ? rest : { ...rest, path: change.value };
    }
    case "deploy": {
      const { deploy: _, ...rest } = tool;
      return change.value === null ? rest : { ...rest, deploy: change.value };
    }
    case "capability":
      return withCapability(tool, change.key, change.value);
    case "migration":
      return withMigration(tool, change.tool, change.value);
  }
}

function holds(tool: Tool, name: string): boolean {
  if (name === "path") return tool.path !== undefined;
  if (name === "deploy") return Boolean(tool.deploy?.length);
  if (name.startsWith(CAPABILITY)) return own(tool.capabilities, name.slice(CAPABILITY.length)) !== undefined;
  if (name.startsWith(MIGRATION)) return Boolean(replacementOf(tool, name.slice(MIGRATION.length))?.migration);
  return false;
}

function offers(entry: MaintainerEntry, name: string): boolean {
  if (name === "path") return entry.path !== undefined;
  if (name === "deploy") return entry.deploy !== undefined;
  if (name.startsWith(CAPABILITY)) return own(entry.capabilities, name.slice(CAPABILITY.length)) !== undefined;
  if (name.startsWith(MIGRATION)) return own(entry.migration, name.slice(MIGRATION.length)) !== undefined;
  return false;
}

export function maintainerFieldsOf(tool: Tool, entry: MaintainerEntry | null, previous: readonly string[]): string[] {
  const kept = previous.filter((name) => (!entry || !offers(entry, name)) && holds(tool, name));
  if (!entry) return kept;
  const fields: string[] = [];
  if (entry.path !== undefined && entry.path === tool.path) fields.push("path");
  if (entry.deploy !== undefined && sameMethods(entry.deploy, tool.deploy ?? [])) fields.push("deploy");
  for (const [key, { docs }] of Object.entries(entry.capabilities ?? {})) {
    if (own(tool.capabilities, key)?.docs === docs) fields.push(`${CAPABILITY}${key}`);
  }
  for (const [target, url] of Object.entries(entry.migration ?? {})) {
    if (replacementOf(tool, target)?.migration === url) fields.push(`${MIGRATION}${target}`);
  }
  return [...fields, ...kept];
}
