---
trigger: always_on
---

# AI Coding Assistant Guidelines

This document provides guidance for AI coding assistants working on @santi020k/eslint-config.

## Project Overview

This is an ESLint configuration package using **ESLint 9 Flat Config** format. It exports a composable `eslintConfig()` function.

## Key Files to Understand

1. `src/index.ts` - Main entry point with enums and `eslintConfig()` function
2. `src/configs/*/index.config.ts` - Framework-specific ESLint configs
3. `src/optionals/*.ts` - Optional feature configs
4. `tsup.config.ts` - Build configuration

## Code Conventions

### TypeScript
- Use explicit type annotations for exports
- Explicit return types on exported functions
- Use `type` imports when importing only types (`import type { X } from 'y'`)
- Follow the existing enum patterns (`ConfigOption`, `OptionalOption`, `SettingOption`)
- Prefer `const` assertions where appropriate

### Imports
- Use path aliases from tsconfig (`utils/`, `configs/`, `optionals/`)
- Include `.ts` extension in relative imports
- Sort imports: external first, then internal

### Naming Conventions
- Config arrays: `camelCaseConfig` (e.g., `reactConfig`, `tsConfig`)
- Enums: `PascalCase` (e.g., `ConfigOption`, `OptionalOption`)
- Files: `kebab-case.ts` or `index.config.ts` for configs

### ESLint Configs
- All configs return `TSESLint.FlatConfig.ConfigArray`
- Each config directory has an `index.config.ts` exporting the config array
- Rules are organized into separate files when complex
- Preferred flat config pattern:
  ```typescript
  export const myConfig: TSESLint.FlatConfig.ConfigArray = [
    {
      name: 'my-config/rules',
      rules: {
        'rule-name': 'error'
      }
    }
  ]
  ```

### File Structure
- One config per directory under `src/configs/`
- Optional features as single files in `src/optionals/`
- Export everything through barrel files (`index.ts`)

## Common Patterns

### Adding a rule override
```typescript
{
  name: 'my-config/override',
  files: ['**/*.ts', '**/*.tsx'],
  rules: {
    'existing-rule': 'off'
  }
}
```

### Plugin configuration
```typescript
import myPlugin from 'eslint-plugin-my'

{
  name: 'my-config/plugin',
  plugins: {
    'my': myPlugin
  },
  rules: {
    'my/rule-name': 'error'
  }
}
```

## Adding New Features

### New Framework Config
```typescript
// src/configs/myframework/index.config.ts
import type { TSESLint } from '@typescript-eslint/utils'

export const myframeworkConfig: TSESLint.FlatConfig.ConfigArray = [
  // config rules
]

// Add to src/configs/index.ts
// Add enum value to ConfigOption in src/index.ts
// Wire in eslintConfig() function
```

### New Optional
```typescript
// src/optionals/myoptional.ts
import type { TSESLint } from '@typescript-eslint/utils'

export const myoptional: TSESLint.FlatConfig.ConfigArray = [
  // optional rules
]

// Add to src/optionals/index.ts
// Add enum value to OptionalOption in src/index.ts
```

## Verification Commands

```bash
npm run build      # Must pass - builds with tsup
npm run lint       # Must pass - lints the codebase
npm run inspector  # Visual config inspection
```

## Common Pitfalls

1. **Peer dependencies**: Use `$` references in overrides for version alignment
2. **Plugin loading**: Use direct plugin object references, not string-based resolution
3. **Type exports**: May need explicit type annotations to avoid TS2742 errors
