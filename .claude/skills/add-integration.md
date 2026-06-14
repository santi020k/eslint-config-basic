---
name: add-integration
description: Step-by-step guide for adding a new optional integration (library, tool, format, extension, testing) to packages/integrations.
---

# Adding a New Optional Integration

Optional integrations live in `packages/integrations/src/{category}/`. Users opt in via enums.

## TDD: Write tests first

Before any implementation, add the enum to `contracts.test.ts` and `types.test.ts`, run tests, verify RED. See `.claude/skills/testing.md` § TDD Workflow.

## Category Reference

| Category | Enum | Examples |
| :--- | :--- | :--- |
| `tools` | `Tool` | Prettier, Cspell, Jsdoc, Swagger, Docker |
| `libraries` | `Library` | Tailwind, I18next, Stencil, TanstackQuery, Zod |
| `testing` | `Testing` | Vitest, Playwright, Jest, Cypress, TestingLibrary |
| `formats` | `Format` | Mdx, Markdown, Jsonc, Yaml, Toml, Graphql |
| `extensions` | `Extension` | Regexp, Unicorn, Sonarjs, Security, Perfectionist |

## 1. Add the Enum Value (do this before creating factory)

`packages/core/src/types.ts`:
```typescript
export enum Library {
  // ... existing
  MyLib = 'mylib'   // use kebab-case string value
}
```

Then add to `contracts.test.ts` and `types.test.ts` → run `pnpm run test` → expect RED.

## 2. Create the Factory File

`packages/integrations/src/{category}/{name}.ts`:
```typescript
import pluginMyOptional from 'eslint-plugin-myoptional'
import type { TSESLint } from '@typescript-eslint/utils'

export const myOptional: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'integrations/myoptional',
    plugins: { myoptional: pluginMyOptional },
    rules: {
      ...pluginMyOptional.configs.recommended.rules
    }
  }
]
```

**Plugin naming warning**: Some plugins use unexpected names. For example, `better-tailwindcss` config entries do NOT include "tailwind" — check the actual plugin config object before asserting entry names.

**Before adding `ambient.d.ts`**: Check `package.json` for built-in types and search for `@types/*`. See `.claude/workflows/add-ambient-decl.md`.

**Async vs sync**: Format integrations must be async factories returning `Promise<ConfigArray>`. Library/tool/extension integrations are sync. Match the existing pattern for the category.

## 3. Register in the Lazy Loader

`packages/integrations/src/lazy.ts` — add the case for the new enum value following the existing lazy loader pattern. Integration must NOT be eagerly imported.

## 4. Export from Integrations Index

`packages/integrations/src/index.ts`:
```typescript
export { myOptional } from './{category}/{name}.js'
```

## 5. Re-export from Main Package

`packages/basic/src/index.ts` — re-export the new factory following existing patterns.

## 6. Update Tests (Green phase)

Tests were already registered in Red phase. Now make them pass:
- `options.test.ts` — assert a specific rule from the plugin is present
- `detection.test.ts` — if auto-detectable from `package.json` deps
- `composition.test.ts` — assert config entry name appears in composed output
- `public-api.test.ts` — verify enum is accessible from the main package

**Check actual rule names** — don't assume from the plugin package name.

```bash
pnpm run test  # Must be GREEN now
```

## 7. Deepen Coverage (Refactor phase)

- `snapshots.test.ts` — add snapshot for rule names and config entry names
- `pnpm run test` — must still pass

## 8. Update Documentation

- `apps/docs/src/content/docs/tooling/{category}.md` — add the new integration
- `apps/docs/src/content/docs/tooling/overview.md` — keep overview aligned
- `apps/docs/src/content/docs/guide/` — update setup examples if it affects recommended workflows
- `apps/docs/src/content/docs/index.md` — update counts if totals change
- `README.md` — update if a major new capability is introduced

## 9. Validate

```bash
pnpm run build && pnpm run lint && pnpm run test
```

Create a changeset: `pnpm run changeset`
