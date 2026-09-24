import { Fragment, type ComponentChildren } from "preact";
import type { TrendFacts } from "../../../scripts/lib/types.ts";
import { format, type Locale, pathFor } from "../i18n/index.ts";
import type { Islands, LabelledFlag } from "../i18n/islands.en.ts";
import { comparePath } from "../lib/compare.ts";
import { migrationPath } from "../lib/migrations.ts";
import { day, stars } from "../lib/format.ts";
import { Mark } from "./Mark.tsx";
import { slugify } from "../lib/slug.ts";
import type { ToolView } from "../lib/types.ts";

interface Replaced {
  slug: string;
  name: string;
}

interface Props {
  locale: Locale;
  strings: Islands;
  tool: ToolView;
  target?: string;
  targetName?: string;
  comparable?: boolean;
  trend?: TrendFacts;
  replaces?: Replaced[];
  notes?: boolean;
  criteria?: string;
  gap?: string;
}

export function ToolCard({
  locale,
  strings,
  tool,
  target,
  targetName,
  comparable,
  trend,
  replaces,
  notes,
  criteria,
  gap,
}: Props) {
  const replacement = target ? tool.replaces.find((r) => r.tool === target) : undefined;
  const { release, repo } = tool;
  const flags = tool.flags.filter((flag): flag is LabelledFlag => flag !== "archived");
  const flagLabels = strings.flag;
  const card = strings.card;
  return (
    <article className="tool">
      <header className="tool-head">
        <a className="tool-name" href={pathFor(locale, `/tools/${tool.slug}/`)}>
          {tool.name}
        </a>
        {tool.maintainerVerified && (
          <Mark icon="verified" label={card.verified} href={pathFor(locale, "/about/#verified")} />
        )}
        {repo.archived && (
          <a className="mark mark-archived" href={pathFor(locale, "/about/#archived")}>
            {card.archived}
          </a>
        )}
        {replacement && (
          <a className={`fit fit-${replacement.fit}`} href={pathFor(locale, `/about/#${replacement.fit}`)}>
            {strings.fit[replacement.fit]}
          </a>
        )}
        {target && comparable && (
          <Mark
            icon="compare"
            muted
            label={format(card.compare, { name: targetName ?? target })}
            href={pathFor(locale, comparePath(tool.slug, target))}
          />
        )}
      </header>
      {repo.description && <p className="tool-description">{repo.description}</p>}
      {replacement?.note && <p className="tool-note">{replacement.note}</p>}
      {replacement?.migration && (
        <p className="migration-link">
          {notes && target && (
            <>
              <a href={pathFor(locale, migrationPath(target, tool.slug))}>{card.migrationNotes}</a>{" "}
            </>
          )}
          <a href={replacement.migration}>{card.migration}</a>
        </p>
      )}
      <dl className="facts">
        {replaces && replaces.length > 0 && (
          <Fact
            label={card.factReplaces}
            value={
              <span>
                {replaces.map((r, i) => (
                  <Fragment key={r.slug}>
                    {i > 0 && ", "}
                    <a href={pathFor(locale, `/alternatives/${r.slug}/`)}>{r.name}</a>
                  </Fragment>
                ))}
              </span>
            }
          />
        )}
        <Fact
          label={card.factLanguage}
          value={
            <IndexLink
              locale={locale}
              index="languages"
              value={repo.language}
              fallback={card.unknownLanguage}
            />
          }
        />
        <Fact
          label={card.factLicense}
          value={<IndexLink locale={locale} index="licenses" value={repo.license} fallback={card.noLicense} />}
        />
        <Fact label={card.factStars} value={stars(repo.stars)} />
        {trend && (
          <Fact
            label={card.factTrend}
            value={format(trend.exact ? card.trendStars : card.trendStarsFloor, { n: trend.stars })}
          />
        )}
        {release && (
          <Fact
            label={card.factLatest}
            value={
              <>
                <a href={release.url}>{release.tag}</a>
                {release.signed && (
                  <Mark icon="signed" label={card.signed} href={pathFor(locale, "/about/#signed")} />
                )}
              </>
            }
          />
        )}
        <Fact label={card.factLastPush} value={day(repo.pushedAt)} />
      </dl>
      {flags.length > 0 && (
        <p className="marks">
          {flags.map((flag) => (
            <a key={flag} className="mark mark-warn" href={pathFor(locale, `/about/#${flag}`)}>
              {flagLabels[flag]}
            </a>
          ))}
        </p>
      )}
      {(criteria || gap) && (
        <p className="criteria">
          {criteria}
          {criteria && gap && " "}
          {gap && <span className="criteria-gap">{gap}</span>}
        </p>
      )}
    </article>
  );
}

function IndexLink({
  locale,
  index,
  value,
  fallback,
}: {
  locale: Locale;
  index: "languages" | "licenses";
  value: string | null;
  fallback: string;
}) {
  return value ? <a href={pathFor(locale, `/${index}/${slugify(value)}/`)}>{value}</a> : fallback;
}

function Fact({ label, value }: { label: string; value: ComponentChildren }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
