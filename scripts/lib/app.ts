import { createPrivateKey, sign, type KeyObject } from "node:crypto";
import { GitHubError } from "./github.ts";

const JWT_LIFETIME_SECONDS = 540;
const CLOCK_SKEW_SECONDS = 60;

export interface Installations {
  isInstalledOn(fullName: string): Promise<boolean>;
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

export function createInstallations(
  appId: string,
  privateKey: string,
  fetchImpl: typeof fetch = fetch,
  clock: () => Date = () => new Date(),
): Installations {
  const key = createPrivateKey(privateKey);
  let current: { jwt: string; renewAt: number } | null = null;

  const jwt = () => {
    const now = clock();
    if (!current || now.getTime() >= current.renewAt) {
      current = { jwt: appJwt(appId, key, now), renewAt: now.getTime() + (JWT_LIFETIME_SECONDS - 2 * CLOCK_SKEW_SECONDS) * 1000 };
    }
    return current.jwt;
  };

  return {
    async isInstalledOn(fullName) {
      const path = `/repos/${fullName}/installation`;
      const res = await fetchImpl(`https://api.github.com${path}`, {
        headers: {
          accept: "application/vnd.github+json",
          authorization: `Bearer ${jwt()}`,
          "x-github-api-version": "2022-11-28",
          "user-agent": "awesome-alternatives-verifier",
        },
      });
      if (res.status === 404) return false;
      if (!res.ok) throw new GitHubError(res.status, path, (await res.text()).slice(0, 200));
      return true;
    },
  };
}

export async function isMaintainerVerified(
  slug: string,
  claim: readonly string[],
  fullName: string,
  installations: Installations | null,
): Promise<boolean> {
  return claim.includes(slug) || (installations !== null && (await installations.isInstalledOn(fullName)));
}

export function installationsFromEnv(env: NodeJS.ProcessEnv): Installations | null {
  const { APP_ID, APP_PRIVATE_KEY } = env;
  return APP_ID && APP_PRIVATE_KEY ? createInstallations(APP_ID, APP_PRIVATE_KEY) : null;
}
