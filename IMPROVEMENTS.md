# Improvements

<!-- cspell:words contrac -->

## Keep consumer config types portable under TypeScript 6 and pnpm

### Status

The portable boundary is published in
`@santi020k/eslint-config-basic@3.4.0` and is available to Full consumers through
`@santi020k/eslint-config-full@3.2.0`. Both npm tarballs were verified and
adopted across the complete first-party fleet on 2026-08-21.

The parent-project audit confirms that this is a real consumer boundary rather
than a synthetic declaration-emit edge case. Lumen reproduced the issue under
TypeScript 6 before the upgrade; its temporary `Promise<FlatConfigArray>`
annotation has now been removed. The wider first-party fleet contains 15 Basic
consumers and one Full consumer across JavaScript, ESM JavaScript, and
TypeScript ESLint configs,
including both direct `defineConfig()` exports and awaited composition.

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

Basic 3.3.0 generates a declaration that exposes the implementation dependency:

```ts
declare const _default: Promise<import('typescript-eslint').FlatConfig.ConfigArray>
```

The same boundary leak is visible in Basic 3.3.0's published
`dist/recommended.d.ts`, which imports `typescript-eslint` directly. The
release-prepared workspace declaration no longer contains that import.

### Root cause

In affected releases, `FlatConfigArray` is a transparent alias of
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
   import { defineConfig, type EslintConfigArray } from './index.js'

   const config: EslintConfigArray = await defineConfig()

   export default config
   ```

2. Basic now exports the stable package-owned `EslintConfigArray` interface and
   uses it as the `defineConfig()` result. External declaration inference
   preserves this public name instead of expanding the underlying
   `typescript-eslint` alias.

3. Basic and Full consumer-facing declarations keep the transitive
   `typescript-eslint` implementation symbol behind the package boundary. Core's
   public `FlatConfigArray` alias still references `@typescript-eslint/utils`,
   which is a declared direct Core dependency; the portability guarantee is that
   consumer config inference does not expose `typescript-eslint` or a package
   manager's internal installation path.

### Regression coverage

The packed-consumer checks now include isolated pnpm fixtures that:

- install Basic or Full with ESLint and pinned TypeScript 5.0.2 and 6.0.3, but
  not `typescript-eslint` directly;
- emit declarations for direct and awaited Basic composition, JavaScript, ESM
  JavaScript, TypeScript, Basic's recommended entry, Full's recommended entry,
  and Full's package-owned `defineConfig()` composition;
- fail if TypeScript reports TS2883 or TS2742;
- reject generated declarations containing `.pnpm/` or `typescript-eslint`.

The next patch's packed matrix also invokes the new `basic-eslint config-types`
command. It uses the consumer's compiler and nearest tsconfig, emits only selected ESLint
config declarations in memory, and applies the same portability rejection. The
shared action exposes this as opt-in `config-types` and `config-types-files`
inputs, ready to enforce after that CLI patch is published.
Every first-party maintenance workflow now has a capability-gated invocation as
well. The step skips on published Basic 3.4.0, which contains the type fix but
predates this command, and starts enforcing automatically when its lockfile
resolves a release that advertises `config-types`. All 16 workflow files pass
`actionlint`. The workspace command already verifies all 26 configs across the
16 repositories as portable.

This proves both ends of the supported compiler contract without allowing a
range-based install to change the tested TypeScript version implicitly. The Full
fixture proves the portable composer path used to replace Website's raw
array-spread composition, which loses the named array boundary during inference.

### Parent-project rollout

The rollout is complete:

1. All 15 direct consumers resolve Basic 3.4.0 and Website resolves Full 3.2.0;
   exact pins remain exact and compatible ranges remain reviewed ranges.
2. Lumen emits a portable TypeScript 6 declaration without its temporary
   annotation. Website composes its Tailwind override through Full's
   `defineConfig()` export instead of spreading the recommended array, and its
   declaration is portable too.
3. Aaron's deliberate post-composition reordering uses the new public
   `EslintConfigArray` at that raw-array boundary. Every other direct, awaited,
   JavaScript, ESM JavaScript, and TypeScript config infers portably.
4. All 16 frozen installs, compatibility checks, Doctor runs, committed snapshot
   checks, and canonical zero-warning lint suites pass. The local next-patch
   command validates all 26 ESLint config files without writing declarations.
5. Published Basic 3.4.0 predates `config-types`, `snapshot --rules-only`, and the
   direct-bin entrypoint fix prepared in this changeset. Workflows therefore use
   capability detection, Website retains its direct-module invocation, and the
   committed snapshots remain full until the next CLI patch is published.

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
