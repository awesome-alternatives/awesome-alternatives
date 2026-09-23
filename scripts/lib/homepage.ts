import type { Finding, Product } from "./types.ts";

const TIMEOUT_MS = 15_000;
const USER_AGENT = "awesome-alternatives-validate (+https://awesome-alternatives.com/contribute/)";

export async function checkHomepage(
  product: Pick<Product, "slug" | "homepage">,
  fetchImpl: typeof fetch = fetch,
): Promise<Finding[]> {
  const warn = (message: string): Finding[] => [
    { slug: product.slug, severity: "warning", code: "homepage-unreachable", message },
  ];
  try {
    const res = await fetchImpl(product.homepage, {
      headers: { "user-agent": USER_AGENT },
      redirect: "follow",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    await res.body?.cancel();
    return res.ok ? [] : warn(`${product.homepage} answered ${res.status}, check it in a browser`);
  } catch (e) {
    return warn(`${product.homepage} did not answer: ${(e as Error).message}`);
  }
}
