# Getting Started

This library is a modular ESLint 10+ flat-config toolchain. The main entry point is [`@santi020k/eslint-config-basic`](https://www.npmjs.com/package/@santi020k/eslint-config-basic), and framework packages are added explicitly when you need them.

## Requirements

- Node.js `>=18.18.0`
- ESLint `10+`

## Install the Base Package

```bash
npm install -D eslint @santi020k/eslint-config-basic
```

Create an `eslint.config.mjs` file, or `eslint.config.js` if your project uses `"type": "module"`.

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig()
```

## Understand the Package Layout

- `@santi020k/eslint-config-basic` is the main package.
- Framework packages such as React, Next.js, Astro, Vue, and NestJS are installed only when needed.
- Optional integrations are enabled through enums from the main package instead of separate config objects in application code.

## Choose Your Workflow

- Use the base package alone for core JavaScript, TypeScript, runtime detection, and optional integrations.
- Add framework packages like React, Next.js, Astro, or Vue when your project needs them.
- Use the CLI if you want a scaffolded config with detected integrations.

## Pick the Right Starting Point

- Use [Configuration](/guide/configuration) when you want to compose the config manually.
- Use [CLI](/guide/cli) when you want a generated starting file.
- Use [Frameworks](/frameworks/typescript) when you already know the application stack.
- Use [Optional Tooling](/tooling/overview) when the main need is integrating Tailwind, Vitest, Prettier, Markdown, Unicorn, or similar packages.
- Use [Packages](/packages/basic) when you want to understand how the monorepo is organized.

## Canonical Package Entry Points

- Main package: [`@santi020k/eslint-config-basic`](https://www.npmjs.com/package/@santi020k/eslint-config-basic)
- Repo: [santi020k/eslint-config-basic](https://github.com/santi020k/eslint-config-basic)
- Website: [santi020k.me](https://santi020k.me)

## Next Steps

- Continue with [Installation](/guide/installation)
- Review [Configuration](/guide/configuration)
- Use [CLI](/guide/cli) if you want scaffolding
- Jump to [Framework Guides](/frameworks/typescript)
