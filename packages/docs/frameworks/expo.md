# Expo

Package: [`@santi020k/eslint-config-expo`](https://www.npmjs.com/package/@santi020k/eslint-config-expo)

Expo requires the React package explicitly.

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'
import expo from '@santi020k/eslint-config-expo'
import react from '@santi020k/eslint-config-react'

export default eslintConfig({
  typescript: true,
  frameworks: {
    react,
    expo
  }
})
```

The CLI will include both imports automatically when it detects an Expo project.
