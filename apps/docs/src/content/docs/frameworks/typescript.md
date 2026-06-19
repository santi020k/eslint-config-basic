---
title: "TypeScript"
description: "TypeScript support is enabled from the main v2 package. There is no separate application-level install for TypeScript config."
---

TypeScript support is enabled from the main v2 package. There is no separate application-level install for TypeScript config.

## Install


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


## Using Lite

The lite package already includes TypeScript support, so dependency-sensitive projects can start with:

```sh title="pnpm"
pnpm add -D @santi020k/eslint-config-lite eslint typescript
```

## Configure

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  typescript: true
})
```

If a `tsconfig.json` or `tsconfig.base.json` exists, `eslintConfig()` can detect TypeScript automatically.

## Typed Projects

Use `tsconfigRootDir` when your project layout needs an explicit root for parser options.

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  tsconfigRootDir: import.meta.dirname,
  typescript: true
})
```

## Related Pages

- [Installation](/guide/installation)
- [Configuration](/guide/configuration)
- [v1 TypeScript guide](/v1/frameworks/typescript)
