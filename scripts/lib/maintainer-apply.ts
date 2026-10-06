import type { Catalog } from "./catalog.ts";
import { fetchDeployEvidence, provenMethods } from "./deploy.ts";
import { encodeRef, fileLocation } from "./facts.ts";
import type { RepositoryFacts } from "./facts-graphql.ts";
import { type GitHub, repoPath } from "./github.ts";
import { type FieldChange, fieldName, own, proposals, replacementOf, speakingFor, withChange } from "./maintainer-fields.ts";
import { type LocatedFile, type MaintainerEntry, printable } from "./maintainer-file.ts";
import { type CatalogGuard, catalogGuard, sameRepository } from "./maintainer-guard.ts";
import type { MigrationPage } from "./migrations.ts";
import { HTTPS_TRANSPORT, type LinkTransport, unsafeOrUnreachable } from "./safe-link.ts";
import type { Category, DeployMethod, Read, RepoFacts, Tool } from "./types.ts";

export const MAX_TOOLS_PER_RUN = 20;
export const MAX_CHECKED_PER_RUN = 100;

export interface FieldChecks {
  directoryExists(fullName: string, branch: string, path: string): Promise<boolean>;
  unprovenDeploy(tool: Tool, fullName: string, branch: string): Promise<DeployMethod[]>;
  unreachable(url: string): Promise<string | null>;
}

export interface MaintainerApply {
  catalog: Catalog;
  migrationPages: readonly MigrationPage[];
  checks: FieldChecks;
}

export interface Source {
  fullName: string;
  location: string;
  commit: string | null;
}

export interface Applied {
  slug: string;
  file: string;
  source: Source;
  changes: FieldChange[];
}

export interface Published {
  maintainerFields?: readonly string[];
  repo?: Pick<RepoFacts, "databaseId">;
}

function movedAway(tool: Tool, repo: RepoFacts, before: Published | undefined): string | null {
  if (repoPath(tool.repository).toLowerCase() !== repo.fullName.toLowerCase()) {
    return `${tool.repository} now answers as ${repo.fullName}`;
  }
  const earlier = before?.repo?.databaseId;
  if (earlier !== undefined && repo.databaseId !== undefined && earlier !== repo.databaseId) {
    return `${repo.fullName} is now a different repository (id ${repo.databaseId}, was ${earlier})`;
  }
  return null;
}

export interface PlanContext {
  fullName: string;
  branch: string;
  category: Category | undefined;
  checks: FieldChecks;
  guard: CatalogGuard;
}

export interface Planned {
  tool: Tool;
  accepted: FieldChange[];
  refused: string[];
}

export function githubChecks(gh: GitHub, transport: LinkTransport = HTTPS_TRANSPORT): FieldChecks {
  return {
    async directoryExists(fullName, branch, path) {
      const listing = await gh.get<unknown>(`/repos/${fullName}/contents/${encodeRef(path)}?ref=${encodeURIComponent(branch)}`);
      return Array.isArray(listing);
    },
    async unprovenDeploy(tool, fullName, branch) {
      const declared = tool.deploy ?? [];
      const proven = provenMethods(await fetchDeployEvidence(gh, fullName, branch, declared, tool.path));
      return declared.filter((method) => !proven.has(method));
    },
    unreachable: (url) => unsafeOrUnreachable(url, transport),
  };
}

function pathConflict(tool: Tool, path: string | null, guard: CatalogGuard): string | null {
  const siblings = guard.siblingsOf(tool);
  if (siblings.length === 0) return null;
  if (path === null) return `the repository also holds ${siblings.map((other) => other.slug).join(", ")}, so the entry needs its own path`;
  const taken = siblings.find((other) => other.path?.toLowerCase() === path.toLowerCase());
  return taken ? `${path} is already the path of ${taken.slug}` : null;
}

function removalConflict(tool: Tool, change: FieldChange, guard: CatalogGuard): string | null {
  switch (change.field) {
    case "path":
      return pathConflict(tool, null, guard);
    case "migration":
      return guard.hasMigrationPage(change.tool, tool.slug)
        ? `data/migrations/${change.tool}--${tool.slug}.md needs the official migration guide`
        : null;
    case "deploy":
    case "capability":
      return null;
  }
}

async function refusal(tool: Tool, change: FieldChange, { fullName, branch, category, checks, guard }: PlanContext): Promise<string | null> {
  if (change.value === null) return removalConflict(tool, change, guard);
  switch (change.field) {
    case "path":
      return (
        pathConflict(tool, change.value, guard) ??
        ((await checks.directoryExists(fullName, branch, change.value)) ? null : `${change.value} is not a directory on ${branch}`)
      );
    case "deploy": {
      if (!category?.selfHost) return `deploy is only for tools people run themselves, and ${tool.category} is not selfHost`;
      const unproven = await checks.unprovenDeploy({ ...tool, deploy: change.value }, fullName, branch);
      return unproven.length ? `GitHub shows no ${unproven.join(", ")} artefact from its owner` : null;
    }
    case "capability":
      if (!own(category?.capabilities, change.key)) return `${change.key} is not a capability of ${tool.category}`;
      return checks.unreachable(change.value);
    case "migration":
      if (!replacementOf(tool, change.tool)) return `the entry does not replace ${change.tool}`;
      return checks.unreachable(change.value);
  }
}

async function checked(tool: Tool, change: FieldChange, context: PlanContext): Promise<string | null> {
  try {
    return await refusal(tool, change, context);
  } catch (error) {
    return `could not be checked (${printable((error as Error).message, 200)})`;
  }
}

export async function planTool(tool: Tool, changes: readonly FieldChange[], context: PlanContext): Promise<Planned> {
  let current = tool;
  const accepted: FieldChange[] = [];
  const refused: string[] = [];
  for (const change of changes) {
    const candidate = withChange(current, change);
    const problem = (await checked(current, change, context)) ?? brokenCatalog(candidate, context.guard);
    if (problem) {
      refused.push(`${fieldName(change)}: ${problem}`);
    } else {
      accepted.push(change);
      context.guard.accept(candidate);
      current = candidate;
    }
  }
  return { tool: current, accepted, refused };
}

function brokenCatalog(candidate: Tool, guard: CatalogGuard): string | null {
  const error = guard.introducedError(candidate);
  return error ? `it would make the catalog invalid (${error})` : null;
}

function foreignKeys(tool: Tool, file: LocatedFile, tools: ReadonlyMap<string, MaintainerEntry>, catalog: ReadonlyMap<string, Tool>): string[] {
  return [...tools.keys()].flatMap((slug) => {
    if (slug === tool.slug) return [];
    const other = catalog.get(slug);
    if (!other) return [`lists ${slug}, which the catalog does not have`];
    if (!sameRepository(other.repository, tool.repository)) return [`lists ${slug}, whose repository is ${other.repository}, so it is ignored`];
    if (file.scope === "path") return [`lists ${slug}, which only its own path or the root file can speak for, so it is ignored`];
    return [];
  });
}

export function fileNotes(tool: Tool, fullName: string, files: readonly LocatedFile[], catalog: ReadonlyMap<string, Tool>): string[] {
  return files.flatMap((located) => {
    const where = `${fullName}/${fileLocation(located.scope, tool.path)}`;
    switch (located.file.form) {
      case "rejected":
        return [`${where} is ignored as a whole, so it verifies nothing: it ${located.file.reason}`];
      case "fields":
        return foreignKeys(tool, located, located.file.tools, catalog).map((note) => `${where} ${note}`);
      case "lines":
        return [];
    }
  });
}

export async function applyMaintainerFiles(
  declared: readonly Tool[],
  targets: readonly Tool[],
  facts: ReadonlyMap<string, Read<RepositoryFacts>>,
  published: ReadonlyMap<string, Published>,
  { catalog: current, migrationPages, checks }: MaintainerApply,
): Promise<{ tools: Tool[]; applied: Applied[] }> {
  const catalog = new Map(declared.map((tool) => [tool.slug, tool]));
  const guard = catalogGuard(current, migrationPages);
  const logged = new Set<string>();
  const tools: Tool[] = [];
  const applied: Applied[] = [];
  let budget = MAX_TOOLS_PER_RUN;
  let inspected = 0;
  for (const tool of targets) {
    const read = facts.get(tool.slug);
    if (read?.status !== "read") {
      tools.push(tool);
      continue;
    }
    const { repo, maintainerFiles } = read.value;
    for (const note of fileNotes(tool, repo.fullName, maintainerFiles, catalog)) {
      if (!logged.has(note)) console.log(`maintainer file: ${note}`);
      logged.add(note);
    }
    const moved = movedAway(tool, repo, published.get(tool.slug));
    if (moved) {
      console.log(`${tool.slug}: ${moved}, so its maintainer file is not applied until a person checks the entry`);
      tools.push(tool);
      continue;
    }
    const speaking = speakingFor(tool.slug, maintainerFiles);
    const changes = speaking ? proposals(tool, speaking.entry, new Set(published.get(tool.slug)?.maintainerFields ?? [])) : [];
    if (!speaking || changes.length === 0) {
      tools.push(tool);
      continue;
    }
    if (budget === 0 || inspected === MAX_CHECKED_PER_RUN) {
      console.log(`${tool.slug}: its maintainer file changed, left to the next run`);
      tools.push(tool);
      continue;
    }
    inspected++;
    const category = current.categories.get(tool.category);
    const planned = await planTool(tool, changes, { fullName: repo.fullName, branch: repo.defaultBranch, category, checks, guard });
    for (const reason of planned.refused) console.error(`${tool.slug}: kept the published value of ${reason}`);
    tools.push(planned.tool);
    if (planned.accepted.length) {
      budget--;
      const source = { fullName: repo.fullName, location: fileLocation(speaking.file.scope, tool.path), commit: speaking.file.commit };
      applied.push({ slug: tool.slug, file: tool.file, source, changes: planned.accepted });
    }
  }
  return { tools, applied };
}
