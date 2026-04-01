# Remix

Package: [`@santi020k/eslint-config-remix`](https://www.npmjs.com/package/@santi020k/eslint-config-remix)

Use the Remix package for Remix applications that need accessibility-focused linting and Remix-aware ignore patterns alongside the shared base config.

## Install

```bash
npm install -D @santi020k/eslint-config-remix
```

## Configure

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'
import remix from '@santi020k/eslint-config-remix'

export default eslintConfig({
  typescript: true,
  frameworks: {
    remix
  }
})
```

## What It Adds

- Accessibility rules via `eslint-plugin-jsx-a11y` flat config, covering anchor content, ARIA attributes, label associations, media captions, and more.
- Automatic ignores for Remix's standard build artefacts: `.cache/`, `build/`, and `public/build/`.
- A modular install path that keeps non-Remix projects lean.

## Notes

- Remix projects typically also enable TypeScript support.
- Optional tooling such as Vitest, Tailwind, or Storybook can still be added through enums from the main package.

## Repository Links

- Source Package: [packages/remix](https://github.com/santi020k/eslint-config-basic/tree/main/packages/remix)

## Related Pages

- [Configuration](/guide/configuration)
- [Optional Tooling](/tooling/overview)
- [Playgrounds](/guide/playgrounds)
