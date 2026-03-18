---
name: add-optional-config
description: How to add a new optional ESLint configuration to the @santi020k/eslint-config-basic monorepo.
---

# Adding a New Optional Config

Follow these steps to add a new optional configuration to the project. Optional configs are extensions (e.g., Prettier, Tailwind, Vitest) that users can choose to activate.

## 1. Create the Configuration File

Create a new file in `packages/optionals/src/configs/{name}.ts`.

```typescript
import type { TSESLint } from '@typescript-eslint/utils'

export const myOptionalConfig: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config/myoptional',
    rules: {
      // optional rules go here
    }
  }
]
```

*Note: You may need to create an `ambient.d.ts` if the plugin you are using does not export TS types.*

## 2. Export the Config

In `packages/optionals/src/index.ts`, export the new optional config you created:

```typescript
export * from './configs/myoptional.ts' // Make sure you export the config array
```

## 3. Register the Optional in the Core Enums

Open `packages/core/src/types.ts` and locate the `OptionalOption` enum. Add your new optional to the enum.

```typescript
export enum OptionalOption {
  // ... existing optionals
  MyOptional = 'myoptional'
}
```

## 4. Wire the Optional into the Main Config

Open `packages/basic/src/index.ts` and modify the `eslintConfig` function.

Ensure you're importing the new optional:

```typescript
// eslint-disable-next-line unused-imports/no-unused-imports
import { myOptionalConfig } from '@santi020k/eslint-config-optionals'
```

And add it to the final array that the `eslintConfig()` function returns, making sure to spread the array if the option is passed:

```typescript
[
  // ...
  ...(uniqueOptionals.includes(OptionalOption.MyOptional) ? myOptionalConfig : [])
]
```

*Note: Ensure `Prettier` remains the last config applied.*

## 5. Verify the Changes

Run the monorepo validations:

```bash
npm run build && npm run lint && npm run test
```
