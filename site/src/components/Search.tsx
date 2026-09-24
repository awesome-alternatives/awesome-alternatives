import { useCallback } from "preact/hooks";

import { format, type Locale, pathFor, plural } from "../i18n/index.ts";
import type { Islands } from "../i18n/islands.en.ts";
import { useSearch, type State } from "../hooks/useSearch.ts";
import { useSuggestions } from "../hooks/useSuggestions.ts";
import { href, type Suggestion } from "../lib/suggest.ts";
import { type CategoryOption, SearchRefine } from "./SearchRefine.tsx";
import { SearchFailure } from "./SearchFailure.tsx";
import { SearchResults } from "./SearchResults.tsx";

export type { CategoryOption };

interface Props {
  locale: Locale;
  strings: Islands;
  names: Record<string, string>;
  examples: string[];
  categories: CategoryOption[];
  capabilities: Record<string, string>;
}

export default function Search({ locale, strings, names, examples, categories, capabilities }: Props) {
  const copy = strings.search;
  const hint = copy.suggestions;

  const { query, setQuery, state, refinement, appending, submit, refine, drop, more } =
    useSearch(names);
  const detail = useCallback(
    (name: string) => format(hint.alternativesTo, { name }),
    [hint.alternativesTo],
  );
  const suggestions = useSuggestions(query, detail);

  function go(suggestion: Suggestion) {
    window.location.assign(pathFor(locale, href(suggestion)));
  }

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
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              suggestions.setFocused(false);
            }
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
            aria-expanded={suggestions.open}
            aria-controls="suggestions"
            aria-autocomplete="list"
            aria-activedescendant={
              suggestions.active >= 0 ? `suggestion-${suggestions.active}` : undefined
            }
            onInput={(e) => setQuery(e.currentTarget.value)}
            onFocus={() => suggestions.setFocused(true)}
            onKeyDown={(event) => suggestions.onKeyDown(event, go)}
          />
          {suggestions.open && (
            <div id="suggestions" className="suggestions" role="listbox" aria-label={hint.label}>
              {suggestions.loading && <p className="suggestion-note">{hint.loading}</p>}
              {suggestions.failed && <p className="suggestion-note">{hint.failed}</p>}
              {!suggestions.loading && !suggestions.failed && suggestions.items.length === 0 && (
                <p className="suggestion-note">{hint.empty}</p>
              )}
              {suggestions.items.map((item, i) => (
                <a
                  key={`${item.kind}-${item.slug}`}
                  id={`suggestion-${i}`}
                  role="option"
                  aria-selected={i === suggestions.active}
                  className={i === suggestions.active ? "suggestion is-active" : "suggestion"}
                  href={pathFor(locale, href(item))}
                  onMouseEnter={() => suggestions.setActive(i)}
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
        <SearchFailure
          locale={locale}
          strings={strings}
          failure={state.failure}
          target={state.target}
          names={names}
        />
      )}
      {state.kind === "done" && (
        <>
          <SearchRefine
            copy={copy.refine}
            categories={categories}
            refinement={refinement}
            dropIn={refinement.dropIn ?? state.result.filters.dropIn ?? false}
            onChange={refine}
          />
          <SearchResults
            locale={locale}
            strings={strings}
            result={state.result}
            names={names}
            capabilities={capabilities}
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

function announcement(locale: Locale, state: State, copy: Islands["search"]): string {
  if (state.kind === "loading") return copy.searching;
  if (state.kind === "done") return plural(locale, copy.count, state.result.count);
  return "";
}
