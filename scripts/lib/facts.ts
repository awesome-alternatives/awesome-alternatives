import { parse } from "yaml";
import { type GitHub, GitHubError, repoPath } from "./github.ts";
import type { ReleaseFacts, RepoFacts } from "./types.ts";

interface ApiRepo {
  full_name: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  license: { spdx_id: string | null } | null;
  stargazers_count: number;
  forks_count: number;
  archived: boolean;
  fork: boolean;
  private: boolean;
  created_at: string;
  pushed_at: string;
  default_branch: string;
}

interface ApiRelease {
  tag_name: string;
  published_at: string | null;
  html_url: string;
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

const MAINTAINER_FILE = ".awesome-alternatives.yml";
const PAGE = 100;
const MAX_STARGAZER_PAGE = 400;
const REFUSED_PAGINATION = [403, 422];

export function licenseOf(license: ApiRepo["license"]): string | null {
  if (!license) return null;
  const spdx = license.spdx_id;
  return spdx && spdx !== "NOASSERTION" ? spdx : "Other";
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

export async function fetchMaintainerClaim(gh: GitHub, fullName: string, branch: string): Promise<string | null> {
  const file = await gh.get<ApiContent>(
    `/repos/${fullName}/contents/${MAINTAINER_FILE}?ref=${encodeURIComponent(branch)}`,
  );
  if (!file || file.encoding !== "base64") return null;
  const parsed: unknown = parse(Buffer.from(file.content, "base64").toString("utf8"));
  if (typeof parsed === "object" && parsed !== null && "slug" in parsed && typeof parsed.slug === "string") {
    return parsed.slug;
  }
  return null;
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
