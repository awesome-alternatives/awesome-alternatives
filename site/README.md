# Site

Static Astro build. Pages are prerendered from `../generated/catalog.json` and
`../data/categories.yaml`; the search box is a React island that calls the [API](../api). `/feed.xml` is an RSS feed of
the 50 most recently added tools, ordered by the `addedAt` the refresh keeps in the catalog.

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

`pnpm build` also writes `sitemap-index.xml` and fails when the sitemap misses a tool or a target
from `generated/catalog.json`.
