---
name: add-integration
description: Step-by-step guide for adding a new optional integration (Library, Tool, Format, Extension, Testing) to packages/integrations.
---

# Adding a New Optional Integration

Optional integrations live in `packages/integrations/src/{category}/`. The wiring hub is `packages/integrations/src/compose.ts`.

## Category Reference

| Category | Enum | Examples |
| :--- | :--- | :--- |
| `extensions/` | `Extension` | A11y, BestPractices, Biome, Regexp, Security, Unicorn, Perfectionist |
| `formats/` | `Format` | Css, Graphql, Html, Jsonc, Markdown, Mdx, PackageJson, Toml, Yaml |
| `libraries/` | `Library` | AiSdk, Drizzle, Prisma, Tailwind, TanstackQuery, Zod, Mastra, Mcp |
| `testing/` | `Testing` | Cypress, Jest, JestDom, Playwright, TestingLibrary, Vitest |
| `tools/` | `Tool` | Cspell, Docker, GithubActions, Jsdoc, Nx, Pnpm, Prettier, Swagger |

## How Wiring Works

`packages/integrations/src/compose.ts` exports `getIntegrationConfigs()` — a large function that receives enum arrays and manually maps each value to its factory via `if` blocks. This is the **only place** where enum values are connected to configs. Adding an enum to `types.ts` plus a factory file is not enough — you must add the `if` block in `compose.ts`.

## Step 1 — Add the enum value (triggers Red)

`packages/core/src/types.ts`:
```typescript
export enum Library {
  // ... existing values
  MyLib = 'my-lib'  // kebab-case string value
}
```

`contracts.test.ts` automatically iterates `Object.values(Library)` — no manual test update needed for contracts. Just adding the enum is enough to get the Red state.

```bash
pnpm run test  # → RED: "Library 'my-lib' is not mapped" — correct, expected
```

## Step 2 — Create the factory file

`packages/integrations/src/{category}/{name}.ts`:

**Standard pattern (peer dependency, async):**
```typescript
import { GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'
import { defineLazyConfig, loadDefault, type PluginWithConfigs } from '../lazy.js'

export const myLib: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('my-lib', async () => {
  const plugin = await loadDefault<PluginWithConfigs<'recommended'>>('eslint-plugin-mylib')

  return [
    {
      ...plugin.configs.recommended,
      files: GLOB_JS_TS_ALL,
      name: 'santi020k/my-lib/recommended'
    }
  ]
})
```

**Simple pattern (no peer deps, sync):**
```typescript
import type { TSESLint } from '@typescript-eslint/utils'

export const myLib = (): TSESLint.FlatConfig.ConfigArray => [
  {
    name: 'santi020k/my-lib/rules',
    rules: { 'my-rule': 'warn' }
  }
]
```

Use `defineLazyConfig` when the integration imports optional peer dependencies — it wraps the load with a helpful error if the dep isn't installed. Use the sync pattern only for integrations with no optional peer deps.

**Before creating `ambient.d.ts`**: Always check for built-in types or `@types/*` first. See `.claude/workflows/add-ambient-decl.md`.

**Plugin naming**: Some plugins use unexpected names in their recommended configs. Check the actual plugin object — don't assume naming from the package name (e.g., `better-tailwindcss` configs don't contain "tailwind" in entry names).

## Step 3 — Wire in compose.ts

`packages/integrations/src/compose.ts` — add import and `if` block inside `getIntegrationConfigs()`:

```typescript
// At the top with other imports:
import { myLib } from './libraries/my-lib.js'

// Inside getIntegrationConfigs(), in the right category section:
if (libraries.includes(Library.MyLib)) configs.push(...await myLib())
```

**Ordering matters.** Prettier must always be last (it's in `getPrettierConfig()`, never in `getIntegrationConfigs()`). Place new entries near similar existing integrations, not at the bottom.

## Step 4 — Export from integrations index

`packages/integrations/src/index.ts`:
```typescript
export { myLib } from './libraries/my-lib.js'
```

## Step 5 — Verify Green

```bash
pnpm run test  # → GREEN: contracts test passes for the new enum value
```

If still red after wiring: check the `if` block condition matches the exact enum value, and that `compose.ts` actually imports from the right path.

## Step 6 — Update types.test.ts

`packages/tests/src/types.test.ts` — add a `.toContain()` assertion in the right describe block:
```typescript
expect(options).toContain('my-lib')
```

## Step 7 — Deepen coverage (Refactor phase)

**`options.test.ts`** — assert a specific rule from the integration is present:
```typescript
it('should include my-lib rules', async () => {
  const config = await eslintConfig({ libraries: [Library.MyLib] })
  const rules = extractRuleNames(config as Record<string, unknown>[])

  expect(rules.some(r => r.startsWith('mylib/'))).toBe(true)
})
```

**`detection.test.ts`** — if the integration can be auto-detected from `package.json` deps:
```typescript
it('should detect my-lib from package.json', () => {
  const options = detectProjectOptions({ dependencies: { 'my-lib': '1.0.0' } })

  expect(options.libraries).toContain(Library.MyLib)
})
```

**`snapshots.test.ts`** — add a snapshot for rule and config entry names.

**`public-api.test.ts`** — verify the factory is re-exported from the main package if adding a new named export.

```bash
pnpm run ok  # must still pass after refactor additions
```

## Step 8 — Update Documentation

- `apps/docs/src/content/docs/tooling/{category}.md` — add the new integration
- `apps/docs/src/content/docs/tooling/overview.md` — keep overview accurate
- `apps/docs/src/content/docs/index.md` — update counts if integration totals change
- `README.md` — update if a major new capability is introduced

## Step 9 — Validate and changeset

```bash
pnpm run build && pnpm run lint && pnpm run test
pnpm run changeset  # select affected packages, write summary
```
