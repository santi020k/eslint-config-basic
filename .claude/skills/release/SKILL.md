---
name: release
description: Prepare Changesets release branches and follow the GitHub publishing and recovery workflow for @santi020k/eslint-config-basic.
---

# Release preparation and recovery

Follow [AGENTS.md](../../../AGENTS.md), the
[release preparation and recovery guide](../../../.github/RELEASE_RECOVERY.md),
and the current [package scripts](../../../package.json). The guide owns the
detailed publishing, recovery, provenance, and post-release verification process.

## Local preparation

- Select the intended `release/v<stable-semver>` before branching. Inspect current
  refs and worktree ownership; reuse the intended active release or prepare a new
  one from up-to-date local `main`. Ask if the target version is ambiguous.
- Add a Changeset for each meaningful public-package change with
  `pnpm run changeset`. Public packages share a compatibility major but release
  minor and patch versions independently. Preserve `workspace:^` production
  references and valid dependency/peer ranges; coordinate affected packages for
  breaking family-wide changes.
- Review `pnpm exec changeset status` and run `pnpm run check:full-release`
  before consuming changesets. Include a Full patch whenever one of its direct
  dependencies is released so Full consumers receive the update.
- On the selected release branch, consume the reviewed version plan with
  `pnpm run version-packages`, refresh the lockfile with the declared pnpm version,
  and run `pnpm run docs:sync-readmes`. Regenerate other affected documentation or
  schemas with their existing scripts. Never hand-edit generated changelogs.
- The release branch version must equal Basic's prepared package version. Inspect
  and commit the focused implementation, versions, generated changelogs, lockfile,
  and any migration notes together under the repository's commit rules. Preserve
  unrelated work and report whether integration is local or remote.

## Validation and review

Use focused behavioral checks while implementing, and run the canonical lint and
type-check commands before handoff. Every ESLint warning and TypeScript diagnostic
requires resolution; direct ESLint commands must use `--max-warnings=0`. Do not
weaken checks or suppress diagnostics to obtain a passing gate.

Before the first release push or pull request, request a fresh independent review
of the complete diff against the release base, resolve every finding, and validate
the final revision with:

```bash
pnpm run release:check
pnpm audit --audit-level=high
```

Honor the configured Git hooks and required CI checks as well. Reuse passing
evidence only for the same revision and relevant environment. Include validation,
compatibility or migration notes, and a rollback or forward-recovery plan in the
release pull request. The recovery guide specifies the additional browser,
platform, consumer, and post-release checks.

## Publishing and recovery

Local preparation does not authorize external actions. Pushes, pull requests,
remote merges, publishing, and workflow dispatches require explicit user
authorization; use authorization already granted in the session without asking
again. Prepare the release pull request from `release/v<stable-semver>` into
`main`, and merge only after required checks and reviews pass.

The [Release workflow](../../../.github/workflows/release.yml) publishes from the
verified merged release commit and creates its package and umbrella release
records. Ordinary pushes do not publish. Published version tags are immutable;
never move or replace them or publish a later release manually from a workstation.

If automation fails, follow the recovery guide: rerun the failed workflow at its
original merged commit, or use the documented dispatch only when that commit is
still `main` HEAD. Use **Recover release records** for missing historical records
under its documented conditions. Do not fall back to local `pnpm run release` or
`changeset publish`. Verify published artifacts, provenance, tag commits, consumer
behavior, and live documentation before declaring success or retiring release
branches; remote cleanup also requires authorization.
