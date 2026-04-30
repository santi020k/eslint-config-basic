---
title: "Migrating from v1 to v2"
description: "Version 2 moves the npm-level public API to a single package: @santi020k/eslint-config-basic."
---

# Migrating from v1 to v2

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

export default eslintConfig({
  frameworks: {
    react,
    next
  }
})
```

After:

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  frameworks: {
    next: true
  }
})
```

For React-only projects:

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  frameworks: {
    react: true
  }
})
```

## Auto-Detection

In v2, this is enough for most projects:

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig()
```

The composer reads your dependencies and project structure, then enables supported bundled framework configs. Make the `frameworks` object explicit when you want the config to stay independent from dependency detection.

## New v2 Control Flags

Use these options when migrating larger repos:

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  // monorepo/project root used for package + framework detection
  detectRootDir: process.cwd(),

  // parser/projectService root used by TypeScript ESLint internals
  tsconfigRootDir: process.cwd(),

  // default is 'merge' (detected + preset + explicit)
  optionMergeStrategy: 'merge',

  // disable if you want framework activation to be manual-only
  autoFrameworks: true,

  // disable all detection or tune specific detection categories
  detection: {
    frameworks: true,
    libraries: true,
    testing: true,
    formats: true,
    tools: true,
    runtime: true
  }
})
```

## New v2 Presets

V2 adds practical presets for common release profiles:

```js
import { eslintConfig, Preset } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  preset: Preset.App
})
```

Use `Preset.Library` for published packages, `Preset.App` for browser apps, `Preset.CI` for stricter CI defaults, and `Preset.Monorepo` as a root baseline for workspace repos.

## Monorepo Projects

V2 can scope subproject config to workspace folders:

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
