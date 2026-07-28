---
title: "basic/src"
description: "@santi020k/eslint-config-basic"
---

## Interfaces

### AgentTarget

Defined in: [basic/src/agent-skill-generator.ts:9](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L9)

#### Properties

##### format

> **format**: `"cursor"` \| `"frontmatter"` \| `"kiro"` \| `"plain"`

Defined in: [basic/src/agent-skill-generator.ts:12](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L12)

Format variant used when generating content

##### label

> **label**: `string`

Defined in: [basic/src/agent-skill-generator.ts:15](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L15)

Human-readable label for logging

##### markerFolder

> **markerFolder**: `string`

Defined in: [basic/src/agent-skill-generator.ts:18](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L18)

Folder that must exist in cwd to be considered "present"

##### skillFile

> **skillFile**: `string`

Defined in: [basic/src/agent-skill-generator.ts:21](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L21)

File name for the generated skill

##### skillSubdir

> **skillSubdir**: `string`

Defined in: [basic/src/agent-skill-generator.ts:24](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L24)

Subdirectory inside the agent folder where the skill file is placed

***

### EslintConfigFeatures

Defined in: [basic/src/agent-skill-generator.ts:31](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L31)

Features extracted from the project's actual `eslint.config.js`.
All arrays hold display-friendly labels (e.g. `'TypeScript'`, `'React'`).

#### Properties

##### configFile

> **configFile**: `string` \| `null`

Defined in: [basic/src/agent-skill-generator.ts:34](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L34)

Path to the config file that was loaded, or null when falling back to detection

##### extensions

> **extensions**: `string`[]

Defined in: [basic/src/agent-skill-generator.ts:35](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L35)

##### formats

> **formats**: `string`[]

Defined in: [basic/src/agent-skill-generator.ts:36](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L36)

##### frameworks

> **frameworks**: `string`[]

Defined in: [basic/src/agent-skill-generator.ts:37](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L37)

##### libraries

> **libraries**: `string`[]

Defined in: [basic/src/agent-skill-generator.ts:38](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L38)

##### lintCommand

> **lintCommand**: `string`

Defined in: [basic/src/agent-skill-generator.ts:41](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L41)

The lint command found in the project's package.json scripts, or a sensible default

##### source

> **source**: `"config-file"` \| `"detection-fallback"`

Defined in: [basic/src/agent-skill-generator.ts:44](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L44)

Whether features came from the real config file or from package.json detection

##### testing

> **testing**: `string`[]

Defined in: [basic/src/agent-skill-generator.ts:46](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L46)

##### tools

> **tools**: `string`[]

Defined in: [basic/src/agent-skill-generator.ts:48](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L48)

##### typescript

> **typescript**: `boolean`

Defined in: [basic/src/agent-skill-generator.ts:50](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L50)

***

### GenerateSkillOptions

Defined in: [basic/src/agent-skill-generator.ts:53](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L53)

#### Properties

##### check?

> `optional` **check?**: `boolean`

Defined in: [basic/src/agent-skill-generator.ts:61](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L61)

Check mode — compare existing skill files against freshly generated
content without writing anything. Stale or missing files are reported
in [GenerateSkillResult.stale](#stale).

###### Default

```ts
false
```

##### createAgentsMd?

> `optional` **createAgentsMd?**: `boolean`

Defined in: [basic/src/agent-skill-generator.ts:68](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L68)

Create a root `AGENTS.md` when it does not exist yet, instead of only
updating an existing one.

###### Default

```ts
false
```

##### cwd?

> `optional` **cwd?**: `string`

Defined in: [basic/src/agent-skill-generator.ts:71](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L71)

Working directory — defaults to process.cwd()

##### force?

> `optional` **force?**: `boolean`

Defined in: [basic/src/agent-skill-generator.ts:77](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L77)

Overwrite files that already exist.

###### Default

```ts
false
```

***

### GenerateSkillResult

Defined in: [basic/src/agent-skill-generator.ts:80](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L80)

#### Properties

##### skipped

> **skipped**: `string`[]

Defined in: [basic/src/agent-skill-generator.ts:81](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L81)

##### stale

> **stale**: `string`[]

Defined in: [basic/src/agent-skill-generator.ts:84](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L84)

Files that are out of date (or missing) — only populated in check mode

##### written

> **written**: `string`[]

Defined in: [basic/src/agent-skill-generator.ts:86](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L86)

## Variables

### AGENT\_TARGETS

> `const` **AGENT\_TARGETS**: [`AgentTarget`](#agenttarget)[]

Defined in: [basic/src/agent-skill-generator.ts:96](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L96)

All AI coding-assistant agent folders that are probed for.
Add new entries here as new agents emerge — the generator picks them up
automatically on the next run.

***

### angular

> `const` **angular**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:106](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/frameworks.ts#L106)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### astro

> `const` **astro**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:107](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/frameworks.ts#L107)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### expo

> `const` **expo**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:108](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/frameworks.ts#L108)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### hono

> `const` **hono**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:109](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/frameworks.ts#L109)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### lit

> `const` **lit**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:110](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/frameworks.ts#L110)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### nest

> `const` **nest**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:111](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/frameworks.ts#L111)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### next

> `const` **next**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:112](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/frameworks.ts#L112)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### nuxt

> `const` **nuxt**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:113](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/frameworks.ts#L113)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### preact

> `const` **preact**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:114](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/frameworks.ts#L114)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### qwik

> `const` **qwik**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:115](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/frameworks.ts#L115)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### react

> `const` **react**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:116](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/frameworks.ts#L116)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### reactRouter

> `const` **reactRouter**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:117](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/frameworks.ts#L117)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### slidev

> `const` **slidev**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:118](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/frameworks.ts#L118)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### solid

> `const` **solid**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:119](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/frameworks.ts#L119)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### svelte

> `const` **svelte**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:120](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/frameworks.ts#L120)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### tanstackStart

> `const` **tanstackStart**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:121](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/frameworks.ts#L121)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### vite

> `const` **vite**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:122](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/frameworks.ts#L122)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

***

### vue

> `const` **vue**: (`options?`) => `Promise`\<`ConfigArray`\>

Defined in: [basic/src/frameworks.ts:123](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/frameworks.ts#L123)

#### Parameters

##### options?

`FrameworkOptions`

#### Returns

`Promise`\<`ConfigArray`\>

## Functions

### defineConfig()

> **defineConfig**(`options?`, ...`extraConfigs`): `Promise`\<`ConfigArray`\>

Defined in: [basic/src/index.ts:685](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/index.ts#L685)

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

Defined in: [basic/src/agent-skill-generator.ts:919](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L919)

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

Defined in: [basic/src/agent-skill-generator.ts:717](https://github.com/santi020k/eslint-config-basic/blob/f3910426142f2b667e078fc88687ddc4b0af2128/packages/basic/src/agent-skill-generator.ts#L717)

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

### coreConfig

Re-exports [coreConfig](../core/src.md#coreconfig)

***

### createCoreConfig

Re-exports [createCoreConfig](../core/src.md#createcoreconfig)

***

### createGitignoreConfig

Re-exports [createGitignoreConfig](../core/src.md#creategitignoreconfig)

***

### createImportGroups

Re-exports [createImportGroups](../core/src.md#createimportgroups)

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

### groups

Re-exports [groups](../core/src.md#groups)

***

### hasReactConfig

Re-exports [hasReactConfig](../core/src.md#hasreactconfig)

***

### ImportedFramework

Re-exports [ImportedFramework](../core/src.md#importedframework)

***

### ImportGroupOptions

Re-exports [ImportGroupOptions](../core/src.md#importgroupoptions)

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

### NextMode

Re-exports [NextMode](../core/src.md#nextmode)

***

### NextModeName

Re-exports [NextModeName](../core/src.md#nextmodename)

***

### NextModeOption

Re-exports [NextModeOption](../core/src.md#nextmodeoption)

***

### OptionalConfigMap

Re-exports [OptionalConfigMap](../core/src.md#optionalconfigmap)

***

### OptionalConfigName

Re-exports [OptionalConfigName](../core/src.md#optionalconfigname)

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

### ProjectConfigOptions

Re-exports [ProjectConfigOptions](../core/src.md#projectconfigoptions)

***

### ReactConfigKeys

Re-exports [ReactConfigKeys](../core/src.md#reactconfigkeys)

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

### Setting

Re-exports [Setting](../core/src.md#setting)

***

### SettingName

Re-exports [SettingName](../core/src.md#settingname)

***

### SettingOption

Re-exports [SettingOption](../core/src.md#settingoption)

***

### StrictMode

Re-exports [StrictMode](../core/src.md#strictmode)

***

### Testing

Re-exports [Testing](../core/src.md#testing)

***

### TestingName

Re-exports [TestingName](../core/src.md#testingname)

***

### TestingOption

Re-exports [TestingOption](../core/src.md#testingoption)

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

### typescriptConfig

Re-exports [typescriptConfig](../typescript/src.md#typescriptconfig)

***

### TypeScriptMode

Re-exports [TypeScriptMode](../core/src.md#typescriptmode)

***

### TypeScriptOptions

Re-exports [TypeScriptOptions](../core/src.md#typescriptoptions)
