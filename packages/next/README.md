# @santi020k/eslint-config-next

Next.js rules, App Router notes, and the React dependency contract.

[![npm version](https://img.shields.io/npm/v/@santi020k/eslint-config-next.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-next)
[![npm downloads](https://img.shields.io/npm/dm/@santi020k/eslint-config-next.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-next)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE)

## Installation

```sh
npm install -D eslint @santi020k/eslint-config-basic @santi020k/eslint-config-next
```

## Usage

The Basic composer can detect this framework from the project, or you can make
the choice explicit:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: { next: true }
})
```

Use `defineConfig()` with no options when auto-detection is enough.

## Compatibility

- Node.js: `>=22.19.0`
- ESLint: `^10.0.0`
- ESM and ESLint flat config

## Documentation

- [Next.js guide](https://eslint.santi020k.com/frameworks/next)
- [Configuration guide](https://eslint.santi020k.com/guide/configuration/)
- [Package family and repository](https://github.com/santi020k/eslint-config-basic)
- [Changelog](https://github.com/santi020k/eslint-config-basic/blob/main/packages/next/CHANGELOG.md)

## License

MIT © [santi020k](https://santi020k.com). See the [license](https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE).
