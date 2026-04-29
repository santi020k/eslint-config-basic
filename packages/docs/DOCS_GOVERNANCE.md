# Docs Governance

This policy defines how the current docs set and `v1` docs coexist.

## Scope

- Current docs live at:
  - `packages/docs/guide`
  - `packages/docs/frameworks`
  - `packages/docs/tooling`
  - `packages/docs/packages`
  - `packages/docs/api`
- Legacy docs archive lives under:
  - `packages/docs/v1`

## Ownership Model

- Current docs are the source of truth for product behavior and setup guidance.
- `v1` docs are maintained as an archive for users pinned to v1.
- New product features and behavior updates go to current docs only.
- `v1` receives only:
  - broken-link fixes,
  - critical security clarification notes,
  - explicit deprecation/migration pointers.

## Navigation and Cross-Linking

- Keep `v1` navigation in VitePress config to preserve stable legacy URLs.
- Add migration links from relevant `v1` pages to current `guide/migration-v1-to-v2`.
- Do not duplicate full feature guides across current and `v1` trees.

## CI and Build Expectations

- Any workflow that builds docs should run `docs:sync-readmes` before `docs:build`.
- Script commands should use `pnpm` consistently across root docs scripts.

## Contribution Checklist

- For current-doc changes, update `packages/docs/CHANGELOG.md` under `Unreleased`.
- When touching both current and `v1`, explain in PR why `v1` edit is necessary.
- Validate with:
  - `pnpm run docs:sync-readmes`
  - `pnpm run docs:build`
