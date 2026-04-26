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
  - This is **auto-detected** if an `app/` or `src/app/` directory is present.
- When you write the config manually, pass imported framework packages instead of booleans.

## Configuration Priority

The `eslintConfig` function uses a hierarchical merging strategy for its settings:

1. **User Options**: Any field explicitly passed to `eslintConfig({})` always takes the highest priority.
2. **Preset Defaults**: If a `preset` is chosen, its default values are used for any fields not explicitly provided by the user.
3. **Auto-Detection**: If a field is still `undefined`, it falls back to values detected from your `package.json`, `tsconfig.json`, and project structure.

> [!TIP]
> To disable a feature that is being auto-detected, explicitly set it to `false` or an empty array (e.g., `typescript: false` or `libraries: []`).

## Full Settings Example

For large projects with multiple integrations, you can activate everything in a single call. Most of these will be auto-detected if the packages exist in your dependencies, but you can be explicit:

```js
import { eslintConfig, Extension, Format, Library, Testing, Tool } from '@santi020k/eslint-config-basic'
import next from '@santi020k/eslint-config-next'
import react from '@santi020k/eslint-config-react'

export default eslintConfig({
  // Enable TypeScript support (auto-detected if tsconfig.json exists)
  typescript: true,

  // Strict mode: all warnings become errors
  strict: true,

  // Frameworks (imports are lazy-loaded)
  frameworks: {
    react,
    next
  },

  // Libraries & Styling
  libraries: [
    Library.Tailwind,
    Library.TanstackQuery,
    Library.TanstackRouter,
    Library.Storybook,
    Library.I18next
  ],

  // Testing Frameworks
  testing: [
    Testing.Vitest,
    Testing.Playwright,
    Testing.TestingLibrary,
    Testing.Cypress
  ],

  // File Formats
  formats: [
    Format.Mdx,
    Format.Markdown,
    Format.Jsonc,
    Format.Graphql,
    Format.Yaml,
    Format.Toml
  ],

  // Standalone Tools
  tools: [
    Tool.Prettier,
    Tool.Cspell,
    Tool.Jsdoc
  ],

  // Specialized Extensions
  extensions: [
    Extension.Unicorn,
    Extension.Sonarjs,
    Extension.Perfectionist,
    Extension.Security,
    Extension.Regexp,
    Extension.BestPractices
  ]
})
```

## Framework Matrix

| Framework | Package | Special Notes |
| :--- | :--- | :--- |
| TypeScript | `typescript: true` | Automatically detected from `tsconfig.json`. |
| React | `@santi020k/eslint-config-react` | Base for React, Next.js, Remix, and Expo. |
| Next.js | `@santi020k/eslint-config-next` | [Dedicated Page](/frameworks/next). Requires `react`. |
| Astro | `@santi020k/eslint-config-astro` | [Dedicated Page](/frameworks/astro). |
| Vue | `@santi020k/eslint-config-vue` | [Dedicated Page](/frameworks/vue). |
| Svelte | `@santi020k/eslint-config-svelte` | [Dedicated Page](/frameworks/svelte). |
| Solid | `@santi020k/eslint-config-solid` | [Dedicated Page](/frameworks/solid). |
| Qwik | `@santi020k/eslint-config-qwik` | [Dedicated Page](/frameworks/qwik). |
| Remix | `@santi020k/eslint-config-remix` | [Dedicated Page](/frameworks/remix). Commonly paired with `react` in Remix apps. |
| Hono | `@santi020k/eslint-config-hono` | [Dedicated Page](/frameworks/hono). Optimized for Hono and edge runtimes. |
| Angular | `@santi020k/eslint-config-angular` | [Dedicated Page](/frameworks/angular). |
| NestJS | `@santi020k/eslint-config-nest` | [Dedicated Page](/frameworks/nest). |
| Expo | `@santi020k/eslint-config-expo` | [Dedicated Page](/frameworks/expo). Requires `react`. |

## Optional Tooling

The optional integrations are grouped into five categories:

- Libraries: `libraries`
- Testing: `testing`
- Formats: `formats`
- Tools: `tools`
- Extensions: `extensions`

See the dedicated section for the full catalog: [Tooling Overview](/tooling/overview)

## Common Patterns

### Fullstack Remix + Tailwind

```js
import { eslintConfig, Library } from '@santi020k/eslint-config-basic'
import react from '@santi020k/eslint-config-react'
import remix from '@santi020k/eslint-config-remix'

export default eslintConfig({
  frameworks: { react, remix },
  libraries: [Library.Tailwind]
})
```

### Astro + Svelte + Vitest

```js
import astro from '@santi020k/eslint-config-astro'
import { eslintConfig, Testing } from '@santi020k/eslint-config-basic'
import svelte from '@santi020k/eslint-config-svelte'

export default eslintConfig({
  frameworks: { astro, svelte },
  testing: [Testing.Vitest]
})
```

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
