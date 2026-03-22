# @santi020k/eslint-config-basic

[![CI](https://github.com/santi020k/eslint-config-basic/actions/workflows/build.yml/badge.svg)](https://github.com/santi020k/eslint-config-basic/actions/workflows/build.yml)
[![npm version](https://img.shields.io/npm/v/@santi020k/eslint-config-basic.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-basic)
[![npm downloads](https://img.shields.io/npm/dm/@santi020k/eslint-config-basic.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-basic)
[![Docs](https://img.shields.io/badge/docs-TypeDoc-blue.svg)](https://santi020k.github.io/eslint-config-basic/)
<!-- [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) -->
[![license](https://img.shields.io/npm/l/@santi020k/eslint-config-basic.svg)](https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE)

A modern, composable, and opinionated ESLint 10+ flat-config toolchain for JavaScript and TypeScript, with optional framework packages for React, Next.js, Astro, Vue, and more.

## Features

- **ESLint 10 Flat Config**: Fully native support for the current configuration system.
- **TypeScript**: Robust rules with type-aware linting.
- **React & Next.js**: Optimized for modern web development, including App Router support.
- **Framework Support**: Svelte, Solid, Astro, Vue, Expo, NestJS, and Angular.
- **Composable**: Opt-in to exactly what you need via simple enums.
- **Auto-detection**: Detects TypeScript, runtime, and supported optional integrations from `package.json`.
- **CLI Utility**: Easily initialize or update your configuration.
- **Strict Mode**: Optional strict rules for a zero-warning codebase.
- **Optimized for AI**: Includes specialized context and workflows for AI agents.

## Installation & Configuration

Create an `eslint.config.mjs` (or `.js` with `type: module`) in your project root.

### 1. Basic Installation

```bash
npm install -D eslint @santi020k/eslint-config-basic
```

### 2. Modular Framework Support

Framework-specific configurations are optional and must be installed separately. This keeps the base package light and avoids dependency conflicts.

```bash
# For React projects
npm install -D @santi020k/eslint-config-react

# For Next.js projects
npm install -D @santi020k/eslint-config-next

# For Astro projects
npm install -D @santi020k/eslint-config-astro

# For Vue projects
npm install -D @santi020k/eslint-config-vue
```

### 3. Basic Usage

By default, the config auto-detects TypeScript, runtime, and supported optional integrations from your `package.json`. Framework configs remain explicit imports, or can be scaffolded with the CLI.

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig()
```

### 4. Named Presets

For common project types, you can use built-in presets:

```js
import { eslintConfig, Preset } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  preset: Preset.Node
})
```

| Preset | Purpose |
| :--- | :--- |
| `Basic` | Core JavaScript rules only |
| `Node` | Core + TypeScript + Node.js globals |
| `Browser` | Core + TypeScript + Browser globals |
| `All` | Enables all bundled optionals and TypeScript support |

> [!NOTE]
> Framework packages such as React, Next.js, Astro, Vue, and Expo are still passed explicitly through the `frameworks` option.

### 5. Manual Configuration

If you want to be explicit about which configurations and optionals to enable:

```js
import { eslintConfig, Extension, Format, Library, Testing, Tool } from '@santi020k/eslint-config-basic'
import react from '@santi020k/eslint-config-react'

export default eslintConfig({
  typescript: true,
  frameworks: {
    react // Pass the framework config here
  },
  libraries: [
    Library.Tailwind,
    Library.I18next,
    Library.Stencil,
    Library.TanstackQuery,
    Library.TanstackRouter,
    Library.Storybook
  ],
  tools: [
    Tool.Cspell,
    Tool.Prettier,
    Tool.Jsdoc,
    Tool.Swagger
  ],
  testing: [
    Testing.Vitest,
    Testing.Playwright
  ],
  formats: [
    Format.Mdx,
    Format.Markdown,
    Format.Jsonc,
    Format.Yaml,
    Format.Toml
  ],
  extensions: [
    Extension.Regexp,
    Extension.Unicorn,
    Extension.Sonarjs,
    Extension.Security,
    Extension.Perfectionist
  ]
})
```

## Supported Frameworks

Every framework is supported via a dedicated package and has a corresponding playground for verification.

| Framework | Package | Playground |
| :--- | :--- | :--- |
| **TypeScript** | `@santi020k/eslint-config-typescript` | [Playground](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/typescript) |
| **React** | `@santi020k/eslint-config-react` | [Playground](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/react) |
| **Next.js** | `@santi020k/eslint-config-next` | [Playground](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/next) |
| **Astro** | `@santi020k/eslint-config-astro` | [Playground](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/astro) |
| **Vue** | `@santi020k/eslint-config-vue` | [Playground](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/vue) |
| **Svelte** | `@santi020k/eslint-config-svelte` | [Playground](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/svelte) |
| **Solid** | `@santi020k/eslint-config-solid` | [Playground](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/solid) |
| **Angular** | `@santi020k/eslint-config-angular` | [Playground](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/angular) |
| **NestJS** | `@santi020k/eslint-config-nest` | [Playground](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/nest) |
| **Expo** | `@santi020k/eslint-config-expo` | [Playground](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/expo) |

## Optional Tooling

We support 23+ optional configurations across the `libraries`, `testing`, `formats`, `tools`, and `extensions` options.

| Tool | Option | Playground |
| :--- | :--- | :--- |
| **CSpell** | `Tool.Cspell` | [Playground](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/tools/cspell) |
| **Tailwind CSS** | `Library.Tailwind` | [Playground](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/libraries/tailwind) |
| **Vitest** | `Testing.Vitest` | [Playground](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/testing/vitest) |
| **I18n** | `Library.I18next` | [Playground](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/libraries/i18next) |
| **Markdown** | `Format.Markdown` | [Playground](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/formats/markdown) |
| **Others** | `Mdx`, `Storybook`, `Playwright`, etc. | [Formats Playground](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/formats) |

> [!TIP]
> Use the **categorized playgrounds** (libraries, testing, formats, tools, extensions) to see examples of the 18+ additional optional configurations including Tanstack Query, Stencil, SonarJS, and more.

### 6. Strict Mode

Enable strict mode to promote all warnings to errors, ensuring a zero-warning codebase:

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({ strict: true })
```

### 7. Next.js App Router

Enable specialized rules for the App Router:

```js
import { eslintConfig, NextMode } from '@santi020k/eslint-config-basic'
import next from '@santi020k/eslint-config-next'
import react from '@santi020k/eslint-config-react'

export default eslintConfig({
  typescript: true,
  nextMode: NextMode.AppRouter,
  frameworks: {
    next,
    react
  }
})
```

## CLI Utility

You can use the built-in CLI to initialize a config or refresh an existing one:

```bash
npx @santi020k/eslint-config-basic init
```

The package also provides a `basic-eslint` binary:

```bash
npx basic-eslint init    # Create eslint.config.js or eslint.config.mjs
npx basic-eslint update  # Refresh the detected config
```

The CLI writes `eslint.config.js` for ESM projects (`"type": "module"`) and `eslint.config.mjs` otherwise.

## Settings

### Gitignore

Gitignore integration is enabled by default. If you need to disable it:

```js
import { eslintConfig, Setting } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  settings: [Setting.NoGitignore]
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

- Node.js 18.18+ (CI currently runs on Node.js 20 and 22)
- npm

## Versioning Policy

This project aims to follow SemVer intent even while it is still below `1.0.0`.

- Patch releases focus on bug fixes, packaging fixes, docs updates, and non-breaking DX improvements.
- Minor releases may add new presets, new optional integrations, or adjust rule sets in a documented way.
- Breaking API or policy changes are called out clearly in the changelog and migration notes.

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
