---
title: "integrations/src"
description: "@santi020k/eslint-config-basic"
---

## Variables

### a11y

> `const` **a11y**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [extensions/src/a11y.ts:13](https://github.com/santi020k/eslint-config-basic/blob/main/packages/extensions/src/a11y.ts#L13)

A11y extension configurations
Provides accessibility linting for JSX and Vue

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### aiSdk

> `const` **aiSdk**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [libraries/src/ai.ts:33](https://github.com/santi020k/eslint-config-basic/blob/main/packages/libraries/src/ai.ts#L33)

Vercel AI SDK security ESLint configuration.

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### ~~astroDoctor~~

> `const` **astroDoctor**: () => `Promise`\<[`FlatConfigArray`](../core/src.md#flatconfigarray)\>

Defined in: [extensions/src/astro-doctor.ts:5](https://github.com/santi020k/eslint-config-basic/blob/main/packages/extensions/src/astro-doctor.ts#L5)

#### Returns

`Promise`\<[`FlatConfigArray`](../core/src.md#flatconfigarray)\>

#### Deprecated

Import these factories from
`@santi020k/eslint-config-extensions` instead. This compatibility subpath is
scheduled for removal in v4.

***

### bestPractices

> `const` **bestPractices**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [extensions/src/best-practices.ts:16](https://github.com/santi020k/eslint-config-basic/blob/main/packages/extensions/src/best-practices.ts#L16)

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

Defined in: [extensions/src/biome.ts:12](https://github.com/santi020k/eslint-config-basic/blob/main/packages/extensions/src/biome.ts#L12)

Biome extension configurations
Disables rules that conflict with Biome formatting and linting.

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### boundaries

> `const` **boundaries**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [extensions/src/boundaries.ts:12](https://github.com/santi020k/eslint-config-basic/blob/main/packages/extensions/src/boundaries.ts#L12)

Import-boundary ESLint configuration

Prevents importing generated modules or test modules from production source.
Relies on import/no-relative-packages and import/no-self-import from
eslint-plugin-import-x, which the base config already loads.

***

### command

> `const` **command**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [tools/src/command.ts:12](https://github.com/santi020k/eslint-config-basic/blob/main/packages/tools/src/command.ts#L12)

Command ESLint configuration
Provides in-editor micro-fixes via magic comments (e.g., /// @keep)

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### compat

> `const` **compat**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [extensions/src/compat.ts:11](https://github.com/santi020k/eslint-config-basic/blob/main/packages/extensions/src/compat.ts#L11)

Browser compatibility extension configuration
Checks code against the project browserslist using `eslint-plugin-compat`

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### cspell

> `const` **cspell**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [tools/src/cspell.ts:12](https://github.com/santi020k/eslint-config-basic/blob/main/packages/tools/src/cspell.ts#L12)

CSpell ESLint configuration
Enables spell checking in your codebase

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### css

> `const` **css**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [formats/src/css.ts:9](https://github.com/santi020k/eslint-config-basic/blob/main/packages/formats/src/css.ts#L9)

CSS ESLint configuration
Lints plain CSS files using the official `@eslint/css` language plugin

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### cypress

> `const` **cypress**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [testing/src/cypress.ts:10](https://github.com/santi020k/eslint-config-basic/blob/main/packages/testing/src/cypress.ts#L10)

Cypress ESLint configuration
Provides linting rules for Cypress end-to-end test files

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### deMorgan

> `const` **deMorgan**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [extensions/src/de-morgan.ts:11](https://github.com/santi020k/eslint-config-basic/blob/main/packages/extensions/src/de-morgan.ts#L11)

De Morgan extension configuration
Simplifies negated logical expressions using `eslint-plugin-de-morgan`

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### depend

> `const` **depend**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [extensions/src/depend.ts:12](https://github.com/santi020k/eslint-config-basic/blob/main/packages/extensions/src/depend.ts#L12)

Depend extension configuration
Suggests lighter or native alternatives to heavy dependencies using
`eslint-plugin-depend`

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### graphql

> `const` **graphql**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [formats/src/graphql.ts:20](https://github.com/santi020k/eslint-config-basic/blob/main/packages/formats/src/graphql.ts#L20)

GraphQL ESLint configuration
Provides linting rules for GraphQL schema and operations

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### html

> `const` **html**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [formats/src/html.ts:13](https://github.com/santi020k/eslint-config-basic/blob/main/packages/formats/src/html.ts#L13)

HTML ESLint configuration
Lints plain HTML files using `@html-eslint/eslint-plugin` and its parser

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### i18next

> `const` **i18next**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [libraries/src/i18next.ts:12](https://github.com/santi020k/eslint-config-basic/blob/main/packages/libraries/src/i18next.ts#L12)

i18next ESLint configuration
Enables i18next plugin for internationalization best practices

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### jest

> `const` **jest**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [testing/src/jest.ts:10](https://github.com/santi020k/eslint-config-basic/blob/main/packages/testing/src/jest.ts#L10)

Jest ESLint configuration
Provides linting rules for Jest test files

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### jestDom

> `const` **jestDom**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [testing/src/jest-dom.ts:12](https://github.com/santi020k/eslint-config-basic/blob/main/packages/testing/src/jest-dom.ts#L12)

Jest DOM ESLint configuration
Provides rules for @testing-library/jest-dom

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### jsdoc

> `const` **jsdoc**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [tools/src/jsdoc.ts:11](https://github.com/santi020k/eslint-config-basic/blob/main/packages/tools/src/jsdoc.ts#L11)

JSDoc ESLint configuration
Provides rules for TSDoc/JSDoc validation and formatting.

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### jsonc

> `const` **jsonc**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [formats/src/jsonc.ts:10](https://github.com/santi020k/eslint-config-basic/blob/main/packages/formats/src/jsonc.ts#L10)

JSON/JSONC ESLint configuration
Provides rules for JSON file linting and package.json key sorting

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### markdown

> `const` **markdown**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [formats/src/markdown.ts:21](https://github.com/santi020k/eslint-config-basic/blob/main/packages/formats/src/markdown.ts#L21)

Markdown ESLint configuration
Lints markdown files for common issues

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### mdx

> `const` **mdx**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [formats/src/mdx.ts:11](https://github.com/santi020k/eslint-config-basic/blob/main/packages/formats/src/mdx.ts#L11)

MDX ESLint configuration
Lints MDX files with proper code block handling

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### node

> `const` **node**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [extensions/src/node.ts:13](https://github.com/santi020k/eslint-config-basic/blob/main/packages/extensions/src/node.ts#L13)

Node.js extension configuration
Applies `eslint-plugin-n` recommended rules for Node.js codebases.
Module-resolution rules are disabled for TypeScript files where the
TypeScript compiler already validates imports.

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### noOnlyTests

> `const` **noOnlyTests**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [extensions/src/no-only-tests.ts:11](https://github.com/santi020k/eslint-config-basic/blob/main/packages/extensions/src/no-only-tests.ts#L11)

Prevents `test.only` / `describe.only` from being committed to version
control. Uses `eslint-plugin-no-only-tests`.

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### oxlint

> `const` **oxlint**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [extensions/src/oxlint.ts:14](https://github.com/santi020k/eslint-config-basic/blob/main/packages/extensions/src/oxlint.ts#L14)

Oxlint extension configuration
Disables ESLint rules already covered by Oxlint so both linters can run
side by side without duplicate reports (analogous to the Biome extension)

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### packageJson

> `const` **packageJson**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [formats/src/package-json.ts:10](https://github.com/santi020k/eslint-config-basic/blob/main/packages/formats/src/package-json.ts#L10)

Package.json ESLint configuration
Provides validation for npm package standards

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### perfectionist

> `const` **perfectionist**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [extensions/src/perfectionist.ts:12](https://github.com/santi020k/eslint-config-basic/blob/main/packages/extensions/src/perfectionist.ts#L12)

Perfectionist ESLint configuration
Provides rules for sorting and organizing code (imports, exports, object keys, etc.)

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### playwright

> `const` **playwright**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [testing/src/playwright.ts:9](https://github.com/santi020k/eslint-config-basic/blob/main/packages/testing/src/playwright.ts#L9)

Playwright ESLint configuration
Provides linting rules for Playwright end-to-end test files

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### pnpm

> `const` **pnpm**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [tools/src/pnpm.ts:14](https://github.com/santi020k/eslint-config-basic/blob/main/packages/tools/src/pnpm.ts#L14)

pnpm tooling ESLint configuration
Enforces pnpm catalogs and workspace settings in `package.json` and
`pnpm-workspace.yaml` using `eslint-plugin-pnpm`

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### prettier

> `const` **prettier**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [tools/src/prettier.ts:10](https://github.com/santi020k/eslint-config-basic/blob/main/packages/tools/src/prettier.ts#L10)

Prettier interop configuration
Disables all ESLint rules that conflict with Prettier formatting

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### regexp

> `const` **regexp**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [extensions/src/regexp.ts:13](https://github.com/santi020k/eslint-config-basic/blob/main/packages/extensions/src/regexp.ts#L13)

RegExp ESLint configuration
Catches common regex mistakes like exponential backtracking,
unnecessary escapes, and optimizable character classes

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### security

> `const` **security**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [extensions/src/security.ts:11](https://github.com/santi020k/eslint-config-basic/blob/main/packages/extensions/src/security.ts#L11)

Security ESLint configuration
Provides rules for catching common security vulnerabilities.

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### ~~sonarjs~~

> `const` **sonarjs**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [extensions/src/sonarjs.ts:7](https://github.com/santi020k/eslint-config-basic/blob/main/packages/extensions/src/sonarjs.ts#L7)

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

#### Deprecated

Import these factories from
`@santi020k/eslint-config-extensions` instead. This compatibility subpath is
scheduled for removal in v4.

***

### stencil

> `const` **stencil**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [libraries/src/stencil.ts:10](https://github.com/santi020k/eslint-config-basic/blob/main/packages/libraries/src/stencil.ts#L10)

Stencil ESLint configuration
Enforces best practices for Stencil.js components

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### storybook

> `const` **storybook**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [libraries/src/storybook.ts:10](https://github.com/santi020k/eslint-config-basic/blob/main/packages/libraries/src/storybook.ts#L10)

Storybook ESLint configuration
Provides rules for Storybook story best practices

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### swagger

> `const` **swagger**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [tools/src/swagger.ts:12](https://github.com/santi020k/eslint-config-basic/blob/main/packages/tools/src/swagger.ts#L12)

Swagger/NestJS documentation ESLint configuration
Provides rules from the nestjs-typed plugin for Swagger decorator validation

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### tailwind

> `const` **tailwind**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [libraries/src/tailwind.ts:11](https://github.com/santi020k/eslint-config-basic/blob/main/packages/libraries/src/tailwind.ts#L11)

Tailwind CSS ESLint configuration
Enforces Tailwind CSS best practices using eslint-plugin-better-tailwindcss

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### tanstackQuery

> `const` **tanstackQuery**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [libraries/src/tanstack.ts:10](https://github.com/santi020k/eslint-config-basic/blob/main/packages/libraries/src/tanstack.ts#L10)

TanStack Query ESLint configuration

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### tanstackRouter

> `const` **tanstackRouter**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [libraries/src/tanstack.ts:30](https://github.com/santi020k/eslint-config-basic/blob/main/packages/libraries/src/tanstack.ts#L30)

TanStack Router ESLint configuration

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### testingLibrary

> `const` **testingLibrary**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [testing/src/testing-library.ts:10](https://github.com/santi020k/eslint-config-basic/blob/main/packages/testing/src/testing-library.ts#L10)

Testing Library ESLint configuration
Provides linting rules for Testing Library usage in tests

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### toml

> `const` **toml**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [formats/src/toml.ts:10](https://github.com/santi020k/eslint-config-basic/blob/main/packages/formats/src/toml.ts#L10)

TOML ESLint configuration
Provides rules for TOML file linting

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### turbo

> `const` **turbo**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [libraries/src/turbo.ts:12](https://github.com/santi020k/eslint-config-basic/blob/main/packages/libraries/src/turbo.ts#L12)

Turborepo ESLint configuration
Validates process.env usage against turbo.json

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### unicorn

> `const` **unicorn**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [extensions/src/unicorn.ts:12](https://github.com/santi020k/eslint-config-basic/blob/main/packages/extensions/src/unicorn.ts#L12)

Unicorn ESLint configuration
Modern JavaScript best practices from eslint-plugin-unicorn

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### vitest

> `const` **vitest**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [testing/src/vitest.ts:10](https://github.com/santi020k/eslint-config-basic/blob/main/packages/testing/src/vitest.ts#L10)

Vitest ESLint configuration
Provides linting rules for Vitest test files with best practices

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### yaml

> `const` **yaml**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [formats/src/yaml.ts:10](https://github.com/santi020k/eslint-config-basic/blob/main/packages/formats/src/yaml.ts#L10)

YAML ESLint configuration
Provides rules for YAML file linting

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

***

### zod

> `const` **zod**: () => `Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

Defined in: [libraries/src/zod.ts:11](https://github.com/santi020k/eslint-config-basic/blob/main/packages/libraries/src/zod.ts#L11)

Zod ESLint configuration
Provides validation rules for Zod schemas

#### Returns

`Promise`\<`TSESLint.FlatConfig.ConfigArray`\>

## Functions

### autogen()

> **autogen**(): `ConfigArray`

Defined in: [libraries/src/autogen.ts:8](https://github.com/santi020k/eslint-config-basic/blob/main/packages/libraries/src/autogen.ts#L8)

AutoGen SDK ESLint configuration.

#### Returns

`ConfigArray`

***

### docker()

> **docker**(): `Promise`\<`ConfigArray`\>

Defined in: [tools/src/docker.ts:10](https://github.com/santi020k/eslint-config-basic/blob/main/packages/tools/src/docker.ts#L10)

Docker tooling ESLint configuration
Covers Docker Compose YAML files. Dockerfile linting is intentionally left to
dedicated Dockerfile linters until a stable ESLint parser/plugin is added.

#### Returns

`Promise`\<`ConfigArray`\>

***

### drizzle()

> **drizzle**(): `ConfigArray`

Defined in: [libraries/src/orm.ts:77](https://github.com/santi020k/eslint-config-basic/blob/main/packages/libraries/src/orm.ts#L77)

Drizzle ORM ESLint configuration.

#### Returns

`ConfigArray`

***

### ~~getIntegrationConfigs()~~

> **getIntegrationConfigs**(`libraries`, `tools`, `testing`, `formats`, `extensions`): `Promise`\<`ConfigArray`\>

Defined in: [integrations/src/compose.ts:25](https://github.com/santi020k/eslint-config-basic/blob/main/packages/integrations/src/compose.ts#L25)

#### Parameters

##### libraries

[`Library`](../core/src.md#library)[]

##### tools

[`Tool`](../core/src.md#tool)[]

##### testing

[`Testing`](../core/src.md#testing)[]

##### formats

[`Format`](../core/src.md#format)[]

##### extensions

[`Extension`](../core/src.md#extension)[]

#### Returns

`Promise`\<`ConfigArray`\>

#### Deprecated

Use the category packages directly.
This compatibility aggregate is maintained for v3 and scheduled for removal in v4.

***

### ~~getPrettierConfig()~~

> **getPrettierConfig**(`tools`): `Promise`\<`ConfigArray`\>

Defined in: [integrations/src/compose.ts:36](https://github.com/santi020k/eslint-config-basic/blob/main/packages/integrations/src/compose.ts#L36)

#### Parameters

##### tools

[`Tool`](../core/src.md#tool)[]

#### Returns

`Promise`\<`ConfigArray`\>

#### Deprecated

Use the category packages directly.
This compatibility aggregate is maintained for v3 and scheduled for removal in v4.

***

### githubActions()

> **githubActions**(): `Promise`\<`ConfigArray`\>

Defined in: [tools/src/github-actions.ts:10](https://github.com/santi020k/eslint-config-basic/blob/main/packages/tools/src/github-actions.ts#L10)

GitHub Actions ESLint configuration
Lints workflow YAML files with the shared YAML rules and workflow-specific
guardrails.

#### Returns

`Promise`\<`ConfigArray`\>

***

### googleGenAi()

> **googleGenAi**(): `ConfigArray`

Defined in: [libraries/src/google-genai.ts:8](https://github.com/santi020k/eslint-config-basic/blob/main/packages/libraries/src/google-genai.ts#L8)

Google GenAI SDK ESLint configuration.

#### Returns

`ConfigArray`

***

### langchain()

> **langchain**(): `ConfigArray`

Defined in: [libraries/src/langchain.ts:8](https://github.com/santi020k/eslint-config-basic/blob/main/packages/libraries/src/langchain.ts#L8)

LangChain.js ESLint configuration.

#### Returns

`ConfigArray`

***

### llamaIndex()

> **llamaIndex**(): `ConfigArray`

Defined in: [libraries/src/llamaindex.ts:8](https://github.com/santi020k/eslint-config-basic/blob/main/packages/libraries/src/llamaindex.ts#L8)

LlamaIndex.TS ESLint configuration.

#### Returns

`ConfigArray`

***

### mastra()

> **mastra**(): `ConfigArray`

Defined in: [libraries/src/mastra.ts:8](https://github.com/santi020k/eslint-config-basic/blob/main/packages/libraries/src/mastra.ts#L8)

Mastra agent framework ESLint configuration.

#### Returns

`ConfigArray`

***

### mcp()

> **mcp**(): `ConfigArray`

Defined in: [libraries/src/mcp.ts:8](https://github.com/santi020k/eslint-config-basic/blob/main/packages/libraries/src/mcp.ts#L8)

Model Context Protocol SDK ESLint configuration.

#### Returns

`ConfigArray`

***

### mikroOrm()

> **mikroOrm**(): `ConfigArray`

Defined in: [libraries/src/orm.ts:97](https://github.com/santi020k/eslint-config-basic/blob/main/packages/libraries/src/orm.ts#L97)

MikroORM ESLint configuration.

#### Returns

`ConfigArray`

***

### nx()

> **nx**(): `Promise`\<`ConfigArray`\>

Defined in: [tools/src/nx.ts:9](https://github.com/santi020k/eslint-config-basic/blob/main/packages/tools/src/nx.ts#L9)

Nx ESLint configuration
Lints Nx workspace JSON/JSONC files using the shared JSONC parser rules.

#### Returns

`Promise`\<`ConfigArray`\>

***

### openAiAgents()

> **openAiAgents**(): `ConfigArray`

Defined in: [libraries/src/openai-agents.ts:8](https://github.com/santi020k/eslint-config-basic/blob/main/packages/libraries/src/openai-agents.ts#L8)

OpenAI Agents SDK ESLint configuration.

#### Returns

`ConfigArray`

***

### prisma()

> **prisma**(): `ConfigArray`

Defined in: [libraries/src/orm.ts:58](https://github.com/santi020k/eslint-config-basic/blob/main/packages/libraries/src/orm.ts#L58)

Prisma ESLint configuration.

Keeps Prisma Client usage on public package entry points. This avoids runtime
internals that frequently change between generated client versions.

#### Returns

`ConfigArray`

***

### sequelize()

> **sequelize**(): `ConfigArray`

Defined in: [libraries/src/orm.ts:116](https://github.com/santi020k/eslint-config-basic/blob/main/packages/libraries/src/orm.ts#L116)

Sequelize ESLint configuration.

#### Returns

`ConfigArray`

***

### typeorm()

> **typeorm**(): `ConfigArray`

Defined in: [libraries/src/orm.ts:23](https://github.com/santi020k/eslint-config-basic/blob/main/packages/libraries/src/orm.ts#L23)

TypeORM ESLint configuration.

TypeORM does not currently provide an ESLint 10-ready recommended flat
config. This integration focuses on stable imports and avoids legacy global
helpers that make migrations and tests harder to reason about.

#### Returns

`ConfigArray`
