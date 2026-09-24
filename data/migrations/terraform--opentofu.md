---
reviewed: 2026-09-24
majors:
  terraform: 1
  opentofu: 1
sources:
  - https://opentofu.org/docs/intro/migration/migration-guide/
  - https://opentofu.org/docs/intro/migration/multiple-configurations/
---

## Compatibility

OpenTofu aims to stay compatible with Terraform configurations, and the project says most code runs without changes. Your `.tf` files, modules and state are used as they are: `tofu init` downloads providers from the OpenTofu registry and initialises the same backend, then `tofu plan` reads the existing state.

"Most" is the operative word. The only proof that your configuration is one of them is a plan that shows no changes.

## Before you switch

1. Back up the state. For local state, copy `terraform.tfstate` and its backup file. For remote state, use your backend's own mechanism, such as bucket versioning or a snapshot.
2. Commit the configuration, ideally on a branch made for the migration.
3. Install OpenTofu and check it with `tofu --version`.
4. In the project directory, run `tofu init`, then `tofu plan`. You want "No changes", or exactly the plan Terraform would print.
5. If the plan shows anything you did not expect, do not apply it. Find out why first.
6. Run `tofu apply` once even with no changes, so OpenTofu can update the state format if it needs to.
7. Make a small, harmless change, such as a tag, and plan and apply it to confirm OpenTofu manages the infrastructure.

## Pitfalls

- Configurations that feed each other through the `terraform_remote_state` data source need more care. OpenTofu documents that case on a separate page, linked from the guide; read it before migrating them.
- Going back is possible: restore the state backup if anything was written, then run `terraform init` and `terraform plan` and check the plan is clean.
