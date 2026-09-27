import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { test } from "node:test";
import { parse } from "yaml";

const SITE = resolve(import.meta.dirname, "..");
const REPO = resolve(SITE, "..");
const SKIPPED = new Set(["node_modules", "dist", ".astro"]);
const SOURCE = /\.(ts|tsx|mjs|astro)$/;
const IMPORT = /(?:\bfrom\s*|\bimport\s*\(?\s*|new URL\(\s*)["'`](\.{1,2}\/[^"'`]+)["'`]/g;
const FROM_ROOT = /resolve\(ROOT,\s*["'`]([^"'`]+)["'`]\)/g;
const LOADER_BASE = /\bbase:\s*["'`](\.{1,2}\/[^"'`]+)["'`]/g;

const repoPath = (absolute: string) => relative(REPO, absolute).split(sep).join("/");
const outside = (absolute: string) => !absolute.startsWith(SITE + sep);

function sources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return SKIPPED.has(entry.name) ? [] : sources(path);
    return SOURCE.test(entry.name) ? [path] : [];
  });
}

function filesReadOutsideSite(): string[] {
  const found = new Set<string>();
  const seen = new Set<string>();
  const visit = (file: string) => {
    if (seen.has(file)) return;
    seen.add(file);
    const text = readFileSync(file, "utf8");
    const referenced = [
      ...[...text.matchAll(IMPORT)].map((m) => resolve(dirname(file), m[1] as string)),
      ...[...text.matchAll(FROM_ROOT)].map((m) => resolve(REPO, m[1] as string)),
      ...[...text.matchAll(LOADER_BASE)].map((m) => resolve(SITE, m[1] as string)),
    ];
    for (const target of referenced.filter(outside)) {
      found.add(repoPath(target));
      if (/\.(ts|mjs)$/.test(target) && existsSync(target)) visit(target);
    }
  };
  [...sources(join(SITE, "src")), join(SITE, "astro.config.mjs")].forEach(visit);
  return [...found].sort();
}

const covers = (entry: string, path: string) => {
  const bare = entry.replace(/\/(\*\*)?$/, "");
  return path === bare || path.startsWith(`${bare}/`);
};

const workflow = parse(readFileSync(join(REPO, ".github/workflows/site.yml"), "utf8"));
const dockerCopies = readFileSync(join(SITE, "Dockerfile"), "utf8")
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.startsWith("COPY ") && !line.includes("--from"))
  .flatMap((line) => line.split(/\s+/).slice(1, -1));
const sharedPaths: string[] = JSON.parse(readFileSync(join(REPO, "ferrflow.json"), "utf8")).package.find(
  (p: { name: string }) => p.name === "site",
).sharedPaths;

const lists: [string, string[]][] = [
  ["the Site workflow's pull_request paths", workflow.on.pull_request.paths],
  ["the Site workflow's push paths", workflow.on.push.paths],
  ["the files site/Dockerfile copies", dockerCopies],
  ["the site's sharedPaths in ferrflow.json", sharedPaths],
];

const read = filesReadOutsideSite();

test("finds the files outside site/ that the site imports or reads at build time", () => {
  for (const expected of ["CONTRIBUTING.md", "data/categories.yaml", "data/migrations", "generated/catalog.json", "scripts/lib/types.ts"]) {
    assert.ok(read.includes(expected), `${expected} in ${read.join(", ")}`);
  }
});

for (const [name, entries] of lists) {
  test(`${name} name every file outside site/ that the site reads`, () => {
    assert.deepEqual(
      read.filter((path) => !entries.some((entry) => covers(entry, path))),
      [],
    );
  });

  test(`${name} name nothing outside site/ that the site no longer reads`, () => {
    const own = new Set(["site/", ".github/workflows/site.yml"]);
    const extra = entries.filter((entry) => ![...own].some((o) => entry.startsWith(o)) && !read.some((path) => covers(entry, path)));
    assert.deepEqual(extra, []);
  });
}
