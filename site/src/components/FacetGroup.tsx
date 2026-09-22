import type { Facet } from "../lib/filter.ts";

interface Props<T extends string> {
  label: string;
  facets: Facet<T>[];
  selected: T | null;
  describe?: (value: T) => string;
  onSelect: (value: T | null) => void;
}

export function FacetGroup<T extends string>({ label, facets, selected, describe = (v) => v, onSelect }: Props<T>) {
  if (facets.length < 2) return null;
  return (
    <fieldset className="facet">
      <legend>{label}</legend>
      <button type="button" aria-pressed={selected === null} onClick={() => onSelect(null)}>
        Any
      </button>
      {facets.map(({ value, count }) => (
        <button
          key={value}
          type="button"
          aria-pressed={selected === value}
          onClick={() => onSelect(selected === value ? null : value)}
        >
          {describe(value)} <span className="count">{count}</span>
        </button>
      ))}
    </fieldset>
  );
}
