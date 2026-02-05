---
trigger: always_on
---

# Context

## Priority Reading Order

1. **`llms.txt`** - Project overview and architecture
2. **`../../src/index.ts`** - Main entry point with enums and config function
3. **`./guidelines.md`** - Detailed coding guidelines

## Project Summary

This is `@santi020k/eslint-config`, a composable ESLint 9 Flat Config package supporting:
- JavaScript, TypeScript, React, Next.js, Astro, Expo
- Optional integrations: Tailwind, Vitest, cspell, i18next, MDX, Markdown, Stencil

## Key Architecture Decisions

### Flat Config Only
This package only supports ESLint 9+ flat config format. No legacy `.eslintrc` support.

### Composable Design
Users select configs via enums rather than extending named configs:
```js
eslintConfig({ config: [ConfigOption.React, ConfigOption.Ts] })
```

### Dependency Alignment
Uses npm `overrides` with `$` references to align peer dependency versions across the plugin ecosystem.

## Validation Workflow

Always validate changes with:
```bash
npm run build && npm run lint
```

Both commands must pass before considering work complete.

## Known Issues / Gotchas

1. **FlatCompat issues**: Some legacy plugins don't resolve correctly. Use direct plugin object imports.
2. **TS2742 errors**: Export explicit types when inferred types reference internal modules.
3. **Plugin version conflicts**: Check `overrides` in package.json when adding new ESLint plugins.

## File Modification Patterns

### When adding a new framework config:
1. Create `src/configs/{name}/index.config.ts`
2. Export from `src/configs/index.ts`
3. Add to `ConfigOption` enum in `src/index.ts`
4. Wire into `eslintConfig()` function

### When adding a new optional:
1. Create `src/optionals/{name}.ts`
2. Export from `src/optionals/index.ts`
3. Add to `OptionalOption` enum in `src/index.ts`
4. Wire into `eslintConfig()` function
