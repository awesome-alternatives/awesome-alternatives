const WEB = /^https?:\/\//i;

export function webHref(url: string | null | undefined): string | null {
  return url && WEB.test(url) ? url : null;
}
