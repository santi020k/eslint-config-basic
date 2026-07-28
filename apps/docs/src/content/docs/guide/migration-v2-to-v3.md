---
title: "Migrate from v2 to v3"
description: "Move from the v2 full-by-default dependency model to the lean v3 package boundary."
---

Version 3 changes dependency ownership and removes integration factories from
the lean root export. Rule options and the `defineConfig()` composer remain
familiar, but this is intentionally a breaking release.

## 1. Choose lean or full

### Recommended: lean

Keep `@santi020k/eslint-config-basic`, then add only the framework config
packages used by the project:

```sh
npm install -D eslint@^10 @santi020k/eslint-config-basic@^3
npm install -D @santi020k/eslint-config-react@^3
```

If the project enables `libraries`, `testing`, `formats`, `tools`,
`extensions`, or the `features` map, add:

```sh
npm install -D @santi020k/eslint-config-integrations@^3
```

### Minimal migration effort: full

Replace the old full-by-default package with the explicit full bundle:

```sh
npm remove @santi020k/eslint-config-basic
npm install -D eslint@^10 @santi020k/eslint-config-full@^3
```

## 2. Simplify the config

The zero-config form can now be one line.

```diff
- import { defineConfig } from '@santi020k/eslint-config-basic'
-
- export default await defineConfig()
+ export { default } from '@santi020k/eslint-config-basic/recommended'
```

For the full bundle:

```js
export { default } from '@santi020k/eslint-config-full/recommended'
```

Keep the named factory when options or local overrides are present:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  strict: 'ci',
  typescript: 'strict'
})
```

## 3. Move direct integration imports

Integration factories no longer come from the lean root package.

```diff
- import { tailwind, vitest } from '@santi020k/eslint-config-basic'
+ import { tailwind, vitest } from '@santi020k/eslint-config-integrations'
```

Projects that switch to `@santi020k/eslint-config-full` may continue importing
those factories from the full package.

## 4. Remove core accessibility dependency assumptions

`eslint-plugin-jsx-a11y` is no longer registered by `core`. It is owned by
framework or integration packages that actually enable accessibility rules.
Install `@santi020k/eslint-config-react`,
`@santi020k/eslint-config-react-router`, or the integrations package as
appropriate.

## 5. Migrate from lite

The v3 `basic` package now uses the modular dependency model that `lite`
introduced. Replace the package name; the composer options remain the same:

```diff
- import { defineConfig } from '@santi020k/eslint-config-lite'
+ import { defineConfig } from '@santi020k/eslint-config-basic'
```

You can also replace a zero-config file with the one-line recommended entry.

## 6. Verify

```sh
npx basic-eslint explain
npx basic-eslint doctor
npx eslint .
```

If ESLint reports a missing optional config, install the package named in the
error. This is expected when a v2 project relied on the old transitive full
bundle.

## Package mapping

| v2 usage | v3 replacement |
| :--- | :--- |
| `basic` with no framework | `basic` |
| `basic` with React | `basic` + `eslint-config-react` |
| `basic` with integrations | `basic` + `eslint-config-integrations` |
| `basic` and every bundled feature | `full` |
| `lite` | `basic` |
| Integration factory imported from `basic` | Import from `integrations` or `full` |
