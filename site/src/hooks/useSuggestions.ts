import { useEffect, useMemo, useRef, useState } from "preact/hooks";

import { type SuggestIndex, type Suggestion, suggest } from "../lib/suggest.ts";

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

export interface Suggestions {
  items: Suggestion[];
  active: number;
  setActive: (index: number) => void;
  open: boolean;
  loading: boolean;
  failed: boolean;
  setFocused: (focused: boolean) => void;
  onKeyDown: (event: KeyboardEvent, go: (suggestion: Suggestion) => void) => void;
}

export function useSuggestions(query: string, detail: (name: string) => string): Suggestions {
  const [typing, setTyping] = useState("");
  const [indexState, setIndexState] = useState<IndexState>({ kind: "none" });
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(-1);
  const indexLoad = useRef<AbortController | null>(null);

  const items = useMemo(
    () => (indexState.kind === "ready" && typing ? suggest(indexState.index, typing, detail) : []),
    [indexState, typing, detail],
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

  useEffect(() => () => indexLoad.current?.abort(), []);

  function onKeyDown(event: KeyboardEvent, go: (suggestion: Suggestion) => void) {
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

  return {
    items,
    active,
    setActive,
    open,
    loading: indexState.kind === "loading",
    failed: indexState.kind === "failed",
    setFocused,
    onKeyDown,
  };
}
