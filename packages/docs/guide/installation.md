# Installation

## Base package

```bash
npm install -D eslint @santi020k/eslint-config-basic
```

## Framework packages

Install framework packages only when your project needs them.

```bash
npm install -D @santi020k/eslint-config-react
npm install -D @santi020k/eslint-config-next
npm install -D @santi020k/eslint-config-astro
npm install -D @santi020k/eslint-config-vue
```

Other supported packages are documented in the [Framework guides](/frameworks/typescript).

## Minimal config

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig()
```

## React example

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'
import react from '@santi020k/eslint-config-react'

export default eslintConfig({
  typescript: true,
  frameworks: {
    react
  }
})
```

## Notes

- TypeScript, runtime, and supported optional integrations can be detected automatically from `package.json`.
- Framework configs stay explicit on purpose.
- Next.js and Expo require the React package as part of the `frameworks` object.
