---
name: release
description: How to release new versions and manage changesets for @santi020k/eslint-config-basic.
---

# Release Process & Changesets

This project uses [Changesets](https://github.com/changesets/changesets) for versioning, changelogs, and npm publishing.

Public packages share a compatibility major and release minor and patch versions independently. Add only packages with meaningful changes to each changeset. Coordinate a major bump across packages affected by a breaking family-wide contract, and keep internal dependency and peer ranges accurate so mixed minor and patch versions remain installable.

**Never edit `packages/*/CHANGELOG.md` by hand.** Always use `pnpm run changeset`; CI rewrites those files from Changesets data on merge.

## 1. Pre-Release Validation

Run the full pipeline before creating a changeset. Stop on first failure.

```bash
# Option A: all-in-one (install + build + test + lint + typecheck)
pnpm run ok

# Option B: step by step
pnpm run build        # tsup — all packages
pnpm run typecheck    # TypeScript check (100 packages including playgrounds)
pnpm run test         # Vitest suite
pnpm run lint         # ESLint + CSpell + Knip
pnpm -w run release:check  # Full pre-release gate
```

For a detailed failure report and diagnosis, use the `release-validator` subagent.

**Known-acceptable lint warnings (~74):** `complexity` in `packages/basic/src/index.ts` and `packages/lite/src/index.ts`, `no-console` in `scripts/`. These are expected — any warnings beyond these categories need investigation.

## 2. Creating a Changeset

```bash
pnpm run changeset
```

Prompts:
1. Select changed packages (Spacebar to toggle)
2. Select bump type per package:
   - `patch` — bug fixes
   - `minor` — new features (backward compatible)
   - `major` — breaking changes (enum removal, public API change)
3. Write a summary
4. Commit the generated `.changeset/*.md` file with your code changes

**What triggers a major bump:**
- Removing or renaming an enum value (consumers reference these by string)
- Removing a public factory function or re-export from `packages/basic/src/index.ts`
- Changing `EslintConfigOptions` in a breaking way

## 3. CI/CD Flow

1. Push to `main` with a `.changeset/*.md` file → CI opens a "Version Packages" PR
2. Merge the PR → `package.json` versions bump, `CHANGELOG.md` files are rewritten from Changesets data
3. After merge → packages automatically publish to npm

## 4. Manual Release (Admin Only)

If automation fails:

```bash
# Bump versions locally
pnpm run version-packages

# Publish (must be logged into npm)
pnpm run release
```

## 5. Documentation Sync

After a release, ensure docs are in sync:

```bash
pnpm run docs:sync-readmes     # Regenerate package READMEs
pnpm run docs:sync-changelog   # Sync changelog to docs site
pnpm run docs:build            # Build the Astro Starlight docs
```
