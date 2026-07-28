---
title: "typescript/src"
description: "@santi020k/eslint-config-basic"
---

## Variables

### standardRules

> `const` **standardRules**: `TSESLint.Linter.RulesRecord`

Defined in: [typescript/src/rules.ts:3](https://github.com/santi020k/eslint-config-basic/blob/6cebf4cdf151cec08c94d58ab63d0b295946afcf/packages/typescript/src/rules.ts#L3)

***

### typeCheckedRules

> `const` **typeCheckedRules**: `TSESLint.Linter.RulesRecord`

Defined in: [typescript/src/rules.ts:37](https://github.com/santi020k/eslint-config-basic/blob/6cebf4cdf151cec08c94d58ab63d0b295946afcf/packages/typescript/src/rules.ts#L37)

***

### typescriptConfig

> `const` **typescriptConfig**: `ConfigArray`

Defined in: [typescript/src/index.ts:206](https://github.com/santi020k/eslint-config-basic/blob/6cebf4cdf151cec08c94d58ab63d0b295946afcf/packages/typescript/src/index.ts#L206)

## Functions

### createTypescriptConfig()

> **createTypescriptConfig**(`options?`): `ConfigArray`

Defined in: [typescript/src/index.ts:106](https://github.com/santi020k/eslint-config-basic/blob/6cebf4cdf151cec08c94d58ab63d0b295946afcf/packages/typescript/src/index.ts#L106)

TypeScript ESLint configuration factory
Extends typescript-eslint strict + stylistic type-checked presets with custom rules

#### Parameters

##### options?

`CreateTypescriptConfigOptions` = `{}`

#### Returns

`ConfigArray`

#### Throws

If `tsconfigRootDir` is provided but does not exist on disk.

## References

### default

Renames and re-exports [typescriptConfig](#typescriptconfig)

***

### tsConfig

Renames and re-exports [typescriptConfig](#typescriptconfig)
