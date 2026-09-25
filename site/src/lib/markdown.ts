import { ACTIVE_DAYS, HISTORY_LIMIT } from "../../../scripts/lib/contributors.ts";
import type { DeployMethod, EnrichedTool, Terms } from "../../../scripts/lib/types.ts";
import { historyUrl } from "./freshness.ts";
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
    const scope = contributors.monorepoPath ? `, counted across the whole repository, not only ${contributors.monorepoPath}` : "";
    lines.push(`- Active contributors: ${authors} on the default branch in the last ${ACTIVE_DAYS} days, bots left out${scope}`);
  }
  if (platforms) lines.push(`- Platforms, read from the latest release's files: ${platforms}`);
  return lines;
}

function facts(tool: EnrichedTool, categoryName: string, selfHost: boolean): string[] {
  const { repo, release } = tool;
  const lines = [
    `- Category: ${categoryName}`,
    `- Language: ${repo.language ?? "not detected"}`,
    `- Licence: ${repo.license ?? "not detected"}`,
    `- Terms: ${TERMS[tool.terms]}`,
    `- Stars: ${repo.stars}`,
    `- Forks: ${repo.forks}`,
    `- Last push: ${repo.pushedAt.slice(0, 10)}`,
  ];
  lines.push(
    release
      ? `- Latest release: ${release.tag}${release.signed ? ", signed" : ", unsigned"}, ${release.url}`
      : "- Latest release: none",
  );
  if (selfHost) lines.push("- Self-hosted: you can run it on your own machines");
  if (tool.deploy.length > 0) lines.push(`- Deploy: ${tool.deploy.map((method) => DEPLOY[method]).join(", ")}`);
  if (repo.archived) lines.push("- Archived: the repository no longer receives changes");
  if (tool.maintainerVerified) lines.push("- Verified: its maintainers vouch for this entry");
  if (tool.flags.length > 0) lines.push(`- Warnings: ${tool.flags.join(", ")}`);
  return lines;
}

export function toolMarkdown(tool: EnrichedTool, around: Surroundings): string {
  const { repo } = tool;
  const out = [`# ${tool.name}`, ""];
  if (repo.description) out.push(`> ${repo.description}`, "");

  if (tool.replaces.length > 0) {
    out.push("## Replaces", "");
    for (const replacement of tool.replaces) {
      const note = replacement.note ? ` ${replacement.note}` : "";
      out.push(
        `- ${around.nameOf(replacement.tool)} (${replacement.fit}):${note || " no note"} ${SITE}/alternatives/${replacement.tool}/`,
      );
      if (replacement.migration) out.push(`  - Official migration guide: ${replacement.migration}`);
      if (around.migrationNotes.includes(replacement.tool)) {
        out.push(`  - Migration notes: ${SITE}/migrate/${replacement.tool}/${tool.slug}/`);
      }
    }
    out.push("");
  }

  if (around.replacedBy.length > 0) {
    out.push("## Replaced by", "");
    for (const other of around.replacedBy) {
      out.push(`- ${other.name}: ${SITE}/tools/${other.slug}.md`);
    }
    out.push("");
  }

  out.push(
    "## Facts from GitHub",
    "",
    ...facts(tool, around.categoryName, around.selfHost),
    ...vitality(tool, around.checkedAt),
    "",
  );

  out.push(
    "## Freshness",
    "",
    ...(around.checkedAt ? [`- Read from GitHub: ${around.checkedAt.slice(0, 10)}`] : []),
    `- Entry last edited: ${tool.editedAt.slice(0, 10)}, ${historyUrl(tool.slug)}`,
    "",
  );

  const capabilities = Object.entries(tool.capabilities);
  if (capabilities.length > 0) {
    out.push(
      "## Capabilities",
      "",
      ...capabilities.map(
        ([key, capability]) =>
          `- ${around.capabilityLabels[key] ?? key}: ${capability.docs}${capability.note ? ` (${capability.note})` : ""}`,
      ),
      "",
    );
  }

  if (tool.affiliation) out.push("## Affiliation", "", tool.affiliation, "");

  out.push(
    "## Links",
    "",
    `- Repository: ${tool.repository}`,
    ...(repo.homepage ? [`- Homepage: ${repo.homepage}`] : []),
    `- Page: ${SITE}/tools/${tool.slug}/`,
    "",
    `Figures above are read from GitHub every night. The whole catalog, under CC0 1.0, is at ${SITE}/llms.txt`,
    "",
  );
  return out.join("\n");
}
