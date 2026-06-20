---
title: "Basic Package"
description: "Package: @santi020k/eslint-config-basic"
---

Package: [`@santi020k/eslint-config-basic`](https://www.npmjs.com/package/@santi020k/eslint-config-basic)

This is the public package application projects install in v2.

Use this package by default. If a project needs a smaller install and is willing to install framework and integration config packages manually, see the [Lite Package](/packages/lite).

## What It Owns

- The `eslintConfig()` composer used in application `eslint.config.*` files.
- Bundled framework composition for React, Next.js, Astro, Vue, Svelte, Solid, Angular, NestJS, Hono, Expo, Qwik, Remix, Vite, and Slidev.
- TypeScript, runtime, settings, strict mode, and optional tooling composition.
- Public enums and helper types re-exported from `core`.
- The `basic-eslint` CLI.

## Minimal Example

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig()
```

## Explicit Example

```js
import { defineConfig, Library, Testing, Tool } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: {
    react: true
  },
  libraries: [Library.Tailwind],
  testing: [Testing.Vitest],
  tools: [Tool.Prettier],
  typescript: true
})
```

## Auto-Detection

`eslintConfig()` detects TypeScript, frameworks, runtime, and supported optional integrations from your project. Detected frameworks are enabled automatically in v2 because their config packages are bundled behind the main package.

## Advanced Overrides

The `frameworks` object still accepts imported config arrays and factories. This keeps the internal architecture flexible for tests, experiments, and custom wrappers, while app-level configs can stay simple with booleans.

`defineConfig()` also accepts local flat-config entries after the options object, so most projects do not need to wrap the generated config in an array just to add one or two overrides.

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig(
  {
    frameworks: { astro: true },
    typescript: true
  }, {
    files: ['**/*.astro'],
    rules: {
      '@typescript-eslint/no-unsafe-return': 'off'
    }
  }
)
```

## CLI


```sh title="pnpm"
pnpm dlx @santi020k/eslint-config-basic init
pnpm dlx @santi020k/eslint-config-basic update
```

```sh title="npm"
npx @santi020k/eslint-config-basic init
npx @santi020k/eslint-config-basic update
```

```sh title="yarn"
yarn dlx @santi020k/eslint-config-basic init
yarn dlx @santi020k/eslint-config-basic update
```

```sh title="bun"
bunx @santi020k/eslint-config-basic init
bunx @santi020k/eslint-config-basic update
```

## Repository Links

- Source Package: [packages/basic](https://github.com/santi020k/eslint-config-basic/tree/main/packages/basic)
- Project Repository: [santi020k/eslint-config-basic](https://github.com/santi020k/eslint-config-basic)
- Author: [santi020k](https://santi020k.com)

## Related Pages

- [Installation](/guide/installation)
- [Lite Package](/packages/lite)
- [Configuration](/guide/configuration)
- [v1 to v2 Migration](/guide/migration-v1-to-v2)
- [API Reference](/api/)
