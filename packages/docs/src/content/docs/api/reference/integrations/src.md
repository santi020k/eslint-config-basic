---
title: "integrations/src"
description: "@santi020k/eslint-config-basic"
---

## Variables

### bestPractices

> `const` **bestPractices**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/extensions/best-practices.ts:15](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/extensions/best-practices.ts#L15)

Best-practices ESLint configuration

Adds commonly-recommended quality rules that go beyond stylistic formatting:
- `no-console`    — warn when console.* calls are left in production code
- `no-alert`      — error on browser alert / confirm / prompt
- `complexity`    — warn when cyclomatic complexity exceeds 10
- `max-depth`     — warn when block nesting exceeds 4 levels

All rules use built-in ESLint only; no extra dependencies are required.

***

### cspell

> `const` **cspell**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/tools/cspell.ts:10](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/tools/cspell.ts#L10)

CSpell ESLint configuration
Enables spell checking in your codebase

***

### cypress

> `const` **cypress**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/testing/cypress.ts:12](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/testing/cypress.ts#L12)

Cypress ESLint configuration
Provides linting rules for Cypress end-to-end test files

***

### graphql

> `const` **graphql**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/formats/graphql.ts:20](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/formats/graphql.ts#L20)

GraphQL ESLint configuration
Provides linting rules for GraphQL schema and operations

***

### i18next

> `const` **i18next**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/libraries/i18next.ts:12](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/libraries/i18next.ts#L12)

i18next ESLint configuration
Enables i18next plugin for internationalization best practices

***

### jest

> `const` **jest**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/testing/jest.ts:11](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/testing/jest.ts#L11)

Jest ESLint configuration
Provides linting rules for Jest test files

***

### jsdoc

> `const` **jsdoc**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/tools/jsdoc.ts:9](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/tools/jsdoc.ts#L9)

JSDoc ESLint configuration
Provides rules for TSDoc/JSDoc validation and formatting.

***

### jsonc

> `const` **jsonc**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/formats/jsonc.ts:11](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/formats/jsonc.ts#L11)

JSON/JSONC ESLint configuration
Provides rules for JSON file linting and package.json key sorting

***

### markdown

> `const` **markdown**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/formats/markdown.ts:21](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/formats/markdown.ts#L21)

Markdown ESLint configuration
Lints markdown files for common issues

***

### mdx

> `const` **mdx**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/formats/mdx.ts:12](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/formats/mdx.ts#L12)

MDX ESLint configuration
Lints MDX files with proper code block handling

***

### perfectionist

> `const` **perfectionist**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/extensions/perfectionist.ts:12](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/extensions/perfectionist.ts#L12)

Perfectionist ESLint configuration
Provides rules for sorting and organizing code (imports, exports, object keys, etc.)

***

### playwright

> `const` **playwright**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/testing/playwright.ts:9](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/testing/playwright.ts#L9)

Playwright ESLint configuration
Provides linting rules for Playwright end-to-end test files

***

### prettier

> `const` **prettier**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/tools/prettier.ts:11](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/tools/prettier.ts#L11)

Prettier interop configuration
Disables all ESLint rules that conflict with Prettier formatting

***

### regexp

> `const` **regexp**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/extensions/regexp.ts:13](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/extensions/regexp.ts#L13)

RegExp ESLint configuration
Catches common regex mistakes like exponential backtracking,
unnecessary escapes, and optimizable character classes

***

### security

> `const` **security**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/extensions/security.ts:10](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/extensions/security.ts#L10)

Security ESLint configuration
Provides rules for catching common security vulnerabilities.

***

### sonarjs

> `const` **sonarjs**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/extensions/sonarjs.ts:6](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/extensions/sonarjs.ts#L6)

***

### stencil

> `const` **stencil**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/libraries/stencil.ts:11](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/libraries/stencil.ts#L11)

Stencil ESLint configuration
Enforces best practices for Stencil.js components

***

### storybook

> `const` **storybook**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/libraries/storybook.ts:11](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/libraries/storybook.ts#L11)

Storybook ESLint configuration
Provides rules for Storybook story best practices

***

### swagger

> `const` **swagger**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/tools/swagger.ts:10](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/tools/swagger.ts#L10)

Swagger/NestJS documentation ESLint configuration
Provides rules from the nestjs-typed plugin for Swagger decorator validation

***

### tailwind

> `const` **tailwind**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/libraries/tailwind.ts:9](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/libraries/tailwind.ts#L9)

Tailwind CSS ESLint configuration
Enforces Tailwind CSS best practices using eslint-plugin-better-tailwindcss

***

### tanstackQuery

> `const` **tanstackQuery**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/libraries/tanstack.ts:8](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/libraries/tanstack.ts#L8)

TanStack Query ESLint configuration

***

### tanstackRouter

> `const` **tanstackRouter**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/libraries/tanstack.ts:27](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/libraries/tanstack.ts#L27)

TanStack Router ESLint configuration

***

### testingLibrary

> `const` **testingLibrary**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/testing/testing-library.ts:12](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/testing/testing-library.ts#L12)

Testing Library ESLint configuration
Provides linting rules for Testing Library usage in tests

***

### toml

> `const` **toml**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/formats/toml.ts:11](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/formats/toml.ts#L11)

TOML ESLint configuration
Provides rules for TOML file linting

***

### unicorn

> `const` **unicorn**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/extensions/unicorn.ts:12](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/extensions/unicorn.ts#L12)

Unicorn ESLint configuration
Modern JavaScript best practices from eslint-plugin-unicorn

***

### vitest

> `const` **vitest**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/testing/vitest.ts:11](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/testing/vitest.ts#L11)

Vitest ESLint configuration
Provides linting rules for Vitest test files with best practices

***

### yaml

> `const` **yaml**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [integrations/src/formats/yaml.ts:11](https://github.com/santi020k/eslint-config-basic/blob/89f28827e21ade6b5425c7f6e9aabbe017d03873/packages/integrations/src/formats/yaml.ts#L11)

YAML ESLint configuration
Provides rules for YAML file linting
