import { useEffect, useRef, useState } from "react";

import { listTools, search } from "../lib/api.ts";
import { type ChipKey, chips, without } from "../lib/chips.ts";
import { type SearchFailure, describe, failureFromThrown, guessTarget, offersFallback } from "../lib/failure.ts";
import type { SearchResult } from "../lib/types.ts";
import { ToolCard } from "./ToolCard.tsx";

interface Props {
  names: Record<string, string>;
  examples: string[];
}

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "done"; result: SearchResult }
  | { kind: "error"; failure: SearchFailure; target: string | null };

export default function Search({ names, examples }: Props) {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });
  const inflight = useRef<AbortController | null>(null);

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
        action="/"
        method="get"
        onSubmit={(e) => {
          e.preventDefault();
          submit(query);
        }}
      >
        <label htmlFor="q" className="visually-hidden">
          Describe what you are looking for
        </label>
        <input
          id="q"
          name="q"
          type="search"
          value={query}
          maxLength={300}
          placeholder="Describe what you are looking for"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" disabled={state.kind === "loading"}>
          Search
        </button>
      </form>
      {state.kind === "idle" && (
        <p className="examples">
          Try{" "}
          {examples.map((example) => (
            <button key={example} type="button" onClick={() => submit(example)}>
              {example}
            </button>
          ))}
        </p>
      )}
      {state.kind === "loading" && <p className="summary">Searching</p>}
      {state.kind === "error" && <Failure failure={state.failure} target={state.target} names={names} />}
      {state.kind === "done" && <Results result={state.result} names={names} onDrop={drop} />}
      <p className="visually-hidden" role="status" aria-live="polite">
        {announcement(state)}
      </p>
    </section>
  );
}

function toolCount(count: number): string {
  return count === 1 ? "1 tool" : `${count} tools`;
}

function announcement(state: State): string {
  if (state.kind === "loading") return "Searching";
  if (state.kind === "done") return toolCount(state.result.count);
  return "";
}

function Failure({
  failure,
  target,
  names,
}: {
  failure: SearchFailure;
  target: string | null;
  names: Record<string, string>;
}) {
  return (
    <div className="empty" role="alert">
      <p>{describe(failure)}</p>
      {offersFallback(failure) && (
        <p>
          {target ? (
            <>
              Open the <a href={`/alternatives/${target}/`}>alternatives to {names[target] ?? target}</a> or{" "}
              <a href="/#browse">browse every tool</a>.
            </>
          ) : (
            <>
              <a href="/#browse">Browse every tool</a> instead.
            </>
          )}
        </p>
      )}
    </div>
  );
}

function Results({
  result,
  names,
  onDrop,
}: {
  result: SearchResult;
  names: Record<string, string>;
  onDrop: (result: SearchResult, key: ChipKey) => void;
}) {
  const read = chips(result.filters, (slug) => names[slug] ?? slug);
  if (read.length === 0 && result.count === 0) {
    return (
      <p className="empty">
        Nothing in that query matched the catalog. Name the tool you want to replace, a language or a licence, or{" "}
        <a href="/contribute/">add the tool</a> you were looking for.
      </p>
    );
  }
  return (
    <>
      <div className="chips" aria-label="Filters read from your query">
        {read.map((chip) => (
          <span key={chip.key} className="chip">
            {chip.label}
            <button type="button" aria-label={`Remove ${chip.label}`} onClick={() => onDrop(result, chip.key)}>
              ×
            </button>
          </span>
        ))}
        {read.length === 0 && <span className="summary">Closest matches to your description</span>}
        <span className="interpreter">{result.interpretedBy === "jev" ? "Read by Jev" : "Matched locally"}</span>
      </div>
      <p className="summary">{toolCount(result.count)}</p>
      <div className="tools">
        {result.tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} target={result.filters.replaces} />
        ))}
      </div>
    </>
  );
}
