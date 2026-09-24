---
reviewed: 2026-09-24
majors:
  vault: 2
  openbao: 2
sources:
  - https://openbao.org/docs/guides/migration/
---

## Compatibility

OpenBao's guide describes an in-place swap: the OpenBao server replaces the Vault process on every node, and endpoints and URLs stay the same. The API aims to be compatible enough that existing clients do not notice, although some may need a restart. The server configuration is largely compatible.

## Before you switch

The guide was tested with Vault Community Edition 1.14.1 on Raft storage with Shamir unseal, moving to OpenBao 2.2.0.

1. Take a backup: a Raft snapshot, or an atomic filesystem snapshot.
2. List what you have mounted with `vault secrets list` and `vault auth list`.
3. Install and configure OpenBao on each node without starting it. A separate storage path is recommended, since nodes pull their data from the cluster when they join, and it makes a rollback easier.
4. Remove `disable_mlock` from the configuration: OpenBao has not used mlock since 2.0.0.
5. Replace the followers one at a time. Stop Vault, start OpenBao, join the node with `bao operator raft join`, unseal it, and wait until it is a voter.
6. Make the leader step down, check that a new leader was elected, then replace the former leader the same way.

## Pitfalls

- **Only Vault 1.14.1 was tested.** Newer versions are untested, and OpenBao makes no promise about storage compatibility with them. The latest Vault release in this catalog is 2.x. Vault Enterprise was not tested at all.
- OpenBao ships far fewer plugins. A mount backed by a plugin it lacks is skipped at startup: it still appears in `bao secrets list`, but reading it returns nothing. Vault 2.0 and later mount `agent-registry/` by default, so a recent Vault leaves at least one such mount.
- Newly issued tokens use OpenBao's shorter format rather than Vault's `hvs.` prefix. Old tokens are honoured until they expire, but consumers that parse token formats may break.
- If you use the file audit backend, OpenBao must be able to write to the existing log file once Vault is stopped.
- A Vault first set up before 1.3 may need a rekey, because the old Shamir implementation was removed.
