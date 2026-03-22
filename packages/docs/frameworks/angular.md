# Angular

Package: [`@santi020k/eslint-config-angular`](https://www.npmjs.com/package/@santi020k/eslint-config-angular)

```js
import angular from '@santi020k/eslint-config-angular'
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  typescript: true,
  frameworks: {
    angular
  }
})
```

Angular support stays modular so teams only install it when the framework is actually in use.
