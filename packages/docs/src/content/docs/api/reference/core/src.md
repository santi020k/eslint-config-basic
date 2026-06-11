---
title: "core/src"
description: "@santi020k/eslint-config-basic"
---

## Enumerations

### Extension

Defined in: [core/src/types.ts:35](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L35)

Enum for specialized ESLint extensions and strict rule sets

#### Enumeration Members

##### BestPractices

> **BestPractices**: `"best-practices"`

Defined in: [core/src/types.ts:41](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L41)

Built-in best-practice rules: no-console, no-alert, cyclomatic complexity,
max nesting depth. No extra dependencies required.

##### Perfectionist

> **Perfectionist**: `"perfectionist"`

Defined in: [core/src/types.ts:42](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L42)

##### Regexp

> **Regexp**: `"regexp"`

Defined in: [core/src/types.ts:43](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L43)

##### Security

> **Security**: `"security"`

Defined in: [core/src/types.ts:44](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L44)

##### Sonarjs

> **Sonarjs**: `"sonarjs"`

Defined in: [core/src/types.ts:45](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L45)

##### Unicorn

> **Unicorn**: `"unicorn"`

Defined in: [core/src/types.ts:47](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L47)

***

### Format

Defined in: [core/src/types.ts:53](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L53)

Enum for linting non-JS/TS file formats

#### Enumeration Members

##### Graphql

> **Graphql**: `"graphql"`

Defined in: [core/src/types.ts:54](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L54)

##### Jsonc

> **Jsonc**: `"jsonc"`

Defined in: [core/src/types.ts:55](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L55)

##### Markdown

> **Markdown**: `"markdown"`

Defined in: [core/src/types.ts:56](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L56)

##### Mdx

> **Mdx**: `"mdx"`

Defined in: [core/src/types.ts:57](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L57)

##### Toml

> **Toml**: `"toml"`

Defined in: [core/src/types.ts:58](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L58)

##### Yaml

> **Yaml**: `"yaml"`

Defined in: [core/src/types.ts:59](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L59)

***

### Library

Defined in: [core/src/types.ts:65](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L65)

Enum for application-level runtime dependencies and styling

#### Enumeration Members

##### AiSdk

> **AiSdk**: `"ai-sdk"`

Defined in: [core/src/types.ts:66](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L66)

##### Drizzle

> **Drizzle**: `"drizzle"`

Defined in: [core/src/types.ts:67](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L67)

##### I18next

> **I18next**: `"i18next"`

Defined in: [core/src/types.ts:68](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L68)

##### Langchain

> **Langchain**: `"langchain"`

Defined in: [core/src/types.ts:69](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L69)

##### LlamaIndex

> **LlamaIndex**: `"llamaindex"`

Defined in: [core/src/types.ts:70](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L70)

##### Mastra

> **Mastra**: `"mastra"`

Defined in: [core/src/types.ts:71](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L71)

##### Mcp

> **Mcp**: `"mcp"`

Defined in: [core/src/types.ts:72](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L72)

##### MikroOrm

> **MikroOrm**: `"mikro-orm"`

Defined in: [core/src/types.ts:73](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L73)

##### OpenAiAgents

> **OpenAiAgents**: `"openai-agents"`

Defined in: [core/src/types.ts:74](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L74)

##### Prisma

> **Prisma**: `"prisma"`

Defined in: [core/src/types.ts:75](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L75)

##### Sequelize

> **Sequelize**: `"sequelize"`

Defined in: [core/src/types.ts:76](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L76)

##### Stencil

> **Stencil**: `"stencil"`

Defined in: [core/src/types.ts:77](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L77)

##### Storybook

> **Storybook**: `"storybook"`

Defined in: [core/src/types.ts:78](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L78)

##### Tailwind

> **Tailwind**: `"tailwind"`

Defined in: [core/src/types.ts:79](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L79)

##### TanstackQuery

> **TanstackQuery**: `"tanstack-query"`

Defined in: [core/src/types.ts:80](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L80)

##### TanstackRouter

> **TanstackRouter**: `"tanstack-router"`

Defined in: [core/src/types.ts:81](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L81)

##### Typeorm

> **Typeorm**: `"typeorm"`

Defined in: [core/src/types.ts:82](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L82)

***

### NextMode

Defined in: [core/src/types.ts:88](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L88)

Enum for Next.js mode options

#### Enumeration Members

##### AppRouter

> **AppRouter**: `"app-router"`

Defined in: [core/src/types.ts:89](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L89)

##### Pages

> **Pages**: `"pages"`

Defined in: [core/src/types.ts:90](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L90)

***

### Preset

Defined in: [core/src/types.ts:96](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L96)

Enum for named presets

#### Enumeration Members

##### All

> **All**: `"all"`

Defined in: [core/src/types.ts:99](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L99)

All configs + all optionals

##### App

> **App**: `"app"`

Defined in: [core/src/types.ts:102](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L102)

Browser application defaults with TypeScript and Prettier

##### Basic

> **Basic**: `"basic"`

Defined in: [core/src/types.ts:105](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L105)

Core JS config only

##### Browser

> **Browser**: `"browser"`

Defined in: [core/src/types.ts:108](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L108)

Core + TS + Browser runtime

##### CI

> **CI**: `"ci"`

Defined in: [core/src/types.ts:111](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L111)

CI-oriented defaults with strict severities

##### Library

> **Library**: `"library"`

Defined in: [core/src/types.ts:114](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L114)

TypeScript package/library defaults for published packages

##### Monorepo

> **Monorepo**: `"monorepo"`

Defined in: [core/src/types.ts:117](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L117)

Monorepo-friendly defaults for mixed workspaces

##### Node

> **Node**: `"node"`

Defined in: [core/src/types.ts:120](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L120)

Core + TS + Node runtime

##### Worker

> **Worker**: `"worker"`

Defined in: [core/src/types.ts:123](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L123)

Core + TS + Worker runtime

***

### Runtime

Defined in: [core/src/types.ts:129](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L129)

Enum for runtime environment presets

#### Enumeration Members

##### Browser

> **Browser**: `"browser"`

Defined in: [core/src/types.ts:132](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L132)

Only Browser globals (window, document, etc.)

##### Node

> **Node**: `"node"`

Defined in: [core/src/types.ts:135](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L135)

Only Node.js globals (process, __dirname, etc.)

##### Universal

> **Universal**: `"universal"`

Defined in: [core/src/types.ts:138](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L138)

Both Node.js and Browser globals (default)

##### Worker

> **Worker**: `"worker"`

Defined in: [core/src/types.ts:141](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L141)

Service Worker and Fetch API globals for edge runtimes

***

### Setting

Defined in: [core/src/types.ts:147](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L147)

Enum for settings options in ESLint

#### Enumeration Members

##### DefaultIgnores

> **DefaultIgnores**: `"default-ignores"`

Defined in: [core/src/types.ts:150](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L150)

Default behavior — accepted for symmetry with `NoDefaultIgnores`; passing it changes nothing.

##### Gitignore

> **Gitignore**: `"gitignore"`

Defined in: [core/src/types.ts:153](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L153)

Default behavior — accepted for symmetry with `NoGitignore`; passing it changes nothing.

##### NoDefaultIgnores

> **NoDefaultIgnores**: `"no-default-ignores"`

Defined in: [core/src/types.ts:156](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L156)

Disable the built-in default ignore globs (dist, build, coverage, etc.).

##### NoGitignore

> **NoGitignore**: `"no-gitignore"`

Defined in: [core/src/types.ts:159](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L159)

Disable automatic `.gitignore`-based ignores.

***

### Testing

Defined in: [core/src/types.ts:165](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L165)

Enum for testing frameworks and environments

#### Enumeration Members

##### Cypress

> **Cypress**: `"cypress"`

Defined in: [core/src/types.ts:166](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L166)

##### Jest

> **Jest**: `"jest"`

Defined in: [core/src/types.ts:167](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L167)

##### Playwright

> **Playwright**: `"playwright"`

Defined in: [core/src/types.ts:168](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L168)

##### TestingLibrary

> **TestingLibrary**: `"testing-library"`

Defined in: [core/src/types.ts:169](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L169)

##### Vitest

> **Vitest**: `"vitest"`

Defined in: [core/src/types.ts:170](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L170)

***

### Tool

Defined in: [core/src/types.ts:176](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L176)

Enum for integrating external standalone utilities

#### Enumeration Members

##### Cspell

> **Cspell**: `"cspell"`

Defined in: [core/src/types.ts:177](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L177)

##### Jsdoc

> **Jsdoc**: `"jsdoc"`

Defined in: [core/src/types.ts:178](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L178)

##### Prettier

> **Prettier**: `"prettier"`

Defined in: [core/src/types.ts:179](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L179)

##### Swagger

> **Swagger**: `"swagger"`

Defined in: [core/src/types.ts:180](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L180)

## Interfaces

### DetectionOptions

Defined in: [core/src/types.ts:186](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L186)

Controls automatic project detection by category.

#### Properties

##### extensions?

> `optional` **extensions?**: `boolean`

Defined in: [core/src/types.ts:187](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L187)

##### formats?

> `optional` **formats?**: `boolean`

Defined in: [core/src/types.ts:188](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L188)

##### frameworks?

> `optional` **frameworks?**: `boolean`

Defined in: [core/src/types.ts:189](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L189)

##### libraries?

> `optional` **libraries?**: `boolean`

Defined in: [core/src/types.ts:190](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L190)

##### nextMode?

> `optional` **nextMode?**: `boolean`

Defined in: [core/src/types.ts:191](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L191)

##### runtime?

> `optional` **runtime?**: `boolean`

Defined in: [core/src/types.ts:192](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L192)

##### testing?

> `optional` **testing?**: `boolean`

Defined in: [core/src/types.ts:193](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L193)

##### tools?

> `optional` **tools?**: `boolean`

Defined in: [core/src/types.ts:194](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L194)

##### typescript?

> `optional` **typescript?**: `boolean`

Defined in: [core/src/types.ts:195](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L195)

***

### EslintConfigOptions

Defined in: [core/src/types.ts:238](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L238)

ESLint configuration interface

#### Properties

##### autoFrameworks?

> `optional` **autoFrameworks?**: `boolean`

Defined in: [core/src/types.ts:244](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L244)

Enables bundled framework configs detected from dependencies.
Disable this when you want manual framework control only.

##### detectedFrameworks?

> `optional` **detectedFrameworks?**: [`DetectedFrameworkName`](#detectedframeworkname)[]

Defined in: [core/src/types.ts:250](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L250)

Frameworks detected from package.json by `detectProjectOptions()`.
In v2, `eslintConfig()` enables these bundled framework configs by default.

##### detection?

> `optional` **detection?**: `boolean` \| [`DetectionOptions`](#detectionoptions)

Defined in: [core/src/types.ts:256](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L256)

Enables or disables automatic project detection by category.
Use `false` to disable all detection, or an object for granular control.

##### detectRootDir?

> `optional` **detectRootDir?**: `string`

Defined in: [core/src/types.ts:262](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L262)

Root directory used for automatic project detection.
Defaults to `process.cwd()`.

##### extensions?

> `optional` **extensions?**: [`Extension`](#extension)[]

Defined in: [core/src/types.ts:265](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L265)

List of specialized ESLint rules and extensions

##### formats?

> `optional` **formats?**: [`Format`](#format)[]

Defined in: [core/src/types.ts:268](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L268)

Additional non-JS/TS file formats to lint

##### frameworks?

> `optional` **frameworks?**: `object`

Defined in: [core/src/types.ts:277](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L277)

Framework and library specific configurations.

Set a framework to `true` to use the bundled v2 config from
`@santi020k/eslint-config-basic`, or pass a config array/factory when you
need to override the bundled config.

###### angular?

> `optional` **angular?**: [`ImportedFramework`](#importedframework)

###### astro?

> `optional` **astro?**: [`ImportedFramework`](#importedframework)

###### expo?

> `optional` **expo?**: [`ImportedFramework`](#importedframework)

###### hono?

> `optional` **hono?**: [`ImportedFramework`](#importedframework)

###### nest?

> `optional` **nest?**: [`ImportedFramework`](#importedframework)

###### next?

> `optional` **next?**: [`ImportedFramework`](#importedframework)

###### qwik?

> `optional` **qwik?**: [`ImportedFramework`](#importedframework)

###### react?

> `optional` **react?**: [`ImportedFramework`](#importedframework)

###### remix?

> `optional` **remix?**: [`ImportedFramework`](#importedframework)

###### slidev?

> `optional` **slidev?**: [`ImportedFramework`](#importedframework)

###### solid?

> `optional` **solid?**: [`ImportedFramework`](#importedframework)

###### svelte?

> `optional` **svelte?**: [`ImportedFramework`](#importedframework)

###### vite?

> `optional` **vite?**: [`ImportedFramework`](#importedframework)

###### vue?

> `optional` **vue?**: [`ImportedFramework`](#importedframework)

##### ignores?

> `optional` **ignores?**: `string`[]

Defined in: [core/src/types.ts:300](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L300)

Extra global ignore globs (flat config `ignores` only, no `files`).
Patterns are relative to ESLint's working directory, like a manual ignore block.
Not merged from presets or detection. For `projects` entries, patterns are not
auto-prefixed with the subproject path; use repo-root-relative globs when needed.

##### libraries?

> `optional` **libraries?**: [`Library`](#library)[]

Defined in: [core/src/types.ts:303](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L303)

List of application-level dependencies configurations

##### nextMode?

> `optional` **nextMode?**: [`NextMode`](#nextmode)

Defined in: [core/src/types.ts:306](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L306)

Next.js specific routing mode

##### optionMergeStrategy?

> `optional` **optionMergeStrategy?**: `"replace"` \| `"merge"`

Defined in: [core/src/types.ts:313](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L313)

Controls how explicit arrays/frameworks combine with auto-detected and preset values.
- `merge` (default): union detected + preset + explicit values
- `replace`: explicit values fully replace detected/preset values

##### preset?

> `optional` **preset?**: [`Preset`](#preset)

Defined in: [core/src/types.ts:316](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L316)

High-level configuration preset

##### projects?

> `optional` **projects?**: `Record`\<`string`, `Omit`\<[`EslintConfigOptions`](#eslintconfigoptions), `"projects"`\>\>

Defined in: [core/src/types.ts:322](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L322)

Package-aware subproject configuration for monorepos.
Each key is a workspace-relative folder and each value is scoped to that folder.

##### runtime?

> `optional` **runtime?**: [`Runtime`](#runtime)

Defined in: [core/src/types.ts:325](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L325)

Runtime environment preset (Node, Browser, Universal)

##### settings?

> `optional` **settings?**: [`Setting`](#setting)[]

Defined in: [core/src/types.ts:328](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L328)

List of global settings and behavioral flags

##### strict?

> `optional` **strict?**: [`StrictMode`](#strictmode)

Defined in: [core/src/types.ts:336](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L336)

Severity profile.
- `false` / `recommended`: keep recommended severities
- `true` / `ci`: promote warnings to errors
- `pedantic`: promote warnings and enable built-in best-practice rules

##### testing?

> `optional` **testing?**: [`Testing`](#testing)[]

Defined in: [core/src/types.ts:339](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L339)

List of testing frameworks and testing environments

##### tools?

> `optional` **tools?**: [`Tool`](#tool)[]

Defined in: [core/src/types.ts:342](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L342)

List of integrations for external standalone tools

##### tsconfigRootDir?

> `optional` **tsconfigRootDir?**: `string`

Defined in: [core/src/types.ts:348](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L348)

Root directory of the project.
Required if multiple candidate TSConfigRootDirs are present.

##### typescript?

> `optional` **typescript?**: `boolean` \| \{ `project?`: `string` \| `boolean` \| `string`[]; \}

Defined in: [core/src/types.ts:351](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L351)

Enable TypeScript support with optional settings

###### Union Members

`boolean`

***

###### Type Literal

\{ `project?`: `string` \| `boolean` \| `string`[]; \}

###### ~~project?~~

> `optional` **project?**: `string` \| `boolean` \| `string`[]

###### Deprecated

Since v2, `typescript` only toggles TypeScript support and the
`project` field is ignored — type-aware linting uses `projectService` with
`tsconfigRootDir`. Pass `typescript: true` and use `tsconfigRootDir` instead.
This field remains only for v1 compatibility and will be removed in v3.

***

### ~~TsOptions~~

Defined in: [core/src/types.ts:389](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L389)

TypeScript configuration options.

#### Deprecated

Since v2, `typescript` only toggles TypeScript support and the
`project` field is ignored — type-aware linting uses `projectService` with
`tsconfigRootDir`. Pass `typescript: true` and use `tsconfigRootDir` instead.
This interface remains only for v1 compatibility and will be removed in v3.

#### Properties

##### ~~project?~~

> `optional` **project?**: `string` \| `boolean` \| `string`[]

Defined in: [core/src/types.ts:390](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L390)

## Type Aliases

### DetectedFrameworkName

> **DetectedFrameworkName** = `"angular"` \| `"astro"` \| `"expo"` \| `"hono"` \| `"nest"` \| `"next"` \| `"qwik"` \| `"react"` \| `"remix"` \| `"slidev"` \| `"solid"` \| `"svelte"` \| `"vite"` \| `"vue"`

Defined in: [core/src/types.ts:219](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L219)

Framework names that can be auto-detected by `detectProjectOptions`.
These are informational only — you still need to import and pass the actual
framework config via `frameworks.<name>` in `eslintConfig()`.

***

### FlatConfigArray

> **FlatConfigArray** = `TSESLint.FlatConfig.ConfigArray`

Defined in: [core/src/types.ts:367](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L367)

Type alias for ESLint flat config array

***

### ImportedFramework

> **ImportedFramework** = ((`options?`) => [`FlatConfigArray`](#flatconfigarray)) \| [`FlatConfigArray`](#flatconfigarray) \| `true` \| \{ `default`: ((`options?`) => [`FlatConfigArray`](#flatconfigarray)) \| [`FlatConfigArray`](#flatconfigarray); \}

Defined in: [core/src/types.ts:375](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L375)

Type for framework option values: `true` enables the bundled v2 config,
or pass a config array, a factory function, or an imported module with a
default export. Any other value throws a descriptive `TypeError`
(see `resolveFramework` in `@santi020k/eslint-config-basic`).

***

### StrictMode

> **StrictMode** = `"ci"` \| `"pedantic"` \| `"recommended"` \| `boolean`

Defined in: [core/src/types.ts:201](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L201)

Severity profiles for teams adopting the config progressively.

## Variables

### \_\_detectionInternals

> `const` **\_\_detectionInternals**: `object`

Defined in: [core/src/utils/detection.ts:431](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/utils/detection.ts#L431)

Internal detection helpers exposed for focused unit tests.
Do not use these in application code.

#### Type Declaration

##### collectAllDependencies

> **collectAllDependencies**: (`pkg`) => `DependencyMap`

###### Parameters

###### pkg

`PackageJson`

###### Returns

`DependencyMap`

##### createDefaultOptions

> **createDefaultOptions**: () => [`EslintConfigOptions`](#eslintconfigoptions)

###### Returns

[`EslintConfigOptions`](#eslintconfigoptions)

##### createRuntimeSetter

> **createRuntimeSetter**: (`options`) => (`runtime`) => `void`

###### Parameters

###### options

[`EslintConfigOptions`](#eslintconfigoptions)

###### Returns

(`runtime`) => `void`

##### dedupe

> **dedupe**: \<`T`\>(`values`) => `T`[]

###### Type Parameters

###### T

`T`

###### Parameters

###### values?

`T`[] = `[]`

###### Returns

`T`[]

##### detectFormats

> **detectFormats**: (`allDeps`, `detectRootDir`) => [`Format`](#format)[]

###### Parameters

###### allDeps

`DependencyMap`

###### detectRootDir

`string`

###### Returns

[`Format`](#format)[]

##### detectFrameworks

> **detectFrameworks**: (`allDeps`, `setRuntime`) => [`DetectedFrameworkName`](#detectedframeworkname)[] \| `undefined`

###### Parameters

###### allDeps

`DependencyMap`

###### setRuntime

(`runtime`) => `void`

###### Returns

[`DetectedFrameworkName`](#detectedframeworkname)[] \| `undefined`

##### detectLibraries

> **detectLibraries**: (`allDeps`) => [`Library`](#library)[]

###### Parameters

###### allDeps

`DependencyMap`

###### Returns

[`Library`](#library)[]

##### detectNextMode

> **detectNextMode**: (`allDeps`, `detectRootDir`) => [`NextMode`](#nextmode) \| `undefined`

###### Parameters

###### allDeps

`DependencyMap`

###### detectRootDir

`string`

###### Returns

[`NextMode`](#nextmode) \| `undefined`

##### detectTesting

> **detectTesting**: (`allDeps`) => [`Testing`](#testing)[]

###### Parameters

###### allDeps

`DependencyMap`

###### Returns

[`Testing`](#testing)[]

##### detectTools

> **detectTools**: (`allDeps`, `detectRootDir`) => [`Tool`](#tool)[]

###### Parameters

###### allDeps

`DependencyMap`

###### detectRootDir

`string`

###### Returns

[`Tool`](#tool)[]

##### detectTypescript

> **detectTypescript**: (`detectRootDir`) => `boolean`

###### Parameters

###### detectRootDir

`string`

###### Returns

`boolean`

##### pathExists

> **pathExists**: (`path`) => `boolean`

###### Parameters

###### path

`string`

###### Returns

`boolean`

##### resolvePreset

> **resolvePreset**: (`options`) => [`Preset`](#preset)

###### Parameters

###### options

[`EslintConfigOptions`](#eslintconfigoptions)

###### Returns

[`Preset`](#preset)

***

### coreConfig

> `const` **coreConfig**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [core/src/index.ts:135](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/index.ts#L135)

Core JavaScript ESLint configuration (Universal runtime by default)
This is included by default in all configurations

***

### gitignore

> `const` **gitignore**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [core/src/settings/gitignore.ts:13](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/settings/gitignore.ts#L13)

***

### GLOB\_ASTRO

> `const` **GLOB\_ASTRO**: `string`[]

Defined in: [core/src/types.ts:13](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L13)

***

### GLOB\_JS

> `const` **GLOB\_JS**: `string`[]

Defined in: [core/src/types.ts:6](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L6)

Global file patterns for JavaScript-compatible files

***

### GLOB\_JS\_TS

> `const` **GLOB\_JS\_TS**: `string`[]

Defined in: [core/src/types.ts:10](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L10)

***

### GLOB\_JS\_TS\_ALL

> `const` **GLOB\_JS\_TS\_ALL**: `string`[]

Defined in: [core/src/types.ts:15](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L15)

***

### GLOB\_SLOT

> `const` **GLOB\_SLOT**: `string`[]

Defined in: [core/src/types.ts:14](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L14)

***

### GLOB\_SVELTE

> `const` **GLOB\_SVELTE**: `string`[]

Defined in: [core/src/types.ts:12](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L12)

***

### GLOB\_TS

> `const` **GLOB\_TS**: `string`[]

Defined in: [core/src/types.ts:8](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L8)

***

### GLOB\_VIRTUAL\_TS

> `const` **GLOB\_VIRTUAL\_TS**: `string`[]

Defined in: [core/src/types.ts:17](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L17)

***

### GLOB\_VUE

> `const` **GLOB\_VUE**: `string`[]

Defined in: [core/src/types.ts:11](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L11)

***

### groups

> `const` **groups**: `string`[][]

Defined in: [core/src/rules.ts:3](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/rules.ts#L3)

***

### ReactConfigKeys

> `const` **ReactConfigKeys**: readonly \[`"react"`, `"next"`, `"expo"`, `"remix"`\]

Defined in: [core/src/types.ts:207](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/types.ts#L207)

Array of configurations that require React
Note: These are now used internally for auto-detection and globals

***

### rules

> `const` **rules**: `TSESLint.Linter.RulesRecord`

Defined in: [core/src/rules.ts:35](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/rules.ts#L35)

## Functions

### createCoreConfig()

> **createCoreConfig**(`runtime?`): `ConfigArray`

Defined in: [core/src/index.ts:52](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/index.ts#L52)

Creates the core config with the specified runtime globals

#### Parameters

##### runtime?

[`Runtime`](#runtime) = `Runtime.Universal`

#### Returns

`ConfigArray`

***

### detectProjectOptions()

> **detectProjectOptions**(`detectRootDir?`): [`EslintConfigOptions`](#eslintconfigoptions)

Defined in: [core/src/utils/detection.ts:452](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/utils/detection.ts#L452)

Automatically detects project settings based on package.json content

#### Parameters

##### detectRootDir?

`string` = `...`

Root directory used for dependency/file detection (defaults to process.cwd())

#### Returns

[`EslintConfigOptions`](#eslintconfigoptions)

Detected ESLint configuration options

***

### getGlobalsForRuntime()

> **getGlobalsForRuntime**(`runtime?`): `GlobalsConfig` \| `undefined`

Defined in: [core/src/index.ts:24](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/index.ts#L24)

Returns the appropriate globals for the given runtime option

#### Parameters

##### runtime?

[`Runtime`](#runtime) = `Runtime.Universal`

#### Returns

`GlobalsConfig` \| `undefined`

***

### hasReactConfig()

> **hasReactConfig**(`options?`): `boolean`

Defined in: [core/src/utils/index.ts:9](https://github.com/santi020k/eslint-config-basic/blob/c78ec368f556f175704cc141801a0ae55fbe04f3/packages/core/src/utils/index.ts#L9)

Checks if the provided EslintConfigOptions includes any React-specific configurations.

#### Parameters

##### options?

[`EslintConfigOptions`](#eslintconfigoptions)

ESLint configuration options.

#### Returns

`boolean`

True if any React configuration is detected, false otherwise.

## References

### jsConfig

Renames and re-exports [coreConfig](#coreconfig)
