import { useEffect, useMemo, useRef, useState } from "preact/hooks";

import { format, type Locale, pathFor, plural } from "../i18n/index.ts";
import type { Islands } from "../i18n/islands.en.ts";
import { listTools, search } from "../lib/api.ts";
import { type ChipKey, chips, without } from "../lib/chips.ts";
import { type SearchFailure, describe, failureFromThrown, guessTarget, offersFallback } from "../lib/failure.ts";
import { isRefined, readSearchUrl, type Refinement, refined, searchParams } from "../lib/searchUrl.ts";
import { href, type SuggestIndex, type Suggestion, suggest } from "../lib/suggest.ts";
import type { Filters, SearchResult } from "../lib/types.ts";
import { ToolCard } from "./ToolCard.tsx";

const DEBOUNCE_MS = 180;

type IndexState =
  | { kind: "none" }
  | { kind: "loading" }
  | { kind: "ready"; index: SuggestIndex }
  | { kind: "failed" };

async function loadIndex(signal: AbortSignal): Promise<SuggestIndex> {
  const response = await fetch("/search-index.json", { signal });
  if (!response.ok) throw new Error(String(response.status));
  return await response.json();
}

export interface CategoryOption {
  key: string;
  name: string;
}

interface Props {
  locale: Locale;
  strings: Islands;
  names: Record<string, string>;
  examples: string[];
  categories: CategoryOption[];
}

type Source = { kind: "search"; q: string } | { kind: "list"; filters: Filters };

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "done"; result: SearchResult; source: Source }
  | { kind: "error"; failure: SearchFailure; target: string | null };

export default function Search({ locale, strings, names, examples, categories }: Props) {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });
  const [typing, setTyping] = useState("");
  const [indexState, setIndexState] = useState<IndexState>({ kind: "none" });
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(-1);
  const [refinement, setRefinement] = useState<Refinement>({});
  const [appending, setAppending] = useState(false);
  const inflight = useRef<AbortController | null>(null);
  const indexLoad = useRef<AbortController | null>(null);
  const copy = strings.search;
  const hint = copy.suggestions;

  const items = useMemo(
    () =>
      indexState.kind === "ready" && typing
        ? suggest(indexState.index, typing, (name) => format(hint.alternativesTo, { name }))
        : [],
    [indexState, typing, hint.alternativesTo],
  );
  const open = focused && typing.length > 0 && indexState.kind !== "none";

  useEffect(() => {
    const id = setTimeout(() => setTyping(query.trim()), DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [query]);

  useEffect(() => setActive(-1), [items]);

  useEffect(() => {
    if (active < 0) return;
    document.getElementById(`suggestion-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  useEffect(() => {
    if (!typing || indexState.kind !== "none") return;
    const controller = new AbortController();
    indexLoad.current = controller;
    setIndexState({ kind: "loading" });
    loadIndex(controller.signal)
      .then((index) => setIndexState({ kind: "ready", index }))
      .catch(() => {
        if (!controller.signal.aborted) setIndexState({ kind: "failed" });
      });
  }, [typing, indexState.kind]);

  function go(suggestion: Suggestion) {
    window.location.assign(pathFor(locale, href(suggestion)));
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      setFocused(false);
      return;
    }
    if (!open || items.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) => (current + 1) % items.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => (current <= 0 ? items.length - 1 : current - 1));
    } else if (event.key === "Enter" && active >= 0) {
      event.preventDefault();
      go(items[active]);
    }
  }

  async function run(
    load: (signal: AbortSignal) => Promise<SearchResult>,
    target: string | null,
    source: Source,
  ) {
    inflight.current?.abort();
    const controller = new AbortController();
    inflight.current = controller;
    setState({ kind: "loading" });
    try {
      setState({ kind: "done", result: await load(controller.signal), source });
    } catch (error) {
      if (controller.signal.aborted) return;
      setState({ kind: "error", failure: failureFromThrown(error), target });
    }
  }

  async function more() {
    if (state.kind !== "done" || appending) return;
    const base = state.result;
    const from = base.tools.length;
    if (from >= base.count) return;
    inflight.current?.abort();
    const controller = new AbortController();
    inflight.current = controller;
    setAppending(true);
    try {
      const next =
        state.source.kind === "search"
          ? await search(state.source.q, controller.signal, from)
          : await listTools(state.source.filters, controller.signal, from);
      setState({
        kind: "done",
        source: state.source,
        result: { ...base, ...next, tools: [...base.tools, ...next.tools] },
      });
    } catch (error) {
      if (!controller.signal.aborted) {
        setState({ kind: "error", failure: failureFromThrown(error), target: base.filters.replaces ?? null });
      }
    } finally {
      setAppending(false);
    }
  }

  function remember(q: string, next: Refinement) {
    const url = new URL(window.location.href);
    url.search = searchParams(q, next).toString();
    window.history.replaceState(null, "", url);
  }

  function submit(q: string, next: Refinement = refinement) {
    const trimmed = q.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    remember(trimmed, next);
    void run(async (signal) => {
      const result = await search(trimmed, signal);
      if (!isRefined(next)) return result;
      const filters = refined(result.filters, next);
      return { ...result, ...(await listTools(filters, signal)), filters };
    }, guessTarget(trimmed, names), { kind: "search", q: trimmed });
  }

  function refine(next: Refinement) {
    setRefinement(next);
    remember(query, next);
    if (state.kind !== "done") return;
    const base = state.result;
    const filters = refined(base.filters, next);
    void run(
      async (signal) => ({ ...base, ...(await listTools(filters, signal)), filters }),
      filters.replaces ?? null,
      { kind: "list", filters },
    );
  }

  function drop(result: SearchResult, key: ChipKey) {
    const filters = without(result.filters, key);
    void run(
      async (signal) => ({ ...result, ...(await listTools(filters, signal)), filters }),
      filters.replaces ?? null,
      { kind: "list", filters },
    );
  }

  useEffect(() => {
    const { q, refinement: fromUrl } = readSearchUrl(window.location.search);
    setRefinement(fromUrl);
    if (q) submit(q, fromUrl);
    return () => {
      inflight.current?.abort();
      indexLoad.current?.abort();
    };
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
        <div
          className="search-field"
          onFocusOut={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
          }}
        >
          <input
            id="q"
            name="q"
            type="search"
            value={query}
            maxLength={300}
            placeholder={copy.placeholder}
            autoComplete="off"
            role="combobox"
            aria-expanded={open}
            aria-controls="suggestions"
            aria-autocomplete="list"
            aria-activedescendant={active >= 0 ? `suggestion-${active}` : undefined}
            onInput={(e) => setQuery(e.currentTarget.value)}
            onFocus={() => setFocused(true)}
            onKeyDown={onKeyDown}
          />
          {open && (
            <div id="suggestions" className="suggestions" role="listbox" aria-label={hint.label}>
              {indexState.kind === "loading" && <p className="suggestion-note">{hint.loading}</p>}
              {indexState.kind === "failed" && <p className="suggestion-note">{hint.failed}</p>}
              {indexState.kind === "ready" && items.length === 0 && (
                <p className="suggestion-note">{hint.empty}</p>
              )}
              {items.map((item, i) => (
                <a
                  key={`${item.kind}-${item.slug}`}
                  id={`suggestion-${i}`}
                  role="option"
                  aria-selected={i === active}
                  className={i === active ? "suggestion is-active" : "suggestion"}
                  href={pathFor(locale, href(item))}
                  onMouseEnter={() => setActive(i)}
                >
                  <span className="suggestion-name">{item.name}</span>
                  <span className="suggestion-detail">{item.detail}</span>
                </a>
              ))}
            </div>
          )}
        </div>
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
        <>
          <Refine
            copy={copy.refine}
            categories={categories}
            refinement={refinement}
            dropIn={refinement.dropIn ?? state.result.filters.dropIn ?? false}
            onChange={refine}
          />
          <Results
            locale={locale}
            strings={strings}
            result={state.result}
            names={names}
            onDrop={drop}
            onMore={more}
            appending={appending}
          />
        </>
      )}
      <p className="visually-hidden" role="status" aria-live="polite">
        {announcement(locale, state, copy)}
      </p>
    </section>
  );
}

function Refine({
  copy,
  categories,
  refinement,
  dropIn,
  onChange,
}: {
  copy: Islands["search"]["refine"];
  categories: CategoryOption[];
  refinement: Refinement;
  dropIn: boolean;
  onChange: (next: Refinement) => void;
}) {
  return (
    <div className="refine" role="group" aria-label={copy.label}>
      <label className="refine-field">
        <span>{copy.category}</span>
        <select
          value={refinement.category ?? ""}
          onChange={(event) =>
            onChange({ ...refinement, category: event.currentTarget.value || undefined })
          }
        >
          <option value="">{copy.anyCategory}</option>
          {categories.map((category) => (
            <option key={category.key} value={category.key}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label className="refine-toggle">
        <input
          type="checkbox"
          checked={dropIn}
          onChange={(event) => onChange({ ...refinement, dropIn: event.currentTarget.checked })}
        />
        <span>{copy.dropIn}</span>
      </label>
    </div>
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
  onMore,
  appending,
}: {
  locale: Locale;
  strings: Islands;
  result: SearchResult;
  names: Record<string, string>;
  onDrop: (result: SearchResult, key: ChipKey) => void;
  onMore: () => void;
  appending: boolean;
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
      <p className="summary">
        {result.tools.length < result.count
          ? format(copy.showing, { shown: result.tools.length, n: result.count })
          : plural(locale, copy.count, result.count)}
      </p>
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
      {result.tools.length < result.count && (
        <p className="more">
          <button type="button" onClick={onMore} disabled={appending}>
            {appending ? copy.searching : copy.more}
          </button>
        </p>
      )}
    </>
  );
}
