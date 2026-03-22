# Angular

Package: [`@santi020k/eslint-config-angular`](https://www.npmjs.com/package/@santi020k/eslint-config-angular)

Use the Angular package when the project needs Angular-specific linting on top of the shared base and TypeScript stack.

## Install

```bash
npm install -D @santi020k/eslint-config-angular
```

## Configure

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

## What It Adds

- Angular-specific linting as an explicit framework package.
- A modular install path, so non-Angular projects do not inherit Angular dependencies.
- A clean composition model that still fits the shared `eslintConfig()` API.

## Notes

- Angular projects usually benefit from enabling TypeScript.
- Framework packages remain explicit even when the rest of the config is auto-detected.

## Repository Links

- Source Package: [packages/angular](https://github.com/santi020k/eslint-config-basic/tree/main/packages/angular)
- Playground: [packages/playground/angular](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/angular)

## Related Pages

- [Configuration](/guide/configuration)
- [Optional Tooling](/tooling/overview)
- [Playgrounds](/guide/playgrounds)
