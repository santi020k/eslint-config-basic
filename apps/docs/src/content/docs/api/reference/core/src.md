---
title: "core/src"
description: "@santi020k/eslint-config-basic"
---

## Enumerations

### Extension

Defined in: [core/src/types.ts:36](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L36)

Enum for specialized ESLint extensions and strict rule sets

#### Enumeration Members

##### A11y

> **A11y**: `"a11y"`

Defined in: [core/src/types.ts:41](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L41)

Accessibility (a11y) rules for JSX and Vue

##### AstroDoctor

> **AstroDoctor**: `"astro-doctor"`

Defined in: [core/src/types.ts:46](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L46)

Astro Doctor performance, accessibility, security, and best-practice rules

##### BestPractices

> **BestPractices**: `"best-practices"`

Defined in: [core/src/types.ts:52](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L52)

Built-in best-practice rules: no-console, no-alert, cyclomatic complexity,
max nesting depth. No extra dependencies required.

##### Biome

> **Biome**: `"biome"`

Defined in: [core/src/types.ts:57](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L57)

Disables formatting rules that conflict with Biome

##### Boundaries

> **Boundaries**: `"boundaries"`

Defined in: [core/src/types.ts:62](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L62)

Import boundary rules for common app, workspace, and generated-code edges.

##### Compat

> **Compat**: `"compat"`

Defined in: [core/src/types.ts:67](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L67)

Browser compatibility checks against the project browserslist

##### DeMorgan

> **DeMorgan**: `"de-morgan"`

Defined in: [core/src/types.ts:72](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L72)

Simplifies negated logical expressions (De Morgan's laws)

##### Depend

> **Depend**: `"depend"`

Defined in: [core/src/types.ts:77](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L77)

Suggests lighter or native alternatives to heavy dependencies

##### Node

> **Node**: `"node"`

Defined in: [core/src/types.ts:82](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L82)

Node.js rules from eslint-plugin-n for server-side codebases

##### NoOnlyTests

> **NoOnlyTests**: `"no-only-tests"`

Defined in: [core/src/types.ts:87](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L87)

Prevents `test.only` / `describe.only` from being committed

##### Oxlint

> **Oxlint**: `"oxlint"`

Defined in: [core/src/types.ts:92](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L92)

Disables rules already covered by Oxlint for hybrid linting setups

##### Perfectionist

> **Perfectionist**: `"perfectionist"`

Defined in: [core/src/types.ts:93](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L93)

##### Regexp

> **Regexp**: `"regexp"`

Defined in: [core/src/types.ts:94](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L94)

##### Security

> **Security**: `"security"`

Defined in: [core/src/types.ts:95](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L95)

##### Sonarjs

> **Sonarjs**: `"sonarjs"`

Defined in: [core/src/types.ts:96](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L96)

##### Unicorn

> **Unicorn**: `"unicorn"`

Defined in: [core/src/types.ts:98](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L98)

***

### Format

Defined in: [core/src/types.ts:104](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L104)

Enum for linting non-JS/TS file formats

#### Enumeration Members

##### Css

> **Css**: `"css"`

Defined in: [core/src/types.ts:105](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L105)

##### Graphql

> **Graphql**: `"graphql"`

Defined in: [core/src/types.ts:106](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L106)

##### Html

> **Html**: `"html"`

Defined in: [core/src/types.ts:107](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L107)

##### Jsonc

> **Jsonc**: `"jsonc"`

Defined in: [core/src/types.ts:108](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L108)

##### Markdown

> **Markdown**: `"markdown"`

Defined in: [core/src/types.ts:109](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L109)

##### Mdx

> **Mdx**: `"mdx"`

Defined in: [core/src/types.ts:110](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L110)

##### PackageJson

> **PackageJson**: `"package-json"`

Defined in: [core/src/types.ts:111](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L111)

##### Toml

> **Toml**: `"toml"`

Defined in: [core/src/types.ts:112](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L112)

##### Yaml

> **Yaml**: `"yaml"`

Defined in: [core/src/types.ts:113](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L113)

***

### Library

Defined in: [core/src/types.ts:119](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L119)

Enum for application-level runtime dependencies and styling

#### Enumeration Members

##### AiSdk

> **AiSdk**: `"ai-sdk"`

Defined in: [core/src/types.ts:120](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L120)

##### Autogen

> **Autogen**: `"autogen"`

Defined in: [core/src/types.ts:121](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L121)

##### Drizzle

> **Drizzle**: `"drizzle"`

Defined in: [core/src/types.ts:122](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L122)

##### GoogleGenAi

> **GoogleGenAi**: `"google-genai"`

Defined in: [core/src/types.ts:123](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L123)

##### I18next

> **I18next**: `"i18next"`

Defined in: [core/src/types.ts:124](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L124)

##### Langchain

> **Langchain**: `"langchain"`

Defined in: [core/src/types.ts:125](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L125)

##### LlamaIndex

> **LlamaIndex**: `"llamaindex"`

Defined in: [core/src/types.ts:126](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L126)

##### Mastra

> **Mastra**: `"mastra"`

Defined in: [core/src/types.ts:127](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L127)

##### Mcp

> **Mcp**: `"mcp"`

Defined in: [core/src/types.ts:128](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L128)

##### MikroOrm

> **MikroOrm**: `"mikro-orm"`

Defined in: [core/src/types.ts:129](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L129)

##### OpenAiAgents

> **OpenAiAgents**: `"openai-agents"`

Defined in: [core/src/types.ts:130](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L130)

##### Prisma

> **Prisma**: `"prisma"`

Defined in: [core/src/types.ts:131](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L131)

##### Sequelize

> **Sequelize**: `"sequelize"`

Defined in: [core/src/types.ts:132](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L132)

##### Stencil

> **Stencil**: `"stencil"`

Defined in: [core/src/types.ts:133](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L133)

##### Storybook

> **Storybook**: `"storybook"`

Defined in: [core/src/types.ts:134](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L134)

##### Tailwind

> **Tailwind**: `"tailwind"`

Defined in: [core/src/types.ts:135](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L135)

##### TanstackQuery

> **TanstackQuery**: `"tanstack-query"`

Defined in: [core/src/types.ts:136](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L136)

##### TanstackRouter

> **TanstackRouter**: `"tanstack-router"`

Defined in: [core/src/types.ts:137](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L137)

##### Turbo

> **Turbo**: `"turbo"`

Defined in: [core/src/types.ts:138](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L138)

##### Typeorm

> **Typeorm**: `"typeorm"`

Defined in: [core/src/types.ts:139](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L139)

##### Zod

> **Zod**: `"zod"`

Defined in: [core/src/types.ts:140](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L140)

***

### NextMode

Defined in: [core/src/types.ts:146](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L146)

Enum for Next.js mode options

#### Enumeration Members

##### AppRouter

> **AppRouter**: `"app-router"`

Defined in: [core/src/types.ts:147](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L147)

##### Pages

> **Pages**: `"pages"`

Defined in: [core/src/types.ts:148](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L148)

***

### Preset

Defined in: [core/src/types.ts:154](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L154)

Enum for named presets

#### Enumeration Members

##### All

> **All**: `"all"`

Defined in: [core/src/types.ts:157](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L157)

All configs + all optionals

##### App

> **App**: `"app"`

Defined in: [core/src/types.ts:160](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L160)

Browser application defaults with TypeScript and Prettier

##### Basic

> **Basic**: `"basic"`

Defined in: [core/src/types.ts:163](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L163)

Core JS config only

##### Browser

> **Browser**: `"browser"`

Defined in: [core/src/types.ts:166](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L166)

Core + TS + Browser runtime

##### CI

> **CI**: `"ci"`

Defined in: [core/src/types.ts:169](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L169)

CI-oriented defaults with strict severities

##### Library

> **Library**: `"library"`

Defined in: [core/src/types.ts:172](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L172)

TypeScript package/library defaults for published packages

##### Monorepo

> **Monorepo**: `"monorepo"`

Defined in: [core/src/types.ts:175](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L175)

Monorepo-friendly defaults for mixed workspaces

##### Node

> **Node**: `"node"`

Defined in: [core/src/types.ts:178](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L178)

Core + TS + Node runtime

##### Worker

> **Worker**: `"worker"`

Defined in: [core/src/types.ts:181](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L181)

Core + TS + Worker runtime

***

### Runtime

Defined in: [core/src/types.ts:187](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L187)

Enum for runtime environment presets

#### Enumeration Members

##### Browser

> **Browser**: `"browser"`

Defined in: [core/src/types.ts:190](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L190)

Only Browser globals (window, document, etc.)

##### Bun

> **Bun**: `"bun"`

Defined in: [core/src/types.ts:193](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L193)

Bun runtime globals

##### Cloudflare

> **Cloudflare**: `"cloudflare"`

Defined in: [core/src/types.ts:196](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L196)

Cloudflare Workers globals

##### Deno

> **Deno**: `"deno"`

Defined in: [core/src/types.ts:199](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L199)

Deno runtime globals

##### Node

> **Node**: `"node"`

Defined in: [core/src/types.ts:202](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L202)

Only Node.js globals (process, __dirname, etc.)

##### Universal

> **Universal**: `"universal"`

Defined in: [core/src/types.ts:205](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L205)

Both Node.js and Browser globals (default)

##### Worker

> **Worker**: `"worker"`

Defined in: [core/src/types.ts:208](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L208)

Service Worker and Fetch API globals for edge runtimes

***

### Setting

Defined in: [core/src/types.ts:214](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L214)

Enum for settings options in ESLint

#### Enumeration Members

##### NoDefaultIgnores

> **NoDefaultIgnores**: `"no-default-ignores"`

Defined in: [core/src/types.ts:217](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L217)

Disable the built-in default ignore globs (dist, build, coverage, etc.).

##### NoGeneratedCodeIgnores

> **NoGeneratedCodeIgnores**: `"no-generated-code-ignores"`

Defined in: [core/src/types.ts:220](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L220)

Disable generated-code ignore globs.

##### NoGitignore

> **NoGitignore**: `"no-gitignore"`

Defined in: [core/src/types.ts:223](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L223)

Disable automatic `.gitignore`-based ignores.

***

### Testing

Defined in: [core/src/types.ts:229](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L229)

Enum for testing frameworks and environments

#### Enumeration Members

##### Cypress

> **Cypress**: `"cypress"`

Defined in: [core/src/types.ts:230](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L230)

##### Jest

> **Jest**: `"jest"`

Defined in: [core/src/types.ts:231](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L231)

##### JestDom

> **JestDom**: `"jest-dom"`

Defined in: [core/src/types.ts:232](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L232)

##### Playwright

> **Playwright**: `"playwright"`

Defined in: [core/src/types.ts:233](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L233)

##### TestingLibrary

> **TestingLibrary**: `"testing-library"`

Defined in: [core/src/types.ts:234](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L234)

##### Vitest

> **Vitest**: `"vitest"`

Defined in: [core/src/types.ts:235](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L235)

***

### Tool

Defined in: [core/src/types.ts:241](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L241)

Enum for integrating external standalone utilities

#### Enumeration Members

##### Command

> **Command**: `"command"`

Defined in: [core/src/types.ts:242](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L242)

##### Cspell

> **Cspell**: `"cspell"`

Defined in: [core/src/types.ts:243](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L243)

##### Docker

> **Docker**: `"docker"`

Defined in: [core/src/types.ts:244](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L244)

##### GithubActions

> **GithubActions**: `"github-actions"`

Defined in: [core/src/types.ts:245](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L245)

##### Jsdoc

> **Jsdoc**: `"jsdoc"`

Defined in: [core/src/types.ts:246](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L246)

##### Nx

> **Nx**: `"nx"`

Defined in: [core/src/types.ts:247](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L247)

##### Pnpm

> **Pnpm**: `"pnpm"`

Defined in: [core/src/types.ts:248](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L248)

##### Prettier

> **Prettier**: `"prettier"`

Defined in: [core/src/types.ts:249](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L249)

##### Swagger

> **Swagger**: `"swagger"`

Defined in: [core/src/types.ts:250](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L250)

## Interfaces

### DetectionOptions

Defined in: [core/src/types.ts:256](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L256)

Controls automatic project detection by category.

#### Properties

##### extensions?

> `optional` **extensions?**: `boolean`

Defined in: [core/src/types.ts:257](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L257)

##### formats?

> `optional` **formats?**: `boolean`

Defined in: [core/src/types.ts:258](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L258)

##### frameworks?

> `optional` **frameworks?**: `boolean`

Defined in: [core/src/types.ts:259](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L259)

##### libraries?

> `optional` **libraries?**: `boolean`

Defined in: [core/src/types.ts:260](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L260)

##### nextMode?

> `optional` **nextMode?**: `boolean`

Defined in: [core/src/types.ts:261](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L261)

##### projects?

> `optional` **projects?**: `boolean`

Defined in: [core/src/types.ts:262](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L262)

##### runtime?

> `optional` **runtime?**: `boolean`

Defined in: [core/src/types.ts:263](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L263)

##### testing?

> `optional` **testing?**: `boolean`

Defined in: [core/src/types.ts:264](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L264)

##### tools?

> `optional` **tools?**: `boolean`

Defined in: [core/src/types.ts:265](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L265)

##### typescript?

> `optional` **typescript?**: `boolean`

Defined in: [core/src/types.ts:266](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L266)

***

### EslintConfigOptions

Defined in: [core/src/types.ts:365](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L365)

ESLint configuration interface

#### Properties

##### autoFrameworks?

> `optional` **autoFrameworks?**: `boolean`

Defined in: [core/src/types.ts:371](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L371)

Enables bundled framework configs detected from dependencies.
Disable this when you want manual framework control only.

##### detectedFrameworks?

> `optional` **detectedFrameworks?**: [`DetectedFrameworkName`](#detectedframeworkname)[]

Defined in: [core/src/types.ts:377](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L377)

Frameworks detected from package.json by `detectProjectOptions()`.
In v2, `eslintConfig()` enables these bundled framework configs by default.

##### detection?

> `optional` **detection?**: `boolean` \| [`DetectionOptions`](#detectionoptions)

Defined in: [core/src/types.ts:383](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L383)

Enables or disables automatic project detection by category.
Use `false` to disable all detection, or an object for granular control.

##### detectRootDir?

> `optional` **detectRootDir?**: `string`

Defined in: [core/src/types.ts:389](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L389)

Root directory used for automatic project detection.
Defaults to `process.cwd()`.

##### extensions?

> `optional` **extensions?**: [`ExtensionOption`](#extensionoption)[]

Defined in: [core/src/types.ts:392](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L392)

List of specialized ESLint rules and extensions

##### features?

> `optional` **features?**: `Partial`\<`Record`\<[`OptionalConfigName`](#optionalconfigname), `boolean`\>\>

Defined in: [core/src/types.ts:399](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L399)

Simple optional-config switchboard. Enables or disables entries from
`extensions`, `formats`, `libraries`, `testing`, and `tools` using their
string names. `integrations` is an alias for the same map.

##### formats?

> `optional` **formats?**: [`FormatOption`](#formatoption)[]

Defined in: [core/src/types.ts:402](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L402)

Additional non-JS/TS file formats to lint

##### frameworks?

> `optional` **frameworks?**: `object`

Defined in: [core/src/types.ts:411](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L411)

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

Defined in: [core/src/types.ts:445](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L445)

Extra global ignore globs (flat config `ignores` only, no `files`).
Patterns are relative to ESLint's working directory, like a manual ignore block.
Not merged from presets or detection. For `projects` entries, patterns are not
auto-prefixed with the subproject path; use repo-root-relative globs when needed.

##### integrations?

> `optional` **integrations?**: `Partial`\<`Record`\<[`OptionalConfigName`](#optionalconfigname), `boolean`\>\>

Defined in: [core/src/types.ts:448](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L448)

List of application-level dependencies configurations

##### libraries?

> `optional` **libraries?**: [`LibraryOption`](#libraryoption)[]

Defined in: [core/src/types.ts:450](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L450)

##### nextMode?

> `optional` **nextMode?**: [`NextModeOption`](#nextmodeoption)

Defined in: [core/src/types.ts:453](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L453)

Next.js specific routing mode

##### optionMergeStrategy?

> `optional` **optionMergeStrategy?**: `"merge"` \| `"replace"`

Defined in: [core/src/types.ts:460](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L460)

Controls how explicit arrays/frameworks combine with auto-detected and preset values.
- `merge` (default): union detected + preset + explicit values
- `replace`: explicit values fully replace detected/preset values

##### preset?

> `optional` **preset?**: [`PresetOption`](#presetoption)

Defined in: [core/src/types.ts:463](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L463)

High-level configuration preset

##### projects?

> `optional` **projects?**: `Record`\<`string`, `Omit`\<[`EslintConfigOptions`](#eslintconfigoptions), `"projects"`\>\>

Defined in: [core/src/types.ts:469](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L469)

Package-aware subproject configuration for monorepos.
Each key is a workspace-relative folder and each value is scoped to that folder.

##### runtime?

> `optional` **runtime?**: [`RuntimeOption`](#runtimeoption)

Defined in: [core/src/types.ts:472](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L472)

Runtime environment preset (Node, Browser, Universal)

##### settings?

> `optional` **settings?**: [`SettingOption`](#settingoption)[]

Defined in: [core/src/types.ts:475](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L475)

List of global settings and behavioral flags

##### strict?

> `optional` **strict?**: [`StrictMode`](#strictmode)

Defined in: [core/src/types.ts:483](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L483)

Severity profile.
- `false` / `recommended`: keep recommended severities
- `true` / `ci`: promote warnings to errors
- `pedantic`: promote warnings and enable built-in best-practice rules

##### tailwind?

> `optional` **tailwind?**: `false` \| [`TailwindOptions`](#tailwindoptions)

Defined in: [core/src/types.ts:489](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L489)

Tailwind CSS plugin options. Providing an object enables the Tailwind
integration, while `false` disables auto-detected Tailwind support.

##### testing?

> `optional` **testing?**: [`TestingOption`](#testingoption)[]

Defined in: [core/src/types.ts:492](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L492)

List of testing frameworks and testing environments

##### testingFiles?

> `optional` **testingFiles?**: `Partial`\<`Record`\<`"cypress"` \| `"jest"` \| `"jest-dom"` \| `"playwright"` \| `"testing-library"` \| `"vitest"`, `string`[]\>\>

Defined in: [core/src/types.ts:500](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L500)

File globs for test integrations when the defaults do not match your project.

For example, set `testingFiles.playwright` to the folder that contains
your Playwright specs when it differs from the built-in defaults.

##### tools?

> `optional` **tools?**: [`ToolOption`](#tooloption)[]

Defined in: [core/src/types.ts:503](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L503)

List of integrations for external standalone tools

##### tsconfigRootDir?

> `optional` **tsconfigRootDir?**: `string`

Defined in: [core/src/types.ts:509](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L509)

Root directory of the project.
Required if multiple candidate TSConfigRootDirs are present.

##### typescript?

> `optional` **typescript?**: `boolean` \| [`TypeScriptMode`](#typescriptmode) \| [`TypeScriptOptions`](#typescriptoptions)

Defined in: [core/src/types.ts:512](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L512)

Enable TypeScript support with optional settings

##### workspacePrefixes?

> `optional` **workspacePrefixes?**: `string`[]

Defined in: [core/src/types.ts:525](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L525)

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

Defined in: [core/src/rules.ts:35](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/rules.ts#L35)

Options for [createImportGroups](#createimportgroups).

#### Properties

##### workspacePrefixes?

> `optional` **workspacePrefixes?**: `string`[]

Defined in: [core/src/rules.ts:46](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/rules.ts#L46)

Workspace / monorepo package prefixes that should sort with internal code
rather than external npm packages.

They are placed in their own group **before** the external npm packages group.

###### Example

```ts
// Treat @acme/ui, @acme/shared, etc. as internal
createImportGroups({ workspacePrefixes: ['@acme'] })
```

***

### TailwindOptions

Defined in: [core/src/types.ts:300](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L300)

#### Properties

##### detectComponentClasses?

> `optional` **detectComponentClasses?**: `boolean`

Defined in: [core/src/types.ts:301](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L301)

##### entryPoint?

> `optional` **entryPoint?**: `string`

Defined in: [core/src/types.ts:302](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L302)

##### ignore?

> `optional` **ignore?**: `string`[]

Defined in: [core/src/types.ts:303](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L303)

##### noUnknownClasses?

> `optional` **noUnknownClasses?**: `false` \| `"error"` \| `"off"` \| `"warn"`

Defined in: [core/src/types.ts:304](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L304)

***

### TypeScriptOptions

Defined in: [core/src/types.ts:317](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L317)

#### Properties

##### mode?

> `optional` **mode?**: [`TypeScriptMode`](#typescriptmode)

Defined in: [core/src/types.ts:318](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L318)

##### project?

> `optional` **project?**: `string` \| `boolean` \| `string`[]

Defined in: [core/src/types.ts:319](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L319)

##### projectService?

> `optional` **projectService?**: `boolean`

Defined in: [core/src/types.ts:320](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L320)

##### tsconfigRootDir?

> `optional` **tsconfigRootDir?**: `string`

Defined in: [core/src/types.ts:321](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L321)

## Type Aliases

### ConfigInput

> **ConfigInput** = `false` \| `null` \| `TSESLint.FlatConfig.Config` \| `TSESLint.FlatConfig.ConfigArray` \| `undefined`

Defined in: [core/src/config-helpers.ts:90](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L90)

***

### DetectedFrameworkName

> **DetectedFrameworkName** = `"angular"` \| `"astro"` \| `"expo"` \| `"hono"` \| `"lit"` \| `"nest"` \| `"next"` \| `"nuxt"` \| `"preact"` \| `"qwik"` \| `"react"` \| `"react-router"` \| `"remix"` \| `"slidev"` \| `"solid"` \| `"svelte"` \| `"tanstack-start"` \| `"vite"` \| `"vue"`

Defined in: [core/src/types.ts:341](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L341)

Framework names that can be auto-detected by `detectProjectOptions`.
These are informational only — you still need to import and pass the actual
framework config via `frameworks.<name>` in `eslintConfig()`.

***

### ExtensionName

> **ExtensionName** = `` `${Extension}` ``

Defined in: [core/src/types.ts:268](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L268)

***

### ExtensionOption

> **ExtensionOption** = [`Extension`](#extension) \| [`ExtensionName`](#extensionname)

Defined in: [core/src/types.ts:269](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L269)

***

### FlatConfigArray

> **FlatConfigArray** = `TSESLint.FlatConfig.ConfigArray`

Defined in: [core/src/types.ts:531](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L531)

Type alias for ESLint flat config array

***

### FormatName

> **FormatName** = `` `${Format}` ``

Defined in: [core/src/types.ts:270](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L270)

***

### FormatOption

> **FormatOption** = [`Format`](#format) \| [`FormatName`](#formatname)

Defined in: [core/src/types.ts:271](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L271)

***

### ImportedFramework

> **ImportedFramework** = ((`options?`) => [`FlatConfigArray`](#flatconfigarray) \| `Promise`\<[`FlatConfigArray`](#flatconfigarray)\>) \| [`FlatConfigArray`](#flatconfigarray) \| `true` \| \{ `default`: ((`options?`) => [`FlatConfigArray`](#flatconfigarray) \| `Promise`\<[`FlatConfigArray`](#flatconfigarray)\>) \| [`FlatConfigArray`](#flatconfigarray); \}

Defined in: [core/src/types.ts:540](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L540)

Type for framework option values: `true` enables the bundled v2 config,
or pass a config array, a factory function (sync or async, like the lazy
framework factories exported from `@santi020k/eslint-config-basic`), or an
imported module with a default export. Any other value throws a descriptive
`TypeError` (see `resolveFramework` in `@santi020k/eslint-config-basic`).

***

### LibraryName

> **LibraryName** = `` `${Library}` ``

Defined in: [core/src/types.ts:272](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L272)

***

### LibraryOption

> **LibraryOption** = [`Library`](#library) \| [`LibraryName`](#libraryname)

Defined in: [core/src/types.ts:273](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L273)

***

### NextModeName

> **NextModeName** = `` `${NextMode}` ``

Defined in: [core/src/types.ts:274](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L274)

***

### NextModeOption

> **NextModeOption** = [`NextMode`](#nextmode) \| [`NextModeName`](#nextmodename)

Defined in: [core/src/types.ts:275](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L275)

***

### NormalizedStrictMode

> **NormalizedStrictMode** = `"ci"` \| `"pedantic"` \| `"recommended"`

Defined in: [core/src/compose.ts:5](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/compose.ts#L5)

***

### OptionalBucket

> **OptionalBucket** = `"extensions"` \| `"formats"` \| `"libraries"` \| `"testing"` \| `"tools"`

Defined in: [core/src/config-helpers.ts:80](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L80)

***

### OptionalConfigMap

> **OptionalConfigMap** = `Partial`\<`Record`\<[`OptionalConfigName`](#optionalconfigname), `boolean`\>\>

Defined in: [core/src/types.ts:282](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L282)

Simple opt-in/opt-out map for optional configs. Keys match the public enum
string values, so both `features: { zod: true }` and `libraries: [Library.Zod]`
resolve to the same underlying config.

***

### OptionalConfigName

> **OptionalConfigName** = [`ExtensionName`](#extensionname) \| [`FormatName`](#formatname) \| [`LibraryName`](#libraryname) \| [`TestingName`](#testingname) \| [`ToolName`](#toolname)

Defined in: [core/src/types.ts:283](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L283)

***

### PresetName

> **PresetName** = `` `${Preset}` ``

Defined in: [core/src/types.ts:289](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L289)

***

### PresetOption

> **PresetOption** = [`Preset`](#preset) \| [`PresetName`](#presetname)

Defined in: [core/src/types.ts:290](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L290)

***

### RuntimeName

> **RuntimeName** = `` `${Runtime}` ``

Defined in: [core/src/types.ts:291](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L291)

***

### RuntimeOption

> **RuntimeOption** = [`Runtime`](#runtime) \| [`RuntimeName`](#runtimename)

Defined in: [core/src/types.ts:292](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L292)

***

### SettingName

> **SettingName** = `` `${Setting}` ``

Defined in: [core/src/types.ts:293](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L293)

***

### SettingOption

> **SettingOption** = [`Setting`](#setting) \| [`SettingName`](#settingname)

Defined in: [core/src/types.ts:294](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L294)

***

### StrictMode

> **StrictMode** = `"ci"` \| `"pedantic"` \| `"recommended"` \| `boolean`

Defined in: [core/src/types.ts:298](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L298)

Severity profiles for teams adopting the config progressively.

***

### TestingName

> **TestingName** = `` `${Testing}` ``

Defined in: [core/src/types.ts:307](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L307)

***

### TestingOption

> **TestingOption** = [`Testing`](#testing) \| [`TestingName`](#testingname)

Defined in: [core/src/types.ts:309](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L309)

***

### ToolName

> **ToolName** = `` `${Tool}` ``

Defined in: [core/src/types.ts:311](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L311)

***

### ToolOption

> **ToolOption** = [`Tool`](#tool) \| [`ToolName`](#toolname)

Defined in: [core/src/types.ts:313](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L313)

***

### TypeScriptMode

> **TypeScriptMode** = `"off"` \| `"strict"` \| `"syntax"` \| `"type-aware"`

Defined in: [core/src/types.ts:315](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L315)

## Variables

### \_\_detectionInternals

> `const` **\_\_detectionInternals**: `object`

Defined in: [core/src/utils/detection.ts:474](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/utils/detection.ts#L474)

Internal detection helpers exposed for focused unit tests.
Do not use these in application code.

#### Type Declaration

##### clearDetectionCache

> **clearDetectionCache**: () => `void`

###### Returns

`void`

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

##### detectExtensions

> **detectExtensions**: (`allDeps`) => [`Extension`](#extension)[]

###### Parameters

###### allDeps

`DependencyMap`

###### Returns

[`Extension`](#extension)[]

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

> **detectRuntime**: (`allDeps`, `detectRootDir`, `_detectedFrameworks`, `setRuntime`, `frameworkHasSetRuntime`) => `void`

###### Parameters

###### allDeps

`DependencyMap`

###### detectRootDir

`string`

###### \_detectedFrameworks

[`DetectedFrameworkName`](#detectedframeworkname)[] \| `undefined`

###### setRuntime

(`runtime`) => `void`

###### frameworkHasSetRuntime?

`boolean` = `false`

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

##### parsePnpmWorkspacePatterns

> **parsePnpmWorkspacePatterns**: (`detectRootDir`) => `string`[]

###### Parameters

###### detectRootDir

`string`

###### Returns

`string`[]

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

Defined in: [core/src/index.ts:164](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/index.ts#L164)

Core JavaScript ESLint configuration (Universal runtime by default)
This is included by default in all configurations

***

### DEFAULT\_IGNORES

> `const` **DEFAULT\_IGNORES**: `string`[]

Defined in: [core/src/config-helpers.ts:21](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L21)

***

### GENERATED\_CODE\_IGNORES

> `const` **GENERATED\_CODE\_IGNORES**: `string`[]

Defined in: [core/src/config-helpers.ts:59](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L59)

***

### gitignore

> `const` **gitignore**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [core/src/settings/gitignore.ts:13](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/settings/gitignore.ts#L13)

***

### GLOB\_ASTRO

> `const` **GLOB\_ASTRO**: `string`[]

Defined in: [core/src/types.ts:13](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L13)

***

### GLOB\_JS

> `const` **GLOB\_JS**: `string`[]

Defined in: [core/src/types.ts:6](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L6)

Global file patterns for JavaScript-compatible files

***

### GLOB\_JS\_TS

> `const` **GLOB\_JS\_TS**: `string`[]

Defined in: [core/src/types.ts:10](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L10)

***

### GLOB\_JS\_TS\_ALL

> `const` **GLOB\_JS\_TS\_ALL**: `string`[]

Defined in: [core/src/types.ts:15](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L15)

***

### GLOB\_SLOT

> `const` **GLOB\_SLOT**: `string`[]

Defined in: [core/src/types.ts:14](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L14)

***

### GLOB\_SVELTE

> `const` **GLOB\_SVELTE**: `string`[]

Defined in: [core/src/types.ts:12](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L12)

***

### GLOB\_TS

> `const` **GLOB\_TS**: `string`[]

Defined in: [core/src/types.ts:8](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L8)

***

### GLOB\_VIRTUAL\_TS

> `const` **GLOB\_VIRTUAL\_TS**: `string`[]

Defined in: [core/src/types.ts:17](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L17)

***

### GLOB\_VUE

> `const` **GLOB\_VUE**: `string`[]

Defined in: [core/src/types.ts:11](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L11)

***

### groups

> `const` **groups**: `string`[][]

Defined in: [core/src/rules.ts:144](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/rules.ts#L144)

Default import sort groups used by the core config.
Export allows downstream packages and end users to reference or extend them.

***

### OPTIONAL\_BUCKETS

> `const` **OPTIONAL\_BUCKETS**: `object`

Defined in: [core/src/config-helpers.ts:82](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L82)

#### Type Declaration

##### extensions

> `readonly` **extensions**: [`Extension`](#extension)[]

##### formats

> `readonly` **formats**: [`Format`](#format)[]

##### libraries

> `readonly` **libraries**: [`Library`](#library)[]

##### testing

> `readonly` **testing**: [`Testing`](#testing)[]

##### tools

> `readonly` **tools**: [`Tool`](#tool)[]

***

### ReactConfigKeys

> `const` **ReactConfigKeys**: readonly \[`"react"`, `"next"`, `"expo"`, `"react-router"`, `"remix"`\]

Defined in: [core/src/types.ts:328](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/types.ts#L328)

Array of configurations that require React
Note: These are now used internally for auto-detection and globals

***

### rules

> `const` **rules**: `TSESLint.Linter.RulesRecord`

Defined in: [core/src/rules.ts:148](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/rules.ts#L148)

***

### TAILWIND\_ENTRYPOINT\_CANDIDATES

> `const` **TAILWIND\_ENTRYPOINT\_CANDIDATES**: `string`[]

Defined in: [core/src/config-helpers.ts:71](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L71)

## Functions

### applyArrayControls()

> **applyArrayControls**(`controls`, `detected`): `object`

Defined in: [core/src/config-helpers.ts:222](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L222)

#### Parameters

##### controls

`Required`\<[`DetectionOptions`](#detectionoptions)\>

##### detected

[`EslintConfigOptions`](#eslintconfigoptions)

#### Returns

`object`

##### detectedFrameworks

> **detectedFrameworks**: [`DetectedFrameworkName`](#detectedframeworkname)[] \| `undefined`

##### extensions

> **extensions**: [`ExtensionOption`](#extensionoption)[] \| `undefined`

##### formats

> **formats**: [`FormatOption`](#formatoption)[] \| `undefined`

##### libraries

> **libraries**: [`LibraryOption`](#libraryoption)[] \| `undefined`

##### testing

> **testing**: [`TestingOption`](#testingoption)[] \| `undefined`

##### tools

> **tools**: [`ToolOption`](#tooloption)[] \| `undefined`

***

### applyDetectionControls()

> **applyDetectionControls**(`detected`, `detection`, `defaults?`): [`EslintConfigOptions`](#eslintconfigoptions)

Defined in: [core/src/config-helpers.ts:239](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L239)

#### Parameters

##### detected

[`EslintConfigOptions`](#eslintconfigoptions)

##### detection

`boolean` \| [`DetectionOptions`](#detectionoptions) \| `undefined`

##### defaults?

`Partial`\<`Required`\<[`DetectionOptions`](#detectionoptions)\>\>

#### Returns

[`EslintConfigOptions`](#eslintconfigoptions)

***

### applyFeatureDisables()

> **applyFeatureDisables**\<`T`\>(`values`, `options`, `bucket`): `T`[]

Defined in: [core/src/config-helpers.ts:136](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L136)

#### Type Parameters

##### T

`T` *extends* `string`

#### Parameters

##### values

`T`[]

##### options

[`EslintConfigOptions`](#eslintconfigoptions) \| `undefined`

##### bucket

[`OptionalBucket`](#optionalbucket)

#### Returns

`T`[]

***

### applyScalarControls()

> **applyScalarControls**(`controls`, `detected`): `object`

Defined in: [core/src/config-helpers.ts:231](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L231)

#### Parameters

##### controls

`Required`\<[`DetectionOptions`](#detectionoptions)\>

##### detected

[`EslintConfigOptions`](#eslintconfigoptions)

#### Returns

`object`

##### nextMode

> **nextMode**: [`NextModeOption`](#nextmodeoption) \| `undefined`

##### preset

> **preset**: [`PresetOption`](#presetoption) \| `undefined`

##### projects

> **projects**: `Record`\<`string`, `Omit`\<[`EslintConfigOptions`](#eslintconfigoptions), `"projects"`\>\> \| `undefined`

##### runtime

> **runtime**: [`RuntimeOption`](#runtimeoption) \| `undefined`

##### typescript

> **typescript**: `boolean` \| [`TypeScriptMode`](#typescriptmode) \| [`TypeScriptOptions`](#typescriptoptions) \| `undefined`

***

### applyStrictMode()

> **applyStrictMode**(`configs`, `strict`): `ConfigArray`

Defined in: [core/src/compose.ts:32](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/compose.ts#L32)

Applies strict mode by promoting all 'warn' rules to 'error'.

#### Parameters

##### configs

`ConfigArray`

##### strict

`boolean` \| [`NormalizedStrictMode`](#normalizedstrictmode) \| `undefined`

#### Returns

`ConfigArray`

***

### applyStrictProfileDefaults()

> **applyStrictProfileDefaults**(`extensions`, `strict`): [`Extension`](#extension)[]

Defined in: [core/src/config-helpers.ts:254](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L254)

#### Parameters

##### extensions

[`Extension`](#extension)[]

##### strict

[`StrictMode`](#strictmode) \| `undefined`

#### Returns

[`Extension`](#extension)[]

***

### createCoreConfig()

> **createCoreConfig**(`runtime?`): `ConfigArray`

Defined in: [core/src/index.ts:72](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/index.ts#L72)

Creates the core config with the specified runtime globals

#### Parameters

##### runtime?

[`Runtime`](#runtime) = `Runtime.Universal`

#### Returns

`ConfigArray`

***

### createImportGroups()

> **createImportGroups**(`options?`): `string`[][]

Defined in: [core/src/rules.ts:70](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/rules.ts#L70)

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

### createModuleLoader()

> **createModuleLoader**(`resolveFn`): \<`T`\>(`specifier`) => `Promise`\<`T`\>

Defined in: [core/src/lazy.ts:23](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/lazy.ts#L23)

#### Parameters

##### resolveFn

(`specifier`) => `string`

#### Returns

\<`T`\>(`specifier`) => `Promise`\<`T`\>

***

### detectProjectOptions()

> **detectProjectOptions**(`detectRootDir?`): [`EslintConfigOptions`](#eslintconfigoptions)

Defined in: [core/src/utils/detection.ts:500](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/utils/detection.ts#L500)

Automatically detects project settings based on package.json content

#### Parameters

##### detectRootDir?

`string` = `...`

Root directory used for dependency/file detection (defaults to process.cwd())

#### Returns

[`EslintConfigOptions`](#eslintconfigoptions)

Detected ESLint configuration options

***

### findTailwindEntryPoint()

> **findTailwindEntryPoint**(`rootDir`): `string` \| `undefined`

Defined in: [core/src/config-helpers.ts:299](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L299)

#### Parameters

##### rootDir

`string`

#### Returns

`string` \| `undefined`

***

### flattenConfigInputs()

> **flattenConfigInputs**(`configs`): `ConfigArray`

Defined in: [core/src/config-helpers.ts:92](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L92)

#### Parameters

##### configs

[`ConfigInput`](#configinput)[]

#### Returns

`ConfigArray`

***

### getFeatureEntries()

> **getFeatureEntries**(`options`, `bucket`, `enabled`): `string`[]

Defined in: [core/src/config-helpers.ts:125](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L125)

#### Parameters

##### options

[`EslintConfigOptions`](#eslintconfigoptions) \| `undefined`

##### bucket

[`OptionalBucket`](#optionalbucket)

##### enabled

`boolean`

#### Returns

`string`[]

***

### getGlobalsForRuntime()

> **getGlobalsForRuntime**(`runtime?`): `GlobalsConfig` \| `undefined`

Defined in: [core/src/index.ts:22](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/index.ts#L22)

Returns the appropriate globals for the given runtime option

#### Parameters

##### runtime?

[`Runtime`](#runtime) = `Runtime.Universal`

#### Returns

`GlobalsConfig` \| `undefined`

***

### getStrictMode()

> **getStrictMode**(`explicitStrict`, `presetStrict`): [`StrictMode`](#strictmode) \| `undefined`

Defined in: [core/src/config-helpers.ts:249](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L249)

#### Parameters

##### explicitStrict

[`StrictMode`](#strictmode) \| `undefined`

##### presetStrict

[`StrictMode`](#strictmode) \| `undefined`

#### Returns

[`StrictMode`](#strictmode) \| `undefined`

***

### hasReactConfig()

> **hasReactConfig**(`options?`): `boolean`

Defined in: [core/src/utils/index.ts:9](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/utils/index.ts#L9)

Checks if the provided EslintConfigOptions includes any React-specific configurations.

#### Parameters

##### options?

[`EslintConfigOptions`](#eslintconfigoptions)

ESLint configuration options.

#### Returns

`boolean`

True if any React configuration is detected, false otherwise.

***

### hasTsconfig()

> **hasTsconfig**(`rootDir`): `boolean`

Defined in: [core/src/config-helpers.ts:263](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L263)

#### Parameters

##### rootDir

`string`

#### Returns

`boolean`

***

### isOptionalBucketValue()

> **isOptionalBucketValue**(`bucket`, `value`): `boolean`

Defined in: [core/src/config-helpers.ts:119](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L119)

#### Parameters

##### bucket

[`OptionalBucket`](#optionalbucket)

##### value

`string`

#### Returns

`boolean`

***

### loadModule()

> **loadModule**\<`T`\>(`specifier`): `Promise`\<`T`\>

Defined in: [core/src/lazy.ts:40](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/lazy.ts#L40)

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### specifier

`string`

#### Returns

`Promise`\<`T`\>

***

### mergeArrayOption()

> **mergeArrayOption**\<`T`\>(`detectedValues`, `presetValues`, `explicitValues`, `strategy`): `T`[]

Defined in: [core/src/config-helpers.ts:98](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L98)

#### Type Parameters

##### T

`T`

#### Parameters

##### detectedValues

`T`[]

##### presetValues

`T`[] \| `undefined`

##### explicitValues

`T`[] \| `undefined`

##### strategy

`"merge"` \| `"replace"`

#### Returns

`T`[]

***

### mergeFrameworkOption()

> **mergeFrameworkOption**(`detectedFrameworks`, `presetFrameworks`, `explicitFrameworks`, `strategy`): `object`

Defined in: [core/src/config-helpers.ts:167](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L167)

#### Parameters

##### detectedFrameworks

`Record`\<`string`, [`ImportedFramework`](#importedframework)\>

##### presetFrameworks

`Record`\<`string`, [`ImportedFramework`](#importedframework)\> \| `undefined`

##### explicitFrameworks

`Record`\<`string`, [`ImportedFramework`](#importedframework)\> \| `undefined`

##### strategy

`"merge"` \| `"replace"`

#### Returns

##### angular?

> `optional` **angular?**: [`ImportedFramework`](#importedframework)

##### astro?

> `optional` **astro?**: [`ImportedFramework`](#importedframework)

##### expo?

> `optional` **expo?**: [`ImportedFramework`](#importedframework)

##### hono?

> `optional` **hono?**: [`ImportedFramework`](#importedframework)

##### lit?

> `optional` **lit?**: [`ImportedFramework`](#importedframework)

##### nest?

> `optional` **nest?**: [`ImportedFramework`](#importedframework)

##### next?

> `optional` **next?**: [`ImportedFramework`](#importedframework)

##### nuxt?

> `optional` **nuxt?**: [`ImportedFramework`](#importedframework)

##### preact?

> `optional` **preact?**: [`ImportedFramework`](#importedframework)

##### qwik?

> `optional` **qwik?**: [`ImportedFramework`](#importedframework)

##### react?

> `optional` **react?**: [`ImportedFramework`](#importedframework)

##### react-router?

> `optional` **react-router?**: [`ImportedFramework`](#importedframework)

New name for Remix projects on React Router v7+.

##### ~~remix?~~

> `optional` **remix?**: [`ImportedFramework`](#importedframework)

###### Deprecated

Remix merged into React Router v7 — use `react-router` instead.

##### slidev?

> `optional` **slidev?**: [`ImportedFramework`](#importedframework)

##### solid?

> `optional` **solid?**: [`ImportedFramework`](#importedframework)

##### svelte?

> `optional` **svelte?**: [`ImportedFramework`](#importedframework)

##### tanstack-start?

> `optional` **tanstack-start?**: [`ImportedFramework`](#importedframework)

TanStack Start (React/Solid full-stack framework).

##### vite?

> `optional` **vite?**: [`ImportedFramework`](#importedframework)

##### vue?

> `optional` **vue?**: [`ImportedFramework`](#importedframework)

***

### mergeOptionalBucket()

> **mergeOptionalBucket**\<`T`\>(`bucket`, `detectedValues`, `presetValues`, `explicitValues`, `options`, `strategy`): `T`[]

Defined in: [core/src/config-helpers.ts:146](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L146)

#### Type Parameters

##### T

`T` *extends* `string`

#### Parameters

##### bucket

[`OptionalBucket`](#optionalbucket)

##### detectedValues

`T`[]

##### presetValues

`T`[] \| `undefined`

##### explicitValues

`T`[] \| `undefined`

##### options

[`EslintConfigOptions`](#eslintconfigoptions) \| `undefined`

##### strategy

`"merge"` \| `"replace"`

#### Returns

`T`[]

***

### normalizeStrictMode()

> **normalizeStrictMode**(`strict`): [`NormalizedStrictMode`](#normalizedstrictmode)

Defined in: [core/src/compose.ts:7](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/compose.ts#L7)

#### Parameters

##### strict

`boolean` \| [`NormalizedStrictMode`](#normalizedstrictmode) \| `undefined`

#### Returns

[`NormalizedStrictMode`](#normalizedstrictmode)

***

### patchImportGroups()

> **patchImportGroups**(`allConfigs`, `workspacePrefixes`): `ConfigArray`

Defined in: [core/src/config-helpers.ts:367](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L367)

#### Parameters

##### allConfigs

`ConfigArray`

##### workspacePrefixes

`string`[]

#### Returns

`ConfigArray`

***

### patchImportGroupsConfig()

> **patchImportGroupsConfig**(`config`, `workspacePatterns`): `Config`

Defined in: [core/src/config-helpers.ts:339](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L339)

#### Parameters

##### config

`Config`

##### workspacePatterns

`string`[]

#### Returns

`Config`

***

### resolveDetectionOptions()

> **resolveDetectionOptions**(`detection`, `defaults?`): `Required`\<[`DetectionOptions`](#detectionoptions)\>

Defined in: [core/src/config-helpers.ts:188](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L188)

#### Parameters

##### detection

`boolean` \| [`DetectionOptions`](#detectionoptions) \| `undefined`

##### defaults?

`Partial`\<`Required`\<[`DetectionOptions`](#detectionoptions)\>\> = `{}`

#### Returns

`Required`\<[`DetectionOptions`](#detectionoptions)\>

***

### resolveTsconfigRootDir()

> **resolveTsconfigRootDir**(`rootDir`, `typescript`, `explicitRootDir`): `string` \| `undefined`

Defined in: [core/src/config-helpers.ts:289](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L289)

#### Parameters

##### rootDir

`string`

##### typescript

`boolean` \| [`TypeScriptMode`](#typescriptmode) \| [`TypeScriptOptions`](#typescriptoptions) \| `undefined`

##### explicitRootDir

`string` \| `undefined`

#### Returns

`string` \| `undefined`

***

### resolveTypescriptOptions()

> **resolveTypescriptOptions**(`typescript`): `false` \| [`TypeScriptOptions`](#typescriptoptions) & `object`

Defined in: [core/src/config-helpers.ts:272](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L272)

#### Parameters

##### typescript

`boolean` \| [`TypeScriptMode`](#typescriptmode) \| [`TypeScriptOptions`](#typescriptoptions) \| `undefined`

#### Returns

`false` \| [`TypeScriptOptions`](#typescriptoptions) & `object`

***

### scopeConfigToProject()

> **scopeConfigToProject**(`config`, `projectPath`): `Config`

Defined in: [core/src/config-helpers.ts:320](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L320)

#### Parameters

##### config

`Config`

##### projectPath

`string`

#### Returns

`Config`

***

### scopeFilePattern()

> **scopeFilePattern**(`projectPath`, `pattern`): `unknown`

Defined in: [core/src/config-helpers.ts:304](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L304)

#### Parameters

##### projectPath

`string`

##### pattern

`unknown`

#### Returns

`unknown`

***

### toUniqueArray()

> **toUniqueArray**\<`T`\>(`values`): `T`[]

Defined in: [core/src/config-helpers.ts:19](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/core/src/config-helpers.ts#L19)

#### Type Parameters

##### T

`T`

#### Parameters

##### values

`T`[]

#### Returns

`T`[]

## References

### jsConfig

Renames and re-exports [coreConfig](#coreconfig)
