# NestJS

Package: [`@santi020k/eslint-config-nest`](https://www.npmjs.com/package/@santi020k/eslint-config-nest)

Use the NestJS package for server-side TypeScript apps that want the shared rules plus Nest-oriented linting.

## Install

::: code-group

```sh [pnpm]
pnpm add -D @santi020k/eslint-config-nest
```

```sh [npm]
npm install -D @santi020k/eslint-config-nest
```

```sh [yarn]
yarn add -D @santi020k/eslint-config-nest
```

```sh [bun]
bun add -d @santi020k/eslint-config-nest
```

:::

## Configure

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'
import nest from '@santi020k/eslint-config-nest'

export default eslintConfig({
  typescript: true,
  frameworks: {
    nest
  }
})
```

## What It Adds

- NestJS-focused rules on top of the core and TypeScript packages.
- A modular server-side framework package that does not affect front-end projects.
- A composition path that still works with presets and other optional tooling.

## Notes

- NestJS projects usually work well with `runtime: Runtime.Node` or `preset: Preset.Node`.
- The framework package remains explicit, even when NestJS is detected from `package.json`.

## Repository Links

- Source Package: [packages/nest](https://github.com/santi020k/eslint-config-basic/tree/main/packages/nest)
- Playground: [packages/playground/nest](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/nest)

## Related Pages

- [Configuration](/v1/guide/configuration)
- [Core Package](/v1/packages/core)
- [Playgrounds](/v1/guide/playgrounds)
