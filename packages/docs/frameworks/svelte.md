# Svelte

Package: [`@santi020k/eslint-config-svelte`](https://www.npmjs.com/package/@santi020k/eslint-config-svelte)

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

Use this package when a Svelte app needs the shared linting baseline plus framework-specific behavior.
