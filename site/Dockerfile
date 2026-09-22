FROM node:24-slim AS build
RUN corepack enable
WORKDIR /repo
COPY generated/catalog.json generated/
COPY CONTRIBUTING.md ./
COPY data/categories.yaml data/
COPY scripts/lib/types.ts scripts/lib/
COPY site/package.json site/pnpm-lock.yaml site/pnpm-workspace.yaml site/
WORKDIR /repo/site
RUN pnpm install --frozen-lockfile
COPY site/ ./
ARG PUBLIC_API_URL=/api
RUN pnpm build

FROM nginxinc/nginx-unprivileged:1-alpine
COPY site/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /repo/site/dist /usr/share/nginx/html
EXPOSE 8080
