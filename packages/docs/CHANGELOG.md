# @santi020k/eslint-config-docs

## 1.5.0

### Minor Changes

- [#82](https://github.com/santi020k/eslint-config-basic/pull/82) [`af844f6`](https://github.com/santi020k/eslint-config-basic/commit/af844f663f8403d679467e0dd2a7251e8f3d4bcd) Thanks [@santi020k](https://github.com/santi020k)! - - Add first-class Hono support with Worker runtime globals, package detection, and a playground for Cloudflare Workers-style projects.
  - Lower the Node.js engine requirement to `>=22.18.0` in `package.json` and `.nvmrc`, and validate CI against Node.js 22.
  - Update `README.md` with a landing pointer to the canonical docs site.

## 1.4.0

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

## Unreleased

### Documentation Updates

- Refined the VitePress UI to stay closer to the `santi020k.me` visual language, including footer versioning, responsive navigation improvements, and stronger homepage presentation.
- Expanded installation guidance to cover every supported framework package with package-manager tabs for `pnpm`, `npm`, `yarn`, and `bun`.
- Updated CLI examples and package guides so the docs show consistent multi-package-manager commands instead of a single-manager path.
- Clarified coverage across guide pages and API reference pages so framework support is easier to understand at a glance.

## 1.1.0

### Minor Changes

- [#70](https://github.com/santi020k/eslint-config-basic/pull/70) [`ef658c1`](https://github.com/santi020k/eslint-config-basic/commit/ef658c170f6eaadce14a7e662eaa2a3762362e82) Thanks [@santi020k](https://github.com/santi020k)! - # 1.1.0 Release

  ## Update Highlights
  - **ESLint 10 Support**: Harmonized ESLint version to `^10.1.0` across the monorepo and playgrounds.
  - **Security Patches**: Fixed vulnerabilities in `lodash`, `esbuild`, and `path-to-regexp` via root overrides.
  - **Solid Playground Fix**: Resolved `MODULE_NOT_FOUND` error in the Solid playground linting process.

## 0.0.1

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
