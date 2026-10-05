import type { ReleaseEntry } from "../../../scripts/lib/types.ts";
import type { Locale } from "../i18n/index.ts";
import type { Islands } from "../i18n/islands.en.ts";
import { tabsFor } from "../lib/tabs.ts";
import type { ToolView } from "../lib/types.ts";
import { Tabs } from "./Tabs.tsx";
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
  const copy = props.strings.tabs;
  return (
    <Tabs
      label={copy.label}
      className="tool-tabs"
      tabs={tabsFor({ alternatives: props.alternatives.length, replaces: props.replaces.length })}
      names={copy.names}
      counts={{
        releases: props.releases.length,
        alternatives: props.alternatives.length,
        replaces: props.replaces.length,
      }}
      panel={(tab, active) => (
        <>
          {tab === "readme" && (
            <ReadmePanel strings={copy} active={active} slug={props.slug} repository={props.repository} />
          )}
          {tab === "releases" && <ReleasesPanel strings={copy} releases={props.releases} latest={props.latest} />}
          {tab === "security" && (
            <SecurityPanel
              strings={copy}
              active={active}
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
          {tab === "replaces" && <ReplacesPanel locale={props.locale} strings={props.strings} replaces={props.replaces} />}
        </>
      )}
    />
  );
}
