import { readFileSync } from "node:fs";
import { posix } from "node:path";
import { Ajv2020 } from "ajv/dist/2020.js";
import { type Document, type DocumentOptions, isAlias, isMap, type ParseOptions, parseDocument, type SchemaOptions, visit } from "yaml";
import { hopProblem } from "./safe-link.ts";
import type { DeployMethod, Fit } from "./types.ts";

export const MAINTAINER_FILE_BYTES = 16 * 1024;

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const RICHER_FORM = /^tools\s*:/m;
const UNPRINTABLE = /[\p{Cc}\p{Cf}\p{Zl}\p{Zp}]/gu;

export interface MaintainerReplacement {
  tool: string;
  fit: Fit;
  note?: string;
}

export interface MaintainerEntry {
  path?: string;
  deploy?: DeployMethod[];
  capabilities?: Record<string, { docs: string }>;
  migration?: Record<string, string>;
  replaces?: MaintainerReplacement[];
  category?: string;
  affiliation?: string;
}

interface RawFile {
  tools: Record<string, MaintainerEntry | null>;
}

export type MaintainerFile =
  | { form: "lines"; slugs: string[] }
  | { form: "fields"; slugs: string[]; tools: ReadonlyMap<string, MaintainerEntry> }
  | { form: "rejected"; reason: string };

export type FileScope = "root" | "path";

export interface LocatedFile {
  scope: FileScope;
  commit: string | null;
  file: MaintainerFile;
}

const validate = new Ajv2020({ allErrors: false }).compile<RawFile>(
  JSON.parse(readFileSync(new URL("../../schema/maintainer-file.schema.json", import.meta.url), "utf8")),
);

const PARSE_OPTIONS: ParseOptions & DocumentOptions & SchemaOptions = {
  schema: "core",
  customTags: [],
  merge: false,
  uniqueKeys: true,
  stringKeys: true,
  prettyErrors: false,
};

export function printable(text: string, max = 80): string {
  const cleaned = text.replace(UNPRINTABLE, "?");
  return cleaned.length > max ? `${cleaned.slice(0, max)}...` : cleaned;
}

function rejected(reason: string): MaintainerFile {
  return { form: "rejected", reason };
}

function linesOf(text: string): MaintainerFile {
  const slugs = text
    .split(/\r?\n/)
    .map((line) => line.replace(/#.*/, "").trim())
    .filter((line) => SLUG.test(line));
  return { form: "lines", slugs };
}

function isRicherForm(doc: Document, text: string): boolean {
  return (isMap(doc.contents) && doc.contents.has("tools")) || RICHER_FORM.test(text);
}

function unsafeConstruct(doc: Document): string | null {
  let found: string | null = null;
  visit(doc, {
    Node(_, node) {
      if (isAlias(node)) found = "uses a YAML alias";
      else if (node.anchor) found = "declares a YAML anchor";
      else if (node.tag) found = "carries an explicit YAML tag";
      return found ? visit.BREAK : undefined;
    },
  });
  return found;
}

export function isSafePath(path: string): boolean {
  return (
    !path.includes("\\") &&
    !path.startsWith("/") &&
    posix.normalize(path) === path &&
    !path.split("/").some((segment) => segment === ".." || segment === ".")
  );
}

export function isSafeUrl(url: string): boolean {
  return URL.canParse(url) && hopProblem(new URL(url)) === null;
}

function unsafeValue(slug: string, entry: MaintainerEntry): string | null {
  if (entry.path !== undefined && !isSafePath(entry.path)) return `has a path for ${slug} that is not a normalised relative path`;
  const urls = [...Object.values(entry.capabilities ?? {}).map((capability) => capability.docs), ...Object.values(entry.migration ?? {})];
  return urls.some((url) => !isSafeUrl(url)) ? `has a link for ${slug} that is not a plain https URL` : null;
}

function schemaError(): string {
  const [first] = validate.errors ?? [];
  if (!first) return "does not match the maintainer file schema";
  const at = printable(first.instancePath || "/");
  const extra = first.keyword === "additionalProperties" ? ` (${printable(String(first.params.additionalProperty))})` : "";
  return `does not match the maintainer file schema: ${at} ${first.message ?? "is invalid"}${extra}`;
}

function fieldsOf(doc: Document): MaintainerFile {
  if (doc.errors.length || doc.warnings.length) return rejected(`is not valid YAML (${doc.errors[0]?.code ?? doc.warnings[0]?.code})`);
  const construct = unsafeConstruct(doc);
  if (construct) return rejected(construct);
  let raw: unknown;
  try {
    raw = doc.toJS({ maxAliasCount: 0 });
  } catch (error) {
    return rejected(`could not be read (${printable((error as Error).message)})`);
  }
  if (!validate(raw)) return rejected(schemaError());
  const tools = new Map(Object.entries(raw.tools).map(([slug, entry]) => [slug, entry ?? {}] as const));
  for (const [slug, entry] of tools) {
    const problem = unsafeValue(slug, entry);
    if (problem) return rejected(problem);
  }
  return { form: "fields", slugs: [...tools.keys()], tools };
}

export function parseMaintainerFile(text: string): MaintainerFile {
  if (Buffer.byteLength(text, "utf8") > MAINTAINER_FILE_BYTES) return rejected(`is larger than ${MAINTAINER_FILE_BYTES} bytes`);
  const doc = parseDocument(text, PARSE_OPTIONS);
  return isRicherForm(doc, text) ? fieldsOf(doc) : linesOf(text);
}

export function slugsOf(file: MaintainerFile): string[] {
  return file.form === "rejected" ? [] : file.slugs;
}
