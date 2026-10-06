import { type Catalog, checkStructure } from "./catalog.ts";
import { repoPath } from "./github.ts";
import { checkMigrationPage, type MigrationPage } from "./migrations.ts";
import type { Tool } from "./types.ts";

export interface CatalogGuard {
  siblingsOf(tool: Tool): Tool[];
  hasMigrationPage(from: string, to: string): boolean;
  introducedError(candidate: Tool): string | null;
  accept(candidate: Tool): void;
}

export function sameRepository(a: string, b: string): boolean {
  return repoPath(a).toLowerCase() === repoPath(b).toLowerCase();
}

export function catalogGuard(catalog: Catalog, pages: readonly MigrationPage[]): CatalogGuard {
  const tools = new Map(catalog.tools.map((tool) => [tool.slug, tool]));
  const errorsOf = (list: Tool[]): Set<string> =>
    new Set(
      [...checkStructure({ ...catalog, tools: list }), ...pages.flatMap((page) => checkMigrationPage(page.file, page.text, list))]
        .filter((finding) => finding.severity === "error")
        .map((finding) => `${finding.slug}: ${finding.message}`),
    );
  const withCandidate = (candidate: Tool): Tool[] => [...new Map(tools).set(candidate.slug, candidate).values()];
  let baseline = errorsOf([...tools.values()]);
  return {
    siblingsOf: (tool) => [...tools.values()].filter((other) => other.slug !== tool.slug && sameRepository(other.repository, tool.repository)),
    hasMigrationPage: (from, to) => pages.some((page) => page.file === `${from}--${to}.md`),
    introducedError(candidate) {
      return [...errorsOf(withCandidate(candidate))].find((error) => !baseline.has(error)) ?? null;
    },
    accept(candidate) {
      tools.set(candidate.slug, candidate);
      baseline = errorsOf([...tools.values()]);
    },
  };
}
