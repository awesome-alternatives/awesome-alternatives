import { createPrivateKey, sign, type KeyObject } from "node:crypto";
import { mapLimit } from "./gather.ts";
import { GitHubError } from "./github.ts";

const JWT_LIFETIME_SECONDS = 540;
const CLOCK_SKEW_SECONDS = 60;

export interface Installed {
  accounts: ReadonlySet<string>;
  repositories: ReadonlySet<string>;
}

export interface Installations {
  list(): Promise<Installed>;
}

const PAGE_SIZE = 100;
const INSTALLATION_CONCURRENCY = 4;

interface Installation {
  id: number;
  account: string;
  everyRepository: boolean;
  suspended: boolean;
}

function base64url(value: string | Buffer): string {
  return Buffer.from(value).toString("base64url");
}

export function appJwt(appId: string, key: KeyObject, now: Date): string {
  const issuedAt = Math.floor(now.getTime() / 1000) - CLOCK_SKEW_SECONDS;
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64url(JSON.stringify({ iat: issuedAt, exp: issuedAt + JWT_LIFETIME_SECONDS, iss: appId }));
  const signature = sign("RSA-SHA256", Buffer.from(`${header}.${payload}`), key);
  return `${header}.${payload}.${base64url(signature)}`;
}

function appHeaders(jwt: string): Record<string, string> {
  return {
    accept: "application/vnd.github+json",
    authorization: `Bearer ${jwt}`,
    "x-github-api-version": "2022-11-28",
    "user-agent": "awesome-alternatives-verifier",
  };
}

function installationOf(value: unknown): Installation {
  const id = field(value, "id");
  const account = field(field(value, "account"), "login");
  const selection = field(value, "repository_selection");
  if (typeof id !== "number" || typeof account !== "string" || (selection !== "all" && selection !== "selected")) {
    throw new Error(`GitHub listed an installation without an id, an account or a repository selection: ${JSON.stringify(value).slice(0, 200)}`);
  }
  return { id, account: account.toLowerCase(), everyRepository: selection === "all", suspended: field(value, "suspended_at") != null };
}

function fullNameOf(value: unknown): string {
  const fullName = field(value, "full_name");
  if (typeof fullName !== "string") throw new Error(`GitHub listed an installed repository without a name: ${JSON.stringify(value).slice(0, 200)}`);
  return fullName.toLowerCase();
}

async function paged(fetchImpl: typeof fetch, bearer: string, path: string, listed: (body: unknown) => unknown): Promise<unknown[]> {
  const items: unknown[] = [];
  for (let page = 1; ; page++) {
    const body = listed(await appRequest(fetchImpl, bearer, `${path}?per_page=${PAGE_SIZE}&page=${page}`));
    if (!Array.isArray(body)) throw new Error(`GitHub answered ${path} without a list`);
    items.push(...body);
    if (body.length < PAGE_SIZE) return items;
  }
}

async function selectedRepositories(fetchImpl: typeof fetch, jwt: string, installation: Installation): Promise<string[]> {
  const path = `/app/installations/${installation.id}/access_tokens`;
  const token = field(await appRequest(fetchImpl, jwt, path, { permissions: { metadata: "read" } }), "token");
  if (typeof token !== "string") throw new Error(`GitHub returned no token on ${path}`);
  return (await paged(fetchImpl, token, "/installation/repositories", (body) => field(body, "repositories"))).map(fullNameOf);
}

export function createInstallations(
  appId: string,
  privateKey: string,
  fetchImpl: typeof fetch = fetch,
  clock: () => Date = () => new Date(),
): Installations {
  const key = createPrivateKey(privateKey);
  return {
    async list() {
      const jwt = appJwt(appId, key, clock());
      const active = (await paged(fetchImpl, jwt, "/app/installations", (body) => body)).map(installationOf).filter((i) => !i.suspended);
      const selected = await mapLimit(
        active.filter((i) => !i.everyRepository),
        INSTALLATION_CONCURRENCY,
        (installation) => selectedRepositories(fetchImpl, jwt, installation),
      );
      return {
        accounts: new Set(active.filter((i) => i.everyRepository).map((i) => i.account)),
        repositories: new Set(selected.flat()),
      };
    },
  };
}

export function isInstalledOn(installed: Installed, fullName: string): boolean {
  const name = fullName.toLowerCase();
  const [account = ""] = name.split("/");
  return installed.repositories.has(name) || installed.accounts.has(account);
}

export function isMaintainerVerified(slug: string, claim: readonly string[], fullName: string, installed: Installed | null): boolean {
  return claim.includes(slug) || (installed !== null && isInstalledOn(installed, fullName));
}

export function installationsFromEnv(env: NodeJS.ProcessEnv): Installations | null {
  const { APP_ID, APP_PRIVATE_KEY } = env;
  return APP_ID && APP_PRIVATE_KEY ? createInstallations(APP_ID, APP_PRIVATE_KEY) : null;
}

export const DEFAULT_REPOSITORY = "awesome-alternatives/awesome-alternatives";

async function appRequest(fetchImpl: typeof fetch, jwt: string, path: string, body?: unknown): Promise<unknown> {
  const res = await fetchImpl(`https://api.github.com${path}`, {
    headers: appHeaders(jwt),
    ...(body === undefined ? {} : { method: "POST", body: JSON.stringify(body) }),
  });
  if (!res.ok) throw new GitHubError(res.status, path, (await res.text()).slice(0, 200));
  return res.json();
}

function field(value: unknown, key: string): unknown {
  return typeof value === "object" && value !== null ? Reflect.get(value, key) : undefined;
}

export type ContentsAccess = "read" | "write";

export async function installationToken(
  appId: string,
  privateKey: string,
  repository: string,
  contents: ContentsAccess,
  fetchImpl: typeof fetch = fetch,
  now: Date = new Date(),
): Promise<string> {
  const [owner, name, ...rest] = repository.split("/");
  if (!owner || !name || rest.length) throw new Error(`${repository} is not an owner/name repository`);
  const jwt = appJwt(appId, createPrivateKey(privateKey), now);
  const id = field(await appRequest(fetchImpl, jwt, `/repos/${owner}/${name}/installation`), "id");
  if (typeof id !== "number") throw new Error(`GitHub returned no installation id for ${repository}`);
  const path = `/app/installations/${id}/access_tokens`;
  const token = field(await appRequest(fetchImpl, jwt, path, { repositories: [name], permissions: { contents, metadata: "read" } }), "token");
  if (typeof token !== "string") throw new Error(`GitHub returned no token on ${path}`);
  return token;
}
