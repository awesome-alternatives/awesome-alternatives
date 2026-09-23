import type { Locale } from "../i18n/index.ts";
import type { Islands } from "../i18n/islands.en.ts";
import type { Facet } from "../lib/filter.ts";
import { FacetMenu } from "./FacetMenu.tsx";

export interface FacetProps<T extends string> {
  locale: Locale;
  strings: Islands["facets"];
  label: string;
  facets: Facet<T>[];
  selected: readonly T[];
  describe?: (value: T) => string;
  onToggle: (value: T) => void;
  onClear: () => void;
}

const MENU_AFTER = 6;

export function FacetGroup<T extends string>(props: FacetProps<T>) {
  const { strings, label, facets, selected, describe = (v: T) => v, onToggle, onClear } = props;
  if (facets.length < 2) return null;
  if (facets.length > MENU_AFTER) return <FacetMenu {...props} describe={describe} />;
  return (
    <fieldset className="facet">
      <legend>{label}</legend>
      <button type="button" aria-pressed={selected.length === 0} onClick={onClear}>
        {strings.any}
      </button>
      {facets.map(({ value, count }) => (
        <button
          key={value}
          type="button"
          aria-pressed={selected.includes(value)}
          onClick={() => onToggle(value)}
        >
          {describe(value)} <span className="count">{count}</span>
        </button>
      ))}
    </fieldset>
  );
}
