# @santi020k/eslint-config-vite

Vite ESLint configuration for browser apps and Vite config files.

Most projects should consume it through `@santi020k/eslint-config-basic`:

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  frameworks: {
    vite: true
  },
  typescript: true
})
```
