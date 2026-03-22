# TypeScript

Package: [`@santi020k/eslint-config-typescript`](https://www.npmjs.com/package/@santi020k/eslint-config-typescript)

Use the TypeScript package when you want type-aware rules layered into the shared config stack.

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  typescript: true
})
```

This package also handles the virtual-file story used by frameworks like Astro, Vue, Svelte, Markdown, and MDX by disabling type-checked rules in generated embedded files where appropriate.
