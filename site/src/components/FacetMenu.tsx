import { useEffect, useId, useRef, useState } from "preact/hooks";

import { plural } from "../i18n/index.ts";
import { matching } from "../lib/filter.ts";
import type { FacetProps } from "./FacetGroup.tsx";

type Props<T extends string> = FacetProps<T> & { describe: (value: T) => string };

const NAMED_UP_TO = 2;

export function FacetMenu<T extends string>({
  locale,
  strings,
  label,
  facets,
  selected,
  describe,
  onToggle,
  onClear,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const id = useId();
  const shown = matching(facets, query, describe);

  const dismiss = () => {
    setOpen(false);
    setQuery("");
  };
  const close = () => {
    dismiss();
    trigger.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    search.current?.focus();
    const away = (event: Event) => {
      if (!root.current?.contains(event.target as Node)) dismiss();
    };
    document.addEventListener("pointerdown", away);
    document.addEventListener("focusin", away);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("focusin", away);
    };
  }, [open]);

  const move = (step: 1 | -1) => {
    const items = [search.current, ...(root.current?.querySelectorAll<HTMLInputElement>(".facet-option input") ?? [])];
    const at = items.indexOf(document.activeElement as HTMLInputElement);
    items[Math.min(items.length - 1, Math.max(0, at + step))]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (!open) return;
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      move(event.key === "ArrowDown" ? 1 : -1);
    } else if (event.key === "Enter" && event.target === search.current && shown[0]) {
      event.preventDefault();
      onToggle(shown[0].value);
    }
  };

  const summary =
    selected.length === 0
      ? strings.any
      : selected.length <= NAMED_UP_TO
        ? selected.map(describe).join(", ")
        : plural(locale, strings.chosen, selected.length);

  return (
    <div className="facet facet-menu" ref={root} onKeyDown={onKeyDown}>
      <span className="facet-label" id={`${id}-label`}>
        {label}
      </span>
      <div className="facet-anchor">
        <button
          type="button"
          ref={trigger}
          className="facet-trigger"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          aria-labelledby={`${id}-label ${id}-value`}
          data-active={selected.length > 0}
          onClick={() => (open ? close() : setOpen(true))}
        >
          <span id={`${id}-value`}>{summary}</span>
          <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" focusable="false">
            <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="m4 6 4 4 4-4" />
          </svg>
        </button>
        {open && (
          <div className="facet-panel" id={`${id}-panel`} role="group" aria-labelledby={`${id}-label`}>
            <input
              type="search"
              ref={search}
              className="facet-search"
              placeholder={strings.find}
              aria-label={label}
              autocomplete="off"
              spellcheck={false}
              value={query}
              onInput={(event) => setQuery(event.currentTarget.value)}
            />
            {shown.length === 0 ? (
              <p className="facet-none">{strings.noMatch}</p>
            ) : (
              <ul className="facet-options">
                {shown.map(({ value, count }) => (
                  <li key={value}>
                    <label className="facet-option">
                      <input
                        type="checkbox"
                        checked={selected.includes(value)}
                        onChange={() => onToggle(value)}
                      />
                      <span>{describe(value)}</span>
                      <span className="count">{count}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
            {selected.length > 0 && (
              <button
                type="button"
                className="link facet-clear"
                onClick={() => {
                  onClear();
                  search.current?.focus();
                }}
              >
                {strings.clearOne}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
