# Guidelines

This is an ESLint configuration package using **ESLint 9 Flat Config** format. It exports a composable `eslintConfig()` function.

The project is a **monorepo** using Turborepo and npm Workspaces.

## Key Files to Understand

### Root Level

- `turbo.json` - Turborepo build configuration
- `eslint.config.js` - ESLint config for this repo
- `llms.txt` / `llms-full.txt` - AI context files

### Packages

- `packages/basic/src/index.ts` - Main entry point; exports `eslintConfig()` and re-exports all enums/configs
- `packages/basic/src/optionals.ts` - Maps optional enums to config arrays; this is where optionals are wired
- `packages/basic/src/resolvers.ts` - Framework and preset resolution logic
- `packages/basic/src/compose.ts` - Strict mode and typed-rules override helpers
- `packages/core/src/index.ts` - Core JS config, runtime globals, gitignore setting
- `packages/core/src/types.ts` - **Single source of truth for all enums**: `Library`, `Testing`, `Format`, `Tool`, `Extension`, `Setting`, `Runtime`, `Preset`, `NextMode`, `ReactConfigKeys`, and all interfaces
- `packages/typescript/src/index.ts` - TypeScript config
- `packages/react/src/index.ts` - React + Hooks config
- `packages/next/src/index.ts` - Next.js config
- `packages/optionals/src/index.ts` - Re-exports all optional configs by category

### Tests

- `packages/tests/src/configs.test.ts` - Config export tests (each config exports a non-empty array)
- `packages/tests/src/rules.test.ts` - Rule validation tests
- `packages/tests/src/composition.test.ts` - `eslintConfig()` composition logic tests
- `packages/tests/src/snapshots.test.ts` - Snapshot validations of final config outputs
- `packages/tests/src/detection.test.ts` - Auto-detection tests
- `packages/tests/src/edge-cases.test.ts` - Edge case handling
- `packages/tests/src/options.test.ts` - Options/argument tests
- `packages/tests/src/public-api.test.ts` - Public API surface tests
- `packages/tests/src/cli.test.ts` - CLI tests
- `packages/tests/src/types.test.ts` - Type-level tests
- `packages/tests/vitest.config.ts` - Vitest configuration

## Code Conventions

### TypeScript

- Use explicit type annotations for exports
- Explicit return types on exported functions
- Use `type` imports when importing only types (`import type { X } from 'y'`)
- Follow the existing enum patterns (`Library`, `Testing`, `Format`, `Tool`, `Extension`)
- Prefer `const` assertions where appropriate

### Imports
- Use `.js` extension for relative imports (ESM compatibility)
- Sort imports: external first, then internal with blank line

### Naming Conventions

- Config arrays: `camelCaseConfig` (e.g., `reactConfig`, `tsConfig`)
- Enums: `PascalCase` (e.g., `Library`, `Tool`)
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

The `packages/optionals/` package organizes configs into subdirectories:
```text
packages/optionals/src/
├── tools/        # Tool.Prettier, Tool.Cspell, Tool.Jsdoc, Tool.Swagger
├── libraries/    # Library.Tailwind, Library.I18next, Library.Stencil, etc.
├── testing/      # Testing.Vitest, Testing.Playwright, Testing.Jest, etc.
├── formats/      # Format.Mdx, Format.Markdown, Format.Jsonc, etc.
├── extensions/   # Extension.Regexp, Extension.Unicorn, Extension.Sonarjs, etc.
└── index.ts      # Re-exports all from above
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
# 6. Add framework to `frameworks` type in `packages/core/src/types.ts`
# 7. Wire into `eslintConfig()` function in `packages/basic/src/index.ts`
```

### New Optional
```typescript
// packages/optionals/src/{category}/{name}.ts
import type { TSESLint } from '@typescript-eslint/utils'

export const myoptional: TSESLint.FlatConfig.ConfigArray = [
  // optional rules
]

// Add to packages/optionals/src/index.ts
export { myoptional } from './{category}/{name}.js'

// Add enum value to the appropriate enum in `packages/core/src/types.ts`
// e.g., for a library: Library.MyLib = 'mylib'

// Wire in `packages/basic/src/optionals.ts`
// e.g.: if (libraries.includes(Library.MyLib)) configs.push(...myoptional)
```

## Verification Commands

```bash
npm run build      # Turborepo builds all packages
npm run lint       # Lints entire monorepo from root
npm run test       # Runs Vitest (packages/tests)
npm run inspector  # Visual config inspection
```

## Common Pitfalls

1. **Peer dependencies**: Use `$` references in overrides for version alignment
2. **Plugin loading**: Use direct plugin object references, not string-based resolution
3. **Type exports**: May need explicit type annotations to avoid TS2742 errors
4. **Ambient declarations**: Create `.d.ts` files for plugins only as a last resort. ALWAYS check if built-in types or `@types/*` packages are available first.
5. **Workspace lint**: Don't add lint scripts to individual packages - lint runs from root only.
6. **Framework boolean**: Passing `frameworks.react = true` throws — users must pass the imported config array from the framework package.
