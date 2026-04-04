# Solid

Package: [`@santi020k/eslint-config-solid`](https://www.npmjs.com/package/@santi020k/eslint-config-solid)

Use the Solid package for SolidJS applications that need framework-specific linting alongside the shared base config.

## Install

::: code-group

```sh [pnpm]
pnpm add -D @santi020k/eslint-config-solid
```

```sh [npm]
npm install -D @santi020k/eslint-config-solid
```

```sh [yarn]
yarn add -D @santi020k/eslint-config-solid
```

```sh [bun]
bun add -d @santi020k/eslint-config-solid
```

:::

## Configure

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'
import solid from '@santi020k/eslint-config-solid'

export default eslintConfig({
  typescript: true,
  frameworks: {
    solid
  }
})
```

## What It Adds

- SolidJS-specific framework rules.
- A modular install path that keeps non-Solid projects lean.
- Clean composition with TypeScript and optional integrations.

## Notes

- Solid projects often combine the framework package with TypeScript support.
- Optional tooling such as Prettier, Vitest, Storybook, or Markdown can still be added through enums from the main package.

## Repository Links

- Source Package: [packages/solid](https://github.com/santi020k/eslint-config-basic/tree/main/packages/solid)
- Playground: [packages/playground/solid](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/solid)

## Related Pages

- [Configuration](/guide/configuration)
- [Optional Tooling](/tooling/overview)
- [Playgrounds](/guide/playgrounds)
