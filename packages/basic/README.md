# @santi020k/eslint-config-basic

A comprehensive, composable ESLint configuration for modern JavaScript and TypeScript projects.

## Features

- **Composable**: Pick and choose what you need (React, Next.js, Astro, Expo, etc.).
- **Flat Config**: Built natively for ESLint 9+ Flat Config system.
- **Opinionated yet Flexible**: Sane defaults with easy override capabilities.

## Installation

```bash
npm install -D @santi020k/eslint-config-basic eslint
```

## Usage

Create `eslint.config.mjs` (or `.js`):

```js
import { ConfigOption, eslintConfig, OptionalOption } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  config: [
    ConfigOption.Ts,
    ConfigOption.React
  ],
  optionals: [
    OptionalOption.Tailwind
  ]
})
```
