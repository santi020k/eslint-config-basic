---
trigger: always_on
---

This is an ESLint configuration package using **ESLint 9 Flat Config** format. It exports a composable `eslintConfig()` function.

The project is a **monorepo** using Turborepo and npm Workspaces.

## Key Files to Understand

### Root Level
- `src/index.ts` - Main entry point, re-exports from packages + composes configs
- `@santi020k/eslint-config-basic` - Project name update
- `turbo.json` - Turborepo build configuration
- `eslint.config.js` - ESLint config for this repo
- `vitest.config.ts` - Test configuration

### Packages
- `packages/core/src/index.ts` - Core config, types, utilities
- `packages/typescript/src/index.ts` - TypeScript config
- `packages/react/src/index.ts` - React + Hooks config
- `packages/next/src/index.ts` - Next.js config

### Tests
- `tests/configs.test.ts` - Config export tests
- `tests/rules.test.ts` - Rule validation tests
- `tests/composition.test.ts` - eslintConfig() composition tests

## Code Conventions

### TypeScript
- Use explicit type annotations for exports
- Explicit return types on exported functions
- Use `type` imports when importing only types (`import type { X } from 'y'`)
- Follow the existing enum patterns (`ConfigOption`, `OptionalOption`, `SettingOption`)
- Prefer `const` assertions where appropriate

### Imports
- Use `.js` extension for relative imports (ESM compatibility)
- Sort imports: external first, then internal with blank line

### Naming Conventions
- Config arrays: `camelCaseConfig` (e.g., `reactConfig`, `tsConfig`)
- Enums: `PascalCase` (e.g., `ConfigOption`, `OptionalOption`)
- Files: `kebab-case.ts` or `index.ts` for main exports

### ESLint Configs
- All configs return `TSESLint.FlatConfig.ConfigArray`
- Each package exports a main config array
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

### Package Structure
Each package under `packages/` follows this structure:
```text
packages/{name}/
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── src/
    ├── index.ts      # Main export
    ├── rules.ts      # Rule definitions (optional)
    └── ambient.d.ts  # Type declarations for plugins (if needed)
```

## Adding New Features

### New Framework Config (as package)
```bash
# 1. Create package directory
mkdir -p packages/myframework/src

# 2. Create package.json with dependencies
# 3. Create tsconfig.json extending base
# 4. Create tsup.config.ts
# 5. Create src/index.ts with config
# 6. Add enum value to packages/core/src/types.ts
# 7. Wire into src/index.ts eslintConfig()
```

### New Optional
```typescript
// src/optionals/myoptional.ts
import type { TSESLint } from '@typescript-eslint/utils'

export const myoptional: TSESLint.FlatConfig.ConfigArray = [
  // optional rules
]

// Add to src/optionals/index.ts
// Add enum value to packages/core/src/types.ts
```

## Verification Commands

```bash
npm run build      # Turborepo builds all packages
npm run lint       # Lints entire monorepo from root
npm run test       # Runs Vitest (30 tests)
npm run inspector  # Visual config inspection
```

## Common Pitfalls

1. **Peer dependencies**: Use `$` references in overrides for version alignment
2. **Plugin loading**: Use direct plugin object references, not string-based resolution
3. **Type exports**: May need explicit type annotations to avoid TS2742 errors
4. **Ambient declarations**: Create `.d.ts` files for plugins without TypeScript types
5. **Workspace lint**: Don't add lint scripts to individual packages - lint runs from root only
