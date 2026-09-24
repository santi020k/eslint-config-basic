# @santi020k/eslint-config-tools

Tool-specific configs for Prettier, CSpell, JSDoc, pnpm, Swagger, and more.

[![npm version](https://img.shields.io/npm/v/@santi020k/eslint-config-tools.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-tools)
[![npm downloads](https://img.shields.io/npm/dm/@santi020k/eslint-config-tools.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-tools)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE)

## Installation

```sh
npm install -D eslint @santi020k/eslint-config-basic @santi020k/eslint-config-tools
```

## Usage

Enable only the features your project uses:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  tools: ['cspell', 'prettier']
})
```

Supported features can also be auto-detected from the project. Installing this
package makes its tools available to the Basic composer; it does not enable
every feature in the package.

## Compatibility

- Node.js: `>=22.19.0`
- ESLint: `^10.0.0`
- ESM and ESLint flat config

## Documentation

- [Tools](https://eslint.santi020k.com/tooling/tools)
- [Configuration guide](https://eslint.santi020k.com/guide/configuration/)
- [Package family and repository](https://github.com/santi020k/eslint-config-basic)
- [Changelog](https://github.com/santi020k/eslint-config-basic/blob/main/packages/tools/CHANGELOG.md)

## License

MIT © [santi020k](https://santi020k.com). See the [license](https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE).
