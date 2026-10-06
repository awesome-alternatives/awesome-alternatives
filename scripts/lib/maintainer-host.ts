import { GitHubError } from "./github.ts";
import type { ProposalHost } from "./maintainer-propose.ts";
import type { PullSummary } from "./maintainer-pull.ts";

export const CHECKS_WORKFLOW = "validate.yml";

type Method = "GET" | "POST" | "PATCH" | "PUT";

export function createProposalHost(repository: string, token: string, fetchImpl: typeof fetch = fetch): ProposalHost {
  const [owner] = repository.split("/");
  const base = `/repos/${repository}`;

  async function send(method: Method, path: string, body?: object): Promise<Response> {
    return fetchImpl(`https://api.github.com${path}`, {
      method,
      headers: {
        accept: "application/vnd.github+json",
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
        "x-github-api-version": "2022-11-28",
        "user-agent": "awesome-alternatives-proposals",
      },
      ...(body && { body: JSON.stringify(body) }),
    });
  }

  async function call<T>(method: Method, path: string, body?: object): Promise<T> {
    const res = await send(method, path, body);
    if (!res.ok) throw new GitHubError(res.status, path, (await res.text()).slice(0, 200));
    return (res.status === 204 ? null : await res.json()) as T;
  }

  async function resetBranch(branch: string, sha: string): Promise<void> {
    const path = `${base}/git/refs/heads/${branch}`;
    const res = await send("PATCH", path, { sha, force: true });
    if (res.status === 422) await call("POST", `${base}/git/refs`, { ref: `refs/heads/${branch}`, sha });
    else if (!res.ok) throw new GitHubError(res.status, path, (await res.text()).slice(0, 200));
  }

  return {
    async pulls(branch) {
      const pulls = await call<PullSummary[]>("GET", `${base}/pulls?state=all&per_page=100&head=${encodeURIComponent(`${owner}:${branch}`)}`);
      return pulls.map(({ number, state, body }) => ({ number, state, body }));
    },
    async push(branch, sha, file, text, message) {
      await resetBranch(branch, sha);
      const { sha: blob } = await call<{ sha: string }>("GET", `${base}/contents/${file}?ref=${sha}`);
      await call("PUT", `${base}/contents/${file}`, { message, content: Buffer.from(text).toString("base64"), sha: blob, branch });
    },
    async open(branch, title, body) {
      const { number } = await call<{ number: number }>("POST", `${base}/pulls`, { title, body, head: branch, base: "main" });
      return number;
    },
    async update(number, title, body) {
      await call("PATCH", `${base}/pulls/${number}`, { title, body });
    },
    async check(branch) {
      await call("POST", `${base}/actions/workflows/${CHECKS_WORKFLOW}/dispatches`, { ref: branch });
    },
  };
}
