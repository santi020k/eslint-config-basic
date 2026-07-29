---
title: "Move from Lite to Basic"
description: "In v3, basic replaces lite as the modular default."
---

`@santi020k/eslint-config-lite` introduced manual framework and integration
dependency ownership in v2. Version 3 brings that model to the main
`@santi020k/eslint-config-basic` package.

Change the package and import:

```sh
pnpm remove @santi020k/eslint-config-lite
pnpm add -D eslint @santi020k/eslint-config-basic
```

```diff
- import { defineConfig } from '@santi020k/eslint-config-lite'
+ import { defineConfig } from '@santi020k/eslint-config-basic'
```

Or simplify a zero-config file:

```js
export { default } from '@santi020k/eslint-config-basic/recommended'
```

Keep the framework config packages already installed by the lite project.
Replace the integrations aggregate with the granular category packs when you
want the smallest dependency tree; keeping the aggregate remains supported.
The composer option names remain the same.

See the complete [v2 to v3 migration guide](/guide/migration-v2-to-v3/).
