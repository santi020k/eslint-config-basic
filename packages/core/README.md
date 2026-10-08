<p align="center">
  <a href="https://eslint.santi020k.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/santi020k/eslint-config-basic/main/assets/readme/workspace-dark.svg">
      <img src="https://raw.githubusercontent.com/santi020k/eslint-config-basic/main/assets/readme/workspace-light.svg" alt="ESLint Config Basic — Less setup. Clearer feedback." width="1200" height="220">
    </picture>
  </a>
</p>

<h1 align="center">Core package</h1>

Core rules, shared utilities, and runtime-aware base configuration.

<p align="center">
  <a href="https://www.npmjs.com/package/@santi020k/eslint-config-core"><img src="https://img.shields.io/npm/v/@santi020k/eslint-config-core?style=flat-square&amp;color=6319be" alt="Published npm version"></a>
  <a href="https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-13967e?style=flat-square" alt="MIT license"></a>
  <a href="https://www.npmjs.com/package/@santi020k/eslint-config-core"><img src="https://img.shields.io/npm/dm/@santi020k/eslint-config-core?style=flat-square" alt="Monthly npm downloads"></a>
</p>

<p align="center">
  <a href="https://eslint.santi020k.com/packages/core">Documentation</a> ·
  <a href="https://www.npmjs.com/package/@santi020k/eslint-config-core">npm</a> ·
  <a href="https://github.com/santi020k/eslint-config-basic/tree/main/packages/core">Source</a> ·
  <a href="https://github.com/santi020k/eslint-config-basic/blob/main/packages/core/CHANGELOG.md">Changelog</a>
</p>

**On this page:** [Installation](#installation) · [Direct usage](#direct-usage) · [Compatibility](#compatibility) · [Documentation](#documentation) · [License](#license)

Package: `@santi020k/eslint-config-core`.

## Installation

```sh
npm install -D eslint @santi020k/eslint-config-core
```

## Direct usage

Most projects should use `@santi020k/eslint-config-basic`, which includes this package.
For custom flat-config composition, import the core array directly:

```js
import { coreConfig } from '@santi020k/eslint-config-core'

export default [...coreConfig]
```

## Compatibility

- Node.js: `>=22.19.0`
- ESLint: `^10.0.0`
- ESM and ESLint flat config

## Documentation

- [Core package](https://eslint.santi020k.com/packages/core)
- [Configuration guide](https://eslint.santi020k.com/guide/configuration/)
- [Package family and repository](https://github.com/santi020k/eslint-config-basic)
- [Changelog](https://github.com/santi020k/eslint-config-basic/blob/main/packages/core/CHANGELOG.md)

## License

MIT © [santi020k](https://santi020k.com). See the [license](https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE).
