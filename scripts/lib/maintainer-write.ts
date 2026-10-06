import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { type Document, isMap, isSeq, parseDocument } from "yaml";
import type { Applied } from "./maintainer-apply.ts";
import { type FieldChange, fieldName } from "./maintainer-fields.ts";

export const APPLIED_TRAILER = "Maintainer-file";

export const REFRESH_COMMITTERS: readonly string[] = [
  "41898282+github-actions[bot]@users.noreply.github.com",
  "333291533+awesome-alternatives[bot]@users.noreply.github.com",
];

const COMMIT = /^[0-9a-f]{40}$/;

function setSequence(doc: Document, key: string, value: readonly string[]): void {
  const existing = doc.get(key, true);
  const node = doc.createNode(value);
  node.flow = isSeq(existing) ? existing.flow ?? false : true;
  doc.set(key, node);
}

function setCapability(doc: Document, key: string, docs: string | null): void {
  if (docs !== null) {
    doc.setIn(["capabilities", key, "docs"], docs);
    return;
  }
  doc.deleteIn(["capabilities", key]);
  const capabilities = doc.get("capabilities", true);
  if (isMap(capabilities) && capabilities.items.length === 0) doc.delete("capabilities");
}

function setMigration(doc: Document, target: string, url: string | null): void {
  const replaces = doc.get("replaces", true);
  if (!isSeq(replaces)) return;
  const index = replaces.items.findIndex((item) => isMap(item) && item.get("tool") === target);
  if (index < 0) return;
  if (url === null) doc.deleteIn(["replaces", index, "migration"]);
  else doc.setIn(["replaces", index, "migration"], url);
}

function edit(doc: Document, change: FieldChange): void {
  switch (change.field) {
    case "path":
      if (change.value === null) doc.delete("path");
      else doc.set("path", change.value);
      return;
    case "deploy":
      if (change.value === null) doc.delete("deploy");
      else setSequence(doc, "deploy", change.value);
      return;
    case "capability":
      setCapability(doc, change.key, change.value);
      return;
    case "migration":
      setMigration(doc, change.tool, change.value);
      return;
  }
}

export function editedYaml(text: string, changes: readonly FieldChange[]): string {
  const crlf = text.includes("\r\n");
  const doc = parseDocument(crlf ? text.replaceAll("\r\n", "\n") : text);
  for (const change of changes) edit(doc, change);
  const edited = doc.toString({ lineWidth: 0, flowCollectionPadding: false });
  return crlf ? edited.replaceAll("\n", "\r\n") : edited;
}

export async function writeApplied(root: string, applied: readonly Applied[]): Promise<void> {
  for (const { file, changes } of applied) {
    const path = join(root, file);
    await writeFile(path, editedYaml(await readFile(path, "utf8"), changes));
  }
}

function trailer({ file, source, changes }: Applied): string {
  const at = source.commit && COMMIT.test(source.commit) ? `at ${source.commit}` : "at the head of its default branch";
  return `${APPLIED_TRAILER}: ${file} ${changes.map(fieldName).join(", ")} from ${source.fullName}/${source.location} ${at}`;
}

export function commitMessage(subject: string, applied: readonly Applied[]): string {
  return applied.length ? `${subject}\n\n${applied.map(trailer).join("\n")}\n` : `${subject}\n`;
}
