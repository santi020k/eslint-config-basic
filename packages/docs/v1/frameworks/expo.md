# Expo

Package: [`@santi020k/eslint-config-expo`](https://www.npmjs.com/package/@santi020k/eslint-config-expo)

Use the Expo package for Expo or React Native projects that need the shared baseline plus Expo-specific rules.

## Install

::: code-group

```sh [pnpm]
pnpm add -D @santi020k/eslint-config-expo @santi020k/eslint-config-react
```

```sh [npm]
npm install -D @santi020k/eslint-config-expo @santi020k/eslint-config-react
```

```sh [yarn]
yarn add -D @santi020k/eslint-config-expo @santi020k/eslint-config-react
```

```sh [bun]
bun add -d @santi020k/eslint-config-expo @santi020k/eslint-config-react
```

:::

Expo requires the React package explicitly.

## Configure

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'
import expo from '@santi020k/eslint-config-expo'
import react from '@santi020k/eslint-config-react'

export default eslintConfig({
  typescript: true,
  frameworks: {
    react,
    expo
  }
})
```

## What It Adds

- Expo-specific linting on top of the shared config stack.
- An explicit React dependency so React and Expo stay aligned in the final config.
- CLI support that scaffolds both `expo` and `react` imports together when Expo is detected.

## Notes

- Expo projects usually also enable TypeScript.
- The main package throws a helpful error if `frameworks.expo` is provided without `frameworks.react`.

## Repository Links

- Source Package: [packages/expo](https://github.com/santi020k/eslint-config-basic/tree/main/packages/expo)
- Playground: [packages/playground/expo](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/expo)

## Related Pages

- [React](/v1/frameworks/react)
- [CLI](/v1/guide/cli)
- [Configuration](/v1/guide/configuration)
