---
title: "Preact"
description: "Use Preact support from the main v2 package. Application projects no longer install a separate @santi020k/eslint-config-preact package."
---

Use Preact support from the main v2 package. Application projects no longer install a separate `@santi020k/eslint-config-preact` package.

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

The default install above remains recommended. If you use the manual-dependency lite package, install this framework config package too:

```sh title="pnpm"
pnpm add -D @santi020k/eslint-config-lite @santi020k/eslint-config-preact eslint
```

## Configure

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: {
    preact: true
  },
  typescript: true
})
```

Most projects can also rely on auto-detection and use `eslintConfig()` with no framework object.

## What It Adds

- Preact component and Hooks rules.
- Preact JSX pragmas (`h` and `Fragment`) are automatically configured in ESLint to avoid errors for undefined variables.
- Composition through the same `@santi020k/eslint-config-basic` entry point as every other framework.
- Compatibility with advanced overrides if you pass a custom config array or factory instead of `true`.

## Notes

- The internal package still exists in the monorepo for modular development and generated API docs.

## Related Pages

- [Installation](/guide/installation)
- [Configuration](/guide/configuration)
- [v1 to v2 Migration](/guide/migration-v1-to-v2)
