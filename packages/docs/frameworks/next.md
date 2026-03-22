# Next.js

Package: [`@santi020k/eslint-config-next`](https://www.npmjs.com/package/@santi020k/eslint-config-next)

Next.js is explicit and requires the React package too.

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

Use `NextMode.AppRouter` when you want the App Router override for `@next/next/no-html-link-for-pages`.
