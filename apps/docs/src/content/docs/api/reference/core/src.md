---
title: "core/src"
description: "@santi020k/eslint-config-basic"
---

## Enumerations

### Extension

Defined in: [core/src/types.ts:35](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L35)

Enum for specialized ESLint extensions and strict rule sets

#### Enumeration Members

##### A11y

> **A11y**: `"a11y"`

Defined in: [core/src/types.ts:40](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L40)

Accessibility (a11y) rules for JSX and Vue

##### BestPractices

> **BestPractices**: `"best-practices"`

Defined in: [core/src/types.ts:46](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L46)

Built-in best-practice rules: no-console, no-alert, cyclomatic complexity,
max nesting depth. No extra dependencies required.

##### Biome

> **Biome**: `"biome"`

Defined in: [core/src/types.ts:51](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L51)

Disables formatting rules that conflict with Biome

##### Boundaries

> **Boundaries**: `"boundaries"`

Defined in: [core/src/types.ts:56](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L56)

Import boundary rules for common app, workspace, and generated-code edges.

##### Perfectionist

> **Perfectionist**: `"perfectionist"`

Defined in: [core/src/types.ts:57](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L57)

##### Regexp

> **Regexp**: `"regexp"`

Defined in: [core/src/types.ts:58](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L58)

##### Security

> **Security**: `"security"`

Defined in: [core/src/types.ts:59](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L59)

##### Sonarjs

> **Sonarjs**: `"sonarjs"`

Defined in: [core/src/types.ts:60](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L60)

##### Unicorn

> **Unicorn**: `"unicorn"`

Defined in: [core/src/types.ts:62](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L62)

***

### Format

Defined in: [core/src/types.ts:68](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L68)

Enum for linting non-JS/TS file formats

#### Enumeration Members

##### Graphql

> **Graphql**: `"graphql"`

Defined in: [core/src/types.ts:69](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L69)

##### Jsonc

> **Jsonc**: `"jsonc"`

Defined in: [core/src/types.ts:70](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L70)

##### Markdown

> **Markdown**: `"markdown"`

Defined in: [core/src/types.ts:71](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L71)

##### Mdx

> **Mdx**: `"mdx"`

Defined in: [core/src/types.ts:72](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L72)

##### PackageJson

> **PackageJson**: `"package-json"`

Defined in: [core/src/types.ts:73](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L73)

##### Toml

> **Toml**: `"toml"`

Defined in: [core/src/types.ts:74](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L74)

##### Yaml

> **Yaml**: `"yaml"`

Defined in: [core/src/types.ts:75](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L75)

***

### Library

Defined in: [core/src/types.ts:81](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L81)

Enum for application-level runtime dependencies and styling

#### Enumeration Members

##### AiSdk

> **AiSdk**: `"ai-sdk"`

Defined in: [core/src/types.ts:82](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L82)

##### Autogen

> **Autogen**: `"autogen"`

Defined in: [core/src/types.ts:83](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L83)

##### Drizzle

> **Drizzle**: `"drizzle"`

Defined in: [core/src/types.ts:84](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L84)

##### GoogleGenAi

> **GoogleGenAi**: `"google-genai"`

Defined in: [core/src/types.ts:85](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L85)

##### I18next

> **I18next**: `"i18next"`

Defined in: [core/src/types.ts:86](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L86)

##### Langchain

> **Langchain**: `"langchain"`

Defined in: [core/src/types.ts:87](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L87)

##### LlamaIndex

> **LlamaIndex**: `"llamaindex"`

Defined in: [core/src/types.ts:88](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L88)

##### Mastra

> **Mastra**: `"mastra"`

Defined in: [core/src/types.ts:89](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L89)

##### Mcp

> **Mcp**: `"mcp"`

Defined in: [core/src/types.ts:90](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L90)

##### MikroOrm

> **MikroOrm**: `"mikro-orm"`

Defined in: [core/src/types.ts:91](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L91)

##### OpenAiAgents

> **OpenAiAgents**: `"openai-agents"`

Defined in: [core/src/types.ts:92](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L92)

##### Prisma

> **Prisma**: `"prisma"`

Defined in: [core/src/types.ts:93](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L93)

##### Sequelize

> **Sequelize**: `"sequelize"`

Defined in: [core/src/types.ts:94](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L94)

##### Stencil

> **Stencil**: `"stencil"`

Defined in: [core/src/types.ts:95](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L95)

##### Storybook

> **Storybook**: `"storybook"`

Defined in: [core/src/types.ts:96](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L96)

##### Tailwind

> **Tailwind**: `"tailwind"`

Defined in: [core/src/types.ts:97](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L97)

##### TanstackQuery

> **TanstackQuery**: `"tanstack-query"`

Defined in: [core/src/types.ts:98](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L98)

##### TanstackRouter

> **TanstackRouter**: `"tanstack-router"`

Defined in: [core/src/types.ts:99](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L99)

##### Turbo

> **Turbo**: `"turbo"`

Defined in: [core/src/types.ts:100](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L100)

##### Typeorm

> **Typeorm**: `"typeorm"`

Defined in: [core/src/types.ts:101](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L101)

##### Zod

> **Zod**: `"zod"`

Defined in: [core/src/types.ts:102](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L102)

***

### NextMode

Defined in: [core/src/types.ts:108](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L108)

Enum for Next.js mode options

#### Enumeration Members

##### AppRouter

> **AppRouter**: `"app-router"`

Defined in: [core/src/types.ts:109](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L109)

##### Pages

> **Pages**: `"pages"`

Defined in: [core/src/types.ts:110](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L110)

***

### Preset

Defined in: [core/src/types.ts:116](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L116)

Enum for named presets

#### Enumeration Members

##### All

> **All**: `"all"`

Defined in: [core/src/types.ts:119](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L119)

All configs + all optionals

##### App

> **App**: `"app"`

Defined in: [core/src/types.ts:122](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L122)

Browser application defaults with TypeScript and Prettier

##### Basic

> **Basic**: `"basic"`

Defined in: [core/src/types.ts:125](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L125)

Core JS config only

##### Browser

> **Browser**: `"browser"`

Defined in: [core/src/types.ts:128](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L128)

Core + TS + Browser runtime

##### CI

> **CI**: `"ci"`

Defined in: [core/src/types.ts:131](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L131)

CI-oriented defaults with strict severities

##### Library

> **Library**: `"library"`

Defined in: [core/src/types.ts:134](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L134)

TypeScript package/library defaults for published packages

##### Monorepo

> **Monorepo**: `"monorepo"`

Defined in: [core/src/types.ts:137](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L137)

Monorepo-friendly defaults for mixed workspaces

##### Node

> **Node**: `"node"`

Defined in: [core/src/types.ts:140](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L140)

Core + TS + Node runtime

##### Worker

> **Worker**: `"worker"`

Defined in: [core/src/types.ts:143](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L143)

Core + TS + Worker runtime

***

### Runtime

Defined in: [core/src/types.ts:149](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L149)

Enum for runtime environment presets

#### Enumeration Members

##### Browser

> **Browser**: `"browser"`

Defined in: [core/src/types.ts:152](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L152)

Only Browser globals (window, document, etc.)

##### Bun

> **Bun**: `"bun"`

Defined in: [core/src/types.ts:155](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L155)

Bun runtime globals

##### Cloudflare

> **Cloudflare**: `"cloudflare"`

Defined in: [core/src/types.ts:158](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L158)

Cloudflare Workers globals

##### Deno

> **Deno**: `"deno"`

Defined in: [core/src/types.ts:161](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L161)

Deno runtime globals

##### Node

> **Node**: `"node"`

Defined in: [core/src/types.ts:164](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L164)

Only Node.js globals (process, __dirname, etc.)

##### Universal

> **Universal**: `"universal"`

Defined in: [core/src/types.ts:167](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L167)

Both Node.js and Browser globals (default)

##### Worker

> **Worker**: `"worker"`

Defined in: [core/src/types.ts:170](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L170)

Service Worker and Fetch API globals for edge runtimes

***

### Setting

Defined in: [core/src/types.ts:176](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L176)

Enum for settings options in ESLint

#### Enumeration Members

##### DefaultIgnores

> **DefaultIgnores**: `"default-ignores"`

Defined in: [core/src/types.ts:179](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L179)

Default behavior — accepted for symmetry with `NoDefaultIgnores`; passing it changes nothing.

##### GeneratedCodeIgnores

> **GeneratedCodeIgnores**: `"generated-code-ignores"`

Defined in: [core/src/types.ts:182](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L182)

Default behavior — accepted for symmetry with `NoGeneratedCodeIgnores`; passing it changes nothing.

##### Gitignore

> **Gitignore**: `"gitignore"`

Defined in: [core/src/types.ts:185](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L185)

Default behavior — accepted for symmetry with `NoGitignore`; passing it changes nothing.

##### NoDefaultIgnores

> **NoDefaultIgnores**: `"no-default-ignores"`

Defined in: [core/src/types.ts:188](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L188)

Disable the built-in default ignore globs (dist, build, coverage, etc.).

##### NoGeneratedCodeIgnores

> **NoGeneratedCodeIgnores**: `"no-generated-code-ignores"`

Defined in: [core/src/types.ts:191](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L191)

Disable generated-code ignore globs.

##### NoGitignore

> **NoGitignore**: `"no-gitignore"`

Defined in: [core/src/types.ts:194](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L194)

Disable automatic `.gitignore`-based ignores.

***

### Testing

Defined in: [core/src/types.ts:200](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L200)

Enum for testing frameworks and environments

#### Enumeration Members

##### Cypress

> **Cypress**: `"cypress"`

Defined in: [core/src/types.ts:201](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L201)

##### Jest

> **Jest**: `"jest"`

Defined in: [core/src/types.ts:202](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L202)

##### JestDom

> **JestDom**: `"jest-dom"`

Defined in: [core/src/types.ts:203](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L203)

##### Playwright

> **Playwright**: `"playwright"`

Defined in: [core/src/types.ts:204](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L204)

##### TestingLibrary

> **TestingLibrary**: `"testing-library"`

Defined in: [core/src/types.ts:205](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L205)

##### Vitest

> **Vitest**: `"vitest"`

Defined in: [core/src/types.ts:206](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L206)

***

### Tool

Defined in: [core/src/types.ts:212](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L212)

Enum for integrating external standalone utilities

#### Enumeration Members

##### Command

> **Command**: `"command"`

Defined in: [core/src/types.ts:213](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L213)

##### Cspell

> **Cspell**: `"cspell"`

Defined in: [core/src/types.ts:214](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L214)

##### Docker

> **Docker**: `"docker"`

Defined in: [core/src/types.ts:215](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L215)

##### GithubActions

> **GithubActions**: `"github-actions"`

Defined in: [core/src/types.ts:216](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L216)

##### Jsdoc

> **Jsdoc**: `"jsdoc"`

Defined in: [core/src/types.ts:217](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L217)

##### Nx

> **Nx**: `"nx"`

Defined in: [core/src/types.ts:218](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L218)

##### Prettier

> **Prettier**: `"prettier"`

Defined in: [core/src/types.ts:219](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L219)

##### Swagger

> **Swagger**: `"swagger"`

Defined in: [core/src/types.ts:220](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L220)

## Interfaces

### DetectionOptions

Defined in: [core/src/types.ts:226](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L226)

Controls automatic project detection by category.

#### Properties

##### extensions?

> `optional` **extensions?**: `boolean`

Defined in: [core/src/types.ts:227](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L227)

##### formats?

> `optional` **formats?**: `boolean`

Defined in: [core/src/types.ts:228](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L228)

##### frameworks?

> `optional` **frameworks?**: `boolean`

Defined in: [core/src/types.ts:229](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L229)

##### libraries?

> `optional` **libraries?**: `boolean`

Defined in: [core/src/types.ts:230](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L230)

##### nextMode?

> `optional` **nextMode?**: `boolean`

Defined in: [core/src/types.ts:231](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L231)

##### projects?

> `optional` **projects?**: `boolean`

Defined in: [core/src/types.ts:232](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L232)

##### runtime?

> `optional` **runtime?**: `boolean`

Defined in: [core/src/types.ts:233](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L233)

##### testing?

> `optional` **testing?**: `boolean`

Defined in: [core/src/types.ts:234](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L234)

##### tools?

> `optional` **tools?**: `boolean`

Defined in: [core/src/types.ts:235](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L235)

##### typescript?

> `optional` **typescript?**: `boolean`

Defined in: [core/src/types.ts:236](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L236)

***

### EslintConfigOptions

Defined in: [core/src/types.ts:321](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L321)

ESLint configuration interface

#### Properties

##### autoFrameworks?

> `optional` **autoFrameworks?**: `boolean`

Defined in: [core/src/types.ts:327](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L327)

Enables bundled framework configs detected from dependencies.
Disable this when you want manual framework control only.

##### detectedFrameworks?

> `optional` **detectedFrameworks?**: [`DetectedFrameworkName`](#detectedframeworkname)[]

Defined in: [core/src/types.ts:333](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L333)

Frameworks detected from package.json by `detectProjectOptions()`.
In v2, `eslintConfig()` enables these bundled framework configs by default.

##### detection?

> `optional` **detection?**: `boolean` \| [`DetectionOptions`](#detectionoptions)

Defined in: [core/src/types.ts:339](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L339)

Enables or disables automatic project detection by category.
Use `false` to disable all detection, or an object for granular control.

##### detectRootDir?

> `optional` **detectRootDir?**: `string`

Defined in: [core/src/types.ts:345](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L345)

Root directory used for automatic project detection.
Defaults to `process.cwd()`.

##### extensions?

> `optional` **extensions?**: [`ExtensionOption`](#extensionoption)[]

Defined in: [core/src/types.ts:348](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L348)

List of specialized ESLint rules and extensions

##### features?

> `optional` **features?**: `Partial`\<`Record`\<[`OptionalConfigName`](#optionalconfigname), `boolean`\>\>

Defined in: [core/src/types.ts:355](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L355)

Simple optional-config switchboard. Enables or disables entries from
`extensions`, `formats`, `libraries`, `testing`, and `tools` using their
string names. `integrations` is an alias for the same map.

##### formats?

> `optional` **formats?**: [`FormatOption`](#formatoption)[]

Defined in: [core/src/types.ts:358](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L358)

Additional non-JS/TS file formats to lint

##### frameworks?

> `optional` **frameworks?**: `object`

Defined in: [core/src/types.ts:367](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L367)

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

Defined in: [core/src/types.ts:390](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L390)

Extra global ignore globs (flat config `ignores` only, no `files`).
Patterns are relative to ESLint's working directory, like a manual ignore block.
Not merged from presets or detection. For `projects` entries, patterns are not
auto-prefixed with the subproject path; use repo-root-relative globs when needed.

##### integrations?

> `optional` **integrations?**: `Partial`\<`Record`\<[`OptionalConfigName`](#optionalconfigname), `boolean`\>\>

Defined in: [core/src/types.ts:393](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L393)

List of application-level dependencies configurations

##### libraries?

> `optional` **libraries?**: [`LibraryOption`](#libraryoption)[]

Defined in: [core/src/types.ts:395](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L395)

##### nextMode?

> `optional` **nextMode?**: [`NextModeOption`](#nextmodeoption)

Defined in: [core/src/types.ts:398](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L398)

Next.js specific routing mode

##### optionMergeStrategy?

> `optional` **optionMergeStrategy?**: `"replace"` \| `"merge"`

Defined in: [core/src/types.ts:405](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L405)

Controls how explicit arrays/frameworks combine with auto-detected and preset values.
- `merge` (default): union detected + preset + explicit values
- `replace`: explicit values fully replace detected/preset values

##### preset?

> `optional` **preset?**: [`PresetOption`](#presetoption)

Defined in: [core/src/types.ts:408](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L408)

High-level configuration preset

##### projects?

> `optional` **projects?**: `Record`\<`string`, `Omit`\<[`EslintConfigOptions`](#eslintconfigoptions), `"projects"`\>\>

Defined in: [core/src/types.ts:414](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L414)

Package-aware subproject configuration for monorepos.
Each key is a workspace-relative folder and each value is scoped to that folder.

##### runtime?

> `optional` **runtime?**: [`RuntimeOption`](#runtimeoption)

Defined in: [core/src/types.ts:417](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L417)

Runtime environment preset (Node, Browser, Universal)

##### settings?

> `optional` **settings?**: [`SettingOption`](#settingoption)[]

Defined in: [core/src/types.ts:420](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L420)

List of global settings and behavioral flags

##### strict?

> `optional` **strict?**: [`StrictMode`](#strictmode)

Defined in: [core/src/types.ts:428](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L428)

Severity profile.
- `false` / `recommended`: keep recommended severities
- `true` / `ci`: promote warnings to errors
- `pedantic`: promote warnings and enable built-in best-practice rules

##### testing?

> `optional` **testing?**: [`TestingOption`](#testingoption)[]

Defined in: [core/src/types.ts:431](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L431)

List of testing frameworks and testing environments

##### tools?

> `optional` **tools?**: [`ToolOption`](#tooloption)[]

Defined in: [core/src/types.ts:434](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L434)

List of integrations for external standalone tools

##### tsconfigRootDir?

> `optional` **tsconfigRootDir?**: `string`

Defined in: [core/src/types.ts:440](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L440)

Root directory of the project.
Required if multiple candidate TSConfigRootDirs are present.

##### typescript?

> `optional` **typescript?**: `boolean` \| [`TypeScriptMode`](#typescriptmode) \| [`TypeScriptOptions`](#typescriptoptions)

Defined in: [core/src/types.ts:443](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L443)

Enable TypeScript support with optional settings

***

### TypeScriptOptions

Defined in: [core/src/types.ts:280](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L280)

#### Properties

##### mode?

> `optional` **mode?**: [`TypeScriptMode`](#typescriptmode)

Defined in: [core/src/types.ts:281](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L281)

##### projectService?

> `optional` **projectService?**: `boolean`

Defined in: [core/src/types.ts:282](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L282)

##### tsconfigRootDir?

> `optional` **tsconfigRootDir?**: `string`

Defined in: [core/src/types.ts:283](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L283)

## Type Aliases

### DetectedFrameworkName

> **DetectedFrameworkName** = `"angular"` \| `"astro"` \| `"expo"` \| `"hono"` \| `"nest"` \| `"next"` \| `"qwik"` \| `"react"` \| `"remix"` \| `"slidev"` \| `"solid"` \| `"svelte"` \| `"vite"` \| `"vue"`

Defined in: [core/src/types.ts:302](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L302)

Framework names that can be auto-detected by `detectProjectOptions`.
These are informational only — you still need to import and pass the actual
framework config via `frameworks.<name>` in `eslintConfig()`.

***

### ExtensionName

> **ExtensionName** = `` `${Extension}` ``

Defined in: [core/src/types.ts:238](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L238)

***

### ExtensionOption

> **ExtensionOption** = [`Extension`](#extension) \| [`ExtensionName`](#extensionname)

Defined in: [core/src/types.ts:239](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L239)

***

### FlatConfigArray

> **FlatConfigArray** = `TSESLint.FlatConfig.ConfigArray`

Defined in: [core/src/types.ts:449](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L449)

Type alias for ESLint flat config array

***

### FormatName

> **FormatName** = `` `${Format}` ``

Defined in: [core/src/types.ts:240](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L240)

***

### FormatOption

> **FormatOption** = [`Format`](#format) \| [`FormatName`](#formatname)

Defined in: [core/src/types.ts:241](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L241)

***

### ImportedFramework

> **ImportedFramework** = ((`options?`) => [`FlatConfigArray`](#flatconfigarray)) \| [`FlatConfigArray`](#flatconfigarray) \| `true` \| \{ `default`: ((`options?`) => [`FlatConfigArray`](#flatconfigarray)) \| [`FlatConfigArray`](#flatconfigarray); \}

Defined in: [core/src/types.ts:457](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L457)

Type for framework option values: `true` enables the bundled v2 config,
or pass a config array, a factory function, or an imported module with a
default export. Any other value throws a descriptive `TypeError`
(see `resolveFramework` in `@santi020k/eslint-config-basic`).

***

### LibraryName

> **LibraryName** = `` `${Library}` ``

Defined in: [core/src/types.ts:242](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L242)

***

### LibraryOption

> **LibraryOption** = [`Library`](#library) \| [`LibraryName`](#libraryname)

Defined in: [core/src/types.ts:243](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L243)

***

### NextModeName

> **NextModeName** = `` `${NextMode}` ``

Defined in: [core/src/types.ts:244](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L244)

***

### NextModeOption

> **NextModeOption** = [`NextMode`](#nextmode) \| [`NextModeName`](#nextmodename)

Defined in: [core/src/types.ts:245](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L245)

***

### OptionalConfigMap

> **OptionalConfigMap** = `Partial`\<`Record`\<[`OptionalConfigName`](#optionalconfigname), `boolean`\>\>

Defined in: [core/src/types.ts:252](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L252)

Simple opt-in/opt-out map for optional configs. Keys match the public enum
string values, so both `features: { zod: true }` and `libraries: [Library.Zod]`
resolve to the same underlying config.

***

### OptionalConfigName

> **OptionalConfigName** = [`ExtensionName`](#extensionname) \| [`FormatName`](#formatname) \| [`LibraryName`](#libraryname) \| [`TestingName`](#testingname) \| [`ToolName`](#toolname)

Defined in: [core/src/types.ts:253](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L253)

***

### PresetName

> **PresetName** = `` `${Preset}` ``

Defined in: [core/src/types.ts:259](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L259)

***

### PresetOption

> **PresetOption** = [`Preset`](#preset) \| [`PresetName`](#presetname)

Defined in: [core/src/types.ts:260](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L260)

***

### RuntimeName

> **RuntimeName** = `` `${Runtime}` ``

Defined in: [core/src/types.ts:261](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L261)

***

### RuntimeOption

> **RuntimeOption** = [`Runtime`](#runtime) \| [`RuntimeName`](#runtimename)

Defined in: [core/src/types.ts:262](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L262)

***

### SettingName

> **SettingName** = `` `${Setting}` ``

Defined in: [core/src/types.ts:263](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L263)

***

### SettingOption

> **SettingOption** = [`Setting`](#setting) \| [`SettingName`](#settingname)

Defined in: [core/src/types.ts:264](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L264)

***

### StrictMode

> **StrictMode** = `"ci"` \| `"pedantic"` \| `"recommended"` \| `boolean`

Defined in: [core/src/types.ts:268](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L268)

Severity profiles for teams adopting the config progressively.

***

### TestingName

> **TestingName** = `` `${Testing}` ``

Defined in: [core/src/types.ts:270](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L270)

***

### TestingOption

> **TestingOption** = [`Testing`](#testing) \| [`TestingName`](#testingname)

Defined in: [core/src/types.ts:272](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L272)

***

### ToolName

> **ToolName** = `` `${Tool}` ``

Defined in: [core/src/types.ts:274](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L274)

***

### ToolOption

> **ToolOption** = [`Tool`](#tool) \| [`ToolName`](#toolname)

Defined in: [core/src/types.ts:276](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L276)

***

### TypeScriptMode

> **TypeScriptMode** = `"off"` \| `"strict"` \| `"syntax"` \| `"type-aware"`

Defined in: [core/src/types.ts:278](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L278)

## Variables

### \_\_detectionInternals

> `const` **\_\_detectionInternals**: `object`

Defined in: [core/src/utils/detection.ts:550](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/utils/detection.ts#L550)

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

Defined in: [core/src/index.ts:157](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/index.ts#L157)

Core JavaScript ESLint configuration (Universal runtime by default)
This is included by default in all configurations

***

### gitignore

> `const` **gitignore**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [core/src/settings/gitignore.ts:13](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/settings/gitignore.ts#L13)

***

### GLOB\_ASTRO

> `const` **GLOB\_ASTRO**: `string`[]

Defined in: [core/src/types.ts:13](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L13)

***

### GLOB\_JS

> `const` **GLOB\_JS**: `string`[]

Defined in: [core/src/types.ts:6](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L6)

Global file patterns for JavaScript-compatible files

***

### GLOB\_JS\_TS

> `const` **GLOB\_JS\_TS**: `string`[]

Defined in: [core/src/types.ts:10](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L10)

***

### GLOB\_JS\_TS\_ALL

> `const` **GLOB\_JS\_TS\_ALL**: `string`[]

Defined in: [core/src/types.ts:15](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L15)

***

### GLOB\_SLOT

> `const` **GLOB\_SLOT**: `string`[]

Defined in: [core/src/types.ts:14](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L14)

***

### GLOB\_SVELTE

> `const` **GLOB\_SVELTE**: `string`[]

Defined in: [core/src/types.ts:12](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L12)

***

### GLOB\_TS

> `const` **GLOB\_TS**: `string`[]

Defined in: [core/src/types.ts:8](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L8)

***

### GLOB\_VIRTUAL\_TS

> `const` **GLOB\_VIRTUAL\_TS**: `string`[]

Defined in: [core/src/types.ts:17](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L17)

***

### GLOB\_VUE

> `const` **GLOB\_VUE**: `string`[]

Defined in: [core/src/types.ts:11](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L11)

***

### groups

> `const` **groups**: `string`[][]

Defined in: [core/src/rules.ts:3](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/rules.ts#L3)

***

### ReactConfigKeys

> `const` **ReactConfigKeys**: readonly \[`"react"`, `"next"`, `"expo"`, `"remix"`\]

Defined in: [core/src/types.ts:290](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/types.ts#L290)

Array of configurations that require React
Note: These are now used internally for auto-detection and globals

***

### rules

> `const` **rules**: `TSESLint.Linter.RulesRecord`

Defined in: [core/src/rules.ts:35](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/rules.ts#L35)

## Functions

### createCoreConfig()

> **createCoreConfig**(`runtime?`): `ConfigArray`

Defined in: [core/src/index.ts:74](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/index.ts#L74)

Creates the core config with the specified runtime globals

#### Parameters

##### runtime?

[`Runtime`](#runtime) = `Runtime.Universal`

#### Returns

`ConfigArray`

***

### detectProjectOptions()

> **detectProjectOptions**(`detectRootDir?`): [`EslintConfigOptions`](#eslintconfigoptions)

Defined in: [core/src/utils/detection.ts:573](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/utils/detection.ts#L573)

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

Defined in: [core/src/index.ts:24](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/index.ts#L24)

Returns the appropriate globals for the given runtime option

#### Parameters

##### runtime?

[`Runtime`](#runtime) = `Runtime.Universal`

#### Returns

`GlobalsConfig` \| `undefined`

***

### hasReactConfig()

> **hasReactConfig**(`options?`): `boolean`

Defined in: [core/src/utils/index.ts:9](https://github.com/santi020k/eslint-config-basic/blob/5eece8230e1812c4be0f81dcae3145ab20b23e8a/packages/core/src/utils/index.ts#L9)

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
