# @santi020k/eslint-config-slidev

Slidev ESLint configuration for Vue-powered presentation decks.

Most projects should consume it through `@santi020k/eslint-config-basic`:

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  frameworks: {
    slidev: true
  },
  typescript: true
})
```
