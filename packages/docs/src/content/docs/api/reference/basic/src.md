[**@santi020k/eslint-config-basic**](../index.md)

***

# basic/src

## Interfaces

### AgentTarget

Defined in: [basic/src/agent-skill-generator.ts:9](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/basic/src/agent-skill-generator.ts#L9)

#### Properties

##### format

> **format**: `"frontmatter"` \| `"cursor"` \| `"plain"`

Defined in: [basic/src/agent-skill-generator.ts:24](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/basic/src/agent-skill-generator.ts#L24)

Format variant used when generating content

##### label

> **label**: `string`

Defined in: [basic/src/agent-skill-generator.ts:12](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/basic/src/agent-skill-generator.ts#L12)

Human-readable label for logging

##### markerFolder

> **markerFolder**: `string`

Defined in: [basic/src/agent-skill-generator.ts:15](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/basic/src/agent-skill-generator.ts#L15)

Folder that must exist in cwd to be considered "present"

##### skillFile

> **skillFile**: `string`

Defined in: [basic/src/agent-skill-generator.ts:21](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/basic/src/agent-skill-generator.ts#L21)

File name for the generated skill

##### skillSubdir

> **skillSubdir**: `string`

Defined in: [basic/src/agent-skill-generator.ts:18](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/basic/src/agent-skill-generator.ts#L18)

Subdirectory inside the agent folder where the skill file is placed

***

### GenerateSkillOptions

Defined in: [basic/src/agent-skill-generator.ts:55](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/basic/src/agent-skill-generator.ts#L55)

#### Properties

##### cwd?

> `optional` **cwd?**: `string`

Defined in: [basic/src/agent-skill-generator.ts:58](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/basic/src/agent-skill-generator.ts#L58)

Working directory — defaults to process.cwd()

##### force?

> `optional` **force?**: `boolean`

Defined in: [basic/src/agent-skill-generator.ts:64](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/basic/src/agent-skill-generator.ts#L64)

Overwrite files that already exist.

###### Default

```ts
false
```

***

### GenerateSkillResult

Defined in: [basic/src/agent-skill-generator.ts:50](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/basic/src/agent-skill-generator.ts#L50)

#### Properties

##### skipped

> **skipped**: `string`[]

Defined in: [basic/src/agent-skill-generator.ts:52](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/basic/src/agent-skill-generator.ts#L52)

##### written

> **written**: `string`[]

Defined in: [basic/src/agent-skill-generator.ts:51](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/basic/src/agent-skill-generator.ts#L51)

## Variables

### AGENT\_TARGETS

> `const` **AGENT\_TARGETS**: [`AgentTarget`](#agenttarget)[]

Defined in: [basic/src/agent-skill-generator.ts:74](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/basic/src/agent-skill-generator.ts#L74)

All AI coding-assistant agent folders that are probed for.
Add new entries here as new agents emerge — the generator picks them up
automatically on the next run.

***

### angularConfig

> `const` **angularConfig**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [angular/src/index.ts:8](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/angular/src/index.ts#L8)

Angular ESLint configuration
Extends

#### Angular-eslint

recommended rules

***

### qwik

> `const` **qwik**: `TSESLint.FlatConfig.ConfigArray`

Defined in: qwik/dist/index.d.ts:3

***

### remix

> `const` **remix**: `TSESLint.FlatConfig.ConfigArray`

Defined in: remix/dist/index.d.ts:3

***

### solidConfig

> `const` **solidConfig**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [solid/src/index.ts:9](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/solid/src/index.ts#L9)

SolidJS ESLint configuration
Extends eslint-plugin-solid recommended rules

***

### svelteConfig

> `const` **svelteConfig**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [svelte/src/index.ts:9](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/svelte/src/index.ts#L9)

Svelte ESLint configuration
Extends eslint-plugin-svelte recommended flat config

***

### vueConfig

> `const` **vueConfig**: `TSESLint.FlatConfig.ConfigArray`

Defined in: [vue/src/index.ts:12](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/vue/src/index.ts#L12)

Vue ESLint configuration
Extends eslint-plugin-vue recommended config with custom rules

## Functions

### eslintConfig()

> **eslintConfig**(`options?`): `ConfigArray`

Defined in: [basic/src/index.ts:252](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/basic/src/index.ts#L252)

Generates the ESLint configuration array, applying configurations
and integration settings based on the input configuration.

#### Parameters

##### options?

[`EslintConfigOptions`](../core/src.md#eslintconfigoptions)

Configuration and integration settings

#### Returns

`ConfigArray`

The final ESLint configuration array

***

### generateAgentSkills()

> **generateAgentSkills**(`opts?`): `Promise`\<[`GenerateSkillResult`](#generateskillresult)\>

Defined in: [basic/src/agent-skill-generator.ts:719](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/basic/src/agent-skill-generator.ts#L719)

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

Defined in: [basic/src/agent-skill-generator.ts:447](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/basic/src/agent-skill-generator.ts#L447)

Builds the skill document body from the project's EslintConfigFeatures.
Three format variants are produced:

- `frontmatter` — YAML front-matter + Markdown (`.agent`, `.agents`, `.windsurf`)
- `cursor`      — Cursor MDC front-matter + Markdown
- `plain`       — pure Markdown, no front-matter (Claude Code, Copilot, Aider)

#### Parameters

##### features

`EslintConfigFeatures`

##### format

`"frontmatter"` \| `"cursor"` \| `"plain"`

#### Returns

`string`

***

### hono()

> **hono**(`options?`): `ConfigArray`

Defined in: [hono/src/index.ts:9](https://github.com/santi020k/eslint-config-basic/blob/0b5d79f40f1e8ee8a0de24aa1748711e1b98b1b5/packages/hono/src/index.ts#L9)

#### Parameters

##### options?

`HonoConfigOptions` = `{}`

#### Returns

`ConfigArray`

## References

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

### Library

Re-exports [Library](../core/src.md#library)

***

### markdown

Re-exports [markdown](../integrations/src.md#markdown)

***

### mdx

Re-exports [mdx](../integrations/src.md#mdx)

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
