import assert from "node:assert/strict";
import { generateKeyPairSync, verify } from "node:crypto";
import { describe, it } from "node:test";
import { appJwt, createInstallations, installationsFromEnv, installationToken, isInstalledOn, isMaintainerVerified } from "../scripts/lib/app.ts";

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

interface AppCall {
  method: string;
  url: string;
  authorization: string;
}

interface FakeInstallation {
  id: number;
  account: string;
  selection: "all" | "selected";
  repositories?: string[];
  suspended?: boolean;
}

function appApi(installations: readonly FakeInstallation[], calls: AppCall[], status = 200): typeof fetch {
  return async (input, init) => {
    const url = new URL(String(input));
    const authorization = (init?.headers as Record<string, string>).authorization ?? "";
    calls.push({ method: init?.method ?? "GET", url: `${url.pathname}${url.search}`, authorization });
    if (status !== 200) return new Response("nope", { status });
    const page = Number(url.searchParams.get("page"));
    const perPage = Number(url.searchParams.get("per_page"));
    if (url.pathname === "/app/installations") {
      const listed = installations.slice((page - 1) * perPage, page * perPage).map((i) => ({
        id: i.id,
        account: { login: i.account },
        repository_selection: i.selection,
        suspended_at: i.suspended ? "2026-09-01T00:00:00Z" : null,
      }));
      return Response.json(listed);
    }
    const token = url.pathname.match(/^\/app\/installations\/(\d+)\/access_tokens$/);
    if (token) return Response.json({ token: `ghs_${token[1]}` });
    if (url.pathname === "/installation/repositories") {
      const id = Number(authorization.replace("Bearer ghs_", ""));
      const names = installations.find((i) => i.id === id)?.repositories ?? [];
      return Response.json({ total_count: names.length, repositories: names.slice((page - 1) * perPage, page * perPage).map((full_name) => ({ full_name })) });
    }
    return new Response("not found", { status: 404 });
  };
}

describe("createInstallations", () => {
  it("lists the installations once and reads the selected repositories with each installation's own token", async () => {
    const calls: AppCall[] = [];
    const installations = createInstallations(
      "42",
      pem,
      appApi(
        [
          { id: 1, account: "Acme", selection: "all" },
          { id: 2, account: "bob", selection: "selected", repositories: ["bob/Tool"] },
          { id: 3, account: "carol", selection: "selected", repositories: ["carol/app"], suspended: true },
        ],
        calls,
      ),
    );
    const installed = await installations.list();
    assert.equal(isInstalledOn(installed, "acme/anything"), true);
    assert.equal(isInstalledOn(installed, "bob/tool"), true);
    assert.equal(isInstalledOn(installed, "bob/other"), false);
    assert.equal(isInstalledOn(installed, "carol/app"), false);
    assert.deepEqual(
      calls.map((c) => `${c.method} ${c.url}`),
      ["GET /app/installations?per_page=100&page=1", "POST /app/installations/2/access_tokens", "GET /installation/repositories?per_page=100&page=1"],
    );
    assert.match(calls[0]?.authorization ?? "", /^Bearer [\w-]+\.[\w-]+\.[\w-]+$/);
    assert.equal(calls[2]?.authorization, "Bearer ghs_2");
  });

  it("follows the pages of installations and of selected repositories", async () => {
    const everyAccount = Array.from({ length: 101 }, (_, i): FakeInstallation => ({ id: i + 10, account: `org${i}`, selection: "all" }));
    const repositories = Array.from({ length: 150 }, (_, i) => `solo/r${i}`);
    const calls: AppCall[] = [];
    const installed = await createInstallations(
      "42",
      pem,
      appApi([...everyAccount, { id: 5, account: "solo", selection: "selected", repositories }], calls),
    ).list();
    assert.equal(isInstalledOn(installed, "org100/x"), true);
    assert.equal(isInstalledOn(installed, "solo/r149"), true);
    assert.equal(calls.filter((c) => c.url.startsWith("/app/installations?")).length, 2);
    assert.equal(calls.filter((c) => c.url.startsWith("/installation/repositories")).length, 2);
  });

  it("throws on a failure rather than unverifying every tool", async () => {
    await assert.rejects(createInstallations("42", pem, appApi([], [], 500)).list(), /GitHub 500/);
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
  const installed = { accounts: new Set(["acme"]), repositories: new Set(["bob/tool"]) };

  it("verifies a tool whose repository has the app installed and no claim file", () => {
    assert.equal(isMaintainerVerified("tool", [], "Acme/tool", installed), true);
    assert.equal(isMaintainerVerified("tool", [], "bob/tool", installed), true);
  });

  it("verifies a tool the claim file lists without the app", () => {
    assert.equal(isMaintainerVerified("tool", ["other", "tool"], "carol/tool", null), true);
  });

  it("leaves a tool unverified with neither the file nor the app", () => {
    assert.equal(isMaintainerVerified("tool", ["other"], "bob/other", installed), false);
    assert.equal(isMaintainerVerified("tool", [], "acme/tool", null), false);
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
    assert.equal(await installationToken("42", pem, "acme/catalog", "read", fetchImpl), "ghs_x");
    assert.deepEqual(
      calls.map((c) => [c.method, c.url, c.body]),
      [
        ["GET", installation, undefined],
        ["POST", tokens, { repositories: ["catalog"], permissions: { contents: "read", metadata: "read" } }],
      ],
    );
    assert.ok(calls.every((c) => /^Bearer [\w-]+\.[\w-]+\.[\w-]+$/.test(c.authorization)));
  });

  it("asks for write access to contents only when told to, so the refresh never holds a write token", async () => {
    const calls: Call[] = [];
    const fetchImpl = github(
      { [installation]: { status: 200, body: { id: 77 } }, [tokens]: { status: 201, body: { token: "ghs_w" } } },
      calls,
    );
    assert.equal(await installationToken("42", pem, "acme/catalog", "write", fetchImpl), "ghs_w");
    assert.deepEqual(calls.at(-1)?.body, { repositories: ["catalog"], permissions: { contents: "write", metadata: "read" } });
  });

  it("fails loudly when the app is not installed on the repository", async () => {
    await assert.rejects(installationToken("42", pem, "acme/catalog", "read", github({}, [])), /GitHub 404 on \/repos\/acme\/catalog\/installation/);
  });

  it("rejects a response without a token instead of pushing anonymously", async () => {
    const fetchImpl = github({ [installation]: { status: 200, body: { id: 77 } }, [tokens]: { status: 201, body: {} } }, []);
    await assert.rejects(installationToken("42", pem, "acme/catalog", "write", fetchImpl), /no token/);
  });

  it("refuses a repository that is not owner/name before calling GitHub", async () => {
    const calls: Call[] = [];
    await assert.rejects(installationToken("42", pem, "https://github.com/acme/catalog", "write", github({}, calls)), /not an owner\/name/);
    assert.deepEqual(calls, []);
  });
});
