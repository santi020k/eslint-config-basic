---
title: "Lite Package"
description: "Package: @santi020k/eslint-config-lite"
---

Package: [`@santi020k/eslint-config-lite`](https://www.npmjs.com/package/@santi020k/eslint-config-lite)

This package is the opt-in lightweight entry point for projects that want to manage framework and integration config packages manually.

## When To Use It

Use `@santi020k/eslint-config-basic` by default. It installs the full tested stack and is the simplest path for most projects.

Use `@santi020k/eslint-config-lite` when install size or dependency ownership matters more than one-command setup. The lite package installs the core composer and TypeScript support, then lazy-loads framework and integration config packages only after you install and enable them.

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

## Missing Package Errors

If a framework or integration package is enabled but not installed, the lite package throws an install-focused error naming the missing optional package. Install that package or remove the selected feature.

## Related Pages

- [Installation](/guide/installation)
- [Configuration](/guide/configuration)
- [Basic Package](/packages/basic)
- [Integrations](/packages/integrations)
