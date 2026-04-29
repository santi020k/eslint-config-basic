# Configuration

The main package composes the final flat config array from one public install: `@santi020k/eslint-config-basic`.

## Mental Model

- Start with `eslintConfig()`.
- Let project detection enable TypeScript, frameworks, runtime, and supported tooling.
- Make options explicit when you want stable, reviewable config.
- Use booleans for bundled framework configs.
- Use enums for optional tooling.

## Core Composition Model

```js
import { eslintConfig, Extension, Format, Library, Runtime, Testing, Tool } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  typescript: true,
  runtime: Runtime.Browser,
  frameworks: {
    react: true
  },
  libraries: [Library.Tailwind, Library.I18next],
  testing: [Testing.Vitest],
  formats: [Format.Markdown, Format.Mdx],
  tools: [Tool.Prettier],
  extensions: [Extension.Unicorn, Extension.Security]
})
```

## Presets

| Preset | Meaning |
| :--- | :--- |
| `Basic` | Core JavaScript rules only. |
| `Node` | Core + TypeScript + Node globals. |
| `Browser` | Core + TypeScript + Browser globals. |
| `Worker` | Core + TypeScript + worker globals. |
| `All` | TypeScript plus all bundled optional integrations. |

Presets do not force a framework. Frameworks come from project detection or the `frameworks` option.

## Frameworks

```js
import { eslintConfig, NextMode } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  nextMode: NextMode.AppRouter,
  frameworks: {
    next: true
  }
})
```

Next.js, Expo, and Remix automatically include React rules. You can still pass imported config arrays or factories for advanced cases, but app configs should prefer booleans.

| Framework | Option |
| :--- | :--- |
| React | `frameworks.react` |
| Next.js | `frameworks.next` |
| Astro | `frameworks.astro` |
| Vue | `frameworks.vue` |
| Svelte | `frameworks.svelte` |
| Solid | `frameworks.solid` |
| Angular | `frameworks.angular` |
| NestJS | `frameworks.nest` |
| Hono | `frameworks.hono` |
| Expo | `frameworks.expo` |
| Qwik | `frameworks.qwik` |
| Remix | `frameworks.remix` |

## Configuration Priority

1. Explicit options passed to `eslintConfig({})`.
2. Preset defaults.
3. Auto-detection from `package.json`, `tsconfig.json`, and project structure.

To disable something detected automatically, pass the disabled value explicitly, such as `typescript: false`, `frameworks: {}`, or `libraries: []`.

## Full Example

```js
import { eslintConfig, Extension, Format, Library, Testing, Tool } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  typescript: true,
  strict: true,
  frameworks: {
    react: true,
    next: true
  },
  libraries: [
    Library.Tailwind,
    Library.TanstackQuery,
    Library.TanstackRouter,
    Library.Storybook,
    Library.I18next
  ],
  testing: [
    Testing.Vitest,
    Testing.Playwright,
    Testing.TestingLibrary,
    Testing.Cypress
  ],
  formats: [
    Format.Mdx,
    Format.Markdown,
    Format.Jsonc,
    Format.Graphql,
    Format.Yaml,
    Format.Toml
  ],
  tools: [
    Tool.Prettier,
    Tool.Cspell,
    Tool.Jsdoc
  ],
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

## Common Patterns

### Fullstack Remix + Tailwind

```js
import { eslintConfig, Library } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  frameworks: { remix: true },
  libraries: [Library.Tailwind]
})
```

### Astro + Svelte + Vitest

```js
import { eslintConfig, Testing } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  frameworks: { astro: true, svelte: true },
  testing: [Testing.Vitest]
})
```

## Strict Mode

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  strict: true
})
```

Strict mode promotes warning severities to errors across the composed config.

## Settings

Gitignore integration is enabled by default.

```js
import { eslintConfig, Setting } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  settings: [Setting.NoGitignore]
})
```

## Related Pages

- [Installation](/guide/installation)
- [v1 to v2 Migration](/guide/migration-v1-to-v2)
- [Framework Guides](/frameworks/typescript)
- [Optional Tooling](/tooling/overview)
