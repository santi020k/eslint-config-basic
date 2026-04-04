---
name: improve-project
description: Guidelines and context for modifying and extending the @santi020k/eslint-config-basic monorepo.
---

# Improving @santi020k/eslint-config-basic

This skill provides the required context and guidelines for working on the `@santi020k/eslint-config-basic` monorepo. When you are assigned a task to improve or add features to this project, ALWAYS follow these instructions diligently.

## 1. Project Architecture

The project is a Turborepo monorepo using pnpm workspaces. It exports a composable ESLint 9/10+ Flat Config package.

### Monorepo Structure

- `packages/basic` - Main entry point (`@santi020k/eslint-config-basic`); exports `eslintConfig()`
- `packages/core` - Base logic, types, utilities
- `packages/optionals` - Optional feature configurations (e.g., Tailwind, Prettier)
- `packages/{framework}` - Framework-specific configs (typescript, react, next, astro, expo, nest, vue, etc.)

## 2. Key Files to Understand

- `llms.txt` - Project overview and architecture
- `.agent/rules/context.md` - Context, architecture decisions, and known gotchas
- `.agent/rules/guidelines.md` - Detailed coding guidelines and structure rules
- `packages/basic/src/index.ts` - Main entry point that composes configurations
- `packages/core/src/types.ts` - Contains enums for `OptionalOption`, `SettingOption`

## 3. Modification Patterns

### When adding a new Framework Config (as a new package)

1. Create `packages/{name}/` with `package.json`, `tsconfig.json`, `tsup.config.ts`.
2. Create `packages/{name}/src/index.ts` to export the new rule configuration array.
3. Add the framework to the `frameworks` type in `packages/core/src/types.ts`.
4. Import and wire it into the `eslintConfig()` function inside `packages/basic/src/index.ts`.

### When adding a new Optional Config

1. Create the new optional in `packages/optionals/src/{category}/{name}.ts` (category = `tools`, `libraries`, `testing`, `formats`, or `extensions`).
2. Export the optional from `packages/optionals/src/index.ts`.
3. Add the enum value to the appropriate enum in `packages/core/src/types.ts` (`Tool`, `Library`, `Testing`, `Format`, or `Extension`).
4. Import and wire it into `packages/basic/src/optionals.ts` using the matching enum check (e.g. `libraries.includes(Library.X)`).

## 4. Documentation Is Part of the Feature

Treat documentation as required work, not cleanup.

- If you add or publish a new framework package, update the matching framework guide in `packages/docs/frameworks/`, the install/configuration guides, API coverage page, homepage counts/copy, package README, and root `README.md`.
- If you add or publish a new optional integration, update the matching tooling page in `packages/docs/tooling/`, the tooling overview, any affected setup guides, homepage counts/copy, and public README summaries.
- If the docs site changes in a meaningful way, add an entry to `packages/docs/CHANGELOG.md` under `Unreleased`.
- Do not consider the task done if the package exists but the VitePress docs do not explain how to use it.

## 5. Code Conventions

- **Types:** Before adding an `ambient.d.ts` declaration for a library or plugin, ALWAYS check if official types are available (built-in or via `@types/*` packages). Use ambient declarations ONLY as a last resort.
- **ESLint Plugins:** Use direct plugin object references (not string-based resolution) to avoid `FlatCompat` issues.
- **Dependencies:** Ensure peer dependency versions align across the plugin ecosystem. Use `$` references in package.json `overrides` when adding new ESLint plugins.
- **Configs:** Every configuration must return a `TSESLint.FlatConfig.ConfigArray`.
- **Imports:** Use `.js` extensions for local relative imports (crucial for ESM compatibility).

## 6. Verification Commands

Before considering ANY task complete, always validate your changes from the root of the repository with:

```bash
pnpm run build      # Turborepo builds all packages
pnpm run lint       # Lints the entire monorepo
pnpm run test       # Runs the Vitest integration suite
```

### 7. Pull Requests

When creating a Pull Request, always use the project's PR template found at `.github/pull_request_template.md`. Fill out all relevant sections (Description, Type of Change, Packages Affected, Changeset, and Checklist) to ensure a smooth review process.

ALL commands must pass successfully before submitting changes. Do not leave broken setups.
