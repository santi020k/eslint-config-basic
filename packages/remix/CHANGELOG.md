# @santi020k/eslint-config-remix

## 0.8.2

### Patch Changes

- [#66](https://github.com/santi020k/eslint-config-basic/pull/66) [`6f2f473`](https://github.com/santi020k/eslint-config-basic/commit/6f2f4733642087eb9eac22a7b6193b71453f375d) Thanks [@santi020k](https://github.com/santi020k)! - # v0.10.0 Release

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
