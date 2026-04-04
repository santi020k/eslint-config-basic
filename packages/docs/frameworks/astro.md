# Astro

Package: [`@santi020k/eslint-config-astro`](https://www.npmjs.com/package/@santi020k/eslint-config-astro)

Use the Astro package when the project contains `.astro` components and embedded scripts that need the shared ESLint baseline.

## Install

::: code-group

```sh [pnpm]
pnpm add -D @santi020k/eslint-config-astro
```

```sh [npm]
npm install -D @santi020k/eslint-config-astro
```

```sh [yarn]
yarn add -D @santi020k/eslint-config-astro
```

```sh [bun]
bun add -d @santi020k/eslint-config-astro
```

:::

## Configure

```js
import astro from '@santi020k/eslint-config-astro'
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  typescript: true,
  frameworks: {
    astro
  }
})
```

## What It Adds

- Astro-specific rules through a dedicated framework package.
- Support for embedded script handling in `.astro` files.
- Compatibility with the TypeScript package’s virtual-file protections.

## Notes

- Astro projects usually enable `typescript: true`, even when most code is inside `.astro` files.
- The TypeScript package disables type-checked rules in generated virtual files where full project-service semantics are not reliable.

## Repository Links

- Source Package: [packages/astro](https://github.com/santi020k/eslint-config-basic/tree/main/packages/astro)
- Playground: [packages/playground/astro](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/astro)

## Related Pages

- [TypeScript](/frameworks/typescript)
- [Configuration](/guide/configuration)
- [Playgrounds](/guide/playgrounds)
