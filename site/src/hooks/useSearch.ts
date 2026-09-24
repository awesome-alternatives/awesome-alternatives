import { useEffect, useRef, useState } from "preact/hooks";

import { listTools, search } from "../lib/api.ts";
import { type ChipKey, without } from "../lib/chips.ts";
import { type SearchFailure, failureFromThrown, guessTarget } from "../lib/failure.ts";
import { isRefined, readSearchUrl, type Refinement, refined, searchParams } from "../lib/searchUrl.ts";
import type { Filters, SearchResult, ToolList } from "../lib/types.ts";

export type Source = { kind: "search"; q: string } | { kind: "list"; filters: Filters };

export type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "done"; result: SearchResult; source: Source }
  | { kind: "error"; failure: SearchFailure; target: string | null };

export interface Search {
  query: string;
  setQuery: (q: string) => void;
  state: State;
  refinement: Refinement;
  appending: boolean;
  submit: (q: string, next?: Refinement) => void;
  refine: (next: Refinement) => void;
  drop: (result: SearchResult, key: ChipKey, value?: string) => void;
  more: () => void;
}

function listed(base: SearchResult, page: ToolList, filters: Filters): SearchResult {
  return { ...base, ...page, near: page.near ?? [], filters };
}

export function useSearch(names: Record<string, string>): Search {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });
  const [refinement, setRefinement] = useState<Refinement>({});
  const [appending, setAppending] = useState(false);
  const inflight = useRef<AbortController | null>(null);

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
      return listed(result, await listTools(filters, signal), filters);
    }, guessTarget(trimmed, names), { kind: "search", q: trimmed });
  }

  function refine(next: Refinement) {
    setRefinement(next);
    remember(query, next);
    if (state.kind !== "done") return;
    const base = state.result;
    const filters = refined(base.filters, next);
    void run(
      async (signal) => listed(base, await listTools(filters, signal), filters),
      filters.replaces ?? null,
      { kind: "list", filters },
    );
  }

  function drop(result: SearchResult, key: ChipKey, value?: string) {
    const filters = without(result.filters, key, value);
    void run(
      async (signal) => listed(result, await listTools(filters, signal), filters),
      filters.replaces ?? null,
      { kind: "list", filters },
    );
  }

  useEffect(() => {
    const { q, refinement: fromUrl } = readSearchUrl(window.location.search);
    setRefinement(fromUrl);
    if (q) submit(q, fromUrl);
    return () => inflight.current?.abort();
  }, []);

  return { query, setQuery, state, refinement, appending, submit, refine, drop, more };
}
