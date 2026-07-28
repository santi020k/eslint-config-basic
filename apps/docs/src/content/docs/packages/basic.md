---
title: "Basic Package"
description: "The lean default package for v3."
---

Package: [`@santi020k/eslint-config-basic`](https://www.npmjs.com/package/@santi020k/eslint-config-basic)

This is the recommended v3 package. It owns the composer, core JavaScript
rules, TypeScript support, public options, and the `basic-eslint` CLI.
Framework and integration packages are optional peers.

## Minimal usage

```js
export { default } from '@santi020k/eslint-config-basic/recommended'
```

## Custom usage

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: { react: true },
  strict: 'ci',
  typescript: 'strict'
}, {
  files: ['scripts/**/*.js'],
  rules: { 'no-console': 'off' }
})
```

Install `@santi020k/eslint-config-react` for that example. Install
`@santi020k/eslint-config-integrations` when using optional libraries, testing,
formats, tools, or extensions.

The package has a four-direct-dependency release budget. Its production tree is
checked independently from the full bundle.

See [Installation](/guide/installation/), [Full Package](/packages/full/), and
[Migrate from v2](/guide/migration-v2-to-v3/).
