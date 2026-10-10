import { stripLocale } from "../i18n/index.ts";
import { type IndexEntry, normalise, type Suggestion, type SuggestIndex, toSuggestions } from "./suggest.ts";

const LIMIT = 4;
const MIN_OVERLAP = 3;
const SLUG_PATH = /^\/(?:tools|alternatives)\/([^/]+)/;
const COMPARE_PATH = /^\/compare\/([^/]+)/;
const FILE_SUFFIX = /\.(?:md|json)$/;

function decoded(segment: string): string {
  try {
    return decodeURIComponent(segment).replace(FILE_SUFFIX, "");
  } catch {
    return segment;
  }
}

export function missingTerms(pathname: string): string[] {
  const path = stripLocale(pathname);
  const slug = SLUG_PATH.exec(path)?.[1];
  if (slug) return [decoded(slug)];
  const pair = COMPARE_PATH.exec(path)?.[1];
  return pair ? decoded(pair).split("-vs-").filter(Boolean) : [];
}

function distance(a: string, b: string): number {
  let previous = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    for (let j = 1; j <= b.length; j++) {
      row[j] = Math.min(previous[j] + 1, row[j - 1] + 1, previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    previous = row;
  }
  return previous[b.length];
}

function keyScore(key: string, term: string): number {
  if (key === term) return 0;
  const [short, long] = key.length < term.length ? [key, term] : [term, key];
  if (short.length >= MIN_OVERLAP && long.startsWith(short)) return 1;
  if (short.length >= MIN_OVERLAP && long.includes(short)) return 2;
  const edits = distance(key, term);
  return edits <= Math.max(1, Math.floor(long.length / 4)) ? 2 + edits : -1;
}

function score(entry: IndexEntry, terms: string[]): number {
  const found = terms
    .flatMap((term) => [keyScore(normalise(entry.slug), term), keyScore(normalise(entry.name), term)])
    .filter((value) => value >= 0);
  return found.length === 0 ? -1 : Math.min(...found);
}

export function closest(
  index: SuggestIndex,
  terms: string[],
  alternativesTo: (name: string) => string,
  limit = LIMIT,
): Suggestion[] {
  const needles = terms.map(normalise).filter(Boolean);
  if (needles.length === 0) return [];
  const ranked = index.tools
    .map((entry) => ({ entry, score: score(entry, needles) }))
    .filter(({ score: value }) => value >= 0)
    .sort((a, b) => a.score - b.score || a.entry.name.localeCompare(b.entry.name))
    .map(({ entry }) => entry);
  return toSuggestions(index, ranked.slice(0, limit), alternativesTo);
}
