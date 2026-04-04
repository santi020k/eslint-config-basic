---
name: add-framework-config
description: How to add a new framework configuration to the @santi020k/eslint-config-basic monorepo.
---

# Adding a New Framework Config

Follow these strictly defined steps to add a new framework ESLint configuration to the monorepo.

## 1. Create the Package Structure

```bash
mkdir -p packages/myframework/src
```

## 2. Setup `package.json`

Create `packages/myframework/package.json`. Copy the structure from an existing framework like `packages/svelte/package.json` and adjust the name and peer dependencies:

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
  },
  "devDependencies": {
    "eslint-plugin-myframework": "...",
    "tsup": "^8.5.1",
    "typescript": "^5.9.3",
    "@typescript-eslint/utils": "^8.54.0"
  }
}
```

## 3. Setup TypeScript and Build Configs

Create `packages/myframework/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

Create `packages/myframework/tsup.config.ts` (copy from an existing package like `packages/svelte/tsup.config.ts`).

## 4. Handle Types and Ambient Declarations

If the framework plugin doesn't have built-in TypeScript types:

1. **Search for official types**: Check if a `@types/*` package exists.
2. **Install types**: If available, add as a dev dependency.
3. **Ambient declarations as last resort**: Only create `packages/myframework/src/ambient.d.ts` if no official types exist anywhere.

## 5. Implement the Configuration

Create `packages/myframework/src/index.ts`. All configs must return `TSESLint.FlatConfig.ConfigArray`:

```typescript
import pluginMyframework from 'eslint-plugin-myframework'

import type { TSESLint } from '@typescript-eslint/utils'

export const myframeworkConfig: TSESLint.FlatConfig.ConfigArray = [
  ...pluginMyframework.configs['flat/recommended'],
  {
    name: 'eslint-config-myframework/rules',
    files: ['**/*.myext'],
    rules: {
      'myframework/some-rule': 'warn'
    }
  }
]
```

### If the framework generates virtual script files (e.g., `.svelte`, `.astro`, `.vue`, `.qwik`)

Add a dedicated block for virtual TypeScript files. **Do NOT** add `allowDefaultProject: true` or re-apply `disableTypeChecked` — the `typescript` package already handles this:

```typescript
export default {
  name: 'eslint-config-myframework/virtual-script-rules',
  files: ['**/*.myext/*.ts', '**/*.myext/*.tsx'],
  rules: {
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'off'
  }
}
```

## 6. Wire into the Core Project

### `packages/core/src/types.ts`

Add the new framework to the `frameworks` interface:

```typescript
export interface FrameworkOptions {
  // ... existing frameworks
  myframework?: TSESLint.FlatConfig.ConfigArray
}
```

### `packages/basic/src/index.ts`

Import and wire the framework:

```typescript
// Add to imports section
// (framework configs are resolved lazily — follow the existing pattern)

// Add to eslintConfig() frameworks handling
configs.push(...resolveFramework('myframework', frameworks.myframework))
```

### `packages/basic/package.json`

Add the new package as an optional peer dependency:

```json
"peerDependencies": {
  "@santi020k/eslint-config-myframework": "*"
},
"peerDependenciesMeta": {
  "@santi020k/eslint-config-myframework": { "optional": true }
}
```

## 7. Add a Playground

Create a minimal playground at `packages/playground/myframework/` to allow manual validation. Copy the structure from an existing playground (e.g., `packages/playground/svelte/`) and adjust for the new framework.

The playground must have:

- `package.json` with the framework as a dependency
- `eslint.config.js` using `eslintConfig({ frameworks: { myframework: myframeworkConfig } })`
- At least one sample file in the framework's format

## 8. Update Tests

Read `.agent/skills/testing/SKILL.md` for full details. In summary, update:

- **`packages/tests/package.json`** — add `@santi020k/eslint-config-myframework` as a devDependency
- **`configs.test.ts`** — import the config and assert it has length > 0
- **`composition.test.ts`** — assert the config entry name appears when the framework is passed
- **`snapshots.test.ts`** — add rule name and entry name snapshot tests
- **`options.test.ts`** — assert a framework-specific rule is present
- **`detection.test.ts`** — add a detection test if the framework is auto-detectable

## 9. Update Documentation

Documentation updates are required whenever a new framework package is added or a published framework package changes in a user-visible way.

At minimum, review and update:

- **`packages/docs/frameworks/{name}.md`** — add or expand the dedicated framework guide
- **`packages/docs/guide/installation.md`** — add the package to install examples and the framework matrix
- **`packages/docs/guide/configuration.md`** — add the framework to the framework matrix and related examples when needed
- **`packages/docs/api/index.md`** — update covered package lists when docs coverage changes
- **`packages/docs/index.md`** and **`packages/docs/.vitepress/theme/components/HomePageSections.vue`** — update homepage counts, framework lists, or marketing copy when totals change
- **`packages/{name}/README.md`** — keep the package README aligned with the canonical docs link
- **`README.md`** — update public package coverage lists when a new published package is introduced
- **`packages/docs/CHANGELOG.md`** — add an unreleased documentation note when the docs site meaningfully changes

If a framework package is published, the docs should already explain how to install it, when to combine it with other packages, and where to find its dedicated guide.

## 10. Validate

Run all checks from the repo root before considering the task done:

```bash
pnpm run build && pnpm run lint && pnpm run test
```

All three must pass.
