---
name: add-optional-config
description: How to add a new optional ESLint configuration to the @santi020k/eslint-config-basic monorepo.
---

# Adding a New Optional Config

Follow these steps to add a new optional configuration to the project. Optional configs are integrations that users explicitly opt into (e.g., Tailwind, Vitest, Jest, i18next, YAML).

Optionals are categorized into five types. Choose the right category before starting:

| Category | Enum | Examples |
| :--- | :--- | :--- |
| `tools` | `Tool` | Prettier, Cspell, Jsdoc, Swagger |
| `libraries` | `Library` | Tailwind, I18next, Stencil, TanstackQuery, TanstackRouter, Storybook |
| `testing` | `Testing` | Vitest, Playwright, Jest, Cypress, TestingLibrary |
| `formats` | `Format` | Mdx, Markdown, Jsonc, Yaml, Toml, Graphql |
| `extensions` | `Extension` | Regexp, Unicorn, Sonarjs, Security, Perfectionist |

## 1. Create the Configuration File

Create `packages/optionals/src/{category}/{name}.ts`:

```typescript
import pluginMyOptional from 'eslint-plugin-myoptional'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * MyOptional ESLint configuration
 * Brief description of what this integration provides.
 */
export const myOptional: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'optionals/myoptional',
    plugins: {
      myoptional: pluginMyOptional
    },
    rules: {
      ...pluginMyOptional.configs.recommended.rules
      // override specific rules if needed
    }
  }
]
```

**Before creating an `ambient.d.ts`**: ALWAYS check if the library has its own types or a `@types/*` package. Ambient declarations are a last resort.

**Plugin naming note**: Some plugins use unexpected names in their configs. For example, `better-tailwindcss` recommended config entries do not include "tailwind" in their names — always check the actual plugin config object to verify entry names and rule prefixes.

## 2. Export the Config

In `packages/optionals/src/index.ts`, add an export:

```typescript
export { myOptional } from './{category}/{name}.js'
```

## 3. Register the Optional in the Core Enums

Open `packages/core/src/types.ts` and add a value to the appropriate enum:

```typescript
// For a library:
export enum Library {
  // ... existing values
  MyLib = 'mylib'
}

// For a tool:
export enum Tool {
  MyTool = 'mytool'
}

// etc.
```

## 4. Wire the Optional into the Optionals Module

Open `packages/basic/src/optionals.ts`. Add the import and the conditional push in the matching section of `getOptionalConfigs()`:

```typescript
// At the top of the file, add to imports:
import { myOptional } from '@santi020k/eslint-config-optionals'

// In getOptionalConfigs(), in the appropriate section:
if (libraries.includes(Library.MyLib)) configs.push(...myOptional)

// For a tool (non-Prettier):
if (tools.includes(Tool.MyTool)) configs.push(...myOptional)
```

**Important**: Prettier must always be the last config applied. It goes through `getPrettierConfig()`, not `getOptionalConfigs()`. Never push Prettier inside `getOptionalConfigs()`.

## 5. Update Tests

Read `.agent/skills/testing/SKILL.md` for full details. In summary:

- **`options.test.ts`** — Add a rule assertion: call `eslintConfig({ libraries: [Library.MyLib] })` (or the right category) and assert a specific rule from the plugin is present. **Check the actual plugin rule names** — don't assume based on the plugin package name (e.g., `better-tailwindcss/` prefix, not `tailwindcss/`).

- **`detection.test.ts`** — If the optional can be auto-detected from `package.json` dependencies, add a detection test asserting the correct enum value is returned.

- **`composition.test.ts`** — Add a test asserting the optional config entry name appears in the composed output.

- **`public-api.test.ts`** — If re-exporting a new enum value, verify it's accessible from the main package.

## 6. Update Documentation

Documentation updates are required whenever a new optional integration is added or a published optional changes in a user-visible way.

At minimum, review and update:

- **`packages/docs/tooling/overview.md`** — keep the overview aligned with the supported optional surface area
- **`packages/docs/tooling/{category}.md`** — add the new integration to the matching category page (`libraries`, `testing`, `formats`, `tools`, or `extensions`)
- **`packages/docs/guide/installation.md`** and **`packages/docs/guide/configuration.md`** — update setup examples when the optional affects recommended workflows
- **`packages/docs/index.md`** and **`packages/docs/.vitepress/theme/components/HomePageSections.vue`** — update homepage counts or marketing copy when optional totals change
- **`packages/optionals/README.md`** and **`README.md`** — keep public summaries aligned when the supported tooling surface expands
- **`packages/docs/CHANGELOG.md`** — add an unreleased documentation note when the docs site meaningfully changes

If an optional integration is published, the docs should already show where it lives, which category it belongs to, and how users enable it from the main package.

## 7. Validate

Run all checks from the repo root before considering the task done:

```bash
pnpm run build && pnpm run lint && pnpm run test
```

All three must pass.
