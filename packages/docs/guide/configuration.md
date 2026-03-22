# Configuration

## Presets

The base package exposes named presets for common setups.

| Preset | Meaning |
| :--- | :--- |
| `Basic` | Core JavaScript rules only |
| `Node` | Core + TypeScript + Node globals |
| `Browser` | Core + TypeScript + browser globals |
| `All` | TypeScript plus all bundled optional integrations |

Framework packages are still explicit even when you use a preset.

## Manual composition

```js
import { eslintConfig, Extension, Format, Library, Testing, Tool } from '@santi020k/eslint-config-basic'
import react from '@santi020k/eslint-config-react'

export default eslintConfig({
  typescript: true,
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

## Strict mode

Use strict mode when you want warnings promoted to errors.

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  strict: true
})
```

## Settings

Gitignore integration is enabled by default.

```js
import { eslintConfig, Setting } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  settings: [Setting.NoGitignore]
})
```

## Related pages

- [CLI](/guide/cli)
- [Optionals package](/packages/optionals)
- [Core package](/packages/core)
