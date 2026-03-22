# @santi020k/eslint-config-basic

[![CI](https://github.com/santi020k/eslint-config-basic/actions/workflows/build.yml/badge.svg)](https://github.com/santi020k/eslint-config-basic/actions/workflows/build.yml)
[![npm version](https://img.shields.io/npm/v/@santi020k/eslint-config-basic.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-basic)
[![npm downloads](https://img.shields.io/npm/dm/@santi020k/eslint-config-basic.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-basic)
[![Docs](https://img.shields.io/badge/docs-VitePress-114d66.svg)](https://santi020k.github.io/eslint-config-basic/)
[![license](https://img.shields.io/npm/l/@santi020k/eslint-config-basic.svg)](https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE)

Composable ESLint 10+ flat-config tooling for JavaScript and TypeScript projects, with optional framework packages for React, Next.js, Astro, Vue, Svelte, Solid, Angular, NestJS, and Expo.

## Canonical Docs

- Docs site: [santi020k.github.io/eslint-config-basic](https://santi020k.github.io/eslint-config-basic/)
- Repository: [github.com/santi020k/eslint-config-basic](https://github.com/santi020k/eslint-config-basic)
- Website: [santi020k.me](https://santi020k.me)

> [!NOTE]
> The docs site is built with VitePress. The planned production hostname is `eslint.santi020k.me`.

## Quick Start

```bash
npm install -D eslint @santi020k/eslint-config-basic
```

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig()
```

## Framework packages

- TypeScript: [`@santi020k/eslint-config-typescript`](https://santi020k.github.io/eslint-config-basic/frameworks/typescript.html)
- React: [`@santi020k/eslint-config-react`](https://santi020k.github.io/eslint-config-basic/frameworks/react.html)
- Next.js: [`@santi020k/eslint-config-next`](https://santi020k.github.io/eslint-config-basic/frameworks/next.html)
- Astro: [`@santi020k/eslint-config-astro`](https://santi020k.github.io/eslint-config-basic/frameworks/astro.html)
- Vue: [`@santi020k/eslint-config-vue`](https://santi020k.github.io/eslint-config-basic/frameworks/vue.html)
- Svelte: [`@santi020k/eslint-config-svelte`](https://santi020k.github.io/eslint-config-basic/frameworks/svelte.html)
- Solid: [`@santi020k/eslint-config-solid`](https://santi020k.github.io/eslint-config-basic/frameworks/solid.html)
- Angular: [`@santi020k/eslint-config-angular`](https://santi020k.github.io/eslint-config-basic/frameworks/angular.html)
- NestJS: [`@santi020k/eslint-config-nest`](https://santi020k.github.io/eslint-config-basic/frameworks/nest.html)
- Expo: [`@santi020k/eslint-config-expo`](https://santi020k.github.io/eslint-config-basic/frameworks/expo.html)

## Development

```bash
npm run docs:dev
```

That command regenerates the API markdown and starts the VitePress site from [`packages/docs`](/Users/smith/Projects/santi020k/eslint-config-basic/packages/docs).
