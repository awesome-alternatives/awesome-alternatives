import { ACTIVE_DAYS, HISTORY_LIMIT } from "../../../scripts/lib/contributors.ts";
import type { Capability, DeployMethod, EnrichedTool, ReleaseFacts, Replacement, Terms } from "../../../scripts/lib/types.ts";
import { historyUrl } from "./freshness.ts";
import { markdownText as text, markdownUrl as url } from "./markdownText.ts";
import { vitalityOf } from "./vitality.ts";

const SITE = "https://awesome-alternatives.com";

const TERMS: Record<Terms, string> = {
  open: "open source",
  "open-core": "open core, part of it is under a licence that is not open source",
  "source-available": "source available, the licence restricts how it may be used",
  unknown: "not checked, GitHub could not match the licence",
};

const DEPLOY: Record<DeployMethod, string> = {
  container: "container image",
  compose: "compose file",
  helm: "Helm chart",
  binary: "standalone binaries",
  package: "OS packages",
};

export interface Surroundings {
  categoryName: string;
  selfHost: boolean;
  checkedAt: string | null;
  migrationNotes: string[];
  capabilityLabels: Record<string, string>;
  nameOf: (slug: string) => string;
  replacedBy: { slug: string; name: string }[];
}

function counted(n: number, noun: string): string {
  return `${n} ${noun}${n === 1 ? "" : "s"}`;
}

function vitality(tool: EnrichedTool, checkedAt: string | null): string[] {
  const { created, cadenceDays, contributors, platforms } = vitalityOf(tool, checkedAt);
  const age = created.years === 0 ? "less than a year ago" : `${counted(created.years, "year")} ago`;
  const lines = [`- Created: ${created.year}, ${age}`];
  if (cadenceDays !== null) {
    lines.push(`- Release cadence: about ${counted(cadenceDays, "day")} between stable releases, the median gap between the latest ones`);
  }
  if (contributors) {
    const authors = contributors.capped
      ? `at least ${contributors.count} commit authors (only the latest ${HISTORY_LIMIT} commits were read)`
      : counted(contributors.count, "commit author");
    const scope = contributors.monorepoPath ? `, counted across the whole repository, not only ${text(contributors.monorepoPath)}` : "";
    lines.push(`- Active contributors: ${authors} on the default branch in the last ${ACTIVE_DAYS} days, bots left out${scope}`);
  }
  if (platforms) lines.push(`- Platforms, read from the latest release's files: ${platforms}`);
  return lines;
}

function facts(tool: EnrichedTool, categoryName: string, selfHost: boolean): string[] {
  const { repo, release } = tool;
  const lines = [
    `- Category: ${text(categoryName)}`,
    `- Language: ${repo.language ? text(repo.language) : "not detected"}`,
    `- Licence: ${repo.license ? text(repo.license) : "not detected"}`,
    `- Terms: ${TERMS[tool.terms]}`,
    `- Stars: ${repo.stars}`,
    `- Forks: ${repo.forks}`,
    `- Last push: ${repo.pushedAt.slice(0, 10)}`,
  ];
  lines.push(releaseLine(release));
  if (selfHost) lines.push("- Self-hosted: you can run it on your own machines");
  if (tool.deploy.length > 0) lines.push(`- Deploy: ${tool.deploy.map((method) => DEPLOY[method]).join(", ")}`);
  if (repo.archived) lines.push("- Archived: the repository no longer receives changes");
  if (tool.maintainerVerified) lines.push("- Verified: its maintainers vouch for this entry");
  if (tool.flags.length > 0) lines.push(`- Warnings: ${tool.flags.join(", ")}`);
  return lines;
}

function releaseLine(release: ReleaseFacts | null): string {
  if (!release) return "- Latest release: none";
  const signature = release.signed ? "signed" : "unsigned";
  return `- Latest release: ${text(release.tag)}, ${signature}, ${url(release.url)}`;
}

function replacementLines(tool: EnrichedTool, replacement: Replacement, around: Surroundings): string[] {
  const note = replacement.note ? ` ${text(replacement.note)}` : " no note";
  const lines = [`- ${text(around.nameOf(replacement.tool))} (${replacement.fit}):${note} ${SITE}/alternatives/${replacement.tool}/`];
  if (replacement.migration) lines.push(`  - Official migration guide: ${url(replacement.migration)}`);
  if (around.migrationNotes.includes(replacement.tool)) {
    lines.push(`  - Migration notes: ${SITE}/migrate/${replacement.tool}/${tool.slug}/`);
  }
  return lines;
}

function replacesSection(tool: EnrichedTool, around: Surroundings): string[] {
  if (tool.replaces.length === 0) return [];
  return ["## Replaces", "", ...tool.replaces.flatMap((replacement) => replacementLines(tool, replacement, around)), ""];
}

function replacedBySection(around: Surroundings): string[] {
  if (around.replacedBy.length === 0) return [];
  return ["## Replaced by", "", ...around.replacedBy.map((other) => `- ${text(other.name)}: ${SITE}/tools/${other.slug}.md`), ""];
}

function capabilityLine(label: string, capability: Capability): string {
  const note = capability.note ? ` (${text(capability.note)})` : "";
  return `- ${text(label)}: ${url(capability.docs)}${note}`;
}

function capabilitiesSection(tool: EnrichedTool, around: Surroundings): string[] {
  const capabilities = Object.entries(tool.capabilities);
  if (capabilities.length === 0) return [];
  return [
    "## Capabilities",
    "",
    ...capabilities.map(([key, capability]) => capabilityLine(around.capabilityLabels[key] ?? key, capability)),
    "",
  ];
}

export function toolMarkdown(tool: EnrichedTool, around: Surroundings): string {
  const { repo } = tool;
  return [
    `# ${text(tool.name)}`,
    "",
    ...(repo.description ? [`> ${text(repo.description)}`, ""] : []),
    ...replacesSection(tool, around),
    ...replacedBySection(around),
    "## Facts from GitHub",
    "",
    ...facts(tool, around.categoryName, around.selfHost),
    ...vitality(tool, around.checkedAt),
    "",
    "## Freshness",
    "",
    ...(around.checkedAt ? [`- Read from GitHub: ${around.checkedAt.slice(0, 10)}`] : []),
    `- Entry last edited: ${tool.editedAt.slice(0, 10)}, ${historyUrl(tool.slug)}`,
    "",
    ...capabilitiesSection(tool, around),
    ...(tool.affiliation ? ["## Affiliation", "", text(tool.affiliation), ""] : []),
    "## Links",
    "",
    `- Repository: ${url(tool.repository)}`,
    ...(repo.homepage ? [`- Homepage: ${url(repo.homepage)}`] : []),
    `- Page: ${SITE}/tools/${tool.slug}/`,
    "",
    `Figures above are read from GitHub every night. The whole catalog, under CC0 1.0, is at ${SITE}/llms.txt`,
    "",
  ].join("\n");
}
