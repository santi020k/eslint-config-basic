# @santi020k/eslint-config-full

## 3.2.1

### Patch Changes

- [#116](https://github.com/santi020k/eslint-config-basic/pull/116) [`498bb41`](https://github.com/santi020k/eslint-config-basic/commit/498bb418d077e57d3dc71c8441813d9b8a2545ca) Thanks [@santi020k](https://github.com/santi020k)! - Keep Astro lint runs warning-free by leaving `projectService` ownership with
  Astro's supported `project` parser option. TypeScript parser setup no longer
  forwards `projectService` into Astro source files, while Vue, Svelte, and
  virtual TypeScript files retain their existing parser behavior.

  Add `snapshot --rules-only` for compact committed rule contracts. Rules-only
  snapshots record their scope so subsequent checks and diffs omit globals,
  language options, and plugin metadata automatically.

  Forward `--rules-only` through the public CLI dispatcher and add an end-to-end
  regression for the saved scope. The option was previously accepted but only
  direct handler calls received it.

  Add `config-types` to emit ESLint config declarations in memory with the
  consumer's TypeScript context and reject pnpm-internal or transitive
  `typescript-eslint` types. The composite action exposes an opt-in portability
  gate for consumer maintenance workflows.

  Discover exact selectors from Astro component-local styles and narrow utility
  patterns from explicitly configured Tailwind plugins. Doctor reports the
  smallest project-scoped exception shape when dynamic classes still need an
  allowance.

  Add semantic-only preset adoption fixes and report scripts that combine source
  file reads with regular-expression parsing. Writing is allowed only in the
  semantic-only mode, keeping formatting churn in a separate review.

  Run the CLI when pnpm invokes its direct `.bin/basic-eslint` symlink. Older
  entrypoint guards could silently exit successfully because the executable path
  did not end in `cli.js`.

- Updated dependencies [[`498bb41`](https://github.com/santi020k/eslint-config-basic/commit/498bb418d077e57d3dc71c8441813d9b8a2545ca)]:
  - @santi020k/eslint-config-astro@3.1.2
  - @santi020k/eslint-config-basic@3.5.0

## 3.2.0

### Minor Changes

- Keep TypeScript 6 declaration inference for JavaScript ESLint configs portable
  under pnpm by returning a package-owned public config-array type. Annotate the
  recommended entry point and verify packed consumers do not expose internal
  `typescript-eslint` dependency paths or report TS2883.

### Patch Changes

- Updated dependencies []:
  - @santi020k/eslint-config-basic@3.4.0

## 3.1.1

### Patch Changes

- [#108](https://github.com/santi020k/eslint-config-basic/pull/108) [`66cee8e`](https://github.com/santi020k/eslint-config-basic/commit/66cee8e41ac22b14e8afa91f1f77587f08bc414f) Thanks [@santi020k](https://github.com/santi020k)! - Keep optional feature-pack loading and published package builds reliable across
  supported package managers. Preserve package ownership for transitive peer
  warnings, reject unsupported TypeScript 7 installations, and clarify which Full
  dependencies are installed versus activated and how independent package versions
  compose.
- Updated dependencies [[`66cee8e`](https://github.com/santi020k/eslint-config-basic/commit/66cee8e41ac22b14e8afa91f1f77587f08bc414f), [`66cee8e`](https://github.com/santi020k/eslint-config-basic/commit/66cee8e41ac22b14e8afa91f1f77587f08bc414f), [`66cee8e`](https://github.com/santi020k/eslint-config-basic/commit/66cee8e41ac22b14e8afa91f1f77587f08bc414f), [`66cee8e`](https://github.com/santi020k/eslint-config-basic/commit/66cee8e41ac22b14e8afa91f1f77587f08bc414f), [`66cee8e`](https://github.com/santi020k/eslint-config-basic/commit/66cee8e41ac22b14e8afa91f1f77587f08bc414f), [`66cee8e`](https://github.com/santi020k/eslint-config-basic/commit/66cee8e41ac22b14e8afa91f1f77587f08bc414f), [`66cee8e`](https://github.com/santi020k/eslint-config-basic/commit/66cee8e41ac22b14e8afa91f1f77587f08bc414f)]:
  - @santi020k/eslint-config-astro@3.1.1
  - @santi020k/eslint-config-basic@3.3.0
  - @santi020k/eslint-config-formats@3.1.1
  - @santi020k/eslint-config-extensions@3.1.1
  - @santi020k/eslint-config-libraries@3.1.1
  - @santi020k/eslint-config-testing@3.1.1
  - @santi020k/eslint-config-tools@3.1.1

## 3.1.0

### Minor Changes

- [#99](https://github.com/santi020k/eslint-config-basic/pull/99) [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967) Thanks [@santi020k](https://github.com/santi020k)! - Complete the v3 lean dependency boundary and one-line recommended entry point. Framework and feature-pack packages are now optional, dynamically loaded peers with actionable installation errors. Feature factories move from the basic root export to granular extensions, formats, libraries, testing, and tools packages; `@santi020k/eslint-config-integrations` remains as a compatibility aggregate, while the new `@santi020k/eslint-config-full` package provides the batteries-included installation path. Core no longer owns JSX accessibility rules, the CLI writes the one-line configuration, and release checks enforce dependency budgets, packed-consumer compatibility, and lean production-audit boundaries.

  Remove the v1 compatibility exports (`*Config`, `jsConfig`, `tsConfig`,
  `astroConfig`, `rules`, `loadModule`, and `eslintConfig`) from the aggregate
  v3 API. Remove the deprecated Remix package and `frameworks.remix` option;
  Remix dependencies now resolve through the React Router v7 configuration.
  The Lite package is now a thin compatibility re-export of Basic.

- [#99](https://github.com/santi020k/eslint-config-basic/pull/99) [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967) Thanks [@santi020k](https://github.com/santi020k)! - Complete the v3 modular dependency boundary with five category feature packs.
  Each pack owns its plugin dependencies and exposes a self-describing feature
  registry through the shared `ConfigFeature` contract. The lean Basic composer
  loads only registries for selected categories, Full installs every pack, and
  Integrations remains as a compatibility aggregate.

  Move agent-skill generation from the Basic root export to
  `@santi020k/eslint-config-basic/agent`, keeping Node-oriented tooling out of the
  configuration runtime entry point.

### Patch Changes

- Updated dependencies [[`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967)]:
  - @santi020k/eslint-config-basic@3.1.0
  - @santi020k/eslint-config-extensions@3.1.0
  - @santi020k/eslint-config-formats@3.1.0
  - @santi020k/eslint-config-libraries@3.1.0
  - @santi020k/eslint-config-testing@3.1.0
  - @santi020k/eslint-config-tools@3.1.0
  - @santi020k/eslint-config-react@3.1.0
  - @santi020k/eslint-config-angular@3.1.0
  - @santi020k/eslint-config-astro@3.1.0
  - @santi020k/eslint-config-expo@3.1.0
  - @santi020k/eslint-config-hono@3.1.0
  - @santi020k/eslint-config-lit@3.1.0
  - @santi020k/eslint-config-nest@3.1.0
  - @santi020k/eslint-config-next@3.1.0
  - @santi020k/eslint-config-nuxt@3.1.0
  - @santi020k/eslint-config-qwik@3.1.0
  - @santi020k/eslint-config-react-router@3.1.0
  - @santi020k/eslint-config-slidev@3.1.0
  - @santi020k/eslint-config-solid@3.1.0
  - @santi020k/eslint-config-svelte@3.1.0
  - @santi020k/eslint-config-tanstack-start@3.1.0
  - @santi020k/eslint-config-vite@3.1.0
  - @santi020k/eslint-config-vue@3.1.0
  - @santi020k/eslint-config-preact@3.1.0

## 3.0.0

Initial batteries-included package for the v3 release.
