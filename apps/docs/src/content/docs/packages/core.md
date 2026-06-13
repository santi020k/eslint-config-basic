---
title: "Core Package"
description: "Package: @santi020k/eslint-config-core"
---

Package: [`@santi020k/eslint-config-core`](https://www.npmjs.com/package/@santi020k/eslint-config-core)

The core package contains the base JavaScript rules, runtime-aware globals, shared utilities, and types that the rest of the monorepo builds on.

## Includes

- Base ESLint and stylistic rules.
- Runtime helpers and environment globals.
- `detectProjectOptions`: Automatically identifies project settings from `package.json` and project structure. Note that this **no longer populates boolean flags** in the `frameworks` object; instead, it reports names via `detectedFrameworks`.
- Shared config types and enums.
- `gitignore` integration.
- Import sort groups — a carefully ordered set of `simple-import-sort` groups with broad framework coverage and optional monorepo customization.

## Main Exports

- `Runtime`
- `Preset`
- `Library`
- `Testing`
- `Format`
- `Tool`
- `Extension`
- `Setting`
- `NextMode`
- `detectProjectOptions`
- `createCoreConfig`
- `coreConfig`
- `groups` — default import sort groups array (used by `simple-import-sort/imports`)
- `createImportGroups` — factory to generate import groups with optional monorepo customization
- `ImportGroupOptions` — TypeScript type for `createImportGroups` options

## Import Sorting

The core package ships a curated set of `simple-import-sort` groups that handle most real-world import patterns automatically. The groups are applied in this order:

| # | Group | Examples |
| :- | :---- | :------- |
| 1 | Side effects | `import 'reflect-metadata'`, `import 'zone.js'` |
| 2 | Node built-ins | `import fs from 'node:fs'`, `import path from 'path'` |
| 3 | Framework virtuals | `virtual:icons`, `astro:content`, `$app/navigation`, `#imports` |
| 4 | Internal UI layer | `components/Button`, `@/pages/Home`, `~/layouts/Main` |
| 5 | Internal app layer | `hooks/useAuth`, `@/utils/format`, `store/user` |
| 6 | Style imports | `./Button.module.css`, `@/styles/globals.scss`, `theme.sass` |
| 7 | Workspace packages *(optional)* | `@acme/shared`, `@myorg/ui` |
| 8 | External npm packages | `react`, `@tanstack/query`, `lodash` |
| 9 | Aliases catch-all | `@/router`, `~/main`, `#subpath/mod` |
| 10 | Parent-relative | `../../shared`, `../utils` |
| 11 | Same-directory | `./index`, `./helpers/format` |

Styles are placed before externals and relative imports so that `./Button.module.css`, `theme.sass`, and `@/styles/globals.scss` all land in the same group regardless of how the path is written.

Internal UI and app layer patterns are placed before external npm packages so that bare paths like `components/Button` or `hooks/useAuth` are never misclassified as npm packages.

### Customizing import groups

For most projects the default `groups` export is all you need — it is used automatically when you consume the core config. If you are working in a monorepo and want to sort your own workspace packages separately from external npm packages, pass `workspacePrefixes` directly to `defineConfig`:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  workspacePrefixes: ['@acme'] // @acme/* sorts before react, lodash, etc.
})
```

If you need the groups array directly (e.g. to inspect or extend it), use `createImportGroups`:

```ts
import { createImportGroups } from '@santi020k/eslint-config-basic'

const groups = createImportGroups({ workspacePrefixes: ['@acme'] })
```

## When to Use It Directly

For most consumers, the main package is the right entry point. Import `core` directly only when you are building your own wrapper or you need the low-level shared utilities.

## Repository Links

- Source Package: [packages/core](https://github.com/santi020k/eslint-config-basic/tree/main/packages/core)
- Project Repository: [santi020k/eslint-config-basic](https://github.com/santi020k/eslint-config-basic)

## Related Pages

- [Basic Package](/packages/basic)
- [Configuration](/guide/configuration)
- [API Reference](/api/)
- [Integrations Package](/packages/integrations)
