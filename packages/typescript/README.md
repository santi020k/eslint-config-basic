# @santi020k/eslint-config-typescript

Type-aware rules, project-service usage, and virtual file behavior.

[![npm version](https://img.shields.io/npm/v/@santi020k/eslint-config-typescript.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-typescript)
[![npm downloads](https://img.shields.io/npm/dm/@santi020k/eslint-config-typescript.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-typescript)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE)

## Installation

```sh
npm install -D eslint typescript @santi020k/eslint-config-typescript
```

## Direct usage

Most projects should use `@santi020k/eslint-config-basic`, which enables TypeScript
automatically. For custom flat-config composition, import the TypeScript array
directly:

```js
import typescript from '@santi020k/eslint-config-typescript'

export default [...typescript]
```

## Compatibility

- Node.js: `>=22.19.0`
- ESLint: `^10.0.0`
- ESM and ESLint flat config

## Documentation

- [TypeScript guide](https://eslint.santi020k.com/frameworks/typescript)
- [Configuration guide](https://eslint.santi020k.com/guide/configuration/)
- [Package family and repository](https://github.com/santi020k/eslint-config-basic)
- [Changelog](https://github.com/santi020k/eslint-config-basic/blob/main/packages/typescript/CHANGELOG.md)

## License

MIT © [santi020k](https://santi020k.com). See the [license](https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE).
