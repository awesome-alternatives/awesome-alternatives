import { readdir, readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { Ajv2020 } from "ajv/dist/2020.js";
import { parse } from "yaml";
import type { BlockingCode, Category, Finding, Product, ProductEntry, Tool, ToolEntry } from "./types.ts";

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export interface Catalog {
  tools: Tool[];
  products: Product[];
  categories: Map<string, Category>;
}

export interface LoadResult {
  catalog: Catalog;
  findings: Finding[];
}

export async function loadCatalog(root: string): Promise<LoadResult> {
  const categories = new Map(
    Object.entries(parse(await readFile(join(root, "data/categories.yaml"), "utf8")) as Record<string, Category>),
  );
  const tools = await loadEntries<ToolEntry>(root, "tools", "tool.schema.json");
  const products = await loadEntries<ProductEntry>(root, "products", "product.schema.json");
  const catalog = { tools: tools.entries, products: products.entries, categories };
  return { catalog, findings: [...tools.findings, ...products.findings, ...checkStructure(catalog)] };
}

async function loadEntries<T>(
  root: string,
  kind: "tools" | "products",
  schemaFile: string,
): Promise<{ entries: (T & { slug: string; file: string })[]; findings: Finding[] }> {
  const schema = JSON.parse(await readFile(join(root, "schema", schemaFile), "utf8"));
  const validate = new Ajv2020({ allErrors: true }).compile<T>(schema);
  const dir = join(root, "data", kind);
  const files = (await listYaml(dir)).sort();
  const entries: (T & { slug: string; file: string })[] = [];
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
    entries.push({ ...raw, slug, file: `data/${kind}/${file}` });
  }
  return { entries, findings };
}

async function listYaml(dir: string): Promise<string[]> {
  try {
    return (await readdir(dir)).filter((f) => f.endsWith(".yaml"));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw e;
  }
}

export function checkStructure({ tools, products, categories }: Catalog): Finding[] {
  const findings: Finding[] = [];
  const toolSlugs = new Set(tools.map((t) => t.slug));
  const slugs = new Set([...toolSlugs, ...products.map((p) => p.slug)]);
  const replaced = new Set(tools.flatMap((t) => (t.replaces ?? []).map((r) => r.tool)));
  const byRepo = new Map<string, Tool[]>();
  for (const tool of tools) {
    const repo = tool.repository.toLowerCase();
    byRepo.set(repo, [...(byRepo.get(repo) ?? []), tool]);
  }
  for (const [first, ...rest] of byRepo.values()) {
    if (!first) continue;
    const paths = new Map<string, string>(first.path === undefined ? [] : [[first.path.toLowerCase(), first.slug]]);
    for (const tool of rest) {
      const owner = tool.path === undefined ? undefined : paths.get(tool.path.toLowerCase());
      if (first.path === undefined || tool.path === undefined || owner) {
        findings.push(
          error(
            tool.slug,
            "duplicate-repository",
            `${tool.repository} is already listed as ${owner ?? first.slug}; entries sharing a repository each need their own path`,
          ),
        );
      } else {
        paths.set(tool.path.toLowerCase(), tool.slug);
      }
    }
  }

  for (const tool of tools) {

    if (!categories.has(tool.category)) {
      findings.push(error(tool.slug, "unknown-category", `category ${tool.category} is not in data/categories.yaml`));
    }

    const vocabulary = categories.get(tool.category)?.capabilities ?? {};
    for (const key of Object.keys(tool.capabilities ?? {})) {
      if (!(key in vocabulary)) {
        findings.push(
          error(tool.slug, "unknown-capability", `${key} is not a capability of ${tool.category} in data/categories.yaml`),
        );
      }
    }

    const seen = new Set<string>();
    for (const r of tool.replaces ?? []) {
      if (r.tool === tool.slug) {
        findings.push(error(tool.slug, "replaces-itself", "a tool cannot replace itself"));
      } else if (!slugs.has(r.tool)) {
        findings.push(
          error(tool.slug, "unknown-replacement", `replaces ${r.tool}, which has no entry in data/tools or data/products`),
        );
      }
      if (seen.has(r.tool)) {
        findings.push(error(tool.slug, "duplicate-replacement", `replaces ${r.tool} more than once`));
      }
      seen.add(r.tool);
    }
  }

  for (const product of products) {
    if (toolSlugs.has(product.slug)) {
      findings.push(
        error(product.slug, "product-collides", `data/tools already has ${product.slug}; a slug names one thing only`),
      );
    }
    if (!categories.has(product.category)) {
      findings.push(
        error(product.slug, "unknown-category", `category ${product.category} is not in data/categories.yaml`),
      );
    }
    if (!replaced.has(product.slug)) {
      findings.push(
        error(product.slug, "unused-product", "no tool replaces it, and a closed product is listed only to be replaced"),
      );
    }
  }

  return findings;
}

function error(slug: string, code: BlockingCode, message: string): Finding {
  return { slug, severity: "error", code, message };
}
