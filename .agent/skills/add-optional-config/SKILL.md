---
name: add-optional-config
description: How to add a new optional ESLint configuration to the @santi020k/eslint-config-basic monorepo.
---

# Adding a New Optional Config

Follow these steps to add a new optional configuration to the project. Optional configs are extensions (e.g., Prettier, Tailwind, Vitest) that users can choose to activate.

Optionals are categorized into five types. Choose the right category before starting:

| Category | Enum | Examples |
| :--- | :--- | :--- |
| `tools` | `Tool` | Prettier, Cspell, Jsdoc, Swagger |
| `libraries` | `Library` | Tailwind, I18next, Stencil, TanstackQuery, TanstackRouter, Storybook |
| `testing` | `Testing` | Vitest, Playwright, Jest, Cypress, TestingLibrary |
| `formats` | `Format` | Mdx, Markdown, Jsonc, Yaml, Toml, Graphql |
| `extensions` | `Extension` | Regexp, Unicorn, Sonarjs, Security, Perfectionist |

## 1. Create the Configuration File

Create a new file in `packages/optionals/src/{category}/{name}.ts`.

```typescript
export const myOptionalConfig: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config/myoptional',
    rules: {
      // optional rules go here
    }
  }
]
```

*Note: Before creating an `ambient.d.ts`, you MUST check if the library has its own types or a `@types/*` package. Ambient declarations should be a last resort.*

## 2. Export the Config

In `packages/optionals/src/index.ts`, export the new optional config you created:

```typescript
export { myOptionalConfig } from './{category}/{name}.js'
```

## 3. Register the Optional in the Core Enums

Open `packages/core/src/types.ts` and locate the appropriate enum for your category. Add your new optional as a new enum value:

- For a library → add to `Library` enum: `MyLib = 'mylib'`
- For a tool → add to `Tool` enum: `MyTool = 'mytool'`
- For a testing framework → add to `Testing` enum: `MyTest = 'mytest'`
- For a file format → add to `Format` enum: `MyFormat = 'myformat'`
- For an extension → add to `Extension` enum: `MyExt = 'myext'`

## 4. Wire the Optional into the Optionals Module

Open `packages/basic/src/optionals.ts`. Add an import at the top of the file alongside the existing imports from `@santi020k/eslint-config-optionals`. Then add the conditional push in the appropriate section of `getOptionalConfigs()`:

```typescript
// Example: for a Library
if (libraries.includes(Library.MyLib)) configs.push(...myOptionalConfig)

// Example: for a Tool (non-Prettier)
if (tools.includes(Tool.MyTool)) configs.push(...myOptionalConfig)
```

*Note: Ensure `Prettier` remains the last config applied (it goes through `getPrettierConfig()`, not `getOptionalConfigs()`).*

## 5. Verify the Changes

Run the monorepo validations:

```bash
npm run build && npm run lint && npm run test
```
