import { type GitHub, GitHubError, repoPath } from "./github.ts";
import type { OwnerFacts, OwnerKind, ReleaseEntry, ReleaseFacts, RepoFacts } from "./types.ts";

interface ApiRepo {
  full_name: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  license: { spdx_id: string | null } | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  archived: boolean;
  fork: boolean;
  private: boolean;
  created_at: string;
  pushed_at: string;
  default_branch: string;
}

interface ApiAccount {
  login: string;
  name?: string | null;
  bio?: string | null;
  description?: string | null;
  blog?: string | null;
  html_url: string;
}

interface ApiRelease {
  tag_name: string;
  name?: string | null;
  body?: string | null;
  published_at: string | null;
  html_url: string;
  draft?: boolean;
  prerelease?: boolean;
}

interface ApiTag {
  name: string;
  commit: { sha: string };
}

interface ApiRef {
  object: { type: "tag" | "commit"; sha: string };
}

interface ApiVerification {
  verification?: { verified: boolean };
}

interface ApiCommit {
  commit: ApiVerification;
}

interface ApiContent {
  content: string;
  encoding: string;
}

interface ApiStargazer {
  starred_at: string;
}

export const MAINTAINER_FILE = ".awesome-alternatives";
const PAGE = 100;
const MAX_STARGAZER_PAGE = 400;
const REFUSED_PAGINATION = [403, 422];

export function licenseOf(license: ApiRepo["license"]): string | null {
  if (!license) return null;
  const spdx = license.spdx_id;
  return spdx && spdx !== "NOASSERTION" ? spdx : "Other";
}

export function ownerOf(fullName: string): string {
  return fullName.split("/")[0] ?? fullName;
}

function trimmed(value: string | null | undefined): string | null {
  const text = value?.trim();
  return text ? text : null;
}

function websiteOf(blog: string | null | undefined): string | null {
  const text = trimmed(blog);
  if (!text) return null;
  const candidate = /^https?:\/\//i.test(text) ? text : `https://${text}`;
  return URL.canParse(candidate) ? candidate : null;
}

export async function fetchOwner(gh: GitHub, login: string): Promise<OwnerFacts | null> {
  const path = encodeURIComponent(login);
  const org = await gh.get<ApiAccount>(`/orgs/${path}`);
  if (org) return account(org, "organization", org.description);
  const user = await gh.get<ApiAccount>(`/users/${path}`);
  return user ? account(user, "user", user.bio) : null;
}

function account(raw: ApiAccount, kind: OwnerKind, bio: string | null | undefined): OwnerFacts {
  return {
    login: raw.login,
    kind,
    name: trimmed(raw.name),
    bio: trimmed(bio),
    website: websiteOf(raw.blog),
    url: raw.html_url,
  };
}

export async function fetchRepo(gh: GitHub, repository: string): Promise<RepoFacts | null> {
  const r = await gh.get<ApiRepo>(`/repos/${repoPath(repository)}`);
  if (!r) return null;
  return {
    fullName: r.full_name,
    description: r.description,
    homepage: r.homepage || null,
    language: r.language,
    license: licenseOf(r.license),
    stars: r.stargazers_count,
    forks: r.forks_count,
    topics: r.topics ?? [],
    archived: r.archived,
    fork: r.fork,
    private: r.private,
    createdAt: r.created_at,
    pushedAt: r.pushed_at,
    defaultBranch: r.default_branch,
  };
}

export async function fetchRelease(gh: GitHub, fullName: string): Promise<ReleaseFacts | null> {
  const release = await gh.get<ApiRelease>(`/repos/${fullName}/releases/latest`);
  if (release) {
    return {
      tag: release.tag_name,
      publishedAt: release.published_at,
      url: release.html_url,
      source: "release",
      signed: await isTagSigned(gh, fullName, release.tag_name),
    };
  }

  const tags = await gh.get<ApiTag[]>(`/repos/${fullName}/tags?per_page=1`);
  const tag = tags?.[0];
  if (!tag) return null;
  return {
    tag: tag.name,
    publishedAt: null,
    url: `https://github.com/${fullName}/releases/tag/${encodeRef(tag.name)}`,
    source: "tag",
    signed: await isTagSigned(gh, fullName, tag.name),
  };
}

export const RELEASE_HISTORY = 5;

export async function fetchReleases(gh: GitHub, fullName: string): Promise<ReleaseEntry[]> {
  const releases = await gh.get<ApiRelease[]>(`/repos/${fullName}/releases?per_page=${RELEASE_HISTORY + 5}`);
  return (releases ?? [])
    .filter((r) => !r.draft)
    .slice(0, RELEASE_HISTORY)
    .map((r) => {
      const name = r.name?.trim();
      return {
        tag: r.tag_name,
        name: name && name !== r.tag_name ? name : summaryOf(r.body ?? ""),
        publishedAt: r.published_at,
        url: r.html_url,
        prerelease: r.prerelease ?? false,
      };
    });
}

const SUMMARY_LENGTH = 120;
const BOILERPLATE = /^(what'?s changed|changes|changelog|full changelog|new contributors|release notes)\b/i;

export function summaryOf(body: string): string | null {
  for (const raw of body.split(/\r?\n/)) {
    const line = raw
      .trim()
      .replace(/^[-*+]\s+/, "")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/\*\*|__|`/g, "")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/\s+by @[\w-]+ in https?:\/\/\S+$/, "")
      .replace(/\s*\(?https?:\/\/\S+\)?/g, "")
      .trim();
    if (!line || line.startsWith("#") || line.startsWith("<") || BOILERPLATE.test(line)) continue;
    return line.length > SUMMARY_LENGTH ? `${line.slice(0, SUMMARY_LENGTH - 1).trimEnd()}…` : line;
  }
  return null;
}

function encodeRef(ref: string): string {
  return ref.split("/").map(encodeURIComponent).join("/");
}

async function isTagSigned(gh: GitHub, fullName: string, tag: string): Promise<boolean> {
  const ref = await gh.get<ApiRef>(`/repos/${fullName}/git/ref/tags/${encodeRef(tag)}`);
  if (!ref) return false;
  if (ref.object.type === "tag") {
    const annotated = await gh.get<ApiVerification>(`/repos/${fullName}/git/tags/${ref.object.sha}`);
    return annotated?.verification?.verified === true;
  }
  const commit = await gh.get<ApiCommit>(`/repos/${fullName}/commits/${ref.object.sha}`);
  return commit?.commit.verification?.verified === true;
}

export function claimedSlugs(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/#.*/, "").trim())
    .filter((line) => line.length > 0);
}

export async function fetchMaintainerClaim(
  gh: GitHub,
  fullName: string,
  branch: string,
  path?: string,
): Promise<string[]> {
  const locations = path ? [MAINTAINER_FILE, `${path}/${MAINTAINER_FILE}`] : [MAINTAINER_FILE];
  const found = await Promise.all(
    locations.map(async (location) => {
      const file = await gh.get<ApiContent>(
        `/repos/${fullName}/contents/${encodeRef(location)}?ref=${encodeURIComponent(branch)}`,
      );
      if (!file || file.encoding !== "base64") return [];
      return claimedSlugs(Buffer.from(file.content, "base64").toString("utf8"));
    }),
  );
  return found.flat();
}

export async function fetchRecentStargazers(gh: GitHub, fullName: string, stars: number): Promise<string[]> {
  if (stars === 0) return [];
  const last = Math.min(Math.ceil(stars / PAGE), MAX_STARGAZER_PAGE);
  const pages = last > 1 ? [last - 1, last] : [last];
  const out: string[] = [];
  for (const page of pages) {
    const batch = await gh
      .get<ApiStargazer[]>(`/repos/${fullName}/stargazers?per_page=${PAGE}&page=${page}`, "application/vnd.github.star+json")
      .catch((error: unknown) => {
        if (error instanceof GitHubError && REFUSED_PAGINATION.includes(error.status)) return null;
        throw error;
      });
    if (batch === null) return [];
    out.push(...batch.map((s) => s.starred_at));
  }
  return out;
}
