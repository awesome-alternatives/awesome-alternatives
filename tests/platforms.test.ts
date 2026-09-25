import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { platformsOf } from "../scripts/lib/platforms.ts";

describe("platformsOf", () => {
  it("reads a Rust target triple", () => {
    assert.deepEqual(platformsOf(["ripgrep-14.1.0-x86_64-unknown-linux-musl.tar.gz"]), [
      { os: "linux", architectures: ["x86_64"] },
    ]);
    assert.deepEqual(
      platformsOf([
        "ripgrep-14.1.0-aarch64-apple-darwin.tar.gz",
        "ripgrep-14.1.0-x86_64-pc-windows-msvc.zip",
        "ripgrep-14.1.0-armv7-unknown-linux-gnueabihf.tar.gz",
        "ripgrep-14.1.0-arm-unknown-linux-gnueabihf.tar.gz",
        "ripgrep-14.1.0-i686-pc-windows-msvc.zip",
      ]),
      [
        { os: "linux", architectures: ["armv7", "arm"] },
        { os: "macos", architectures: ["arm64"] },
        { os: "windows", architectures: ["x86_64", "x86"] },
      ],
    );
  });

  it("reads Go release names whatever the case and separator", () => {
    assert.deepEqual(
      platformsOf([
        "app-darwin-arm64.zip",
        "tool_1.2.3_Linux_x86_64.tar.gz",
        "tool_1.2.3_linux_amd64.tar.gz",
        "tool_1.2.3_linux_arm64.tar.gz",
        "tool_1.2.3_freebsd_386.tar.gz",
        "tool_1.2.3_Windows_x64.zip",
        "tool_1.2.3_darwin_universal.tar.gz",
      ]),
      [
        { os: "linux", architectures: ["x86_64", "arm64"] },
        { os: "macos", architectures: ["arm64", "universal"] },
        { os: "windows", architectures: ["x86_64"] },
        { os: "freebsd", architectures: ["x86"] },
      ],
    );
  });

  it("reads the operating system from an installer's extension when the name does not say it", () => {
    assert.deepEqual(platformsOf(["Setup.exe", "Tool-1.0.msi", "Tool-1.0.dmg", "Tool-1.0.AppImage", "tool_1.0_amd64.deb"]), [
      { os: "linux", architectures: ["x86_64"] },
      { os: "macos", architectures: [] },
      { os: "windows", architectures: [] },
    ]);
  });

  it("keeps an Android build apart from Linux, although its triple mentions linux", () => {
    assert.deepEqual(platformsOf(["tool-aarch64-linux-android.tar.gz"]), [{ os: "android", architectures: ["arm64"] }]);
    assert.deepEqual(platformsOf(["app-arm64-v8a-release.apk", "com.example.app-armeabi-v7a.fdroid.apk", "aegis-v3.4.3.apk"]), [
      { os: "android", architectures: ["arm64", "armv7"] },
    ]);
    assert.deepEqual(platformsOf(["tool_1.0_linux_amd64.apk"]), [{ os: "linux", architectures: ["x86_64"] }]);
  });

  it("reads Python wheel tags and bitness suffixes without guessing the architecture from them", () => {
    assert.deepEqual(
      platformsOf([
        "matrix_synapse-1.161.0-cp310-abi3-manylinux_2_28_aarch64.whl",
        "pkg-1.0-cp312-cp312-macosx_11_0_arm64.whl",
        "pkg-1.0-cp312-cp312-win_amd64.whl",
        "pkg-1.0-py3-none-any.whl",
        "Cuberite-linux64.tar.gz",
        "Cuberite-freebsd64.tar.gz",
        "Cuberite-windows32.zip",
      ]),
      [
        { os: "linux", architectures: ["arm64"] },
        { os: "macos", architectures: ["arm64"] },
        { os: "windows", architectures: ["x86_64"] },
        { os: "freebsd", architectures: [] },
      ],
    );
  });

  it("finds nothing in checksums, signatures, sources and updater manifests", () => {
    assert.deepEqual(
      platformsOf([
        "checksums.txt",
        "source.tar.gz",
        "ripgrep-14.1.0-x86_64-unknown-linux-musl.tar.gz.sha256",
        "tool_linux_amd64.tar.gz.sig",
        "tool-darwin-arm64.sbom.json",
        "latest-mac.yml",
        "Tool-1.0.dmg.blockmap",
      ]),
      [],
    );
  });

  it("finds nothing in names that mention no operating system, even when they name an architecture", () => {
    assert.deepEqual(platformsOf(["tool-1.0.0.tar.gz", "tool.zip", "tool-x86_64.tar.gz", "tool-arm64.wasm", "docs.pdf"]), []);
    assert.deepEqual(platformsOf([]), []);
  });

  it("does not read an operating system out of a longer word", () => {
    assert.deepEqual(platformsOf(["twinkle-1.0.tar.gz", "macchina-6.1.tar.gz", "darwinism.zip"]), []);
  });
});
