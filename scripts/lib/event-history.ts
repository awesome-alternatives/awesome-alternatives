import { type EventHistory, EVENTS_PATH, eventsOf, recordEvents } from "./event-log.ts";
import { diffCatalogs } from "./events.ts";
import { fileLogArgs, fileRevisions, git, logRevisions } from "./history.ts";
import { CATALOG_PATH } from "./publish.ts";
import type { CatalogEvent } from "./types.ts";

export class IncompleteHistory extends Error {
  constructor(root: string) {
    super(
      `${root} has no complete git history, it is a shallow clone or no repository at all. Events are read from every commit that touched ${CATALOG_PATH}, so clone it in full or run git fetch --unshallow first.`,
    );
  }
}

export interface CatalogState {
  sha: string;
  at: string;
  tools: readonly unknown[];
}

function hasFullHistory(root: string): boolean {
  try {
    return git(root, ["rev-parse", "--is-shallow-repository"]).trim() === "false";
  } catch {
    return false;
  }
}

export function gitEventHistory(root: string): EventHistory | null {
  if (!hasFullHistory(root)) return null;
  return {
    revisionsSince(at) {
      const revisions = logRevisions(root, fileLogArgs(EVENTS_PATH, new Date(at))).reverse();
      return [...fileRevisions(root, EVENTS_PATH, revisions)].map(({ sha, content }) => ({ sha, events: eventsOf(content) }));
    },
  };
}

export function eventsAcross(states: Iterable<CatalogState>): CatalogEvent[] {
  let log: CatalogEvent[] = [];
  let previous: readonly unknown[] = [];
  for (const { sha, at, tools } of states) {
    log = recordEvents(log, diffCatalogs(previous, tools, at, sha));
    previous = tools;
  }
  return log;
}

function toolsOf(catalog: unknown): readonly unknown[] | null {
  if (typeof catalog !== "object" || catalog === null || !("tools" in catalog)) return null;
  return Array.isArray(catalog.tools) ? catalog.tools : null;
}

function* catalogStates(root: string): Generator<CatalogState> {
  const revisions = logRevisions(root, ["log", "--topo-order", "--reverse", "--format=%H %cI", "--", CATALOG_PATH]);
  for (const { sha, at, content } of fileRevisions(root, CATALOG_PATH, revisions)) {
    const tools = toolsOf(content);
    if (tools) yield { sha, at, tools };
  }
}

export function backfillEvents(root: string): CatalogEvent[] {
  if (!hasFullHistory(root)) throw new IncompleteHistory(root);
  return eventsAcross(catalogStates(root));
}
