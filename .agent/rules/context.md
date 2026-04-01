---
trigger: always_on
---

# Context

## Priority Reading Order

1. **`llms.txt`** - Project overview and architecture
2. **`packages/basic/src/index.ts`** - Main entry point composing all configs
3. **`packages/core/src/types.ts`** - All enums (Library, Testing, Format, Tool, Extension, Runtime, Preset, etc.)
4. **`./guidelines.md`** - Detailed coding guidelines

## Project Summary

This is `@santi020k/eslint-config-basic`, a composable ESLint 9 Flat Config package supporting:

- JavaScript, TypeScript, React, Next.js, Astro, Expo
- Optional integrations: Tailwind, Vitest, cspell, i18next, MDX, Markdown, Stencil

## Monorepo Architecture

This project uses **Turborepo** with **pnpm Workspaces** for modular package management.

### Package Structure

| Package | Location | Purpose |
| :--- | :--- | :--- |
| `@santi020k/eslint-config-core` | `packages/core` | Base JS config, utilities, types |
| `@santi020k/eslint-config-typescript` | `packages/typescript` | TypeScript rules |
| `@santi020k/eslint-config-react` | `packages/react` | React + Hooks |
| `@santi020k/eslint-config-next` | `packages/next` | Next.js core-web-vitals |

### Dependency Graph

```text
core → typescript → react → next
```

## Key Architecture Decisions

### Flat Config Only

This package only supports ESLint 9+ flat config format. No legacy `.eslintrc` support.

### Composable Design

Users select configs via direct options rather than extending named configs:

```js
eslintConfig({ typescript: true, frameworks: { react: true } })
```

### Dependency Alignment

Uses pnpm `overrides` with `$` references to align peer dependency versions across the plugin ecosystem. Prioritize official type packages over ambient declarations.

## Validation Workflow

Always validate changes with:
```bash
pnpm run build && pnpm run lint && pnpm run test
```

All commands must pass before considering work complete.

## Known Issues / Gotchas

1. **FlatCompat issues**: Some legacy plugins don't resolve correctly. Use direct plugin object imports.
2. **TS2742 errors**: Export explicit types when inferred types reference internal modules.
3. **Plugin version conflicts**: Check `overrides` in package.json when adding new ESLint plugins.
4. **Workspace lint**: Lint runs from root only, not from individual packages.
5. **Ambient Declarations**: Prioritize official `@types/*` package replacements or built-in types. Use `ambient.d.ts` only when no official types exist.

## File Modification Patterns

### When adding a new framework config (as a package)

1. Create `packages/{name}/` with `package.json`, `tsconfig.json`, `tsup.config.ts`
2. Create `packages/{name}/src/index.ts` exporting the config
3. Add to `frameworks` type in `packages/core/src/types.ts`
4. Wire into `eslintConfig()` function in `packages/basic/src/index.ts`

### When adding a new optional

1. Create `packages/optionals/src/{category}/{name}.ts` (category = `tools`, `libraries`, `testing`, `formats`, or `extensions`)
2. Export from `packages/optionals/src/index.ts`
3. Add to the appropriate enum in `packages/core/src/types.ts` (`Tool`, `Library`, `Testing`, `Format`, or `Extension`)
4. Wire into `packages/basic/src/optionals.ts` using the matching enum check (e.g. `libraries.includes(Library.X)`)
