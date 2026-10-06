import { lookup } from "node:dns/promises";
import { request } from "node:https";
import { BlockList, isIP, type LookupFunction } from "node:net";

export const TIMEOUT_MS = 15_000;
export const USER_AGENT = "awesome-alternatives-validate (+https://awesome-alternatives.com/contribute/)";
export const MAX_HOPS = 5;

export interface Limits {
  hopMs: number;
  totalMs: number;
}

export const LIMITS: Limits = { hopMs: TIMEOUT_MS, totalMs: 2 * TIMEOUT_MS };

export interface Resolved {
  address: string;
  family: number;
}

export interface Answer {
  status: number;
  location: string | null;
}

export interface LinkTransport {
  resolve(hostname: string): Promise<readonly Resolved[]>;
  get(url: URL, pinned: Resolved, signal: AbortSignal): Promise<Answer>;
}

const BLOCKED_V4: readonly (readonly [string, number])[] = [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.0.0.0", 24],
  ["192.0.2.0", 24],
  ["192.168.0.0", 16],
  ["198.18.0.0", 15],
  ["198.51.100.0", 24],
  ["203.0.113.0", 24],
  ["224.0.0.0", 4],
  ["240.0.0.0", 4],
];

const BLOCKED_V6: readonly (readonly [string, number])[] = [
  ["::", 96],
  ["::ffff:0:0", 96],
  ["::ffff:0:0:0", 96],
  ["64:ff9b::", 96],
  ["64:ff9b:1::", 48],
  ["100::", 64],
  ["2001::", 32],
  ["2001:db8::", 32],
  ["2002::", 16],
  ["fc00::", 7],
  ["fe80::", 10],
  ["ff00::", 8],
];

const BLOCKED_IPV4 = new BlockList();
for (const [network, prefix] of BLOCKED_V4) BLOCKED_IPV4.addSubnet(network, prefix, "ipv4");
const BLOCKED_IPV6 = new BlockList();
for (const [network, prefix] of BLOCKED_V6) BLOCKED_IPV6.addSubnet(network, prefix, "ipv6");

export function isPublicAddress(address: string): boolean {
  const family = isIP(address);
  if (family === 0) return false;
  return family === 4 ? !BLOCKED_IPV4.check(address, "ipv4") : !BLOCKED_IPV6.check(address, "ipv6");
}

function bareHost(hostname: string): string {
  return hostname.startsWith("[") && hostname.endsWith("]") ? hostname.slice(1, -1) : hostname;
}

export function hopProblem(url: URL): string | null {
  if (url.protocol !== "https:") return "is not https";
  if (url.username || url.password) return "carries credentials";
  if (url.port !== "") return "uses a port other than 443";
  if (isIP(bareHost(url.hostname))) return "names an IP address instead of a host";
  return null;
}

function pinnedLookup(pinned: Resolved): LookupFunction {
  return (_hostname, options, callback) => {
    if (options.all) callback(null, [pinned]);
    else callback(null, pinned.address, pinned.family);
  };
}

const REQUEST_HEADERS = {
  "user-agent": USER_AGENT,
  accept: "*/*",
  "accept-language": "*",
  "accept-encoding": "gzip, deflate",
  "sec-fetch-mode": "cors",
};

export const HTTPS_TRANSPORT: LinkTransport = {
  resolve: (hostname) => lookup(hostname, { all: true, verbatim: true }),
  get(url, pinned, signal) {
    return new Promise((resolve, reject) => {
      const req = request(
        url,
        { method: "GET", agent: false, lookup: pinnedLookup(pinned), headers: REQUEST_HEADERS, timeout: TIMEOUT_MS, signal },
        (res) => {
          resolve({ status: res.statusCode ?? 0, location: res.headers.location ?? null });
          res.destroy();
        },
      );
      req.on("timeout", () => req.destroy(new Error(`no data for ${TIMEOUT_MS / 1000} s`)));
      req.on("error", reject);
      req.end();
    });
  },
};

class Deadline extends Error {}

function within<T>(work: Promise<T>, signal: AbortSignal): Promise<T> {
  if (signal.aborted) return Promise.reject(new Deadline());
  return new Promise<T>((resolve, reject) => {
    const abort = () => reject(new Deadline());
    signal.addEventListener("abort", abort, { once: true });
    work.then(resolve, reject).finally(() => signal.removeEventListener("abort", abort));
  });
}

async function publicAddress(transport: LinkTransport, hostname: string, signal: AbortSignal): Promise<Resolved | string> {
  let addresses: readonly Resolved[];
  try {
    addresses = await within(transport.resolve(hostname), signal);
  } catch (error) {
    if (error instanceof Deadline) throw error;
    return `${hostname} did not resolve: ${(error as Error).message}`;
  }
  const [first] = addresses;
  if (!first || addresses.some((resolved) => !isPublicAddress(resolved.address))) {
    return `${hostname} resolves to an address that is not public`;
  }
  return first;
}

async function fetchHop(transport: LinkTransport, url: URL, pinned: Resolved, signal: AbortSignal): Promise<Answer | string> {
  try {
    return await within(transport.get(url, pinned, signal), signal);
  } catch (error) {
    if (error instanceof Deadline || signal.aborted) throw new Deadline();
    return `${url.href} did not answer: ${(error as Error).message}`;
  }
}

async function follow(link: string, transport: LinkTransport, limits: Limits, total: AbortSignal): Promise<string | null> {
  let url = new URL(link);
  for (let hop = 0; hop <= MAX_HOPS; hop++) {
    const problem = hopProblem(url);
    if (problem) return `${url.href} ${problem}`;
    const signal = AbortSignal.any([total, AbortSignal.timeout(limits.hopMs)]);
    const pinned = await publicAddress(transport, url.hostname, signal);
    if (typeof pinned === "string") return pinned;
    const answer = await fetchHop(transport, url, pinned, signal);
    if (typeof answer === "string") return answer;
    if (answer.status < 300 || answer.status >= 400 || !answer.location) {
      return answer.status >= 200 && answer.status < 300 ? null : `${url.href} answered ${answer.status}`;
    }
    if (!URL.canParse(answer.location, url)) return `${url.href} redirects to something that is not a URL`;
    url = new URL(answer.location, url);
  }
  return `${link} redirects more than ${MAX_HOPS} times`;
}

export async function unsafeOrUnreachable(link: string, transport: LinkTransport = HTTPS_TRANSPORT, limits: Limits = LIMITS): Promise<string | null> {
  if (!URL.canParse(link)) return `${link} is not a URL`;
  try {
    return await follow(link, transport, limits, AbortSignal.timeout(limits.totalMs));
  } catch (error) {
    if (error instanceof Deadline) return `${link} did not answer in time`;
    throw error;
  }
}
