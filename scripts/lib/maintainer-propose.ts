import type { Catalog } from "./catalog.ts";
import { type Proposal, proposalHash, proposedTool } from "./maintainer-editorial.ts";
import { printable } from "./maintainer-file.ts";
import type { CatalogGuard } from "./maintainer-guard.ts";
import { decide, proposalBody, proposalBranch, proposalTitle, type PullSummary } from "./maintainer-pull.ts";
import { proposedYaml } from "./maintainer-write.ts";

export const MAX_PULLS_PER_RUN = 5;
export const MAX_LOOKUPS_PER_RUN = 50;

export interface ProposalHost {
  pulls(branch: string): Promise<PullSummary[]>;
  push(branch: string, base: string, file: string, text: string, message: string): Promise<void>;
  open(branch: string, title: string, body: string): Promise<number>;
  update(number: number, title: string, body: string): Promise<void>;
  check(branch: string): Promise<void>;
}

export interface ProposeContext {
  catalog: Catalog;
  guard: CatalogGuard;
  base: string;
  read(file: string): Promise<string>;
  host: ProposalHost;
}

export type Outcome = { slug: string; result: "opened" | "updated"; number: number } | { slug: string; result: "skipped" | "failed"; reason: string };

interface Budget {
  pulls: number;
  lookups: number;
}

async function proposeOne(proposal: Proposal, { catalog, guard, base, read, host }: ProposeContext, budget: Budget): Promise<Outcome | null> {
  const { slug } = proposal;
  const tool = catalog.tools.find((candidate) => candidate.slug === slug);
  if (!tool) return { slug: printable(slug), result: "skipped", reason: "the catalog does not have it" };
  const { tool: after, skipped } = proposedTool(tool, proposal.editorial, catalog);
  for (const reason of skipped) console.log(`${slug}: the maintainer file ${printable(reason, 200)}, so it is not proposed`);
  if (after === tool) return null;
  const broken = guard.introducedError(after);
  if (broken) return { slug, result: "skipped", reason: `it would make the catalog invalid (${broken})` };
  if (budget.pulls === 0 || budget.lookups === 0) return { slug, result: "skipped", reason: "left to the next run" };
  budget.lookups--;
  const branch = proposalBranch(slug);
  const hash = proposalHash(slug, proposal.editorial);
  const decision = decide(await host.pulls(branch), hash);
  if (decision.action === "skip") return { slug, result: "skipped", reason: decision.reason };
  budget.pulls--;
  const title = proposalTitle(slug);
  const body = proposalBody(proposal, after, hash);
  await host.push(branch, base, tool.file, proposedYaml(await read(tool.file), tool, after), title);
  const number = decision.action === "open" ? await host.open(branch, title, body) : decision.number;
  if (decision.action === "update") await host.update(number, title, body);
  await host.check(branch);
  return { slug, result: decision.action === "open" ? "opened" : "updated", number };
}

export async function proposeAll(proposals: readonly Proposal[], context: ProposeContext): Promise<Outcome[]> {
  const budget: Budget = { pulls: MAX_PULLS_PER_RUN, lookups: MAX_LOOKUPS_PER_RUN };
  const outcomes: Outcome[] = [];
  for (const proposal of proposals) {
    try {
      const outcome = await proposeOne(proposal, context, budget);
      if (outcome) outcomes.push(outcome);
    } catch (error) {
      outcomes.push({ slug: printable(proposal.slug), result: "failed", reason: printable((error as Error).message, 300) });
    }
  }
  return outcomes;
}
