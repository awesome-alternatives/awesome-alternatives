import assert from "node:assert/strict";
import { generateKeyPairSync, verify } from "node:crypto";
import { describe, it } from "node:test";
import { appJwt, createInstallations, installationsFromEnv, installationToken, isMaintainerVerified } from "../scripts/lib/app.ts";

const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
const pem = privateKey.export({ type: "pkcs8", format: "pem" }).toString();

function decode(part: string): Record<string, unknown> {
  return JSON.parse(Buffer.from(part, "base64url").toString("utf8"));
}

describe("appJwt", () => {
  it("is an RS256 token GitHub can check against the app's public key", () => {
    const token = appJwt("42", privateKey, new Date("2026-09-24T12:00:00Z"));
    const [header = "", payload = "", signature = ""] = token.split(".");
    assert.deepEqual(decode(header), { alg: "RS256", typ: "JWT" });
    assert.ok(verify("RSA-SHA256", Buffer.from(`${header}.${payload}`), publicKey, Buffer.from(signature, "base64url")));
  });

  it("backdates iat for clock drift and expires under GitHub's ten minute ceiling", () => {
    const now = new Date("2026-09-24T12:00:00Z");
    const claims = decode(appJwt("42", privateKey, now).split(".")[1] ?? "");
    const seconds = now.getTime() / 1000;
    assert.equal(claims.iss, "42");
    assert.equal(claims.iat, seconds - 60);
    assert.ok((claims.exp as number) - seconds <= 600);
    assert.ok((claims.exp as number) > seconds);
  });
});

function fakeFetch(status: number, seen: { url: string; authorization: string }[]): typeof fetch {
  return (async (url: string, init: RequestInit) => {
    seen.push({ url, authorization: (init.headers as Record<string, string>).authorization ?? "" });
    return new Response(status === 200 ? "{}" : "nope", { status });
  }) as typeof fetch;
}

describe("createInstallations", () => {
  it("answers true when the app is installed on the repository", async () => {
    const seen: { url: string; authorization: string }[] = [];
    const installations = createInstallations("42", pem, fakeFetch(200, seen));
    assert.equal(await installations.isInstalledOn("acme/tool"), true);
    assert.equal(seen[0]?.url, "https://api.github.com/repos/acme/tool/installation");
    assert.match(seen[0]?.authorization ?? "", /^Bearer [\w-]+\.[\w-]+\.[\w-]+$/);
  });

  it("answers false on a 404, which is how GitHub says the app is not installed", async () => {
    assert.equal(await createInstallations("42", pem, fakeFetch(404, [])).isInstalledOn("acme/tool"), false);
  });

  it("throws on any other failure rather than unverifying a tool", async () => {
    await assert.rejects(createInstallations("42", pem, fakeFetch(500, [])).isInstalledOn("acme/tool"), /GitHub 500/);
  });

  it("reuses one token until it nears expiry, then signs a new one", async () => {
    const seen: { url: string; authorization: string }[] = [];
    let now = new Date("2026-09-24T12:00:00Z");
    const installations = createInstallations("42", pem, fakeFetch(200, seen), () => now);
    await installations.isInstalledOn("a/b");
    now = new Date("2026-09-24T12:05:00Z");
    await installations.isInstalledOn("a/b");
    now = new Date("2026-09-24T12:08:00Z");
    await installations.isInstalledOn("a/b");
    assert.equal(seen[0]?.authorization, seen[1]?.authorization);
    assert.notEqual(seen[1]?.authorization, seen[2]?.authorization);
  });
});

describe("installationsFromEnv", () => {
  it("is off unless both the app id and its key are set", () => {
    assert.equal(installationsFromEnv({}), null);
    assert.equal(installationsFromEnv({ APP_ID: "42" }), null);
    assert.notEqual(installationsFromEnv({ APP_ID: "42", APP_PRIVATE_KEY: pem }), null);
  });
});

describe("isMaintainerVerified", () => {
  function installedOn(installed: boolean, asked: string[]) {
    return {
      async isInstalledOn(fullName: string) {
        asked.push(fullName);
        return installed;
      },
    };
  }

  it("verifies a tool whose repository has the app installed and no claim file", async () => {
    const asked: string[] = [];
    assert.equal(await isMaintainerVerified("tool", [], "acme/tool", installedOn(true, asked)), true);
    assert.deepEqual(asked, ["acme/tool"]);
  });

  it("does not ask about the app when the claim file already verifies the tool", async () => {
    const asked: string[] = [];
    assert.equal(await isMaintainerVerified("tool", ["other", "tool"], "acme/tool", installedOn(false, asked)), true);
    assert.deepEqual(asked, []);
  });

  it("leaves a tool unverified with neither the file nor the app", async () => {
    assert.equal(await isMaintainerVerified("tool", ["other"], "acme/tool", installedOn(false, [])), false);
    assert.equal(await isMaintainerVerified("tool", [], "acme/tool", null), false);
  });
});

describe("installationToken", () => {
  interface Call {
    url: string;
    method: string;
    authorization: string;
    body: unknown;
  }

  function github(responses: Record<string, { status: number; body: unknown }>, calls: Call[]): typeof fetch {
    return (async (url: string, init: RequestInit) => {
      calls.push({
        url,
        method: init.method ?? "GET",
        authorization: (init.headers as Record<string, string>).authorization ?? "",
        body: init.body ? JSON.parse(init.body as string) : undefined,
      });
      const answer = responses[url] ?? { status: 404, body: { message: "Not Found" } };
      return new Response(JSON.stringify(answer.body), { status: answer.status });
    }) as typeof fetch;
  }

  const installation = "https://api.github.com/repos/acme/catalog/installation";
  const tokens = "https://api.github.com/app/installations/77/access_tokens";

  it("finds the repository's installation and mints a token scoped to that repository alone", async () => {
    const calls: Call[] = [];
    const fetchImpl = github(
      { [installation]: { status: 200, body: { id: 77 } }, [tokens]: { status: 201, body: { token: "ghs_x" } } },
      calls,
    );
    assert.equal(await installationToken("42", pem, "acme/catalog", fetchImpl), "ghs_x");
    assert.deepEqual(
      calls.map((c) => [c.method, c.url, c.body]),
      [
        ["GET", installation, undefined],
        ["POST", tokens, { repositories: ["catalog"] }],
      ],
    );
    assert.ok(calls.every((c) => /^Bearer [\w-]+\.[\w-]+\.[\w-]+$/.test(c.authorization)));
  });

  it("fails loudly when the app is not installed on the repository", async () => {
    await assert.rejects(installationToken("42", pem, "acme/catalog", github({}, [])), /GitHub 404 on \/repos\/acme\/catalog\/installation/);
  });

  it("rejects a response without a token instead of pushing anonymously", async () => {
    const fetchImpl = github({ [installation]: { status: 200, body: { id: 77 } }, [tokens]: { status: 201, body: {} } }, []);
    await assert.rejects(installationToken("42", pem, "acme/catalog", fetchImpl), /no token/);
  });

  it("refuses a repository that is not owner/name before calling GitHub", async () => {
    const calls: Call[] = [];
    await assert.rejects(installationToken("42", pem, "https://github.com/acme/catalog", github({}, calls)), /not an owner\/name/);
    assert.deepEqual(calls, []);
  });
});
