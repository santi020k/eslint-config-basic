# Svelte

Package: [`@santi020k/eslint-config-svelte`](https://www.npmjs.com/package/@santi020k/eslint-config-svelte)

Use the Svelte package for Svelte applications that need explicit framework linting on top of the shared base and TypeScript support.

## Install

```bash
npm install -D @santi020k/eslint-config-svelte
```

## Configure

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'
import svelte from '@santi020k/eslint-config-svelte'

export default eslintConfig({
  typescript: true,
  frameworks: {
    svelte
  }
})
```

## What It Adds

- Svelte-specific framework rules through an isolated package.
- Clean composition with the main package and TypeScript support.
- Better compatibility with real Svelte projects through the shared playground strategy.

## Notes

- Svelte projects often also enable `typescript: true`.
- Virtual-file behavior is handled in coordination with the TypeScript package.

## Repository Links

- Source Package: [packages/svelte](https://github.com/santi020k/eslint-config-basic/tree/main/packages/svelte)
- Playground: [packages/playground/svelte](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/svelte)

## Related Pages

- [TypeScript](/frameworks/typescript)
- [Configuration](/guide/configuration)
- [Playgrounds](/guide/playgrounds)
