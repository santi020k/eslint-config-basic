---
title: "core/src"
description: "@santi020k/eslint-config-basic"
---

## Enumerations

### Extension

Defined in: [core/src/types.ts:35](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L35)

Enum for specialized ESLint extensions and strict rule sets

#### Enumeration Members

##### A11y

> **A11y**: `"a11y"`

Defined in: [core/src/types.ts:40](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L40)

Accessibility (a11y) rules for JSX and Vue

##### BestPractices

> **BestPractices**: `"best-practices"`

Defined in: [core/src/types.ts:46](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L46)

Built-in best-practice rules: no-console, no-alert, cyclomatic complexity,
max nesting depth. No extra dependencies required.

##### Biome

> **Biome**: `"biome"`

Defined in: [core/src/types.ts:51](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L51)

Disables formatting rules that conflict with Biome

##### Boundaries

> **Boundaries**: `"boundaries"`

Defined in: [core/src/types.ts:56](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L56)

Import boundary rules for common app, workspace, and generated-code edges.

##### Compat

> **Compat**: `"compat"`

Defined in: [core/src/types.ts:61](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L61)

Browser compatibility checks against the project browserslist

##### DeMorgan

> **DeMorgan**: `"de-morgan"`

Defined in: [core/src/types.ts:66](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L66)

Simplifies negated logical expressions (De Morgan's laws)

##### Depend

> **Depend**: `"depend"`

Defined in: [core/src/types.ts:71](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L71)

Suggests lighter or native alternatives to heavy dependencies

##### Node

> **Node**: `"node"`

Defined in: [core/src/types.ts:76](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L76)

Node.js rules from eslint-plugin-n for server-side codebases

##### Oxlint

> **Oxlint**: `"oxlint"`

Defined in: [core/src/types.ts:81](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L81)

Disables rules already covered by Oxlint for hybrid linting setups

##### Perfectionist

> **Perfectionist**: `"perfectionist"`

Defined in: [core/src/types.ts:82](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L82)

##### Regexp

> **Regexp**: `"regexp"`

Defined in: [core/src/types.ts:83](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L83)

##### Security

> **Security**: `"security"`

Defined in: [core/src/types.ts:84](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L84)

##### Sonarjs

> **Sonarjs**: `"sonarjs"`

Defined in: [core/src/types.ts:85](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L85)

##### Unicorn

> **Unicorn**: `"unicorn"`

Defined in: [core/src/types.ts:87](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L87)

***

### Format

Defined in: [core/src/types.ts:93](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L93)

Enum for linting non-JS/TS file formats

#### Enumeration Members

##### Css

> **Css**: `"css"`

Defined in: [core/src/types.ts:94](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L94)

##### Graphql

> **Graphql**: `"graphql"`

Defined in: [core/src/types.ts:95](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L95)

##### Html

> **Html**: `"html"`

Defined in: [core/src/types.ts:96](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L96)

##### Jsonc

> **Jsonc**: `"jsonc"`

Defined in: [core/src/types.ts:97](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L97)

##### Markdown

> **Markdown**: `"markdown"`

Defined in: [core/src/types.ts:98](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L98)

##### Mdx

> **Mdx**: `"mdx"`

Defined in: [core/src/types.ts:99](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L99)

##### PackageJson

> **PackageJson**: `"package-json"`

Defined in: [core/src/types.ts:100](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L100)

##### Toml

> **Toml**: `"toml"`

Defined in: [core/src/types.ts:101](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L101)

##### Yaml

> **Yaml**: `"yaml"`

Defined in: [core/src/types.ts:102](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L102)

***

### Library

Defined in: [core/src/types.ts:108](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L108)

Enum for application-level runtime dependencies and styling

#### Enumeration Members

##### AiSdk

> **AiSdk**: `"ai-sdk"`

Defined in: [core/src/types.ts:109](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L109)

##### Autogen

> **Autogen**: `"autogen"`

Defined in: [core/src/types.ts:110](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L110)

##### Drizzle

> **Drizzle**: `"drizzle"`

Defined in: [core/src/types.ts:111](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L111)

##### GoogleGenAi

> **GoogleGenAi**: `"google-genai"`

Defined in: [core/src/types.ts:112](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L112)

##### I18next

> **I18next**: `"i18next"`

Defined in: [core/src/types.ts:113](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L113)

##### Langchain

> **Langchain**: `"langchain"`

Defined in: [core/src/types.ts:114](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L114)

##### LlamaIndex

> **LlamaIndex**: `"llamaindex"`

Defined in: [core/src/types.ts:115](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L115)

##### Mastra

> **Mastra**: `"mastra"`

Defined in: [core/src/types.ts:116](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L116)

##### Mcp

> **Mcp**: `"mcp"`

Defined in: [core/src/types.ts:117](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L117)

##### MikroOrm

> **MikroOrm**: `"mikro-orm"`

Defined in: [core/src/types.ts:118](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L118)

##### OpenAiAgents

> **OpenAiAgents**: `"openai-agents"`

Defined in: [core/src/types.ts:119](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L119)

##### Prisma

> **Prisma**: `"prisma"`

Defined in: [core/src/types.ts:120](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L120)

##### Sequelize

> **Sequelize**: `"sequelize"`

Defined in: [core/src/types.ts:121](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L121)

##### Stencil

> **Stencil**: `"stencil"`

Defined in: [core/src/types.ts:122](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L122)

##### Storybook

> **Storybook**: `"storybook"`

Defined in: [core/src/types.ts:123](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L123)

##### Tailwind

> **Tailwind**: `"tailwind"`

Defined in: [core/src/types.ts:124](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L124)

##### TanstackQuery

> **TanstackQuery**: `"tanstack-query"`

Defined in: [core/src/types.ts:125](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L125)

##### TanstackRouter

> **TanstackRouter**: `"tanstack-router"`

Defined in: [core/src/types.ts:126](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L126)

##### Turbo

> **Turbo**: `"turbo"`

Defined in: [core/src/types.ts:127](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L127)

##### Typeorm

> **Typeorm**: `"typeorm"`

Defined in: [core/src/types.ts:128](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L128)

##### Zod

> **Zod**: `"zod"`

Defined in: [core/src/types.ts:129](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L129)

***

### NextMode

Defined in: [core/src/types.ts:135](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L135)

Enum for Next.js mode options

#### Enumeration Members

##### AppRouter

> **AppRouter**: `"app-router"`

Defined in: [core/src/types.ts:136](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L136)

##### Pages

> **Pages**: `"pages"`

Defined in: [core/src/types.ts:137](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L137)

***

### Preset

Defined in: [core/src/types.ts:143](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L143)

Enum for named presets

#### Enumeration Members

##### All

> **All**: `"all"`

Defined in: [core/src/types.ts:146](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L146)

All configs + all optionals

##### App

> **App**: `"app"`

Defined in: [core/src/types.ts:149](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L149)

Browser application defaults with TypeScript and Prettier

##### Basic

> **Basic**: `"basic"`

Defined in: [core/src/types.ts:152](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L152)

Core JS config only

##### Browser

> **Browser**: `"browser"`

Defined in: [core/src/types.ts:155](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L155)

Core + TS + Browser runtime

##### CI

> **CI**: `"ci"`

Defined in: [core/src/types.ts:158](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L158)

CI-oriented defaults with strict severities

##### Library

> **Library**: `"library"`

Defined in: [core/src/types.ts:161](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L161)

TypeScript package/library defaults for published packages

##### Monorepo

> **Monorepo**: `"monorepo"`

Defined in: [core/src/types.ts:164](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L164)

Monorepo-friendly defaults for mixed workspaces

##### Node

> **Node**: `"node"`

Defined in: [core/src/types.ts:167](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L167)

Core + TS + Node runtime

##### Worker

> **Worker**: `"worker"`

Defined in: [core/src/types.ts:170](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L170)

Core + TS + Worker runtime

***

### Runtime

Defined in: [core/src/types.ts:176](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L176)

Enum for runtime environment presets

#### Enumeration Members

##### Browser

> **Browser**: `"browser"`

Defined in: [core/src/types.ts:179](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L179)

Only Browser globals (window, document, etc.)

##### Bun

> **Bun**: `"bun"`

Defined in: [core/src/types.ts:182](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L182)

Bun runtime globals

##### Cloudflare

> **Cloudflare**: `"cloudflare"`

Defined in: [core/src/types.ts:185](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L185)

Cloudflare Workers globals

##### Deno

> **Deno**: `"deno"`

Defined in: [core/src/types.ts:188](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L188)

Deno runtime globals

##### Node

> **Node**: `"node"`

Defined in: [core/src/types.ts:191](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L191)

Only Node.js globals (process, __dirname, etc.)

##### Universal

> **Universal**: `"universal"`

Defined in: [core/src/types.ts:194](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L194)

Both Node.js and Browser globals (default)

##### Worker

> **Worker**: `"worker"`

Defined in: [core/src/types.ts:197](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L197)

Service Worker and Fetch API globals for edge runtimes

***

### Setting

Defined in: [core/src/types.ts:203](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L203)

Enum for settings options in ESLint

#### Enumeration Members

##### DefaultIgnores

> **DefaultIgnores**: `"default-ignores"`

Defined in: [core/src/types.ts:206](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L206)

Default behavior — accepted for symmetry with `NoDefaultIgnores`; passing it changes nothing.

##### GeneratedCodeIgnores

> **GeneratedCodeIgnores**: `"generated-code-ignores"`

Defined in: [core/src/types.ts:209](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L209)

Default behavior — accepted for symmetry with `NoGeneratedCodeIgnores`; passing it changes nothing.

##### Gitignore

> **Gitignore**: `"gitignore"`

Defined in: [core/src/types.ts:212](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L212)

Default behavior — accepted for symmetry with `NoGitignore`; passing it changes nothing.

##### NoDefaultIgnores

> **NoDefaultIgnores**: `"no-default-ignores"`

Defined in: [core/src/types.ts:215](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L215)

Disable the built-in default ignore globs (dist, build, coverage, etc.).

##### NoGeneratedCodeIgnores

> **NoGeneratedCodeIgnores**: `"no-generated-code-ignores"`

Defined in: [core/src/types.ts:218](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L218)

Disable generated-code ignore globs.

##### NoGitignore

> **NoGitignore**: `"no-gitignore"`

Defined in: [core/src/types.ts:221](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L221)

Disable automatic `.gitignore`-based ignores.

***

### Testing

Defined in: [core/src/types.ts:227](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L227)

Enum for testing frameworks and environments

#### Enumeration Members

##### Cypress

> **Cypress**: `"cypress"`

Defined in: [core/src/types.ts:228](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L228)

##### Jest

> **Jest**: `"jest"`

Defined in: [core/src/types.ts:229](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L229)

##### JestDom

> **JestDom**: `"jest-dom"`

Defined in: [core/src/types.ts:230](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L230)

##### Playwright

> **Playwright**: `"playwright"`

Defined in: [core/src/types.ts:231](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L231)

##### TestingLibrary

> **TestingLibrary**: `"testing-library"`

Defined in: [core/src/types.ts:232](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L232)

##### Vitest

> **Vitest**: `"vitest"`

Defined in: [core/src/types.ts:233](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L233)

***

### Tool

Defined in: [core/src/types.ts:239](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L239)

Enum for integrating external standalone utilities

#### Enumeration Members

##### Command

> **Command**: `"command"`

Defined in: [core/src/types.ts:240](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L240)

##### Cspell

> **Cspell**: `"cspell"`

Defined in: [core/src/types.ts:241](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L241)

##### Docker

> **Docker**: `"docker"`

Defined in: [core/src/types.ts:242](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L242)

##### GithubActions

> **GithubActions**: `"github-actions"`

Defined in: [core/src/types.ts:243](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L243)

##### Jsdoc

> **Jsdoc**: `"jsdoc"`

Defined in: [core/src/types.ts:244](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L244)

##### Nx

> **Nx**: `"nx"`

Defined in: [core/src/types.ts:245](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L245)

##### Pnpm

> **Pnpm**: `"pnpm"`

Defined in: [core/src/types.ts:246](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L246)

##### Prettier

> **Prettier**: `"prettier"`

Defined in: [core/src/types.ts:247](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L247)

##### Swagger

> **Swagger**: `"swagger"`

Defined in: [core/src/types.ts:248](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L248)

## Interfaces

### DetectionOptions

Defined in: [core/src/types.ts:254](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L254)

Controls automatic project detection by category.

#### Properties

##### extensions?

> `optional` **extensions?**: `boolean`

Defined in: [core/src/types.ts:255](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L255)

##### formats?

> `optional` **formats?**: `boolean`

Defined in: [core/src/types.ts:256](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L256)

##### frameworks?

> `optional` **frameworks?**: `boolean`

Defined in: [core/src/types.ts:257](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L257)

##### libraries?

> `optional` **libraries?**: `boolean`

Defined in: [core/src/types.ts:258](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L258)

##### nextMode?

> `optional` **nextMode?**: `boolean`

Defined in: [core/src/types.ts:259](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L259)

##### projects?

> `optional` **projects?**: `boolean`

Defined in: [core/src/types.ts:260](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L260)

##### runtime?

> `optional` **runtime?**: `boolean`

Defined in: [core/src/types.ts:261](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L261)

##### testing?

> `optional` **testing?**: `boolean`

Defined in: [core/src/types.ts:262](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L262)

##### tools?

> `optional` **tools?**: `boolean`

Defined in: [core/src/types.ts:263](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L263)

##### typescript?

> `optional` **typescript?**: `boolean`

Defined in: [core/src/types.ts:264](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L264)

***

### EslintConfigOptions

Defined in: [core/src/types.ts:356](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L356)

ESLint configuration interface

#### Properties

##### autoFrameworks?

> `optional` **autoFrameworks?**: `boolean`

Defined in: [core/src/types.ts:362](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L362)

Enables bundled framework configs detected from dependencies.
Disable this when you want manual framework control only.

##### detectedFrameworks?

> `optional` **detectedFrameworks?**: [`DetectedFrameworkName`](#detectedframeworkname)[]

Defined in: [core/src/types.ts:368](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L368)

Frameworks detected from package.json by `detectProjectOptions()`.
In v2, `eslintConfig()` enables these bundled framework configs by default.

##### detection?

> `optional` **detection?**: `boolean` \| [`DetectionOptions`](#detectionoptions)

Defined in: [core/src/types.ts:374](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L374)

Enables or disables automatic project detection by category.
Use `false` to disable all detection, or an object for granular control.

##### detectRootDir?

> `optional` **detectRootDir?**: `string`

Defined in: [core/src/types.ts:380](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L380)

Root directory used for automatic project detection.
Defaults to `process.cwd()`.

##### extensions?

> `optional` **extensions?**: [`ExtensionOption`](#extensionoption)[]

Defined in: [core/src/types.ts:383](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L383)

List of specialized ESLint rules and extensions

##### features?

> `optional` **features?**: `Partial`\<`Record`\<[`OptionalConfigName`](#optionalconfigname), `boolean`\>\>

Defined in: [core/src/types.ts:390](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L390)

Simple optional-config switchboard. Enables or disables entries from
`extensions`, `formats`, `libraries`, `testing`, and `tools` using their
string names. `integrations` is an alias for the same map.

##### formats?

> `optional` **formats?**: [`FormatOption`](#formatoption)[]

Defined in: [core/src/types.ts:393](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L393)

Additional non-JS/TS file formats to lint

##### frameworks?

> `optional` **frameworks?**: `object`

Defined in: [core/src/types.ts:402](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L402)

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

###### lit?

> `optional` **lit?**: [`ImportedFramework`](#importedframework)

###### nest?

> `optional` **nest?**: [`ImportedFramework`](#importedframework)

###### next?

> `optional` **next?**: [`ImportedFramework`](#importedframework)

###### nuxt?

> `optional` **nuxt?**: [`ImportedFramework`](#importedframework)

###### preact?

> `optional` **preact?**: [`ImportedFramework`](#importedframework)

###### qwik?

> `optional` **qwik?**: [`ImportedFramework`](#importedframework)

###### react?

> `optional` **react?**: [`ImportedFramework`](#importedframework)

###### react-router?

> `optional` **react-router?**: [`ImportedFramework`](#importedframework)

New name for Remix projects on React Router v7+.

###### ~~remix?~~

> `optional` **remix?**: [`ImportedFramework`](#importedframework)

###### Deprecated

Remix merged into React Router v7 — use `react-router` instead.

###### slidev?

> `optional` **slidev?**: [`ImportedFramework`](#importedframework)

###### solid?

> `optional` **solid?**: [`ImportedFramework`](#importedframework)

###### svelte?

> `optional` **svelte?**: [`ImportedFramework`](#importedframework)

###### tanstack-start?

> `optional` **tanstack-start?**: [`ImportedFramework`](#importedframework)

TanStack Start (React/Solid full-stack framework).

###### vite?

> `optional` **vite?**: [`ImportedFramework`](#importedframework)

###### vue?

> `optional` **vue?**: [`ImportedFramework`](#importedframework)

##### ignores?

> `optional` **ignores?**: `string`[]

Defined in: [core/src/types.ts:436](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L436)

Extra global ignore globs (flat config `ignores` only, no `files`).
Patterns are relative to ESLint's working directory, like a manual ignore block.
Not merged from presets or detection. For `projects` entries, patterns are not
auto-prefixed with the subproject path; use repo-root-relative globs when needed.

##### integrations?

> `optional` **integrations?**: `Partial`\<`Record`\<[`OptionalConfigName`](#optionalconfigname), `boolean`\>\>

Defined in: [core/src/types.ts:439](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L439)

List of application-level dependencies configurations

##### libraries?

> `optional` **libraries?**: [`LibraryOption`](#libraryoption)[]

Defined in: [core/src/types.ts:441](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L441)

##### nextMode?

> `optional` **nextMode?**: [`NextModeOption`](#nextmodeoption)

Defined in: [core/src/types.ts:444](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L444)

Next.js specific routing mode

##### optionMergeStrategy?

> `optional` **optionMergeStrategy?**: `"replace"` \| `"merge"`

Defined in: [core/src/types.ts:451](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L451)

Controls how explicit arrays/frameworks combine with auto-detected and preset values.
- `merge` (default): union detected + preset + explicit values
- `replace`: explicit values fully replace detected/preset values

##### preset?

> `optional` **preset?**: [`PresetOption`](#presetoption)

Defined in: [core/src/types.ts:454](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L454)

High-level configuration preset

##### projects?

> `optional` **projects?**: `Record`\<`string`, `Omit`\<[`EslintConfigOptions`](#eslintconfigoptions), `"projects"`\>\>

Defined in: [core/src/types.ts:460](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L460)

Package-aware subproject configuration for monorepos.
Each key is a workspace-relative folder and each value is scoped to that folder.

##### runtime?

> `optional` **runtime?**: [`RuntimeOption`](#runtimeoption)

Defined in: [core/src/types.ts:463](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L463)

Runtime environment preset (Node, Browser, Universal)

##### settings?

> `optional` **settings?**: [`SettingOption`](#settingoption)[]

Defined in: [core/src/types.ts:466](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L466)

List of global settings and behavioral flags

##### strict?

> `optional` **strict?**: [`StrictMode`](#strictmode)

Defined in: [core/src/types.ts:474](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L474)

Severity profile.
- `false` / `recommended`: keep recommended severities
- `true` / `ci`: promote warnings to errors
- `pedantic`: promote warnings and enable built-in best-practice rules

##### testing?

> `optional` **testing?**: [`TestingOption`](#testingoption)[]

Defined in: [core/src/types.ts:477](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L477)

List of testing frameworks and testing environments

##### tools?

> `optional` **tools?**: [`ToolOption`](#tooloption)[]

Defined in: [core/src/types.ts:480](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L480)

List of integrations for external standalone tools

##### tsconfigRootDir?

> `optional` **tsconfigRootDir?**: `string`

Defined in: [core/src/types.ts:486](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L486)

Root directory of the project.
Required if multiple candidate TSConfigRootDirs are present.

##### typescript?

> `optional` **typescript?**: `boolean` \| [`TypeScriptMode`](#typescriptmode) \| [`TypeScriptOptions`](#typescriptoptions)

Defined in: [core/src/types.ts:489](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L489)

Enable TypeScript support with optional settings

##### workspacePrefixes?

> `optional` **workspacePrefixes?**: `string`[]

Defined in: [core/src/types.ts:502](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L502)

Monorepo / workspace package scope prefixes that should sort in their own
import group, **before** external npm packages.

Passed to `createImportGroups` and applied to `simple-import-sort/imports`
automatically — no manual rule override needed.

###### Example

```ts
// Imports from @acme/* sort between internal app code and external npm packages
defineConfig({ workspacePrefixes: ['@acme'] })
```

***

### ImportGroupOptions

Defined in: [core/src/rules.ts:35](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/rules.ts#L35)

Options for [createImportGroups](#createimportgroups).

#### Properties

##### workspacePrefixes?

> `optional` **workspacePrefixes?**: `string`[]

Defined in: [core/src/rules.ts:46](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/rules.ts#L46)

Workspace / monorepo package prefixes that should sort with internal code
rather than external npm packages.

They are placed in their own group **before** the external npm packages group.

###### Example

```ts
// Treat @acme/ui, @acme/shared, etc. as internal
createImportGroups({ workspacePrefixes: ['@acme'] })
```

***

### TypeScriptOptions

Defined in: [core/src/types.ts:308](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L308)

#### Properties

##### mode?

> `optional` **mode?**: [`TypeScriptMode`](#typescriptmode)

Defined in: [core/src/types.ts:309](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L309)

##### projectService?

> `optional` **projectService?**: `boolean`

Defined in: [core/src/types.ts:310](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L310)

##### tsconfigRootDir?

> `optional` **tsconfigRootDir?**: `string`

Defined in: [core/src/types.ts:311](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L311)

## Type Aliases

### DetectedFrameworkName

> **DetectedFrameworkName** = `"angular"` \| `"astro"` \| `"expo"` \| `"hono"` \| `"lit"` \| `"nest"` \| `"next"` \| `"nuxt"` \| `"preact"` \| `"qwik"` \| `"react"` \| `"react-router"` \| `"remix"` \| `"slidev"` \| `"solid"` \| `"svelte"` \| `"tanstack-start"` \| `"vite"` \| `"vue"`

Defined in: [core/src/types.ts:332](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L332)

Framework names that can be auto-detected by `detectProjectOptions`.
These are informational only — you still need to import and pass the actual
framework config via `frameworks.<name>` in `eslintConfig()`.

***

### ExtensionName

> **ExtensionName** = `` `${Extension}` ``

Defined in: [core/src/types.ts:266](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L266)

***

### ExtensionOption

> **ExtensionOption** = [`Extension`](#extension) \| [`ExtensionName`](#extensionname)

Defined in: [core/src/types.ts:267](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L267)

***

### FlatConfigArray

> **FlatConfigArray** = `TSESLint.FlatConfig.ConfigArray`

Defined in: [core/src/types.ts:508](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L508)

Type alias for ESLint flat config array

***

### FormatName

> **FormatName** = `` `${Format}` ``

Defined in: [core/src/types.ts:268](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L268)

***

### FormatOption

> **FormatOption** = [`Format`](#format) \| [`FormatName`](#formatname)

Defined in: [core/src/types.ts:269](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L269)

***

### ImportedFramework

> **ImportedFramework** = ((`options?`) => [`FlatConfigArray`](#flatconfigarray) \| `Promise`\<[`FlatConfigArray`](#flatconfigarray)\>) \| [`FlatConfigArray`](#flatconfigarray) \| `true` \| \{ `default`: ((`options?`) => [`FlatConfigArray`](#flatconfigarray) \| `Promise`\<[`FlatConfigArray`](#flatconfigarray)\>) \| [`FlatConfigArray`](#flatconfigarray); \}

Defined in: [core/src/types.ts:517](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L517)

Type for framework option values: `true` enables the bundled v2 config,
or pass a config array, a factory function (sync or async, like the lazy
framework factories exported from `@santi020k/eslint-config-basic`), or an
imported module with a default export. Any other value throws a descriptive
`TypeError` (see `resolveFramework` in `@santi020k/eslint-config-basic`).

***

### LibraryName

> **LibraryName** = `` `${Library}` ``

Defined in: [core/src/types.ts:270](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L270)

***

### LibraryOption

> **LibraryOption** = [`Library`](#library) \| [`LibraryName`](#libraryname)

Defined in: [core/src/types.ts:271](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L271)

***

### NextModeName

> **NextModeName** = `` `${NextMode}` ``

Defined in: [core/src/types.ts:272](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L272)

***

### NextModeOption

> **NextModeOption** = [`NextMode`](#nextmode) \| [`NextModeName`](#nextmodename)

Defined in: [core/src/types.ts:273](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L273)

***

### OptionalConfigMap

> **OptionalConfigMap** = `Partial`\<`Record`\<[`OptionalConfigName`](#optionalconfigname), `boolean`\>\>

Defined in: [core/src/types.ts:280](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L280)

Simple opt-in/opt-out map for optional configs. Keys match the public enum
string values, so both `features: { zod: true }` and `libraries: [Library.Zod]`
resolve to the same underlying config.

***

### OptionalConfigName

> **OptionalConfigName** = [`ExtensionName`](#extensionname) \| [`FormatName`](#formatname) \| [`LibraryName`](#libraryname) \| [`TestingName`](#testingname) \| [`ToolName`](#toolname)

Defined in: [core/src/types.ts:281](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L281)

***

### PresetName

> **PresetName** = `` `${Preset}` ``

Defined in: [core/src/types.ts:287](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L287)

***

### PresetOption

> **PresetOption** = [`Preset`](#preset) \| [`PresetName`](#presetname)

Defined in: [core/src/types.ts:288](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L288)

***

### RuntimeName

> **RuntimeName** = `` `${Runtime}` ``

Defined in: [core/src/types.ts:289](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L289)

***

### RuntimeOption

> **RuntimeOption** = [`Runtime`](#runtime) \| [`RuntimeName`](#runtimename)

Defined in: [core/src/types.ts:290](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L290)

***

### SettingName

> **SettingName** = `` `${Setting}` ``

Defined in: [core/src/types.ts:291](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L291)

***

### SettingOption

> **SettingOption** = [`Setting`](#setting) \| [`SettingName`](#settingname)

Defined in: [core/src/types.ts:292](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L292)

***

### StrictMode

> **StrictMode** = `"ci"` \| `"pedantic"` \| `"recommended"` \| `boolean`

Defined in: [core/src/types.ts:296](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L296)

Severity profiles for teams adopting the config progressively.

***

### TestingName

> **TestingName** = `` `${Testing}` ``

Defined in: [core/src/types.ts:298](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L298)

***

### TestingOption

> **TestingOption** = [`Testing`](#testing) \| [`TestingName`](#testingname)

Defined in: [core/src/types.ts:300](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L300)

***

### ToolName

> **ToolName** = `` `${Tool}` ``

Defined in: [core/src/types.ts:302](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L302)

***

### ToolOption

> **ToolOption** = [`Tool`](#tool) \| [`ToolName`](#toolname)

Defined in: [core/src/types.ts:304](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L304)

***

### TypeScriptMode

> **TypeScriptMode** = `"off"` \| `"strict"` \| `"syntax"` \| `"type-aware"`

Defined in: [core/src/types.ts:306](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L306)

## Variables

### \_\_detectionInternals

> `const` **\_\_detectionInternals**: `object`

Defined in: [core/src/utils/detection.ts:593](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/utils/detection.ts#L593)

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

> **detectFrameworks**: (`allDeps`, `detectRootDir`, `setRuntime`) => [`DetectedFrameworkName`](#detectedframeworkname)[] \| `undefined`

###### Parameters

###### allDeps

`DependencyMap`

###### detectRootDir

`string`

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

##### detectProjects

> **detectProjects**: (`pkg`, `detectRootDir`) => `NonNullable`\<[`EslintConfigOptions`](#eslintconfigoptions)\[`"projects"`\]\>

###### Parameters

###### pkg

`PackageJson`

###### detectRootDir

`string`

###### Returns

`NonNullable`\<[`EslintConfigOptions`](#eslintconfigoptions)\[`"projects"`\]\>

##### detectRuntime

> **detectRuntime**: (`allDeps`, `detectRootDir`, `detectedFrameworks`, `setRuntime`) => `void`

###### Parameters

###### allDeps

`DependencyMap`

###### detectRootDir

`string`

###### detectedFrameworks

[`DetectedFrameworkName`](#detectedframeworkname)[] \| `undefined`

###### setRuntime

(`runtime`) => `void`

###### Returns

`void`

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

Defined in: [core/src/index.ts:157](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/index.ts#L157)

Core JavaScript ESLint configuration (Universal runtime by default)
This is included by default in all configurations

***

### gitignore

> `const` **gitignore**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [core/src/settings/gitignore.ts:13](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/settings/gitignore.ts#L13)

***

### GLOB\_ASTRO

> `const` **GLOB\_ASTRO**: `string`[]

Defined in: [core/src/types.ts:13](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L13)

***

### GLOB\_JS

> `const` **GLOB\_JS**: `string`[]

Defined in: [core/src/types.ts:6](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L6)

Global file patterns for JavaScript-compatible files

***

### GLOB\_JS\_TS

> `const` **GLOB\_JS\_TS**: `string`[]

Defined in: [core/src/types.ts:10](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L10)

***

### GLOB\_JS\_TS\_ALL

> `const` **GLOB\_JS\_TS\_ALL**: `string`[]

Defined in: [core/src/types.ts:15](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L15)

***

### GLOB\_SLOT

> `const` **GLOB\_SLOT**: `string`[]

Defined in: [core/src/types.ts:14](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L14)

***

### GLOB\_SVELTE

> `const` **GLOB\_SVELTE**: `string`[]

Defined in: [core/src/types.ts:12](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L12)

***

### GLOB\_TS

> `const` **GLOB\_TS**: `string`[]

Defined in: [core/src/types.ts:8](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L8)

***

### GLOB\_VIRTUAL\_TS

> `const` **GLOB\_VIRTUAL\_TS**: `string`[]

Defined in: [core/src/types.ts:17](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L17)

***

### GLOB\_VUE

> `const` **GLOB\_VUE**: `string`[]

Defined in: [core/src/types.ts:11](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L11)

***

### groups

> `const` **groups**: `string`[][]

Defined in: [core/src/rules.ts:144](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/rules.ts#L144)

Default import sort groups used by the core config.
Export allows downstream packages and end users to reference or extend them.

***

### ReactConfigKeys

> `const` **ReactConfigKeys**: readonly \[`"react"`, `"next"`, `"expo"`, `"react-router"`, `"remix"`, `"tanstack-start"`\]

Defined in: [core/src/types.ts:318](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/types.ts#L318)

Array of configurations that require React
Note: These are now used internally for auto-detection and globals

***

### rules

> `const` **rules**: `TSESLint.Linter.RulesRecord`

Defined in: [core/src/rules.ts:148](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/rules.ts#L148)

## Functions

### createCoreConfig()

> **createCoreConfig**(`runtime?`): `ConfigArray`

Defined in: [core/src/index.ts:74](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/index.ts#L74)

Creates the core config with the specified runtime globals

#### Parameters

##### runtime?

[`Runtime`](#runtime) = `Runtime.Universal`

#### Returns

`ConfigArray`

***

### createImportGroups()

> **createImportGroups**(`options?`): `string`[][]

Defined in: [core/src/rules.ts:70](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/rules.ts#L70)

Creates the `groups` array for `simple-import-sort/imports`.

Group ordering (each becomes its own import section):
 1. Side effects  — polyfills, `reflect-metadata`, `zone.js`
 2. Node built-ins — `node:fs` and legacy `fs`
 3. Framework virtual modules — Vite `virtual:`, Astro `astro:`, SvelteKit `$app/$env/$lib`, Nuxt `#imports`
 4. Internal UI / presentation layer — `components/`, `@/pages/`, etc.
 5. Internal application / logic layer — `store/`, `@/hooks/`, etc.
 6. Style imports — `.css`, `.scss`, `.sass`, `@/styles/theme.css`, `./Button.module.css`
 7. Workspace packages (when `workspacePrefixes` is set) — `@acme/shared`
 8. External npm packages — `react`, `@tanstack/query`
 9. Remaining internal aliases — `@/`, `~/`, `#`, custom extras
10. Parent-relative imports — `../`
11. Same-directory relative imports — `./`

**Why internal layers and styles come before externals:**
Bare internal paths like `components/Button` and bare CSS like `theme.css` match
`^@?\w`. Placing these groups first ensures correct classification before falling
through to the npm packages group.

#### Parameters

##### options?

[`ImportGroupOptions`](#importgroupoptions) = `{}`

#### Returns

`string`[][]

***

### detectProjectOptions()

> **detectProjectOptions**(`detectRootDir?`): [`EslintConfigOptions`](#eslintconfigoptions)

Defined in: [core/src/utils/detection.ts:616](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/utils/detection.ts#L616)

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

Defined in: [core/src/index.ts:24](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/index.ts#L24)

Returns the appropriate globals for the given runtime option

#### Parameters

##### runtime?

[`Runtime`](#runtime) = `Runtime.Universal`

#### Returns

`GlobalsConfig` \| `undefined`

***

### hasReactConfig()

> **hasReactConfig**(`options?`): `boolean`

Defined in: [core/src/utils/index.ts:9](https://github.com/santi020k/eslint-config-basic/blob/ccd35692460ff34a38f0b9e7f7fa9e7c8ece3d76/packages/core/src/utils/index.ts#L9)

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
