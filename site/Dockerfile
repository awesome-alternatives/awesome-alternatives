FROM node:24-slim@sha256:0e0ff40c39bc087845bfb27465a0df4ea419520094bc35842ff83dd8cbe6f9b6 AS build
RUN corepack enable
WORKDIR /repo
COPY generated/catalog.json generated/events.json generated/
COPY CONTRIBUTING.md ./
COPY data/categories.yaml data/
COPY scripts/lib/types.ts scripts/lib/rules.ts scripts/lib/trending.ts scripts/lib/
COPY .github/workflows/refresh.yml .github/workflows/
COPY site/package.json site/pnpm-lock.yaml site/pnpm-workspace.yaml site/
WORKDIR /repo/site
RUN pnpm install --frozen-lockfile
COPY site/ ./
ARG PUBLIC_API_URL=/api
RUN pnpm build \
 && find dist -type f \( -name '*.html' -o -name '*.css' -o -name '*.js' -o -name '*.svg' \
      -o -name '*.json' -o -name '*.xml' -o -name '*.txt' -o -name '*.md' \
      -o -name '*.webmanifest' \) \
      -exec gzip -9 -k {} +

FROM nginxinc/nginx-unprivileged:1-alpine@sha256:6a23acdfca2b9cfbcec61419e3f1426bcbedb91362f2f19306a8567423bb4612
COPY site/nginx.conf /etc/nginx/conf.d/default.conf
COPY site/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /repo/site/generated/compare-pairs.conf /etc/nginx/conf.d/compare-pairs.conf
COPY --from=build /repo/site/dist /usr/share/nginx/html
RUN nginx -t
EXPOSE 8080
