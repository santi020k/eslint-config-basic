# @santi020k/eslint-config-basic

[![CI](https://github.com/santi020k/eslint-config-basic/actions/workflows/build.yml/badge.svg)](https://github.com/santi020k/eslint-config-basic/actions/workflows/build.yml)
[![npm version](https://img.shields.io/npm/v/@santi020k/eslint-config-basic.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-basic)
[![npm downloads](https://img.shields.io/npm/dm/@santi020k/eslint-config-basic.svg)](https://www.npmjs.com/package/@santi020k/eslint-config-basic)
[![license](https://img.shields.io/npm/l/@santi020k/eslint-config-basic.svg)](https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE)

Composable ESLint 10+ flat-config for JavaScript, TypeScript, and all major frameworks.

This is the main entry point of the [`@santi020k/eslint-config-basic`](https://github.com/santi020k/eslint-config-basic) monorepo.

- Docs: [eslint.santi020k.com](https://eslint.santi020k.com/)
- Repository: [santi020k/eslint-config-basic](https://github.com/santi020k/eslint-config-basic)
- Author: [santi020k](https://santi020k.com)

## Quick start

```bash
npm install -D eslint @santi020k/eslint-config-basic
```

```js
// eslint.config.js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig()
```

Auto-detects TypeScript, frameworks, and common tools from your `package.json`. See the [full docs](https://eslint.santi020k.com/) for all options.
