---
name: release-process
description: How to release new versions and manage changesets for @santi020k/eslint-config-basic.
---

# Release Process & Changesets

This project uses [Changesets](https://github.com/changesets/changesets) for managing versioning, generating changelogs, and publishing to npm.

## 1. Creating a Changeset

When you add a feature, fix a bug, or make changes that should be reflected in the changelog, you must generate a new changeset.

Run the interactive CLI:

```bash
pnpm run changeset
```

Follow the prompts:

1. Select the packages that have changed by using the Spacebar.
2. Select the bump type for each selected package:
   - `patch`: Bug fixes
   - `minor`: New features (backward compatible)
   - `major`: Breaking changes
3. Provide a summary of the change.
4. Confirm to write the changeset file to the `.changeset/` directory.

You must commit the generated markdown file in `.changeset/` along with your code changes.

## 2. CI/CD Integration

Changesets are automatically managed by continuous integration via GitHub Actions.

1. When changes are pushed to `main` with a new changeset, a "Version Packages" PR is triggered automatically.
2. Reviewing and merging the "Version Packages" PR bumps the version in `package.json` for affected packages and updates `CHANGELOG.md`.
3. After the merge, the new version is published to npm automatically.

## 3. Manual Release Process (Admin Only)

If automated actions fail or you need to test publishing locally, ensure you have ran validations:

```bash
pnpm run build && pnpm run lint && pnpm run test
```

To bump versions:

```bash
pnpm run version-packages
```

To publish (Assuming you are logged into npm via `npm login`):

```bash
pnpm run release
```
