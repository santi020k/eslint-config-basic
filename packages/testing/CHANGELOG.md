# @santi020k/eslint-config-testing

## 3.1.1

### Patch Changes

- [#108](https://github.com/santi020k/eslint-config-basic/pull/108) [`66cee8e`](https://github.com/santi020k/eslint-config-basic/commit/66cee8e41ac22b14e8afa91f1f77587f08bc414f) Thanks [@santi020k](https://github.com/santi020k)! - Keep Playwright-only rules out of generic unit-test folders when Playwright and
  Vitest coexist while retaining explicit end-to-end folders, Playwright-named
  files, Playwright configs, and custom test-file overrides.
- Updated dependencies [[`66cee8e`](https://github.com/santi020k/eslint-config-basic/commit/66cee8e41ac22b14e8afa91f1f77587f08bc414f)]:
  - @santi020k/eslint-config-core@3.1.1

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

- Updated dependencies [[`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967)]:
  - @santi020k/eslint-config-core@3.1.0
