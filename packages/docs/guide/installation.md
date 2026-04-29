# Installation

## Requirements

- Node.js `>=22.18.0`
- ESLint `9+` or `10+`

## Install

In v2, application projects install one public package:

::: code-group

```sh [pnpm]
pnpm add -D @santi020k/eslint-config-basic
```

```sh [npm]
npm install -D @santi020k/eslint-config-basic
```

```sh [yarn]
yarn add -D @santi020k/eslint-config-basic
```

```sh [bun]
bun add -d @santi020k/eslint-config-basic
```

:::

That package brings the framework config packages used by the composer. You no longer install `@santi020k/eslint-config-react`, `@santi020k/eslint-config-next`, or another framework config package in normal application projects.

## Minimal Config

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig()
```

The composer detects TypeScript, frameworks, runtime, and supported optional tooling from your project. You can keep the config minimal or make any choice explicit.

## Explicit Frameworks

Use booleans when you want to enable framework configs manually:

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  typescript: true,
  frameworks: {
    react: true,
    next: true
  }
})
```

Next.js, Expo, and Remix automatically include React rules when needed.

## Framework Matrix

| Project Type | Package To Install | Enable With |
| :--- | :--- | :--- |
| JavaScript | `@santi020k/eslint-config-basic` | `eslintConfig()` |
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

## Optional Tooling

Optional integrations still use the same categories:

| Category | Configure Through | Documentation |
| :--- | :--- | :--- |
| Libraries | `libraries` | [Libraries](/tooling/libraries) |
| Testing | `testing` | [Testing](/tooling/testing) |
| Formats | `formats` | [Formats](/tooling/formats) |
| Tools | `tools` | [Tools](/tooling/tools) |
| Extensions | `extensions` | [Extensions](/tooling/extensions) |

## Migration

If you are upgrading from v1, read the [v1 to v2 migration guide](/guide/migration-v1-to-v2). The short version is: remove extra `@santi020k/eslint-config-*` framework installs from your app and replace imported framework values with `true`.
