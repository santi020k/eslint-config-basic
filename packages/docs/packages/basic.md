# Basic Package

Package: [`@santi020k/eslint-config-basic`](https://www.npmjs.com/package/@santi020k/eslint-config-basic)

This is the public package application projects install in v2.

## What It Owns

- The `eslintConfig()` composer used in application `eslint.config.*` files.
- Bundled framework composition for React, Next.js, Astro, Vue, Svelte, Solid, Angular, NestJS, Hono, Expo, Qwik, and Remix.
- TypeScript, runtime, settings, strict mode, and optional tooling composition.
- Public enums and helper types re-exported from `core`.
- The `basic-eslint` CLI.

## Minimal Example

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig()
```

## Explicit Example

```js
import { eslintConfig, Library, Testing, Tool } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  typescript: true,
  frameworks: {
    react: true
  },
  libraries: [Library.Tailwind],
  testing: [Testing.Vitest],
  tools: [Tool.Prettier]
})
```

## Auto-Detection

`eslintConfig()` detects TypeScript, frameworks, runtime, and supported optional integrations from your project. Detected frameworks are enabled automatically in v2 because their config packages are bundled behind the main package.

## Advanced Overrides

The `frameworks` object still accepts imported config arrays and factories. This keeps the internal architecture flexible for tests, experiments, and custom wrappers, while app-level configs can stay simple with booleans.

## CLI

::: code-group

```sh [pnpm]
pnpm dlx @santi020k/eslint-config-basic init
pnpm dlx @santi020k/eslint-config-basic update
```

```sh [npm]
npx @santi020k/eslint-config-basic init
npx @santi020k/eslint-config-basic update
```

```sh [yarn]
yarn dlx @santi020k/eslint-config-basic init
yarn dlx @santi020k/eslint-config-basic update
```

```sh [bun]
bunx @santi020k/eslint-config-basic init
bunx @santi020k/eslint-config-basic update
```

:::

## Related Pages

- [Installation](/guide/installation)
- [Configuration](/guide/configuration)
- [v1 to v2 Migration](/guide/migration-v1-to-v2)
- [API Reference](/api/)
