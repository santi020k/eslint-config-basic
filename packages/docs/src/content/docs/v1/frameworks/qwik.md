---
title: "Qwik"
description: "Package: @santi020k/eslint-config-qwik"
banner:
  content: "You are viewing the v1 archive. For current setup guidance, use the <a href=\"/guide/getting-started\">v2 docs</a>."
---

Package: [`@santi020k/eslint-config-qwik`](https://www.npmjs.com/package/@santi020k/eslint-config-qwik)

Use the Qwik package for Qwik applications that need framework-specific linting alongside the shared base config.

## Install


```sh title="pnpm"
pnpm add -D @santi020k/eslint-config-qwik
```

```sh title="npm"
npm install -D @santi020k/eslint-config-qwik
```

```sh title="yarn"
yarn add -D @santi020k/eslint-config-qwik
```

```sh title="bun"
bun add -d @santi020k/eslint-config-qwik
```


## Configure

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'
import qwik from '@santi020k/eslint-config-qwik'

export default eslintConfig({
  typescript: true,
  frameworks: {
    qwik
  }
})
```

## What It Adds

- Qwik-specific rules via `eslint-plugin-qwik`, including `use-method-usage`, `valid-lexical-scope`, `no-react-props`, and `loader-location`.
- Built-in accessibility rules (`qwik/jsx-a11y/*`) covering alt text, ARIA attributes, keyboard interaction, and more.
- A modular install path that keeps non-Qwik projects lean.

## Notes

- Qwik projects work well with TypeScript enabled, as Qwik's resumability model relies on type-safe serialisation boundaries.
- Integrations such as Vitest, Tailwind, or Storybook can still be added through enums from the main package.

## Repository Links

- Source Package: [packages/qwik](https://github.com/santi020k/eslint-config-basic/tree/main/packages/qwik)

## Related Pages

- [Configuration](/v1/guide/configuration)
- [Integrations](/v1/tooling/overview)
- [Playgrounds](/v1/guide/playgrounds)
