import { walkHistories } from "./commit-history.ts";
import { activeSince, authorsIn, contributorsOf, HISTORY_LIMIT, type HistoryWalk, startWalk, type WalkedCommit } from "./contributors.ts";
import type { GraphQL } from "./graphql.ts";
import { isRecheckDay } from "./recheck.ts";
import type { ActiveContributors } from "./types.ts";

const OVERLAP_MS = 24 * 60 * 60 * 1000;

export interface CommitWindow {
  head: string;
  walkedAt: string;
  complete: boolean;
  commits: readonly WalkedCommit[];
}

export interface Walked {
  contributors: (ActiveContributors | null)[];
  windows: Map<string, CommitWindow>;
}

interface Plan {
  fullName: string;
  walk: HistoryWalk | null;
  base: CommitWindow | null;
  stored: CommitWindow | undefined;
}

export function settled(head: string, walkedAt: string, commits: readonly WalkedCommit[], complete: boolean, since: string): CommitWindow {
  const known = [...new Map(commits.map((commit) => [commit.oid, commit])).values()];
  const start = Date.parse(since);
  const inWindow = known.filter((commit) => commit.at >= start).sort((a, b) => b.at - a.at);
  const capped = inWindow.length > HISTORY_LIMIT || (!complete && inWindow.length === known.length);
  return { head, walkedAt, complete: !capped, commits: inWindow.slice(0, HISTORY_LIMIT) };
}

export function contributorsIn(window: CommitWindow): ActiveContributors {
  return { count: authorsIn(window.commits), capped: !window.complete };
}

export function planWalk(fullName: string, head: string, stored: CommitWindow | undefined, now: Date): Pick<Plan, "walk" | "base"> {
  const since = activeSince(now);
  if (!stored || isRecheckDay(fullName, now)) return { walk: startWalk(fullName, head, since), base: null };
  if (stored.head === head) return { walk: null, base: stored };
  const from = new Date(Math.max(Date.parse(stored.walkedAt) - OVERLAP_MS, Date.parse(since))).toISOString();
  return { walk: startWalk(fullName, head, from), base: stored };
}

export function windowAfter(walk: HistoryWalk, base: CommitWindow | null, now: Date): CommitWindow | null {
  if (walk.stopped || walk.pages === 0) return null;
  const exhausted = walk.cursor === null;
  const commits = base && exhausted ? [...walk.commits, ...base.commits] : walk.commits;
  return settled(walk.head, now.toISOString(), commits, exhausted && (base?.complete ?? true), activeSince(now));
}

function recounted(window: CommitWindow, now: Date): ActiveContributors {
  return contributorsIn(settled(window.head, window.walkedAt, window.commits, window.complete, activeSince(now)));
}

function contributorsFor(plan: Plan, walked: HistoryWalk | null, now: Date): { contributors: ActiveContributors | null; window: CommitWindow | null } {
  const window = walked && windowAfter(walked, plan.base, now);
  if (window) return { contributors: contributorsIn(window), window };
  if (plan.stored) return { contributors: recounted(plan.stored, now), window: null };
  return { contributors: walked ? contributorsOf(walked) : null, window: null };
}

export async function walkContributors(
  gql: GraphQL,
  repositories: readonly ({ fullName: string; head: string } | null)[],
  stored: ReadonlyMap<string, CommitWindow>,
  now: Date,
): Promise<Walked> {
  const plans = repositories.map((repository): Plan | null => {
    if (!repository) return null;
    const known = stored.get(repository.fullName);
    return { fullName: repository.fullName, stored: known, ...planWalk(repository.fullName, repository.head, known, now) };
  });
  const walks = plans.map((plan) => plan?.walk ?? null);
  const full = plans.filter((plan) => plan?.walk && !plan.base).length;
  const partial = plans.filter((plan) => plan?.walk && plan.base).length;
  console.log(`history: ${full} walked in full, ${partial} from their last walk, ${plans.filter(Boolean).length - full - partial} unchanged`);
  const walked = await walkHistories(gql, walks);
  const windows = new Map<string, CommitWindow>();
  const contributors = plans.map((plan, i) => {
    if (!plan) return null;
    const result = contributorsFor(plan, walked[i] ?? null, now);
    if (result.window) windows.set(plan.fullName, result.window);
    return result.contributors;
  });
  return { contributors, windows };
}
