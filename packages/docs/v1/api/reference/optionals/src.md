[**@santi020k/eslint-config-basic**](../index.md)

***

# optionals/src

## Variables

### bestPractices

> `const` **bestPractices**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/extensions/best-practices.ts:15](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/extensions/best-practices.ts#L15)

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

Defined in: [optionals/src/tools/cspell.ts:8](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/tools/cspell.ts#L8)

CSpell ESLint configuration
Enables spell checking in your codebase

***

### cypress

> `const` **cypress**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/testing/cypress.ts:10](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/testing/cypress.ts#L10)

Cypress ESLint configuration
Provides linting rules for Cypress end-to-end test files

***

### graphql

> `const` **graphql**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/formats/graphql.ts:8](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/formats/graphql.ts#L8)

GraphQL ESLint configuration
Provides linting rules for GraphQL schema and operations

***

### i18next

> `const` **i18next**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/libraries/i18next.ts:10](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/libraries/i18next.ts#L10)

i18next ESLint configuration
Enables i18next plugin for internationalization best practices

***

### jest

> `const` **jest**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/testing/jest.ts:9](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/testing/jest.ts#L9)

Jest ESLint configuration
Provides linting rules for Jest test files

***

### jsdoc

> `const` **jsdoc**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/tools/jsdoc.ts:9](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/tools/jsdoc.ts#L9)

JSDoc ESLint configuration
Provides rules for TSDoc/JSDoc validation and formatting.

***

### jsonc

> `const` **jsonc**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/formats/jsonc.ts:9](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/formats/jsonc.ts#L9)

JSON/JSONC ESLint configuration
Provides rules for JSON file linting and package.json key sorting

***

### markdown

> `const` **markdown**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/formats/markdown.ts:10](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/formats/markdown.ts#L10)

Markdown ESLint configuration
Lints markdown files for common issues

***

### mdx

> `const` **mdx**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/formats/mdx.ts:26](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/formats/mdx.ts#L26)

MDX ESLint configuration
Lints MDX files with proper code block handling

***

### perfectionist

> `const` **perfectionist**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/extensions/perfectionist.ts:10](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/extensions/perfectionist.ts#L10)

Perfectionist ESLint configuration
Provides rules for sorting and organizing code (imports, exports, object keys, etc.)

***

### playwright

> `const` **playwright**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/testing/playwright.ts:9](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/testing/playwright.ts#L9)

Playwright ESLint configuration
Provides linting rules for Playwright end-to-end test files

***

### prettier

> `const` **prettier**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/tools/prettier.ts:9](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/tools/prettier.ts#L9)

Prettier interop configuration
Disables all ESLint rules that conflict with Prettier formatting

***

### regexp

> `const` **regexp**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/extensions/regexp.ts:11](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/extensions/regexp.ts#L11)

RegExp ESLint configuration
Catches common regex mistakes like exponential backtracking,
unnecessary escapes, and optimizable character classes

***

### security

> `const` **security**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/extensions/security.ts:10](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/extensions/security.ts#L10)

Security ESLint configuration
Provides rules for catching common security vulnerabilities.

***

### sonarjs

> `const` **sonarjs**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/extensions/sonarjs.ts:8](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/extensions/sonarjs.ts#L8)

***

### stencil

> `const` **stencil**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/libraries/stencil.ts:9](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/libraries/stencil.ts#L9)

Stencil ESLint configuration
Enforces best practices for Stencil.js components

***

### storybook

> `const` **storybook**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/libraries/storybook.ts:9](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/libraries/storybook.ts#L9)

Storybook ESLint configuration
Provides rules for Storybook story best practices

***

### swagger

> `const` **swagger**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/tools/swagger.ts:8](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/tools/swagger.ts#L8)

Swagger/NestJS documentation ESLint configuration
Provides rules from the nestjs-typed plugin for Swagger decorator validation

***

### tailwind

> `const` **tailwind**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/libraries/tailwind.ts:9](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/libraries/tailwind.ts#L9)

Tailwind CSS ESLint configuration
Enforces Tailwind CSS best practices using eslint-plugin-better-tailwindcss

***

### tanstackQuery

> `const` **tanstackQuery**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/libraries/tanstack.ts:8](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/libraries/tanstack.ts#L8)

TanStack Query ESLint configuration

***

### tanstackRouter

> `const` **tanstackRouter**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/libraries/tanstack.ts:23](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/libraries/tanstack.ts#L23)

TanStack Router ESLint configuration

***

### testingLibrary

> `const` **testingLibrary**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/testing/testing-library.ts:10](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/testing/testing-library.ts#L10)

Testing Library ESLint configuration
Provides linting rules for Testing Library usage in tests

***

### toml

> `const` **toml**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/formats/toml.ts:9](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/formats/toml.ts#L9)

TOML ESLint configuration
Provides rules for TOML file linting

***

### unicorn

> `const` **unicorn**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/extensions/unicorn.ts:10](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/extensions/unicorn.ts#L10)

Unicorn ESLint configuration
Modern JavaScript best practices from eslint-plugin-unicorn

***

### vitest

> `const` **vitest**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/testing/vitest.ts:10](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/testing/vitest.ts#L10)

Vitest ESLint configuration
Provides linting rules for Vitest test files with best practices

***

### yaml

> `const` **yaml**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [optionals/src/formats/yaml.ts:9](https://github.com/santi020k/eslint-config-basic/blob/d4aea2fe358087379afbb96b93d91deff04f5224/packages/optionals/src/formats/yaml.ts#L9)

YAML ESLint configuration
Provides rules for YAML file linting
