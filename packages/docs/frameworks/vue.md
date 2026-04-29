# Vue

Use Vue support from the main v2 package. Application projects no longer install a separate `@santi020k/eslint-config-vue` package.

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
  typescript: true,
  frameworks: {
    vue: true
  }
})
```

Most projects can also rely on auto-detection and use `eslintConfig()` with no framework object.

## What It Adds

- Vue single-file component rules.
- Composition through the same `@santi020k/eslint-config-basic` entry point as every other framework.
- Compatibility with advanced overrides if you pass a custom config array or factory instead of `true`.

## Notes

- The internal package still exists in the monorepo for modular development and generated API docs.
- For the old multi-package installation model, see the [v1 Vue guide](/v1/frameworks/vue).

## Related Pages

- [Installation](/guide/installation)
- [Configuration](/guide/configuration)
- [v1 to v2 Migration](/guide/migration-v1-to-v2)
