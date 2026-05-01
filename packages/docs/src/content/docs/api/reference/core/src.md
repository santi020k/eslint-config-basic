---
title: "core/src"
description: "@santi020k/eslint-config-basic"
---

## Enumerations

### Extension

Defined in: [core/src/types.ts:88](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L88)

Enum for specialized ESLint extensions and strict rule sets

#### Enumeration Members

##### BestPractices

> **BestPractices**: `"best-practices"`

Defined in: [core/src/types.ts:99](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L99)

Built-in best-practice rules: no-console, no-alert, cyclomatic complexity,
max nesting depth. No extra dependencies required.

##### Perfectionist

> **Perfectionist**: `"perfectionist"`

Defined in: [core/src/types.ts:93](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L93)

##### Regexp

> **Regexp**: `"regexp"`

Defined in: [core/src/types.ts:89](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L89)

##### Security

> **Security**: `"security"`

Defined in: [core/src/types.ts:92](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L92)

##### Sonarjs

> **Sonarjs**: `"sonarjs"`

Defined in: [core/src/types.ts:91](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L91)

##### Unicorn

> **Unicorn**: `"unicorn"`

Defined in: [core/src/types.ts:90](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L90)

***

### Format

Defined in: [core/src/types.ts:66](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L66)

Enum for linting non-JS/TS file formats

#### Enumeration Members

##### Graphql

> **Graphql**: `"graphql"`

Defined in: [core/src/types.ts:72](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L72)

##### Jsonc

> **Jsonc**: `"jsonc"`

Defined in: [core/src/types.ts:69](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L69)

##### Markdown

> **Markdown**: `"markdown"`

Defined in: [core/src/types.ts:68](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L68)

##### Mdx

> **Mdx**: `"mdx"`

Defined in: [core/src/types.ts:67](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L67)

##### Toml

> **Toml**: `"toml"`

Defined in: [core/src/types.ts:71](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L71)

##### Yaml

> **Yaml**: `"yaml"`

Defined in: [core/src/types.ts:70](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L70)

***

### Library

Defined in: [core/src/types.ts:43](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L43)

Enum for application-level runtime dependencies and styling

#### Enumeration Members

##### I18next

> **I18next**: `"i18next"`

Defined in: [core/src/types.ts:45](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L45)

##### Stencil

> **Stencil**: `"stencil"`

Defined in: [core/src/types.ts:46](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L46)

##### Storybook

> **Storybook**: `"storybook"`

Defined in: [core/src/types.ts:49](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L49)

##### Tailwind

> **Tailwind**: `"tailwind"`

Defined in: [core/src/types.ts:44](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L44)

##### TanstackQuery

> **TanstackQuery**: `"tanstack-query"`

Defined in: [core/src/types.ts:47](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L47)

##### TanstackRouter

> **TanstackRouter**: `"tanstack-router"`

Defined in: [core/src/types.ts:48](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L48)

***

### NextMode

Defined in: [core/src/types.ts:35](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L35)

Enum for Next.js mode options

#### Enumeration Members

##### AppRouter

> **AppRouter**: `"app-router"`

Defined in: [core/src/types.ts:37](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L37)

##### Pages

> **Pages**: `"pages"`

Defined in: [core/src/types.ts:36](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L36)

***

### Preset

Defined in: [core/src/types.ts:131](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L131)

Enum for named presets

#### Enumeration Members

##### All

> **All**: `"all"`

Defined in: [core/src/types.ts:137](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L137)

All configs + all optionals

##### App

> **App**: `"app"`

Defined in: [core/src/types.ts:152](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L152)

Browser application defaults with TypeScript and Prettier

##### Basic

> **Basic**: `"basic"`

Defined in: [core/src/types.ts:134](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L134)

Core JS config only

##### Browser

> **Browser**: `"browser"`

Defined in: [core/src/types.ts:143](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L143)

Core + TS + Browser runtime

##### CI

> **CI**: `"ci"`

Defined in: [core/src/types.ts:155](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L155)

CI-oriented defaults with strict severities

##### Library

> **Library**: `"library"`

Defined in: [core/src/types.ts:149](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L149)

TypeScript package/library defaults for published packages

##### Monorepo

> **Monorepo**: `"monorepo"`

Defined in: [core/src/types.ts:158](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L158)

Monorepo-friendly defaults for mixed workspaces

##### Node

> **Node**: `"node"`

Defined in: [core/src/types.ts:140](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L140)

Core + TS + Node runtime

##### Worker

> **Worker**: `"worker"`

Defined in: [core/src/types.ts:146](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L146)

Core + TS + Worker runtime

***

### Runtime

Defined in: [core/src/types.ts:113](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L113)

Enum for runtime environment presets

#### Enumeration Members

##### Browser

> **Browser**: `"browser"`

Defined in: [core/src/types.ts:119](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L119)

Only Browser globals (window, document, etc.)

##### Node

> **Node**: `"node"`

Defined in: [core/src/types.ts:116](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L116)

Only Node.js globals (process, __dirname, etc.)

##### Universal

> **Universal**: `"universal"`

Defined in: [core/src/types.ts:125](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L125)

Both Node.js and Browser globals (default)

##### Worker

> **Worker**: `"worker"`

Defined in: [core/src/types.ts:122](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L122)

Service Worker and Fetch API globals for edge runtimes

***

### Setting

Defined in: [core/src/types.ts:105](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L105)

Enum for settings options in ESLint

#### Enumeration Members

##### Gitignore

> **Gitignore**: `"gitignore"`

Defined in: [core/src/types.ts:106](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L106)

##### NoGitignore

> **NoGitignore**: `"no-gitignore"`

Defined in: [core/src/types.ts:107](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L107)

***

### Testing

Defined in: [core/src/types.ts:55](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L55)

Enum for testing frameworks and environments

#### Enumeration Members

##### Cypress

> **Cypress**: `"cypress"`

Defined in: [core/src/types.ts:59](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L59)

##### Jest

> **Jest**: `"jest"`

Defined in: [core/src/types.ts:58](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L58)

##### Playwright

> **Playwright**: `"playwright"`

Defined in: [core/src/types.ts:57](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L57)

##### TestingLibrary

> **TestingLibrary**: `"testing-library"`

Defined in: [core/src/types.ts:60](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L60)

##### Vitest

> **Vitest**: `"vitest"`

Defined in: [core/src/types.ts:56](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L56)

***

### Tool

Defined in: [core/src/types.ts:78](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L78)

Enum for integrating external standalone utilities

#### Enumeration Members

##### Cspell

> **Cspell**: `"cspell"`

Defined in: [core/src/types.ts:80](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L80)

##### Jsdoc

> **Jsdoc**: `"jsdoc"`

Defined in: [core/src/types.ts:81](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L81)

##### Prettier

> **Prettier**: `"prettier"`

Defined in: [core/src/types.ts:79](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L79)

##### Swagger

> **Swagger**: `"swagger"`

Defined in: [core/src/types.ts:82](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L82)

## Interfaces

### DetectionOptions

Defined in: [core/src/types.ts:164](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L164)

Controls automatic project detection by category.

#### Properties

##### formats?

> `optional` **formats?**: `boolean`

Defined in: [core/src/types.ts:169](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L169)

##### frameworks?

> `optional` **frameworks?**: `boolean`

Defined in: [core/src/types.ts:166](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L166)

##### libraries?

> `optional` **libraries?**: `boolean`

Defined in: [core/src/types.ts:167](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L167)

##### nextMode?

> `optional` **nextMode?**: `boolean`

Defined in: [core/src/types.ts:172](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L172)

##### runtime?

> `optional` **runtime?**: `boolean`

Defined in: [core/src/types.ts:171](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L171)

##### testing?

> `optional` **testing?**: `boolean`

Defined in: [core/src/types.ts:168](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L168)

##### tools?

> `optional` **tools?**: `boolean`

Defined in: [core/src/types.ts:170](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L170)

##### typescript?

> `optional` **typescript?**: `boolean`

Defined in: [core/src/types.ts:165](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L165)

***

### EslintConfigOptions

Defined in: [core/src/types.ts:231](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L231)

ESLint configuration interface

#### Properties

##### autoFrameworks?

> `optional` **autoFrameworks?**: `boolean`

Defined in: [core/src/types.ts:264](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L264)

Enables bundled framework configs detected from dependencies.
Disable this when you want manual framework control only.

##### detectedFrameworks?

> `optional` **detectedFrameworks?**: [`DetectedFrameworkName`](#detectedframeworkname) `[]`

Defined in: [core/src/types.ts:336](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L336)

Frameworks detected from package.json by `detectProjectOptions()`.
In v2, `eslintConfig()` enables these bundled framework configs by default.

##### detection?

> `optional` **detection?**: `boolean` \| [`DetectionOptions`](#detectionoptions)

Defined in: [core/src/types.ts:270](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L270)

Enables or disables automatic project detection by category.
Use `false` to disable all detection, or an object for granular control.

##### detectRootDir?

> `optional` **detectRootDir?**: `string`

Defined in: [core/src/types.ts:237](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L237)

Root directory used for automatic project detection.
Defaults to `process.cwd()`.

##### extensions?

> `optional` **extensions?**: [`Extension`](#extension) `[]`

Defined in: [core/src/types.ts:288](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L288)

List of specialized ESLint rules and extensions

##### formats?

> `optional` **formats?**: [`Format`](#format) `[]`

Defined in: [core/src/types.ts:282](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L282)

Additional non-JS/TS file formats to lint

##### frameworks?

> `optional` **frameworks?**: `object`

Defined in: [core/src/types.ts:317](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L317)

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

###### solid?

> `optional` **solid?**: [`ImportedFramework`](#importedframework)

###### svelte?

> `optional` **svelte?**: [`ImportedFramework`](#importedframework)

###### vue?

> `optional` **vue?**: [`ImportedFramework`](#importedframework)

##### ignores?

> `optional` **ignores?**: `string`[]

Defined in: [core/src/types.ts:251](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L251)

Extra global ignore globs (flat config `ignores` only, no `files`).
Patterns are relative to ESLint's working directory, like a manual ignore block.
Not merged from presets or detection. For `projects` entries, patterns are not
auto-prefixed with the subproject path; use repo-root-relative globs when needed.

##### libraries?

> `optional` **libraries?**: [`Library`](#library) `[]`

Defined in: [core/src/types.ts:276](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L276)

List of application-level dependencies configurations

##### nextMode?

> `optional` **nextMode?**: [`NextMode`](#nextmode)

Defined in: [core/src/types.ts:308](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L308)

Next.js specific routing mode

##### optionMergeStrategy?

> `optional` **optionMergeStrategy?**: `"replace"` \| `"merge"`

Defined in: [core/src/types.ts:258](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L258)

Controls how explicit arrays/frameworks combine with auto-detected and preset values.
- `merge` (default): union detected + preset + explicit values
- `replace`: explicit values fully replace detected/preset values

##### preset?

> `optional` **preset?**: [`Preset`](#preset)

Defined in: [core/src/types.ts:305](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L305)

High-level configuration preset

##### projects?

> `optional` **projects?**: `Record`\<`string`, `Omit`\<[`EslintConfigOptions`](#eslintconfigoptions), `"projects"`\>\>

Defined in: [core/src/types.ts:342](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L342)

Package-aware subproject configuration for monorepos.
Each key is a workspace-relative folder and each value is scoped to that folder.

##### runtime?

> `optional` **runtime?**: [`Runtime`](#runtime)

Defined in: [core/src/types.ts:302](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L302)

Runtime environment preset (Node, Browser, Universal)

##### settings?

> `optional` **settings?**: [`Setting`](#setting) `[]`

Defined in: [core/src/types.ts:291](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L291)

List of global settings and behavioral flags

##### strict?

> `optional` **strict?**: [`StrictMode`](#strictmode)

Defined in: [core/src/types.ts:299](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L299)

Severity profile.
- `false` / `recommended`: keep recommended severities
- `true` / `ci`: promote warnings to errors
- `pedantic`: promote warnings and enable built-in best-practice rules

##### testing?

> `optional` **testing?**: [`Testing`](#testing) `[]`

Defined in: [core/src/types.ts:279](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L279)

List of testing frameworks and testing environments

##### tools?

> `optional` **tools?**: [`Tool`](#tool) `[]`

Defined in: [core/src/types.ts:285](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L285)

List of integrations for external standalone tools

##### tsconfigRootDir?

> `optional` **tsconfigRootDir?**: `string`

Defined in: [core/src/types.ts:243](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L243)

Root directory of the project.
Required if multiple candidate TSConfigRootDirs are present.

##### typescript?

> `optional` **typescript?**: `boolean` \| [`TsOptions`](#tsoptions)

Defined in: [core/src/types.ts:273](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L273)

Enable TypeScript support with optional settings

***

### TsOptions

Defined in: [core/src/types.ts:224](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L224)

TypeScript configuration options

#### Properties

##### project?

> `optional` **project?**: `string` \| `boolean` \| `string`[]

Defined in: [core/src/types.ts:225](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L225)

## Type Aliases

### DetectedFrameworkName

> **DetectedFrameworkName** = `"react"` \| `"next"` \| `"astro"` \| `"expo"` \| `"vue"` \| `"svelte"` \| `"solid"` \| `"angular"` \| `"nest"` \| `"hono"` \| `"qwik"` \| `"remix"`

Defined in: [core/src/types.ts:207](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L207)

Framework names that can be auto-detected by `detectProjectOptions`.
These are informational only — you still need to import and pass the actual
framework config via `frameworks.<name>` in `eslintConfig()`.

***

### FlatConfigArray

> **FlatConfigArray** = `TSESLint.FlatConfig.ConfigArray`

Defined in: [core/src/types.ts:348](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L348)

Type alias for ESLint flat config array

***

### ImportedFramework

> **ImportedFramework** = [`FlatConfigArray`](#flatconfigarray) \| \{ `default`: [`FlatConfigArray`](#flatconfigarray) \| ((`options?`) => [`FlatConfigArray`](#flatconfigarray)); \} \| ((`options?`) => [`FlatConfigArray`](#flatconfigarray)) \| `true`

Defined in: [core/src/types.ts:196](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L196)

Type to handle both direct config arrays and imported modules with a default export.
User-facing framework options should always pass imported config arrays/modules explicitly
— boolean values are not accepted and will throw a descriptive error.

***

### StrictMode

> **StrictMode** = `boolean` \| `"recommended"` \| `"ci"` \| `"pedantic"`

Defined in: [core/src/types.ts:178](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L178)

Severity profiles for teams adopting the config progressively.

## Variables

### \_\_detectionInternals

> `const` **\_\_detectionInternals**: `object`

Defined in: [core/src/utils/detection.ts:262](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/utils/detection.ts#L262)

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

> **detectFormats**: (`allDeps`, `detectRootDir`) => [`Format`](#format) `[]`

###### Parameters

###### allDeps

`DependencyMap`

###### detectRootDir

`string`

###### Returns

[`Format`](#format) `[]`

##### detectFrameworks

> **detectFrameworks**: (`allDeps`, `setRuntime`) => [`DetectedFrameworkName`](#detectedframeworkname) `[]` \| `undefined`

###### Parameters

###### allDeps

`DependencyMap`

###### setRuntime

(`runtime`) => `void`

###### Returns

[`DetectedFrameworkName`](#detectedframeworkname) `[]` \| `undefined`

##### detectLibraries

> **detectLibraries**: (`allDeps`) => [`Library`](#library) `[]`

###### Parameters

###### allDeps

`DependencyMap`

###### Returns

[`Library`](#library) `[]`

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

> **detectTesting**: (`allDeps`) => [`Testing`](#testing) `[]`

###### Parameters

###### allDeps

`DependencyMap`

###### Returns

[`Testing`](#testing) `[]`

##### detectTools

> **detectTools**: (`allDeps`) => [`Tool`](#tool) `[]`

###### Parameters

###### allDeps

`DependencyMap`

###### Returns

[`Tool`](#tool) `[]`

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

Defined in: [core/src/index.ts:134](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/index.ts#L134)

Core JavaScript ESLint configuration (Universal runtime by default)
This is included by default in all configurations

***

### gitignore

> `const` **gitignore**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [core/src/settings/gitignore.ts:13](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/settings/gitignore.ts#L13)

***

### GLOB\_ASTRO

> `const` **GLOB\_ASTRO**: `string`[]

Defined in: [core/src/types.ts:13](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L13)

***

### GLOB\_JS

> `const` **GLOB\_JS**: `string`[]

Defined in: [core/src/types.ts:6](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L6)

Global file patterns for JavaScript-compatible files

***

### GLOB\_JS\_TS

> `const` **GLOB\_JS\_TS**: `string`[]

Defined in: [core/src/types.ts:10](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L10)

***

### GLOB\_JS\_TS\_ALL

> `const` **GLOB\_JS\_TS\_ALL**: `string`[]

Defined in: [core/src/types.ts:15](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L15)

***

### GLOB\_SLOT

> `const` **GLOB\_SLOT**: `string`[]

Defined in: [core/src/types.ts:14](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L14)

***

### GLOB\_SVELTE

> `const` **GLOB\_SVELTE**: `string`[]

Defined in: [core/src/types.ts:12](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L12)

***

### GLOB\_TS

> `const` **GLOB\_TS**: `string`[]

Defined in: [core/src/types.ts:8](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L8)

***

### GLOB\_VIRTUAL\_TS

> `const` **GLOB\_VIRTUAL\_TS**: `string`[]

Defined in: [core/src/types.ts:17](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L17)

***

### GLOB\_VUE

> `const` **GLOB\_VUE**: `string`[]

Defined in: [core/src/types.ts:11](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L11)

***

### groups

> `const` **groups**: `string`[][]

Defined in: [core/src/rules.ts:3](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/rules.ts#L3)

***

### ReactConfigKeys

> `const` **ReactConfigKeys**: readonly \[`"react"`, `"next"`, `"expo"`, `"remix"`\]

Defined in: [core/src/types.ts:184](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/types.ts#L184)

Array of configurations that require React
Note: These are now used internally for auto-detection and globals

***

### rules

> `const` **rules**: `TSESLint.Linter.RulesRecord`

Defined in: [core/src/rules.ts:35](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/rules.ts#L35)

## Functions

### createCoreConfig()

> **createCoreConfig**(`runtime?`): `ConfigArray`

Defined in: [core/src/index.ts:51](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/index.ts#L51)

Creates the core config with the specified runtime globals

#### Parameters

##### runtime?

[`Runtime`](#runtime) = `Runtime.Universal`

#### Returns

`ConfigArray`

***

### detectProjectOptions()

> **detectProjectOptions**(`detectRootDir?`): [`EslintConfigOptions`](#eslintconfigoptions)

Defined in: [core/src/utils/detection.ts:283](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/utils/detection.ts#L283)

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

Defined in: [core/src/index.ts:23](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/index.ts#L23)

Returns the appropriate globals for the given runtime option

#### Parameters

##### runtime?

[`Runtime`](#runtime) = `Runtime.Universal`

#### Returns

`GlobalsConfig` \| `undefined`

***

### hasReactConfig()

> **hasReactConfig**(`options?`): `boolean`

Defined in: [core/src/utils/index.ts:9](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/core/src/utils/index.ts#L9)

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
