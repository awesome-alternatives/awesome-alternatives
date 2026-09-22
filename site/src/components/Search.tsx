import { useEffect, useRef, useState } from "preact/hooks";

import { format, type Locale, pathFor, plural } from "../i18n/index.ts";
import type { Islands } from "../i18n/islands.en.ts";
import { listTools, search } from "../lib/api.ts";
import { type ChipKey, chips, without } from "../lib/chips.ts";
import { type SearchFailure, describe, failureFromThrown, guessTarget, offersFallback } from "../lib/failure.ts";
import type { SearchResult } from "../lib/types.ts";
import { ToolCard } from "./ToolCard.tsx";

interface Props {
  locale: Locale;
  strings: Islands;
  names: Record<string, string>;
  examples: string[];
}

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "done"; result: SearchResult }
  | { kind: "error"; failure: SearchFailure; target: string | null };

export default function Search({ locale, strings, names, examples }: Props) {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });
  const inflight = useRef<AbortController | null>(null);
  const copy = strings.search;

  async function run(load: (signal: AbortSignal) => Promise<SearchResult>, target: string | null) {
    inflight.current?.abort();
    const controller = new AbortController();
    inflight.current = controller;
    setState({ kind: "loading" });
    try {
      setState({ kind: "done", result: await load(controller.signal) });
    } catch (error) {
      if (controller.signal.aborted) return;
      setState({ kind: "error", failure: failureFromThrown(error), target });
    }
  }

  function submit(q: string) {
    const trimmed = q.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    const url = new URL(window.location.href);
    url.searchParams.set("q", trimmed);
    window.history.replaceState(null, "", url);
    void run((signal) => search(trimmed, signal), guessTarget(trimmed, names));
  }

  function drop(result: SearchResult, key: ChipKey) {
    const filters = without(result.filters, key);
    void run(
      async (signal) => ({ ...result, ...(await listTools(filters, signal)), filters }),
      filters.replaces ?? null,
    );
  }

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) submit(q);
    return () => inflight.current?.abort();
  }, []);

  return (
    <section className="search">
      <form
        role="search"
        action={pathFor(locale, "/")}
        method="get"
        onSubmit={(e) => {
          e.preventDefault();
          submit(query);
        }}
      >
        <label htmlFor="q" className="visually-hidden">
          {copy.label}
        </label>
        <input
          id="q"
          name="q"
          type="search"
          value={query}
          maxLength={300}
          placeholder={copy.placeholder}
          onInput={(e) => setQuery(e.currentTarget.value)}
        />
        <button type="submit" disabled={state.kind === "loading"}>
          {copy.submit}
        </button>
      </form>
      {state.kind === "idle" && (
        <p className="examples">
          {copy.examplesLead}
          {examples.map((example) => (
            <button key={example} type="button" onClick={() => submit(example)}>
              {example}
            </button>
          ))}
        </p>
      )}
      {state.kind === "loading" && <p className="summary">{copy.searching}</p>}
      {state.kind === "error" && (
        <Failure
          locale={locale}
          strings={strings}
          failure={state.failure}
          target={state.target}
          names={names}
        />
      )}
      {state.kind === "done" && (
        <Results locale={locale} strings={strings} result={state.result} names={names} onDrop={drop} />
      )}
      <p className="visually-hidden" role="status" aria-live="polite">
        {announcement(locale, state, copy)}
      </p>
    </section>
  );
}

function announcement(locale: Locale, state: State, copy: Islands["search"]): string {
  if (state.kind === "loading") return copy.searching;
  if (state.kind === "done") return plural(locale, copy.count, state.result.count);
  return "";
}

function Failure({
  locale,
  strings,
  failure,
  target,
  names,
}: {
  locale: Locale;
  strings: Islands;
  failure: SearchFailure;
  target: string | null;
  names: Record<string, string>;
}) {
  const { fallbackTargeted, fallbackBrowse } = strings.search;
  return (
    <div className="empty" role="alert">
      <p>{describe(locale, failure, strings.failure)}</p>
      {offersFallback(failure) && (
        <p>
          {target ? (
            <>
              {fallbackTargeted.before}
              <a href={pathFor(locale, `/alternatives/${target}/`)}>
                {format(fallbackTargeted.link, { name: names[target] ?? target })}
              </a>
              {fallbackTargeted.between}
              <a href={pathFor(locale, "/#browse")}>{fallbackTargeted.browse}</a>
              {fallbackTargeted.after}
            </>
          ) : (
            <>
              <a href={pathFor(locale, "/#browse")}>{fallbackBrowse.browse}</a>
              {fallbackBrowse.after}
            </>
          )}
        </p>
      )}
    </div>
  );
}

function Results({
  locale,
  strings,
  result,
  names,
  onDrop,
}: {
  locale: Locale;
  strings: Islands;
  result: SearchResult;
  names: Record<string, string>;
  onDrop: (result: SearchResult, key: ChipKey) => void;
}) {
  const copy = strings.search;
  const read = chips(result.filters, copy.chips, (slug) => names[slug] ?? slug);
  if (read.length === 0 && result.count === 0) {
    return (
      <p className="empty">
        {copy.noMatch.before}
        <a href={pathFor(locale, "/contribute/")}>{copy.noMatch.link}</a>
        {copy.noMatch.after}
      </p>
    );
  }
  return (
    <>
      <div className="chips" aria-label={copy.chipsLabel}>
        {read.map((chip) => (
          <span key={chip.key} className="chip">
            {chip.label}
            <button
              type="button"
              aria-label={format(copy.removeChip, { label: chip.label })}
              onClick={() => onDrop(result, chip.key)}
            >
              {copy.removeGlyph}
            </button>
          </span>
        ))}
        {read.length === 0 && <span className="summary">{copy.closest}</span>}
        <span className="interpreter">
          {result.interpretedBy === "jev" ? copy.interpreter.jev : copy.interpreter.local}
        </span>
      </div>
      <p className="summary">{plural(locale, copy.count, result.count)}</p>
      <div className="tools">
        {result.tools.map((tool) => (
          <ToolCard
            key={tool.slug}
            locale={locale}
            strings={strings}
            tool={tool}
            target={result.filters.replaces}
          />
        ))}
      </div>
    </>
  );
}
