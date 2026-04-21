# Basic Package

Package: [`@santi020k/eslint-config-basic`](https://www.npmjs.com/package/@santi020k/eslint-config-basic)

This is the main package of the monorepo and the entry point most projects should install first.

## What It Owns

- The `eslintConfig()` composer used in application `eslint.config.*` files.
- The public enums and helper types re-exported from the core package.
- Framework composition and framework contract checks.
- Optional tooling composition for libraries, testing, formats, tools, and extensions.
- The `basic-eslint` CLI.
- Strict-mode promotion and final config ordering.

## When to Use It

Use this package when you want the supported public API for the project.

- Application projects should start here.
- Shared internal configs can usually wrap this package instead of rebuilding the whole stack from `core`.
- Framework packages are layered into this package instead of replacing it.

## Minimal Example

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig()
```

## Composed Example

```js
import { eslintConfig, Extension, Library, Testing, Tool } from '@santi020k/eslint-config-basic'
import react from '@santi020k/eslint-config-react'

export default eslintConfig({
  typescript: true,
  frameworks: {
    react
  },
  libraries: [Library.Tailwind],
  testing: [Testing.Vitest],
  tools: [Tool.Prettier],
  extensions: [Extension.Unicorn]
})
```

## Auto-Detection

The package can automatically identify frameworks and settings from your project structure. You can use `detectProjectOptions()` to see what is detected, or simply call `eslintConfig()` with no arguments to use the defaults.

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

// This will automatically detect TypeScript, React, Next.js, etc.
export default eslintConfig()
```

> [!IMPORTANT]
> Since version 1.4.0, detected frameworks are reported via the `detectedFrameworks` field. The `frameworks` object in the detection result remains empty to prevent `TypeError` when spreading it into `eslintConfig()` (as framework options require imported config objects).

## Main Responsibilities

### Public Composition API

The package turns a small, explicit options object into the final flat-config array. That includes runtime globals, framework packages, optional tooling, typed-rule protection for virtual files, and final ordering.

### Re-Exports

The package re-exports the enums and helpers most users need, so consumers rarely need to import `@santi020k/eslint-config-core` directly.

### CLI

The built-in CLI can scaffold or refresh the config file for a project:

::: code-group

```sh [pnpm]
pnpm dlx @santi020k/eslint-config-basic init
pnpm dlx @santi020k/eslint-config-basic update
```

```sh [npm]
npx @santi020k/eslint-config-basic init
npx @santi020k/eslint-config-basic update
```

```sh [yarn]
yarn dlx @santi020k/eslint-config-basic init
yarn dlx @santi020k/eslint-config-basic update
```

```sh [bun]
bunx @santi020k/eslint-config-basic init
bunx @santi020k/eslint-config-basic update
```

:::

### Contracts

This package also protects the public contracts of the library. For example:

- Next.js and Expo require the React framework package.
- Presets never silently inject framework packages.
- Optional tooling stays explicit in the generated config file.

## Repository Links

- Source Package: [packages/basic](https://github.com/santi020k/eslint-config-basic/tree/main/packages/basic)
- Project Repository: [santi020k/eslint-config-basic](https://github.com/santi020k/eslint-config-basic)
- Author: [santi020k](https://santi020k.com)

## Related Pages

- [Getting Started](/guide/getting-started)
- [Configuration](/guide/configuration)
- [CLI](/guide/cli)
- [API Reference](/api/)
