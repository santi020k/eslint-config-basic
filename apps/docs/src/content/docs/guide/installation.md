---
title: "Installation"
description: "- Node.js =22.18.0 - ESLint 10+"
---

## Requirements

- Node.js `>=22.18.0`
- ESLint `9+` or `10+`

## Install

In v2, application projects install one public package:


```sh title="pnpm"
pnpm add -D @santi020k/eslint-config-basic
```

```sh title="npm"
npm install -D @santi020k/eslint-config-basic
```

```sh title="yarn"
yarn add -D @santi020k/eslint-config-basic
```

```sh title="bun"
bun add -d @santi020k/eslint-config-basic
```


That package brings the framework config packages used by the composer. You no longer install `@santi020k/eslint-config-react`, `@santi020k/eslint-config-next`, or another framework config package in normal application projects.

## Lite Install

If your project needs a smaller install or wants to manage framework config packages manually, use the optional lite entry point:

```sh title="pnpm"
pnpm add -D @santi020k/eslint-config-lite eslint
```

```js
import { defineConfig } from '@santi020k/eslint-config-lite'

export default await defineConfig()
```

With `@santi020k/eslint-config-lite`, install framework and integration config packages only when you enable them:

```sh title="pnpm"
pnpm add -D @santi020k/eslint-config-react
pnpm add -D @santi020k/eslint-config-integrations
```

The full `@santi020k/eslint-config-basic` package remains the recommended default. Use lite for dependency-sensitive projects and CI caches where manual package ownership is worth the extra setup.

## Minimal Config

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig()
```

The composer detects TypeScript, frameworks, runtime, and supported optional tooling from your project. You can keep the config minimal or make any choice explicit.

## Optional Features

When auto-detection is not enough, optional configs can be enabled by category arrays or by the simple `features` map.

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  features: {
    playwright: true,
    prettier: true,
    tailwind: true,
    zod: true
  }
})
```

The category arrays also accept enum values or their matching strings:

```js
import { defineConfig, Library, Tool } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  libraries: [Library.Tailwind, 'zod'],
  tools: [Tool.Prettier, 'cspell']
})
```

## Explicit Frameworks

Use booleans when you want to enable framework configs manually:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: {
    next: true,
    react: true
  },
  typescript: true
})
```

Next.js, Expo, and Remix automatically include React rules when needed.

## Ignoring paths

Skip linting build artifacts or generated folders by passing [`ignores`](/guide/configuration#additional-global-ignores) on `eslintConfig()`—same effect as a leading flat-config block that only sets `ignores`, without wrapping the export in an extra array.

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  ignores: ['dist/**', 'coverage/**']
})
```

See [Configuration](/guide/configuration#additional-global-ignores) for presets, monorepo `projects`, and ESLint working-directory notes.

## Framework Matrix

| Project Type | Package To Install | Enable With |
| :--- | :--- | :--- |
| JavaScript | `@santi020k/eslint-config-basic` | `eslintConfig()` |
| JavaScript, manual packages | `@santi020k/eslint-config-lite` | `eslintConfig()` |
| TypeScript | `@santi020k/eslint-config-basic` | `typescript: true` or auto-detection |
| React | `@santi020k/eslint-config-basic` | `frameworks.react: true` |
| Next.js | `@santi020k/eslint-config-basic` | `frameworks.next: true` |
| Astro | `@santi020k/eslint-config-basic` | `frameworks.astro: true` |
| Vue | `@santi020k/eslint-config-basic` | `frameworks.vue: true` |
| Svelte | `@santi020k/eslint-config-basic` | `frameworks.svelte: true` |
| Solid | `@santi020k/eslint-config-basic` | `frameworks.solid: true` |
| Angular | `@santi020k/eslint-config-basic` | `frameworks.angular: true` |
| NestJS | `@santi020k/eslint-config-basic` | `frameworks.nest: true` |
| Hono | `@santi020k/eslint-config-basic` | `frameworks.hono: true` |
| Qwik | `@santi020k/eslint-config-basic` | `frameworks.qwik: true` |
| Remix | `@santi020k/eslint-config-basic` | `frameworks.remix: true` |
| Expo | `@santi020k/eslint-config-basic` | `frameworks.expo: true` |
| Vite | `@santi020k/eslint-config-basic` | `frameworks.vite: true` |
| Slidev | `@santi020k/eslint-config-basic` | `frameworks.slidev: true` |

## Integrations

Optional integrations still use the same categories:

| Category | Configure Through | Documentation |
| :--- | :--- | :--- |
| Libraries | `libraries` | [Libraries](/tooling/libraries) |
| Testing | `testing` | [Testing](/tooling/testing) |
| Formats | `formats` | [Formats](/tooling/formats) |
| Tools | `tools` | [Tools](/tooling/tools) |
| Extensions | `extensions` | [Extensions](/tooling/extensions) |

Use `features` or its alias `integrations` when you prefer one boolean map instead of separate category arrays.

## Migration

If you are upgrading from v1, read the [v1 to v2 migration guide](/guide/migration-v1-to-v2). The short version is: remove extra `@santi020k/eslint-config-*` framework installs from your app and replace imported framework values with `true`.
