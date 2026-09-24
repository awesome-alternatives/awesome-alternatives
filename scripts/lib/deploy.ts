import type { GitHub } from "./github.ts";
import type { DeployMethod, Finding, Tool } from "./types.ts";

export interface DeployEvidence {
  name: string;
  paths: string[] | null;
  assets: string[];
  readme: string;
  siblings: string[];
}

interface ApiTree {
  truncated: boolean;
  tree: { path: string; type: string }[];
}

interface ApiLatestRelease {
  assets: { name: string }[];
}

interface ApiReadme {
  content: string;
  encoding: string;
}

interface ApiOwnedRepo {
  name: string;
  archived: boolean;
}

const SIBLING_PAGES = 10;

const NOT_A_BINARY = /(^|[._-])(checksums?|sha\d*sums?|sbom|provenance|source)([._-]|$)|\.(sha\d*|md5|asc|sig|pem|crt|spdx|json|txt|intoto\.jsonl|bundle)$/i;
const PACKAGE_ASSET = /\.(deb|rpm|apk|msi|pkg|pkg\.tar\.\w+)$/i;

const byName = (pattern: RegExp) => (path: string) => pattern.test(path.split("/").pop() ?? "");

const sibling = (generic: RegExp, own: RegExp) => (repo: string, name: string) =>
  generic.test(repo) || (repo.toLowerCase().includes(name.toLowerCase()) && own.test(repo));

interface Clue {
  file?: (path: string) => boolean;
  asset?: (name: string) => boolean;
  readme?: RegExp;
  sibling?: (repo: string, name: string) => boolean;
}

const CLUES: Record<DeployMethod, Clue> = {
  container: {
    file: byName(/^(?!.*\.(md|txt|rst|adoc|html)$)((Dockerfile|Containerfile)([._-][\w.-]+)?|[\w.-]+\.(Dockerfile|Containerfile))$/i),
    readme: /\b(docker|podman) (run|pull)\b|\bghcr\.io\/|\bquay\.io\/|\bdocker\.io\//i,
    sibling: sibling(/^(docker|dockerfiles|containers?)$/i, /docker|container|image/i),
  },
  compose: {
    file: byName(/^(docker-)?compose([._-][\w-]+)?\.ya?ml$/i),
    readme: /\bdocker[ -]compose\b|\bcompose\.ya?ml\b/i,
    sibling: sibling(/^(self-hosted|community-edition|docker-compose)$/i, /compose|self-hosted/i),
  },
  helm: {
    file: byName(/^Chart\.ya?ml$/),
    readme: /\bhelm (install|upgrade|repo add)\b/i,
    sibling: sibling(/^(helm|charts|helm-charts?)$/i, /helm|chart/i),
  },
  binary: {
    asset: (name) => !NOT_A_BINARY.test(name),
  },
  package: {
    asset: (name) => PACKAGE_ASSET.test(name),
    readme: /\b(brew install|apt(-get)? install|dnf install|yum install|pacman -S|zypper install|snap install|winget install|scoop install|choco install)\b/i,
  },
};

export function provenMethods({ name, paths, assets, readme, siblings }: DeployEvidence): Set<DeployMethod> {
  const proven = new Set<DeployMethod>();
  for (const [method, clue] of Object.entries(CLUES) as [DeployMethod, Clue][]) {
    if (
      (clue.file && paths?.some(clue.file)) ||
      (clue.asset && assets.some(clue.asset)) ||
      (clue.readme && clue.readme.test(readme)) ||
      (clue.sibling && siblings.some((repo) => clue.sibling?.(repo, name)))
    ) {
      proven.add(method);
    }
  }
  return proven;
}

export function checkDeploy(tool: Pick<Tool, "slug" | "deploy">, evidence: DeployEvidence): Finding[] {
  const proven = provenMethods(evidence);
  const listing = evidence.paths === null ? ", and the repository is too large to list every file" : "";
  return (tool.deploy ?? [])
    .filter((method) => !proven.has(method))
    .map((method) => ({
      slug: tool.slug,
      severity: "warning" as const,
      code: "deploy-unproven" as const,
      message: `declares ${method} but GitHub shows no ${method} artefact from its owner${listing}, check it is official`,
    }));
}

export async function fetchDeployEvidence(
  gh: GitHub,
  fullName: string,
  branch: string,
  declared: readonly DeployMethod[],
  path?: string,
): Promise<DeployEvidence> {
  const [owner = "", name = ""] = fullName.split("/");
  const [tree, release, readme] = await Promise.all([
    gh.get<ApiTree>(`/repos/${fullName}/git/trees/${encodeURIComponent(branch)}?recursive=1`),
    gh.get<ApiLatestRelease>(`/repos/${fullName}/releases/latest`),
    gh.get<ApiReadme>(path ? `/repos/${fullName}/readme/${path}` : `/repos/${fullName}/readme`),
  ]);
  const evidence: DeployEvidence = {
    name,
    paths: !tree || tree.truncated ? null : tree.tree.filter((e) => e.type === "blob").map((e) => e.path),
    assets: release?.assets.map((a) => a.name) ?? [],
    readme: readme?.encoding === "base64" ? Buffer.from(readme.content, "base64").toString("utf8") : "",
    siblings: [],
  };
  const proven = provenMethods(evidence);
  const unproven = declared.filter((method) => !proven.has(method) && CLUES[method].sibling);
  return unproven.length ? { ...evidence, siblings: await fetchSiblings(gh, owner, name) } : evidence;
}

async function fetchSiblings(gh: GitHub, owner: string, name: string): Promise<string[]> {
  const names: string[] = [];
  for (let page = 1; page <= SIBLING_PAGES; page++) {
    const repos = await gh.get<ApiOwnedRepo[]>(`/users/${owner}/repos?type=owner&per_page=100&page=${page}`);
    if (!repos) break;
    names.push(...repos.filter((r) => !r.archived && r.name !== name).map((r) => r.name));
    if (repos.length < 100) break;
  }
  return names;
}
