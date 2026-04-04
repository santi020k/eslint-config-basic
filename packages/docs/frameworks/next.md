# Next.js

Package: [`@santi020k/eslint-config-next`](https://www.npmjs.com/package/@santi020k/eslint-config-next)

Use the Next.js package for applications that need Next-specific linting while keeping React explicit in the final config.

## Install

::: code-group

```sh [pnpm]
pnpm add -D @santi020k/eslint-config-next @santi020k/eslint-config-react
```

```sh [npm]
npm install -D @santi020k/eslint-config-next @santi020k/eslint-config-react
```

```sh [yarn]
yarn add -D @santi020k/eslint-config-next @santi020k/eslint-config-react
```

```sh [bun]
bun add -d @santi020k/eslint-config-next @santi020k/eslint-config-react
```

:::

Next.js is explicit and requires the React package too.

## Configure

```js
import { eslintConfig, NextMode } from '@santi020k/eslint-config-basic'
import next from '@santi020k/eslint-config-next'
import react from '@santi020k/eslint-config-react'

export default eslintConfig({
  typescript: true,
  nextMode: NextMode.AppRouter,
  frameworks: {
    react,
    next
  }
})
```

## What It Adds

- Next.js-specific rules as a dedicated framework package.
- An explicit React dependency for clearer composition and safer contracts.
- `NextMode.AppRouter` support for App Router projects.

## Notes

- Use `NextMode.AppRouter` when the app is built around the App Router and you want the corresponding override for `@next/next/no-html-link-for-pages`.
- The CLI will include both React and Next imports when it detects a Next.js project.

## Repository Links

- Source Package: [packages/next](https://github.com/santi020k/eslint-config-basic/tree/main/packages/next)
- Playground: [packages/playground/next](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/next)

## Related Pages

- [React](/frameworks/react)
- [CLI](/guide/cli)
- [Configuration](/guide/configuration)
