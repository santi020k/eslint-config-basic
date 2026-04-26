# @santi020k/eslint-config-core

## 1.5.0

### Minor Changes

- [#82](https://github.com/santi020k/eslint-config-basic/pull/82) [`af844f6`](https://github.com/santi020k/eslint-config-basic/commit/af844f663f8403d679467e0dd2a7251e8f3d4bcd) Thanks [@santi020k](https://github.com/santi020k)! - - Add first-class Hono support with Worker runtime globals, package detection, and a playground for Cloudflare Workers-style projects.
  - Lower the Node.js engine requirement to `>=22.18.0` in `package.json` and `.nvmrc`, and validate CI against Node.js 22.
  - Update `README.md` with a landing pointer to the canonical docs site.

## 1.4.0

### Minor Changes

- [#80](https://github.com/santi020k/eslint-config-basic/pull/80) [`7bccef0`](https://github.com/santi020k/eslint-config-basic/commit/7bccef0876e4ffde0c7395b5b20917225a067592) Thanks [@santi020k](https://github.com/santi020k)! - # v1.4.0 — API improvements, new optional, and quality-of-life fixes

  ## Breaking changes

  **Unified Node.js requirement to >=24.0.0.**
  All packages in the monorepo now strictly require Node.js 24.0.0 or higher. This ensures compatibility with modern dependency versions (such as `cspell` v10) and aligns with the project's long-term maintenance strategy.

  **`detectProjectOptions()` no longer sets boolean flags on `frameworks`.**
  Previously, auto-detection would set `frameworks.react = true`, `frameworks.next = true`, etc. Passing those values to `eslintConfig()` would throw a `TypeError` because framework configs must be real imports, not booleans.

  Detected frameworks are now reported via a new `detectedFrameworks: DetectedFrameworkName[]` field. The `frameworks` object in the detection result stays empty, so spreading `detectProjectOptions()` into `eslintConfig()` is always safe.

  ```ts
  // Before (would throw)
  const opts = detectProjectOptions();

  eslintConfig(opts); // ❌

  // opts.frameworks.next === true → TypeError inside eslintConfig()

  // After (safe)
  const opts = detectProjectOptions();

  // opts.detectedFrameworks → ['next', 'react']  (informational)
  // opts.frameworks → {}                          (safe to spread)
  eslintConfig(opts); // ✅
  ```

  ## New features

  **`Extension.BestPractices` optional config** — adds four quality rules with no extra dependencies:
  - `no-console` (warn) — catches leftover debug output
  - `no-alert` (error) — disallows browser `alert` / `confirm` / `prompt`
  - `complexity` (warn, max 10) — flags overly complex functions
  - `max-depth` (warn, max 4) — flags deeply nested blocks

  ```ts
  eslintConfig({ extensions: [Extension.BestPractices] });
  ```

  **Category barrel exports for `@santi020k/eslint-config-optionals`** — five new sub-path exports let you import a whole category at once:

  ```ts
  // also: /extensions  /tools  /libraries
  ```

  **`NextMode` auto-detection** — `detectProjectOptions()` now detects App Router vs Pages Router by checking for an `app/` or `src/app/` directory, so `options.nextMode` is set automatically.

  **`DetectedFrameworkName` type** — new exported union type listing all framework names that `detectProjectOptions()` can detect. Useful for display logic or tooling built on top of detection.

  ## Improvements

  **Early `tsconfigRootDir` validation** — `createTypescriptConfig()` now throws a clear, actionable error at config-creation time if the provided `tsconfigRootDir` path does not exist on disk, instead of failing silently at ESLint runtime.

  **CI node version matrix** — the build pipeline now runs against Node 24.x to ensure stability across the updated engine requirements.

  **`docs/PHILOSOPHY.md`** — new document explaining the major design decisions: why hard deps, flat config only, lazy framework loading, rule severity philosophy, and how to extend or override rules.

  **Changelog synchronization** — new `sync-docs-changelog.mjs` script to automatically propagate root changelog updates to the documentation site.

  ## Bug Fixes
  - **CLI Scaffolding**: Resolved bug where auto-detected frameworks were not correctly included in the generated configuration.
  - **Rule Set Update**: Updated React and Expo collections to reflect rule removals in `eslint-plugin-react-hooks@7` recommended configuration.
  - **Tailwind CSS Performance**: Fixed `Atomics.wait()` timeout errors in monorepos by providing customizable settings in the recommended Tailwind configuration.

  ## Dependency Updates
  - **External Plugins**:
    - Updated `@cspell/eslint-plugin` to `v10.0.0` (Major).
    - Updated `typescript-eslint` to `v8.59.0`.
    - Updated `eslint-plugin-react-hooks` to `v7.1.1`.
    - Updated `eslint-plugin-perfectionist` to `v5.9.0`.
    - Updated `eslint-plugin-sonarjs` to `v4.0.3`.
    - Updated `tailwindcss` to `v4.2.4`.
  - **Core Tooling**:
    - Updated `eslint` to `v10.2.1`.
    - Updated `vitest` and `@vitest/coverage-v8` to `v4.1.5`.
    - Internal alignment of `typescript` version to `v5.9.3`.

## 1.3.0

### Minor Changes

- [#77](https://github.com/santi020k/eslint-config-basic/pull/77) [`450fa19`](https://github.com/santi020k/eslint-config-basic/commit/450fa1996aa651671513a32bd5d8736e5336be73) Thanks [@santi020k](https://github.com/santi020k)! - Refresh package metadata and supporting docs for the `santi020k.com` domain migration.
  - Update documentation, canonical URLs, and package links from `santi020k.me` to `santi020k.com`.
  - Sync npm package metadata so published packages point to the correct license, repository, issues page, and documentation URLs.
  - Refresh low-risk ESLint ecosystem and release tooling dependencies.

## 1.2.0

### Minor Changes

- [#74](https://github.com/santi020k/eslint-config-basic/pull/74) [`c63e902`](https://github.com/santi020k/eslint-config-basic/commit/c63e902ab0107b9d2231a84715f2d220ea283489) Thanks [@santi020k](https://github.com/santi020k)! - # v1.2.0 Release - Documentation Overhaul

  This release focuses on a comprehensive update of the documentation site and branding refresh.

  ## Highlights
  - **VitePress Refresh**: Major updates to the documentation structure, including new guides and improved navigation.
  - **Branding Assets**: Added new official logos, icons, and social preview images (opengraph) in `packages/docs/public`.
  - **Theme Enhancements**: Custom styling and component improvements for a more premium documentation experience.
  - **Improved Installation Guide**: Updated steps for getting started with the latest features.

## 1.1.0

### Minor Changes

- [#70](https://github.com/santi020k/eslint-config-basic/pull/70) [`ef658c1`](https://github.com/santi020k/eslint-config-basic/commit/ef658c170f6eaadce14a7e662eaa2a3762362e82) Thanks [@santi020k](https://github.com/santi020k)! - # 1.1.0 Release

  ## Update Highlights
  - **ESLint 10 Support**: Harmonized ESLint version to `^10.1.0` across the monorepo and playgrounds.
  - **Security Patches**: Fixed vulnerabilities in `lodash`, `esbuild`, and `path-to-regexp` via root overrides.
  - **Solid Playground Fix**: Resolved `MODULE_NOT_FOUND` error in the Solid playground linting process.

## 1.0.0

### Minor Changes

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

## 0.7.1

## 0.5.0

### Minor Changes

- [#41](https://github.com/santi020k/eslint-config-basic/pull/41) [`d802dfb`](https://github.com/santi020k/eslint-config-basic/commit/d802dfb2cb2f0813d91170771b3b21b3cf3b5e10) Thanks [@santi020k](https://github.com/santi020k)! - Add Playwright support as an optional configuration.

## 0.4.2

### Patch Changes

- [#39](https://github.com/santi020k/eslint-config-basic/pull/39) [`1c11dec`](https://github.com/santi020k/eslint-config-basic/commit/1c11decd67a9874ff42f98a7ac455216313c952f) Thanks [@santi020k](https://github.com/santi020k)! - feat(astro): add robust defaults and virtual script support for Astro 5+
  feat(core): standardize internal dependencies to workspace:\* for better monorepo development
  docs: add Tailwind CSS v4 compatibility notes and workarounds to README

## 0.4.1

### Patch Changes

- [#36](https://github.com/santi020k/eslint-config-basic/pull/36) [`85d6a5e`](https://github.com/santi020k/eslint-config-basic/commit/85d6a5e91f5322445eb874fa45693f8368ab4ca4) Thanks [@santi020k](https://github.com/santi020k)! - feat(astro): add robust defaults and virtual script support for Astro 5+
  feat(core): standardize internal dependencies to workspace:\* for better monorepo development
  docs: add Tailwind CSS v4 compatibility notes and workarounds to README

## 0.4.0

### Minor Changes

- [#34](https://github.com/santi020k/eslint-config-basic/pull/34) [`f015876`](https://github.com/santi020k/eslint-config-basic/commit/f015876442b88b395cd3775b06f829349dd34d3a) Thanks [@santi020k](https://github.com/santi020k)! - feat: add eslint-plugin-sonarjs as optional config
  chore: remove tailwindcss from playground and test package dependencies
  docs: update AI Agent skills in README

## 0.3.0

### Minor Changes

- [#28](https://github.com/santi020k/eslint-config-basic/pull/28) [`162afdb`](https://github.com/santi020k/eslint-config-basic/commit/162afdb2f0a30714487915bdf083234426018ad2) Thanks [@santi020k](https://github.com/santi020k)! - feat: add `regexp` optional config with `eslint-plugin-regexp`
  - New `OptionalOption.Regexp` to enable regex linting via `eslint-plugin-regexp`
  - Catches common regex mistakes: exponential backtracking, unnecessary escapes, and optimizable character classes
  - Uses recommended rules with selective overrides for smoother adoption

### Patch Changes

- [#25](https://github.com/santi020k/eslint-config-basic/pull/25) [`1fb4693`](https://github.com/santi020k/eslint-config-basic/commit/1fb4693b4ff6e3a1a9404096e14039121e1297b5) Thanks [@santi020k](https://github.com/santi020k)! - feat: add GitHub-linked changelogs and automatic GitHub releases with tags
  - Switched changelog generator to `@changesets/changelog-github` for richer changelogs with PR links, commit references, and contributor credits
  - Configured release workflow to create GitHub releases with git tags on publish

## 0.2.0

### Minor Changes

- feat: add Nest.js, Vue, and Expo ESLint configs with optionals package
  - Added `@santi020k/eslint-config-nest` with NestJS-specific linting rules
  - Added `@santi020k/eslint-config-vue` with Vue 3 linting rules
  - Added `@santi020k/eslint-config-expo` with Expo/React Native linting rules
  - Added `@santi020k/eslint-config-optionals` for optional integrations (Tailwind, Vitest, cspell, i18next, MDX, Markdown, Stencil)
  - Added `ConfigOption.Nest`, `ConfigOption.Vue`, and `ConfigOption.Expo` enum values
  - Updated PR template with changeset reminder

## 0.1.0

### Minor Changes

- publish testing
