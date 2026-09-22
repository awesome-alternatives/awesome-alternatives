import { useEffect, useState } from "preact/hooks";

import type { ReleaseEntry } from "../../../scripts/lib/types.ts";
import { format, type Locale, pathFor } from "../i18n/index.ts";
import type { Islands } from "../i18n/islands.en.ts";
import { readme, security } from "../lib/api.ts";
import { day } from "../lib/format.ts";
import { scoreLevel, type TabId, tabFromHash } from "../lib/tabs.ts";
import type { Fit, Readme, SecurityReport, ToolView } from "../lib/types.ts";
import { Mark } from "./Mark.tsx";
import { ToolCard } from "./ToolCard.tsx";

export interface ReplacedTool {
  slug: string;
  name: string;
  fit: Fit;
  note: string | null;
}

export interface Latest {
  tag: string;
  signed: boolean;
}

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

type Remote<T> = { kind: "idle" } | { kind: "loading" } | { kind: "done"; value: T } | { kind: "error" };

type TabStrings = Islands["tabs"];

function useRemote<T>(active: boolean, load: (signal: AbortSignal) => Promise<T>): Remote<T> {
  const [state, setState] = useState<Remote<T>>({ kind: "idle" });
  useEffect(() => {
    if (!active || state.kind !== "idle") return;
    const controller = new AbortController();
    setState({ kind: "loading" });
    load(controller.signal)
      .then((value) => setState({ kind: "done", value }))
      .catch(() => {
        if (!controller.signal.aborted) setState({ kind: "error" });
      });
  }, [active, state.kind]);
  return state;
}

export default function ToolTabs(props: Props) {
  const available: TabId[] = [
    "readme",
    "releases",
    "security",
    ...(props.alternatives.length > 0 ? (["alternatives"] as const) : []),
    ...(props.replaces.length > 0 ? (["replaces"] as const) : []),
  ];
  const [active, setActive] = useState<TabId>("readme");
  const copy = props.strings.tabs;

  useEffect(() => {
    setActive(tabFromHash(window.location.hash, available));
  }, []);

  function select(tab: TabId) {
    setActive(tab);
    window.history.replaceState(null, "", tab === "readme" ? window.location.pathname : `#${tab}`);
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
            <div className="tools">
              {props.alternatives.map((tool) => (
                <ToolCard
                  key={tool.slug}
                  locale={props.locale}
                  strings={props.strings}
                  tool={tool}
                  target={props.slug}
                />
              ))}
            </div>
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

function ReadmePanel({
  strings,
  active,
  slug,
  repository,
}: {
  strings: TabStrings;
  active: boolean;
  slug: string;
  repository: string;
}) {
  const copy = strings.readme;
  const state = useRemote<Readme>(active, (signal) => readme(slug, signal));
  if (state.kind === "idle" || state.kind === "loading") return <p className="summary">{copy.loading}</p>;
  if (state.kind === "error") {
    return (
      <p className="empty">
        {copy.errorBefore}
        <a href={`${repository}#readme`}>{copy.errorLink}</a>
        {copy.errorAfter}
      </p>
    );
  }
  if (!state.value.html) return <p className="empty">{copy.empty}</p>;
  return <article className="readme" dangerouslySetInnerHTML={{ __html: state.value.html }} />;
}

function ReleasesPanel({
  strings,
  releases,
  latest,
}: {
  strings: TabStrings;
  releases: ReleaseEntry[];
  latest: Latest | null;
}) {
  const copy = strings.releases;
  if (releases.length === 0) return <p className="empty">{copy.empty}</p>;
  return (
    <ol className="history">
      {releases.map((r) => (
        <li key={r.tag}>
          <span>
            <a className="history-tag" href={r.url}>
              {r.tag}
            </a>
            <span className="history-date">{day(r.publishedAt)}</span>
          </span>
          <span className="history-name">{r.name ?? ""}</span>
          <span className="history-marks">
            {r.prerelease && <span className="mark">{copy.prerelease}</span>}
            {latest?.signed && latest.tag === r.tag && <Mark icon="signed" label={copy.signed} />}
          </span>
        </li>
      ))}
    </ol>
  );
}

function SecurityPanel({
  strings,
  active,
  slug,
  repository,
  latest,
}: {
  strings: TabStrings;
  active: boolean;
  slug: string;
  repository: string;
  latest: Latest | null;
}) {
  const copy = strings.security;
  const state = useRemote<SecurityReport>(active, (signal) => security(slug, signal));
  return (
    <div className="security">
      <p className="security-line">
        {!latest && copy.noRelease}
        {latest?.signed && (
          <>
            <span className="mark mark-good">{copy.signedMark}</span>{" "}
            {format(copy.signedText, { tag: latest.tag })}
          </>
        )}
        {latest && !latest.signed && (
          <>
            <span className="mark mark-warn">{copy.unsignedMark}</span>{" "}
            {format(copy.unsignedText, { tag: latest.tag })}
          </>
        )}
      </p>
      {(state.kind === "idle" || state.kind === "loading") && <p className="summary">{copy.loading}</p>}
      {state.kind === "error" && (
        <p className="empty">
          {copy.errorBefore}
          <a href={`${repository}/security`}>{copy.errorLink}</a>
          {copy.errorAfter}
        </p>
      )}
      {state.kind === "done" && <Report strings={strings} report={state.value} repository={repository} />}
    </div>
  );
}

function Report({
  strings,
  report,
  repository,
}: {
  strings: TabStrings;
  report: SecurityReport;
  repository: string;
}) {
  const copy = strings.security;
  const { scorecard, advisories } = report;
  return (
    <>
      <p className="section-label">{copy.scorecard}</p>
      {scorecard ? (
        <>
          <p className="scorecard-total">
            <span className={`score score-${scoreLevel(scorecard.score)}`}>{scorecard.score.toFixed(1)}</span>
            <span className="summary">{format(copy.scorecardTotal, { date: scorecard.date })}</span>
          </p>
          <ul className="checks">
            {scorecard.checks.map((check) => (
              <li key={check.name}>
                <span className={`score score-${scoreLevel(check.score)}`}>{check.score ?? copy.noScore}</span>
                <span>
                  {check.url ? <a href={check.url}>{check.name}</a> : check.name}
                  <span className="check-reason">{check.reason}</span>
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="empty">{copy.scorecardEmpty}</p>
      )}
      <p className="section-label">{copy.advisories}</p>
      {advisories.length === 0 ? (
        <p className="empty">
          {copy.advisoriesEmptyBefore}
          <a href={`${repository}/security/advisories`}>{copy.advisoriesEmptyLink}</a>
          {copy.advisoriesEmptyAfter}
        </p>
      ) : (
        <ul className="advisories">
          {advisories.map((a) => (
            <li key={a.ghsaId}>
              <span className={`mark severity-${a.severity ?? "unknown"}`}>{a.severity ?? copy.unrated}</span>
              <span>
                <a href={a.url}>{a.summary}</a>
                <span className="check-reason">
                  {a.cveId ?? a.ghsaId}
                  {a.publishedAt && format(copy.advisoryDate, { date: day(a.publishedAt) ?? "" })}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function ReplacesPanel({
  locale,
  strings,
  replaces,
}: {
  locale: Locale;
  strings: Islands;
  replaces: ReplacedTool[];
}) {
  return (
    <ul className="replaces">
      {replaces.map((r) => (
        <li key={r.slug}>
          <a href={pathFor(locale, `/alternatives/${r.slug}/`)}>{r.name}</a>
          <span className="tool-note">{r.note ?? ""}</span>
          <span className={`fit fit-${r.fit}`}>{strings.fit[r.fit]}</span>
        </li>
      ))}
    </ul>
  );
}
