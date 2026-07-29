# @santi020k/eslint-config-lite

## 3.1.0

### Minor Changes

- [#99](https://github.com/santi020k/eslint-config-basic/pull/99) [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967) Thanks [@santi020k](https://github.com/santi020k)! - Complete the v3 lean dependency boundary and one-line recommended entry point. Framework and feature-pack packages are now optional, dynamically loaded peers with actionable installation errors. Feature factories move from the basic root export to granular extensions, formats, libraries, testing, and tools packages; `@santi020k/eslint-config-integrations` remains as a compatibility aggregate, while the new `@santi020k/eslint-config-full` package provides the batteries-included installation path. Core no longer owns JSX accessibility rules, the CLI writes the one-line configuration, and release checks enforce dependency budgets, packed-consumer compatibility, and lean production-audit boundaries.

  Remove the v1 compatibility exports (`*Config`, `jsConfig`, `tsConfig`,
  `astroConfig`, `rules`, `loadModule`, and `eslintConfig`) from the aggregate
  v3 API. Remove the deprecated Remix package and `frameworks.remix` option;
  Remix dependencies now resolve through the React Router v7 configuration.
  The Lite package is now a thin compatibility re-export of Basic.

- [#99](https://github.com/santi020k/eslint-config-basic/pull/99) [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967) Thanks [@santi020k](https://github.com/santi020k)! - Polish real-world consumer configuration: add one `root` option for detection,
  TypeScript, Tailwind, projects, and `.gitignore`; auto-detect and scope workspace
  packages without leaking root framework dependencies; accept native project
  service options; and syntax-lint TypeScript config files plus explicit
  `untypedFiles` without consumer-side `typescript-eslint` imports.

### Patch Changes

- [#99](https://github.com/santi020k/eslint-config-basic/pull/99) [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967) Thanks [@santi020k](https://github.com/santi020k)! - Resolve package-scoped Tailwind and Astro configuration roots, keep lazy framework imports anchored to their declaring package, add shared `projectDefaults` inheritance for monorepos, and move integration host libraries to optional peers.

- [#99](https://github.com/santi020k/eslint-config-basic/pull/99) [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967) Thanks [@santi020k](https://github.com/santi020k)! - Deprecate the Lite and Integrations compatibility packages during v3 and
  schedule their removal for v4. Add TypeScript deprecation annotations,
  migration guidance, and post-publish npm registry warnings. Also deprecate the
  `integrations` option alias and `doctor --lite-install` compatibility workflow.
- Updated dependencies [[`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967)]:
  - @santi020k/eslint-config-basic@3.1.0

## 3.0.0

### Major Changes

- Enter compatibility mode. The main `@santi020k/eslint-config-basic` package
  now uses the modular dependency model introduced by `lite`.
- New projects should migrate to `basic`; existing composer options remain
  available during the transition.

## 2.1.1

### Patch Changes

- Updated dependencies [[`2576ec6`](https://github.com/santi020k/eslint-config-basic/commit/2576ec62df6127f5b40821e46a22394bb9dec867)]:
  - @santi020k/eslint-config-core@2.1.1
  - @santi020k/eslint-config-typescript@2.1.1

## 2.1.0

### Patch Changes

- Updated dependencies []:
  - @santi020k/eslint-config-core@2.1.0
  - @santi020k/eslint-config-typescript@2.1.0

## 2.0.0

### Minor Changes

- [`dfba51d`](https://github.com/santi020k/eslint-config-basic/commit/dfba51dca7387a71a263af206eb86fd8df15f387) Thanks [@santi020k](https://github.com/santi020k)! - Improve config migration handling and enhance TypeScript options detection

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Add `@santi020k/eslint-config-lite` as an optional composer package for projects that want to install framework and integration config packages manually. The full `@santi020k/eslint-config-basic` package remains the recommended default install.

  Expose integration composition helpers from `@santi020k/eslint-config-integrations` so the lite package can lazy-load integration configs only when selected.

  Teach `basic-eslint doctor` to recognize lite configs and warn when detected frameworks or integrations are missing their manually installed config packages.

  Add `basic-eslint doctor --lite-install` to print the detected package-manager install command for switching a project to the lite package, including framework config packages, integrations, ESLint, and TypeScript when needed.

  Document package-choice metrics, a Basic-to-Lite migration recipe, and a lite-specific `Preset.All` warning.

### Patch Changes

- Updated dependencies [[`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`dfba51d`](https://github.com/santi020k/eslint-config-basic/commit/dfba51dca7387a71a263af206eb86fd8df15f387), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`59158db`](https://github.com/santi020k/eslint-config-basic/commit/59158dbc0b48de041062f4d0c75b1f7e3a1e779c), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`59158db`](https://github.com/santi020k/eslint-config-basic/commit/59158dbc0b48de041062f4d0c75b1f7e3a1e779c), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc)]:
  - @santi020k/eslint-config-core@2.0.0
  - @santi020k/eslint-config-typescript@2.0.0

## 2.0.0-beta.3

### Patch Changes

- Updated dependencies [[`af152cd`](https://github.com/santi020k/eslint-config-basic/commit/af152cda17961f9de8ca7bf069739f151fca65be)]:
  - @santi020k/eslint-config-core@2.0.0-beta.3
  - @santi020k/eslint-config-typescript@2.0.0-beta.3

## 2.0.0-beta.2

### Patch Changes

- Updated dependencies []:
  - @santi020k/eslint-config-core@2.0.0-beta.2
  - @santi020k/eslint-config-typescript@2.0.0-beta.2

## 2.0.0-beta.1

### Minor Changes

- [`dfba51d`](https://github.com/santi020k/eslint-config-basic/commit/dfba51dca7387a71a263af206eb86fd8df15f387) Thanks [@santi020k](https://github.com/santi020k)! - Improve config migration handling and enhance TypeScript options detection

### Patch Changes

- Updated dependencies [[`dfba51d`](https://github.com/santi020k/eslint-config-basic/commit/dfba51dca7387a71a263af206eb86fd8df15f387)]:
  - @santi020k/eslint-config-core@2.0.0-beta.1
  - @santi020k/eslint-config-typescript@2.0.0-beta.1

## 2.0.0-beta.0

### Minor Changes

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Add `@santi020k/eslint-config-lite` as an optional composer package for projects that want to install framework and integration config packages manually. The full `@santi020k/eslint-config-basic` package remains the recommended default install.

  Expose integration composition helpers from `@santi020k/eslint-config-integrations` so the lite package can lazy-load integration configs only when selected.

  Teach `basic-eslint doctor` to recognize lite configs and warn when detected frameworks or integrations are missing their manually installed config packages.

  Add `basic-eslint doctor --lite-install` to print the detected package-manager install command for switching a project to the lite package, including framework config packages, integrations, ESLint, and TypeScript when needed.

  Document package-choice metrics, a Basic-to-Lite migration recipe, and a lite-specific `Preset.All` warning.

### Patch Changes

- Updated dependencies [[`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc)]:
  - @santi020k/eslint-config-preact@2.0.0-beta.0
  - @santi020k/eslint-config-core@2.0.0-beta.0
  - @santi020k/eslint-config-integrations@2.0.0-beta.0
  - @santi020k/eslint-config-angular@2.0.0-beta.0
  - @santi020k/eslint-config-astro@2.0.0-beta.0
  - @santi020k/eslint-config-expo@2.0.0-beta.0
  - @santi020k/eslint-config-hono@2.0.0-beta.0
  - @santi020k/eslint-config-lit@2.0.0-beta.0
  - @santi020k/eslint-config-nest@2.0.0-beta.0
  - @santi020k/eslint-config-next@2.0.0-beta.0
  - @santi020k/eslint-config-nuxt@2.0.0-beta.0
  - @santi020k/eslint-config-qwik@2.0.0-beta.0
  - @santi020k/eslint-config-react@2.0.0-beta.0
  - @santi020k/eslint-config-react-router@2.0.0-beta.0
  - @santi020k/eslint-config-remix@2.0.0-beta.0
  - @santi020k/eslint-config-slidev@2.0.0-beta.0
  - @santi020k/eslint-config-solid@2.0.0-beta.0
  - @santi020k/eslint-config-svelte@2.0.0-beta.0
  - @santi020k/eslint-config-tanstack-start@2.0.0-beta.0
  - @santi020k/eslint-config-typescript@2.0.0-beta.0
  - @santi020k/eslint-config-vite@2.0.0-beta.0
  - @santi020k/eslint-config-vue@2.0.0-beta.0

## 1.6.0

### Minor Changes

- Add the lite composer package for manual framework and integration installs.
