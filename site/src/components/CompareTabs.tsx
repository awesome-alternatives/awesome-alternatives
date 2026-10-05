import type { ComponentChildren } from "preact";

import type { ReleaseEntry } from "../../../scripts/lib/types.ts";
import type { Islands } from "../i18n/islands.en.ts";
import { Tabs } from "./Tabs.tsx";
import { ReleasesPanel } from "./tabs/ReleasesPanel.tsx";
import { SecurityPanel } from "./tabs/SecurityPanel.tsx";
import type { Latest } from "./tabs/types.ts";

export interface CompareSide {
  name: string;
  slug: string;
  repository: string;
  releases: ReleaseEntry[];
  latest: Latest | null;
}

interface Props {
  strings: Islands;
  sides: [CompareSide, CompareSide];
  measured: boolean;
  overview?: ComponentChildren;
  performance?: ComponentChildren;
  resources?: ComponentChildren;
}

type CompareTab = "overview" | "performance" | "releases" | "security" | "resources";

export function compareTabs(measured: boolean): [CompareTab, ...CompareTab[]] {
  return measured
    ? ["overview", "performance", "releases", "security", "resources"]
    : ["overview", "releases", "security", "resources"];
}

export default function CompareTabs({ strings, sides, measured, overview, performance, resources }: Props) {
  const copy = strings.tabs;
  const columns = (render: (side: CompareSide) => ComponentChildren) => (
    <div className="compare-columns">
      {sides.map((side) => (
        <div key={side.slug} className="compare-column">
          <h3>{side.name}</h3>
          {render(side)}
        </div>
      ))}
    </div>
  );
  return (
    <Tabs
      label={copy.label}
      className="tool-tabs compare-tabs"
      tabs={compareTabs(measured)}
      names={copy.names}
      panel={(tab, active) => (
        <>
          {tab === "overview" && overview}
          {tab === "performance" && performance}
          {tab === "releases" &&
            columns((side) => <ReleasesPanel strings={copy} releases={side.releases} latest={side.latest} />)}
          {tab === "security" &&
            columns((side) => (
              <SecurityPanel
                strings={copy}
                active={active}
                slug={side.slug}
                repository={side.repository}
                latest={side.latest}
              />
            ))}
          {tab === "resources" && resources}
        </>
      )}
    />
  );
}
