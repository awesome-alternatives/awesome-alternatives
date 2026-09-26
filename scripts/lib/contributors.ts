import type { ActiveContributors } from "./types.ts";

export const ACTIVE_DAYS = 90;
export const HISTORY_PAGE_SIZE = 100;
export const HISTORY_PAGES = 5;
export const HISTORY_LIMIT = HISTORY_PAGE_SIZE * HISTORY_PAGES;

const DAY_MS = 24 * 60 * 60 * 1000;
const BOT = /\[bot\]/i;

export interface CommitAuthor {
  name: string | null;
  email: string | null;
  user: { login: string } | null;
}

export interface HistoryPage {
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
  nodes: { author: CommitAuthor | null }[];
}

export interface HistoryWalk {
  fullName: string;
  head: string;
  authors: ReadonlySet<string>;
  pages: number;
  cursor: string | null;
  stopped: boolean;
}

export function activeSince(now: Date): string {
  return new Date(now.getTime() - ACTIVE_DAYS * DAY_MS).toISOString();
}

export function isBot(author: CommitAuthor): boolean {
  return [author.user?.login, author.name, author.email].some((value) => value != null && BOT.test(value));
}

export function authorKey(author: CommitAuthor): string | null {
  if (isBot(author)) return null;
  if (author.user) return `user:${author.user.login.toLowerCase()}`;
  const email = author.email?.trim().toLowerCase();
  if (email) return `email:${email}`;
  const name = author.name?.trim().toLowerCase();
  return name ? `name:${name}` : null;
}

export function startWalk(fullName: string, head: string): HistoryWalk {
  return { fullName, head, authors: new Set(), pages: 0, cursor: null, stopped: false };
}

export function stop(walk: HistoryWalk): HistoryWalk {
  return { ...walk, stopped: true };
}

export function hasMore(walk: HistoryWalk): boolean {
  return !walk.stopped && walk.pages < HISTORY_PAGES && (walk.pages === 0 || walk.cursor !== null);
}

export function advance(walk: HistoryWalk, page: HistoryPage): HistoryWalk {
  const authors = new Set(walk.authors);
  for (const { author } of page.nodes) {
    const key = author && authorKey(author);
    if (key) authors.add(key);
  }
  return {
    ...walk,
    authors,
    pages: walk.pages + 1,
    cursor: page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null,
  };
}

export function contributorsOf(walk: HistoryWalk): ActiveContributors | null {
  return walk.pages === 0 ? null : { count: walk.authors.size, capped: walk.cursor !== null };
}
