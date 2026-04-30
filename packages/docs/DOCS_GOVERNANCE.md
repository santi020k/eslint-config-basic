# Docs Governance

This policy defines how the current docs set and `v1` docs coexist.

## Scope

- Current docs live at:
  - `packages/docs/src/content/docs/guide`
  - `packages/docs/src/content/docs/frameworks`
  - `packages/docs/src/content/docs/tooling`
  - `packages/docs/src/content/docs/packages`
  - `packages/docs/src/content/docs/api`
- Legacy docs archive lives under:
  - `packages/docs/src/content/docs/v1`

## Ownership Model

- Current docs are the source of truth for product behavior and setup guidance.
- `v1` docs are a frozen archive for users pinned to v1.
- New product features and behavior updates go to current docs only.
- `v1` should not be edited during normal development.
- Emergency `v1` edits are allowed only for:
  - broken-link fixes,
  - critical security clarification notes,
  - explicit deprecation/migration pointers.

## Navigation and Cross-Linking

- Keep version switching in Starlight navigation so users can move between current docs and frozen `v1`.
- Add migration links from relevant `v1` pages to current `guide/migration-v1-to-v2`.
- Do not duplicate full feature guides across current and `v1` trees.

## CI and Build Expectations

- Any workflow that builds docs should run `docs:sync-readmes` before `docs:build`.
- Script commands should use `pnpm` consistently across root docs scripts.

## Contribution Checklist

- For current-doc changes, update `packages/docs/CHANGELOG.md` under `Unreleased`.
- If `v1` must be edited for emergency reasons, explain the reason in PR.
- Validate with:
  - `pnpm run docs:sync-readmes`
  - `pnpm run docs:build`
