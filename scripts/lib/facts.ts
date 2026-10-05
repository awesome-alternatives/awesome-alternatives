import { type GitHub, repoPath } from "./github.ts";
import { newestTag } from "./tags.ts";
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

export const MAINTAINER_FILE = ".awesome-alternatives";

export function licenseOf(license: ApiRepo["license"]): string | null {
  if (!license) return null;
  const spdx = license.spdx_id;
  return spdx && spdx !== "NOASSERTION" ? spdx : "Other";
}

export function ownerOf(fullName: string): string {
  return fullName.split("/")[0] ?? fullName;
}

export function trimmed(value: string | null | undefined): string | null {
  return value?.trim() || null;
}

export function websiteOf(blog: string | null | undefined): string | null {
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
    homepage: websiteOf(r.homepage),
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

  const tags = await gh.get<ApiTag[]>(`/repos/${fullName}/tags?per_page=100`);
  const tag = newestTag(tags ?? []);
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
    .map((r) =>
      releaseEntry({
        tag: r.tag_name,
        name: r.name ?? null,
        body: r.body ?? "",
        publishedAt: r.published_at,
        url: r.html_url,
        prerelease: r.prerelease ?? false,
      }),
    );
}

export function releaseEntry(release: {
  tag: string;
  name: string | null;
  body: string;
  publishedAt: string | null;
  url: string;
  prerelease: boolean;
}): ReleaseEntry {
  const name = release.name?.trim();
  return {
    tag: release.tag,
    name: name && name !== release.tag ? name : summaryOf(release.body),
    publishedAt: release.publishedAt,
    url: release.url,
    prerelease: release.prerelease,
  };
}

const SUMMARY_LENGTH = 120;
const BOILERPLATE = /^(what'?s changed|changes|changelog|full changelog|new contributors|release notes)\b/i;

const AUTHOR_CREDIT = /^by @[\w-]+ in https?:\/\/\S+$/;
const BARE_URL = /https?:\/\/\S+/g;

function withLinkText(line: string): string {
  let result = "";
  let from = 0;
  for (;;) {
    const open = line.indexOf("[", from);
    const close = open < 0 ? -1 : line.indexOf("]", open);
    if (close < 0) break;
    if (line[close + 1] !== "(") {
      result += line.slice(from, close);
      from = close;
      continue;
    }
    const end = line.indexOf(")", close + 2);
    if (end < 0) break;
    result += line.slice(from, open) + line.slice(open + 1, close);
    from = end + 1;
  }
  return result + line.slice(from);
}

function withoutAuthorCredit(line: string): string {
  const start = line.lastIndexOf("by @");
  const credited = start > 0 && /\s/.test(line.charAt(start - 1)) && AUTHOR_CREDIT.test(line.slice(start));
  return credited ? line.slice(0, start).trimEnd() : line;
}

function withoutUrls(line: string): string {
  let result = "";
  let from = 0;
  for (const match of line.matchAll(BARE_URL)) {
    const before = line.slice(from, match.index);
    result += (before.endsWith("(") ? before.slice(0, -1) : before).trimEnd();
    from = match.index + match[0].length;
  }
  return result + line.slice(from);
}

function plainLine(raw: string): string {
  const unmarked = withLinkText(raw.trim().replace(/^[-*+]\s+/, ""))
    .replace(/\*\*|__|`/g, "")
    .replace(/\*([^*]+)\*/g, "$1");
  return withoutUrls(withoutAuthorCredit(unmarked)).trim();
}

export function summaryOf(body: string): string | null {
  for (const raw of body.split(/\r?\n/)) {
    const line = plainLine(raw);
    if (!line || line.startsWith("#") || line.startsWith("<") || BOILERPLATE.test(line)) continue;
    return line.length > SUMMARY_LENGTH ? `${line.slice(0, SUMMARY_LENGTH - 1).trimEnd()}…` : line;
  }
  return null;
}

export function encodeRef(ref: string): string {
  return ref.split("/").map(encodeURIComponent).join("/");
}

async function isTagSigned(gh: GitHub, fullName: string, tag: string): Promise<boolean> {
  const ref = await gh.get<ApiRef>(`/repos/${fullName}/git/ref/tags/${encodeRef(tag)}`);
  if (!ref) return false;
  if (ref.object.type === "tag") return isAnnotatedTagSigned(gh, fullName, ref.object.sha);
  const commit = await gh.get<ApiCommit>(`/repos/${fullName}/commits/${ref.object.sha}`);
  return commit?.commit.verification?.verified === true;
}

export async function isAnnotatedTagSigned(gh: GitHub, fullName: string, sha: string): Promise<boolean> {
  const annotated = await gh.get<ApiVerification>(`/repos/${fullName}/git/tags/${sha}`);
  return annotated?.verification?.verified === true;
}

export function claimedSlugs(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/#.*/, "").trim())
    .filter((line) => line.length > 0);
}

export function claimLocations(path: string | null | undefined): string[] {
  return path ? [MAINTAINER_FILE, `${path}/${MAINTAINER_FILE}`] : [MAINTAINER_FILE];
}

export async function fetchClaimFile(gh: GitHub, fullName: string, branch: string, location: string): Promise<string[]> {
  const file = await gh.get<ApiContent>(`/repos/${fullName}/contents/${encodeRef(location)}?ref=${encodeURIComponent(branch)}`);
  if (file?.encoding !== "base64") return [];
  return claimedSlugs(Buffer.from(file.content, "base64").toString("utf8"));
}

export async function fetchMaintainerClaim(
  gh: GitHub,
  fullName: string,
  branch: string,
  path?: string,
): Promise<string[]> {
  const found = await Promise.all(claimLocations(path).map((location) => fetchClaimFile(gh, fullName, branch, location)));
  return found.flat();
}
