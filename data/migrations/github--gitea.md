---
reviewed: 2026-10-06
majors:
  gitea: 28
sources:
  - https://docs.gitea.com/usage/migration
  - https://docs.gitea.com/usage/repo-mirror
  - https://docs.gitea.com/usage/actions/quickstart
  - https://docs.gitea.com/usage/actions/comparison
  - https://docs.gitea.com/usage/actions/faq
---

## Compatibility

Gitea has a built-in migration form for GitHub repositories. Beyond the Git data, it can bring over items such as issues and pull requests, for which you have to enter at least your GitHub username. The migration page does not list everything the form imports.

Gitea Actions is designed to be compatible with GitHub Actions. Workflow files use the same syntax, `${{ github.xyz }}` expressions keep working (the docs recommend `gitea.xyz` but both behave the same today), and actions referenced without a host, like `actions/checkout@v4`, are downloaded from github.com by default.

## Before you switch

1. Migrate each repository from **Create... > New Migration**, choosing GitHub as the service and entering the repository URL and credentials.
2. To keep GitHub as the source for a while, tick **This repository will be a mirror**. Gitea then pulls periodically, and **Synchronize Now** in the repository settings forces a sync.
3. Set up CI. Gitea Actions needs Gitea 1.19 or later and is on by default since 1.21, but jobs only run on a Gitea Runner you register yourself with `./runner register --instance <instance> --token <token>`, at instance, organization or repository level.
4. Enable **Enable Repository Actions** in each repository's settings: repositories have Actions off by default.
5. Check your workflows against the differences below. The quickstart places workflow files in `.gitea/workflows/`.

## Pitfalls

- **The migration guide covers the repository, not the platform around it.** It says nothing about Actions secrets and variables, runners, or organization settings, so plan those separately.
- A pull mirror can only be set up when the repository is created. An existing repository cannot be turned into one later.
- A push mirror back to GitHub force-pushes and overwrites the remote, and Gitea has no SSH push mirrors.
- `jobs.<job_id>.environment` is ignored, and problem matchers and error annotations are dropped.
- The `permissions` scopes `statuses`, `checks`, `deployments`, `id-token`, `security-events` and `pages` are not supported.
- `GITEA_TOKEN` cannot publish to the repository's package registry, for example to push an OCI image. Use a personal access token.
- For `pull_request` events the ref is `refs/pull/<n>/head`, not GitHub's merge preview `refs/pull/<n>/merge`, so a job tests the branch head rather than the merge result.
- Gitea's FAQ lists the trigger events it supports. Check any other event your workflows rely on.
