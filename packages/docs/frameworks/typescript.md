# TypeScript

TypeScript support is enabled from the main v2 package. There is no separate application-level install for TypeScript config.

## Install

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

## Configure

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  typescript: true
})
```

If a `tsconfig.json` or `tsconfig.base.json` exists, `eslintConfig()` can detect TypeScript automatically.

## Typed Projects

Use `tsconfigRootDir` when your project layout needs an explicit root for parser options.

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  typescript: true,
  tsconfigRootDir: import.meta.dirname
})
```

## Related Pages

- [Installation](/guide/installation)
- [Configuration](/guide/configuration)
- [v1 TypeScript guide](/v1/frameworks/typescript)
