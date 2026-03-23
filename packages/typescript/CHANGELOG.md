# @santi020k/eslint-config-typescript

## 0.9.0

- Coordinated release stabilization and version jump.

## 0.8.1

### Minor Changes

- 13e8e5a: # Release 0.8.0

  - **Snippet Fixes**: Resolved ESLint parsing errors in virtual TypeScript files within Markdown, Astro, and VitePress code blocks by disabling type-aware rules for those snippets.
  - **Standalone TS Support**: Restored `disableTypeChecked` configuration in the TypeScript package, ensuring it remains fully functional and parsing-error-free when used without the main composer.
  - **Documentation Reorganization**: Significantly expanded and restructured the documentation site, adding new pages for the Inspector, CLI Tooling, Extensions, and better framework-specific guides.
  - **Branding Update**: Updated the author link label from "Website" to "Author" across all documentation files for improved brand identity.
  - **Composition Improvements**: Refactored the configuration composer to be more robust when handling virtual snippets and framework contracts.

### Patch Changes

- # CI & Workflow Stabilization

  - Fixed invalid `actions/setup-node` version from `@v6` to `@v4` in Release and Docs workflows.
  - Improved CLI test performance and reliability by refactoring integration tests into fast in-memory unit tests.
  - Enabled Turborepo caching in GitHub Actions to significantly reduce PR build times.

## 0.7.1

### Patch Changes

- Updated dependencies []:
  - @santi020k/eslint-config-core@0.7.1

## 0.1.2

### Patch Changes

- [#39](https://github.com/santi020k/eslint-config-basic/pull/39) [`1c11dec`](https://github.com/santi020k/eslint-config-basic/commit/1c11decd67a9874ff42f98a7ac455216313c952f) Thanks [@santi020k](https://github.com/santi020k)! - feat(astro): add robust defaults and virtual script support for Astro 5+
  feat(core): standardize internal dependencies to workspace:\* for better monorepo development
  docs: add Tailwind CSS v4 compatibility notes and workarounds to README
- Updated dependencies [[`1c11dec`](https://github.com/santi020k/eslint-config-basic/commit/1c11decd67a9874ff42f98a7ac455216313c952f)]:
  - @santi020k/eslint-config-core@0.4.2

## 0.1.1

### Patch Changes

- [#36](https://github.com/santi020k/eslint-config-basic/pull/36) [`85d6a5e`](https://github.com/santi020k/eslint-config-basic/commit/85d6a5e91f5322445eb874fa45693f8368ab4ca4) Thanks [@santi020k](https://github.com/santi020k)! - feat(astro): add robust defaults and virtual script support for Astro 5+
  feat(core): standardize internal dependencies to workspace:\* for better monorepo development
  docs: add Tailwind CSS v4 compatibility notes and workarounds to README
- Updated dependencies [[`85d6a5e`](https://github.com/santi020k/eslint-config-basic/commit/85d6a5e91f5322445eb874fa45693f8368ab4ca4)]:
  - @santi020k/eslint-config-core@0.4.1

## 0.1.0

### Minor Changes

- publish testing

### Patch Changes

- Updated dependencies
  - @santi020k/eslint-config-core@0.1.0

## 0.0.1

### Patch Changes

- Added TS2742 error fixes and Changesets publish setup
