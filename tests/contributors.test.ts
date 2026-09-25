import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  activeSince,
  advance,
  authorKey,
  type CommitAuthor,
  contributorsOf,
  hasMore,
  HISTORY_PAGES,
  type HistoryPage,
  type HistoryWalk,
  isBot,
  startWalk,
} from "../scripts/lib/contributors.ts";

const author = (over: Partial<CommitAuthor>): CommitAuthor => ({ name: null, email: null, user: null, ...over });
const walked = (...pages: HistoryPage[]): HistoryWalk => pages.reduce(advance, startWalk("acme/tool", "abc"));
const page = (authors: (CommitAuthor | null)[], cursor: string | null = null): HistoryPage => ({
  pageInfo: { hasNextPage: cursor !== null, endCursor: cursor },
  nodes: authors.map((a) => ({ author: a })),
});

describe("isBot", () => {
  it("recognises a GitHub App by its [bot] suffix wherever it shows", () => {
    assert.ok(isBot(author({ user: { login: "dependabot[bot]" } })));
    assert.ok(isBot(author({ name: "github-actions[bot]", email: "41898282+github-actions[bot]@users.noreply.github.com" })));
    assert.ok(isBot(author({ name: "Renovate", email: "29139614+renovate[bot]@users.noreply.github.com" })));
    assert.ok(isBot(author({ name: "Mergify[Bot]" })));
  });

  it("leaves people alone, including one whose login mentions bot", () => {
    assert.ok(!isBot(author({ name: "Abbot", user: { login: "robotics-dev" } })));
    assert.ok(!isBot(author({ email: "bot@example.com" })));
  });
});

describe("authorKey", () => {
  it("names a linked account by its login, whatever email the commit used", () => {
    assert.equal(authorKey(author({ user: { login: "BurntSushi" }, email: "a@b.c" })), "user:burntsushi");
  });

  it("falls back to the email for a commit linked to no account, then to the name", () => {
    assert.equal(authorKey(author({ name: "Jane", email: " Jane@Example.org " })), "email:jane@example.org");
    assert.equal(authorKey(author({ name: "Jane Doe", email: "" })), "name:jane doe");
    assert.equal(authorKey(author({})), null);
  });

  it("has no key for a bot", () => {
    assert.equal(authorKey(author({ name: "renovate[bot]", email: "renovate@whitesourcesoftware.com" })), null);
  });
});

describe("contributorsOf", () => {
  it("counts distinct authors and leaves bots and authorless commits out", () => {
    const walk = walked(
      page([
        author({ user: { login: "alice" } }),
        author({ user: { login: "Alice" }, email: "other@example.org" }),
        author({ name: "dependabot[bot]", email: "49699333+dependabot[bot]@users.noreply.github.com" }),
        author({ name: "Bob", email: "bob@example.org" }),
        author({ name: "Bob", email: "BOB@example.org" }),
        author({ name: "Bob", email: "bob@work.example" }),
        null,
      ]),
    );
    assert.deepEqual(contributorsOf(walk), { count: 3, capped: false });
  });

  it("marks a walk that still had a page to read as a lower bound", () => {
    assert.deepEqual(contributorsOf(walked(page([author({ user: { login: "a" } })], "next"))), {
      count: 1,
      capped: true,
    });
  });

  it("counts zero for a branch nobody committed to in the window", () => {
    assert.deepEqual(contributorsOf(walked(page([]))), { count: 0, capped: false });
  });
});

describe("hasMore", () => {
  it("asks for the first page, then follows the cursor until the last page or the cap", () => {
    assert.ok(hasMore(walked()));
    assert.ok(hasMore(walked(page([], "c1"))));
    assert.ok(!hasMore(walked(page([], null))));
    const capped = walked(...Array.from({ length: HISTORY_PAGES }, (_, i) => page([], `c${i}`)));
    assert.ok(!hasMore(capped));
    assert.equal(contributorsOf(capped)?.capped, true);
  });

  it("has no count before the first page", () => {
    assert.equal(contributorsOf(walked()), null);
  });
});

it("looks back 90 days from the run", () => {
  assert.equal(activeSince(new Date("2026-09-24T03:00:00Z")), "2026-06-26T03:00:00.000Z");
});
