<p align="center">
  <a href="https://eslint.santi020k.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/santi020k/eslint-config-basic/main/assets/readme/workspace-dark.svg">
      <img src="https://raw.githubusercontent.com/santi020k/eslint-config-basic/main/assets/readme/workspace-light.svg" alt="ESLint Config Basic — Less setup. Clearer feedback." width="1200" height="220">
    </picture>
  </a>
</p>

<h1 align="center">NestJS guide</h1>

NestJS-focused rules layered on top of the core package.

<p align="center">
  <a href="https://www.npmjs.com/package/@santi020k/eslint-config-nest"><img src="https://img.shields.io/npm/v/@santi020k/eslint-config-nest?style=flat-square&amp;color=6319be" alt="Published npm version"></a>
  <a href="https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-13967e?style=flat-square" alt="MIT license"></a>
  <a href="https://www.npmjs.com/package/@santi020k/eslint-config-nest"><img src="https://img.shields.io/npm/dm/@santi020k/eslint-config-nest?style=flat-square" alt="Monthly npm downloads"></a>
</p>

<p align="center">
  <a href="https://eslint.santi020k.com/frameworks/nest">Documentation</a> ·
  <a href="https://www.npmjs.com/package/@santi020k/eslint-config-nest">npm</a> ·
  <a href="https://github.com/santi020k/eslint-config-basic/tree/main/packages/nest">Source</a> ·
  <a href="https://github.com/santi020k/eslint-config-basic/blob/main/packages/nest/CHANGELOG.md">Changelog</a>
</p>

**On this page:** [Installation](#installation) · [Usage](#usage) · [Compatibility](#compatibility) · [Documentation](#documentation) · [License](#license)

Package: `@santi020k/eslint-config-nest`.

## Installation

```sh
npm install -D eslint @santi020k/eslint-config-basic @santi020k/eslint-config-nest
```

## Usage

The Basic composer can detect this framework from the project, or you can make
the choice explicit:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: { nest: true }
})
```

Use `defineConfig()` with no options when auto-detection is enough.

## Compatibility

- Node.js: `>=22.19.0`
- ESLint: `^10.0.0`
- ESM and ESLint flat config

## Documentation

- [NestJS guide](https://eslint.santi020k.com/frameworks/nest)
- [Configuration guide](https://eslint.santi020k.com/guide/configuration/)
- [Package family and repository](https://github.com/santi020k/eslint-config-basic)
- [Changelog](https://github.com/santi020k/eslint-config-basic/blob/main/packages/nest/CHANGELOG.md)

## License

MIT © [santi020k](https://santi020k.com). See the [license](https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE).
