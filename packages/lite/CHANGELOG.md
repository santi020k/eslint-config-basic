# @santi020k/eslint-config-lite

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
