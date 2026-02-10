# Contributing to @santi020k/eslint-config-basic

Thank you for your interest in contributing! This guide will help you get started.

## Prerequisites

- Node.js (version specified in `.nvmrc`)
- npm

## Setup

```bash
# Clone the repository
git clone https://github.com/santi020k/eslint-config-basic.git
cd eslint-config-basic

# Install dependencies
npm install

# Build all packages
npm run build
```

## Monorepo Structure

This project uses **Turborepo** with **npm Workspaces**. Each ESLint config lives in its own package under `packages/`:

| Package | Path | Description |
|---------|------|-------------|
| `@santi020k/eslint-config-basic` | `packages/basic` | Main entry point, composes all configs |
| `@santi020k/eslint-config-core` | `packages/core` | Core JS rules, types, utilities |
| `@santi020k/eslint-config-typescript` | `packages/typescript` | TypeScript rules |
| `@santi020k/eslint-config-react` | `packages/react` | React + Hooks rules |
| `@santi020k/eslint-config-next` | `packages/next` | Next.js rules |
| `@santi020k/eslint-config-astro` | `packages/astro` | Astro rules |
| `@santi020k/eslint-config-expo` | `packages/expo` | Expo/React Native rules |
| `@santi020k/eslint-config-optionals` | `packages/optionals` | Optional configs (Tailwind, Vitest, etc.) |

## Adding a New Framework Config

1. **Create the package directory:**

   ```bash
   mkdir -p packages/myframework/src
   ```

2. **Create `packages/myframework/package.json`:**

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
     "files": ["dist"],
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

3. **Create `packages/myframework/tsconfig.json`:**

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

4. **Create `packages/myframework/tsup.config.ts`** (copy from an existing package).

5. **Create `packages/myframework/src/index.ts`:**

```typescript
import type { TSESLint } from '@typescript-eslint/utils'

export const myframeworkConfig: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config/myframework',
    rules: {
      // Add your rules here
    }
  }
]
```

6. **Add to `ConfigOption` enum** in `packages/core/src/types.ts`.

7. **Wire into `eslintConfig()`** in `packages/basic/src/index.ts`.

8. **Add tests** in `packages/tests/src/`.

## Adding a New Optional

1. Create `packages/optionals/src/configs/myoptional.ts` with your config.
2. Export from `packages/optionals/src/index.ts`.
3. Add to `OptionalOption` enum in `packages/core/src/types.ts`.
4. Wire into `eslintConfig()` in `packages/basic/src/index.ts`.

## Available Commands

```bash
npm run build      # Build all packages (Turborepo)
npm run lint       # Lint entire monorepo
npm run lint:fix   # Fix lint issues
npm run test       # Run tests (Vitest)
npm run dev        # Watch mode
npm run inspector  # Visual ESLint config inspector
```

## Commit Conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Use one of the following prefixes:

- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation only
- `style:` — Formatting, no code change
- `refactor:` — Code restructuring
- `perf:` — Performance improvement
- `test:` — Adding or updating tests
- `build:` — Build system changes
- `ci:` — CI/CD changes
- `chore:` — Maintenance tasks
- `revert:` — Revert a previous commit

You can use the interactive commit helper:

```bash
npx cz
```

## Pull Request Guidelines

1. Fork the repository and create your branch from `main`.
2. Make sure all checks pass:
   ```bash
   npm run build && npm run lint && npm run test
   ```
3. Write clear, descriptive commit messages following conventional commits.
4. Update documentation if you're changing public APIs.
5. Add tests for new functionality.

## Questions?

Open an [issue](https://github.com/santi020k/eslint-config/issues) or start a [discussion](https://github.com/santi020k/eslint-config/discussions).
