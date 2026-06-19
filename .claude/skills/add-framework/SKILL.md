---
name: add-framework
description: Step-by-step guide for adding a new framework package to the monorepo.
---

# Adding a New Framework Config

Framework packages live at `packages/{name}/` and are lazy-loaded via a `Map` in `packages/basic/src/frameworks.ts`.

## How Framework Wiring Works

`packages/basic/src/frameworks.ts` maintains `frameworkLoaders: Map<FrameworkName, FrameworkLoader>`. Each entry is an async function that uses `loadModule()` to import the framework package's named export on demand. The package is only loaded when the framework is actually enabled — keeping startup cheap.

```typescript
// Pattern used for all frameworks:
['myframework', async () =>
  (await loadModule<{ myframework: FlatConfigArray }>('@santi020k/eslint-config-myframework')).myframework
]
```

This means the framework package must export a named export that matches what `frameworkLoaders` expects.

## Step 1 — Update types (triggers Red)

`packages/core/src/types.ts` — add to the `DetectedFrameworkName` union AND the `EslintConfigOptions.frameworks` interface:

```typescript
export type DetectedFrameworkName =
  // ... existing
  | 'myframework'

export interface EslintConfigOptions {
  frameworks?: {
    // ... existing
    myframework?: ImportedFramework
  }
}
```

Unlike integrations, `contracts.test.ts` does NOT test framework enum coverage — framework tests are manual. Add test entries in `configs.test.ts` and `composition.test.ts` before building the package to get a Red state:

```bash
pnpm run test  # → RED: import or assertion fails because package doesn't exist yet
```

## Step 2 — Create the package structure

```bash
mkdir -p packages/myframework/src
```

Copy `package.json`, `tsconfig.json`, `tsup.config.ts` from a similar framework (e.g., `packages/hono/` for a minimal framework, `packages/svelte/` for one with virtual script files).

`packages/myframework/package.json`:
```json
{
  "name": "@santi020k/eslint-config-myframework",
  "version": "0.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": { "build": "tsup", "dev": "tsup --watch", "clean": "rm -rf dist" },
  "dependencies": { "@santi020k/eslint-config-core": "*" },
  "peerDependencies": { "eslint-plugin-myframework": ">=1.0.0" },
  "devDependencies": { "eslint-plugin-myframework": "..." }
}
```

## Step 3 — Handle types

Before adding `ambient.d.ts`:
1. Check `package.json` of the plugin for `types`/`typings` field
2. `npm info @types/eslint-plugin-myframework` — check for official types
3. Only create `src/ambient.d.ts` as last resort — see `.claude/workflows/add-ambient-decl.md`

## Step 4 — Implement the config

`packages/myframework/src/index.ts`:
```typescript
import pluginMyframework from 'eslint-plugin-myframework'
import type { TSESLint } from '@typescript-eslint/utils'

export const myframework: TSESLint.FlatConfig.ConfigArray = [
  ...pluginMyframework.configs['flat/recommended'],
  {
    name: 'eslint-config-myframework/rules',
    files: ['**/*.myext'],
    rules: { 'myframework/some-rule': 'warn' }
  }
]
```

### If the framework generates virtual script files (.svelte, .astro, .vue, .qwik)

Add a dedicated block — **do NOT** add `allowDefaultProject: true` or re-apply `disableTypeChecked` (the `typescript` package already handles this):

```typescript
{
  name: 'eslint-config-myframework/virtual-script-rules',
  files: ['**/*.myext/*.ts', '**/*.myext/*.tsx'],
  rules: {
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'off'
  }
}
```

## Step 5 — Wire into frameworkLoaders Map

`packages/basic/src/frameworks.ts` — add an entry to `frameworkLoaders`:

```typescript
const frameworkLoaders = new Map<FrameworkName, FrameworkLoader>([
  // ... existing entries
  ['myframework', async () =>
    (await loadModule<{ myframework: FlatConfigArray }>('@santi020k/eslint-config-myframework')).myframework
  ]
])
```

The named export in the loader must match what `packages/myframework/src/index.ts` actually exports. Check existing entries for the exact pattern (some export `xConfig`, some export `x`, some export `default`).

## Step 6 — Add workspace dependency

`packages/basic/package.json`:
```json
"dependencies": {
  "@santi020k/eslint-config-myframework": "workspace:^"
}
```

## Step 7 — Add a Playground

`packages/playground/myframework/` — copy from an existing playground and adjust:
- `package.json` with the framework as a dependency
- `eslint.config.js` using `eslintConfig({ frameworks: { myframework: true } })`
- At least one sample file in the framework's format

## Step 8 — Update tests (Green phase)

The tests written in Step 1 should now pass. Also add:
- `packages/tests/package.json` — add `@santi020k/eslint-config-myframework` as devDependency
- `configs.test.ts` — import and assert `config.length > 0`, check plugin object
- `composition.test.ts` — assert config entry name appears when framework is passed
- `options.test.ts` — assert a framework-specific rule is present
- `snapshots.test.ts` — rule name and entry name snapshots
- `detection.test.ts` — if the framework is auto-detectable from `package.json` deps

```bash
pnpm run test  # → GREEN
```

## Step 9 — Update Documentation

Follow the full checklist in `.claude/skills/docs-updater/SKILL.md` § After Adding a New Framework.

Key files:
- `apps/docs/src/content/docs/frameworks/{name}.md` — new framework guide; register in sidebar (`astro.config.mjs`)
- `apps/docs/src/content/docs/guide/installation.md` — add to framework matrix
- `apps/docs/src/content/docs/guide/configuration.md` — add usage examples
- `apps/docs/src/content/docs/index.mdx` — update counts/copy
- `README.md` — update public package list
- Run `pnpm run docs:sync-readmes` to regenerate package READMEs

## Step 10 — Validate and changeset

```bash
pnpm run build && pnpm run lint && pnpm run test
pnpm run changeset
```
