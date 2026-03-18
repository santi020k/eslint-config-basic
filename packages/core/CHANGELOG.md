# @santi020k/eslint-config-core

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
