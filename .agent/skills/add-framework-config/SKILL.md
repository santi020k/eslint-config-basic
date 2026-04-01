---
name: add-framework-config
description: How to add a new framework configuration to the @santi020k/eslint-config-basic monorepo.
---

# Adding a New Framework Config

Follow these strictly defined steps to add a new framework ESLint configuration to the monorepo.

## 1. Create the Package Structure

Create a new directory under `packages/` (e.g., `packages/myframework/src`):

```bash
mkdir -p packages/myframework/src
```

## 2. Setup `package.json`

Create `packages/myframework/package.json`. Make sure to include `@santi020k/eslint-config-core` as a dependency and the required dev dependencies:

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
  "devDependencies": {
    "tsup": "^8.5.1",
    "typescript": "^5.9.3",
    "@typescript-eslint/utils": "^8.54.0"
  }
}
```

## 3. Setup TypeScript and Build Configs

Create `tsconfig.json`:

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

Create `tsup.config.ts` (You can copy this from an existing package like `packages/react/tsup.config.ts`).

## 4. Implement the Configuration

Create `packages/myframework/src/index.ts`. Ensure it returns a `TSESLint.FlatConfig.ConfigArray`:

```typescript
import type { TSESLint } from '@typescript-eslint/utils'

export const myframeworkConfig: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config/myframework',
    rules: {
      // framework specific rules
    }
  }
]
```

## 5. Handle Types and Ambient Declarations

If the framework or its plugins don't have built-in TypeScript types:

1. **Search for official types**: Check if a `@types/*` package exists for the library or plugin.
2. **Install types**: If available, install them as a dev dependency in the package.
3. **Use Ambient Declarations ONLY as a last resort**: Only create a `packages/myframework/src/ambient.d.ts` file if no official types are available.

## 6. Wire into the Core Project

1. Add your framework to the `frameworks` type in `packages/core/src/types.ts`.
2. Update `packages/basic/src/index.ts`:
   - Import the new config from `@santi020k/eslint-config-myframework`.
   - Export it from `packages/basic`.
   - Wire it into the `eslintConfig()` function in `packages/basic/src/index.ts` by adding it to the `frameworks` object handling via `resolveFramework('myframework', frameworks.myframework)`.

## 7. Validate

Run the validation commands from the repo root to ensure everything connects perfectly:

```bash
npm run build && npm run lint && npm run test
```
