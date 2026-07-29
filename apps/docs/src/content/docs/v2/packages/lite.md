---
title: "Lite Package"
description: "Package: @santi020k/eslint-config-lite"
---

Package: [`@santi020k/eslint-config-lite`](https://www.npmjs.com/package/@santi020k/eslint-config-lite)

This package is the opt-in lightweight entry point for projects that want to manage framework and integration config packages manually.

## When To Use It

Use `@santi020k/eslint-config-basic` by default. It installs the full tested stack and is the simplest path for most projects.

Use `@santi020k/eslint-config-lite` when install size or dependency ownership matters more than one-command setup. The lite package installs the core composer and TypeScript support, then lazy-loads framework and integration config packages only after you install and enable them.

## Package Choice

| Option | Best For | Dependency Model |
| :--- | :--- | :--- |
| `@santi020k/eslint-config-basic` | Most application projects | Full tested stack is installed together. |
| `@santi020k/eslint-config-lite` | Dependency-sensitive projects and tight CI caches | Core composer by default; framework and integration config packages are manual. |
| Individual `@santi020k/eslint-config-*` packages | Advanced custom composition | You assemble imported configs yourself. |

## Package Metrics

These are direct package-manifest counts, not a package-manager-specific transitive install measurement.

| Package | Direct Dependencies | Peer Dependencies | Optional Peers |
| :--- | ---: | ---: | ---: |
| `@santi020k/eslint-config-basic` | 22 | 2 | 1 |
| `@santi020k/eslint-config-lite` | 3 | 21 | 20 |
| `@santi020k/eslint-config-integrations` | 51 | 7 | 6 |

## Minimal Install

```sh title="pnpm"
pnpm add -D @santi020k/eslint-config-lite eslint
```

```sh title="npm"
npm install -D @santi020k/eslint-config-lite eslint
```

```sh title="yarn"
yarn add -D @santi020k/eslint-config-lite eslint
```

```sh title="bun"
bun add -d @santi020k/eslint-config-lite eslint
```

## Minimal Config

```js
import { defineConfig } from '@santi020k/eslint-config-lite'

export default await defineConfig()
```

## Add A Framework

Install the lite package plus the framework config package you enable:

```sh title="pnpm"
pnpm add -D @santi020k/eslint-config-lite @santi020k/eslint-config-react eslint
```

```js
import { defineConfig } from '@santi020k/eslint-config-lite'

export default await defineConfig({
  frameworks: {
    react: true
  }
})
```

Auto-detection can also enable detected frameworks. With the lite package, detected frameworks must still be installed as config packages.

## Add Integrations

Install `@santi020k/eslint-config-integrations` when you enable libraries, testing tools, formats, tools, or extension integrations:

```sh title="pnpm"
pnpm add -D @santi020k/eslint-config-lite @santi020k/eslint-config-integrations eslint
```

```js
import { defineConfig, Testing, Tool } from '@santi020k/eslint-config-lite'

export default await defineConfig({
  testing: [Testing.Vitest],
  tools: [Tool.Prettier]
})
```

The integrations package keeps its own tested dependency set. The lite package avoids installing it until your project opts into integrations.

## Preset Notes

`Preset.All` enables every optional integration. With the lite package, that means you must install `@santi020k/eslint-config-integrations`. Use it for audits and evaluation, not as the usual long-term lite setup.

## Missing Package Errors

If a framework or integration package is enabled but not installed, the lite package throws an install-focused error naming the missing optional package. Install that package or remove the selected feature.

You can also run `basic-eslint doctor` in a project that imports `@santi020k/eslint-config-lite`; it warns when detected frameworks or integrations do not have their matching manual config packages declared.

```sh
basic-eslint doctor --lite-install
```

Use `--lite-install` to print the package-manager-specific install command for the current project.

## Related Pages

- [Installation](/v2/guide/installation)
- [Switch from Basic to Lite](/v2/guide/lite-migration)
- [Configuration](/v2/guide/configuration)
- [Basic Package](/v2/packages/basic)
- [Integrations](/v2/packages/integrations)
