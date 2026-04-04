# Qwik

Package: [`@santi020k/eslint-config-qwik`](https://www.npmjs.com/package/@santi020k/eslint-config-qwik)

Use the Qwik package for Qwik applications that need framework-specific linting alongside the shared base config.

## Install

::: code-group

```sh [pnpm]
pnpm add -D @santi020k/eslint-config-qwik
```

```sh [npm]
npm install -D @santi020k/eslint-config-qwik
```

```sh [yarn]
yarn add -D @santi020k/eslint-config-qwik
```

```sh [bun]
bun add -d @santi020k/eslint-config-qwik
```

:::

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
- Optional tooling such as Vitest, Tailwind, or Storybook can still be added through enums from the main package.

## Repository Links

- Source Package: [packages/qwik](https://github.com/santi020k/eslint-config-basic/tree/main/packages/qwik)

## Related Pages

- [Configuration](/guide/configuration)
- [Optional Tooling](/tooling/overview)
- [Playgrounds](/guide/playgrounds)
