import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { parse } from "yaml";
import { mapLimit } from "./gather.ts";
import { unreachable } from "./links.ts";
import { type Finding, THIRD_PARTY, type Tool } from "./types.ts";

const FILE = /^([a-z0-9]+(?:-[a-z0-9]+)*)--([a-z0-9]+(?:-[a-z0-9]+)*)\.yaml$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const TITLE_LENGTH = 100;
const RESULT_LENGTH = 200;
const LINK_CHECK_CONCURRENCY = 4;

export interface Benchmark {
  title: string;
  url: string;
  ranBy: string;
  date: string;
  result: string;
}

type Related = Pick<Tool, "slug" | "replaces">;

function related(tools: readonly Related[], a: string, b: string): boolean {
  const targetsOf = (slug: string) => new Set(tools.find((t) => t.slug === slug)?.replaces?.map((r) => r.tool) ?? []);
  const [ofA, ofB] = [targetsOf(a), targetsOf(b)];
  return ofA.has(b) || ofB.has(a) || [...ofA].some((target) => ofB.has(target));
}

function benchmarkProblems(entry: unknown, index: number, pair: readonly string[], today: string): string[] {
  const at = `benchmark ${index + 1}`;
  if (!entry || typeof entry !== "object") return [`${at} must be a mapping`];
  const { title, url, ranBy, date, result } = entry as Record<string, unknown>;
  const problems: string[] = [];
  if (typeof title !== "string" || !title.trim() || title.length > TITLE_LENGTH) {
    problems.push(`${at}: title must be text of at most ${TITLE_LENGTH} characters`);
  }
  if (typeof url !== "string" || !url.startsWith("https://")) problems.push(`${at}: url must be an https URL`);
  if (typeof ranBy !== "string" || ![...pair, THIRD_PARTY].includes(ranBy)) {
    problems.push(`${at}: ranBy must be ${pair.join(", ")} or ${THIRD_PARTY}`);
  }
  if (typeof date !== "string" || !DATE.test(date) || Number.isNaN(Date.parse(date)) || date > today) {
    problems.push(`${at}: date must be a past YYYY-MM-DD date`);
  }
  if (typeof result !== "string" || !result.trim() || result.length > RESULT_LENGTH) {
    problems.push(`${at}: result must be text of at most ${RESULT_LENGTH} characters`);
  }
  return problems;
}

export function checkBenchmarkFile(file: string, text: string, tools: readonly Related[], now: Date): Finding[] {
  const problems: string[] = [];
  const name = FILE.exec(file);
  const pair = name ? [name[1] as string, name[2] as string] : [];
  if (!name) problems.push("the file name must be {a}--{b}.yaml with two slugs");
  else {
    const [a, b] = pair as [string, string];
    if (a >= b) problems.push(`the slugs must be in alphabetical order: ${b}--${a}.yaml`);
    for (const slug of pair) if (!tools.some((t) => t.slug === slug)) problems.push(`${slug} has no entry in data/tools`);
    if (problems.length === 0 && !related(tools, a, b)) {
      problems.push(`${a} and ${b} have no comparison page: neither replaces the other and they replace nothing in common`);
    }
  }

  const data = parse(text) as { benchmarks?: unknown } | null;
  const benchmarks = data?.benchmarks;
  if (!Array.isArray(benchmarks) || benchmarks.length === 0) problems.push("benchmarks must list at least one benchmark");
  else {
    const today = now.toISOString().slice(0, 10);
    benchmarks.forEach((entry, i) => problems.push(...benchmarkProblems(entry, i, pair, today)));
  }

  return problems.map((message) => ({ slug: file, severity: "error", code: "benchmark", message }));
}

export async function checkBenchmarks(
  root: string,
  tools: readonly Related[],
  now: Date,
  fetchImpl: typeof fetch = fetch,
  token?: string,
): Promise<Finding[]> {
  const dir = join(root, "data", "benchmarks");
  let files: string[];
  try {
    files = (await readdir(dir)).filter((f) => f.endsWith(".yaml")).sort();
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw e;
  }
  const findings = await mapLimit(
    files,
    LINK_CHECK_CONCURRENCY,
    async (file) => {
      const text = await readFile(join(dir, file), "utf8");
      const found = checkBenchmarkFile(file, text, tools, now);
      if (found.length > 0) return found;
      const { benchmarks } = parse(text) as { benchmarks: Benchmark[] };
      const links = await Promise.all(benchmarks.map((b) => unreachable(b.url, fetchImpl, undefined, token)));
      return links.flatMap((problem): Finding[] =>
        problem ? [{ slug: file, severity: "error", code: "benchmark-unreachable", message: problem }] : [],
      );
    },
  );
  return findings.flat();
}
