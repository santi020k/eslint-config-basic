---
title: "integrations/src"
description: "@santi020k/eslint-config-basic"
---

## Variables

### bestPractices

> `const` **bestPractices**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/extensions/best-practices.ts:15](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/extensions/best-practices.ts#L15)

Best-practices ESLint configuration

Adds commonly-recommended quality rules that go beyond stylistic formatting:
- `no-console`    — warn when console.* calls are left in production code
- `no-alert`      — error on browser alert / confirm / prompt
- `complexity`    — warn when cyclomatic complexity exceeds 10
- `max-depth`     — warn when block nesting exceeds 4 levels

All rules use built-in ESLint only; no extra dependencies are required.

***

### cspell

> `const` **cspell**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/tools/cspell.ts:11](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/tools/cspell.ts#L11)

CSpell ESLint configuration
Enables spell checking in your codebase

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### cypress

> `const` **cypress**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/testing/cypress.ts:12](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/testing/cypress.ts#L12)

Cypress ESLint configuration
Provides linting rules for Cypress end-to-end test files

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### graphql

> `const` **graphql**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/formats/graphql.ts:20](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/formats/graphql.ts#L20)

GraphQL ESLint configuration
Provides linting rules for GraphQL schema and operations

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### i18next

> `const` **i18next**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/libraries/i18next.ts:13](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/libraries/i18next.ts#L13)

i18next ESLint configuration
Enables i18next plugin for internationalization best practices

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### jest

> `const` **jest**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/testing/jest.ts:11](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/testing/jest.ts#L11)

Jest ESLint configuration
Provides linting rules for Jest test files

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### jsdoc

> `const` **jsdoc**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/tools/jsdoc.ts:10](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/tools/jsdoc.ts#L10)

JSDoc ESLint configuration
Provides rules for TSDoc/JSDoc validation and formatting.

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### jsonc

> `const` **jsonc**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/formats/jsonc.ts:11](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/formats/jsonc.ts#L11)

JSON/JSONC ESLint configuration
Provides rules for JSON file linting and package.json key sorting

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### markdown

> `const` **markdown**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/formats/markdown.ts:21](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/formats/markdown.ts#L21)

Markdown ESLint configuration
Lints markdown files for common issues

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### mdx

> `const` **mdx**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/formats/mdx.ts:12](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/formats/mdx.ts#L12)

MDX ESLint configuration
Lints MDX files with proper code block handling

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### perfectionist

> `const` **perfectionist**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/extensions/perfectionist.ts:12](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/extensions/perfectionist.ts#L12)

Perfectionist ESLint configuration
Provides rules for sorting and organizing code (imports, exports, object keys, etc.)

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### playwright

> `const` **playwright**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/testing/playwright.ts:9](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/testing/playwright.ts#L9)

Playwright ESLint configuration
Provides linting rules for Playwright end-to-end test files

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### prettier

> `const` **prettier**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/tools/prettier.ts:11](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/tools/prettier.ts#L11)

Prettier interop configuration
Disables all ESLint rules that conflict with Prettier formatting

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### regexp

> `const` **regexp**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/extensions/regexp.ts:13](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/extensions/regexp.ts#L13)

RegExp ESLint configuration
Catches common regex mistakes like exponential backtracking,
unnecessary escapes, and optimizable character classes

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### security

> `const` **security**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/extensions/security.ts:10](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/extensions/security.ts#L10)

Security ESLint configuration
Provides rules for catching common security vulnerabilities.

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### sonarjs

> `const` **sonarjs**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/extensions/sonarjs.ts:6](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/extensions/sonarjs.ts#L6)

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### stencil

> `const` **stencil**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/libraries/stencil.ts:11](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/libraries/stencil.ts#L11)

Stencil ESLint configuration
Enforces best practices for Stencil.js components

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### storybook

> `const` **storybook**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/libraries/storybook.ts:11](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/libraries/storybook.ts#L11)

Storybook ESLint configuration
Provides rules for Storybook story best practices

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### swagger

> `const` **swagger**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/tools/swagger.ts:11](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/tools/swagger.ts#L11)

Swagger/NestJS documentation ESLint configuration
Provides rules from the nestjs-typed plugin for Swagger decorator validation

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### tailwind

> `const` **tailwind**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/libraries/tailwind.ts:10](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/libraries/tailwind.ts#L10)

Tailwind CSS ESLint configuration
Enforces Tailwind CSS best practices using eslint-plugin-better-tailwindcss

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### tanstackQuery

> `const` **tanstackQuery**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/libraries/tanstack.ts:9](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/libraries/tanstack.ts#L9)

TanStack Query ESLint configuration

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### tanstackRouter

> `const` **tanstackRouter**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/libraries/tanstack.ts:29](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/libraries/tanstack.ts#L29)

TanStack Router ESLint configuration

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### testingLibrary

> `const` **testingLibrary**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/testing/testing-library.ts:12](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/testing/testing-library.ts#L12)

Testing Library ESLint configuration
Provides linting rules for Testing Library usage in tests

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### toml

> `const` **toml**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/formats/toml.ts:11](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/formats/toml.ts#L11)

TOML ESLint configuration
Provides rules for TOML file linting

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### unicorn

> `const` **unicorn**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/extensions/unicorn.ts:12](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/extensions/unicorn.ts#L12)

Unicorn ESLint configuration
Modern JavaScript best practices from eslint-plugin-unicorn

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### vitest

> `const` **vitest**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/testing/vitest.ts:11](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/testing/vitest.ts#L11)

Vitest ESLint configuration
Provides linting rules for Vitest test files with best practices

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### yaml

> `const` **yaml**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/formats/yaml.ts:11](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/formats/yaml.ts#L11)

YAML ESLint configuration
Provides rules for YAML file linting

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

## Functions

### drizzle()

> **drizzle**(): `ConfigArray`

Defined in: [integrations/src/libraries/orm.ts:76](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/libraries/orm.ts#L76)

Drizzle ORM ESLint configuration.

#### Returns

`ConfigArray`

***

### mikroOrm()

> **mikroOrm**(): `ConfigArray`

Defined in: [integrations/src/libraries/orm.ts:96](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/libraries/orm.ts#L96)

MikroORM ESLint configuration.

#### Returns

`ConfigArray`

***

### prisma()

> **prisma**(): `ConfigArray`

Defined in: [integrations/src/libraries/orm.ts:57](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/libraries/orm.ts#L57)

Prisma ESLint configuration.

Keeps Prisma Client usage on public package entry points. This avoids runtime
internals that frequently change between generated client versions.

#### Returns

`ConfigArray`

***

### sequelize()

> **sequelize**(): `ConfigArray`

Defined in: [integrations/src/libraries/orm.ts:115](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/libraries/orm.ts#L115)

Sequelize ESLint configuration.

#### Returns

`ConfigArray`

***

### typeorm()

> **typeorm**(): `ConfigArray`

Defined in: [integrations/src/libraries/orm.ts:22](https://github.com/santi020k/eslint-config-basic/blob/a70611e4a8eee106d0f25dff6667d13e76c0b78e/packages/integrations/src/libraries/orm.ts#L22)

TypeORM ESLint configuration.

TypeORM does not currently provide an ESLint 9/10-ready recommended flat
config. This integration focuses on stable imports and avoids legacy global
helpers that make migrations and tests harder to reason about.

#### Returns

`ConfigArray`
