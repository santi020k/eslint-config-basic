# Contributing to @santi020k/eslint-config-basic

Thank you for your interest in contributing! This guide will help you get started.

## Prerequisites

- Node.js (version specified in `.nvmrc`)
- pnpm (version specified in `packageManager` of `package.json`)
- corepack (to auto-manage pnpm version)

## Setup

```bash
# Clone the repository
git clone https://github.com/santi020k/eslint-config-basic.git
cd eslint-config-basic

# Enable corepack
corepack enable
corepack use pnpm@11.6.0

# Install dependencies
pnpm install

# Build all packages
pnpm run build
```

## Monorepo Structure

This project uses **Turborepo** with **pnpm Workspaces**. Each ESLint config lives in its own package under `packages/`:

| Package | Path | Description |
| :--- | :--- | :--- |
| `@santi020k/eslint-config-basic` | `packages/basic` | Main entry point — `eslintConfig()` / `defineConfig()` |
| `@santi020k/eslint-config-lite` | `packages/lite` | Lighter variant (no CLI/agent features) |
| `@santi020k/eslint-config-core` | `packages/core` | Core JS rules, types, utilities, detection |
| `@santi020k/eslint-config-typescript` | `packages/typescript` | TypeScript rules |
| `@santi020k/eslint-config-integrations` | `packages/integrations` | Optional configs (Tailwind, Vitest, Drizzle, etc.) |
| `@santi020k/eslint-config-react` | `packages/react` | React + Hooks rules |
| `@santi020k/eslint-config-next` | `packages/next` | Next.js rules |
| `@santi020k/eslint-config-nuxt` | `packages/nuxt` | Nuxt rules |
| `@santi020k/eslint-config-astro` | `packages/astro` | Astro rules |
| `@santi020k/eslint-config-vue` | `packages/vue` | Vue.js rules |
| `@santi020k/eslint-config-svelte` | `packages/svelte` | Svelte rules |
| `@santi020k/eslint-config-solid` | `packages/solid` | Solid.js rules |
| `@santi020k/eslint-config-angular` | `packages/angular` | Angular rules |
| `@santi020k/eslint-config-nest` | `packages/nest` | NestJS rules |
| `@santi020k/eslint-config-hono` | `packages/hono` | Hono rules |
| `@santi020k/eslint-config-expo` | `packages/expo` | Expo / React Native rules |
| `@santi020k/eslint-config-preact` | `packages/preact` | Preact rules |
| `@santi020k/eslint-config-qwik` | `packages/qwik` | Qwik rules |
| `@santi020k/eslint-config-react-router` | `packages/react-router` | React Router v7 rules |
| `@santi020k/eslint-config-tanstack-start` | `packages/tanstack-start` | TanStack Start rules |
| `@santi020k/eslint-config-lit` | `packages/lit` | Lit / Web Components rules |
| `@santi020k/eslint-config-vite` | `packages/vite` | Vite rules |
| `@santi020k/eslint-config-slidev` | `packages/slidev` | Slidev rules |

## TDD Workflow

This project uses **Test-Driven Development**. Write tests before implementation.

For integrations: adding the enum value to `packages/core/src/types.ts` is enough to get a failing `contracts.test.ts` (it auto-iterates `Object.values()`). For frameworks: add test entries in `configs.test.ts` and `composition.test.ts` before the package exists.

See `.claude/skills/testing/SKILL.md` for the full Red → Green → Refactor cycle.

## Adding a New Framework Config

For the full step-by-step guide see `.claude/skills/add-framework/SKILL.md`. Summary:

1. Add `'myframework'` to `DetectedFrameworkName` union and `EslintConfigOptions.frameworks` in `packages/core/src/types.ts`
2. Write tests in `configs.test.ts` and `composition.test.ts` first — run `pnpm run test` to confirm Red
3. Create `packages/myframework/` with `package.json`, `tsconfig.json`, `tsup.config.ts`, `src/index.ts`
4. Register in `frameworkLoaders` Map in `packages/basic/src/frameworks.ts`:
   ```typescript
   ['myframework', async () =>
     (await loadModule<{ myframework: FlatConfigArray }>('@santi020k/eslint-config-myframework')).myframework
   ]
   ```
5. Add to `packages/basic/package.json` as `"@santi020k/eslint-config-myframework": "workspace:^"`
6. Add a playground at `packages/playground/myframework/`
7. Run `pnpm run test` → must be Green
8. Update documentation in `apps/docs/src/content/docs/frameworks/`

## Adding a New Optional Integration

For the full step-by-step guide see `.claude/skills/add-integration/SKILL.md`. Summary:

1. Add the enum value to the appropriate enum in `packages/core/src/types.ts` — this alone makes `contracts.test.ts` fail (Red)
2. Create `packages/integrations/src/{category}/{name}.ts` using `defineLazyConfig` from `../lazy.js`
3. Import and add an `if` block in `packages/integrations/src/compose.ts` inside `getIntegrationConfigs()`
4. Export from `packages/integrations/src/index.ts`
5. Run `pnpm run test` → must be Green
6. Add `.toContain('value')` to `types.test.ts`, rule assertions to `options.test.ts`
7. Update documentation in `apps/docs/src/content/docs/tooling/`

## Available Commands

```bash
pnpm run ok           # All-in-one: install + build + test + lint + typecheck
pnpm run build        # Build all packages (Turborepo)
pnpm run typecheck    # TypeScript check across all packages
pnpm run test         # Run Vitest suite (packages/tests)
pnpm run lint         # ESLint + CSpell + Knip across monorepo
pnpm run lint:fix     # Fix lint issues
pnpm run dev          # Watch mode
pnpm run inspector    # Visual ESLint config inspector
pnpm run changeset    # Create a changeset for your changes
```

## Documentation

Full API documentation is available at [santi020k.github.io/eslint-config-basic](https://santi020k.github.io/eslint-config-basic/).

Documentation governance for current docs versus the `v1` archive is defined in `apps/docs/DOCS_GOVERNANCE.md`.

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
    pnpm run ok
    ```

3. Write clear, descriptive commit messages following conventional commits.
4. **Create a changeset** if your change affects published packages: `pnpm run changeset`. The changeset bot will flag missing changesets on your PR.
5. Update documentation whenever you add or change public framework packages, optional integrations, or user-facing setup flows. This includes the relevant pages in `apps/docs/`, the root `README.md`, and package-level `README.md` files when applicable.
6. Follow `apps/docs/DOCS_GOVERNANCE.md` for current docs vs `v1` archive policy when docs are touched.
7. Follow the **TDD workflow**: write tests before implementation. See `.claude/skills/testing/SKILL.md`.

## Questions?

Open an [issue](https://github.com/santi020k/eslint-config/issues) or start a [discussion](https://github.com/santi020k/eslint-config/discussions).
