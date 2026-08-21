# Improvements

## Keep consumer config types portable under TypeScript 6 and pnpm

### Problem

TypeScript 6 reports TS2883 for a JavaScript consumer config that directly
exports the result of `defineConfig`:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default defineConfig()
```

The diagnostic says the inferred default export requires `ConfigArray` from a
pnpm-internal `typescript-eslint` path. The config runs correctly in ESLint, but
the editor treats the inferred type as non-portable when the consumer does not
declare `typescript-eslint` as a direct dependency.

This is reproducible in a packed pnpm consumer with TypeScript 6:

```sh
tsc eslint.config.js \
  --ignoreConfig \
  --allowJs \
  --checkJs \
  --declaration \
  --emitDeclarationOnly \
  --module Node16 \
  --moduleResolution Node16 \
  --target ES2022 \
  --skipLibCheck
```

The generated declaration currently attempts to expose the implementation
dependency:

```ts
declare const _default: Promise<import('typescript-eslint').FlatConfig.ConfigArray>
```

The same boundary leak is visible in the published recommended entry point:
`packages/basic/dist/recommended.d.ts` imports `typescript-eslint` directly.

### Root cause

`FlatConfigArray` is currently a transparent alias of
`TSESLint.FlatConfig.ConfigArray`. When TypeScript infers the type of a consumer's
default export, it is free to expand that alias and select the originating
`typescript-eslint` symbol instead of the public type re-exported by
`@santi020k/eslint-config-basic`. pnpm's isolated dependency path makes that
origin visibly non-portable, and TypeScript 6 diagnoses it with TS2883.

### Implemented library changes

1. `packages/basic/src/recommended.ts` now has an explicit public annotation so its
   declaration references the Basic package's public type boundary rather than
   `typescript-eslint`:

   ```ts
   import { defineConfig, type FlatConfigArray } from './index.js'

   const config: FlatConfigArray = await defineConfig()

   export default config
   ```

2. Basic now exports the stable package-owned `EslintConfigArray` interface and
   uses it as the `defineConfig()` result. External declaration inference
   preserves this public name instead of expanding the underlying
   `typescript-eslint` alias.

3. `typescript-eslint` and `@typescript-eslint/utils` types remain behind internal
   implementation boundaries. Public declarations from Basic, Core, Full, and
   the recommended entry points should only reference package-owned types,
   ESLint's public types, or declared direct dependencies.

### Regression coverage

The packed-consumer checks now include an isolated pnpm fixture that:

- installs Basic, ESLint, and TypeScript, but not `typescript-eslint` directly;
- emits declarations for both the one-line recommended config and a
  `defineConfig({ ... })` JavaScript config;
- runs on the minimum and latest supported TypeScript versions;
- fails on TS2883, TS2742, or any generated declaration containing `.pnpm/`;
- asserts that generated declarations reference only public package specifiers.

The current consumer checks prove installation and ESLint execution, but a
declaration-emit assertion is needed to cover editor and language-server usage.

### Consumer workaround for older releases

JavaScript consumers can explicitly pin the exported expression to Basic's
public type:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

/** @type {Promise<import('@santi020k/eslint-config-basic').FlatConfigArray>} */
const config = defineConfig()

export default config
```

TypeScript configs can use the equivalent
`Promise<FlatConfigArray>` annotation. Releases containing `EslintConfigArray`
provide portable inference without requiring this consumer annotation.
