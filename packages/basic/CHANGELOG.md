# @santi020k/eslint-config-basic

## 0.7.0

### Minor Changes

- [#41](https://github.com/santi020k/eslint-config-basic/pull/41) [`d802dfb`](https://github.com/santi020k/eslint-config-basic/commit/d802dfb2cb2f0813d91170771b3b21b3cf3b5e10) Thanks [@santi020k](https://github.com/santi020k)! - Add Playwright support as an optional configuration.

### Patch Changes

- Updated dependencies [[`d802dfb`](https://github.com/santi020k/eslint-config-basic/commit/d802dfb2cb2f0813d91170771b3b21b3cf3b5e10)]:
  - @santi020k/eslint-config-core@0.5.0
  - @santi020k/eslint-config-optionals@0.5.0

## 0.6.0

### Minor Changes

- [#39](https://github.com/santi020k/eslint-config-basic/pull/39) [`1c11dec`](https://github.com/santi020k/eslint-config-basic/commit/1c11decd67a9874ff42f98a7ac455216313c952f) Thanks [@santi020k](https://github.com/santi020k)! - feat(astro): add robust defaults and virtual script support for Astro 5+
  feat(core): standardize internal dependencies to workspace:\* for better monorepo development
  docs: add Tailwind CSS v4 compatibility notes and workarounds to README

### Patch Changes

- [#39](https://github.com/santi020k/eslint-config-basic/pull/39) [`1c11dec`](https://github.com/santi020k/eslint-config-basic/commit/1c11decd67a9874ff42f98a7ac455216313c952f) Thanks [@santi020k](https://github.com/santi020k)! - Fix missing README in published package by ensuring symlinks are correctly handled during `prepack` and `postpack`, and explicitly including `README.md` and `CHANGELOG.md` in the `files` array.

- [#39](https://github.com/santi020k/eslint-config-basic/pull/39) [`1c11dec`](https://github.com/santi020k/eslint-config-basic/commit/1c11decd67a9874ff42f98a7ac455216313c952f) Thanks [@santi020k](https://github.com/santi020k)! - refactor(optionals): replace eslint-plugin-tailwindcss with eslint-plugin-better-tailwindcss for better Tailwind v4 support

- Updated dependencies [[`1c11dec`](https://github.com/santi020k/eslint-config-basic/commit/1c11decd67a9874ff42f98a7ac455216313c952f), [`1c11dec`](https://github.com/santi020k/eslint-config-basic/commit/1c11decd67a9874ff42f98a7ac455216313c952f)]:
  - @santi020k/eslint-config-astro@0.3.0
  - @santi020k/eslint-config-core@0.4.2
  - @santi020k/eslint-config-typescript@0.1.2
  - @santi020k/eslint-config-react@0.1.2
  - @santi020k/eslint-config-next@0.1.2
  - @santi020k/eslint-config-expo@0.2.2
  - @santi020k/eslint-config-nest@0.2.2
  - @santi020k/eslint-config-vue@0.2.2
  - @santi020k/eslint-config-optionals@0.4.2

## 0.5.0

### Minor Changes

- [#36](https://github.com/santi020k/eslint-config-basic/pull/36) [`85d6a5e`](https://github.com/santi020k/eslint-config-basic/commit/85d6a5e91f5322445eb874fa45693f8368ab4ca4) Thanks [@santi020k](https://github.com/santi020k)! - feat(astro): add robust defaults and virtual script support for Astro 5+
  feat(core): standardize internal dependencies to workspace:\* for better monorepo development
  docs: add Tailwind CSS v4 compatibility notes and workarounds to README

### Patch Changes

- [#36](https://github.com/santi020k/eslint-config-basic/pull/36) [`85d6a5e`](https://github.com/santi020k/eslint-config-basic/commit/85d6a5e91f5322445eb874fa45693f8368ab4ca4) Thanks [@santi020k](https://github.com/santi020k)! - refactor(optionals): replace eslint-plugin-tailwindcss with eslint-plugin-better-tailwindcss for better Tailwind v4 support

- Updated dependencies [[`85d6a5e`](https://github.com/santi020k/eslint-config-basic/commit/85d6a5e91f5322445eb874fa45693f8368ab4ca4), [`85d6a5e`](https://github.com/santi020k/eslint-config-basic/commit/85d6a5e91f5322445eb874fa45693f8368ab4ca4)]:
  - @santi020k/eslint-config-astro@0.2.0
  - @santi020k/eslint-config-core@0.4.1
  - @santi020k/eslint-config-typescript@0.1.1
  - @santi020k/eslint-config-react@0.1.1
  - @santi020k/eslint-config-next@0.1.1
  - @santi020k/eslint-config-expo@0.2.1
  - @santi020k/eslint-config-nest@0.2.1
  - @santi020k/eslint-config-vue@0.2.1
  - @santi020k/eslint-config-optionals@0.4.1

## 0.4.0

### Minor Changes

- [#34](https://github.com/santi020k/eslint-config-basic/pull/34) [`f015876`](https://github.com/santi020k/eslint-config-basic/commit/f015876442b88b395cd3775b06f829349dd34d3a) Thanks [@santi020k](https://github.com/santi020k)! - feat: add eslint-plugin-sonarjs as optional config
  chore: remove tailwindcss from playground and test package dependencies
  docs: update AI Agent skills in README

### Patch Changes

- Updated dependencies [[`f015876`](https://github.com/santi020k/eslint-config-basic/commit/f015876442b88b395cd3775b06f829349dd34d3a)]:
  - @santi020k/eslint-config-core@0.4.0
  - @santi020k/eslint-config-optionals@0.4.0

## 0.3.0

### Minor Changes

- [#28](https://github.com/santi020k/eslint-config-basic/pull/28) [`162afdb`](https://github.com/santi020k/eslint-config-basic/commit/162afdb2f0a30714487915bdf083234426018ad2) Thanks [@santi020k](https://github.com/santi020k)! - feat: add `regexp` optional config with `eslint-plugin-regexp`

  - New `OptionalOption.Regexp` to enable regex linting via `eslint-plugin-regexp`
  - Catches common regex mistakes: exponential backtracking, unnecessary escapes, and optimizable character classes
  - Uses recommended rules with selective overrides for smoother adoption

### Patch Changes

- [#27](https://github.com/santi020k/eslint-config-basic/pull/27) [`577abbe`](https://github.com/santi020k/eslint-config-basic/commit/577abbe49c2a83f6ecc744413daf3d1e1e16be2c) Thanks [@santi020k](https://github.com/santi020k)! - ci: disable Husky git hooks during the release workflow

  - Added `HUSKY=0` environment variable to the release workflow to prevent Git hooks from interfering with the automated release process

- [#25](https://github.com/santi020k/eslint-config-basic/pull/25) [`1fb4693`](https://github.com/santi020k/eslint-config-basic/commit/1fb4693b4ff6e3a1a9404096e14039121e1297b5) Thanks [@santi020k](https://github.com/santi020k)! - feat: add GitHub-linked changelogs and automatic GitHub releases with tags

  - Switched changelog generator to `@changesets/changelog-github` for richer changelogs with PR links, commit references, and contributor credits
  - Configured release workflow to create GitHub releases with git tags on publish

- Updated dependencies [[`162afdb`](https://github.com/santi020k/eslint-config-basic/commit/162afdb2f0a30714487915bdf083234426018ad2), [`1fb4693`](https://github.com/santi020k/eslint-config-basic/commit/1fb4693b4ff6e3a1a9404096e14039121e1297b5)]:
  - @santi020k/eslint-config-core@0.3.0
  - @santi020k/eslint-config-optionals@0.3.0

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
  - @santi020k/eslint-config-nest@0.2.0
  - @santi020k/eslint-config-vue@0.2.0
  - @santi020k/eslint-config-expo@0.2.0
  - @santi020k/eslint-config-optionals@0.2.0

## 0.1.0

### Minor Changes

- publish testing

### Patch Changes

- Updated dependencies
  - @santi020k/eslint-config-typescript@0.1.0
  - @santi020k/eslint-config-optionals@0.1.0
  - @santi020k/eslint-config-astro@0.1.0
  - @santi020k/eslint-config-react@0.1.0
  - @santi020k/eslint-config-core@0.1.0
  - @santi020k/eslint-config-expo@0.1.0
  - @santi020k/eslint-config-nest@0.1.0
  - @santi020k/eslint-config-next@0.1.0
  - @santi020k/eslint-config-vue@0.1.0
