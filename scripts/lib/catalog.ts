import { readdir, readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { Ajv2020 } from "ajv/dist/2020.js";
import { parse } from "yaml";
import { type ListedCatalog, listedCatalog } from "./listed.ts";
import { byCodeUnit } from "./order.ts";
import type { BlockingCode, Category, Finding, Product, ProductEntry, Tool, ToolEntry } from "./types.ts";

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const CATEGORIES_FILE = "data/categories.yaml";

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
  const categories = await loadCategories(root);
  const tools = await loadEntries<ToolEntry>(root, "tools", "tool.schema.json");
  const products = await loadEntries<ProductEntry>(root, "products", "product.schema.json");
  const catalog = { tools: tools.entries, products: products.entries, categories: categories.entries };
  return { catalog, findings: [...categories.findings, ...tools.findings, ...products.findings, ...checkStructure(catalog)] };
}

async function compiled<T>(root: string, schemaFile: string) {
  const schema = JSON.parse(await readFile(join(root, "schema", schemaFile), "utf8"));
  return new Ajv2020({ allErrors: true }).compile<T>(schema);
}

async function loadCategories(root: string): Promise<{ entries: Map<string, Category>; findings: Finding[] }> {
  const validate = await compiled<Record<string, Category>>(root, "categories.schema.json");
  const raw: unknown = parse(await readFile(join(root, CATEGORIES_FILE), "utf8"));
  if (validate(raw)) return { entries: new Map(Object.entries(raw)), findings: [] };
  const findings = (validate.errors ?? [])
    .filter((e) => !e.schemaPath.includes("/propertyNames/"))
    .map((e) => {
      const [top, ...rest] = e.instancePath.split("/").slice(1);
      const at = `${CATEGORIES_FILE} /${rest.join("/")}`;
      if (e.keyword === "propertyNames") {
        return error(top ?? e.params.propertyName, "schema", `${at} ${e.params.propertyName} is not a lowercase slug`);
      }
      const extra = e.keyword === "additionalProperties" ? ` (${e.params.additionalProperty})` : "";
      return error(top ?? CATEGORIES_FILE, "schema", `${at} ${e.message ?? "is invalid"}${extra}`);
    });
  return { entries: new Map(Object.entries((raw ?? {}) as Record<string, Category>)), findings };
}

export async function loadListedCatalog(root: string): Promise<ListedCatalog> {
  return listedCatalog(await loadSoundCatalog(root));
}

export async function loadSoundCatalog(root: string): Promise<Catalog> {
  const { catalog, findings } = await loadCatalog(root);
  const structural = findings.filter((f) => f.severity === "error");
  if (structural.length) {
    throw new Error(structural.map((f) => `${f.slug}: ${f.code}: ${f.message}`).join("\n"));
  }
  return catalog;
}

async function loadEntries<T>(
  root: string,
  kind: "tools" | "products",
  schemaFile: string,
): Promise<{ entries: (T & { slug: string; file: string })[]; findings: Finding[] }> {
  const validate = await compiled<T>(root, schemaFile);
  const dir = join(root, "data", kind);
  const files = (await listYaml(dir)).sort(byCodeUnit);
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
  const toolSlugs = new Set(tools.map((t) => t.slug));
  const slugs = new Set([...toolSlugs, ...products.map((p) => p.slug)]);
  const replaced = new Set(tools.flatMap((t) => (t.replaces ?? []).map((r) => r.tool)));
  return [
    ...duplicateRepositories(tools),
    ...tools.flatMap((tool) => [
      ...categoryFindings(tool, categories),
      ...capabilityFindings(tool, categories),
      ...replacementFindings(tool, slugs),
    ]),
    ...products.flatMap((product) => productFindings(product, toolSlugs, categories, replaced)),
  ];
}

function duplicateRepositories(tools: readonly Tool[]): Finding[] {
  const byRepo = new Map<string, Tool[]>();
  for (const tool of tools) {
    const repo = tool.repository.toLowerCase();
    byRepo.set(repo, [...(byRepo.get(repo) ?? []), tool]);
  }
  return [...byRepo.values()].flatMap(sharedRepositoryFindings);
}

function sharedRepositoryFindings([first, ...rest]: readonly Tool[]): Finding[] {
  if (!first) return [];
  const findings: Finding[] = [];
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
  return findings;
}

function categoryFindings(tool: Tool, categories: ReadonlyMap<string, Category>): Finding[] {
  if (!categories.has(tool.category)) {
    return [error(tool.slug, "unknown-category", `category ${tool.category} is not in data/categories.yaml`)];
  }
  if (tool.deploy?.length && !categories.get(tool.category)?.selfHost) {
    return [
      error(tool.slug, "deploy-outside-self-host", `deploy is only for tools people run themselves, and ${tool.category} is not selfHost`),
    ];
  }
  return [];
}

function capabilityFindings(tool: Tool, categories: ReadonlyMap<string, Category>): Finding[] {
  const vocabulary = categories.get(tool.category)?.capabilities ?? {};
  return Object.keys(tool.capabilities ?? {})
    .filter((key) => !(key in vocabulary))
    .map((key) => error(tool.slug, "unknown-capability", `${key} is not a capability of ${tool.category} in data/categories.yaml`));
}

function replacementFindings(tool: Tool, slugs: ReadonlySet<string>): Finding[] {
  const findings: Finding[] = [];
  const seen = new Set<string>();
  for (const r of tool.replaces ?? []) {
    if (r.tool === tool.slug) {
      findings.push(error(tool.slug, "replaces-itself", "a tool cannot replace itself"));
    } else if (!slugs.has(r.tool)) {
      findings.push(error(tool.slug, "unknown-replacement", `replaces ${r.tool}, which has no entry in data/tools or data/products`));
    }
    if (seen.has(r.tool)) {
      findings.push(error(tool.slug, "duplicate-replacement", `replaces ${r.tool} more than once`));
    }
    seen.add(r.tool);
  }
  return findings;
}

function productFindings(
  product: Product,
  toolSlugs: ReadonlySet<string>,
  categories: ReadonlyMap<string, Category>,
  replaced: ReadonlySet<string>,
): Finding[] {
  const findings: Finding[] = [];
  if (toolSlugs.has(product.slug)) {
    findings.push(error(product.slug, "product-collides", `data/tools already has ${product.slug}; a slug names one thing only`));
  }
  if (!categories.has(product.category)) {
    findings.push(error(product.slug, "unknown-category", `category ${product.category} is not in data/categories.yaml`));
  }
  if (!replaced.has(product.slug)) {
    findings.push(error(product.slug, "unused-product", "no tool replaces it, and a closed product is listed only to be replaced"));
  }
  return findings;
}

function error(slug: string, code: BlockingCode, message: string): Finding {
  return { slug, severity: "error", code, message };
}
