import { day, FIT_LABEL, FLAG_LABEL, stars } from "../lib/format.ts";
import { slugify } from "../lib/slug.ts";
import type { ToolView } from "../lib/types.ts";

interface Props {
  tool: ToolView;
  target?: string;
}

export function ToolCard({ tool, target }: Props) {
  const replacement = target ? tool.replaces.find((r) => r.tool === target) : undefined;
  const { release, repo } = tool;
  const flags = tool.flags.filter((flag) => flag !== "archived");
  return (
    <article className="tool">
      <header className="tool-head">
        <a className="tool-name" href={`/tools/${tool.slug}/`}>
          {tool.name}
        </a>
        {repo.archived && <span className="mark mark-archived">archived</span>}
        {replacement && <span className={`fit fit-${replacement.fit}`}>{FIT_LABEL[replacement.fit]}</span>}
      </header>
      {repo.description && <p className="tool-description">{repo.description}</p>}
      {replacement?.note && <p className="tool-note">{replacement.note}</p>}
      <dl className="facts">
        <Fact label="Language" value={<IndexLink index="languages" value={repo.language} fallback="Unknown" />} />
        <Fact label="Licence" value={<IndexLink index="licenses" value={repo.license} fallback="None detected" />} />
        <Fact label="Stars" value={stars(repo.stars)} />
        {release && (
          <Fact
            label="Latest"
            value={
              <>
                <a href={release.url}>{release.tag}</a>
                {release.signed && <span className="mark mark-good">✓ signed</span>}
              </>
            }
          />
        )}
        <Fact label="Last push" value={day(repo.pushedAt)} />
      </dl>
      {(tool.maintainerVerified || flags.length > 0) && (
        <p className="marks">
          {tool.maintainerVerified && <span className="mark mark-good">Verified by its maintainers</span>}
          {flags.map((flag) => (
            <span key={flag} className="mark mark-warn">
              {FLAG_LABEL[flag] ?? flag}
            </span>
          ))}
        </p>
      )}
    </article>
  );
}

function IndexLink({ index, value, fallback }: { index: "languages" | "licenses"; value: string | null; fallback: string }) {
  return value ? <a href={`/${index}/${slugify(value)}/`}>{value}</a> : fallback;
}

function Fact({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
