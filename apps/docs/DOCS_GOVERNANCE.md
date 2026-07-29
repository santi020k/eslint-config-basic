# Docs Governance

This policy defines how the current v3 docs and frozen v2/v1 archives coexist.

## Scope

- Current docs live at:
  - `apps/docs/src/content/docs/guide`
  - `apps/docs/src/content/docs/frameworks`
  - `apps/docs/src/content/docs/tooling`
  - `apps/docs/src/content/docs/packages`
  - `apps/docs/src/content/docs/api`
- Frozen docs archives live under:
  - `apps/docs/src/content/docs/v2`
  - `apps/docs/src/content/docs/v1`

## Ownership Model

- Current docs are the source of truth for product behavior and setup guidance.
- `v2` and `v1` docs are frozen archives for users pinned to those majors.
- New product features and behavior updates go to current docs only.
- Archived docs should not be edited during normal development.
- Emergency archive edits are allowed only for:
  - broken-link fixes,
  - critical security clarification notes,
  - explicit deprecation/migration pointers.

## Navigation and Cross-Linking

- Keep version switching in Starlight navigation so users can move between v3,
  v2, and v1.
- Point v2 users to `guide/migration-v2-to-v3`.
- Keep the historical v1-to-v2 guide, with a clear continuation link to the
  v2-to-v3 guide.
- Do not copy new feature guides into either archive.

## CI and Build Expectations

- API reference and changelog generation are part of `docs:build`.
- Script commands should use `pnpm` consistently across root docs scripts.

## Contribution Checklist

- Record publishable docs changes through Changesets; do not hand-edit generated
  changelog entries.
- If an archive must be edited for an emergency, explain the reason in the PR.
- Validate with:
  - `pnpm run docs:build`
  - an internal-link crawl of the built output
