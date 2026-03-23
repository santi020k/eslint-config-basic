# Configuration

The main package composes the final config array from a small set of clear inputs:

- Framework packages passed through `frameworks`.
- Optional integrations passed through enums such as `Library`, `Testing`, `Format`, `Tool`, and `Extension`.
- Runtime and preset choices.
- Global settings such as `strict` and `settings`.

## Mental Model

Think of the config in three layers:

- Start with the main package and optional TypeScript support.
- Add explicit framework packages for the application stack.
- Add optional tooling through enums for libraries, testing, formats, tools, and extensions.

That keeps the final config readable while still giving you a broad feature set.

## Core Composition Model

```js
import { eslintConfig, Extension, Format, Library, Runtime, Testing, Tool } from '@santi020k/eslint-config-basic'
import react from '@santi020k/eslint-config-react'

export default eslintConfig({
  typescript: true,
  runtime: Runtime.Browser,
  frameworks: {
    react
  },
  libraries: [Library.Tailwind, Library.I18next],
  testing: [Testing.Vitest],
  formats: [Format.Markdown, Format.Mdx],
  tools: [Tool.Prettier],
  extensions: [Extension.Unicorn, Extension.Security]
})
```

## Presets

The base package exposes named presets for common setups.

| Preset | Meaning |
| :--- | :--- |
| `Basic` | Core JavaScript rules only. |
| `Node` | Core + TypeScript + Node globals. |
| `Browser` | Core + TypeScript + Browser globals. |
| `All` | TypeScript plus all bundled optional integrations from the main package. |

Framework packages are still explicit even when you use a preset.

## Minimal Config

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig()
```

## Runtime and Framework Contracts

- `Runtime.Node` enables Node.js globals.
- `Runtime.Browser` enables browser globals.
- `Runtime.Universal` keeps both environments available.
- `frameworks.react` is required when `frameworks.next` or `frameworks.expo` is used.
- `nextMode: NextMode.AppRouter` adds the App Router override for Next.js.
- When you write the config manually, pass imported framework packages instead of booleans.

## Auto-Detection

When you call `eslintConfig()` with no arguments, or when you use the CLI, the project can auto-detect:

- TypeScript from `tsconfig.json`.
- Runtime hints from frameworks such as Next.js or NestJS.
- Supported libraries such as Tailwind, I18next, Storybook, Stencil, TanStack Query, and TanStack Router.
- Supported testing tools such as Vitest and Playwright.
- Swagger and the default Security extension.

Framework packages still remain explicit in source code, even when the project dependencies reveal which framework is in use.

## Framework Matrix

| Framework | Package | Special Notes |
| :--- | :--- | :--- |
| TypeScript | `typescript: true` or `@santi020k/eslint-config-typescript` | Automatically detected from `tsconfig.json`. |
| React | `@santi020k/eslint-config-react` | Common base for React, Next.js, and Expo. |
| Next.js | `@santi020k/eslint-config-next` | Requires `frameworks.react`. |
| Astro | `@santi020k/eslint-config-astro` | Works with TypeScript virtual-file protections. |
| Vue | `@santi020k/eslint-config-vue` | Intended for Vue single-file components. |
| Svelte | `@santi020k/eslint-config-svelte` | Works with embedded scripts and virtual files. |
| Solid | `@santi020k/eslint-config-solid` | Combine with TypeScript when appropriate. |
| Angular | `@santi020k/eslint-config-angular` | Usually paired with TypeScript. |
| NestJS | `@santi020k/eslint-config-nest` | Commonly paired with `Runtime.Node`. |
| Expo | `@santi020k/eslint-config-expo` | Requires `frameworks.react`. |

## Optional Tooling

The optional integrations are grouped into five categories:

- Libraries: `libraries`
- Testing: `testing`
- Formats: `formats`
- Tools: `tools`
- Extensions: `extensions`

See the dedicated section for the full catalog:

- [Tooling Overview](/tooling/overview)
- [Libraries](/tooling/libraries)
- [Testing](/tooling/testing)
- [Formats](/tooling/formats)
- [Tools](/tooling/tools)
- [Extensions](/tooling/extensions)

## Strict Mode

Use strict mode when you want warnings promoted to errors.

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  strict: true
})
```

Strict mode promotes warning severities to errors across the composed config, including array-style rule definitions.

## Settings

Gitignore integration is enabled by default.

```js
import { eslintConfig, Setting } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  settings: [Setting.NoGitignore]
})
```

## Common Patterns

### Browser Application

```js
import { eslintConfig, Preset } from '@santi020k/eslint-config-basic'
import react from '@santi020k/eslint-config-react'

export default eslintConfig({
  preset: Preset.Browser,
  frameworks: {
    react
  }
})
```

### Node Service

```js
import { eslintConfig, Preset } from '@santi020k/eslint-config-basic'
import nest from '@santi020k/eslint-config-nest'

export default eslintConfig({
  preset: Preset.Node,
  frameworks: {
    nest
  }
})
```

## Recommended Workflow

- Start with `eslintConfig()`.
- Add framework packages explicitly.
- Add optional integrations through enums.
- Use the CLI if you want the first config file scaffolded for you.
- Use the inspector when the final config needs debugging.

## Repository Links

- Main Package Source: [packages/basic](https://github.com/santi020k/eslint-config-basic/tree/main/packages/basic)
- Core Types And Detection: [packages/core](https://github.com/santi020k/eslint-config-basic/tree/main/packages/core)

## Related Pages

- [CLI](/guide/cli)
- [Inspector](/guide/inspector)
- [Basic Package](/packages/basic)
- [Optionals Package](/packages/optionals)
- [Core Package](/packages/core)
