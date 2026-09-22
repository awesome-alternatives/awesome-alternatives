# Site

Static Astro build. Pages are prerendered from `../generated/catalog.json` and
`../data/categories.yaml`; the search box is a React island that calls the [API](../api). `/feed.xml` is an RSS feed of
the 50 most recently added tools, ordered by the `addedAt` the refresh keeps in the catalog.

`/compare/<a>-vs-<b>/` puts two tools side by side. A pair gets a page when the two sit on a
`replaces` edge or share a target, and when at least one of those relations carries a note;
archived repositories are left out. The slug pair is alphabetical, so a pair has one URL and
`/compare/<b>-vs-<a>/` is not a second copy of it: it answers 301 to the canonical spelling,
keeping the locale prefix. `pnpm build` writes the reversed spellings to
`generated/compare-pairs.conf`, an nginx `map` the image drops in `conf.d`, and `nginx.conf` looks
the pair segment up in it. Only a pair that has a page is in the table, so an unknown one still
answers 404, and no canonical URL is a key, so a redirect never chains. The redirect belongs to
nginx; `pnpm dev` and `pnpm preview` serve the reversed URLs as 404.

```bash
pnpm install
pnpm dev
```

`PUBLIC_API_URL` sets the API the search calls, `/api` by default: the search calls the API on
the site's own origin, where the reverse proxy strips the prefix. It is read at build time.

`pnpm dev` proxies `/api` to the live site. Point `API_PROXY_TARGET` at another origin to use a
different instance, for example one that serves the API under `/api` locally.

The image is built from the repository root, because the build reads the catalog:

```bash
docker build -f site/Dockerfile -t awesome-alternatives-site .
docker run -p 8080:8080 awesome-alternatives-site
```

nginx serves it on port 8080, with `/healthz` for probes. A page URL without its trailing slash
answers 301 to the slashed one, so every page lives at a single URL.

`pnpm build` also writes `sitemap-index.xml` and fails when the sitemap misses a tool, a target or a
comparison from `generated/catalog.json`.

The Content-Security-Policy is split in two. Astro writes most of it as a `<meta>` tag on every
page (`security.csp` in `astro.config.mjs`, directives in `src/lib/csp.ts`), because only the
build knows the hashes of the inline scripts and styles it emits for islands. `connect-src`
follows `PUBLIC_API_URL`. What a `<meta>` policy cannot carry, `frame-ancestors`, is sent by
nginx along with the other security headers in `security-headers.conf`.
