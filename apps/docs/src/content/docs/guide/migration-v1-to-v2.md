---
title: "Migrating from v1 to v2"
description: "Version 2 moves the npm-level public API to a single package: @santi020k/eslint-config-basic."
---

Version 2 moves the npm-level public API to a single package: `@santi020k/eslint-config-basic`.

The internal architecture is still modular, but application projects no longer need to install or import separate framework config packages.

## What Changed

| v1 | v2 |
| :--- | :--- |
| Install `basic` plus framework config packages. | Install only `@santi020k/eslint-config-basic`. |
| Import framework configs from `@santi020k/eslint-config-react`, `@santi020k/eslint-config-next`, etc. | Use `frameworks.<name>: true`. |
| Detected frameworks were informational. | Detected frameworks are enabled by `eslintConfig()` by default. |
| Next.js and Expo required an explicit React config. | Next.js, Expo, and Remix automatically include React rules. |
| Manual inspection required reading generated config. | `basic-eslint explain` prints detected v2 inputs. |
| Migration was fully manual. | `basic-eslint migrate` reports v1-to-v2 changes to make. |
| ESLint 9 and 10 supported. | ESLint 10 only. |
| Framework exports were config arrays with mixed names (`reactConfig`, `astro`). | Framework exports are lazy async factories with bare names (`react`, `astro`). |

## ESLint 10 Required

v2 requires ESLint 10 (`"eslint": "^10.0.0"` peer dependency). ESLint 9 reaches end-of-life on 2026-08-06; if you cannot upgrade yet, stay on the v1.x line of these packages.

```sh
pnpm add -D eslint@^10
```

Targeting v10 only lets the configs rely on v10 behavior: per-file config lookup (each linted file resolves the nearest `eslint.config.*`), JSX reference tracking without plugin workarounds, and the updated `eslint:recommended` baseline.

## Renamed Framework Exports

If you composed configs manually from named exports, two things changed:

1. **Bare names**: the mixed v1 naming (`reactConfig`, `vueConfig`, `nextConfig` next to bare `astro`, `hono`, `vite`) is normalized to bare framework names: `angular`, `astro`, `expo`, `hono`, `lit`, `nest`, `next`, `nuxt`, `qwik`, `react`, `reactRouter`, `slidev`, `solid`, `svelte`, `tanstackStart`, `vite`, `vue`. The old `*Config` names still exist as deprecated aliases.
2. **Async factories**: every framework export is now a lazy factory returning `Promise<FlatConfigArray>` — the framework's plugins are only imported when you call it. Exports that used to be plain arrays must now be called and awaited.

```js
// v1
import { reactConfig } from '@santi020k/eslint-config-basic'

export default [...reactConfig]
```

```js
// v2
import { react } from '@santi020k/eslint-config-basic'

export default [...(await react())]
```

If you only use `frameworks: { react: true }` or auto-detection, nothing changes — `defineConfig()` handles the loading internally.

## Package Changes

Remove direct framework config packages from application projects:

```sh
pnpm remove @santi020k/eslint-config-react @santi020k/eslint-config-next
pnpm add -D @santi020k/eslint-config-basic@^2
```

Keep `eslint`, `typescript`, React, Next.js, Vue, or other runtime framework packages as your project needs them. The migration only removes extra `@santi020k/eslint-config-*` framework config installs from app-level package manifests.

## Config Changes

Before:

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'
import next from '@santi020k/eslint-config-next'
import react from '@santi020k/eslint-config-react'

export default await eslintConfig({
  frameworks: {
    next,
    react
  }
})
```

After:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: {
    next: true
  }
})
```

For React-only projects:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: {
    react: true
  }
})
```

## Auto-Detection

In v2, this is enough for most projects:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig()
```

The composer reads your dependencies and project structure, then enables supported bundled framework configs. Make the `frameworks` object explicit when you want the config to stay independent from dependency detection.

## New v2 Control Flags

Use these options when migrating larger repos:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  // disable if you want framework activation to be manual-only
  autoFrameworks: true,

  // disable all detection or tune specific detection categories
  detection: {
    formats: true,
    frameworks: true,
    libraries: true,
    runtime: true,
    testing: true,
    tools: true
  },

  // monorepo/project root used for package + framework detection
  detectRootDir: process.cwd(),

  // default is 'merge' (detected + preset + explicit)
  optionMergeStrategy: 'merge',

  // parser/projectService root used by TypeScript ESLint internals
  tsconfigRootDir: process.cwd()
})
```

## New v2 Presets

V2 adds practical presets for common release profiles:

```js
import { defineConfig, Preset } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  preset: Preset.App
})
```

Use `Preset.Library` for published packages, `Preset.App` for browser apps, `Preset.CI` for stricter CI defaults, and `Preset.Monorepo` as a root baseline for workspace repos.

## Monorepo Projects

V2 can scope subproject config to workspace folders:

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

Each project entry gets its own detection root by default and the generated config entries are scoped to that folder.

## Migration CLI

Run the migration report before editing:

```sh
npx @santi020k/eslint-config-basic migrate
```

Then inspect the detected v2 shape:

```sh
npx @santi020k/eslint-config-basic explain
```

After migrating, you can generate a team-facing standards document:

```sh
npx @santi020k/eslint-config-basic docs
```

## Troubleshooting

- Detected frameworks show up unexpectedly:
  - Set `autoFrameworks: false` and define `frameworks` manually, or set `detection.frameworks: false`.
- You only want explicit arrays (no detected merge):
  - Set `optionMergeStrategy: 'replace'`.
- Monorepo detection reads the wrong package:
  - Set `detectRootDir` to the app/package root with the intended `package.json`.
- TypeScript parser looks in the wrong folder:
  - Set `tsconfigRootDir` to the package that owns the tsconfig.

## Keeping v1 Docs

The v1 docs remain available at `/v1/`. The current root docs track v2. Future docs can be added the same way under versioned paths such as `/v2.1/` or `/v2.2.1/` when a release needs permanent documentation.
