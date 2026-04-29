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

## Keeping v1 Docs

The v1 docs remain available at `/v1/`. The current root docs track v2. Future docs can be added the same way under versioned paths such as `/v2.1/` or `/v2.2.1/` when a release needs permanent documentation.
