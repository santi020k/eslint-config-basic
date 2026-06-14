---
name: add-framework
description: Step-by-step guide for adding a new framework package to the monorepo.
---

# Adding a New Framework Config

Follow these steps in order. Read `.agent/rules/guidelines.md` for code conventions.

## TDD: Write tests first

Before any implementation, add the framework to `contracts.test.ts` and `types.test.ts`, then verify tests are RED. See `.claude/skills/testing.md` § TDD Workflow.

## 1. Create the Package Structure

```bash
mkdir -p packages/myframework/src
```

## 2. Setup `package.json`

Copy from an existing framework (e.g., `packages/svelte/package.json`) and adjust:

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
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@santi020k/eslint-config-core": "*"
  },
  "peerDependencies": {
    "eslint-plugin-myframework": ">=1.0.0"
  }
}
```

## 3. Setup TypeScript and Build Configs

`packages/myframework/tsconfig.json`:
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": { "outDir": "./dist", "rootDir": "./src" },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

Copy `tsup.config.ts` from an existing framework package.

## 4. Handle Types

Before adding `ambient.d.ts`:
1. Check `package.json` for `types`/`typings` field
2. Search for `@types/eslint-plugin-myframework`
3. Only create `src/ambient.d.ts` as a last resort — see `.claude/workflows/add-ambient-decl.md`

## 5. Implement the Configuration

`packages/myframework/src/index.ts`:
```typescript
import pluginMyframework from 'eslint-plugin-myframework'
import type { TSESLint } from '@typescript-eslint/utils'

export const myframeworkConfig: TSESLint.FlatConfig.ConfigArray = [
  ...pluginMyframework.configs['flat/recommended'],
  {
    name: 'eslint-config-myframework/rules',
    files: ['**/*.myext'],
    rules: { 'myframework/some-rule': 'warn' }
  }
]
```

### If the framework generates virtual script files (.svelte, .astro, .vue, .qwik)

Add a virtual script block — **do NOT** add `allowDefaultProject: true` or re-apply `disableTypeChecked`:
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

## 6. Wire into Core

### `packages/core/src/types.ts`
```typescript
export type DetectedFrameworkName = /* existing */ | 'myframework'

export interface EslintConfigOptions {
  frameworks?: { /* existing */ myframework?: ImportedFramework }
}
```

### `packages/basic/src/frameworks.ts`
Add lazy loader registration following the existing pattern.

### `packages/basic/src/index.ts`
```typescript
configs.push(...resolveFramework('myframework', frameworks.myframework))
```

### `packages/basic/package.json`
```json
"dependencies": {
  "@santi020k/eslint-config-myframework": "workspace:^"
}
```

## 7. Add a Playground

Create `packages/playground/myframework/` from an existing playground. Minimum:
- `package.json` with the framework as a dependency
- `eslint.config.js` using `eslintConfig({ frameworks: { myframework: true } })`
- At least one sample file in the framework's format

## 8. Update Tests (Green phase)

See `.claude/skills/testing.md` § Adding New Tests. Tests were already written in Red phase — now make them pass:
- `packages/tests/package.json` — add the new package as devDependency
- `configs.test.ts`, `composition.test.ts`, `snapshots.test.ts`, `options.test.ts`, `detection.test.ts`

## 9. Update Documentation

Required whenever a new framework package is published:
- `apps/docs/src/content/docs/frameworks/{name}.md` — add framework guide; register in sidebar (`astro.config.mjs`)
- `apps/docs/src/content/docs/guide/installation.md` — add to framework matrix
- `apps/docs/src/content/docs/guide/configuration.md` — add examples
- `apps/docs/src/content/docs/api/index.md` — update package coverage
- `apps/docs/src/content/docs/index.md` — update counts/copy
- `packages/{name}/README.md` — keep aligned with docs
- `README.md` — update public package lists

## 10. Validate

```bash
pnpm run build && pnpm run lint && pnpm run test
```

All three must pass. Create a changeset: `pnpm run changeset`
