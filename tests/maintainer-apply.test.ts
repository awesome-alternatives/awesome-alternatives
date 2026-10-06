import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { RepositoryFacts } from "../scripts/lib/facts-graphql.ts";
import type { Catalog } from "../scripts/lib/catalog.ts";
import { applyMaintainerFiles, type FieldChecks, fileNotes, MAX_TOOLS_PER_RUN, type PlanContext, planTool } from "../scripts/lib/maintainer-apply.ts";
import { catalogGuard } from "../scripts/lib/maintainer-guard.ts";
import { maintainerFieldsOf, proposals, speakingFor } from "../scripts/lib/maintainer-fields.ts";
import { type LocatedFile, type MaintainerEntry, parseMaintainerFile } from "../scripts/lib/maintainer-file.ts";
import type { Category, Read, Tool } from "../scripts/lib/types.ts";
import { published } from "./catalog-checkout.ts";

const CATEGORY: Category = { name: "Search", description: "d", selfHost: true, capabilities: { ci: { label: "CI", match: [] } } };
const categories = new Map([["search", CATEGORY], ["library", { name: "Library", description: "d" }]]);

function tool(over: Partial<Tool> = {}): Tool {
  return {
    slug: "ripgrep",
    name: "ripgrep",
    repository: "https://github.com/acme/ripgrep",
    category: "search",
    file: "data/tools/ripgrep.yaml",
    replaces: [{ tool: "ack", fit: "full", note: "Faster." }],
    ...over,
  };
}

function located(text: string, scope: LocatedFile["scope"] = "root"): LocatedFile {
  return { scope, commit: "0123456789abcdef0123456789abcdef01234567", file: parseMaintainerFile(text) };
}

interface Asked {
  directories: string[];
  deploys: string[][];
  links: string[];
}

function checks(over: Partial<FieldChecks> = {}): FieldChecks & { asked: Asked } {
  const asked: Asked = { directories: [], deploys: [], links: [] };
  return {
    asked,
    async directoryExists(_, __, path) {
      asked.directories.push(path);
      return path !== "missing";
    },
    async unprovenDeploy(candidate) {
      asked.deploys.push(candidate.deploy ?? []);
      return (candidate.deploy ?? []).filter((method) => method === "helm");
    },
    async unreachable(url) {
      asked.links.push(url);
      return url.includes("dead") ? `${url} answered 404` : null;
    },
    ...over,
  };
}

const catalogOf = (...tools: Tool[]): Catalog => ({ tools, products: [], categories });

const context = (fieldChecks: FieldChecks, category: Category | undefined = CATEGORY, catalog = catalogOf(tool())): PlanContext => ({
  fullName: "acme/ripgrep",
  branch: "main",
  category,
  checks: fieldChecks,
  guard: catalogGuard(catalog, []),
});

describe("proposals", () => {
  it("proposes only the values that differ from the entry", () => {
    const entry: MaintainerEntry = { path: "crates/rg", deploy: ["binary", "container"], capabilities: { ci: { docs: "https://e.com/ci" } } };
    const current = tool({ path: "crates/rg", deploy: ["container", "binary"] });
    assert.deepEqual(proposals(current, entry, new Set()), [{ field: "capability", key: "ci", value: "https://e.com/ci" }]);
  });

  it("removes a field the maintainers provided and then dropped from their file, and only such a field", () => {
    const current = tool({ deploy: ["binary"], path: "crates/rg", capabilities: { ci: { docs: "https://e.com/ci" } } });
    const withMigration = { ...current, replaces: [{ tool: "ack", fit: "full" as const, migration: "https://e.com/ack" }] };
    assert.deepEqual(proposals(withMigration, {}, new Set(["deploy", "capabilities.ci", "migration.ack"])), [
      { field: "deploy", value: null },
      { field: "capability", key: "ci", value: null },
      { field: "migration", tool: "ack", value: null },
    ]);
    assert.deepEqual(proposals(withMigration, {}, new Set()), []);
  });
});

describe("speakingFor", () => {
  it("prefers the package's own file over the root file in a monorepo", () => {
    const root = located("tools:\n  ripgrep:\n    deploy: [binary]\n");
    const nested = located("tools:\n  ripgrep:\n    deploy: [package]\n", "path");
    assert.deepEqual(speakingFor("ripgrep", [root, nested])?.entry, { deploy: ["package"] });
    assert.deepEqual(speakingFor("ripgrep", [root])?.entry, { deploy: ["binary"] });
  });

  it("hears nothing from the line form, a rejected file or a file that does not list the tool", () => {
    assert.equal(speakingFor("ripgrep", [located("ripgrep\n")]), null);
    assert.equal(speakingFor("ripgrep", [located("tools:\n  ripgrep: &a {}\n")]), null);
    assert.equal(speakingFor("ripgrep", [located("tools:\n  other: {}\n")]), null);
  });
});

describe("planTool", () => {
  it("applies every value whose check passes", async () => {
    const fieldChecks = checks();
    const changes = proposals(tool(), { path: "crates/rg", deploy: ["binary"], capabilities: { ci: { docs: "https://e.com/ci" } }, migration: { ack: "https://e.com/ack" } }, new Set());
    const planned = await planTool(tool(), changes, context(fieldChecks));
    assert.deepEqual(planned.refused, []);
    assert.equal(planned.tool.path, "crates/rg");
    assert.deepEqual(planned.tool.deploy, ["binary"]);
    assert.deepEqual(planned.tool.capabilities, { ci: { docs: "https://e.com/ci" } });
    assert.deepEqual(planned.tool.replaces, [{ tool: "ack", fit: "full", note: "Faster.", migration: "https://e.com/ack" }]);
    assert.deepEqual(fieldChecks.asked.deploys, [["binary"]]);
  });

  it("keeps the published value of every field whose check fails, and says why", async () => {
    const current = tool({ path: "crates/old", deploy: ["binary"] });
    const entry: MaintainerEntry = {
      path: "missing",
      deploy: ["binary", "helm"],
      capabilities: { ci: { docs: "https://dead.example.com" }, chat: { docs: "https://e.com/chat" }, constructor: { docs: "https://e.com/x" } },
      migration: { jira: "https://e.com/jira", ack: "https://dead.example.com/ack" },
    };
    const planned = await planTool(current, proposals(current, entry, new Set()), context(checks()));
    assert.deepEqual(planned.tool, current);
    assert.deepEqual(planned.accepted, []);
    assert.deepEqual(planned.refused, [
      "path: missing is not a directory on main",
      "deploy: GitHub shows no helm artefact from its owner",
      "capabilities.ci: https://dead.example.com answered 404",
      "capabilities.chat: chat is not a capability of search",
      "capabilities.constructor: constructor is not a capability of search",
      "migration.jira: the entry does not replace jira",
      "migration.ack: https://dead.example.com/ack answered 404",
    ]);
  });

  it("refuses deploy methods for a category of things nobody runs themselves", async () => {
    const planned = await planTool(tool(), [{ field: "deploy", value: ["binary"] }], context(checks(), categories.get("library")));
    assert.deepEqual(planned.refused, ["deploy: deploy is only for tools people run themselves, and search is not selfHost"]);
  });

  it("checks deploy against the path the same file just set", async () => {
    const seen: (string | undefined)[] = [];
    const fieldChecks = checks({
      async unprovenDeploy(candidate) {
        seen.push(candidate.path);
        return [];
      },
    });
    await planTool(tool(), [{ field: "path", value: "crates/rg" }, { field: "deploy", value: ["binary"] }], context(fieldChecks));
    assert.deepEqual(seen, ["crates/rg"]);
  });

  it("treats a check that throws as a failed check, not as a crash", async () => {
    const fieldChecks = checks({
      async directoryExists() {
        throw new Error("GitHub 502\n::error::forged");
      },
    });
    const planned = await planTool(tool(), [{ field: "path", value: "crates/rg" }], context(fieldChecks));
    assert.deepEqual(planned.refused, ["path: could not be checked (GitHub 502?::error::forged)"]);
  });

  it("removes without checking anything", async () => {
    const fieldChecks = checks();
    const current = tool({ deploy: ["binary"], capabilities: { ci: { docs: "https://e.com/ci", note: "Reviewed." } } });
    const planned = await planTool(current, [{ field: "deploy", value: null }, { field: "capability", key: "ci", value: null }], context(fieldChecks));
    assert.equal(planned.tool.deploy, undefined);
    assert.equal(planned.tool.capabilities, undefined);
    assert.deepEqual(fieldChecks.asked, { directories: [], deploys: [], links: [] });
  });
});

describe("fileNotes", () => {
  const catalog = new Map([
    ["ripgrep", tool()],
    ["competitor", tool({ slug: "competitor", repository: "https://github.com/rival/competitor" })],
    ["rg-core", tool({ slug: "rg-core", path: "crates/core" })],
  ]);

  it("notes a key naming another repository's tool or a tool the catalog does not have", () => {
    const notes = fileNotes(tool(), "acme/ripgrep", [located("tools:\n  ripgrep: {}\n  competitor: {}\n  brand-new: {}\n  rg-core: {}\n")], catalog);
    assert.deepEqual(notes, [
      "acme/ripgrep/.awesome-alternatives lists competitor, whose repository is https://github.com/rival/competitor, so it is ignored",
      "acme/ripgrep/.awesome-alternatives lists brand-new, which the catalog does not have",
    ]);
  });

  it("notes a package's file speaking for a sibling package", () => {
    const notes = fileNotes(tool({ path: "crates/rg" }), "acme/ripgrep", [located("tools:\n  rg-core: {}\n", "path")], catalog);
    assert.deepEqual(notes, ["acme/ripgrep/crates/rg/.awesome-alternatives lists rg-core, which only its own path or the root file can speak for, so it is ignored"]);
  });

  it("says why a whole file is ignored", () => {
    const notes = fileNotes(tool(), "acme/ripgrep", [located("tools:\n  ripgrep:\n    path: ../../\n")], catalog);
    assert.equal(notes.length, 1);
    assert.match(notes[0] ?? "", /^acme\/ripgrep\/\.awesome-alternatives is ignored as a whole, so it verifies nothing: it does not match/);
  });
});

describe("maintainerFieldsOf", () => {
  it("names the fields whose published value is the one the maintainers provide", () => {
    const current = tool({ deploy: ["container", "binary"], capabilities: { ci: { docs: "https://e.com/ci" } } });
    const entry: MaintainerEntry = { deploy: ["binary", "container"], capabilities: { ci: { docs: "https://e.com/other" } }, path: "crates/rg" };
    assert.deepEqual(maintainerFieldsOf(current, entry, []), ["deploy"]);
  });

  it("keeps the earlier provenance when no file speaks for the tool any more, for the fields still there", () => {
    assert.deepEqual(maintainerFieldsOf(tool({ deploy: ["binary"] }), null, ["deploy", "path", "capabilities.ci"]), ["deploy"]);
  });

  it("keeps a field dropped from the file until a run removes it, so a refresh that does not apply cannot forget the removal", () => {
    const current = tool({ deploy: ["binary"], path: "crates/rg" });
    const fields = maintainerFieldsOf(current, { path: "crates/rg" }, ["deploy", "path"]);
    assert.deepEqual(fields, ["path", "deploy"]);
    assert.deepEqual(proposals(current, { path: "crates/rg" }, new Set(fields)), [{ field: "deploy", value: null }]);
  });

  it("stops naming a field whose published value the maintainers no longer provide", () => {
    assert.deepEqual(maintainerFieldsOf(tool({ deploy: ["binary"] }), { deploy: ["helm"] }, ["deploy"]), []);
  });
});

describe("applyMaintainerFiles", () => {
  const facts = (files: LocatedFile[], fullName = "acme/ripgrep", databaseId = 7): Read<RepositoryFacts> => {
    const before = published(tool(), 10, true);
    return {
      status: "read",
      value: { repo: { ...before.repo, fullName, databaseId }, release: null, releases: [], claim: [], maintainerFiles: files, openIssues: 0, contributors: null, platforms: [] },
    };
  };

  it("applies a tool's own fields and never another repository's", async () => {
    const competitor = tool({ slug: "competitor", repository: "https://github.com/rival/competitor", file: "data/tools/competitor.yaml" });
    const text = "tools:\n  ripgrep:\n    deploy: [binary]\n    category: library\n  competitor:\n    deploy: [helm]\n    path: src\n    category: library\n    affiliation: Not theirs.\n";
    const read = new Map([
      ["ripgrep", facts([located(text)])],
      ["competitor", facts([], "rival/competitor")],
    ]);
    const result = await applyMaintainerFiles([tool(), competitor], [tool(), competitor], read, new Map(), { catalog: catalogOf(tool(), competitor), migrationPages: [], checks: checks() });
    assert.deepEqual(result.tools.map((t) => [t.slug, t.deploy, t.path]), [
      ["ripgrep", ["binary"], undefined],
      ["competitor", undefined, undefined],
    ]);
    assert.deepEqual(result.applied, [
      {
        slug: "ripgrep",
        file: "data/tools/ripgrep.yaml",
        source: { fullName: "acme/ripgrep", location: ".awesome-alternatives", commit: "0123456789abcdef0123456789abcdef01234567" },
        changes: [{ field: "deploy", value: ["binary"] }],
      },
    ]);
    assert.deepEqual(result.proposed, [
      {
        slug: "ripgrep",
        source: { fullName: "acme/ripgrep", location: ".awesome-alternatives", commit: "0123456789abcdef0123456789abcdef01234567" },
        editorial: { category: "library" },
      },
    ]);
  });

  it("changes nothing when the file is gone, the repository unreadable or the file rejected", async () => {
    const current = tool({ deploy: ["binary"] });
    const earlier = new Map([["ripgrep", { maintainerFields: ["deploy"] }]]);
    for (const read of [facts([]), { status: "gone" } as const, facts([located(`tools:\n  ripgrep: {}\n${"#".repeat(20_000)}`)])]) {
      const result = await applyMaintainerFiles([current], [current], new Map([["ripgrep", read]]), earlier, { catalog: catalogOf(current), migrationPages: [], checks: checks() });
      assert.deepEqual(result, { tools: [current], applied: [], proposed: [] });
    }
  });

  it("removes a field the file no longer provides", async () => {
    const current = tool({ deploy: ["binary"] });
    const earlier = new Map([["ripgrep", { maintainerFields: ["deploy"] }]]);
    const result = await applyMaintainerFiles([current], [current], new Map([["ripgrep", facts([located("tools:\n  ripgrep: {}\n")])]]), earlier, {
      catalog: catalogOf(current),
      migrationPages: [],
      checks: checks(),
    });
    assert.equal(result.tools[0]?.deploy, undefined);
    assert.deepEqual(result.applied[0]?.changes, [{ field: "deploy", value: null }]);
  });

  it("checks at most a fixed number of tools per run", async () => {
    const many = Array.from({ length: MAX_TOOLS_PER_RUN + 3 }, (_, i) => tool({ slug: `tool-${i}`, repository: `https://github.com/acme/tool-${i}` }));
    const read = new Map(many.map((t) => [t.slug, facts([located(`tools:\n  ${t.slug}:\n    deploy: [binary]\n`)], `acme/${t.slug}`)] as const));
    const fieldChecks = checks();
    const result = await applyMaintainerFiles(many, many, read, new Map(), { catalog: catalogOf(...many), migrationPages: [], checks: fieldChecks });
    assert.equal(result.applied.length, MAX_TOOLS_PER_RUN);
    assert.equal(fieldChecks.asked.deploys.length, MAX_TOOLS_PER_RUN);
  });

  it("does not spend the run's budget on tools whose changes are all refused", async () => {
    const refused = Array.from({ length: MAX_TOOLS_PER_RUN + 5 }, (_, i) => tool({ slug: `bad-${i}`, repository: `https://github.com/acme/bad-${i}` }));
    const good = tool({ slug: "zz-good", repository: "https://github.com/acme/zz-good" });
    const all = [...refused, good];
    const read = new Map(
      all.map((t) => [t.slug, facts([located(`tools:\n  ${t.slug}:\n    deploy: [${t === good ? "binary" : "helm"}]\n`)], `acme/${t.slug}`)] as const),
    );
    const result = await applyMaintainerFiles(all, all, read, new Map(), { catalog: catalogOf(...all), migrationPages: [], checks: checks() });
    assert.deepEqual(result.applied.map((a) => a.slug), ["zz-good"]);
  });

  it("applies nothing from a repository whose name was taken over by another one", async () => {
    const file = [located("tools:\n  ripgrep:\n    deploy: [binary]\n")];
    const run = (databaseId: number) =>
      applyMaintainerFiles([tool()], [tool()], new Map([["ripgrep", facts(file, "acme/ripgrep", databaseId)]]), new Map([["ripgrep", { repo: { databaseId: 7 } }]]), {
        catalog: catalogOf(tool()),
        migrationPages: [],
        checks: checks(),
      });
    assert.deepEqual(await run(99), { tools: [tool()], applied: [], proposed: [] });
    assert.equal((await run(7)).applied.length, 1);
  });

  it("applies nothing from a repository that now answers under another name", async () => {
    const fieldChecks = checks();
    const read = new Map([["ripgrep", facts([located("tools:\n  ripgrep:\n    deploy: [binary]\n    category: library\n")], "squatter/ripgrep")]]);
    const result = await applyMaintainerFiles([tool()], [tool()], read, new Map(), { catalog: catalogOf(tool()), migrationPages: [], checks: fieldChecks });
    assert.deepEqual(result, { tools: [tool()], applied: [], proposed: [] });
    assert.deepEqual(fieldChecks.asked, { directories: [], deploys: [], links: [] });
  });

  describe("in a repository shared by several entries", () => {
    const rg = tool({ path: "crates/rg", repository: "https://github.com/acme/mono" });
    const core = tool({ slug: "rg-core", path: "crates/core", repository: "https://github.com/acme/mono", file: "data/tools/rg-core.yaml" });
    const apply = (entry: string, earlier: string[] = []) =>
      applyMaintainerFiles(
        [rg, core],
        [rg],
        new Map([["ripgrep", facts([located(`tools:\n  ripgrep:${entry}\n`, "path")], "acme/mono")]]),
        new Map([["ripgrep", { maintainerFields: earlier }]]),
        { catalog: catalogOf(rg, core), migrationPages: [], checks: checks() },
      );

    it("refuses a path that collides with a sibling's, whatever its case", async () => {
      for (const path of ["crates/core", "Crates/Core"]) {
        const result = await apply(`\n    path: ${path}`);
        assert.deepEqual(result, { tools: [rg], applied: [], proposed: [] }, path);
      }
    });

    it("refuses to remove the path that keeps the entry apart from its siblings", async () => {
      assert.deepEqual(await apply(" {}", ["path"]), { tools: [rg], applied: [], proposed: [] });
    });

    it("still moves the entry to a free path", async () => {
      const result = await apply("\n    path: crates/ripgrep");
      assert.equal(result.tools[0]?.path, "crates/ripgrep");
    });
  });

  it("refuses to remove an official migration guide a migration page relies on", async () => {
    const current = tool({ replaces: [{ tool: "ack", fit: "full", migration: "https://e.com/ack" }] });
    const page = { file: "ack--ripgrep.md", text: "---\nreviewed: 2026-10-01\nmajors: {}\nsources: [https://e.com]\n---\nBody.\n" };
    const result = await applyMaintainerFiles(
      [current],
      [current],
      new Map([["ripgrep", facts([located("tools:\n  ripgrep: {}\n")])]]),
      new Map([["ripgrep", { maintainerFields: ["migration.ack"] }]]),
      { catalog: catalogOf(current), migrationPages: [page], checks: checks() },
    );
    assert.deepEqual(result, { tools: [current], applied: [], proposed: [] });
  });
});

describe("catalogGuard", () => {
  it("names the error a change would add to the catalog, and only a new one", () => {
    const a = tool({ slug: "a", path: "x", repository: "https://github.com/acme/mono", replaces: [] });
    const b = tool({ slug: "b", path: "y", repository: "https://github.com/acme/mono", replaces: [] });
    const guard = catalogGuard({ tools: [a, b], products: [], categories }, []);
    const { path: _, ...withoutPath } = b;
    assert.match(guard.introducedError(withoutPath) ?? "", /^b: .*already listed as a/);
    assert.equal(guard.introducedError({ ...b, path: "z" }), null);
    assert.notEqual(guard.introducedError({ ...b, path: "X" }), null);
  });

  it("refuses a change the explicit checks miss but the catalog's own rules catch", async () => {
    const lib = tool({ category: "library", replaces: [] });
    const guard = catalogGuard({ tools: [lib], products: [], categories }, []);
    const planned = await planTool(lib, [{ field: "capability", key: "ci", value: "https://e.com/ci" }], context(checks(), CATEGORY, { tools: [lib], products: [], categories }));
    assert.match(guard.introducedError({ ...lib, capabilities: { ci: { docs: "https://e.com/ci" } } }) ?? "", /ci is not a capability of library/);
    assert.deepEqual(planned.accepted, []);
    assert.match(planned.refused[0] ?? "", /^capabilities\.ci: it would make the catalog invalid \(ripgrep: ci is not a capability of library/);
  });
});
