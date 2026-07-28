---
title: "Configuration"
description: "Compose the v3 flat config from the lean package and installed optional framework packages."
---

The main package composes the final flat config array from
`@santi020k/eslint-config-basic` and the optional framework or integration
packages installed by the project.

## Mental Model

- Start with `defineConfig()` and no arguments; add options or overrides only when detection needs help.
- Let project detection enable TypeScript, frameworks, runtime, and supported tooling.
- Make options explicit when you want stable, reviewable config.
- Use booleans for installed optional framework configs.
- Prefer matching strings for concise configs; enums remain available when they improve discoverability.
- Use `features` when you want one simple opt-in/opt-out map for optional configs.
- Use `optionMergeStrategy` when you want strict replace behavior.
- Use `detection` for granular auto-detection control.
- Use `projects` for package-aware monorepo configuration.
- Use `ignores` for extra global ignore globs alongside the composed config (same as a leading flat-config object with only `ignores`).
- Add local flat-config overrides as extra `defineConfig()` arguments instead of rebuilding the array yourself.

## Core Composition Model

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  extensions: ['unicorn', 'security'],
  formats: ['markdown', 'mdx'],
  frameworks: {
    react: true
  },
  libraries: ['tailwind', 'i18next'],
  optionMergeStrategy: 'merge',
  root: import.meta.dirname,
  runtime: 'browser',
  testing: ['vitest'],
  tools: ['prettier'],
  typescript: true
})
```

## Recommended v3 Project Config

For application packages, prefer `defineConfig()` with no arguments when no
options are needed. A direct call automatically uses the directory containing
`eslint.config.*` as its stable detection root. Add explicit options when the
project needs specific framework, TypeScript, or integration choices. Install
`@santi020k/eslint-config-integrations` for the integration options below.

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: {
    next: true
  },
  nextMode: 'app-router',
  root: import.meta.dirname,
  tailwind: {
    entryPoint: 'src/app/globals.css',
    ignore: ['^prose-custom$', '^icon-wrapper$'],
    noUnknownClasses: 'warn'
  },
  testing: ['vitest'],
  typescript: true
})
```

Set `root` when the intended project root differs from the directory containing
`eslint.config.*`. It anchors dependency detection, TypeScript, Tailwind,
subprojects, and `.gitignore` to that alternate directory.

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
    'astro-doctor': true,
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
| `All` | TypeScript plus every optional integration; requires the integrations package. |

Presets do not force a framework. Frameworks come from project detection or the `frameworks` option.

With the lean `basic` package, `App`, `Library`, `CI`, `Monorepo`, and `All`
also require `@santi020k/eslint-config-integrations`. The `full` package
already includes it.

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

Next.js, Expo, React Router, and detected Remix projects automatically include
React rules. You can still pass imported config arrays or factories for
advanced cases, but app configs should prefer booleans.

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
| React Router and Remix projects | `frameworks['react-router']` |
| Vite | `frameworks.vite` |
| Slidev | `frameworks.slidev` |

## Configuration Priority

Scalars always follow this order:

1. Explicit options passed to `defineConfig({})`.
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

Pass `ignores` when you want repo-specific globs inside `defineConfig()` instead of a separate array entry. Patterns behave like ESLint flat config global ignores (relative to the ESLint working directory). They are not merged from presets or auto-detection. For `projects` sub-configs, patterns are not rewritten with the subfolder prefix; use paths that make sense from the config file's working directory.

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  ignores: ['dist/**', 'packages/*/dist/**', 'coverage/**']
})
```

## Local Overrides

Pass flat-config entries after the options object when a project needs a small rule exception, custom globals, or a file-specific override. The generated config stays first, and local entries are appended last.

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig(
  {
    frameworks: { astro: true },
    typescript: true
  }, {
    files: ['**/*.astro'],
    rules: {
      '@typescript-eslint/no-unsafe-return': 'off'
    }
  }
)
```

### Default ignores

The composed config ships a default ignore block (`dist`, `build`, `coverage`, framework output folders, `node_modules`, and similar). It also ignores common generated-code folders and files such as `__generated__`, `generated`, `codegen`, `*.generated.*`, `*.gen.*`, GraphQL generated output, and `.prisma`. AI coding-assistant artifact folders — `.agent`, `.agents`, `.aider*`, `.claude`, `.clinerules`, `.codex`, `.copilot`, `.cursor`, `.gemini`, `.kiro`, `.opencode`, `.roo`, and `.windsurf` — are ignored too. Disable the whole block with `settings: [Setting.NoDefaultIgnores]`, or disable only generated-code ignores with `settings: [Setting.NoGeneratedCodeIgnores]`.

## Project Root

`root` is the shared base for dependency detection, TypeScript, Tailwind,
workspace packages, and `.gitignore`:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  root: import.meta.dirname
})
```

Advanced configs can still override `detectRootDir` or
`typescript.tsconfigRootDir` when those roots intentionally differ.

Type-aware mode syntax-lints `**/*.config.{ts,mts,cts}` by default because
tooling config files commonly sit outside an application's tsconfig. Add other
out-of-project files with `untypedFiles` instead of importing
`typescript-eslint` only to spread `disableTypeChecked`:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  typescript: {
    untypedFiles: ['templates/**/*.ts']
  }
})
```

Set `untypedFiles: false` to require type information for every TypeScript
file. `projectService` also accepts the native options object when
`allowDefaultProject` or `defaultProject` is genuinely needed.

## Tailwind Options

Tailwind is auto-detected when the project depends on Tailwind packages. Use `tailwind` when the entry point or project-specific class ignores need to be explicit:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  tailwind: {
    entryPoint: 'src/styles/global.css',
    ignore: ['^prose-custom$', '^icon-wrapper$'],
    noUnknownClasses: 'warn'
  }
})
```

Use `noUnknownClasses: false` when a project uses many generated or framework-provided classes but should keep the rest of the Tailwind rules.

Relative entry points are resolved from `root`, so project-scoped monorepo configs work when ESLint runs from the repository root. Set `tailwind.cwd` only when Tailwind must resolve from a different directory.

Set `tailwind: false` to disable auto-detected Tailwind linting for a package.

## Testing Files

Testing integrations ship with default file globs. Override them only when your project stores tests somewhere unusual:

```js
import { defineConfig, Testing } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  testing: [Testing.Playwright],
  testingFiles: {
    playwright: ['tests/**/*.ts']
  }
})
```

## Monorepo Projects

Use `projects` to scope package-specific presets and integrations to workspace folders. With `preset: Preset.Monorepo`, workspace project detection is enabled by default for common workspace folders and `package.json#workspaces`. Outside the monorepo preset, use `detection: { projects: true }` to opt in.

Use `projectDefaults` for settings shared by most workspace packages. Arrays and option maps merge with each project by default; a project can set `optionMergeStrategy: 'replace'` when it needs an isolated value.

```js
import { defineConfig, Extension, Preset, Runtime, Tool } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  detection: { projects: true },
  preset: Preset.Monorepo,
  projectDefaults: {
    extensions: [Extension.Unicorn],
    tools: [Tool.Prettier],
    typescript: true
  },
  projects: {
    'apps/api': {
      runtime: Runtime.Node
    },
    'apps/web': {
      frameworks: { next: true },
      preset: Preset.App
    }
  }
})
```

Each project key is treated as a folder relative to the repo root. The generated project entries and inherited defaults are scoped to that folder.

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

## Import Sorting

Import sorting is enabled by default via `simple-import-sort`. The built-in groups handle Node built-ins, framework virtual modules (Vite, Astro, SvelteKit, Nuxt), internal UI and app layers, styles, external npm packages, and relative imports — all without any configuration.

For monorepos where you want your own workspace packages to sort in a dedicated block before external npm packages, pass `workspacePrefixes` to `defineConfig`:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  workspacePrefixes: ['@acme'] // @acme/* sorts before react, lodash, etc.
})
```

See the [Core Package](/packages/core#import-sorting) page for the full group order and more details.

## Common Patterns

### React Router or Remix + Tailwind

```js
import { defineConfig, Library } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: { 'react-router': true },
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
