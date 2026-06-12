---
title: "Lit"
description: "Use Lit and Web Components support from the main v2 package. Application projects no longer install a separate @santi020k/eslint-config-lit package."
---

Use Lit support from the main v2 package. Application projects no longer install a separate `@santi020k/eslint-config-lit` package.

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
    lit: true
  },
  typescript: true
})
```

Most projects can also rely on auto-detection and use `eslintConfig()` with no framework object.

## What It Adds

- Recommended rules from `eslint-plugin-lit` for Lit element templates and lifecycle usage.
- Recommended rules from `eslint-plugin-wc` for plain Web Components and custom element best practices.
- Composition through the same `@santi020k/eslint-config-basic` entry point as every other framework.
- Compatibility with advanced overrides if you pass a custom config array or factory instead of `true`.

## Notes

- The config applies to both Lit elements and framework-free custom elements, so it also fits design-system packages.
- The internal package still exists in the monorepo for modular development and generated API docs.

## Related Pages

- [Installation](/guide/installation)
- [Configuration](/guide/configuration)
- [v1 to v2 Migration](/guide/migration-v1-to-v2)
