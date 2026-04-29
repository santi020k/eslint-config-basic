# Svelte

Package: [`@santi020k/eslint-config-svelte`](https://www.npmjs.com/package/@santi020k/eslint-config-svelte)

Use the Svelte package for Svelte applications that need explicit framework linting on top of the shared base and TypeScript support.

## Install

::: code-group

```sh [pnpm]
pnpm add -D @santi020k/eslint-config-svelte
```

```sh [npm]
npm install -D @santi020k/eslint-config-svelte
```

```sh [yarn]
yarn add -D @santi020k/eslint-config-svelte
```

```sh [bun]
bun add -d @santi020k/eslint-config-svelte
```

:::

## Configure

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'
import svelte from '@santi020k/eslint-config-svelte'

export default eslintConfig({
  typescript: true,
  frameworks: {
    svelte
  }
})
```

## What It Adds

- Svelte-specific framework rules through an isolated package.
- Clean composition with the main package and TypeScript support.
- Better compatibility with real Svelte projects through the shared playground strategy.

## Notes

- Svelte projects often also enable `typescript: true`.
- Virtual-file behavior is handled in coordination with the TypeScript package.

## Repository Links

- Source Package: [packages/svelte](https://github.com/santi020k/eslint-config-basic/tree/main/packages/svelte)
- Playground: [packages/playground/svelte](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/svelte)

## Related Pages

- [TypeScript](/v1/frameworks/typescript)
- [Configuration](/v1/guide/configuration)
- [Playgrounds](/v1/guide/playgrounds)
