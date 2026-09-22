import { readdir, readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { Ajv2020 } from "ajv/dist/2020.js";
import { parse } from "yaml";
import type { Category, Finding, Tool, ToolEntry } from "./types.ts";

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export interface Catalog {
  tools: Tool[];
  categories: Map<string, Category>;
}

export interface LoadResult {
  catalog: Catalog;
  findings: Finding[];
}

export async function loadCatalog(root: string): Promise<LoadResult> {
  const schema = JSON.parse(await readFile(join(root, "schema/tool.schema.json"), "utf8"));
  const validate = new Ajv2020({ allErrors: true }).compile<ToolEntry>(schema);
  const categories = new Map(
    Object.entries(parse(await readFile(join(root, "data/categories.yaml"), "utf8")) as Record<string, Category>),
  );

  const dir = join(root, "data/tools");
  const files = (await readdir(dir)).filter((f) => f.endsWith(".yaml")).sort();
  const tools: Tool[] = [];
  const findings: Finding[] = [];

  for (const file of files) {
    const slug = basename(file, ".yaml");
    const raw: unknown = parse(await readFile(join(dir, file), "utf8"));
    if (!SLUG.test(slug)) {
      findings.push(error(slug, "bad-slug", `file name must be a lowercase slug, got ${file}`));
      continue;
    }
    if (!validate(raw)) {
      for (const e of validate.errors ?? []) {
        findings.push(error(slug, "schema", `${e.instancePath || "/"} ${e.message ?? "is invalid"}`));
      }
      continue;
    }
    tools.push({ ...raw, slug, file: `data/tools/${file}` });
  }

  return { catalog: { tools, categories }, findings: [...findings, ...checkStructure({ tools, categories })] };
}

export function checkStructure({ tools, categories }: Catalog): Finding[] {
  const findings: Finding[] = [];
  const slugs = new Set(tools.map((t) => t.slug));
  const byRepo = new Map<string, string>();

  for (const tool of tools) {
    const repo = tool.repository.toLowerCase();
    const owner = byRepo.get(repo);
    if (owner) {
      findings.push(error(tool.slug, "duplicate-repository", `${tool.repository} is already listed as ${owner}`));
    } else {
      byRepo.set(repo, tool.slug);
    }

    if (!categories.has(tool.category)) {
      findings.push(error(tool.slug, "unknown-category", `category ${tool.category} is not in data/categories.yaml`));
    }

    const seen = new Set<string>();
    for (const r of tool.replaces ?? []) {
      if (r.tool === tool.slug) {
        findings.push(error(tool.slug, "replaces-itself", "a tool cannot replace itself"));
      } else if (!slugs.has(r.tool)) {
        findings.push(error(tool.slug, "unknown-replacement", `replaces ${r.tool}, which has no entry in data/tools`));
      }
      if (seen.has(r.tool)) {
        findings.push(error(tool.slug, "duplicate-replacement", `replaces ${r.tool} more than once`));
      }
      seen.add(r.tool);
    }
  }

  return findings;
}

function error(slug: string, code: string, message: string): Finding {
  return { slug, severity: "error", code, message };
}
