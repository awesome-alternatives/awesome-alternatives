export const TAG_CANDIDATES = 20;

const CORE = /^\d+(?:[._]\d+)+/;
const BARE_PREFIX = /^v?$/i;
const STABLE_SUFFIX = /^(?:[.-]?(?:final|release|ga))?(?:\+.*)?$/i;

interface Version {
  parts: number[];
  stable: boolean;
  bare: boolean;
}

function versionOf(tag: string): Version | null {
  const start = tag.search(/\d/);
  if (start < 0) return null;
  const core = CORE.exec(tag.slice(start))?.[0];
  if (!core) return null;
  const prefix = tag.slice(0, start);
  const suffix = tag.slice(start + core.length);
  return { parts: core.split(/[._]/).map(Number), stable: STABLE_SUFFIX.test(suffix), bare: BARE_PREFIX.test(prefix) };
}

function compareParts(a: readonly number[], b: readonly number[]): number {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const diff = (a[i] ?? -1) - (b[i] ?? -1);
    if (diff !== 0) return diff;
  }
  return 0;
}

function compareVersions(a: Version, b: Version): number {
  return Number(a.stable) - Number(b.stable) || Number(a.bare) - Number(b.bare) || compareParts(a.parts, b.parts);
}

export function newestTag<T extends { name: string }>(recentFirst: readonly T[]): T | undefined {
  let best: { tag: T; version: Version } | undefined;
  for (const tag of recentFirst) {
    const version = versionOf(tag.name);
    if (!version) continue;
    const order = best ? compareVersions(version, best.version) : 1;
    if (order > 0 || (order === 0 && best && tag.name.length < best.tag.name.length)) best = { tag, version };
  }
  return best?.tag ?? recentFirst[0];
}
