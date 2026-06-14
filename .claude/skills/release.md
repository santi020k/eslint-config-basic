---
name: release
description: How to release new versions and manage changesets for @santi020k/eslint-config-basic.
---

# Release Process & Changesets

This project uses [Changesets](https://github.com/changesets/changesets) for versioning, changelogs, and npm publishing.

**Never edit `packages/*/CHANGELOG.md` by hand.** Always use `pnpm run changeset`; CI rewrites those files from Changesets data on merge.

## 1. Pre-Release Validation

Run the full pipeline before creating a changeset:

```bash
pnpm run build && pnpm run lint && pnpm run test
```

All three must pass. For a detailed failure report, use the `release-validator` subagent.

## 2. Creating a Changeset

```bash
pnpm run changeset
```

Follow the prompts:
1. Select changed packages (Spacebar to toggle)
2. Select bump type per package:
   - `patch` — bug fixes
   - `minor` — new features (backward compatible)
   - `major` — breaking changes
3. Write a summary
4. Confirm — writes a file to `.changeset/`

Commit the generated `.changeset/*.md` file with your code changes.

## 3. CI/CD Flow

1. Push to `main` with a new changeset → CI triggers a "Version Packages" PR
2. Merge the PR → versions bump in `package.json`, `CHANGELOG.md` files are updated
3. After merge → packages publish to npm automatically

## 4. Manual Release (Admin Only)

If automation fails:

```bash
# Bump versions
pnpm run version-packages

# Publish (must be logged into npm)
pnpm run release
```
