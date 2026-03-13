# @santi020k/eslint-config-basic

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
