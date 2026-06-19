---
title: "Expo"
description: "Use Expo support from the main v2 package. Application projects no longer install a separate @santi020k/eslint-config-expo package."
---

Use Expo support from the main v2 package. Application projects no longer install a separate `@santi020k/eslint-config-expo` package.

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
pnpm add -D @santi020k/eslint-config-lite @santi020k/eslint-config-expo eslint
```

## Configure

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: {
    expo: true
  },
  typescript: true
})
```

Most projects can also rely on auto-detection and use `eslintConfig()` with no framework object.

## What It Adds

- Expo and React rules. React is included automatically.
- Composition through the same `@santi020k/eslint-config-basic` entry point as every other framework.
- Compatibility with advanced overrides if you pass a custom config array or factory instead of `true`.

## Notes

- The internal package still exists in the monorepo for modular development and generated API docs.
- For the old multi-package installation model, see the [v1 Expo guide](/v1/frameworks/expo).

## Related Pages

- [Installation](/guide/installation)
- [Configuration](/guide/configuration)
- [v1 to v2 Migration](/guide/migration-v1-to-v2)
