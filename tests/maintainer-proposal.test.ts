import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parse } from "yaml";
import type { Catalog } from "../scripts/lib/catalog.ts";
import { editorialOf, type Proposal, proposalHash, proposedTool } from "../scripts/lib/maintainer-editorial.ts";
import { type MaintainerEntry, parseMaintainerFile } from "../scripts/lib/maintainer-file.ts";
import { catalogGuard } from "../scripts/lib/maintainer-guard.ts";
import { MAX_PULLS_PER_RUN, type ProposalHost, proposeAll } from "../scripts/lib/maintainer-propose.ts";
import { decide, fenced, fileLink, proposalBody, proposalBranch, proposalTitle, type PullSummary } from "../scripts/lib/maintainer-pull.ts";
import { proposedYaml } from "../scripts/lib/maintainer-write.ts";
import type { Category, Tool } from "../scripts/lib/types.ts";

const COMMIT = "0123456789abcdef0123456789abcdef01234567";
const categories = new Map<string, Category>([
  ["search", { name: "Search", description: "d", capabilities: { ci: { label: "CI", match: [] } } }],
  ["library", { name: "Library", description: "d" }],
]);

function tool(over: Partial<Tool> = {}): Tool {
  return {
    slug: "ripgrep",
    name: "ripgrep",
    repository: "https://github.com/acme/ripgrep",
    category: "search",
    file: "data/tools/ripgrep.yaml",
    replaces: [
      { tool: "ack", fit: "full", note: "Faster.", migration: "https://e.com/ack" },
      { tool: "grep", fit: "partial", note: "Recursive by default." },
    ],
    ...over,
  };
}

const others: Tool[] = ["ack", "grep", "ag"].map((slug) => tool({ slug, repository: `https://github.com/other/${slug}`, file: `data/tools/${slug}.yaml`, replaces: [] }));
const catalogOf = (...tools: Tool[]): Catalog => ({ tools: [...tools, ...others], products: [], categories });

function entryOf(text: string, slug = "ripgrep"): MaintainerEntry {
  const file = parseMaintainerFile(text);
  assert.equal(file.form, "fields", file.form === "rejected" ? file.reason : "");
  return file.form === "fields" ? (file.tools.get(slug) ?? {}) : {};
}

function proposal(text: string, slug = "ripgrep"): Proposal {
  const editorial = editorialOf(entryOf(text, slug));
  assert.ok(editorial);
  return { slug, source: { fullName: "acme/ripgrep", location: ".awesome-alternatives", commit: COMMIT }, editorial };
}

describe("proposedTool", () => {
  it("treats the file's replaces as the whole list, updating, adding and removing while keeping what the file cannot say", () => {
    const { editorial } = proposal("tools:\n  ripgrep:\n    replaces:\n      - tool: ack\n        fit: drop-in\n      - tool: ag\n        fit: full\n        note: Same flags.\n");
    const { tool: after, skipped } = proposedTool(tool(), editorial, catalogOf(tool()));
    assert.deepEqual(after.replaces, [
      { tool: "ack", fit: "drop-in", note: "Faster.", migration: "https://e.com/ack" },
      { tool: "ag", fit: "full", note: "Same flags." },
    ]);
    assert.deepEqual(skipped, []);
  });

  it("proposes nothing when the file agrees with the entry, or leaves out a field", () => {
    const same = proposal("tools:\n  ripgrep:\n    category: search\n    replaces:\n      - tool: grep\n        fit: partial\n      - tool: ack\n        fit: full\n");
    const current = tool();
    assert.equal(proposedTool(current, same.editorial, catalogOf(current)).tool, current);
    const categoryOnly = proposal("tools:\n  ripgrep:\n    category: library\n");
    assert.deepEqual(proposedTool(current, categoryOnly.editorial, catalogOf(current)).tool.replaces, current.replaces);
  });

  it("skips an unknown category, an unknown or self replacement and a duplicate, and keeps the rest", () => {
    const { editorial } = proposal(
      "tools:\n  ripgrep:\n    category: busiest-category\n    replaces:\n      - tool: ack\n        fit: full\n      - tool: nowhere\n        fit: drop-in\n      - tool: ripgrep\n        fit: drop-in\n      - tool: ack\n        fit: drop-in\n",
    );
    const { tool: after, skipped } = proposedTool(tool(), editorial, catalogOf(tool()));
    assert.equal(after.category, "search");
    assert.deepEqual(after.replaces?.map((r) => [r.tool, r.fit]), [["ack", "full"]]);
    assert.deepEqual(skipped, [
      "category busiest-category is not in data/categories.yaml",
      "replaces nowhere, which the catalog does not have",
      "replaces ripgrep, the tool itself",
      "lists ack more than once",
    ]);
  });
});

describe("proposalHash", () => {
  it("is the same for the same content in another order, and changes with any value", () => {
    const a = proposal("tools:\n  ripgrep:\n    replaces:\n      - tool: ack\n        fit: full\n      - tool: ag\n        fit: full\n").editorial;
    const b = proposal("tools:\n  ripgrep:\n    replaces:\n      - tool: ag\n        fit: full\n      - tool: ack\n        fit: full\n").editorial;
    const c = proposal("tools:\n  ripgrep:\n    replaces:\n      - tool: ag\n        fit: full\n        note: x\n      - tool: ack\n        fit: full\n").editorial;
    assert.equal(proposalHash("ripgrep", a), proposalHash("ripgrep", b));
    assert.notEqual(proposalHash("ripgrep", a), proposalHash("ripgrep", c));
    assert.notEqual(proposalHash("ripgrep", a), proposalHash("ack", a));
  });
});

describe("decide", () => {
  const hash = "a".repeat(64);
  const marked = `body\n<!-- maintainer-proposal: ${hash} -->`;

  it("does not reopen a proposal closed with the same content, and opens one for new content", () => {
    assert.deepEqual(decide([{ number: 4, state: "closed", body: marked }], hash), { action: "skip", reason: "#4 proposed the same content and was closed" });
    assert.deepEqual(decide([{ number: 4, state: "closed", body: marked }], "b".repeat(64)), { action: "open" });
    assert.deepEqual(decide([], hash), { action: "open" });
  });

  it("updates the open proposal when the content changed, and leaves it otherwise", () => {
    assert.deepEqual(decide([{ number: 9, state: "open", body: "older" }], hash), { action: "update", number: 9 });
    assert.deepEqual(decide([{ number: 9, state: "open", body: marked }], hash), { action: "skip", reason: "#9 already proposes it" });
  });
});

describe("the pull request", () => {
  it("builds the branch and the title from a validated slug only", () => {
    assert.equal(proposalBranch("ripgrep"), "maintainer/ripgrep");
    for (const slug of ["rg; rm -rf /", "$(id)", "rg`id`", "../main", "rg\nfoo", "Rg"]) {
      assert.throws(() => proposalBranch(slug), /is not a slug/);
      assert.throws(() => proposalTitle(slug), /is not a slug/);
    }
  });

  it("links the file at its commit, and at the branch head when the commit is unknown", () => {
    const source = { fullName: "acme/ripgrep", location: "crates/rg/.awesome-alternatives", commit: COMMIT };
    assert.equal(fileLink(source), `https://github.com/acme/ripgrep/blob/${COMMIT}/crates/rg/.awesome-alternatives`);
    assert.equal(fileLink({ ...source, commit: "main; echo" }), "https://github.com/acme/ripgrep/blob/HEAD/crates/rg/.awesome-alternatives");
    assert.throws(() => fileLink({ ...source, fullName: "acme/rg)](https://evil.example" }), /owner\/name/);
  });

  it("quotes a hostile note inside a fence it cannot close, and keeps the marker outside it", () => {
    const hostile = "```` ``` </details><img src=x onerror=alert(1)> [x](https://evil.example) --> @everyone";
    const p = proposal(`tools:\n  ripgrep:\n    replaces:\n      - tool: ag\n        fit: drop-in\n        note: '${hostile}'\n`);
    const hash = proposalHash("ripgrep", p.editorial);
    const body = proposalBody(p, proposedTool(tool(), p.editorial, catalogOf(tool())).tool, hash);
    const lines = body.split("\n");
    const open = lines.findIndex((line) => /^`{3,}yaml$/.test(line));
    const fence = lines[open]?.replace("yaml", "") ?? "";
    const close = lines.findIndex((line, i) => i > open && line.startsWith("```") && line.trim().length >= fence.length && /^`+$/.test(line.trim()));
    const inside = lines.slice(open + 1, close).join("\n");
    assert.ok(open >= 0 && close > open);
    assert.ok(inside.includes(hostile));
    assert.ok(!lines.slice(close + 1).join("\n").includes("onerror"));
    assert.equal(lines.at(-1), `<!-- maintainer-proposal: ${hash} -->`);
    assert.equal(body.split("maintainer-proposal:").length, 2);
  });

  it("opens a fence longer than any run of backticks in what it quotes", () => {
    assert.equal(fenced("a\n```\nb", "yaml"), "````yaml\na\n```\nb\n````");
    assert.equal(fenced("plain"), "```\nplain\n```");
  });

  it("tells the reviewer when the maintainers name the tools they compete with, and whether the entry says so", () => {
    const p = proposal("tools:\n  ripgrep:\n    replaces:\n      - tool: ack\n        fit: drop-in\n");
    const undeclared = proposalBody(p, tool(), "h");
    assert.match(undeclared, /maintainers of `acme\/ripgrep`, whose project competes with `ack`/);
    assert.match(undeclared, /declares no affiliation/);
    const declared = proposalBody(p, tool({ affiliation: "Maintained by Acme." }), "h");
    assert.match(declared, /declares this affiliation:\n\n```text\nMaintained by Acme\.\n```/);
    assert.doesNotMatch(proposalBody(proposal("tools:\n  ripgrep:\n    category: library\n"), tool(), "h"), /Affiliation/);
  });
});

describe("proposedYaml", () => {
  const text = "name: ripgrep\nrepository: https://github.com/acme/ripgrep\ncategory: search\nreplaces:\n  - tool: ack\n    fit: full\n    note: Faster.\npath: crates/rg\n";

  it("rewrites only the editorial fields that changed, storing a hostile note as data", () => {
    const before = parse(text);
    const note = "x: y\n- tool: evil\n# ```";
    const after = { ...before, category: "library", replaces: [{ tool: "ack", fit: "drop-in", note }] };
    const written = proposedYaml(text, before, after);
    assert.deepEqual(parse(written), after);
    assert.ok(written.startsWith("name: ripgrep\nrepository: https://github.com/acme/ripgrep\ncategory: library\nreplaces:\n"));
    assert.equal(proposedYaml(text, before, before), text);
  });
});

describe("proposeAll", () => {
  interface Recorded {
    pushed: [string, string, string][];
    opened: [string, string, string][];
    updated: number[];
    checked: string[];
  }

  function host(pulls: (branch: string) => PullSummary[] = () => []): ProposalHost & { recorded: Recorded } {
    const recorded: Recorded = { pushed: [], opened: [], updated: [], checked: [] };
    return {
      recorded,
      async pulls(branch) {
        if (branch === "maintainer/broken") throw new Error("GitHub 502");
        return pulls(branch);
      },
      async push(branch, _, file, text) {
        recorded.pushed.push([branch, file, text]);
      },
      async open(branch, title, body) {
        recorded.opened.push([branch, title, body]);
        return 12;
      },
      async update(number) {
        recorded.updated.push(number);
      },
      async check(branch) {
        recorded.checked.push(branch);
      },
    };
  }

  const ENTRY = "name: ripgrep\nrepository: https://github.com/acme/ripgrep\ncategory: search\n";
  const context = (catalog: Catalog, fake: ProposalHost) => ({ catalog, guard: catalogGuard(catalog, []), base: COMMIT, read: async () => ENTRY, host: fake });

  it("opens one pull request on the tool's branch, then does not reopen it once closed with the same content", async () => {
    const current = tool();
    const catalog = catalogOf(current);
    const p = proposal("tools:\n  ripgrep:\n    category: library\n");
    const first = host();
    assert.deepEqual(await proposeAll([p], context(catalog, first)), [{ slug: "ripgrep", result: "opened", number: 12 }]);
    assert.deepEqual(first.recorded.checked, ["maintainer/ripgrep"]);
    const [branch, title, body] = first.recorded.opened[0] ?? [];
    assert.equal(branch, "maintainer/ripgrep");
    assert.equal(title, "feat(catalog): update ripgrep from its maintainer file");
    assert.equal(parse(first.recorded.pushed[0]?.[2] ?? "").category, "library");

    const replay = host(() => [{ number: 12, state: "closed", body: body ?? "" }]);
    assert.deepEqual(await proposeAll([p], context(catalog, replay)), [{ slug: "ripgrep", result: "skipped", reason: "#12 proposed the same content and was closed" }]);
    assert.deepEqual(replay.recorded, { pushed: [], opened: [], updated: [], checked: [] });

    const changed = proposal("tools:\n  ripgrep:\n    category: library\n    affiliation: Maintained by Acme.\n");
    assert.equal((await proposeAll([changed], context(catalog, replay)))[0]?.result, "opened");
  });

  it("refuses a change that would break the catalog, such as a category without the entry's capabilities", async () => {
    const current = tool({ capabilities: { ci: { docs: "https://e.com/ci" } } });
    const fake = host();
    const outcomes = await proposeAll([proposal("tools:\n  ripgrep:\n    category: library\n")], context(catalogOf(current), fake));
    assert.equal(outcomes[0]?.result, "skipped");
    assert.match(outcomes[0]?.result === "skipped" ? outcomes[0].reason : "", /unknown|capabilit/);
    assert.deepEqual(fake.recorded.pushed, []);
  });

  it("caps the pull requests per run, and one failure does not stop the others", async () => {
    const slugs = ["broken", ...Array.from({ length: MAX_PULLS_PER_RUN + 2 }, (_, i) => `tool-${i}`)];
    const tools = slugs.map((slug) => tool({ slug, repository: `https://github.com/acme/${slug}`, file: `data/tools/${slug}.yaml` }));
    const proposals = slugs.map((slug) => proposal(`tools:\n  ${slug}:\n    category: library\n`, slug));
    const fake = host();
    const outcomes = await proposeAll(proposals, context(catalogOf(...tools), fake));
    assert.equal(outcomes[0]?.result, "failed");
    assert.equal(fake.recorded.opened.length, MAX_PULLS_PER_RUN);
    assert.equal(outcomes.filter((o) => o.result === "skipped").length, 2);
  });

  it("ignores a proposal for a slug the catalog does not have", async () => {
    const fake = host();
    const p = { ...proposal("tools:\n  ripgrep:\n    category: library\n"), slug: "rg; rm -rf /" };
    assert.deepEqual(await proposeAll([p], context(catalogOf(tool()), fake)), [{ slug: "rg; rm -rf /", result: "skipped", reason: "the catalog does not have it" }]);
    assert.deepEqual(fake.recorded.pushed, []);
  });
});
