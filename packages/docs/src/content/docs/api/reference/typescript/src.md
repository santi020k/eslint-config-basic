---
title: "typescript/src"
description: "@santi020k/eslint-config-basic"
---

## Variables

### standardRules

> `const` **standardRules**: `TSESLint.Linter.RulesRecord`

Defined in: [typescript/src/rules.ts:3](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/typescript/src/rules.ts#L3)

***

### typeCheckedRules

> `const` **typeCheckedRules**: `TSESLint.Linter.RulesRecord`

Defined in: [typescript/src/rules.ts:37](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/typescript/src/rules.ts#L37)

***

### typescriptConfig

> `const` **typescriptConfig**: `ConfigArray`

Defined in: [typescript/src/index.ts:104](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/typescript/src/index.ts#L104)

## Functions

### createTypescriptConfig()

> **createTypescriptConfig**(`options?`): `ConfigArray`

Defined in: [typescript/src/index.ts:20](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/typescript/src/index.ts#L20)

TypeScript ESLint configuration factory
Extends typescript-eslint strict + stylistic type-checked presets with custom rules

#### Parameters

##### options?

###### tsconfigRootDir?

`string`

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
