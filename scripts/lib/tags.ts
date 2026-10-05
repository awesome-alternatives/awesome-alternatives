export const TAG_CANDIDATES = 20;

const VERSION = /^\D*?(\d+(?:[._]\d+)+)(.*)$/;
const STABLE_SUFFIX = /^(?:[.-]?(?:final|release|ga))?(?:\+.*)?$/i;

interface Version {
  parts: number[];
  stable: boolean;
}

function versionOf(tag: string): Version | null {
  const match = VERSION.exec(tag);
  if (!match) return null;
  const [, core = "", suffix = ""] = match;
  return { parts: core.split(/[._]/).map(Number), stable: STABLE_SUFFIX.test(suffix) };
}

function compareParts(a: readonly number[], b: readonly number[]): number {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const diff = (a[i] ?? -1) - (b[i] ?? -1);
    if (diff !== 0) return diff;
  }
  return 0;
}

export function newestTag<T extends { name: string }>(recentFirst: readonly T[]): T | undefined {
  const versioned = recentFirst.flatMap((tag) => {
    const version = versionOf(tag.name);
    return version ? [{ tag, version }] : [];
  });
  const pool = versioned.some((v) => v.version.stable) ? versioned.filter((v) => v.version.stable) : versioned;
  const best = pool.reduce<(typeof pool)[number] | undefined>((top, candidate) => {
    if (!top) return candidate;
    const order = compareParts(candidate.version.parts, top.version.parts);
    if (order > 0) return candidate;
    if (order === 0 && candidate.tag.name.length < top.tag.name.length) return candidate;
    return top;
  }, undefined);
  return best?.tag ?? recentFirst[0];
}
