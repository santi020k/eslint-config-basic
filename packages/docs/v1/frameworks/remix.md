# Remix

Package: [`@santi020k/eslint-config-remix`](https://www.npmjs.com/package/@santi020k/eslint-config-remix)

Use the Remix package for Remix applications that need accessibility-focused linting and Remix-aware ignore patterns alongside the shared base config. In real Remix apps, it is commonly paired with the React package so component linting stays explicit too.

## Install

::: code-group

```sh [pnpm]
pnpm add -D @santi020k/eslint-config-remix @santi020k/eslint-config-react
```

```sh [npm]
npm install -D @santi020k/eslint-config-remix @santi020k/eslint-config-react
```

```sh [yarn]
yarn add -D @santi020k/eslint-config-remix @santi020k/eslint-config-react
```

```sh [bun]
bun add -d @santi020k/eslint-config-remix @santi020k/eslint-config-react
```

:::

The Remix package can be composed on its own, but the playground pairs it with React so Remix component linting stays explicit.

## Configure

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'
import react from '@santi020k/eslint-config-react'
import remix from '@santi020k/eslint-config-remix'

export default eslintConfig({
  typescript: true,
  frameworks: {
    react,
    remix
  }
})
```

## What It Adds

- Accessibility rules via `eslint-plugin-jsx-a11y` flat config, covering anchor content, ARIA attributes, label associations, media captions, and more.
- Automatic ignores for Remix's standard build artefacts: `.cache/`, `build/`, and `public/build/`.
- A clean way to keep Remix-specific rules and React-specific rules explicit in the same config.
- A modular install path that keeps non-Remix projects lean.

## Notes

- Remix projects typically also enable TypeScript support.
- Optional tooling such as Vitest, Tailwind, or Storybook can still be added through enums from the main package.

## Repository Links

- Source Package: [packages/remix](https://github.com/santi020k/eslint-config-basic/tree/main/packages/remix)

## Related Pages

- [Configuration](/v1/guide/configuration)
- [Optional Tooling](/v1/tooling/overview)
- [Playgrounds](/v1/guide/playgrounds)
