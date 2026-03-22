# Getting Started

This library is a modular ESLint 10+ flat-config toolchain. The main entry point is [`@santi020k/eslint-config-basic`](https://www.npmjs.com/package/@santi020k/eslint-config-basic), and framework packages are added explicitly when you need them.

## Install the base package

```bash
npm install -D eslint @santi020k/eslint-config-basic
```

Create an `eslint.config.mjs` file, or `eslint.config.js` if your project uses `"type": "module"`.

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig()
```

## Choose your workflow

- Use the base package alone for core JavaScript, TypeScript, runtime detection, and optional integrations.
- Add framework packages like React, Next.js, Astro, or Vue when your project needs them.
- Use the CLI if you want a scaffolded config with detected integrations.

## Canonical package entry points

- Main package: [`@santi020k/eslint-config-basic`](https://www.npmjs.com/package/@santi020k/eslint-config-basic)
- Repo: [santi020k/eslint-config-basic](https://github.com/santi020k/eslint-config-basic)
- Website: [santi020k.me](https://santi020k.me)

## Next steps

- Continue with [Installation](/guide/installation)
- Review [Configuration](/guide/configuration)
- Use [CLI](/guide/cli) if you want scaffolding
- Jump to [Framework guides](/frameworks/typescript)
