---
title: "astro/src"
description: "@santi020k/eslint-config-basic"
---

## Interfaces

### AstroOptions

Defined in: [astro/src/rules.ts:8](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/astro/src/rules.ts#L8)

Astro-specific ESLint options

#### Indexable

> \[`key`: `string`\]: `unknown`

#### Properties

##### hasReact?

> `optional` **hasReact?**: `boolean`

Defined in: [astro/src/rules.ts:13](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/astro/src/rules.ts#L13)

If true, includes React-specific overrides for .astro files

##### hasSolid?

> `optional` **hasSolid?**: `boolean`

Defined in: [astro/src/rules.ts:16](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/astro/src/rules.ts#L16)

If true, includes SolidJS-specific sorting groups and JSX overrides

##### hasSvelte?

> `optional` **hasSvelte?**: `boolean`

Defined in: [astro/src/rules.ts:19](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/astro/src/rules.ts#L19)

If true, includes Svelte-specific sorting groups

##### hasVue?

> `optional` **hasVue?**: `boolean`

Defined in: [astro/src/rules.ts:22](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/astro/src/rules.ts#L22)

If true, includes Vue-specific sorting groups

##### tsconfigRootDir?

> `optional` **tsconfigRootDir?**: `string`

Defined in: [astro/src/rules.ts:28](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/astro/src/rules.ts#L28)

Optional tsconfig root passed through from the main config composer.
This keeps Astro parser project lookup stable when projectService is disabled.

## Variables

### astroConfig

> `const` **astroConfig**: `ConfigArray`

Defined in: [astro/src/index.ts:44](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/astro/src/index.ts#L44)

## Functions

### createAstroConfig()

> **createAstroConfig**(`options?`): `ConfigArray`

Defined in: [astro/src/index.ts:12](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/astro/src/index.ts#L12)

Creates Astro ESLint configuration based on enabled frameworks

#### Parameters

##### options?

[`AstroOptions`](#astrooptions)

Framework-specific options for Astro files

#### Returns

`ConfigArray`

The Astro configuration array

***

### getRules()

> **getRules**(`options?`): `TSESLint.Linter.RulesRecord`

Defined in: [astro/src/rules.ts:53](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/astro/src/rules.ts#L53)

Generates Astro-specific rules based on enabled frameworks

#### Parameters

##### options?

[`AstroOptions`](#astrooptions)

#### Returns

`TSESLint.Linter.RulesRecord`

## References

### default

Renames and re-exports [createAstroConfig](#createastroconfig)
