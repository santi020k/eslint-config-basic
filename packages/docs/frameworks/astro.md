# Astro

Package: [`@santi020k/eslint-config-astro`](https://www.npmjs.com/package/@santi020k/eslint-config-astro)

```js
import astro from '@santi020k/eslint-config-astro'
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  typescript: true,
  frameworks: {
    astro
  }
})
```

Astro support works with the TypeScript package’s virtual-file protections so embedded scripts do not accidentally inherit unsafe type-aware rules.
