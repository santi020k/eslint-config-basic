<p align="center">
  <a href="https://eslint.santi020k.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/santi020k/eslint-config-basic/main/assets/readme/workspace-dark.svg">
      <img src="https://raw.githubusercontent.com/santi020k/eslint-config-basic/main/assets/readme/workspace-light.svg" alt="ESLint Config Basic — Less setup. Clearer feedback." width="1200" height="220">
    </picture>
  </a>
</p>

<h1 align="center">Hono guide</h1>

Hono support for Fetch API and edge runtime projects.

<p align="center">
  <a href="https://www.npmjs.com/package/@santi020k/eslint-config-hono"><img src="https://img.shields.io/npm/v/@santi020k/eslint-config-hono?style=flat-square&amp;color=6319be" alt="Published npm version"></a>
  <a href="https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-13967e?style=flat-square" alt="MIT license"></a>
  <a href="https://www.npmjs.com/package/@santi020k/eslint-config-hono"><img src="https://img.shields.io/npm/dm/@santi020k/eslint-config-hono?style=flat-square" alt="Monthly npm downloads"></a>
</p>

<p align="center">
  <a href="https://eslint.santi020k.com/frameworks/hono">Documentation</a> ·
  <a href="https://www.npmjs.com/package/@santi020k/eslint-config-hono">npm</a> ·
  <a href="https://github.com/santi020k/eslint-config-basic/tree/main/packages/hono">Source</a> ·
  <a href="https://github.com/santi020k/eslint-config-basic/blob/main/packages/hono/CHANGELOG.md">Changelog</a>
</p>

**On this page:** [Installation](#installation) · [Usage](#usage) · [Compatibility](#compatibility) · [Documentation](#documentation) · [License](#license)

Package: `@santi020k/eslint-config-hono`.

## Installation

```sh
npm install -D eslint @santi020k/eslint-config-basic @santi020k/eslint-config-hono
```

## Usage

The Basic composer can detect this framework from the project, or you can make
the choice explicit:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: { hono: true }
})
```

Use `defineConfig()` with no options when auto-detection is enough.

## Compatibility

- Node.js: `>=22.19.0`
- ESLint: `^10.0.0`
- ESM and ESLint flat config

## Documentation

- [Hono guide](https://eslint.santi020k.com/frameworks/hono)
- [Configuration guide](https://eslint.santi020k.com/guide/configuration/)
- [Package family and repository](https://github.com/santi020k/eslint-config-basic)
- [Changelog](https://github.com/santi020k/eslint-config-basic/blob/main/packages/hono/CHANGELOG.md)

## License

MIT © [santi020k](https://santi020k.com). See the [license](https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE).
