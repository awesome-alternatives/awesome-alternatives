---
reviewed: 2026-10-06
majors:
  podman-desktop: 1
sources:
  - https://podman-desktop.io/docs/migrating-from-docker
  - https://podman-desktop.io/docs/migrating-from-docker/importing-saved-containers
  - https://podman-desktop.io/docs/migrating-from-docker/customizing-docker-compatibility
  - https://podman-desktop.io/docs/migrating-from-docker/managing-docker-compatibility
  - https://podman-desktop.io/docs/migrating-from-docker/using-the-docker_host-environment-variable
---

## Compatibility

Podman Desktop's Docker compatibility feature lets the Docker CLI and tools that talk to the Docker socket, such as Testcontainers, Maven or Gradle, run against a Podman engine. Compose v2 applications run through the Compose extension, so `docker compose up` works on Podman.

How the socket is wired depends on the platform:

- **macOS**: the `podman-mac-helper` utility links `/var/run/docker.sock` to the Podman machine's socket. The Third-Party Docker Tool Compatibility setting that does this is on by default.
- **Windows**: Podman also listens on the default `docker_engine` named pipe.
- **Linux**: point tools at Podman with the `DOCKER_HOST` variable.

## Before you switch

1. Start a Podman machine.
2. Turn on **Settings > Preferences > Docker Compatibility**. A Docker Compatibility page then appears under Settings.
3. On that page, check the system socket status, pick the Docker CLI context, and use **Setup...** next to Podman Compose CLI Support if Compose is not installed.
4. Check that `docker info --format=json | jq -r .ServerVersion` returns the Podman version.
5. Bring over containers you want to keep: export each one with `docker export <container> -o <archive>.tar`, then run `podman import <archive>.tar`.
6. Where tools do not find the socket, set `DOCKER_HOST`: `unix://` plus the output of `podman machine inspect --format '{{.ConnectionInfo.PodmanSocket.Path}}'` on macOS, or of `podman info --format '{{.Host.RemoteSocket.Path}}'` on Linux, and `npipe://` plus the PodmanPipe path on Windows. A `docker context create podman --docker "host=..."` context works too.

## Pitfalls

- **An imported container comes back as an image, not a running container.** `podman import` lists it under Images, and you start a new container from it. The guide does not cover volumes, networks or Docker Desktop's Kubernetes cluster.
- The Third-Party Docker Tool Compatibility setting exists only on macOS. Re-enabling it asks for your machine password and a restart of the Podman machine.
- On Windows, `podman compose` can fail with `Error: socket of machine is not set` until `DOCKER_HOST` is set.
- The guide asks you to keep your Compose file in a working directory such as your home directory.
