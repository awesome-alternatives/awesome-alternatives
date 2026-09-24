import { Etags } from "./etags.ts";

export class GitHubError extends Error {
  readonly status: number;
  readonly path: string;

  constructor(status: number, path: string, message: string) {
    super(`GitHub ${status} on ${path}: ${message}`);
    this.status = status;
    this.path = path;
  }
}

export interface GitHub {
  get<T>(path: string, accept?: string): Promise<T | null>;
}

export function createGitHub(
  token: string | undefined,
  fetchImpl: typeof fetch = fetch,
  etags: Etags = Etags.empty(),
): GitHub {
  return {
    async get<T>(path: string, accept = "application/vnd.github+json"): Promise<T | null> {
      const key = `${accept} ${path}`;
      const known = etags.read(key);
      const headers: Record<string, string> = {
        accept,
        "x-github-api-version": "2022-11-28",
        "user-agent": "awesome-alternatives-verifier",
      };
      if (token) headers.authorization = `Bearer ${token}`;
      if (known) headers["if-none-match"] = known.etag;

      const res = await fetchImpl(`https://api.github.com${path}`, { headers, redirect: "follow" });
      if (res.status === 304 && known) return known.body as T;
      if (res.status === 404) {
        etags.forget(key);
        return null;
      }
      if (!res.ok) {
        const body = await res.text();
        const limited = res.headers.get("x-ratelimit-remaining") === "0";
        throw new GitHubError(res.status, path, limited ? "rate limit exhausted" : body.slice(0, 200));
      }
      const body = (await res.json()) as T;
      const etag = res.headers.get("etag");
      if (etag) etags.write(key, { etag, body });
      return body;
    },
  };
}

export function repoPath(repository: string): string {
  const url = new URL(repository);
  return url.pathname.replace(/^\/|\/$/g, "");
}
