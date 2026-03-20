# @santi020k/eslint-config-basic

[![CI](https://github.com/santi020k/eslint-config-basic/actions/workflows/build.yml/badge.svg)](https://github.com/santi020k/eslint-config-basic/actions/workflows/build.yml)
[![npm version](https://img.shields.io/npm/v/@santi020k/eslint-config-basic.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-basic)
[![npm downloads](https://img.shields.io/npm/dm/@santi020k/eslint-config-basic.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-basic)
[![Docs](https://img.shields.io/badge/docs-TypeDoc-blue.svg)](https://santi020k.github.io/eslint-config-basic/)
<!-- [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) -->
[![license](https://img.shields.io/npm/l/@santi020k/eslint-config-basic.svg)](https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE)


A modern, composable, and opinionated ESLint 9+ (Flat Config) configuration for JavaScript, TypeScript, React, Next.js, and more.

## Features

- **ESLint 9 Flat Config**: Fully native support for the new configuration system.
- **TypeScript**: Robust rules with type-aware linting.
- **React & Next.js**: Optimized for modern web development, including App Router support.
- **Framework Support**: Svelte, Solid, Astro, Vue, Expo, NestJS, and Angular.
- **Composable**: Opt-in to exactly what you need via simple enums.
- **Auto-detection**: Zero-config mode that detects your project type.
- **CLI Utility**: Easily initialize or update your configuration.
- **Strict Mode**: Optional strict rules for a zero-warning codebase.
- **Optimized for AI**: Includes specialized context and workflows for AI agents.

## Installation

```bash
npm install -D eslint @santi020k/eslint-config-basic
```

## Basic Usage

Create an `eslint.config.js` in your project root:

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig()
```

By default, the config will automatically detect if your project uses TypeScript, React, or Next.js.

### Strict Mode

Enable strict mode to promote all warnings to errors, ensuring a zero-warning codebase:

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default [
  ...eslintConfig({ strict: true })
]
```

## Named Presets

For common project types, you can use built-in presets:

```js
import { eslintConfig, PresetOption } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  preset: PresetOption.Node
})
```

| Preset | Purpose |
| :--- | :--- |
| `Basic` | Core JavaScript rules only |
| `Node` | Core + TypeScript + Node.js globals |
| `Browser` | Core + TypeScript + React + Browser globals |
| `All` | Enables every available configuration and optional |

## Manual Configuration

If you prefer to be explicit:

```js
import { ConfigOption, eslintConfig, OptionalOption } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  config: [
    ConfigOption.Ts,
    ConfigOption.React
  ],
  optionals: [
    OptionalOption.Cspell,
    OptionalOption.Tailwind,
    OptionalOption.Vitest,
    OptionalOption.I18next,
    OptionalOption.Mdx,
    OptionalOption.Markdown,
    OptionalOption.Stencil,
    OptionalOption.Prettier,
    OptionalOption.Regexp,
    OptionalOption.Unicorn,
    OptionalOption.Sonarjs,
    OptionalOption.Playwright,
    OptionalOption.Security,
    OptionalOption.TanstackQuery,
    OptionalOption.TanstackRouter,
    OptionalOption.Perfectionist,
    OptionalOption.Jsdoc,
    OptionalOption.Swagger,
    OptionalOption.Storybook,
    OptionalOption.Jsonc,
    OptionalOption.Yaml,
    OptionalOption.Toml
  ]
})
```

### Next.js App Router

Enable specialized rules for the App Router:

```js
import { ConfigOption, eslintConfig, NextMode } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  config: [ConfigOption.Next],
  nextMode: NextMode.AppRouter
})
```

## Framework Support

This package uses **lazy loading** for framework-specific dependencies (Svelte, Solid, Angular) to keep the core package light and avoid peer dependency conflicts.

To use them, install the corresponding config package:

```bash
npm install -D @santi020k/eslint-config-svelte # Or solid / angular
```

Then load the config:

```js
import { eslintConfig, loadFrameworkConfig } from '@santi020k/eslint-config-basic'

const svelteConfig = await loadFrameworkConfig('@santi020k/eslint-config-svelte')

export default [
  ...eslintConfig(),
  ...svelteConfig
]
```

## CLI Utility

You can use the built-in CLI to easily initialize or update your configuration:

```bash
npx @santi020k/eslint-config-basic init
```

The package also provides a `basic-eslint` binary:

```bash
npx basic-eslint init    # Initialize eslint.config.js
```

## Settings

### Gitignore

Gitignore integration is enabled by default. If you need to disable it:

```js
import { eslintConfig, SettingOption } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  settings: [SettingOption.NoGitignore]
})
```

## Inspector

Visualize your configuration with the built-in inspector:

```bash
npm run inspector
```

This opens an interactive UI where you can see all active rules, plugins, and config layers. It's useful for debugging which rules are applied.

## AI Agent Capabilities

This project is optimized for AI agents and LLM-based tools. It includes an `.agent/skills/` directory containing specialized workflows, guidelines, and context specific to this monorepo. Agents can automatically use these skills to assist with development, testing, and release processes.

## Monorepo Structure

This project is a monorepo managed with **Turbo** and **npm Workspaces**.

- `packages/core`: Core logic and shared types.
- `packages/typescript`: TypeScript specific rules.
- `packages/react`: React and Hooks rules.
- `packages/next`: Next.js rules.
- `packages/astro`: Astro rules.
- `packages/expo`: Expo/React Native rules.
- `packages/svelte`: Svelte support.
- `packages/solid`: Solid support.
- `packages/angular`: Angular support.
- `packages/optionals`: Optional configurations (Tailwind, Vitest, etc.).

## Development

If you want to contribute or modify the configurations:

### Prerequisites

- Node.js (version specified in `.nvmrc`)
- npm

### Setup

```bash
npm install
```

### Useful Commands

```bash
npm run build      # Build all packages using Turbo
npm run lint       # Lint all packages
npm run test       # Run integration tests
npm run dev        # Development mode with watch
npm run inspector  # Open ESLint config inspector
npm run docs       # Generate API documentation
```

### Publishing Workflow

This repository uses **Changesets** to automatically handle workspace dependency versioning and publishing to npm.

1. Generate a changeset: `npm run changeset`
2. Bump versions: `npm run version-packages`
3. Publish: `npm run release`

## API Documentation

Auto-generated API docs are available online:
[**https://santi020k.github.io/eslint-config-basic/**](https://santi020k.github.io/eslint-config-basic/)

## Compatibility & Known Issues

### Astro 5+

This package includes robust defaults for Astro projects, including:

- Automatic detection of virtual scripts inside `.astro` files.
- Support for JSX/TSX inside Astro components.

## Opinionated but Flexible

This configuration is based on personal best practices and may evolve. I recommend using a fixed version (no `^` or `~`) to avoid unexpected changes. If a rule is too strict, you can always adjust or disable it in your custom config.

## Scripts

Add these to your `package.json` for easier workflow:

```json
"scripts": {
  "lint": "eslint . --report-unused-disable-directives",
  "lint:fix": "npm run lint -- --fix"
}
```

## Acknowledgements

Special thanks to the developers and maintainers of these projects:

- [eslint-config-standard](https://www.npmjs.com/package/eslint-config-standard)
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)
- [eslint-plugin-n](https://www.npmjs.com/package/eslint-plugin-n)
- [eslint-plugin-promise](https://www.npmjs.com/package/eslint-plugin-promise)
- [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
- [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)
- [eslint-plugin-simple-import-sort](https://www.npmjs.com/package/eslint-plugin-simple-import-sort)
- [eslint-plugin-sonarjs](https://www.npmjs.com/package/eslint-plugin-sonarjs)
- [eslint-plugin-unused-imports](https://www.npmjs.com/package/eslint-plugin-unused-imports)
- [@stylistic/eslint-plugin](https://www.npmjs.com/package/@stylistic/eslint-plugin)
- [@typescript-eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)
- [@cspell/eslint-plugin](https://www.npmjs.com/package/@cspell/eslint-plugin)
- [eslint-plugin-better-tailwindcss](https://www.npmjs.com/package/eslint-plugin-better-tailwindcss)
- [eslint-plugin-vitest](https://www.npmjs.com/package/eslint-plugin-vitest)
- [eslint-plugin-astro](https://www.npmjs.com/package/eslint-plugin-astro)
- [eslint-plugin-next](https://www.npmjs.com/package/eslint-plugin-next)
- [eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)
- [eslint-plugin-unicorn](https://www.npmjs.com/package/eslint-plugin-unicorn)
- [eslint-plugin-regexp](https://www.npmjs.com/package/eslint-plugin-regexp)
- [eslint-plugin-i18next](https://www.npmjs.com/package/eslint-plugin-i18next)
- [eslint-plugin-mdx](https://www.npmjs.com/package/eslint-plugin-mdx)
- [eslint-plugin-markdown](https://www.npmjs.com/package/eslint-plugin-markdown)
- [@stencil-community/eslint-plugin](https://www.npmjs.com/package/@stencil-community/eslint-plugin)
- [eslint-plugin-jsdoc](https://www.npmjs.com/package/eslint-plugin-jsdoc)
- [eslint-plugin-perfectionist](https://www.npmjs.com/package/eslint-plugin-perfectionist)
- [eslint-plugin-security](https://www.npmjs.com/package/eslint-plugin-security)
- [eslint-plugin-storybook](https://www.npmjs.com/package/eslint-plugin-storybook)
- [eslint-plugin-swagger](https://www.npmjs.com/package/eslint-plugin-swagger)
- [eslint-plugin-jsonc](https://www.npmjs.com/package/eslint-plugin-jsonc)
- [eslint-plugin-yml](https://www.npmjs.com/package/eslint-plugin-yml)
- [eslint-plugin-toml](https://www.npmjs.com/package/eslint-plugin-toml)
- [@tanstack/eslint-plugin-query](https://www.npmjs.com/package/@tanstack/eslint-plugin-query)
- [@tanstack/eslint-plugin-router](https://www.npmjs.com/package/@tanstack/eslint-plugin-router)
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)
- [eslint-config-expo](https://www.npmjs.com/package/eslint-config-expo)

## License

MIT
