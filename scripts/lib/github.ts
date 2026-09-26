export class GitHubError extends Error {
  readonly status: number;
  readonly path: string;

  constructor(status: number, path: string, message: string) {
    super(`GitHub ${status} on ${path}: ${message}`);
    this.status = status;
    this.path = path;
  }
}

export class AllowListRefusal extends GitHubError {
  constructor(path: string, message: string) {
    super(403, path, message);
  }
}

const ALLOW_LIST_REFUSAL = /has an IP allow list enabled/;

export function isAllowListRefusal(message: string): boolean {
  return ALLOW_LIST_REFUSAL.test(message);
}

export interface GitHub {
  get<T>(path: string, accept?: string): Promise<T | null>;
}

export function createGitHub(token: string | undefined, fetchImpl: typeof fetch = fetch): GitHub {
  return {
    async get<T>(path: string, accept = "application/vnd.github+json"): Promise<T | null> {
      const headers: Record<string, string> = {
        accept,
        "x-github-api-version": "2022-11-28",
        "user-agent": "awesome-alternatives-verifier",
      };
      if (token) headers.authorization = `Bearer ${token}`;

      const res = await fetchImpl(`https://api.github.com${path}`, { headers, redirect: "follow" });
      if (res.status === 404) return null;
      if (!res.ok) {
        const body = await res.text();
        if (res.status === 403 && isAllowListRefusal(body)) throw new AllowListRefusal(path, body.slice(0, 300));
        const limited = res.headers.get("x-ratelimit-remaining") === "0";
        throw new GitHubError(res.status, path, limited ? "rate limit exhausted" : body.slice(0, 200));
      }
      return (await res.json()) as T;
    },
  };
}

export function repoPath(repository: string): string {
  const url = new URL(repository);
  return url.pathname.replace(/^\/|\/$/g, "");
}
