# Vue

Package: [`@santi020k/eslint-config-vue`](https://www.npmjs.com/package/@santi020k/eslint-config-vue)

Use the Vue package for projects that rely on Vue single-file components and want to keep framework support explicit.

## Install

```bash
npm install -D @santi020k/eslint-config-vue
```

## Configure

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'
import vue from '@santi020k/eslint-config-vue'

export default eslintConfig({
  typescript: true,
  frameworks: {
    vue
  }
})
```

## What It Adds

- Vue single-file component support through a dedicated framework package.
- Clean composition with TypeScript and shared base rules.
- A predictable explicit API instead of hidden framework auto-loading.

## Notes

- Vue projects often enable TypeScript support for `<script setup lang="ts">` and other typed component patterns.
- Optional tooling such as Storybook, Tailwind, Vitest, or Markdown can be layered in through the main package enums.

## Repository Links

- Source Package: [packages/vue](https://github.com/santi020k/eslint-config-basic/tree/main/packages/vue)
- Playground: [packages/playground/vue](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/vue)

## Related Pages

- [TypeScript](/frameworks/typescript)
- [Optional Tooling](/tooling/overview)
- [Playgrounds](/guide/playgrounds)
