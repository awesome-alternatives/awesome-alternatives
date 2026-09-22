# Site

Static Astro build. Pages are prerendered from `../generated/catalog.json` and
`../data/categories.yaml`; the search box is a React island that calls the [API](../api).

```bash
pnpm install
pnpm dev
```

`PUBLIC_API_URL` sets the API the search calls, `https://api.awesome-alternatives.com` by default.
It is read at build time.

The image is built from the repository root, because the build reads the catalog:

```bash
docker build -f site/Dockerfile -t awesome-alternatives-site .
docker run -p 8080:8080 awesome-alternatives-site
```

nginx serves it on port 8080, with `/healthz` for probes.
