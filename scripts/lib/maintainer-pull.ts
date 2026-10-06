import { stringify } from "yaml";
import type { Editorial, Proposal } from "./maintainer-editorial.ts";
import type { Tool } from "./types.ts";

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const FULL_NAME = /^[A-Za-z0-9-]+\/[A-Za-z0-9._-]+$/;
const COMMIT = /^[0-9a-f]{40}$/;
const MARKER = "maintainer-proposal:";

export interface PullSummary {
  number: number;
  state: "open" | "closed";
  body: string | null;
}

export type Decision = { action: "open" } | { action: "update"; number: number } | { action: "skip"; reason: string };

function checkedSlug(slug: string): string {
  if (!SLUG.test(slug)) throw new Error(`${JSON.stringify(slug).slice(0, 120)} is not a slug`);
  return slug;
}

export function proposalBranch(slug: string): string {
  return `maintainer/${checkedSlug(slug)}`;
}

export function proposalTitle(slug: string): string {
  return `feat(catalog): update ${checkedSlug(slug)} from its maintainer file`;
}

export function fenced(text: string, info = ""): string {
  const longest = Math.max(0, ...[...text.matchAll(/`+/g)].map(([run]) => run.length));
  const fence = "`".repeat(Math.max(3, longest + 1));
  return `${fence}${info}\n${text}\n${fence}`;
}

export function fileLink({ fullName, location, commit }: Proposal["source"]): string {
  if (!FULL_NAME.test(fullName)) throw new Error(`${JSON.stringify(fullName).slice(0, 120)} is not an owner/name repository`);
  const ref = commit && COMMIT.test(commit) ? commit : "HEAD";
  return `https://github.com/${fullName}/blob/${ref}/${location.split("/").map(encodeURIComponent).join("/")}`;
}

export function decide(pulls: readonly PullSummary[], hash: string): Decision {
  const marked = (pull: PullSummary) => pull.body?.includes(`${MARKER} ${hash}`) ?? false;
  const open = pulls.find((pull) => pull.state === "open");
  if (open) return marked(open) ? { action: "skip", reason: `#${open.number} already proposes it` } : { action: "update", number: open.number };
  const closed = pulls.find(marked);
  return closed ? { action: "skip", reason: `#${closed.number} proposed the same content and was closed` } : { action: "open" };
}

function affiliationNote(editorial: Editorial, after: Tool, fullName: string): string[] {
  if (!editorial.replaces?.length) return [];
  const rivals = editorial.replaces.map(({ tool }) => `\`${tool}\``).join(", ");
  const declared = after.affiliation
    ? ["The entry declares this affiliation:", "", fenced(after.affiliation, "text")]
    : ["The entry declares no affiliation. Whoever maintains a tool has to say so in its entry, so add one before merging."];
  return [
    "",
    `**Affiliation.** These replacements are named by the maintainers of \`${fullName}\`, whose project competes with ${rivals}.`,
    ...declared,
  ];
}

export function proposalBody(proposal: Proposal, after: Tool, hash: string): string {
  const { slug, source, editorial } = proposal;
  return [
    `The maintainers of \`${source.fullName}\` propose this change to \`${slug}\` in [their maintainer file](${fileLink(source)}).`,
    "",
    "Their file is untrusted input, so these fields are never applied without review. Merge if the catalog agrees and close otherwise: a closed proposal is not opened again until the file says something else. The values as read from the file:",
    "",
    fenced(stringify(editorial, { lineWidth: 0 }).trimEnd(), "yaml"),
    ...affiliationNote(editorial, after, source.fullName),
    "",
    `<!-- ${MARKER} ${hash} -->`,
  ].join("\n");
}
