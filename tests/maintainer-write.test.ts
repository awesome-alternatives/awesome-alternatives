import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import { parse } from "yaml";
import { EDITED_LOG_ARGS, parseEditedLog } from "../scripts/lib/added.ts";
import type { Applied } from "../scripts/lib/maintainer-apply.ts";
import { commitMessage, editedYaml, REFRESH_COMMITTERS, writeApplied } from "../scripts/lib/maintainer-write.ts";

const CONCOURSE = `name: Concourse
repository: https://github.com/concourse/concourse
category: ci-server
replaces:
  - tool: jenkins
    fit: full
    note: "Pipelines declared as resources and jobs, every step in a container, and a note long enough to cross the default line width of eighty."
  - tool: circleci
    fit: full
    note: Self-hosted pipelines, each step in a container.
capabilities:
  container-steps:
    docs: https://concourse-ci.org/docs/tasks/
    note: Reviewed by a person.
deploy: [container, compose]
`;

const applied: Applied = {
  slug: "concourse",
  file: "data/tools/concourse.yaml",
  source: { fullName: "concourse/concourse", location: ".awesome-alternatives", commit: "0123456789abcdef0123456789abcdef01234567" },
  changes: [{ field: "deploy", value: ["container", "helm"] }],
};

describe("editedYaml", () => {
  it("leaves a file it does not change byte for byte as it was", () => {
    assert.equal(editedYaml(CONCOURSE, []), CONCOURSE);
    assert.equal(editedYaml(CONCOURSE.replaceAll("\n", "\r\n"), []), CONCOURSE.replaceAll("\n", "\r\n"));
  });

  it("changes only the fields it sets, keeping order, quoting and the flow style of deploy", () => {
    const edited = editedYaml(CONCOURSE, [
      { field: "deploy", value: ["container", "helm"] },
      { field: "capability", key: "container-steps", value: "https://concourse-ci.org/docs/steps/" },
      { field: "migration", tool: "circleci", value: "https://concourse-ci.org/from-circleci" },
      { field: "path", value: "web" },
    ]);
    assert.equal(
      edited,
      CONCOURSE.replace("deploy: [container, compose]", "deploy: [container, helm]")
        .replace("docs: https://concourse-ci.org/docs/tasks/", "docs: https://concourse-ci.org/docs/steps/")
        .replace("note: Self-hosted pipelines, each step in a container.\n", "note: Self-hosted pipelines, each step in a container.\n    migration: https://concourse-ci.org/from-circleci\n") + "path: web\n",
    );
  });

  it("removes a field and an emptied capabilities map, keeping the rest", () => {
    const edited = editedYaml(CONCOURSE, [
      { field: "deploy", value: null },
      { field: "capability", key: "container-steps", value: null },
    ]);
    assert.equal(edited, CONCOURSE.replace("deploy: [container, compose]\n", "").replace(/capabilities:\n(.*\n){3}/, ""));
  });

  it("writes a new deploy list in the catalog's flow style", () => {
    assert.match(editedYaml("name: X\n", [{ field: "deploy", value: ["binary"] }]), /^deploy: \[binary\]$/m);
  });

  it("stores a hostile-looking value as data, never as YAML structure", () => {
    const value = "https://e.com/a#b: c\n- x\nname: Hijacked";
    const edited: unknown = parse(editedYaml("name: X\n", [{ field: "capability", key: "ci", value }]));
    assert.deepEqual(edited, { name: "X", capabilities: { ci: { docs: value } } });
  });
});

describe("writeApplied", () => {
  it("writes the applied values into the entry's own file", async () => {
    const root = await mkdtemp(join(tmpdir(), "aa-write-"));
    await mkdir(join(root, "data", "tools"), { recursive: true });
    await writeFile(join(root, applied.file), CONCOURSE);
    await writeApplied(root, [applied]);
    assert.equal(await readFile(join(root, applied.file), "utf8"), CONCOURSE.replace("[container, compose]", "[container, helm]"));
  });
});

describe("commitMessage", () => {
  it("names the entry, the fields, the source repository and the file's commit", () => {
    assert.equal(
      commitMessage("chore(catalog): refresh from GitHub", [applied]),
      "chore(catalog): refresh from GitHub\n\nMaintainer-file: data/tools/concourse.yaml deploy from concourse/concourse/.awesome-alternatives at 0123456789abcdef0123456789abcdef01234567\n",
    );
  });

  it("does not print a commit it cannot vouch for", () => {
    const unknown = { ...applied, source: { ...applied.source, commit: "main; rm -rf /" } };
    assert.match(commitMessage("s", [unknown]), /at the head of its default branch\n$/);
    assert.match(commitMessage("s", [{ ...applied, source: { ...applied.source, commit: null } }]), /at the head of its default branch\n$/);
  });

  it("is the bare subject when nothing was applied", () => {
    assert.equal(commitMessage("chore(catalog): refresh from GitHub", []), "chore(catalog): refresh from GitHub\n");
  });
});

describe("the edit date of an entry", () => {
  const repository = async () => {
    const root = await mkdtemp(join(tmpdir(), "aa-edited-"));
    await mkdir(join(root, "data", "tools"), { recursive: true });
    const git = (args: string[], date: string, email = "t@example.com") =>
      execFileSync("git", ["-c", "user.name=t", "-c", `user.email=${email}`, "-c", "commit.gpgsign=false", "-c", "core.autocrlf=false", ...args], {
        cwd: root,
        encoding: "utf8",
        env: { ...process.env, GIT_COMMITTER_DATE: date, GIT_AUTHOR_DATE: date },
      });
    git(["init", "--quiet"], "2026-09-01T00:00:00Z");
    await writeFile(join(root, applied.file), CONCOURSE);
    git(["add", "."], "2026-09-01T00:00:00Z");
    git(["commit", "--quiet", "-m", "feat(data): add concourse"], "2026-09-01T00:00:00Z");
    await writeApplied(root, [applied]);
    return { root, git };
  };
  const message = commitMessage("chore(catalog): refresh from GitHub", [applied]);

  it("ignores the refresh commit that copied the maintainers' own values, so the entry is not edited since verification", async () => {
    for (const bot of REFRESH_COMMITTERS) {
      const { root, git } = await repository();
      git(["commit", "--quiet", "-am", message], "2026-09-20T00:00:00Z", bot);
      assert.equal(parseEditedLog(git(EDITED_LOG_ARGS, "2026-09-20T00:00:00Z")).get("concourse"), "2026-09-01T00:00:00.000Z");

      await writeFile(join(root, applied.file), `${CONCOURSE}affiliation: Reviewed.\n`);
      git(["commit", "--quiet", "-am", "fix(data): concourse affiliation"], "2026-09-25T00:00:00Z");
      assert.equal(parseEditedLog(git(EDITED_LOG_ARGS, "2026-09-25T00:00:00Z")).get("concourse"), "2026-09-25T00:00:00.000Z");
    }
  });

  it("counts a commit by anyone else as an edit, even when it carries the same trailer", async () => {
    const { git } = await repository();
    git(["commit", "--quiet", "-am", message], "2026-09-20T00:00:00Z", "someone@example.com");
    assert.equal(parseEditedLog(git(EDITED_LOG_ARGS, "2026-09-20T00:00:00Z")).get("concourse"), "2026-09-20T00:00:00.000Z");
  });

  it("only skips the entries the trailer names", async () => {
    const { root, git } = await repository();
    await writeFile(join(root, "data", "tools", "other.yaml"), "name: Other\n");
    git(["add", "."], "2026-09-20T00:00:00Z");
    git(["commit", "--quiet", "-m", message], "2026-09-20T00:00:00Z", REFRESH_COMMITTERS[0]);
    const edited = parseEditedLog(git(EDITED_LOG_ARGS, "2026-09-20T00:00:00Z"));
    assert.equal(edited.get("concourse"), "2026-09-01T00:00:00.000Z");
    assert.equal(edited.get("other"), "2026-09-20T00:00:00.000Z");
  });

  it("does not trust a forged bot commit brought in by a merge, only what was pushed straight to main", async () => {
    const { git } = await repository();
    git(["stash", "--quiet"], "2026-09-15T00:00:00Z");
    git(["checkout", "--quiet", "-b", "contribution"], "2026-09-15T00:00:00Z");
    git(["stash", "pop", "--quiet"], "2026-09-15T00:00:00Z");
    git(["commit", "--quiet", "-am", message], "2026-09-15T00:00:00Z", REFRESH_COMMITTERS[0]);
    git(["checkout", "--quiet", "-"], "2026-09-15T00:00:00Z");
    git(["merge", "--quiet", "--no-ff", "-m", "Merge contribution", "contribution"], "2026-09-18T00:00:00Z", "someone@example.com");
    assert.equal(parseEditedLog(git(EDITED_LOG_ARGS, "2026-09-18T00:00:00Z")).get("concourse"), "2026-09-18T00:00:00.000Z");
  });
});
