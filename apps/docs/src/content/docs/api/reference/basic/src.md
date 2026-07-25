---
title: "basic/src"
description: "@santi020k/eslint-config-basic"
---

## Interfaces

### AgentTarget

Defined in: [basic/src/agent-skill-generator.ts:9](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L9)

#### Properties

##### format

> **format**: `"cursor"` \| `"frontmatter"` \| `"kiro"` \| `"plain"`

Defined in: [basic/src/agent-skill-generator.ts:12](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L12)

Format variant used when generating content

##### label

> **label**: `string`

Defined in: [basic/src/agent-skill-generator.ts:15](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L15)

Human-readable label for logging

##### markerFolder

> **markerFolder**: `string`

Defined in: [basic/src/agent-skill-generator.ts:18](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L18)

Folder that must exist in cwd to be considered "present"

##### skillFile

> **skillFile**: `string`

Defined in: [basic/src/agent-skill-generator.ts:21](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L21)

File name for the generated skill

##### skillSubdir

> **skillSubdir**: `string`

Defined in: [basic/src/agent-skill-generator.ts:24](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L24)

Subdirectory inside the agent folder where the skill file is placed

***

### EslintConfigFeatures

Defined in: [basic/src/agent-skill-generator.ts:31](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L31)

Features extracted from the project's actual `eslint.config.js`.
All arrays hold display-friendly labels (e.g. `'TypeScript'`, `'React'`).

#### Properties

##### configFile

> **configFile**: `string` \| `null`

Defined in: [basic/src/agent-skill-generator.ts:34](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L34)

Path to the config file that was loaded, or null when falling back to detection

##### extensions

> **extensions**: `string`[]

Defined in: [basic/src/agent-skill-generator.ts:35](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L35)

##### formats

> **formats**: `string`[]

Defined in: [basic/src/agent-skill-generator.ts:36](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L36)

##### frameworks

> **frameworks**: `string`[]

Defined in: [basic/src/agent-skill-generator.ts:37](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L37)

##### libraries

> **libraries**: `string`[]

Defined in: [basic/src/agent-skill-generator.ts:38](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L38)

##### lintCommand

> **lintCommand**: `string`

Defined in: [basic/src/agent-skill-generator.ts:41](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L41)

The lint command found in the project's package.json scripts, or a sensible default

##### source

> **source**: `"config-file"` \| `"detection-fallback"`

Defined in: [basic/src/agent-skill-generator.ts:44](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L44)

Whether features came from the real config file or from package.json detection

##### testing

> **testing**: `string`[]

Defined in: [basic/src/agent-skill-generator.ts:46](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L46)

##### tools

> **tools**: `string`[]

Defined in: [basic/src/agent-skill-generator.ts:48](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L48)

##### typescript

> **typescript**: `boolean`

Defined in: [basic/src/agent-skill-generator.ts:50](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L50)

***

### GenerateSkillOptions

Defined in: [basic/src/agent-skill-generator.ts:53](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L53)

#### Properties

##### check?

> `optional` **check?**: `boolean`

Defined in: [basic/src/agent-skill-generator.ts:61](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L61)

Check mode — compare existing skill files against freshly generated
content without writing anything. Stale or missing files are reported
in [GenerateSkillResult.stale](#stale).

###### Default

```ts
false
```

##### createAgentsMd?

> `optional` **createAgentsMd?**: `boolean`

Defined in: [basic/src/agent-skill-generator.ts:68](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L68)

Create a root `AGENTS.md` when it does not exist yet, instead of only
updating an existing one.

###### Default

```ts
false
```

##### cwd?

> `optional` **cwd?**: `string`

Defined in: [basic/src/agent-skill-generator.ts:71](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L71)

Working directory — defaults to process.cwd()

##### force?

> `optional` **force?**: `boolean`

Defined in: [basic/src/agent-skill-generator.ts:77](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L77)

Overwrite files that already exist.

###### Default

```ts
false
```

***

### GenerateSkillResult

Defined in: [basic/src/agent-skill-generator.ts:80](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L80)

#### Properties

##### skipped

> **skipped**: `string`[]

Defined in: [basic/src/agent-skill-generator.ts:81](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L81)

##### stale

> **stale**: `string`[]

Defined in: [basic/src/agent-skill-generator.ts:84](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L84)

Files that are out of date (or missing) — only populated in check mode

##### written

> **written**: `string`[]

Defined in: [basic/src/agent-skill-generator.ts:86](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L86)

## Variables

### AGENT\_TARGETS

> `const` **AGENT\_TARGETS**: [`AgentTarget`](#agenttarget)[]

Defined in: [basic/src/agent-skill-generator.ts:96](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L96)

All AI coding-assistant agent folders that are probed for.
Add new entries here as new agents emerge — the generator picks them up
automatically on the next run.

***

### angular

> `const` **angular**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:109](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L109)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### ~~angularConfig~~

> `const` **angularConfig**: (`options?`) => `Promise`\<`ConfigArray`\> = `angular`

Defined in: [basic/src/frameworks.ts:136](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L136)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

#### Deprecated

Use `angular` instead.

***

### astro

> `const` **astro**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:110](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L110)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### defineConfig

> `const` **defineConfig**: (`options?`, ...`extraConfigs`) => `Promise`\<`ConfigArray`\> = `eslintConfig`

Defined in: [basic/src/index.ts:782](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/index.ts#L782)

Alias for `eslintConfig()` that reads naturally in `eslint.config.*` files.

Generates the ESLint configuration array, applying configurations
and integration settings based on the input configuration.

#### Parameters

##### options?

[`EslintConfigOptions`](../core/src.md#eslintconfigoptions)

Configuration and integration settings

##### extraConfigs

...[`ConfigInput`](../core/src.md#configinput)[]

Local flat-config overrides appended after generated config

#### Returns

`Promise`\<`ConfigArray`\>

The final ESLint configuration array

***

### expo

> `const` **expo**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:111](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L111)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### ~~expoConfig~~

> `const` **expoConfig**: (`options?`) => `Promise`\<`ConfigArray`\> = `expo`

Defined in: [basic/src/frameworks.ts:139](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L139)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

#### Deprecated

Use `expo` instead.

***

### hono

> `const` **hono**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:112](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L112)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### lit

> `const` **lit**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:113](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L113)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### nest

> `const` **nest**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:114](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L114)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### ~~nestConfig~~

> `const` **nestConfig**: (`options?`) => `Promise`\<`ConfigArray`\> = `nest`

Defined in: [basic/src/frameworks.ts:142](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L142)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

#### Deprecated

Use `nest` instead.

***

### next

> `const` **next**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:115](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L115)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### ~~nextConfig~~

> `const` **nextConfig**: (`options?`) => `Promise`\<`ConfigArray`\> = `next`

Defined in: [basic/src/frameworks.ts:145](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L145)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

#### Deprecated

Use `next` instead.

***

### nuxt

> `const` **nuxt**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:116](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L116)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### preact

> `const` **preact**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:117](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L117)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### ~~preactConfig~~

> `const` **preactConfig**: (`options?`) => `Promise`\<`ConfigArray`\> = `preact`

Defined in: [basic/src/frameworks.ts:148](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L148)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

#### Deprecated

Use `preact` instead.

***

### qwik

> `const` **qwik**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:118](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L118)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### react

> `const` **react**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:119](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L119)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### ~~reactConfig~~

> `const` **reactConfig**: (`options?`) => `Promise`\<`ConfigArray`\> = `react`

Defined in: [basic/src/frameworks.ts:151](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L151)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

#### Deprecated

Use `react` instead.

***

### reactRouter

> `const` **reactRouter**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:120](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L120)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### ~~remix~~

> `const` **remix**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:133](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L133)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

#### Deprecated

Remix merged into React Router v7. Use `reactRouter` (the
`react-router` framework key) instead. This alias loads the legacy Remix
config and will be removed in the next major version.

***

### slidev

> `const` **slidev**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:121](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L121)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### solid

> `const` **solid**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:122](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L122)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### ~~solidConfig~~

> `const` **solidConfig**: (`options?`) => `Promise`\<`ConfigArray`\> = `solid`

Defined in: [basic/src/frameworks.ts:154](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L154)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

#### Deprecated

Use `solid` instead.

***

### svelte

> `const` **svelte**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:123](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L123)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### ~~svelteConfig~~

> `const` **svelteConfig**: (`options?`) => `Promise`\<`ConfigArray`\> = `svelte`

Defined in: [basic/src/frameworks.ts:157](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L157)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

#### Deprecated

Use `svelte` instead.

***

### tanstackStart

> `const` **tanstackStart**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:124](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L124)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### vite

> `const` **vite**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:125](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L125)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### vue

> `const` **vue**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:126](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L126)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### ~~vueConfig~~

> `const` **vueConfig**: (`options?`) => `Promise`\<`ConfigArray`\> = `vue`

Defined in: [basic/src/frameworks.ts:160](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/frameworks.ts#L160)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

#### Deprecated

Use `vue` instead.

## Functions

### eslintConfig()

> **eslintConfig**(`options?`, ...`extraConfigs`): `Promise`\<`ConfigArray`\>

Defined in: [basic/src/index.ts:635](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/index.ts#L635)

Generates the ESLint configuration array, applying configurations
and integration settings based on the input configuration.

#### Parameters

##### options?

[`EslintConfigOptions`](../core/src.md#eslintconfigoptions)

Configuration and integration settings

##### extraConfigs

...[`ConfigInput`](../core/src.md#configinput)[]

Local flat-config overrides appended after generated config

#### Returns

`Promise`\<`ConfigArray`\>

The final ESLint configuration array

***

### generateAgentSkills()

> **generateAgentSkills**(`opts?`): `Promise`\<[`GenerateSkillResult`](#generateskillresult)\>

Defined in: [basic/src/agent-skill-generator.ts:918](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L918)

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
process.stdout.write(`Written to: ${result.written}\n`)
```

***

### generateSkillContent()

> **generateSkillContent**(`features`, `format`): `string`

Defined in: [basic/src/agent-skill-generator.ts:716](https://github.com/santi020k/eslint-config-basic/blob/266d48355c66c0ce16df1d2a77fbe409ba9545ab/packages/basic/src/agent-skill-generator.ts#L716)

Builds the skill document body from the project's [EslintConfigFeatures](#eslintconfigfeatures).
Four format variants are produced:

- `frontmatter` — YAML front-matter + Markdown (`.agent`, `.agents`, `.windsurf`)
- `cursor`      — Cursor MDC front-matter + Markdown
- `kiro`        — Kiro steering front-matter (`inclusion: always`) + Markdown
- `plain`       — pure Markdown, no front-matter (Claude Code, Copilot, Aider, Gemini, Cline, Roo Code)

#### Parameters

##### features

[`EslintConfigFeatures`](#eslintconfigfeatures)

##### format

`"cursor"` \| `"frontmatter"` \| `"kiro"` \| `"plain"`

#### Returns

`string`

## References

### a11y

Re-exports [a11y](../integrations/src.md#a11y)

***

### aiSdk

Re-exports [aiSdk](../integrations/src.md#aisdk)

***

### astroDoctor

Re-exports [astroDoctor](../integrations/src.md#astrodoctor)

***

### autogen

Re-exports [autogen](../integrations/src.md#autogen)

***

### bestPractices

Re-exports [bestPractices](../integrations/src.md#bestpractices)

***

### biome

Re-exports [biome](../integrations/src.md#biome)

***

### boundaries

Re-exports [boundaries](../integrations/src.md#boundaries)

***

### command

Re-exports [command](../integrations/src.md#command)

***

### compat

Re-exports [compat](../integrations/src.md#compat)

***

### coreConfig

Re-exports [coreConfig](../core/src.md#coreconfig)

***

### createCoreConfig

Re-exports [createCoreConfig](../core/src.md#createcoreconfig)

***

### createImportGroups

Re-exports [createImportGroups](../core/src.md#createimportgroups)

***

### cspell

Re-exports [cspell](../integrations/src.md#cspell)

***

### css

Re-exports [css](../integrations/src.md#css)

***

### cypress

Re-exports [cypress](../integrations/src.md#cypress)

***

### deMorgan

Re-exports [deMorgan](../integrations/src.md#demorgan)

***

### depend

Re-exports [depend](../integrations/src.md#depend)

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

### docker

Re-exports [docker](../integrations/src.md#docker)

***

### drizzle

Re-exports [drizzle](../integrations/src.md#drizzle)

***

### EslintConfigOptions

Re-exports [EslintConfigOptions](../core/src.md#eslintconfigoptions)

***

### Extension

Re-exports [Extension](../core/src.md#extension)

***

### ExtensionName

Re-exports [ExtensionName](../core/src.md#extensionname)

***

### ExtensionOption

Re-exports [ExtensionOption](../core/src.md#extensionoption)

***

### FlatConfigArray

Re-exports [FlatConfigArray](../core/src.md#flatconfigarray)

***

### Format

Re-exports [Format](../core/src.md#format)

***

### FormatName

Re-exports [FormatName](../core/src.md#formatname)

***

### FormatOption

Re-exports [FormatOption](../core/src.md#formatoption)

***

### getGlobalsForRuntime

Re-exports [getGlobalsForRuntime](../core/src.md#getglobalsforruntime)

***

### githubActions

Re-exports [githubActions](../integrations/src.md#githubactions)

***

### gitignore

Re-exports [gitignore](../core/src.md#gitignore)

***

### googleGenAi

Re-exports [googleGenAi](../integrations/src.md#googlegenai)

***

### graphql

Re-exports [graphql](../integrations/src.md#graphql)

***

### groups

Re-exports [groups](../core/src.md#groups)

***

### hasReactConfig

Re-exports [hasReactConfig](../core/src.md#hasreactconfig)

***

### html

Re-exports [html](../integrations/src.md#html)

***

### i18next

Re-exports [i18next](../integrations/src.md#i18next)

***

### ImportedFramework

Re-exports [ImportedFramework](../core/src.md#importedframework)

***

### ImportGroupOptions

Re-exports [ImportGroupOptions](../core/src.md#importgroupoptions)

***

### jest

Re-exports [jest](../integrations/src.md#jest)

***

### jestDom

Re-exports [jestDom](../integrations/src.md#jestdom)

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

### LibraryName

Re-exports [LibraryName](../core/src.md#libraryname)

***

### LibraryOption

Re-exports [LibraryOption](../core/src.md#libraryoption)

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

### NextMode

Re-exports [NextMode](../core/src.md#nextmode)

***

### NextModeName

Re-exports [NextModeName](../core/src.md#nextmodename)

***

### NextModeOption

Re-exports [NextModeOption](../core/src.md#nextmodeoption)

***

### node

Re-exports [node](../integrations/src.md#node)

***

### noOnlyTests

Re-exports [noOnlyTests](../integrations/src.md#noonlytests)

***

### nx

Re-exports [nx](../integrations/src.md#nx)

***

### openAiAgents

Re-exports [openAiAgents](../integrations/src.md#openaiagents)

***

### OptionalConfigMap

Re-exports [OptionalConfigMap](../core/src.md#optionalconfigmap)

***

### OptionalConfigName

Re-exports [OptionalConfigName](../core/src.md#optionalconfigname)

***

### oxlint

Re-exports [oxlint](../integrations/src.md#oxlint)

***

### packageJson

Re-exports [packageJson](../integrations/src.md#packagejson)

***

### perfectionist

Re-exports [perfectionist](../integrations/src.md#perfectionist)

***

### playwright

Re-exports [playwright](../integrations/src.md#playwright)

***

### pnpm

Re-exports [pnpm](../integrations/src.md#pnpm)

***

### Preset

Re-exports [Preset](../core/src.md#preset)

***

### PresetName

Re-exports [PresetName](../core/src.md#presetname)

***

### PresetOption

Re-exports [PresetOption](../core/src.md#presetoption)

***

### prettier

Re-exports [prettier](../integrations/src.md#prettier)

***

### prisma

Re-exports [prisma](../integrations/src.md#prisma)

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

### RuntimeName

Re-exports [RuntimeName](../core/src.md#runtimename)

***

### RuntimeOption

Re-exports [RuntimeOption](../core/src.md#runtimeoption)

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

### SettingName

Re-exports [SettingName](../core/src.md#settingname)

***

### SettingOption

Re-exports [SettingOption](../core/src.md#settingoption)

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

### TestingName

Re-exports [TestingName](../core/src.md#testingname)

***

### TestingOption

Re-exports [TestingOption](../core/src.md#testingoption)

***

### toml

Re-exports [toml](../integrations/src.md#toml)

***

### Tool

Re-exports [Tool](../core/src.md#tool)

***

### ToolName

Re-exports [ToolName](../core/src.md#toolname)

***

### ToolOption

Re-exports [ToolOption](../core/src.md#tooloption)

***

### tsConfig

Renames and re-exports [typescriptConfig](../typescript/src.md#typescriptconfig)

***

### turbo

Re-exports [turbo](../integrations/src.md#turbo)

***

### typeorm

Re-exports [typeorm](../integrations/src.md#typeorm)

***

### typescriptConfig

Re-exports [typescriptConfig](../typescript/src.md#typescriptconfig)

***

### TypeScriptMode

Re-exports [TypeScriptMode](../core/src.md#typescriptmode)

***

### TypeScriptOptions

Re-exports [TypeScriptOptions](../core/src.md#typescriptoptions)

***

### unicorn

Re-exports [unicorn](../integrations/src.md#unicorn)

***

### vitest

Re-exports [vitest](../integrations/src.md#vitest)

***

### yaml

Re-exports [yaml](../integrations/src.md#yaml)

***

### zod

Re-exports [zod](../integrations/src.md#zod)
