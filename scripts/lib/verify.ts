import { checkDeploy, fetchDeployEvidence } from "./deploy.ts";
import { ownerOf } from "./facts.ts";
import { gather } from "./gather.ts";
import { type GitHub, repoPath } from "./github.ts";
import { judge } from "./rules.ts";
import type { Finding, FindingCode, RepoFacts, Tool } from "./types.ts";

const UNKNOWN_WITHOUT_RELEASES: ReadonlySet<FindingCode> = new Set(["no-release"]);

function unreadableFromCi(tool: Tool, repo: RepoFacts | null): Finding {
  const owner = ownerOf(repoPath(tool.repository));
  const unchecked = repo
    ? "only the repository's own settings were checked: its releases, maintainer file and deploy artefacts could not be read"
    : "nothing about the repository could be checked";
  return {
    slug: tool.slug,
    severity: "warning",
    code: "unreadable-from-ci",
    message: `\`${owner}\` has an IP allow list that refuses GitHub's runners, so ${unchecked}. The nightly refresh is refused too, see CONTRIBUTING`,
  };
}

export async function verifyTool(gh: GitHub, tool: Tool, now: Date, replaced: ReadonlySet<string>): Promise<Finding[]> {
  const gathered = await gather(gh, tool);
  switch (gathered.status) {
    case "behind-allow-list": {
      const { repo } = gathered;
      const known = repo
        ? judge(tool, { repo, release: null, starHistory: [] }, now, replaced).filter((f) => !UNKNOWN_WITHOUT_RELEASES.has(f.code))
        : [];
      return [...known, unreadableFromCi(tool, repo)];
    }
    case "read": {
      const { evidence } = gathered;
      const { repo } = evidence;
      const deploy =
        tool.deploy?.length && repo
          ? checkDeploy(tool, await fetchDeployEvidence(gh, repo.fullName, repo.defaultBranch, tool.deploy, tool.path))
          : [];
      return [...judge(tool, evidence, now, replaced), ...deploy];
    }
  }
}
