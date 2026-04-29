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

## Auto-Detection & Priority

The `@santi020k/eslint-config-basic` package automatically enables TypeScript support if a `tsconfig.json` file is found in your project root.

- **Implicit**: If you call `eslintConfig()` without options, TypeScript is enabled if detected.
- **Explicit Priority**: If you provide `typescript: true` or `typescript: false` in the options, your choice **always** overrides the auto-detection.
- **Advanced Options**: You can pass an object to `typescript` to configure specific behaviors like the project path:

```js
export default eslintConfig({
  typescript: {
    project: './tsconfig.lint.json'
  }
})
```

## Notes

- Strict mode can still promote TypeScript warning rules to errors on top of the base config.
- Many framework packages (like Angular or NestJS) will also trigger TypeScript support automatically.

## Repository Links

- Source Package: [packages/typescript](https://github.com/santi020k/eslint-config-basic/tree/main/packages/typescript)
- Playground: [packages/playground/typescript](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/typescript)

## Related Pages

- [Configuration](/v1/guide/configuration)
- [Optional Tooling](/v1/tooling/overview)
- [API Reference](/v1/api/)
