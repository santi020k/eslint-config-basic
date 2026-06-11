---
title: "Configuration"
description: "The main package composes the final flat config array from one public install: @santi020k/eslint-config-basic."
---

The main package composes the final flat config array from one public install: `@santi020k/eslint-config-basic`.

## Mental Model

- Start with `eslintConfig()`.
- Let project detection enable TypeScript, frameworks, runtime, and supported tooling.
- Make options explicit when you want stable, reviewable config.
- Use booleans for bundled framework configs.
- Use enums for integrations.
- Use `optionMergeStrategy` when you want strict replace behavior.
- Use `detection` for granular auto-detection control.
- Use `projects` for package-aware monorepo configuration.
- Use `ignores` for extra global ignore globs alongside the composed config (same as a leading flat-config object with only `ignores`).

## Core Composition Model

```js
import { defineConfig, Extension, Format, Library, Runtime, Testing, Tool } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  detectRootDir: process.cwd(),
  extensions: [Extension.Unicorn, Extension.Security],
  formats: [Format.Markdown, Format.Mdx],
  frameworks: {
    react: true
  },
  libraries: [Library.Tailwind, Library.I18next],
  optionMergeStrategy: 'merge',
  runtime: Runtime.Browser,
  testing: [Testing.Vitest],
  tools: [Tool.Prettier],
  typescript: true
})
```

## Presets

| Preset | Meaning |
| :--- | :--- |
| `Basic` | Core JavaScript rules only. |
| `Node` | Core + TypeScript + Node globals. |
| `Browser` | Core + TypeScript + Browser globals. |
| `Worker` | Core + TypeScript + worker globals. |
| `Library` | TypeScript package/library defaults with Prettier and best-practice rules. |
| `App` | Browser app defaults with TypeScript, Prettier, and Vitest. |
| `CI` | Universal TypeScript defaults with CI strict severities. |
| `Monorepo` | Mixed-workspace defaults for package-aware configs. |
| `All` | TypeScript plus all bundled integrations. |

Presets do not force a framework. Frameworks come from project detection or the `frameworks` option.

## Frameworks

```js
import { defineConfig, NextMode } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: {
    next: true
  },
  nextMode: NextMode.AppRouter
})
```

Next.js, Expo, and Remix automatically include React rules. You can still pass imported config arrays or factories for advanced cases, but app configs should prefer booleans.

| Framework | Option |
| :--- | :--- |
| React | `frameworks.react` |
| Next.js | `frameworks.next` |
| Astro | `frameworks.astro` |
| Vue | `frameworks.vue` |
| Svelte | `frameworks.svelte` |
| Solid | `frameworks.solid` |
| Angular | `frameworks.angular` |
| NestJS | `frameworks.nest` |
| Hono | `frameworks.hono` |
| Expo | `frameworks.expo` |
| Qwik | `frameworks.qwik` |
| Remix | `frameworks.remix` |
| Vite | `frameworks.vite` |
| Slidev | `frameworks.slidev` |

## Configuration Priority

Scalars always follow this order:

1. Explicit options passed to `eslintConfig({})`.
2. Preset defaults.
3. Auto-detection from `package.json`, `tsconfig.json`, and project structure.

List options (`libraries`, `testing`, `formats`, `tools`, `extensions`) and `frameworks` use:

- `optionMergeStrategy: 'merge'` (default): detected + preset + explicit are combined and deduplicated.
- `optionMergeStrategy: 'replace'`: explicit values replace preset/detected values.

Use `autoFrameworks: false` when you want manual framework control only (no detected framework auto-enable).

## Detection Controls

Use `detection: false` to disable all auto-detection, or pass an object to disable specific categories while keeping the rest automatic.

```js
import { defineConfig, Library, Testing } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  detection: {
    formats: true,
    frameworks: true,
    libraries: false,
    testing: false,
    tools: true
  },
  libraries: [Library.Tailwind],
  testing: [Testing.Vitest]
})
```

Supported detection keys are `typescript`, `frameworks`, `libraries`, `testing`, `formats`, `tools`, `extensions`, `runtime`, and `nextMode`.

## Additional global ignores

Pass `ignores` when you want repo-specific globs inside `eslintConfig()` instead of a separate array entry. Patterns behave like ESLint flat config global ignores (relative to the ESLint working directory). They are not merged from presets or auto-detection. For `projects` sub-configs, patterns are not rewritten with the subfolder prefix; use paths that make sense from the config file's working directory.

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  ignores: ['dist/**', 'packages/*/dist/**', 'coverage/**']
})
```

## Detection and Root Directories

- `detectRootDir`: root used to detect dependencies, framework folders, and project files.
- `tsconfigRootDir`: root passed to TypeScript parser options.

In monorepos these can differ. Example:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  detectRootDir: process.cwd(),
  tsconfigRootDir: new URL('.', import.meta.url).pathname
})
```

## Monorepo Projects

Use `projects` to scope package-specific presets and integrations to workspace folders.

```js
import { defineConfig, Preset, Runtime } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  preset: Preset.Monorepo,
  projects: {
    'apps/api': {
      preset: Preset.Library,
      runtime: Runtime.Node
    },
    'apps/web': {
      frameworks: { next: true },
      preset: Preset.App
    }
  }
})
```

Each project key is treated as a folder relative to the repo root. The generated project entries are scoped to that folder.

## Full Example

```js
import { defineConfig, Extension, Format, Library, Testing, Tool } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  extensions: [
    Extension.Unicorn,
    Extension.Sonarjs,
    Extension.Perfectionist,
    Extension.Security,
    Extension.Regexp,
    Extension.BestPractices
  ],
  formats: [
    Format.Mdx,
    Format.Markdown,
    Format.Jsonc,
    Format.Graphql,
    Format.Yaml,
    Format.Toml
  ],
  frameworks: {
    next: true,
    react: true
  },
  libraries: [
    Library.Tailwind,
    Library.TanstackQuery,
    Library.TanstackRouter,
    Library.Storybook,
    Library.I18next,
    Library.Prisma,
    Library.Drizzle,
    Library.Typeorm,
    Library.MikroOrm,
    Library.Sequelize
  ],
  strict: true,
  testing: [
    Testing.Vitest,
    Testing.Playwright,
    Testing.TestingLibrary,
    Testing.Cypress
  ],
  tools: [
    Tool.Prettier,
    Tool.Cspell,
    Tool.Jsdoc,
    Tool.Swagger
  ],
  typescript: true
})
```

## Common Patterns

### Fullstack Remix + Tailwind

```js
import { defineConfig, Library } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: { remix: true },
  libraries: [Library.Tailwind]
})
```

### Astro + Svelte + Vitest

```js
import { defineConfig, Testing } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: { astro: true, svelte: true },
  testing: [Testing.Vitest]
})
```

## Strict Mode

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  strict: true
})
```

Strict mode accepts profiles:

| Value | Behavior |
| :--- | :--- |
| `false` or `'recommended'` | Keep recommended rule severities. |
| `true` or `'ci'` | Promote warnings to errors. |
| `'pedantic'` | Promote warnings and enable built-in best-practice rules. |

## Settings

Gitignore integration is enabled by default.

```js
import { defineConfig, Setting } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  settings: [Setting.NoGitignore]
})
```

## Related Pages

- [Installation](/guide/installation)
- [v1 to v2 Migration](/guide/migration-v1-to-v2)
- [Framework Guides](/frameworks/typescript)
- [Integrations](/tooling/overview)

## Schema

This repo can generate a JSON schema for `EslintConfigOptions`:

```sh
pnpm run build:schema
```

The output file is `eslint-config-schema.json` at the repository root.
