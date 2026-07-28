---
title: "Migrate from v2 to v3"
description: "Move from the v2 full-by-default dependency model to the lean v3 package boundary."
---

Version 3 changes dependency ownership and removes integration factories from
the lean root export. Rule options and the `defineConfig()` composer remain
familiar, but this is intentionally a breaking release.

## Automated migration

Preview the dependency and config changes before choosing a manual path:

```sh
npx @santi020k/eslint-config-basic@^3 migrate --to v3
```

The migration detects framework and feature-pack packages, replaces removed
aliases, moves direct factory imports, and maps Remix to React Router. Apply
safe changes with backups:

```sh
npx @santi020k/eslint-config-basic@^3 migrate --to v3 --write
```

Pass `--full` for the batteries-included package, `--check` to enforce a clean
migration in CI, or `--json` for a machine-readable plan.

## 1. Choose a migration path

### Easy way (recommended): full

For the quickest migration, replace the old full-by-default package with the
explicit full bundle:

```sh
npm remove @santi020k/eslint-config-basic
npm install -D eslint@^10 @santi020k/eslint-config-full@^3
```

This keeps every supported framework and integration available without
requiring you to map and install each package during the upgrade.

### Complete way: lean

To adopt the v3 modular dependency model fully, keep
`@santi020k/eslint-config-basic`, then add only the framework config packages
used by the project:

```sh
npm install -D eslint@^10 @santi020k/eslint-config-basic@^3
npm install -D @santi020k/eslint-config-react@^3
```

Install implied configs too: Next.js, Expo, React Router, and Remix need the
React config; Nuxt and Slidev need Vue; TanStack Start needs React or Solid.
The framework guides show exact commands.

Install the granular feature packs selected by the project:

```sh
npm install -D @santi020k/eslint-config-extensions@^3
npm install -D @santi020k/eslint-config-formats@^3
npm install -D @santi020k/eslint-config-libraries@^3
npm install -D @santi020k/eslint-config-testing@^3
npm install -D @santi020k/eslint-config-tools@^3
```

Only install categories the project uses. The
`@santi020k/eslint-config-integrations` aggregate remains available as a
compatibility package.

## 2. Simplify the config

For the easy full-bundle migration:

```js
export { default } from '@santi020k/eslint-config-full/recommended'
```

For the complete lean migration, the zero-config form now needs no options:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default defineConfig()
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
+ import { tailwind } from '@santi020k/eslint-config-libraries'
+ import { vitest } from '@santi020k/eslint-config-testing'
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

You can also simplify a zero-config file to the zero-argument `defineConfig()`
setup.

## 6. Replace removed compatibility APIs

The v1 aliases have completed their deprecation period. When these names were
imported from Basic, Lite, Core, TypeScript, or Astro, use the v3 replacements:

| Removed | Replacement |
| :--- | :--- |
| `eslintConfig` | `defineConfig` |
| `angularConfig`, `expoConfig`, `nestConfig`, `nextConfig`, `preactConfig` | `angular`, `expo`, `nest`, `next`, `preact` |
| `reactConfig`, `solidConfig`, `svelteConfig`, `vueConfig` | `react`, `solid`, `svelte`, `vue` |
| `jsConfig` | `coreConfig` |
| `tsConfig` | `typescriptConfig` |
| `astroConfig` | `createAstroConfig()` |
| Astro `rules` | `getRules()` |
| Core `gitignore` | `createGitignoreConfig(rootDir)` |
| Core `loadModule` | `createModuleLoader(resolver)` |

## 7. Move Remix to React Router

```sh
npm remove @santi020k/eslint-config-remix
npm install -D @santi020k/eslint-config-react-router@^3 @santi020k/eslint-config-react@^3
```

```diff
- frameworks: { remix: true }
+ frameworks: { 'react-router': true }
```

Existing `@remix-run/react` and `@remix-run/node` dependencies are detected as
React Router projects automatically.

## 8. Verify

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
| `basic` with Next.js | `basic` + `eslint-config-next` + `eslint-config-react` |
| `basic` with optional features | `basic` + the selected granular feature packs |
| `basic` and every bundled feature | `full` |
| `lite` | `basic` |
| Feature factory imported from `basic` | Import from its feature pack or `full` |
