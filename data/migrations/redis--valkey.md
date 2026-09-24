---
reviewed: 2026-09-24
majors:
  redis: 8
  valkey: 9
sources:
  - https://valkey.io/topics/migration/
---

## Compatibility

Valkey started as a fork of Redis OSS 7.2.4, and moving from Redis OSS 7.2 or any earlier open source version is, in the project's words, effectively an upgrade:

- Clients connect unchanged. Valkey speaks RESP2 and RESP3.
- RDB and AOF files from Redis OSS 7.2 load as they are.
- Existing configuration directives are accepted.
- `redis-cli` works against Valkey, and `valkey-cli` against Redis.
- Lua scripts using the `redis` namespace keep working, and modules written against the `RedisModule_` API load.

## Before you switch

The official guide offers three routes for a standalone server, and covers Redis Cluster too:

1. **Copy a snapshot.** Disconnect the clients, note the key count with `INFO KEYSPACE`, run `SAVE`, copy the RDB file into Valkey's data directory and start Valkey. Keep AOF off for that first start, or the RDB file is not imported. Compare the key count afterwards. This is the fastest route, at the cost of downtime.
2. **Replicate.** Start Valkey as a replica of Redis with `REPLICAOF`, wait until the link is up, then move the clients over. This keeps downtime short.
3. **Move specific keys** when you only need part of the data.

## Pitfalls

- **Redis Community Edition 7.4 and later write data files Valkey cannot read, and the official guide does not cover moving that data.** The latest Redis release in this catalog is 8.x, so check which version you actually run before you plan. Clients, configuration and scripts carry over either way; the data from a recent Redis needs another route.
- For compatibility, `INFO` reports `redis_version:7.2.4`. Tooling that needs the real server and version should read `server_name` and `valkey_version` instead.
