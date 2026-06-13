---
title: "Monorepo"
description: "This package has first-class monorepo support through the projects option and the Monorepo preset. A single eslint.config.mjs at the repo root can scope different presets, runtimes, and frameworks to each workspace package."
---

This package has first-class monorepo support through the `projects` option and the `Monorepo` preset. A single `eslint.config.mjs` at the repo root can scope different presets, runtimes, and frameworks to each workspace package.

ESLint 10 also resolves `eslint.config.*` starting from each linted file's directory rather than the working directory. That means workspace packages can ship their own `eslint.config.mjs` (each calling `defineConfig()` with package-specific options) and a single ESLint run from the repo root picks up every config automatically. Use `projects` when you want one root config to rule them all; use per-package configs when packages should own their lint setup — both work with v10.

## Minimal Setup

```js title="eslint.config.mjs"
import { defineConfig, Preset } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  preset: Preset.Monorepo
})
```

`Preset.Monorepo` sets universal TypeScript defaults that work as a safe base across mixed project types. It also enables workspace project detection by default, so common workspace folders and `package.json#workspaces` entries can become scoped project configs automatically. Auto-detection reads each package's `package.json` and project structure to activate frameworks and integrations found there.

Outside `Preset.Monorepo`, project detection is opt-in:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  detection: { projects: true }
})
```

## Scoping Packages with `projects`

Use `projects` to assign different options to workspace folders. Each key is a path relative to the repo root and each value is a partial `EslintConfigOptions` object.

```js title="eslint.config.mjs"
import { defineConfig, Preset, Runtime } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  preset: Preset.Monorepo,
  projects: {
    'apps/api': {
      preset: Preset.Node,
      runtime: Runtime.Node
    },
    'apps/web': {
      frameworks: { next: true },
      preset: Preset.App
    },
    'packages/cli': {
      preset: Preset.Library,
      runtime: Runtime.Node
    },
    'packages/ui': {
      frameworks: { react: true },
      preset: Preset.Library
    }
  }
})
```

Each project entry generates ESLint config entries scoped to that folder — rules and globals from `apps/api` only apply to files under `apps/api/`.

## Detection Roots

By default each project entry uses its own folder as the detection root. You can override this:

```js
import { defineConfig, Preset } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  detectRootDir: process.cwd(),
  preset: Preset.Monorepo,
  tsconfigRootDir: import.meta.dirname
})
```

- `detectRootDir` — where to read `package.json` for auto-detection of frameworks, integrations, and runtime.
- `tsconfigRootDir` — where the TypeScript parser looks for `tsconfig.json` / `tsconfig.base.json`.

In large monorepos these may differ: `detectRootDir` typically points to the package being linted, while `tsconfigRootDir` points to the root `tsconfig.base.json`.

## Turborepo / pnpm Workspaces Pattern

For repos using Turborepo with pnpm workspaces, the recommended pattern is:

```js title="eslint.config.mjs"
import { defineConfig, Preset, Runtime } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  detectRootDir: process.cwd(),
  preset: Preset.Monorepo,
  projects: {
    'apps/dashboard':     { frameworks: { next: true }, preset: Preset.App },
    'apps/marketing':     { frameworks: { astro: true }, preset: Preset.App },
    'packages/api':       { preset: Preset.Node, runtime: Runtime.Node },
    'packages/core':      { preset: Preset.Library, runtime: Runtime.Universal },
    'workers/auth':       { preset: Preset.Library, runtime: Runtime.Worker }
  },
  tsconfigRootDir: import.meta.dirname
})
```

## Merge Strategy

By default, project-level `libraries`, `testing`, `formats`, `tools`, and `extensions` are **merged** with root-level values (`optionMergeStrategy: 'merge'`). Use `'replace'` at the project level when a specific package should override the root completely. These arrays accept enum values or matching strings, and `features` can add or remove optional configs inside each project:

```js
import { defineConfig, Preset, Testing } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  preset: Preset.Monorepo,
  projects: {
    'apps/e2e': {
      features: {
        prettier: false
      },
      optionMergeStrategy: 'replace',
      testing: [Testing.Playwright]
    }
  },
  testing: [Testing.Vitest]
})
```

## Ignoring Paths

Pass `ignores` at the root level to exclude generated folders across the whole repo:

```js
import { defineConfig, Preset } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  ignores: [
    'dist/**',
    'packages/*/dist/**',
    'apps/*/dist/**',
    'coverage/**',
    '.turbo/**'
  ],
  preset: Preset.Monorepo
})
```

> [!NOTE]
> Patterns in `ignores` are relative to ESLint's working directory. They are not automatically prefixed with the `projects` subfolder paths — use repo-root-relative globs when needed.

## Troubleshooting

**Detected frameworks bleed between packages**

Set `detection.frameworks: false` at the root and rely on the explicit `frameworks` object:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  projects: {
    'apps/api': {
      detection: { frameworks: false },
      typescript: true
    }
  }
})
```

**TypeScript parser rejects files from another package**

Each package needs its own `tsconfig.json` that covers the files ESLint will process. Set `tsconfigRootDir` to the package folder:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  projects: {
    'packages/ui': {
      frameworks: { react: true },
      tsconfigRootDir: './packages/ui'
    }
  }
})
```

**The `doctor` command reports missing `projects` scoping**

Run `npx @santi020k/eslint-config-basic doctor` — it detects workspace packages that are not represented in `projects` and suggests which ones to add.

## Related Pages

- [Presets](/guide/presets) — available preset values and what each enables
- [Runtime](/guide/runtime) — runtime enum and auto-detection rules
- [Configuration](/guide/configuration) — full option reference
- [CLI](/guide/cli) — `doctor` and `inspect` commands for diagnosing monorepo setups
