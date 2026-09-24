import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { checkDeploy, type DeployEvidence, fetchDeployEvidence, provenMethods } from "../scripts/lib/deploy.ts";
import type { GitHub } from "../scripts/lib/github.ts";

const nothing: DeployEvidence = {
  name: "tool",
  paths: ["README.md", "src/main.go", "LICENSE"],
  assets: [],
  readme: "# Tool\n\nA tool.",
  siblings: [],
};

function proven(evidence: Partial<DeployEvidence>): string[] {
  return [...provenMethods({ ...nothing, ...evidence })].sort();
}

describe("provenMethods", () => {
  it("finds nothing in a repository with no deployable artefact", () => {
    assert.deepEqual(proven({}), []);
  });

  it("reads a container from a Dockerfile or Containerfile anywhere in the tree", () => {
    assert.deepEqual(proven({ paths: ["Dockerfile"] }), ["container"]);
    assert.deepEqual(proven({ paths: ["build/package/Containerfile"] }), ["container"]);
    assert.deepEqual(proven({ paths: ["docker/server.Dockerfile"] }), ["container"]);
    assert.deepEqual(proven({ paths: ["docs/dockerfile-guide.md"] }), []);
  });

  it("reads a container from a README that pulls or runs an image", () => {
    assert.deepEqual(proven({ readme: "docker run -p 3000:3000 acme/tool" }), ["container"]);
    assert.deepEqual(proven({ readme: "image: ghcr.io/acme/tool:latest" }), ["container"]);
  });

  it("reads compose from a compose file or the README", () => {
    assert.deepEqual(proven({ paths: ["deploy/docker-compose.yml"] }), ["compose"]);
    assert.deepEqual(proven({ paths: ["compose.yaml"] }), ["compose"]);
    assert.deepEqual(proven({ readme: "Start it with `docker compose up -d`." }), ["compose"]);
  });

  it("reads helm from a Chart.yaml or a helm install in the README", () => {
    assert.deepEqual(proven({ paths: ["charts/tool/Chart.yaml"] }), ["helm"]);
    assert.deepEqual(proven({ readme: "helm repo add acme https://charts.acme.dev" }), ["helm"]);
    assert.deepEqual(proven({ paths: ["charts/README.md"] }), []);
  });

  it("reads binaries from release assets that are not checksums, signatures or metadata", () => {
    assert.deepEqual(proven({ assets: ["tool_linux_amd64.tar.gz"] }), ["binary"]);
    assert.deepEqual(proven({ assets: ["checksums.txt", "tool.tar.gz.sig", "tool.sbom.json", "SHA256SUMS"] }), []);
  });

  it("reads OS packages from .deb or .rpm assets, or a package manager install in the README", () => {
    assert.ok(proven({ assets: ["tool_1.0_amd64.deb"] }).includes("package"));
    assert.ok(proven({ assets: ["tool-1.0.x86_64.rpm"] }).includes("package"));
    assert.deepEqual(proven({ readme: "brew install tool" }), ["package"]);
    assert.deepEqual(proven({ readme: "brewing coffee" }), []);
  });

  it("reads a chart or an image kept in a repository of its own by the same owner", () => {
    assert.deepEqual(proven({ siblings: ["helm-charts"] }), ["helm"]);
    assert.deepEqual(proven({ siblings: ["tool-helm"] }), ["helm"]);
    assert.deepEqual(proven({ siblings: ["docker"] }), ["container"]);
    assert.deepEqual(proven({ siblings: ["tool-docker-image"] }), ["container"]);
    assert.deepEqual(proven({ siblings: ["self-hosted"] }), ["compose"]);
  });

  it("does not take another project's chart or image for this tool's", () => {
    assert.deepEqual(proven({ siblings: ["business-charts", "other-helm", "docker-slack-message"] }), []);
  });

  it("still reads the README and assets when the tree was too large to list", () => {
    assert.deepEqual(proven({ paths: null, readme: "helm install tool acme/tool" }), ["helm"]);
  });
});

describe("checkDeploy", () => {
  it("says nothing when every declared method has evidence", () => {
    assert.deepEqual(checkDeploy({ slug: "t", deploy: ["container"] }, { ...nothing, paths: ["Dockerfile"] }), []);
  });

  it("warns once per declared method GitHub shows no evidence of", () => {
    const findings = checkDeploy({ slug: "t", deploy: ["container", "helm", "binary"] }, { ...nothing, paths: ["Dockerfile"] });
    assert.deepEqual(
      findings.map((f) => [f.severity, f.code, f.message.split(" ")[1]]),
      [
        ["warning", "deploy-unproven", "helm"],
        ["warning", "deploy-unproven", "binary"],
      ],
    );
  });

  it("says the file listing was incomplete when the tree was truncated", () => {
    const [finding] = checkDeploy({ slug: "t", deploy: ["compose"] }, { ...nothing, paths: null });
    assert.match(finding?.message ?? "", /too large to list/);
  });

  it("has nothing to check on a tool that declares no deploy method", () => {
    assert.deepEqual(checkDeploy({ slug: "t" }, nothing), []);
  });
});

describe("fetchDeployEvidence", () => {
  function github(responses: Record<string, unknown>, asked: string[] = []): GitHub {
    return {
      async get<T>(path: string): Promise<T | null> {
        asked.push(path);
        return (responses[path] ?? null) as T | null;
      },
    };
  }

  const tree = "/repos/acme/tool/git/trees/main?recursive=1";
  const owned = "/users/acme/repos?type=owner&per_page=100&page=1";

  it("keeps files only, the latest release's asset names and the decoded README", async () => {
    const evidence = await fetchDeployEvidence(
      github({
        [tree]: {
          truncated: false,
          tree: [
            { path: "charts", type: "tree" },
            { path: "charts/tool/Chart.yaml", type: "blob" },
          ],
        },
        "/repos/acme/tool/releases/latest": { assets: [{ name: "tool.deb" }] },
        "/repos/acme/tool/readme": { encoding: "base64", content: Buffer.from("docker run acme/tool").toString("base64") },
      }),
      "acme/tool",
      "main",
      ["container", "helm"],
    );
    assert.deepEqual(evidence, {
      name: "tool",
      paths: ["charts/tool/Chart.yaml"],
      assets: ["tool.deb"],
      readme: "docker run acme/tool",
      siblings: [],
    });
  });

  it("gives up on the file list when GitHub truncates the tree, and on everything a repository lacks", async () => {
    const evidence = await fetchDeployEvidence(github({ [tree]: { truncated: true, tree: [] } }), "acme/tool", "main", [
      "binary",
    ]);
    assert.deepEqual(evidence, { name: "tool", paths: null, assets: [], readme: "", siblings: [] });
  });

  it("reads a monorepo package's own README", async () => {
    const asked: string[] = [];
    await fetchDeployEvidence(github({}, asked), "acme/mono", "main", [], "apps/server");
    assert.ok(asked.includes("/repos/acme/mono/readme/apps/server"));
  });

  it("lists the owner's other live repositories when a declared chart is not in the tool's own", async () => {
    const evidence = await fetchDeployEvidence(
      github({
        [tree]: { truncated: false, tree: [{ path: "Dockerfile", type: "blob" }] },
        [owned]: [
          { name: "tool", archived: false },
          { name: "helm-charts", archived: false },
          { name: "old-charts", archived: true },
        ],
      }),
      "acme/tool",
      "main",
      ["container", "helm"],
    );
    assert.deepEqual(evidence.siblings, ["helm-charts"]);
  });

  it("does not list the owner's repositories when the tool's own already proves what it declares", async () => {
    const asked: string[] = [];
    await fetchDeployEvidence(
      github({ [tree]: { truncated: false, tree: [{ path: "Dockerfile", type: "blob" }] } }, asked),
      "acme/tool",
      "main",
      ["container", "binary"],
    );
    assert.equal(asked.includes(owned), false);
  });
});
