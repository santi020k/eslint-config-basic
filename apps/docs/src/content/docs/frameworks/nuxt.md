---
title: "Nuxt"
description: "Use Nuxt support from the main v2 package. Application projects no longer install a separate @santi020k/eslint-config-nuxt package."
---

Use Nuxt support from the main v2 package. Application projects no longer install a separate `@santi020k/eslint-config-nuxt` package.

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


## Configure

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: {
    nuxt: true,
    vue: true
  },
  typescript: true
})
```

Most projects can also rely on auto-detection and use `eslintConfig()` with no framework object — when Nuxt is detected, both the Nuxt and Vue configs are enabled automatically.

## What It Adds

- Nuxt-specific rules from `@nuxt/eslint-plugin`, including `nuxt/prefer-import-meta`.
- Runtime-aware globals for `server/` directory files and `nuxt.config.*`.
- Composition through the same `@santi020k/eslint-config-basic` entry point as every other framework.
- Compatibility with advanced overrides if you pass a custom config array or factory instead of `true`.

## Notes

- Pair this config with the [Vue config](/frameworks/vue) — auto-detection handles this for you.
- The internal package still exists in the monorepo for modular development and generated API docs.

## Related Pages

- [Vue](/frameworks/vue)
- [Installation](/guide/installation)
- [Configuration](/guide/configuration)
