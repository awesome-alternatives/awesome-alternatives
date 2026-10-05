import type { ComponentChildren } from "preact";
import { useEffect, useState } from "preact/hooks";

import { tabFromHash } from "../lib/tabs.ts";

const ARROW_STEPS = new Map([
  ["ArrowRight", 1],
  ["ArrowLeft", -1],
]);

interface Props<T extends string> {
  label: string;
  className: string;
  tabs: readonly [T, ...T[]];
  names: Record<T, string>;
  counts?: Partial<Record<T, number>>;
  panel: (tab: T, active: boolean) => ComponentChildren;
}

export function Tabs<T extends string>({ label, className, tabs, names, counts = {}, panel }: Props<T>) {
  const [fallback] = tabs;
  const [active, setActive] = useState<T>(fallback);

  useEffect(() => {
    setActive(tabFromHash(window.location.hash, tabs) ?? fallback);
  }, []);

  function select(tab: T) {
    setActive(tab);
    window.history.replaceState(null, "", tab === fallback ? window.location.pathname : `#${tab}`);
  }

  return (
    <section className={className}>
      <div className="tablist" role="tablist" aria-label={label}>
        {tabs.map((tab) => (
          <button
            key={tab}
            id={`tab-${tab}`}
            type="button"
            role="tab"
            aria-selected={active === tab}
            aria-controls={`panel-${tab}`}
            tabIndex={active === tab ? 0 : -1}
            onClick={() => select(tab)}
            onKeyDown={(e) => {
              const step = ARROW_STEPS.get(e.key) ?? 0;
              if (!step) return;
              const next = tabs[(tabs.indexOf(tab) + step + tabs.length) % tabs.length];
              if (next) {
                select(next);
                document.getElementById(`tab-${next}`)?.focus();
              }
            }}
          >
            {names[tab]}
            {counts[tab] !== undefined && <span className="tab-count">{counts[tab]}</span>}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab}
          className="tabpanel"
          role="tabpanel"
          id={`panel-${tab}`}
          aria-labelledby={`tab-${tab}`}
          hidden={active !== tab}
        >
          {panel(tab, active === tab)}
        </div>
      ))}
    </section>
  );
}
