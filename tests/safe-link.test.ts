import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isSafeUrl } from "../scripts/lib/maintainer-file.ts";
import { type Answer, isPublicAddress, type LinkTransport, MAX_HOPS, type Resolved, unsafeOrUnreachable } from "../scripts/lib/safe-link.ts";

const PUBLIC: Resolved = { address: "93.184.215.14", family: 4 };

function transport(dns: Record<string, readonly Resolved[]>, answers: Record<string, Answer>): LinkTransport & { asked: string[]; pinned: string[] } {
  const asked: string[] = [];
  const pinned: string[] = [];
  return {
    asked,
    pinned,
    async resolve(hostname) {
      const found = dns[hostname];
      if (!found) throw new Error("ENOTFOUND");
      return found;
    },
    async get(url, address) {
      asked.push(url.href);
      pinned.push(address.address);
      return answers[url.href] ?? { status: 404, location: null };
    },
  };
}

describe("isPublicAddress", () => {
  it("refuses every private, local and special range, in both families", () => {
    for (const address of [
      "127.0.0.1",
      "10.0.0.5",
      "172.16.3.4",
      "192.168.1.1",
      "169.254.169.254",
      "100.64.0.1",
      "0.0.0.0",
      "::",
      "::1",
      "fe80::1",
      "fc00::1",
      "fd12:3456::1",
      "::ffff:127.0.0.1",
      "::ffff:8.8.8.8",
      "::7f00:1",
      "::ffff:0:7f00:1",
      "64:ff9b::a00:1",
      "64:ff9b:1::a00:1",
      "not an address",
    ]) {
      assert.equal(isPublicAddress(address), false, address);
    }
  });

  it("accepts public addresses", () => {
    for (const address of ["8.8.8.8", "140.82.121.4", "2606:4700:4700::1111"]) assert.equal(isPublicAddress(address), true, address);
  });
});

describe("unsafeOrUnreachable", () => {
  it("answers nothing for a public https link that answers", async () => {
    const t = transport({ "docs.example.com": [PUBLIC] }, { "https://docs.example.com/ci": { status: 200, location: null } });
    assert.equal(await unsafeOrUnreachable("https://docs.example.com/ci", t), null);
    assert.deepEqual(t.pinned, [PUBLIC.address]);
  });

  it("refuses a host that resolves to a private address, even once among public ones", async () => {
    const t = transport({ "internal.example.com": [PUBLIC, { address: "10.0.0.1", family: 4 }] }, {});
    assert.match((await unsafeOrUnreachable("https://internal.example.com/", t)) ?? "", /not public/);
    assert.deepEqual(t.asked, []);
  });

  it("follows redirects by hand, checking every hop", async () => {
    const t = transport(
      { "a.example.com": [PUBLIC], "b.example.com": [PUBLIC], "metadata.example.com": [{ address: "169.254.169.254", family: 4 }] },
      {
        "https://a.example.com/": { status: 301, location: "https://b.example.com/next" },
        "https://b.example.com/next": { status: 302, location: "/final" },
        "https://b.example.com/final": { status: 200, location: null },
        "https://a.example.com/to-http": { status: 302, location: "http://b.example.com/" },
        "https://a.example.com/to-metadata": { status: 302, location: "https://metadata.example.com/latest" },
        "https://a.example.com/to-ip": { status: 302, location: "https://127.0.0.1/" },
        "https://a.example.com/to-port": { status: 302, location: "https://b.example.com:8443/" },
      },
    );
    assert.equal(await unsafeOrUnreachable("https://a.example.com/", t), null);
    assert.match((await unsafeOrUnreachable("https://a.example.com/to-http", t)) ?? "", /http:\/\/b\.example\.com\/ is not https/);
    assert.match((await unsafeOrUnreachable("https://a.example.com/to-metadata", t)) ?? "", /metadata\.example\.com resolves to an address that is not public/);
    assert.match((await unsafeOrUnreachable("https://a.example.com/to-ip", t)) ?? "", /names an IP address/);
    assert.match((await unsafeOrUnreachable("https://a.example.com/to-port", t)) ?? "", /port other than 443/);
    assert.deepEqual(new Set(t.asked.map((url) => new URL(url).origin)), new Set(["https://a.example.com", "https://b.example.com"]));
  });

  it("gives up after a fixed number of redirects", async () => {
    const answers: Record<string, Answer> = {};
    for (let i = 0; i <= MAX_HOPS + 1; i++) answers[`https://loop.example.com/${i}`] = { status: 302, location: `/${i + 1}` };
    const t = transport({ "loop.example.com": [PUBLIC] }, answers);
    assert.match((await unsafeOrUnreachable("https://loop.example.com/0", t)) ?? "", /redirects more than 5 times/);
    assert.equal(t.asked.length, MAX_HOPS + 1);
  });

  it("reports a host that does not resolve, a failed request and an error status", async () => {
    const failing: LinkTransport = {
      resolve: async () => [PUBLIC],
      get: async () => {
        throw new Error("ECONNRESET");
      },
    };
    assert.match((await unsafeOrUnreachable("https://nowhere.example.com/", transport({}, {}))) ?? "", /did not resolve/);
    assert.match((await unsafeOrUnreachable("https://docs.example.com/", failing)) ?? "", /did not answer: ECONNRESET/);
    assert.match((await unsafeOrUnreachable("https://docs.example.com/x", transport({ "docs.example.com": [PUBLIC] }, {}))) ?? "", /answered 404/);
  });
});

describe("isSafeUrl", () => {
  it("refuses IP literals, other ports and credentials in a maintainer's link", () => {
    assert.equal(isSafeUrl("https://docs.example.com/ci"), true);
    for (const url of ["https://127.0.0.1/", "https://[::1]/", "https://2130706433/", "https://docs.example.com:8443/", "https://u:p@docs.example.com/", "http://docs.example.com/"]) {
      assert.equal(isSafeUrl(url), false, url);
    }
  });
});

describe("deadlines", () => {
  const limits = { hopMs: 50, totalMs: 120 };
  const never = <T>(): Promise<T> => new Promise<T>(() => undefined);

  it("gives up on a server that never finishes answering", async () => {
    let aborted = false;
    const stalled: LinkTransport = {
      resolve: async () => [PUBLIC],
      get: (_, __, signal) => {
        signal.addEventListener("abort", () => {
          aborted = true;
        });
        return never();
      },
    };
    const started = Date.now();
    assert.match((await unsafeOrUnreachable("https://slow.example.com/", stalled, limits)) ?? "", /did not answer in time/);
    assert.ok(Date.now() - started < 1_000);
    assert.equal(aborted, true);
  });

  it("puts name resolution under the same deadline", async () => {
    const stalled: LinkTransport = { resolve: () => never(), get: async () => ({ status: 200, location: null }) };
    assert.match((await unsafeOrUnreachable("https://slow.example.com/", stalled, limits)) ?? "", /did not answer in time/);
  });

  it("bounds a whole chain of redirects, each fast enough on its own", async () => {
    let hops = 0;
    const slowChain: LinkTransport = {
      resolve: async () => [PUBLIC],
      get: async (url) => {
        hops++;
        await new Promise((resolve) => setTimeout(resolve, 40));
        return { status: 302, location: `${url.pathname}x` };
      },
    };
    assert.match((await unsafeOrUnreachable("https://chain.example.com/a", slowChain, limits)) ?? "", /did not answer in time/);
    assert.ok(hops < MAX_HOPS);
  });
});
