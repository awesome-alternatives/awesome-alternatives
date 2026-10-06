import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const SCRIPT = fileURLToPath(new URL("../scripts/ci/restore-refreshed.sh", import.meta.url));

async function setup() {
  const root = await mkdtemp(join(tmpdir(), "aa-restore-"));
  const work = join(root, "work");
  await mkdir(join(work, "data", "tools"), { recursive: true });
  await mkdir(join(root, "refreshed", "generated"), { recursive: true });
  const git = (...args: string[]) =>
    execFileSync("git", ["-c", "user.name=t", "-c", "user.email=t@example.com", "-c", "commit.gpgsign=false", "-c", "core.autocrlf=false", ...args], {
      cwd: work,
      encoding: "utf8",
    });
  git("init", "--quiet");
  git("config", "core.autocrlf", "false");
  await writeFile(join(work, "data", "tools", "x.yaml"), "name: X\n");
  git("add", ".");
  git("commit", "--quiet", "-m", "init");
  await writeFile(join(work, "data", "tools", "x.yaml"), "name: X\ndeploy: [binary]\n");
  const patch = join(root, "values.patch");
  await writeFile(patch, git("diff", "--binary", "--", "data/tools"));
  git("checkout", "--quiet", "--", ".");
  await writeFile(join(root, "refreshed", "generated", "catalog.json"), "{}\n");
  const drafted = join(root, "drafted");
  await writeFile(drafted, "chore(catalog): refresh from GitHub\n\nMaintainer-file: data/tools/x.yaml deploy from o/r/.awesome-alternatives at the head of its default branch\n");
  const message = join(root, "message");
  const restore = () =>
    execFileSync("bash", [SCRIPT, join(root, "refreshed"), patch, drafted], { cwd: work, env: { ...process.env, COMMIT_MESSAGE_FILE: message } });
  return { work, git, drafted, message, restore };
}

describe("restore-refreshed.sh", () => {
  it("applies the values and hands the drafted message to the commit", async () => {
    const { work, message, drafted, restore } = await setup();
    restore();
    assert.equal(await readFile(join(work, "data", "tools", "x.yaml"), "utf8"), "name: X\ndeploy: [binary]\n");
    assert.equal(await readFile(message, "utf8"), await readFile(drafted, "utf8"));
  });

  it("falls back to the plain message on an attempt where the values no longer apply, and recovers on the next", async () => {
    const { work, git, message, drafted, restore } = await setup();
    await writeFile(join(work, "data", "tools", "x.yaml"), "name: Y\n");
    restore();
    assert.equal(await readFile(message, "utf8"), "");
    assert.match(await readFile(drafted, "utf8"), /Maintainer-file:/);

    git("checkout", "--quiet", "--", ".");
    restore();
    assert.equal(await readFile(message, "utf8"), await readFile(drafted, "utf8"));
  });
});
