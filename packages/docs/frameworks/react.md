# React

Package: [`@santi020k/eslint-config-react`](https://www.npmjs.com/package/@santi020k/eslint-config-react)

Use the React package for React apps, or as the required React dependency when composing Next.js or Expo.

## Install

::: code-group

```sh [pnpm]
pnpm add -D @santi020k/eslint-config-react
```

```sh [npm]
npm install -D @santi020k/eslint-config-react
```

```sh [yarn]
yarn add -D @santi020k/eslint-config-react
```

```sh [bun]
bun add -d @santi020k/eslint-config-react
```

:::

## Configure

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'
import react from '@santi020k/eslint-config-react'

export default eslintConfig({
  typescript: true,
  frameworks: {
    react
  }
})
```

## What It Adds

- React and Hooks rules through an explicit framework package.
- A reusable building block for plain React, Next.js, and Expo configurations.
- Better clarity in the final config array because React support is never implicit.

## Notes

- Plain React browser apps often combine `react` with `runtime: Runtime.Browser` or `preset: Preset.Browser`.
- Next.js and Expo both require `frameworks.react` in addition to their own framework package.

## Repository Links

- Source Package: [packages/react](https://github.com/santi020k/eslint-config-basic/tree/main/packages/react)
- Playground: [packages/playground/react](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/react)

## Related Pages

- [Next.js](/frameworks/next)
- [Expo](/frameworks/expo)
- [Configuration](/guide/configuration)
