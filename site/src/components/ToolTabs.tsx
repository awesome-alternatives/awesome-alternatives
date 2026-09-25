import { useEffect, useState } from "preact/hooks";

import type { ReleaseEntry } from "../../../scripts/lib/types.ts";
import type { Locale } from "../i18n/index.ts";
import type { Islands } from "../i18n/islands.en.ts";
import { type TabId, tabFromHash, tabsFor } from "../lib/tabs.ts";
import type { ToolView } from "../lib/types.ts";
import { AlternativesPanel } from "./tabs/AlternativesPanel.tsx";
import { ReadmePanel } from "./tabs/ReadmePanel.tsx";
import { ReleasesPanel } from "./tabs/ReleasesPanel.tsx";
import { ReplacesPanel } from "./tabs/ReplacesPanel.tsx";
import { SecurityPanel } from "./tabs/SecurityPanel.tsx";
import type { Latest, ReplacedTool } from "./tabs/types.ts";

interface Props {
  locale: Locale;
  strings: Islands;
  slug: string;
  repository: string;
  releases: ReleaseEntry[];
  latest: Latest | null;
  replaces: ReplacedTool[];
  alternatives: ToolView[];
}

export default function ToolTabs(props: Props) {
  const available = tabsFor({ alternatives: props.alternatives.length, replaces: props.replaces.length });
  const fallback = available[0] ?? "readme";
  const [active, setActive] = useState<TabId>(fallback);
  const copy = props.strings.tabs;

  useEffect(() => {
    setActive(tabFromHash(window.location.hash, available));
  }, []);

  function select(tab: TabId) {
    setActive(tab);
    window.history.replaceState(null, "", tab === fallback ? window.location.pathname : `#${tab}`);
  }

  const counts: Partial<Record<TabId, number>> = {
    releases: props.releases.length,
    alternatives: props.alternatives.length,
    replaces: props.replaces.length,
  };

  return (
    <section className="tool-tabs">
      <div className="tablist" role="tablist" aria-label={copy.label}>
        {available.map((tab) => (
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
              const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
              if (!step) return;
              const next = available[(available.indexOf(tab) + step + available.length) % available.length];
              if (next) {
                select(next);
                document.getElementById(`tab-${next}`)?.focus();
              }
            }}
          >
            {copy.names[tab]}
            {counts[tab] !== undefined && <span className="tab-count">{counts[tab]}</span>}
          </button>
        ))}
      </div>
      {available.map((tab) => (
        <div
          key={tab}
          className="tabpanel"
          role="tabpanel"
          id={`panel-${tab}`}
          aria-labelledby={`tab-${tab}`}
          hidden={active !== tab}
        >
          {tab === "readme" && (
            <ReadmePanel
              strings={copy}
              active={active === tab}
              slug={props.slug}
              repository={props.repository}
            />
          )}
          {tab === "releases" && (
            <ReleasesPanel strings={copy} releases={props.releases} latest={props.latest} />
          )}
          {tab === "security" && (
            <SecurityPanel
              strings={copy}
              active={active === tab}
              slug={props.slug}
              repository={props.repository}
              latest={props.latest}
            />
          )}
          {tab === "alternatives" && (
            <AlternativesPanel
              locale={props.locale}
              strings={props.strings}
              alternatives={props.alternatives}
              target={props.slug}
            />
          )}
          {tab === "replaces" && (
            <ReplacesPanel
              locale={props.locale}
              strings={props.strings}
              replaces={props.replaces}
            />
          )}
        </div>
      ))}
    </section>
  );
}
