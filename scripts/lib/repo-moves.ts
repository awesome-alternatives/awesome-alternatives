import { createHash } from "node:crypto";
import { repoPath } from "./github.ts";
import type { GraphQL } from "./graphql.ts";
import { REPOSITORY_SHAPE } from "./facts-graphql.ts";
import { aliasedBatches, aliasedQuery } from "./graphql-batch.ts";
import { printable } from "./maintainer-file.ts";
import type { ProposalHost } from "./maintainer-propose.ts";
import { decideByMarker } from "./maintainer-pull.ts";
import type { Read, Tool } from "./types.ts";

export const MAX_MOVE_PULLS_PER_RUN = 5;
const MARKER = "repository-move:";

export type Move = Pick<Tool, "slug" | "file" | "repository"> & ({ kind: "gone" } | { kind: "renamed"; to: string });

export type MoveOutcome =
  | { slug: string; result: "opened" | "updated"; number: number }
  | { slug: string; result: "skipped" | "failed"; reason: string };

export interface MoveContext {
  base: string;
  read(file: string): Promise<string>;
  host: ProposalHost;
}

function namesQuery(tools: readonly Pick<Tool, "repository">[]) {
  const declarations: string[] = [];
  const fields: string[] = [];
  const variables: Record<string, string> = {};
  tools.forEach((tool, i) => {
    const [owner = "", name = ""] = repoPath(tool.repository).split("/");
    variables[`o${i}`] = owner;
    variables[`n${i}`] = name;
    declarations.push(`$o${i}: String!`, `$n${i}: String!`);
    fields.push(`r${i}: repository(owner: $o${i}, name: $n${i}) { nameWithOwner }`);
  });
  return { query: aliasedQuery(declarations, fields), variables };
}

export async function readNames(gql: GraphQL, tools: readonly Pick<Tool, "repository">[]): Promise<Read<string>[]> {
  const outcomes = await aliasedBatches(gql, tools, REPOSITORY_SHAPE, {
    alias: "r",
    query: namesQuery,
    read: (node: { nameWithOwner: string }) => node.nameWithOwner,
    failures: "report",
  });
  return outcomes.map((outcome) => (outcome.status === "failed" ? { status: "unreadable", reason: "GitHub failed on it" } : outcome));
}

export function movesOf(tools: readonly Tool[], reads: readonly Read<string>[]): Move[] {
  const moves = tools.flatMap((tool, i): Move[] => {
    const { slug, file, repository } = tool;
    const read = reads[i];
    if (read?.status === "gone") return [{ slug, file, repository, kind: "gone" }];
    if (read?.status !== "read" || read.value.toLowerCase() === repoPath(repository).toLowerCase()) return [];
    return [{ slug, file, repository, kind: "renamed", to: read.value }];
  });
  const gone = moves.filter((move) => move.kind === "gone").length;
  if (gone * 2 > tools.length) throw new Error(`GitHub answered no repository for ${gone} of ${tools.length} tools, which is the token, not the catalog`);
  return moves;
}

export function moveBranch({ slug }: Move): string {
  return `repository/${slug}`;
}

export function moveTitle(move: Move): string {
  return move.kind === "gone" ? `fix(catalog): remove ${move.slug}, its repository is gone` : `fix(catalog): follow ${move.slug} to ${move.to}`;
}

function moveMarker(move: Move): string {
  const finding = move.kind === "gone" ? `${move.slug} gone` : `${move.slug} renamed ${move.to}`;
  return `${MARKER} ${createHash("sha256").update(finding).digest("hex")}`;
}

export function moveBody(move: Move): string {
  const lines =
    move.kind === "gone"
      ? [
          `${move.repository} no longer answers on GitHub: it was deleted or made private.`,
          "",
          `Until this entry leaves \`data/tools\`, the refresh keeps \`${move.slug}\` with its last published facts. Merge to remove it, or close this and fix the entry if the project lives on somewhere else.`,
        ]
      : [
          `${move.repository} now answers as https://github.com/${move.to}.`,
          "",
          `The refresh still reads it through GitHub's redirect, but does not apply its maintainer file until the entry names the repository it really is. A redirect also follows a transfer to another owner, so check that \`${move.to}\` is still the same project before merging.`,
        ];
  return [...lines, "", "A closed pull request is not opened again for the same finding.", "", `<!-- ${moveMarker(move)} -->`].join("\n");
}

export function movedYaml(text: string, move: Move): string | null {
  if (move.kind === "gone") return null;
  const lines = text.split("\n");
  const at = lines.indexOf(`repository: ${move.repository}`);
  if (at === -1) throw new Error(`${move.file} has no line \`repository: ${move.repository}\``);
  lines[at] = `repository: https://github.com/${move.to}`;
  return lines.join("\n");
}

async function proposeMove(move: Move, { base, read, host }: MoveContext): Promise<MoveOutcome> {
  const branch = moveBranch(move);
  const body = moveBody(move);
  const decision = decideByMarker(await host.pulls(branch), moveMarker(move));
  if (decision.action === "skip") return { slug: move.slug, result: "skipped", reason: decision.reason };
  const title = moveTitle(move);
  await host.push(branch, base, move.file, movedYaml(await read(move.file), move), title);
  const number = decision.action === "open" ? await host.open(branch, title, body) : decision.number;
  if (decision.action === "update") await host.update(number, title, body);
  await host.check(branch);
  return { slug: move.slug, result: decision.action === "open" ? "opened" : "updated", number };
}

export async function proposeMoves(moves: readonly Move[], context: MoveContext): Promise<MoveOutcome[]> {
  const outcomes: MoveOutcome[] = [];
  let pulls = MAX_MOVE_PULLS_PER_RUN;
  for (const move of moves) {
    if (pulls === 0) {
      outcomes.push({ slug: move.slug, result: "skipped", reason: "left to the next run" });
      continue;
    }
    try {
      const outcome = await proposeMove(move, context);
      if (outcome.result !== "skipped") pulls--;
      outcomes.push(outcome);
    } catch (error) {
      outcomes.push({ slug: move.slug, result: "failed", reason: printable((error as Error).message, 300) });
    }
  }
  return outcomes;
}
