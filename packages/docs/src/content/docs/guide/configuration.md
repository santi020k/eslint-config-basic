---
title: "Configuration"
description: "The main package composes the final flat config array from one public install: @santi020k/eslint-config-basic."
---

# Configuration

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

## Core Composition Model

```js
import { eslintConfig, Extension, Format, Library, Runtime, Testing, Tool } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  detectRootDir: process.cwd(),
  typescript: true,
  runtime: Runtime.Browser,
  frameworks: {
    react: true
  },
  libraries: [Library.Tailwind, Library.I18next],
  testing: [Testing.Vitest],
  formats: [Format.Markdown, Format.Mdx],
  tools: [Tool.Prettier],
  extensions: [Extension.Unicorn, Extension.Security],
  optionMergeStrategy: 'merge'
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
import { eslintConfig, NextMode } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  nextMode: NextMode.AppRouter,
  frameworks: {
    next: true
  }
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
import { eslintConfig, Library, Testing } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  detection: {
    frameworks: true,
    libraries: false,
    testing: false,
    formats: true,
    tools: true
  },
  libraries: [Library.Tailwind],
  testing: [Testing.Vitest]
})
```

Supported detection keys are `typescript`, `frameworks`, `libraries`, `testing`, `formats`, `tools`, `runtime`, and `nextMode`.

## Detection and Root Directories

- `detectRootDir`: root used to detect dependencies, framework folders, and project files.
- `tsconfigRootDir`: root passed to TypeScript parser options.

In monorepos these can differ. Example:

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  detectRootDir: process.cwd(),
  tsconfigRootDir: new URL('.', import.meta.url).pathname
})
```

## Monorepo Projects

Use `projects` to scope package-specific presets and integrations to workspace folders.

```js
import { eslintConfig, Preset, Runtime } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  preset: Preset.Monorepo,
  projects: {
    'apps/web': {
      preset: Preset.App,
      frameworks: { next: true }
    },
    'apps/api': {
      preset: Preset.Library,
      runtime: Runtime.Node
    }
  }
})
```

Each project key is treated as a folder relative to the repo root. The generated project entries are scoped to that folder.

## Full Example

```js
import { eslintConfig, Extension, Format, Library, Testing, Tool } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  typescript: true,
  strict: true,
  frameworks: {
    react: true,
    next: true
  },
  libraries: [
    Library.Tailwind,
    Library.TanstackQuery,
    Library.TanstackRouter,
    Library.Storybook,
    Library.I18next
  ],
  testing: [
    Testing.Vitest,
    Testing.Playwright,
    Testing.TestingLibrary,
    Testing.Cypress
  ],
  formats: [
    Format.Mdx,
    Format.Markdown,
    Format.Jsonc,
    Format.Graphql,
    Format.Yaml,
    Format.Toml
  ],
  tools: [
    Tool.Prettier,
    Tool.Cspell,
    Tool.Jsdoc
  ],
  extensions: [
    Extension.Unicorn,
    Extension.Sonarjs,
    Extension.Perfectionist,
    Extension.Security,
    Extension.Regexp,
    Extension.BestPractices
  ]
})
```

## Common Patterns

### Fullstack Remix + Tailwind

```js
import { eslintConfig, Library } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  frameworks: { remix: true },
  libraries: [Library.Tailwind]
})
```

### Astro + Svelte + Vitest

```js
import { eslintConfig, Testing } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  frameworks: { astro: true, svelte: true },
  testing: [Testing.Vitest]
})
```

## Strict Mode

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
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
import { eslintConfig, Setting } from '@santi020k/eslint-config-basic'

export default eslintConfig({
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
