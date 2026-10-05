---
reviewed: 2026-10-06
majors:
  terraform: 1
  pulumi: 3
sources:
  - https://www.pulumi.com/docs/iac/adopting-pulumi/migrating-to-pulumi/from-terraform/
---

## Compatibility

Pulumi's guide offers routes that keep your HCL as well as routes that convert it:

- **Pulumi Cloud as the state backend.** Pulumi Cloud implements the Terraform remote backend API, so you add a standard `backend "remote"` block and keep running the Terraform or OpenTofu CLI.
- **Pulumi HCL.** A `Pulumi.yaml` with `runtime: hcl` runs your existing `.tf` files on the Pulumi engine.
- **Terraform modules in a Pulumi program.** `pulumi package add hcl module <source> [<version>]` generates a local SDK for a registry or local module.
- **Referencing Terraform state.** `terraform.state.getLocalReference` and `getRemoteReference` read outputs from a `.tfstate` file or a remote backend, so new Pulumi stacks can build on resources Terraform still manages.

## Before you switch

To convert the code yourself:

1. Run `pulumi convert --from terraform --language <typescript|python|go|csharp>` in the folder holding the HCL. Variables, outputs, resources, data sources and modules (as Pulumi components) are supported, along with almost all HCL2 expressions.
2. Import the existing resources with `pulumi import --from terraform ./terraform.tfstate`. Imported resources are marked protected. If you stay on `runtime: hcl`, use `pulumi import --from hcl terraform.tfstate` from the project directory instead.
3. Run `pulumi preview` and expect no changes before the first `pulumi up`.

The guide also describes a state-first route with the `pulumi-terraform-migrate` plugin (`pulumi plugin run terraform-migrate -- stack --from ... --to ... --out ... --plugins ...`), which writes a Pulumi state file and a list of required plugins, followed by `pulumi stack import`. It has to be repeated for each Terraform stack. Pulumi's recommended route is Neo, its hosted agent, which needs Pulumi Neo access, the Pulumi GitHub app and cloud credentials in Pulumi ESC.

## Pitfalls

- **Pulumi does not reuse a Terraform state file in place.** State lives in whichever backend `pulumi login` points at, so resources have to be imported even when the code stays in HCL.
- `pulumi convert` succeeds even on features it cannot handle, and leaves `notImplemented` calls to fill in by hand. Pulumi puts the share of code converted without such TODOs at 90 to 95% for most projects.
- `pulumi import --from hcl` skips resources nested inside modules, with a warning. Import those separately.
- Paths relative to the Terraform project usually need rewriting relative to the generated program file.
- `pulumi-terraform-migrate` needs the OpenTofu CLI (`tofu`) on your `PATH`, and its intermediate state needs one `pulumi up` to complete.
- Neo may not handle modules with complex dynamic blocks, custom providers or unusual state. Those need the manual routes.
