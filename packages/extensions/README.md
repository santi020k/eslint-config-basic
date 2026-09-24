# @santi020k/eslint-config-extensions

Specialized rule packs such as security, accessibility, Unicorn, and Oxlint.

[![npm version](https://img.shields.io/npm/v/@santi020k/eslint-config-extensions.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-extensions)
[![npm downloads](https://img.shields.io/npm/dm/@santi020k/eslint-config-extensions.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-extensions)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE)

## Installation

```sh
npm install -D eslint @santi020k/eslint-config-basic @santi020k/eslint-config-extensions
```

## Usage

Enable only the features your project uses:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  extensions: ['security', 'unicorn']
})
```

Supported features can also be auto-detected from the project. Installing this
package makes its extensions available to the Basic composer; it does not enable
every feature in the package.

## Compatibility

- Node.js: `>=22.19.0`
- ESLint: `^10.0.0`
- ESM and ESLint flat config

## Documentation

- [Extensions](https://eslint.santi020k.com/tooling/extensions)
- [Configuration guide](https://eslint.santi020k.com/guide/configuration/)
- [Package family and repository](https://github.com/santi020k/eslint-config-basic)
- [Changelog](https://github.com/santi020k/eslint-config-basic/blob/main/packages/extensions/CHANGELOG.md)

## License

MIT © [santi020k](https://santi020k.com). See the [license](https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE).
