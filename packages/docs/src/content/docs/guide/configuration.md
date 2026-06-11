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
- Use enums or matching strings for integrations.
- Use `features` when you want one simple opt-in/opt-out map for optional configs.
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

## Optional Configs

Optional configs are grouped into five categories: `extensions`, `formats`, `libraries`, `testing`, and `tools`. You can enable them with enums or with the matching string values.

```js
import { defineConfig, Library, Testing, Tool } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  libraries: [Library.Zod, 'tailwind'],
  testing: [Testing.Playwright, 'vitest'],
  tools: [Tool.Prettier, 'cspell']
})
```

For the simplest manual configuration, use `features`. Keys are the same public string names used by the enums.

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  features: {
    boundaries: true,
    cspell: true,
    'github-actions': true,
    playwright: true,
    prettier: true,
    tailwind: true,
    unicorn: false,
    zod: true
  }
})
```

`features` participates in the same merge flow as the category arrays. `true` enables an optional config, and `false` disables it even if it was detected or enabled by a preset. `integrations` is an alias for `features`.

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

`features` and `integrations` are applied to the optional-config lists too. Use `true` to add a config and `false` to remove it from the final merged set.

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

Supported detection keys are `typescript`, `frameworks`, `libraries`, `testing`, `formats`, `tools`, `extensions`, `runtime`, `nextMode`, and `projects`.

## Additional global ignores

Pass `ignores` when you want repo-specific globs inside `eslintConfig()` instead of a separate array entry. Patterns behave like ESLint flat config global ignores (relative to the ESLint working directory). They are not merged from presets or auto-detection. For `projects` sub-configs, patterns are not rewritten with the subfolder prefix; use paths that make sense from the config file's working directory.

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  ignores: ['dist/**', 'packages/*/dist/**', 'coverage/**']
})
```

### Default ignores

The composed config ships a default ignore block (`dist`, `build`, `coverage`, framework output folders, `node_modules`, and similar). It also ignores common generated-code folders and files such as `__generated__`, `generated`, `codegen`, `*.generated.*`, `*.gen.*`, GraphQL generated output, and `.prisma`. AI coding-assistant artifact folders — `.agent`, `.agents`, `.aider*`, `.claude`, `.clinerules`, `.codex`, `.copilot`, `.cursor`, `.gemini`, `.kiro`, `.opencode`, `.roo`, and `.windsurf` — are ignored too. Disable the whole block with `settings: [Setting.NoDefaultIgnores]`, or disable only generated-code ignores with `settings: [Setting.NoGeneratedCodeIgnores]`.

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

Use `projects` to scope package-specific presets and integrations to workspace folders. With `preset: Preset.Monorepo`, workspace project detection is enabled by default for common workspace folders and `package.json#workspaces`. Outside the monorepo preset, use `detection: { projects: true }` to opt in.

```js
import { defineConfig, Preset, Runtime } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  detection: { projects: true },
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
    Extension.BestPractices,
    Extension.Boundaries
  ],
  formats: [
    Format.Mdx,
    Format.Markdown,
    Format.Jsonc,
    Format.Graphql,
    Format.PackageJson,
    Format.Yaml,
    Format.Toml
  ],
  frameworks: {
    next: true,
    react: true
  },
  libraries: [
    Library.AiSdk,
    Library.OpenAiAgents,
    Library.Mastra,
    Library.Mcp,
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
    Tool.Command,
    Tool.GithubActions,
    Tool.Docker,
    Tool.Nx,
    Tool.Jsdoc,
    Tool.Swagger
  ],
  typescript: 'strict'
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
