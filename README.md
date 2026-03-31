# @santi020k/eslint-config-basic

[![CI](https://github.com/santi020k/eslint-config-basic/actions/workflows/build.yml/badge.svg)](https://github.com/santi020k/eslint-config-basic/actions/workflows/build.yml)
[![npm version](https://img.shields.io/npm/v/@santi020k/eslint-config-basic.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-basic)
[![npm downloads](https://img.shields.io/npm/dm/@santi020k/eslint-config-basic.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-basic)
[![Docs](https://img.shields.io/badge/docs-VitePress-114d66.svg)](https://eslint.santi020k.me/)
[![license](https://img.shields.io/npm/l/@santi020k/eslint-config-basic.svg)](https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE)

Composable ESLint 10+ flat-config tooling for JavaScript and TypeScript projects, with optional framework packages for React, Next.js, Astro, Vue, Svelte, Solid, Angular, NestJS, Expo, Qwik, and Remix.

## Canonical Docs

- Docs site: [eslint.santi020k.me](https://eslint.santi020k.me/)
- Repository: [github.com/santi020k/eslint-config-basic](https://github.com/santi020k/eslint-config-basic)
- Author: [santi020k](https://santi020k.me)

## ✨ Key Features

- **🎯 Composable & Modular**: Mix and match configurations for different frameworks and tools using a clean, options-based API.
- **🔍 Zero-Config Auto-Detection**: Automatically detects your project's frameworks, libraries, and tools to provide a sensible default configuration.
- **⚡ Lazy Loading**: Framework-specific configurations are loaded only when needed, ensuring maximum performance and avoiding unnecessary peer dependency conflicts.
- **🛡️ Strict Mode**: Opt-in `strict: true` to promote all warnings to errors, perfect for CI/CD and maintaining high code standards.
- **🌐 Smart Runtime Support**: Built-in support for Node.js, Browser, or Universal runtimes with appropriate globals and rules.
- **💅 Prettier Integrated**: Seamlessly integrated with Prettier out of the box for consistent code formatting.
- **🧩 Extensive Plugin Support**: Tailored rules for Tailwind CSS, Vitest, Testing Library, Storybook, TanStack (Query/Router), and more.

## 🚀 Quick Start

### Installation

```bash
npm install -D eslint @santi020k/eslint-config-basic
```

### Usage

Create an `eslint.config.js` in your project root:

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig()
```

## Framework packages

- TypeScript: [`@santi020k/eslint-config-typescript`](https://eslint.santi020k.me/frameworks/typescript.html)
- React: [`@santi020k/eslint-config-react`](https://eslint.santi020k.me/frameworks/react.html)
- Next.js: [`@santi020k/eslint-config-next`](https://eslint.santi020k.me/frameworks/next.html)
- Astro: [`@santi020k/eslint-config-astro`](https://eslint.santi020k.me/frameworks/astro.html)
- Vue: [`@santi020k/eslint-config-vue`](https://eslint.santi020k.me/frameworks/vue.html)
- Svelte: [`@santi020k/eslint-config-svelte`](https://eslint.santi020k.me/frameworks/svelte.html)
- Solid: [`@santi020k/eslint-config-solid`](https://eslint.santi020k.me/frameworks/solid.html)
- Angular: [`@santi020k/eslint-config-angular`](https://eslint.santi020k.me/frameworks/angular.html)
- NestJS: [`@santi020k/eslint-config-nest`](https://eslint.santi020k.me/frameworks/nest.html)
- Expo: [`@santi020k/eslint-config-expo`](https://eslint.santi020k.me/frameworks/expo.html)
- Qwik: [`@santi020k/eslint-config-qwik`](https://eslint.santi020k.me/frameworks/qwik.html)
- Remix: [`@santi020k/eslint-config-remix`](https://eslint.santi020k.me/frameworks/remix.html)

## Development

```bash
npm run build   # Build all packages
npm run test    # Run integration tests
npm run lint    # Run linting checks
```

---

*Authored with ❤️ by [santi020k](https://santi020k.me)*
