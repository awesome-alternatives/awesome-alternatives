import { GitHubError } from "./github.ts";

export interface OpenPull {
  number: number;
  headSha: string;
}

export interface ValidateRun {
  id: number;
  event: string;
  headSha: string;
  status: string;
  conclusion: string | null;
}

export interface RecheckHost {
  pullsLabelled(label: string): Promise<OpenPull[]>;
  validateRuns(headSha: string): Promise<ValidateRun[]>;
  rerun(id: number): Promise<void>;
}

export type RecheckOutcome =
  | { number: number; result: "rerun"; run: number }
  | { number: number; result: "skipped"; reason: string };

const FINISHED = new Set(["success", "failure"]);

export function runToRerun(runs: readonly ValidateRun[], headSha: string): ValidateRun | string {
  const latest = runs.filter((run) => run.event === "pull_request" && run.headSha === headSha).sort((a, b) => b.id - a.id)[0];
  if (!latest) return "Validate never ran on the current head";
  if (latest.status !== "completed") return `the latest Validate run is ${latest.status}`;
  if (!FINISHED.has(latest.conclusion ?? "")) return `the latest Validate run ended ${latest.conclusion ?? "without a conclusion"}`;
  return latest;
}

export async function recheckLabelled(host: RecheckHost, label: string): Promise<RecheckOutcome[]> {
  const outcomes: RecheckOutcome[] = [];
  for (const pull of await host.pullsLabelled(label)) {
    const run = runToRerun(await host.validateRuns(pull.headSha), pull.headSha);
    if (typeof run === "string") {
      outcomes.push({ number: pull.number, result: "skipped", reason: run });
      continue;
    }
    await host.rerun(run.id);
    outcomes.push({ number: pull.number, result: "rerun", run: run.id });
  }
  return outcomes;
}

export function createRecheckHost(repository: string, token: string, fetchImpl: typeof fetch = fetch): RecheckHost {
  const base = `/repos/${repository}`;

  async function call<T>(method: "GET" | "POST", path: string): Promise<T> {
    const res = await fetchImpl(`https://api.github.com${path}`, {
      method,
      headers: {
        accept: "application/vnd.github+json",
        authorization: `Bearer ${token}`,
        "x-github-api-version": "2022-11-28",
        "user-agent": "awesome-alternatives-labels",
      },
    });
    if (!res.ok) throw new GitHubError(res.status, path, (await res.text()).slice(0, 200));
    return (res.status === 201 || res.status === 204 ? null : await res.json()) as T;
  }

  return {
    async pullsLabelled(label) {
      const pulls = await call<{ number: number; head: { sha: string }; labels: { name: string }[] }[]>(
        "GET",
        `${base}/pulls?state=open&per_page=100`,
      );
      return pulls
        .filter((pull) => pull.labels.some((l) => l.name === label))
        .map((pull) => ({ number: pull.number, headSha: pull.head.sha }));
    },
    async validateRuns(headSha) {
      const { workflow_runs } = await call<{
        workflow_runs: { id: number; event: string; head_sha: string; status: string; conclusion: string | null }[];
      }>("GET", `${base}/actions/workflows/validate.yml/runs?head_sha=${headSha}&per_page=20`);
      return workflow_runs.map((run) => ({
        id: run.id,
        event: run.event,
        headSha: run.head_sha,
        status: run.status,
        conclusion: run.conclusion,
      }));
    },
    async rerun(id) {
      await call("POST", `${base}/actions/runs/${id}/rerun`);
    },
  };
}
