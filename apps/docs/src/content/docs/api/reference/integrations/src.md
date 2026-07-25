---
title: "integrations/src"
description: "@santi020k/eslint-config-basic"
---

## Variables

### a11y

> `const` **a11y**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/extensions/a11y.ts:13](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/extensions/a11y.ts#L13)

A11y extension configurations
Provides accessibility linting for JSX and Vue

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### aiSdk

> `const` **aiSdk**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/libraries/ai.ts:33](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/libraries/ai.ts#L33)

Vercel AI SDK security ESLint configuration.

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### astroDoctor

> `const` **astroDoctor**: () => `Promise`\<[`FlatConfigArray`](../core/src.md#flatconfigarray)\>

Defined in: [integrations/src/extensions/astro-doctor.ts:5](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/extensions/astro-doctor.ts#L5)

#### Returns

`Promise`\<[`FlatConfigArray`](../core/src.md#flatconfigarray)\>

***

### bestPractices

> `const` **bestPractices**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/extensions/best-practices.ts:16](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/extensions/best-practices.ts#L16)

Best-practices ESLint configuration

Adds commonly-recommended quality rules that go beyond stylistic formatting:
- `no-console`    — warn when console.* calls are left in production code
- `no-alert`      — error on browser alert / confirm / prompt
- `complexity`    — warn when cyclomatic complexity exceeds 10
- `max-depth`     — warn when block nesting exceeds 4 levels

All rules use built-in ESLint only; no extra dependencies are required.

***

### biome

> `const` **biome**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/extensions/biome.ts:13](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/extensions/biome.ts#L13)

Biome extension configurations
Disables rules that conflict with Biome formatting and linting.

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### boundaries

> `const` **boundaries**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/extensions/boundaries.ts:12](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/extensions/boundaries.ts#L12)

Import-boundary ESLint configuration

Prevents importing generated modules or test modules from production source.
Relies on import/no-relative-packages and import/no-self-import from
eslint-plugin-import-x, which the base config already loads.

***

### command

> `const` **command**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/tools/command.ts:12](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/tools/command.ts#L12)

Command ESLint configuration
Provides in-editor micro-fixes via magic comments (e.g., /// @keep)

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### compat

> `const` **compat**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/extensions/compat.ts:11](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/extensions/compat.ts#L11)

Browser compatibility extension configuration
Checks code against the project browserslist using `eslint-plugin-compat`

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### cspell

> `const` **cspell**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/tools/cspell.ts:12](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/tools/cspell.ts#L12)

CSpell ESLint configuration
Enables spell checking in your codebase

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### css

> `const` **css**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/formats/css.ts:9](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/formats/css.ts#L9)

CSS ESLint configuration
Lints plain CSS files using the official `@eslint/css` language plugin

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### cypress

> `const` **cypress**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/testing/cypress.ts:11](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/testing/cypress.ts#L11)

Cypress ESLint configuration
Provides linting rules for Cypress end-to-end test files

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### deMorgan

> `const` **deMorgan**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/extensions/de-morgan.ts:11](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/extensions/de-morgan.ts#L11)

De Morgan extension configuration
Simplifies negated logical expressions using `eslint-plugin-de-morgan`

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### depend

> `const` **depend**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/extensions/depend.ts:12](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/extensions/depend.ts#L12)

Depend extension configuration
Suggests lighter or native alternatives to heavy dependencies using
`eslint-plugin-depend`

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### graphql

> `const` **graphql**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/formats/graphql.ts:20](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/formats/graphql.ts#L20)

GraphQL ESLint configuration
Provides linting rules for GraphQL schema and operations

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### html

> `const` **html**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/formats/html.ts:13](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/formats/html.ts#L13)

HTML ESLint configuration
Lints plain HTML files using `@html-eslint/eslint-plugin` and its parser

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### i18next

> `const` **i18next**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/libraries/i18next.ts:13](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/libraries/i18next.ts#L13)

i18next ESLint configuration
Enables i18next plugin for internationalization best practices

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### jest

> `const` **jest**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/testing/jest.ts:10](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/testing/jest.ts#L10)

Jest ESLint configuration
Provides linting rules for Jest test files

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### jestDom

> `const` **jestDom**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/testing/jest-dom.ts:12](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/testing/jest-dom.ts#L12)

Jest DOM ESLint configuration
Provides rules for @testing-library/jest-dom

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### jsdoc

> `const` **jsdoc**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/tools/jsdoc.ts:11](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/tools/jsdoc.ts#L11)

JSDoc ESLint configuration
Provides rules for TSDoc/JSDoc validation and formatting.

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### jsonc

> `const` **jsonc**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/formats/jsonc.ts:10](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/formats/jsonc.ts#L10)

JSON/JSONC ESLint configuration
Provides rules for JSON file linting and package.json key sorting

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### markdown

> `const` **markdown**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/formats/markdown.ts:21](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/formats/markdown.ts#L21)

Markdown ESLint configuration
Lints markdown files for common issues

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### mdx

> `const` **mdx**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/formats/mdx.ts:11](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/formats/mdx.ts#L11)

MDX ESLint configuration
Lints MDX files with proper code block handling

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### node

> `const` **node**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/extensions/node.ts:13](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/extensions/node.ts#L13)

Node.js extension configuration
Applies `eslint-plugin-n` recommended rules for Node.js codebases.
Module-resolution rules are disabled for TypeScript files where the
TypeScript compiler already validates imports.

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### noOnlyTests

> `const` **noOnlyTests**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/extensions/no-only-tests.ts:11](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/extensions/no-only-tests.ts#L11)

Prevents `test.only` / `describe.only` from being committed to version
control. Uses `eslint-plugin-no-only-tests`.

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### oxlint

> `const` **oxlint**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/extensions/oxlint.ts:14](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/extensions/oxlint.ts#L14)

Oxlint extension configuration
Disables ESLint rules already covered by Oxlint so both linters can run
side by side without duplicate reports (analogous to the Biome extension)

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### packageJson

> `const` **packageJson**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/formats/package-json.ts:10](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/formats/package-json.ts#L10)

Package.json ESLint configuration
Provides validation for npm package standards

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### perfectionist

> `const` **perfectionist**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/extensions/perfectionist.ts:12](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/extensions/perfectionist.ts#L12)

Perfectionist ESLint configuration
Provides rules for sorting and organizing code (imports, exports, object keys, etc.)

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### playwright

> `const` **playwright**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/testing/playwright.ts:9](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/testing/playwright.ts#L9)

Playwright ESLint configuration
Provides linting rules for Playwright end-to-end test files

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### pnpm

> `const` **pnpm**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/tools/pnpm.ts:14](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/tools/pnpm.ts#L14)

pnpm tooling ESLint configuration
Enforces pnpm catalogs and workspace settings in `package.json` and
`pnpm-workspace.yaml` using `eslint-plugin-pnpm`

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### prettier

> `const` **prettier**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/tools/prettier.ts:10](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/tools/prettier.ts#L10)

Prettier interop configuration
Disables all ESLint rules that conflict with Prettier formatting

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### regexp

> `const` **regexp**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/extensions/regexp.ts:13](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/extensions/regexp.ts#L13)

RegExp ESLint configuration
Catches common regex mistakes like exponential backtracking,
unnecessary escapes, and optimizable character classes

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### security

> `const` **security**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/extensions/security.ts:11](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/extensions/security.ts#L11)

Security ESLint configuration
Provides rules for catching common security vulnerabilities.

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### sonarjs

> `const` **sonarjs**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/extensions/sonarjs.ts:7](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/extensions/sonarjs.ts#L7)

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### stencil

> `const` **stencil**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/libraries/stencil.ts:11](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/libraries/stencil.ts#L11)

Stencil ESLint configuration
Enforces best practices for Stencil.js components

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### storybook

> `const` **storybook**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/libraries/storybook.ts:10](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/libraries/storybook.ts#L10)

Storybook ESLint configuration
Provides rules for Storybook story best practices

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### swagger

> `const` **swagger**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/tools/swagger.ts:12](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/tools/swagger.ts#L12)

Swagger/NestJS documentation ESLint configuration
Provides rules from the nestjs-typed plugin for Swagger decorator validation

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### tailwind

> `const` **tailwind**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/libraries/tailwind.ts:11](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/libraries/tailwind.ts#L11)

Tailwind CSS ESLint configuration
Enforces Tailwind CSS best practices using eslint-plugin-better-tailwindcss

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### tanstackQuery

> `const` **tanstackQuery**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/libraries/tanstack.ts:10](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/libraries/tanstack.ts#L10)

TanStack Query ESLint configuration

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### tanstackRouter

> `const` **tanstackRouter**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/libraries/tanstack.ts:30](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/libraries/tanstack.ts#L30)

TanStack Router ESLint configuration

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### testingLibrary

> `const` **testingLibrary**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/testing/testing-library.ts:11](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/testing/testing-library.ts#L11)

Testing Library ESLint configuration
Provides linting rules for Testing Library usage in tests

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### toml

> `const` **toml**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/formats/toml.ts:10](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/formats/toml.ts#L10)

TOML ESLint configuration
Provides rules for TOML file linting

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### turbo

> `const` **turbo**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/libraries/turbo.ts:12](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/libraries/turbo.ts#L12)

Turborepo ESLint configuration
Validates process.env usage against turbo.json

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### unicorn

> `const` **unicorn**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/extensions/unicorn.ts:12](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/extensions/unicorn.ts#L12)

Unicorn ESLint configuration
Modern JavaScript best practices from eslint-plugin-unicorn

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### vitest

> `const` **vitest**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/testing/vitest.ts:10](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/testing/vitest.ts#L10)

Vitest ESLint configuration
Provides linting rules for Vitest test files with best practices

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### yaml

> `const` **yaml**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/formats/yaml.ts:10](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/formats/yaml.ts#L10)

YAML ESLint configuration
Provides rules for YAML file linting

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### zod

> `const` **zod**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [integrations/src/libraries/zod.ts:11](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/libraries/zod.ts#L11)

Zod ESLint configuration
Provides validation rules for Zod schemas

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

## Functions

### autogen()

> **autogen**(): `ConfigArray`

Defined in: [integrations/src/libraries/autogen.ts:8](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/libraries/autogen.ts#L8)

AutoGen SDK ESLint configuration.

#### Returns

`ConfigArray`

***

### docker()

> **docker**(): `Promise`\<`ConfigArray`\>

Defined in: [integrations/src/tools/docker.ts:10](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/tools/docker.ts#L10)

Docker tooling ESLint configuration
Covers Docker Compose YAML files. Dockerfile linting is intentionally left to
dedicated Dockerfile linters until a stable ESLint parser/plugin is added.

#### Returns

`Promise`\<`ConfigArray`\>

***

### drizzle()

> **drizzle**(): `ConfigArray`

Defined in: [integrations/src/libraries/orm.ts:77](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/libraries/orm.ts#L77)

Drizzle ORM ESLint configuration.

#### Returns

`ConfigArray`

***

### getIntegrationConfigs()

> **getIntegrationConfigs**(`libraries`, `tools`, `testing`, `formats`, `extensions`): `Promise`\<`ConfigArray`\>

Defined in: [integrations/src/compose.ts:82](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/compose.ts#L82)

Gets integration configs based on selected options.
This function maintains the recommended ordering (e.g. Prettier last).

#### Parameters

##### libraries

[`Library`](../core/src.md#library)[]

List of libraries to configure

##### tools

[`Tool`](../core/src.md#tool)[]

List of tools to configure

##### testing

[`Testing`](../core/src.md#testing)[]

List of testing frameworks to configure

##### formats

[`Format`](../core/src.md#format)[]

List of file formats to configure

##### extensions

[`Extension`](../core/src.md#extension)[]

List of extensions to configure

#### Returns

`Promise`\<`ConfigArray`\>

The resolved flat configurations

***

### getPrettierConfig()

> **getPrettierConfig**(`tools`): `Promise`\<`ConfigArray`\>

Defined in: [integrations/src/compose.ts:163](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/compose.ts#L163)

Returns the Prettier configuration if selected.

#### Parameters

##### tools

[`Tool`](../core/src.md#tool)[]

The tools to configure

#### Returns

`Promise`\<`ConfigArray`\>

The prettier config or an empty array

***

### githubActions()

> **githubActions**(): `Promise`\<`ConfigArray`\>

Defined in: [integrations/src/tools/github-actions.ts:10](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/tools/github-actions.ts#L10)

GitHub Actions ESLint configuration
Lints workflow YAML files with the shared YAML rules and workflow-specific
guardrails.

#### Returns

`Promise`\<`ConfigArray`\>

***

### googleGenAi()

> **googleGenAi**(): `ConfigArray`

Defined in: [integrations/src/libraries/google-genai.ts:8](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/libraries/google-genai.ts#L8)

Google GenAI SDK ESLint configuration.

#### Returns

`ConfigArray`

***

### langchain()

> **langchain**(): `ConfigArray`

Defined in: [integrations/src/libraries/langchain.ts:8](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/libraries/langchain.ts#L8)

LangChain.js ESLint configuration.

#### Returns

`ConfigArray`

***

### llamaIndex()

> **llamaIndex**(): `ConfigArray`

Defined in: [integrations/src/libraries/llamaindex.ts:8](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/libraries/llamaindex.ts#L8)

LlamaIndex.TS ESLint configuration.

#### Returns

`ConfigArray`

***

### mastra()

> **mastra**(): `ConfigArray`

Defined in: [integrations/src/libraries/mastra.ts:8](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/libraries/mastra.ts#L8)

Mastra agent framework ESLint configuration.

#### Returns

`ConfigArray`

***

### mcp()

> **mcp**(): `ConfigArray`

Defined in: [integrations/src/libraries/mcp.ts:8](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/libraries/mcp.ts#L8)

Model Context Protocol SDK ESLint configuration.

#### Returns

`ConfigArray`

***

### mikroOrm()

> **mikroOrm**(): `ConfigArray`

Defined in: [integrations/src/libraries/orm.ts:97](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/libraries/orm.ts#L97)

MikroORM ESLint configuration.

#### Returns

`ConfigArray`

***

### nx()

> **nx**(): `Promise`\<`ConfigArray`\>

Defined in: [integrations/src/tools/nx.ts:9](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/tools/nx.ts#L9)

Nx ESLint configuration
Lints Nx workspace JSON/JSONC files using the shared JSONC parser rules.

#### Returns

`Promise`\<`ConfigArray`\>

***

### openAiAgents()

> **openAiAgents**(): `ConfigArray`

Defined in: [integrations/src/libraries/openai-agents.ts:8](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/libraries/openai-agents.ts#L8)

OpenAI Agents SDK ESLint configuration.

#### Returns

`ConfigArray`

***

### prisma()

> **prisma**(): `ConfigArray`

Defined in: [integrations/src/libraries/orm.ts:58](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/libraries/orm.ts#L58)

Prisma ESLint configuration.

Keeps Prisma Client usage on public package entry points. This avoids runtime
internals that frequently change between generated client versions.

#### Returns

`ConfigArray`

***

### sequelize()

> **sequelize**(): `ConfigArray`

Defined in: [integrations/src/libraries/orm.ts:116](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/libraries/orm.ts#L116)

Sequelize ESLint configuration.

#### Returns

`ConfigArray`

***

### typeorm()

> **typeorm**(): `ConfigArray`

Defined in: [integrations/src/libraries/orm.ts:23](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/integrations/src/libraries/orm.ts#L23)

TypeORM ESLint configuration.

TypeORM does not currently provide an ESLint 10-ready recommended flat
config. This integration focuses on stable imports and avoids legacy global
helpers that make migrations and tests harder to reason about.

#### Returns

`ConfigArray`
