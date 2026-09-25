import { ARCHITECTURES, type Architecture, OPERATING_SYSTEMS, type OperatingSystem, type Platform } from "./types.ts";

const SIDECAR =
  /\.(sha1|sha256|sha512|sha256sum|sha512sum|md5|sig|asc|pem|crt|cert|minisig|sigstore|bundle|sbom|spdx|cdx|intoto\.jsonl|json|txt|yml|yaml|blockmap|zsync)$/;

const OS_TOKENS: Readonly<Record<string, OperatingSystem>> = {
  linux: "linux",
  linux32: "linux",
  linux64: "linux",
  manylinux: "linux",
  musllinux: "linux",
  darwin: "macos",
  macos: "macos",
  macosx: "macos",
  osx: "macos",
  mac: "macos",
  windows: "windows",
  win: "windows",
  win32: "windows",
  win64: "windows",
  windows32: "windows",
  windows64: "windows",
  msvc: "windows",
  mingw: "windows",
  freebsd: "freebsd",
  freebsd64: "freebsd",
  openbsd: "openbsd",
  netbsd: "netbsd",
  android: "android",
};

const OS_EXTENSIONS: Readonly<Record<string, OperatingSystem>> = {
  exe: "windows",
  msi: "windows",
  msix: "windows",
  appx: "windows",
  dmg: "macos",
  pkg: "macos",
  appimage: "linux",
  deb: "linux",
  rpm: "linux",
  snap: "linux",
  flatpak: "linux",
  apk: "android",
};

const ARCH_TOKENS: Readonly<Record<string, Architecture>> = {
  amd64: "x86_64",
  x64: "x86_64",
  win64: "x86_64",
  aarch64: "arm64",
  arm64: "arm64",
  armv8: "arm64",
  i386: "x86",
  i586: "x86",
  i686: "x86",
  "386": "x86",
  x86: "x86",
  ia32: "x86",
  armv7: "armv7",
  armv7l: "armv7",
  armv7a: "armv7",
  armhf: "armv7",
  arm: "arm",
  armv6: "arm",
  armv6l: "arm",
  armel: "arm",
  riscv64: "riscv64",
  riscv64gc: "riscv64",
  ppc64le: "ppc64le",
  powerpc64le: "ppc64le",
  s390x: "s390x",
  universal: "universal",
  universal2: "universal",
};

function tokensOf(name: string): string[] {
  return name.replace(/x86[-_]64/g, "amd64").replace(/armeabi[-_]v7a/g, "armv7").split(/[^a-z0-9]+/).filter(Boolean);
}

function systemsOf(name: string, tokens: readonly string[]): Set<OperatingSystem> {
  const named = new Set(tokens.flatMap((token) => OS_TOKENS[token] ?? []));
  if (named.has("android")) named.delete("linux");
  if (named.size > 0) return named;
  const extension = name.slice(name.lastIndexOf(".") + 1);
  const implied = OS_EXTENSIONS[extension];
  return new Set(implied ? [implied] : []);
}

export function platformsOf(assetNames: readonly string[]): Platform[] {
  const found = new Map<OperatingSystem, Set<Architecture>>();
  for (const raw of assetNames) {
    const name = raw.trim().toLowerCase();
    if (SIDECAR.test(name)) continue;
    const tokens = tokensOf(name);
    const architectures = tokens.flatMap((token) => ARCH_TOKENS[token] ?? []);
    for (const os of systemsOf(name, tokens)) {
      const known = found.get(os) ?? new Set<Architecture>();
      for (const architecture of architectures) known.add(architecture);
      found.set(os, known);
    }
  }
  return OPERATING_SYSTEMS.flatMap((os) => {
    const architectures = found.get(os);
    return architectures ? [{ os, architectures: ARCHITECTURES.filter((a) => architectures.has(a)) }] : [];
  });
}
