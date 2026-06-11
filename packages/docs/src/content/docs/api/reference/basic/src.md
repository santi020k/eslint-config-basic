---
title: "basic/src"
description: "@santi020k/eslint-config-basic"
---

## Interfaces

### AgentTarget

Defined in: [basic/src/agent-skill-generator.ts:9](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/basic/src/agent-skill-generator.ts#L9)

#### Properties

##### format

> **format**: `"cursor"` \| `"frontmatter"` \| `"kiro"` \| `"plain"`

Defined in: [basic/src/agent-skill-generator.ts:12](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/basic/src/agent-skill-generator.ts#L12)

Format variant used when generating content

##### label

> **label**: `string`

Defined in: [basic/src/agent-skill-generator.ts:15](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/basic/src/agent-skill-generator.ts#L15)

Human-readable label for logging

##### markerFolder

> **markerFolder**: `string`

Defined in: [basic/src/agent-skill-generator.ts:18](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/basic/src/agent-skill-generator.ts#L18)

Folder that must exist in cwd to be considered "present"

##### skillFile

> **skillFile**: `string`

Defined in: [basic/src/agent-skill-generator.ts:21](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/basic/src/agent-skill-generator.ts#L21)

File name for the generated skill

##### skillSubdir

> **skillSubdir**: `string`

Defined in: [basic/src/agent-skill-generator.ts:24](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/basic/src/agent-skill-generator.ts#L24)

Subdirectory inside the agent folder where the skill file is placed

***

### GenerateSkillOptions

Defined in: [basic/src/agent-skill-generator.ts:53](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/basic/src/agent-skill-generator.ts#L53)

#### Properties

##### check?

> `optional` **check?**: `boolean`

Defined in: [basic/src/agent-skill-generator.ts:61](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/basic/src/agent-skill-generator.ts#L61)

Check mode — compare existing skill files against freshly generated
content without writing anything. Stale or missing files are reported
in [GenerateSkillResult.stale](#stale).

###### Default

```ts
false
```

##### createAgentsMd?

> `optional` **createAgentsMd?**: `boolean`

Defined in: [basic/src/agent-skill-generator.ts:68](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/basic/src/agent-skill-generator.ts#L68)

Create a root `AGENTS.md` when it does not exist yet, instead of only
updating an existing one.

###### Default

```ts
false
```

##### cwd?

> `optional` **cwd?**: `string`

Defined in: [basic/src/agent-skill-generator.ts:71](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/basic/src/agent-skill-generator.ts#L71)

Working directory — defaults to process.cwd()

##### force?

> `optional` **force?**: `boolean`

Defined in: [basic/src/agent-skill-generator.ts:77](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/basic/src/agent-skill-generator.ts#L77)

Overwrite files that already exist.

###### Default

```ts
false
```

***

### GenerateSkillResult

Defined in: [basic/src/agent-skill-generator.ts:80](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/basic/src/agent-skill-generator.ts#L80)

#### Properties

##### skipped

> **skipped**: `string`[]

Defined in: [basic/src/agent-skill-generator.ts:81](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/basic/src/agent-skill-generator.ts#L81)

##### stale

> **stale**: `string`[]

Defined in: [basic/src/agent-skill-generator.ts:84](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/basic/src/agent-skill-generator.ts#L84)

Files that are out of date (or missing) — only populated in check mode

##### written

> **written**: `string`[]

Defined in: [basic/src/agent-skill-generator.ts:86](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/basic/src/agent-skill-generator.ts#L86)

## Variables

### AGENT\_TARGETS

> `const` **AGENT\_TARGETS**: [`AgentTarget`](#agenttarget)[]

Defined in: [basic/src/agent-skill-generator.ts:96](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/basic/src/agent-skill-generator.ts#L96)

All AI coding-assistant agent folders that are probed for.
Add new entries here as new agents emerge — the generator picks them up
automatically on the next run.

***

### angularConfig

> `const` **angularConfig**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [angular/src/index.ts:8](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/angular/src/index.ts#L8)

Angular ESLint configuration
Extends

#### Angular-eslint

recommended rules

***

### defineConfig

> `const` **defineConfig**: (`options?`) => `Promise`\<`ConfigArray`\> = `eslintConfig`

Defined in: [basic/src/index.ts:588](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/basic/src/index.ts#L588)

Alias for `eslintConfig()` that reads naturally in `eslint.config.*` files.

Generates the ESLint configuration array, applying configurations
and integration settings based on the input configuration.

#### Parameters

##### options?

[`EslintConfigOptions`](../core/src.md#eslintconfigoptions)

Configuration and integration settings

#### Returns

`Promise`\<`ConfigArray`\>

The final ESLint configuration array

***

### qwik

> `const` **qwik**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [qwik/src/index.ts:5](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/qwik/src/index.ts#L5)

***

### remix

> `const` **remix**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [remix/src/index.ts:5](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/remix/src/index.ts#L5)

***

### solidConfig

> `const` **solidConfig**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [solid/src/index.ts:9](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/solid/src/index.ts#L9)

SolidJS ESLint configuration
Extends eslint-plugin-solid recommended rules

***

### svelteConfig

> `const` **svelteConfig**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [svelte/src/index.ts:9](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/svelte/src/index.ts#L9)

Svelte ESLint configuration
Extends eslint-plugin-svelte recommended flat config

***

### vueConfig

> `const` **vueConfig**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [vue/src/index.ts:12](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/vue/src/index.ts#L12)

Vue ESLint configuration
Extends eslint-plugin-vue recommended config with custom rules

## Functions

### eslintConfig()

> **eslintConfig**(`options?`): `Promise`\<`ConfigArray`\>

Defined in: [basic/src/index.ts:334](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/basic/src/index.ts#L334)

Generates the ESLint configuration array, applying configurations
and integration settings based on the input configuration.

#### Parameters

##### options?

[`EslintConfigOptions`](../core/src.md#eslintconfigoptions)

Configuration and integration settings

#### Returns

`Promise`\<`ConfigArray`\>

The final ESLint configuration array

***

### generateAgentSkills()

> **generateAgentSkills**(`opts?`): `Promise`\<[`GenerateSkillResult`](#generateskillresult)\>

Defined in: [basic/src/agent-skill-generator.ts:840](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/basic/src/agent-skill-generator.ts#L840)

Detects which AI agent folders exist in the project, reads the actual
`eslint.config.js` to understand what is configured, and writes a tailored
ESLint standards skill file into each found folder.

Falls back to package.json auto-detection when the config file cannot be
dynamically imported (e.g. when running outside a built environment).

#### Parameters

##### opts?

[`GenerateSkillOptions`](#generateskilloptions) = `{}`

#### Returns

`Promise`\<[`GenerateSkillResult`](#generateskillresult)\>

#### Example

```ts
import { generateAgentSkills } from '@santi020k/eslint-config-basic'

const result = await generateAgentSkills({ cwd: process.cwd() })
console.log('Written to:', result.written)
```

***

### generateSkillContent()

> **generateSkillContent**(`features`, `format`): `string`

Defined in: [basic/src/agent-skill-generator.ts:534](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/basic/src/agent-skill-generator.ts#L534)

Builds the skill document body from the project's EslintConfigFeatures.
Four format variants are produced:

- `frontmatter` — YAML front-matter + Markdown (`.agent`, `.agents`, `.windsurf`)
- `cursor`      — Cursor MDC front-matter + Markdown
- `kiro`        — Kiro steering front-matter (`inclusion: always`) + Markdown
- `plain`       — pure Markdown, no front-matter (Claude Code, Copilot, Aider, Gemini, Cline, Roo Code)

#### Parameters

##### features

`EslintConfigFeatures`

##### format

`"cursor"` \| `"frontmatter"` \| `"kiro"` \| `"plain"`

#### Returns

`string`

***

### hono()

> **hono**(`options?`): `ConfigArray`

Defined in: [hono/src/index.ts:9](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/hono/src/index.ts#L9)

#### Parameters

##### options?

`HonoConfigOptions` = `{}`

#### Returns

`ConfigArray`

***

### slidev()

> **slidev**(`options?`): `ConfigArray`

Defined in: [slidev/src/index.ts:14](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/slidev/src/index.ts#L14)

Slidev ESLint configuration for Vue-powered presentation decks.

#### Parameters

##### options?

`SlidevConfigOptions` = `{}`

#### Returns

`ConfigArray`

***

### vite()

> **vite**(`options?`): `ConfigArray`

Defined in: [vite/src/index.ts:17](https://github.com/santi020k/eslint-config-basic/blob/60bb20828470274a155bb6788d4af182189bfcce/packages/vite/src/index.ts#L17)

Vite ESLint configuration for browser apps and Vite/Vitest config files.

#### Parameters

##### options?

`ViteConfigOptions` = `{}`

#### Returns

`ConfigArray`

## References

### aiSdk

Re-exports [aiSdk](../integrations/src.md#aisdk)

***

### astro

Renames and re-exports [createAstroConfig](../astro/src.md#createastroconfig)

***

### bestPractices

Re-exports [bestPractices](../integrations/src.md#bestpractices)

***

### coreConfig

Re-exports [coreConfig](../core/src.md#coreconfig)

***

### createCoreConfig

Re-exports [createCoreConfig](../core/src.md#createcoreconfig)

***

### cspell

Re-exports [cspell](../integrations/src.md#cspell)

***

### cypress

Re-exports [cypress](../integrations/src.md#cypress)

***

### DetectedFrameworkName

Re-exports [DetectedFrameworkName](../core/src.md#detectedframeworkname)

***

### DetectionOptions

Re-exports [DetectionOptions](../core/src.md#detectionoptions)

***

### detectProjectOptions

Re-exports [detectProjectOptions](../core/src.md#detectprojectoptions)

***

### drizzle

Re-exports [drizzle](../integrations/src.md#drizzle)

***

### EslintConfigOptions

Re-exports [EslintConfigOptions](../core/src.md#eslintconfigoptions)

***

### expoConfig

Re-exports [expoConfig](../expo/src.md#expoconfig)

***

### Extension

Re-exports [Extension](../core/src.md#extension)

***

### FlatConfigArray

Re-exports [FlatConfigArray](../core/src.md#flatconfigarray)

***

### Format

Re-exports [Format](../core/src.md#format)

***

### getGlobalsForRuntime

Re-exports [getGlobalsForRuntime](../core/src.md#getglobalsforruntime)

***

### gitignore

Re-exports [gitignore](../core/src.md#gitignore-1)

***

### graphql

Re-exports [graphql](../integrations/src.md#graphql)

***

### hasReactConfig

Re-exports [hasReactConfig](../core/src.md#hasreactconfig)

***

### i18next

Re-exports [i18next](../integrations/src.md#i18next)

***

### ImportedFramework

Re-exports [ImportedFramework](../core/src.md#importedframework)

***

### jest

Re-exports [jest](../integrations/src.md#jest)

***

### jsConfig

Renames and re-exports [coreConfig](../core/src.md#coreconfig)

***

### jsdoc

Re-exports [jsdoc](../integrations/src.md#jsdoc)

***

### jsonc

Re-exports [jsonc](../integrations/src.md#jsonc)

***

### langchain

Re-exports [langchain](../integrations/src.md#langchain)

***

### Library

Re-exports [Library](../core/src.md#library)

***

### llamaIndex

Re-exports [llamaIndex](../integrations/src.md#llamaindex)

***

### markdown

Re-exports [markdown](../integrations/src.md#markdown)

***

### mastra

Re-exports [mastra](../integrations/src.md#mastra)

***

### mcp

Re-exports [mcp](../integrations/src.md#mcp)

***

### mdx

Re-exports [mdx](../integrations/src.md#mdx)

***

### mikroOrm

Re-exports [mikroOrm](../integrations/src.md#mikroorm)

***

### nestConfig

Re-exports [nestConfig](../nest/src.md#nestconfig)

***

### nextConfig

Re-exports [nextConfig](../next/src.md#nextconfig)

***

### NextMode

Re-exports [NextMode](../core/src.md#nextmode)

***

### openAiAgents

Re-exports [openAiAgents](../integrations/src.md#openaiagents)

***

### perfectionist

Re-exports [perfectionist](../integrations/src.md#perfectionist)

***

### playwright

Re-exports [playwright](../integrations/src.md#playwright)

***

### Preset

Re-exports [Preset](../core/src.md#preset)

***

### prettier

Re-exports [prettier](../integrations/src.md#prettier)

***

### prisma

Re-exports [prisma](../integrations/src.md#prisma)

***

### reactConfig

Re-exports [reactConfig](../react/src.md#reactconfig)

***

### ReactConfigKeys

Re-exports [ReactConfigKeys](../core/src.md#reactconfigkeys)

***

### regexp

Re-exports [regexp](../integrations/src.md#regexp)

***

### Runtime

Re-exports [Runtime](../core/src.md#runtime)

***

### security

Re-exports [security](../integrations/src.md#security)

***

### sequelize

Re-exports [sequelize](../integrations/src.md#sequelize)

***

### Setting

Re-exports [Setting](../core/src.md#setting)

***

### sonarjs

Re-exports [sonarjs](../integrations/src.md#sonarjs)

***

### stencil

Re-exports [stencil](../integrations/src.md#stencil)

***

### storybook

Re-exports [storybook](../integrations/src.md#storybook)

***

### StrictMode

Re-exports [StrictMode](../core/src.md#strictmode)

***

### swagger

Re-exports [swagger](../integrations/src.md#swagger)

***

### tailwind

Re-exports [tailwind](../integrations/src.md#tailwind)

***

### tanstackQuery

Re-exports [tanstackQuery](../integrations/src.md#tanstackquery)

***

### tanstackRouter

Re-exports [tanstackRouter](../integrations/src.md#tanstackrouter)

***

### Testing

Re-exports [Testing](../core/src.md#testing)

***

### testingLibrary

Re-exports [testingLibrary](../integrations/src.md#testinglibrary)

***

### toml

Re-exports [toml](../integrations/src.md#toml)

***

### Tool

Re-exports [Tool](../core/src.md#tool)

***

### tsConfig

Renames and re-exports [typescriptConfig](../typescript/src.md#typescriptconfig)

***

### typeorm

Re-exports [typeorm](../integrations/src.md#typeorm)

***

### typescriptConfig

Re-exports [typescriptConfig](../typescript/src.md#typescriptconfig)

***

### unicorn

Re-exports [unicorn](../integrations/src.md#unicorn)

***

### vitest

Re-exports [vitest](../integrations/src.md#vitest)

***

### yaml

Re-exports [yaml](../integrations/src.md#yaml)
