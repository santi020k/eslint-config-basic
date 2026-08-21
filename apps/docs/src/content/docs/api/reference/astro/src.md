---
title: "astro/src"
description: "@santi020k/eslint-config-basic"
---

## Interfaces

### AstroOptions

Defined in: [packages/astro/src/rules.ts:7](https://github.com/santi020k/eslint-config-basic/blob/main/packages/astro/src/rules.ts#L7)

Astro-specific ESLint options

#### Indexable

> \[`key`: `string`\]: `unknown`

#### Properties

##### hasReact?

> `optional` **hasReact?**: `boolean`

Defined in: [packages/astro/src/rules.ts:12](https://github.com/santi020k/eslint-config-basic/blob/main/packages/astro/src/rules.ts#L12)

If true, includes React-specific overrides for .astro files

##### hasSolid?

> `optional` **hasSolid?**: `boolean`

Defined in: [packages/astro/src/rules.ts:15](https://github.com/santi020k/eslint-config-basic/blob/main/packages/astro/src/rules.ts#L15)

If true, includes SolidJS-specific sorting groups and JSX overrides

##### hasSvelte?

> `optional` **hasSvelte?**: `boolean`

Defined in: [packages/astro/src/rules.ts:18](https://github.com/santi020k/eslint-config-basic/blob/main/packages/astro/src/rules.ts#L18)

If true, includes Svelte-specific sorting groups

##### hasVue?

> `optional` **hasVue?**: `boolean`

Defined in: [packages/astro/src/rules.ts:21](https://github.com/santi020k/eslint-config-basic/blob/main/packages/astro/src/rules.ts#L21)

If true, includes Vue-specific sorting groups

##### tsconfigRootDir?

> `optional` **tsconfigRootDir?**: `string`

Defined in: [packages/astro/src/rules.ts:27](https://github.com/santi020k/eslint-config-basic/blob/main/packages/astro/src/rules.ts#L27)

Optional tsconfig root passed through from the main config composer.
This keeps Astro parser project lookup stable when projectService is disabled.

##### typeChecked?

> `optional` **typeChecked?**: `boolean`

Defined in: [packages/astro/src/rules.ts:33](https://github.com/santi020k/eslint-config-basic/blob/main/packages/astro/src/rules.ts#L33)

Whether to enable type-aware linting for Astro files.
Disabling this avoids parser crashes in Astro packages without TSConfig files.

## Functions

### createAstroConfig()

> **createAstroConfig**(`options?`): `ConfigArray`

Defined in: [packages/astro/src/index.ts:12](https://github.com/santi020k/eslint-config-basic/blob/main/packages/astro/src/index.ts#L12)

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

Defined in: [packages/astro/src/rules.ts:58](https://github.com/santi020k/eslint-config-basic/blob/main/packages/astro/src/rules.ts#L58)

Generates Astro-specific rules based on enabled frameworks

#### Parameters

##### options?

[`AstroOptions`](#astrooptions)

#### Returns

`TSESLint.Linter.RulesRecord`

## References

### default

Renames and re-exports [createAstroConfig](#createastroconfig)
