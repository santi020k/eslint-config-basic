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

## Main Responsibilities

### Public Composition API

The package turns a small, explicit options object into the final flat-config array. That includes runtime globals, framework packages, optional tooling, typed-rule protection for virtual files, and final ordering.

### Re-Exports

The package re-exports the enums and helpers most users need, so consumers rarely need to import `@santi020k/eslint-config-core` directly.

### CLI

The built-in CLI can scaffold or refresh the config file for a project:

```bash
npx basic-eslint init
npx basic-eslint update
```

### Contracts

This package also protects the public contracts of the library. For example:

- Next.js and Expo require the React framework package.
- Presets never silently inject framework packages.
- Optional tooling stays explicit in the generated config file.

## Repository Links

- Source Package: [packages/basic](https://github.com/santi020k/eslint-config-basic/tree/main/packages/basic)
- Project Repository: [santi020k/eslint-config-basic](https://github.com/santi020k/eslint-config-basic)
- Author: [santi020k](https://santi020k.me)

## Related Pages

- [Getting Started](/guide/getting-started)
- [Configuration](/guide/configuration)
- [CLI](/guide/cli)
- [API Reference](/api/)
