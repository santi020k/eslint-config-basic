# @santi020k/eslint-config-nest

## 2.0.0

### Minor Changes

- [#70](https://github.com/santi020k/eslint-config-basic/pull/70) [`ef658c1`](https://github.com/santi020k/eslint-config-basic/commit/ef658c170f6eaadce14a7e662eaa2a3762362e82) Thanks [@santi020k](https://github.com/santi020k)! - # 1.1.0 Release

  ## Update Highlights

  - **ESLint 10 Support**: Harmonized ESLint version to `^10.1.0` across the monorepo and playgrounds.
  - **Security Patches**: Fixed vulnerabilities in `lodash`, `esbuild`, and `path-to-regexp` via root overrides.
  - **Solid Playground Fix**: Resolved `MODULE_NOT_FOUND` error in the Solid playground linting process.

### Patch Changes

- Updated dependencies [[`ef658c1`](https://github.com/santi020k/eslint-config-basic/commit/ef658c170f6eaadce14a7e662eaa2a3762362e82)]:
  - @santi020k/eslint-config-core@2.0.0

## 1.0.0

### Patch Changes

- [#66](https://github.com/santi020k/eslint-config-basic/pull/66) [`6f2f473`](https://github.com/santi020k/eslint-config-basic/commit/6f2f4733642087eb9eac22a7b6193b71453f375d) Thanks [@santi020k](https://github.com/santi020k)! - v0.10.0 Release

  ## Major Changes

  - **Migration to pnpm**: Full migration of the monorepo from npm to pnpm workspaces (pnpm v10+). This includes better performance, stricter dependency management, and corepack integration.
  - **neostandard removal**: Removed `neostandard` dependency to provide more granular control and modularity in core rules.
  - **Stylistic v4 -> v5**: Upgraded to `@stylistic/eslint-plugin` version 5.x for improved formatting rules and TypeScript 5.7+ support.
  - **GraphQL Integration**: Added comprehensive support for GraphQL schemas and operations. This includes automated project detection for GraphQL files and specialized linting rules for both schema definitions and operation documents.
  - **React 19 Support**: Updated React detection logic and configurations to support React 19.

  ## Framework Updates

  - **Qwik & Remix Support**: Added comprehensive ESLint configurations and functional playground environments for both Qwik and Remix frameworks.
  - **Dependency Alignment**: Resolved critical `typescript-eslint` dependency issues in Astro, Svelte, and Vue packages to ensure proper rule resolution and type safety.
  - **Consistency Refinements**: Standardized `disable-type-checked` rule blocks across all framework-specific configurations.
  - **Documentation Overhaul**: Major documentation refresh in root `README.md` and VitePress documentation. Added clarity on configuration priority, framework auto-detection, and full-settings examples.

  ## Maintenance

  - **Corepack Enablement**: Added `corepack` support for automated package manager version management.
  - **Turbo Update**: Bumped Turborepo to v2.9+ for faster builds and improved task caching.
  - **Turbo Optimizations**: Configured Turborepo to output in `errors-only` mode with `errorsOnlyShowHash` enabled, significantly reducing terminal noise during build and lint tasks.
  - **Integration Test Improvements**: Enhanced integration tests to be more robust, including proper `tsconfigRootDir` handling and better React version validation.
  - **Playground Synchronization**: Updated all playground packages to maintain parity with the latest framework rules.

- [#55](https://github.com/santi020k/eslint-config-basic/pull/55) [`d8e4b4a`](https://github.com/santi020k/eslint-config-basic/commit/d8e4b4a61c2739dbffa3c823d8742ea234c5b731) Thanks [@santi020k](https://github.com/santi020k)! - feat: add standard ESLint configuration and resolve typecheck/hook failures

  This release introduces a new standard configuration in `@santi020k/eslint-config-core` and addresses several technical issues:

  - Fixed global typecheck failures across the monorepo.
  - Resolved pre-commit hook issues with cspell.
  - Fixed pre-push hook failures related to publint in the playground package.
  - Added missing test coverage scripts and fixed CI build failures.

- Updated dependencies [[`6f2f473`](https://github.com/santi020k/eslint-config-basic/commit/6f2f4733642087eb9eac22a7b6193b71453f375d), [`d8e4b4a`](https://github.com/santi020k/eslint-config-basic/commit/d8e4b4a61c2739dbffa3c823d8742ea234c5b731)]:
  - @santi020k/eslint-config-core@1.0.0

## 0.8.1

### Minor Changes

- 13e8e5a: # Release 0.8.0
  - **Snippet Fixes**: Resolved ESLint parsing errors in virtual TypeScript files within Markdown, Astro, and VitePress code blocks by disabling type-aware rules for those snippets.
  - **Standalone TS Support**: Restored `disableTypeChecked` configuration in the TypeScript package, ensuring it remains fully functional and parsing-error-free when used without the main composer.
  - **Documentation Reorganization**: Significantly expanded and restructured the documentation site, adding new pages for the Inspector, CLI Tooling, Extensions, and better framework-specific guides.
  - **Branding Update**: Updated the author link label from "Website" to "Author" across all documentation files for improved brand identity.
  - **Composition Improvements**: Refactored the configuration composer to be more robust when handling virtual snippets and framework contracts.

### Patch Changes

- CI & Workflow Stabilization

  - Fixed invalid `actions/setup-node` version from `@v6` to `@v4` in Release and Docs workflows.
  - Improved CLI test performance and reliability by refactoring integration tests into fast in-memory unit tests.
  - Enabled Turborepo caching in GitHub Actions to significantly reduce PR build times.

- Updated dependencies
- Updated dependencies [13e8e5a]
  - @santi020k/eslint-config-...@0.8.1

## 0.7.1

### Patch Changes

- Updated dependencies []:
  - @santi020k/eslint-config-core@0.7.1

## 0.2.2

### Patch Changes

- [#39](https://github.com/santi020k/eslint-config-basic/pull/39) [`1c11dec`](https://github.com/santi020k/eslint-config-basic/commit/1c11decd67a9874ff42f98a7ac455216313c952f) Thanks [@santi020k](https://github.com/santi020k)! - feat(astro): add robust defaults and virtual script support for Astro 5+
  feat(core): standardize internal dependencies to workspace:\* for better monorepo development
  docs: add Tailwind CSS v4 compatibility notes and workarounds to README
- Updated dependencies [[`1c11dec`](https://github.com/santi020k/eslint-config-basic/commit/1c11decd67a9874ff42f98a7ac455216313c952f)]:
  - @santi020k/eslint-config-core@0.4.2

## 0.2.1

### Patch Changes

- [#36](https://github.com/santi020k/eslint-config-basic/pull/36) [`85d6a5e`](https://github.com/santi020k/eslint-config-basic/commit/85d6a5e91f5322445eb874fa45693f8368ab4ca4) Thanks [@santi020k](https://github.com/santi020k)! - feat(astro): add robust defaults and virtual script support for Astro 5+
  feat(core): standardize internal dependencies to workspace:\* for better monorepo development
  docs: add Tailwind CSS v4 compatibility notes and workarounds to README
- Updated dependencies [[`85d6a5e`](https://github.com/santi020k/eslint-config-basic/commit/85d6a5e91f5322445eb874fa45693f8368ab4ca4)]:
  - @santi020k/eslint-config-core@0.4.1

## 0.2.0

### Minor Changes

- feat: add Nest.js, Vue, and Expo ESLint configs with optionals package
  - Added `@santi020k/eslint-config-nest` with NestJS-specific linting rules
  - Added `@santi020k/eslint-config-vue` with Vue 3 linting rules
  - Added `@santi020k/eslint-config-expo` with Expo/React Native linting rules
  - Added `@santi020k/eslint-config-optionals` for optional integrations (Tailwind, Vitest, cspell, i18next, MDX, Markdown, Stencil)
  - Added `ConfigOption.Nest`, `ConfigOption.Vue`, and `ConfigOption.Expo` enum values
  - Updated PR template with changeset reminder

### Patch Changes

- Updated dependencies
  - @santi020k/eslint-config-core@0.2.0

## 0.1.0

### Minor Changes

- publish testing

### Patch Changes

- Updated dependencies
  - @santi020k/eslint-config-core@0.1.0
