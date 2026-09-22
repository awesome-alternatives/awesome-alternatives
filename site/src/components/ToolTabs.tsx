import { useEffect, useState } from "preact/hooks";

import type { ReleaseEntry } from "../../../scripts/lib/types.ts";
import { readme, security } from "../lib/api.ts";
import { day, FIT_LABEL } from "../lib/format.ts";
import { scoreLevel, type TabId, tabFromHash } from "../lib/tabs.ts";
import type { Fit, Readme, SecurityReport, ToolView } from "../lib/types.ts";
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
  slug: string;
  repository: string;
  releases: ReleaseEntry[];
  latest: Latest | null;
  replaces: ReplacedTool[];
  alternatives: ToolView[];
}

type Remote<T> = { kind: "idle" } | { kind: "loading" } | { kind: "done"; value: T } | { kind: "error" };

const LABEL: Record<TabId, string> = {
  readme: "README",
  releases: "Releases",
  security: "Security",
  alternatives: "Alternatives",
  replaces: "Replaces",
};

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
      <div className="tablist" role="tablist" aria-label="Tool details">
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
            {LABEL[tab]}
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
          {tab === "readme" && <ReadmePanel active={active === tab} slug={props.slug} repository={props.repository} />}
          {tab === "releases" && <ReleasesPanel releases={props.releases} latest={props.latest} />}
          {tab === "security" && (
            <SecurityPanel
              active={active === tab}
              slug={props.slug}
              repository={props.repository}
              latest={props.latest}
            />
          )}
          {tab === "alternatives" && (
            <div className="tools">
              {props.alternatives.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} target={props.slug} />
              ))}
            </div>
          )}
          {tab === "replaces" && <ReplacesPanel replaces={props.replaces} />}
        </div>
      ))}
    </section>
  );
}

function ReadmePanel({ active, slug, repository }: { active: boolean; slug: string; repository: string }) {
  const state = useRemote<Readme>(active, (signal) => readme(slug, signal));
  if (state.kind === "idle" || state.kind === "loading") return <p className="summary">Loading the README</p>;
  if (state.kind === "error") {
    return (
      <p className="empty">
        The README could not be loaded right now. <a href={`${repository}#readme`}>Read it on GitHub</a>.
      </p>
    );
  }
  if (!state.value.html) return <p className="empty">This repository has no README.</p>;
  return <article className="readme" dangerouslySetInnerHTML={{ __html: state.value.html }} />;
}

function ReleasesPanel({ releases, latest }: { releases: ReleaseEntry[]; latest: Latest | null }) {
  if (releases.length === 0) return <p className="empty">This repository publishes tags, not GitHub releases.</p>;
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
            {r.prerelease && <span className="mark">pre-release</span>}
            {latest?.signed && latest.tag === r.tag && <span className="mark mark-good">✓ signed</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}

function SecurityPanel({
  active,
  slug,
  repository,
  latest,
}: {
  active: boolean;
  slug: string;
  repository: string;
  latest: Latest | null;
}) {
  const state = useRemote<SecurityReport>(active, (signal) => security(slug, signal));
  return (
    <div className="security">
      <p className="security-line">
        {!latest && "No release or tag to check a signature on."}
        {latest?.signed && (
          <>
            <span className="mark mark-good">✓ signed</span> The latest release, {latest.tag}, carries a signature
            GitHub verified.
          </>
        )}
        {latest && !latest.signed && (
          <>
            <span className="mark mark-warn">unsigned</span> The latest release, {latest.tag}, carries no signature
            GitHub could verify.
          </>
        )}
      </p>
      {(state.kind === "idle" || state.kind === "loading") && <p className="summary">Loading the security report</p>}
      {state.kind === "error" && (
        <p className="empty">
          The security report could not be loaded right now.{" "}
          <a href={`${repository}/security`}>See it on GitHub</a>.
        </p>
      )}
      {state.kind === "done" && <Report report={state.value} repository={repository} />}
    </div>
  );
}

function Report({ report, repository }: { report: SecurityReport; repository: string }) {
  const { scorecard, advisories } = report;
  return (
    <>
      <p className="section-label">OpenSSF Scorecard</p>
      {scorecard ? (
        <>
          <p className="scorecard-total">
            <span className={`score score-${scoreLevel(scorecard.score)}`}>{scorecard.score.toFixed(1)}</span>
            <span className="summary">/ 10, checked {scorecard.date}</span>
          </p>
          <ul className="checks">
            {scorecard.checks.map((check) => (
              <li key={check.name}>
                <span className={`score score-${scoreLevel(check.score)}`}>{check.score ?? "n/a"}</span>
                <span>
                  {check.url ? <a href={check.url}>{check.name}</a> : check.name}
                  <span className="check-reason">{check.reason}</span>
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="empty">OpenSSF Scorecard has not scored this repository.</p>
      )}
      <p className="section-label">Published advisories</p>
      {advisories.length === 0 ? (
        <p className="empty">
          No security advisory published on <a href={`${repository}/security/advisories`}>GitHub</a>.
        </p>
      ) : (
        <ul className="advisories">
          {advisories.map((a) => (
            <li key={a.ghsaId}>
              <span className={`mark severity-${a.severity ?? "unknown"}`}>{a.severity ?? "unrated"}</span>
              <span>
                <a href={a.url}>{a.summary}</a>
                <span className="check-reason">
                  {a.cveId ?? a.ghsaId}
                  {a.publishedAt && `, ${day(a.publishedAt)}`}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function ReplacesPanel({ replaces }: { replaces: ReplacedTool[] }) {
  return (
    <ul className="replaces">
      {replaces.map((r) => (
        <li key={r.slug}>
          <a href={`/alternatives/${r.slug}/`}>{r.name}</a>
          <span className="tool-note">{r.note ?? ""}</span>
          <span className={`fit fit-${r.fit}`}>{FIT_LABEL[r.fit]}</span>
        </li>
      ))}
    </ul>
  );
}
