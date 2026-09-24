# @santi020k/eslint-config-core

Core rules, shared utilities, and runtime-aware base configuration.

[![npm version](https://img.shields.io/npm/v/@santi020k/eslint-config-core.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-core)
[![npm downloads](https://img.shields.io/npm/dm/@santi020k/eslint-config-core.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-core)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE)

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
