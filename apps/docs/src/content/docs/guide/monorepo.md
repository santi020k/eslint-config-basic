---
title: "Monorepo"
description: "This package has first-class monorepo support through the projects option and the Monorepo preset. A single eslint.config.mjs at the repo root can scope different presets, runtimes, and frameworks to each workspace package."
---

This package has first-class monorepo support through the `projects` option and the `Monorepo` preset. A single `eslint.config.mjs` at the repo root can scope different presets, runtimes, and frameworks to each workspace package.

ESLint 10 also resolves `eslint.config.*` starting from each linted file's directory rather than the working directory. That means workspace packages can ship their own `eslint.config.mjs` (each calling `defineConfig()` with package-specific options) and a single ESLint run from the repo root picks up every config automatically. Use `projects` when you want one root config to rule them all; use per-package configs when packages should own their lint setup — both work with v10.

## Minimal Setup

`Preset.Monorepo` enables Prettier and best-practice integrations. Install
`@santi020k/eslint-config-tools` and
`@santi020k/eslint-config-extensions` with the lean `basic` package; the `full`
package already includes them.

```js title="eslint.config.mjs"
import { defineConfig } from '@santi020k/eslint-config-basic'

export default defineConfig()
```

Workspaces are inferred from `workspaces`, `pnpm-workspace.yaml`, Turborepo,
or Nx. The root receives safe universal defaults, while each package's
`package.json` activates only the frameworks and integrations used in that
package. Root devDependencies do not leak framework or library rules across the
workspace.

Use the factory when you need local overrides or want to disable package
detection:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  detection: { projects: false }
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

## Workspace Root

By default each project entry uses its own folder for detection and TypeScript.
The config directory is the workspace root by default. Set a different root
only when the config file lives elsewhere:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  root: import.meta.dirname
})
```

Set `typescript.tsconfigRootDir` inside a project only when its TypeScript root
intentionally differs from its package folder.

## Turborepo / pnpm Workspaces Pattern

For repos using Turborepo with pnpm workspaces, the recommended pattern is:

```js title="eslint.config.mjs"
import { defineConfig, Preset, Runtime } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  preset: Preset.Monorepo,
  root: import.meta.dirname,
  projects: {
    'apps/dashboard': { frameworks: { next: true }, preset: Preset.App },
    'apps/marketing': { frameworks: { astro: true }, preset: Preset.App },
    'packages/api': { preset: Preset.Node, runtime: Runtime.Node },
    'packages/core': { preset: Preset.Library, runtime: Runtime.Universal },
    'workers/auth': { preset: Preset.Library, runtime: Runtime.Worker }
  }
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

This should not happen in v3: root framework and library detection is
suppressed for workspaces, then recomputed per package. Run `doctor` to inspect
the detected package roots if a package is scoped incorrectly.

Framework detection can also use source evidence when a package manifest is
intentionally neutral. A workspace package containing `.astro` files receives
the Astro parser and processor even when it does not declare `astro`. This
supports shared component and theme packages without adding a runtime
dependency solely for lint configuration.

**TypeScript parser rejects files from another package**

Each package needs its own `tsconfig.json` that covers its source. Mark tooling,
templates, or generated TypeScript as syntax-only when it sits outside that
project:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  projects: {
    'packages/ui': {
      frameworks: { react: true },
      typescript: {
        untypedFiles: ['templates/**/*.ts']
      }
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
