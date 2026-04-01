# CLAUDE.md — AI Agent Guide for @santi020k/eslint-config-basic

This file provides Claude-specific guidance for working in this monorepo. Read this alongside `llms.txt` and `.agent/rules/` before making any changes.

## Priority Reading Order

1. **`llms.txt`** — Quick project overview and commands
2. **`llms-full.txt`** — Deep technical context and architecture decisions
3. **`.agent/rules/context.md`** — Package structure, gotchas, file modification patterns
4. **`.agent/rules/guidelines.md`** — Code conventions, naming, ESLint config patterns
5. **`.agent/skills/`** — Task-specific workflows (add framework, add optional, testing, release)

## Quick Project Summary

`@santi020k/eslint-config-basic` is a composable ESLint 9+ Flat Config package for JS/TS projects. Users opt-in to frameworks and optional integrations rather than getting everything at once.

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig() // auto-detects your stack
```

## Monorepo Layout

```text
packages/
  basic/       ← main entry point — eslintConfig() function
  core/        ← base JS rules, shared types/enums, utilities
  typescript/  ← TypeScript rules
  optionals/   ← all optional integrations (tools/libraries/testing/formats/extensions)
  react/       ← React + Hooks
  next/        ← Next.js
  astro/       ← Astro
  vue/         ← Vue
  svelte/      ← Svelte
  solid/       ← SolidJS
  angular/     ← Angular
  nest/        ← NestJS
  expo/        ← Expo / React Native
  qwik/        ← Qwik
  remix/       ← Remix
  tests/       ← Vitest integration tests
  docs/        ← VitePress documentation site
  playground/  ← 20+ real ESLint environments for manual validation
```

## Key Files

| File | Purpose |
| :--- | :--- |
| `packages/core/src/types.ts` | **Single source of truth** for all enums: `Library`, `Testing`, `Format`, `Tool`, `Extension`, `Setting`, `Runtime`, `Preset` |
| `packages/basic/src/index.ts` | Composes everything into `eslintConfig()` |
| `packages/basic/src/optionals.ts` | Maps enum values → config arrays |
| `packages/basic/src/resolvers.ts` | Framework and preset resolution logic |
| `packages/basic/src/compose.ts` | Strict mode helper |
| `packages/core/src/utils/detection.ts` | Auto-detection logic (reads package.json + tsconfigs) |

## Validation Commands

Always run these from the **repo root** before considering any task done:

```bash
pnpm run build   # Build all packages via Turborepo
pnpm run lint    # ESLint + CSpell + Knip across monorepo
pnpm run test    # Vitest integration suite (packages/tests)
```

## Specialized Skills

Use these for specific tasks — read the relevant SKILL.md before starting:

| Task | Skill File |
| :--- | :--- |
| Add a new framework package | `.agent/skills/add-framework-config/SKILL.md` |
| Add a new optional integration | `.agent/skills/add-optional-config/SKILL.md` |
| Write or update tests | `.agent/skills/testing/SKILL.md` |
| Release & versioning | `.agent/skills/release-process/SKILL.md` |
| General improvements | `.agent/skills/improve-project/SKILL.md` |

## Critical Conventions

- **ESLint 9+ Flat Config only** — no legacy `.eslintrc` support
- **All configs return `TSESLint.FlatConfig.ConfigArray`**
- **`.js` extensions on all relative imports** (ESM requirement)
- **`type` imports** for type-only usage
- **Prettier always last** — applied via `getPrettierConfig()`, never in `getOptionalConfigs()`
- **Lint from root only** — do not add lint scripts to individual packages
- **Ambient `.d.ts` as last resort** — always check `@types/*` or built-in types first

## Virtual Script Files Pattern

Framework files like `.svelte`, `.astro`, `.vue` generate virtual TypeScript script files. These need special ESLint treatment:

```ts
export default {
  name: 'eslint-config-svelte/virtual-script-rules',
  files: ['**/*.svelte/*.ts', '**/*.svelte/*.tsx'],
  rules: {
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'off'
  }
}
```

**Do NOT** add `allowDefaultProject: true` or re-apply `disableTypeChecked` in framework packages — the `typescript` package already handles this correctly.

## Integration Tests — Important Gotcha

When writing integration tests that call `lintText()`, **do not rely on auto-detection** for TypeScript if the test uses a virtual file path. Auto-detection will find the `packages/tests/tsconfig.json` and activate `projectService`, which rejects virtual file paths not registered in a real tsconfig.

Use `typescript: false` when the test doesn't need TS-specific rule checking:

```ts
const config = eslintConfig({ typescript: false, frameworks: { react: reactConfig } })
```

## Common Pitfalls

1. `frameworks.react = true` throws — users must pass the imported config object (e.g., `import reactConfig from '@santi020k/eslint-config-react'`)
2. Plugin loading: use direct plugin object references, not string-based resolution (avoids `FlatCompat` issues)
3. Type exports: may need explicit type annotations to avoid TS2742 errors
4. Peer dependencies: use `$` references in pnpm `overrides` for version alignment
5. The `better-tailwindcss` plugin does NOT include "tailwind" in its config entry names — check for rule prefix `better-tailwindcss/` instead
