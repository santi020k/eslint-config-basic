---
title: "Solid"
description: "Package: @santi020k/eslint-config-solid"
banner:
  content: "You are viewing the v1 archive. For current setup guidance, use the <a href=\"/guide/getting-started\">v2 docs</a>."
---

Package: [`@santi020k/eslint-config-solid`](https://www.npmjs.com/package/@santi020k/eslint-config-solid)

Use the Solid package for SolidJS applications that need framework-specific linting alongside the shared base config.

## Install


```sh title="pnpm"
pnpm add -D @santi020k/eslint-config-solid
```

```sh title="npm"
npm install -D @santi020k/eslint-config-solid
```

```sh title="yarn"
yarn add -D @santi020k/eslint-config-solid
```

```sh title="bun"
bun add -d @santi020k/eslint-config-solid
```


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
- Clean composition with TypeScript and integrations.

## Notes

- Solid projects often combine the framework package with TypeScript support.
- Integrations such as Prettier, Vitest, Storybook, or Markdown can still be added through enums from the main package.

## Repository Links

- Source Package: [packages/solid](https://github.com/santi020k/eslint-config-basic/tree/main/packages/solid)
- Playground: [packages/playground/solid](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/solid)

## Related Pages

- [Configuration](/v1/guide/configuration)
- [Integrations](/v1/tooling/overview)
- [Playgrounds](/v1/guide/playgrounds)
