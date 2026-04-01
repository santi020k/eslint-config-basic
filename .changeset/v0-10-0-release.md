---
"@santi020k/eslint-config-angular": patch
"@santi020k/eslint-config-astro": patch
"@santi020k/eslint-config-basic": minor
"@santi020k/eslint-config-core": minor
"@santi020k/eslint-config-docs": patch
"@santi020k/eslint-config-expo": patch
"@santi020k/eslint-config-nest": patch
"@santi020k/eslint-config-next": patch
"@santi020k/eslint-config-optionals": patch
"@santi020k/eslint-config-qwik": patch
"@santi020k/eslint-config-react": patch
"@santi020k/eslint-config-remix": patch
"@santi020k/eslint-config-solid": patch
"@santi020k/eslint-config-svelte": patch
"@santi020k/eslint-config-typescript": patch
"@santi020k/eslint-config-vue": patch
"@santi020k/eslint-config-tests": patch
---

# v0.10.0 Release

## Major Changes

- **Migration to pnpm**: Full migration of the monorepo from npm to pnpm workspaces (pnpm v10+). This includes better performance, stricter dependency management, and corepack integration.
- **neostandard removal**: Removed `neostandard` dependency to provide more granular control and modularity in core rules.
- **Stylistic v4 -> v5**: Upgraded to `@stylistic/eslint-plugin` version 5.x for improved formatting rules and TypeScript 5.7+ support.

## Framework Updates

- **Qwik & Remix Support**: Added comprehensive ESLint configurations and functional playground environments for both Qwik and Remix frameworks.
- **Dependency Alignment**: Resolved critical `typescript-eslint` dependency issues in Astro, Svelte, and Vue packages to ensure proper rule resolution and type safety.
- **Consistency Refinements**: Standardized `disable-type-checked` rule blocks across all framework-specific configurations.

## Maintenance

- **Corepack Enablement**: Added `corepack` support for automated package manager version management.
- **Turbo Update**: Bumped Turborepo to v2.9+ for faster builds and improved task caching.
- **Playground Synchronization**: Updated all playground packages to maintain parity with the latest framework rules.
