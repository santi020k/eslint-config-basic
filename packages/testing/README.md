# @santi020k/eslint-config-testing

Testing configs for Vitest, Jest, Cypress, Playwright, and Testing Library.

[![npm version](https://img.shields.io/npm/v/@santi020k/eslint-config-testing.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-testing)
[![npm downloads](https://img.shields.io/npm/dm/@santi020k/eslint-config-testing.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-testing)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE)

## Installation

```sh
npm install -D eslint @santi020k/eslint-config-basic @santi020k/eslint-config-testing
```

## Usage

Enable only the features your project uses:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  testing: ['playwright', 'vitest']
})
```

Supported features can also be auto-detected from the project. Installing this
package makes its testing available to the Basic composer; it does not enable
every feature in the package.

## Compatibility

- Node.js: `>=22.19.0`
- ESLint: `^10.0.0`
- ESM and ESLint flat config

## Documentation

- [Testing](https://eslint.santi020k.com/tooling/testing)
- [Configuration guide](https://eslint.santi020k.com/guide/configuration/)
- [Package family and repository](https://github.com/santi020k/eslint-config-basic)
- [Changelog](https://github.com/santi020k/eslint-config-basic/blob/main/packages/testing/CHANGELOG.md)

## License

MIT © [santi020k](https://santi020k.com). See the [license](https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE).
