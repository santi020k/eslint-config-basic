# TypeScript

Package: [`@santi020k/eslint-config-typescript`](https://www.npmjs.com/package/@santi020k/eslint-config-typescript)

Use the TypeScript package when you want type-aware rules layered into the shared config stack.

## Enable It

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  typescript: true
})
```

## What It Adds

- Type-aware rules built on top of `typescript-eslint`.
- Project-service configuration for real TypeScript projects.
- A shared base for framework packages that depend on embedded or generated TypeScript.

## Virtual Files and Embedded Scripts

This package also handles the virtual-file story used by frameworks like Astro, Vue, Svelte, Markdown, and MDX by disabling type-checked rules in generated embedded files where appropriate.

## Notes

- If the repository has a `tsconfig.json`, the main package can detect TypeScript automatically.
- Strict mode can still promote TypeScript warning rules to errors on top of the base config.

## Repository Links

- Source Package: [packages/typescript](https://github.com/santi020k/eslint-config-basic/tree/main/packages/typescript)
- Playground: [packages/playground/typescript](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/typescript)

## Related Pages

- [Configuration](/guide/configuration)
- [Optional Tooling](/tooling/overview)
- [API Reference](/api/)
