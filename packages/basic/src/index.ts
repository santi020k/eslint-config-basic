import { existsSync } from 'node:fs'
import { join } from 'node:path'

import {
  coreConfig,
  createCoreConfig,
  type DetectedFrameworkName,
  type DetectionOptions,
  detectProjectOptions,
  type EslintConfigOptions,
  Extension,
  type FlatConfigArray,
  Format,
  gitignore,
  type ImportedFramework,
  Library,
  NextMode,
  Preset,
  Runtime,
  Setting,
  type TailwindOptions,
  Testing,
  Tool,
  type TypeScriptMode,
  type TypeScriptOptions
} from '@santi020k/eslint-config-core'
import { tailwind as tailwindIntegration } from '@santi020k/eslint-config-integrations'
import { createTypescriptConfig } from '@santi020k/eslint-config-typescript'

import type { TSESLint } from '@typescript-eslint/utils'

import { applyStrictMode } from './compose.js'
import { createDetectedFrameworkFlags, type FrameworkOptions } from './frameworks.js'
import { getIntegrationConfigs, getPrettierConfig } from './integrations.js'
import { resolveFramework, resolvePreset } from './resolvers.js'

export type { AgentTarget, EslintConfigFeatures, GenerateSkillOptions, GenerateSkillResult } from './agent-skill-generator.js'
export {
  AGENT_TARGETS,
  generateAgentSkills,
  generateSkillContent
} from './agent-skill-generator.js'
// Lazy framework factories (v2 naming: bare framework names) plus
// deprecated *Config aliases for the old mixed naming.
/* eslint-disable @typescript-eslint/no-deprecated -- deliberate re-export of deprecated v1 aliases for migration */
export {
  angular,
  angularConfig,
  astro,
  expo,
  expoConfig,
  hono,
  lit,
  nest,
  nestConfig,
  next,
  nextConfig,
  nuxt,
  preact,
  preactConfig,
  qwik,
  react,
  reactConfig,
  reactRouter,
  remix,
  slidev,
  solid,
  solidConfig,
  svelte,
  svelteConfig,
  tanstackStart,
  vite,
  vue,
  vueConfig
} from './frameworks.js'
/* eslint-enable @typescript-eslint/no-deprecated */

// Re-export core types and utilities
export type {
  DetectedFrameworkName,
  DetectionOptions,
  EslintConfigOptions,
  ExtensionName,
  ExtensionOption,
  FlatConfigArray,
  FormatName,
  FormatOption,
  ImportedFramework,
  ImportGroupOptions,
  LibraryName,
  LibraryOption,
  NextModeName,
  NextModeOption,
  OptionalConfigMap,
  OptionalConfigName,
  PresetName,
  PresetOption,
  RuntimeName,
  RuntimeOption,
  SettingName,
  SettingOption,
  StrictMode,
  TestingName,
  TestingOption,
  ToolName,
  ToolOption,
  TypeScriptMode,
  TypeScriptOptions
} from '@santi020k/eslint-config-core'
export {
  coreConfig,
  createCoreConfig,
  createImportGroups,
  detectProjectOptions,
  Extension,
  Format,
  getGlobalsForRuntime,
  gitignore,
  groups,
  hasReactConfig,
  jsConfig,
  Library,
  NextMode,
  Preset,
  ReactConfigKeys,
  Runtime,
  Setting,
  Testing,
  Tool
} from '@santi020k/eslint-config-core'

// Re-export integrations
export {
  a11y,
  aiSdk,
  autogen,
  bestPractices,
  biome,
  command,
  compat,
  cspell,
  css,
  cypress,
  deMorgan,
  depend,
  docker,
  drizzle,
  githubActions,
  googleGenAi,
  graphql,
  html,
  i18next,
  jest,
  jestDom,
  jsdoc,
  jsonc,
  langchain,
  llamaIndex,
  markdown,
  mastra,
  mcp,
  mdx,
  mikroOrm,
  node,
  noOnlyTests,
  nx,
  openAiAgents,
  oxlint,
  packageJson,
  perfectionist,
  playwright,
  pnpm,
  prettier,
  prisma,
  regexp,
  security,
  sequelize,
  sonarjs,
  stencil,
  storybook,
  swagger,
  tailwind,
  tanstackQuery,
  tanstackRouter,
  testingLibrary,
  toml,
  turbo,
  typeorm,
  unicorn,
  vitest,
  yaml,
  zod
} from '@santi020k/eslint-config-integrations'

// Re-export framework configs
export { tsConfig, typescriptConfig } from '@santi020k/eslint-config-typescript'

const toUniqueArray = <T>(values: T[]): T[] => [...new Set(values)]

const DEFAULT_IGNORES = [
  '**/dist/**',
  '**/build/**',
  '**/coverage/**',
  '**/.turbo/**',
  '**/.next/**',
  '**/.open-next/**',
  '**/.astro/**',
  '**/.svelte-kit/**',
  '**/.vercel/**',
  '**/.wrangler/**',
  '**/playwright-report/**',
  '**/test-results/**',
  '**/node_modules/**',
  '**/tsconfig.tsbuildinfo',
  // Package manager lock files (machine-generated, slow to lint)
  '**/pnpm-lock.yaml',
  '**/yarn.lock',
  '**/package-lock.json',
  '**/bun.lock',
  '**/bun.lockb',
  // AI coding-assistant artifacts (rule/skill folders managed by tools, not source code)
  '**/.agent/**',
  '**/.agents/**',
  '**/.aider*',
  '**/.aider*/**',
  '**/.claude/**',
  '**/.clinerules/**',
  '**/.codex/**',
  '**/.copilot/**',
  '**/.cursor/**',
  '**/.gemini/**',
  '**/.kiro/**',
  '**/.opencode/**',
  '**/.roo/**',
  '**/.windsurf/**'
]

const GENERATED_CODE_IGNORES = [
  '**/__generated__/**',
  '**/generated/**',
  '**/codegen/**',
  '**/*.generated.*',
  '**/*.gen.*',
  '**/graphql.ts',
  '**/graphql.tsx',
  '**/gql/**',
  '**/.prisma/**'
]

const TAILWIND_ENTRYPOINT_CANDIDATES = [
  'src/styles/global.css',
  'src/app/globals.css',
  'src/globals.css',
  'src/index.css',
  'app/globals.css',
  'styles/global.css'
]

type ConfigInput = false | null | TSESLint.FlatConfig.Config | TSESLint.FlatConfig.ConfigArray | undefined

type OptionalBucket = 'extensions' | 'formats' | 'libraries' | 'testing' | 'tools'

const OPTIONAL_BUCKETS = {
  extensions: Object.values(Extension),
  formats: Object.values(Format),
  libraries: Object.values(Library),
  testing: Object.values(Testing),
  tools: Object.values(Tool)
} as const

const flattenConfigInputs = (configs: ConfigInput[]): TSESLint.FlatConfig.ConfigArray => configs.flatMap(config => {
  if (!config) return []

  return Array.isArray(config) ? config : [config]
})

const mergeArrayOption = <T>(
  detectedValues: T[],
  presetValues: T[] | undefined,
  explicitValues: T[] | undefined,
  strategy: 'merge' | 'replace'
): T[] => {
  if (strategy === 'replace') {
    if (explicitValues) return toUniqueArray(explicitValues)

    if (presetValues) return toUniqueArray(presetValues)

    return toUniqueArray(detectedValues)
  }

  return toUniqueArray([
    ...detectedValues,
    ...(presetValues ?? []),
    ...(explicitValues ?? [])
  ])
}

const isOptionalBucketValue = (
  bucket: OptionalBucket,
  value: string
// eslint-disable-next-line security/detect-object-injection -- bucket is constrained to OptionalBucket union; all keys are statically known
): boolean => (OPTIONAL_BUCKETS[bucket] as readonly string[]).includes(value)

const getFeatureEntries = (
  options: EslintConfigOptions | undefined,
  bucket: OptionalBucket,
  enabled: boolean
): string[] => [
  ...Object.entries(options?.features ?? {}),
  ...Object.entries(options?.integrations ?? {})
]
  .filter(([name, value]) => value === enabled && isOptionalBucketValue(bucket, name))
  .map(([name]) => name)

const applyFeatureDisables = <T extends string>(
  values: T[],
  options: EslintConfigOptions | undefined,
  bucket: OptionalBucket
): T[] => {
  const disabled = new Set(getFeatureEntries(options, bucket, false))

  return values.filter(value => !disabled.has(value))
}

const mergeOptionalBucket = <T extends string>(
  bucket: OptionalBucket,
  detectedValues: T[],
  presetValues: T[] | undefined,
  explicitValues: T[] | undefined,
  options: EslintConfigOptions | undefined,
  strategy: 'merge' | 'replace'
): T[] => {
  const featureEntries = getFeatureEntries(options, bucket, true) as T[]

  const combined = (explicitValues !== undefined || featureEntries.length > 0)
    ? [...(explicitValues ?? []), ...featureEntries]
    : undefined

  return applyFeatureDisables(
    mergeArrayOption(detectedValues, presetValues, combined, strategy),
    options,
    bucket
  )
}

const mergeFrameworkOption = (
  detectedFrameworks: Record<string, ImportedFramework>,
  presetFrameworks: Record<string, ImportedFramework> | undefined,
  explicitFrameworks: Record<string, ImportedFramework> | undefined,
  strategy: 'merge' | 'replace'
): NonNullable<EslintConfigOptions['frameworks']> => {
  if (strategy === 'replace') {
    if (explicitFrameworks) return { ...explicitFrameworks }

    if (presetFrameworks) return { ...presetFrameworks }

    return { ...detectedFrameworks }
  }

  return {
    ...detectedFrameworks,
    ...(presetFrameworks ?? {}),
    ...(explicitFrameworks ?? {})
  }
}

const resolveDetectionOptions = (
  detection: EslintConfigOptions['detection'],
  defaults: Partial<Required<DetectionOptions>> = {}
): Required<DetectionOptions> => {
  const defaultControls = {
    extensions: true,
    formats: true,
    frameworks: true,
    libraries: true,
    nextMode: true,
    projects: false,
    runtime: true,
    testing: true,
    tools: true,
    typescript: true,
    ...defaults
  }

  if (detection === false) {
    return Object.fromEntries(
      Object.keys(defaultControls).map(key => [key, false])
    ) as Required<DetectionOptions>
  }

  if (detection === true || detection === undefined) {
    return defaultControls
  }

  return {
    ...defaultControls,
    ...detection
  }
}

const applyArrayControls = (controls: Required<DetectionOptions>, detected: EslintConfigOptions) => ({
  detectedFrameworks: controls.frameworks ? detected.detectedFrameworks : [],
  extensions: controls.extensions ? detected.extensions : [],
  formats: controls.formats ? detected.formats : [],
  libraries: controls.libraries ? detected.libraries : [],
  testing: controls.testing ? detected.testing : [],
  tools: controls.tools ? detected.tools : []
})

const applyScalarControls = (controls: Required<DetectionOptions>, detected: EslintConfigOptions) => ({
  nextMode: controls.nextMode ? detected.nextMode : undefined,
  preset: controls.typescript && controls.runtime ? detected.preset : undefined,
  projects: controls.projects ? detected.projects : undefined,
  runtime: controls.runtime ? detected.runtime : undefined,
  typescript: controls.typescript ? detected.typescript : false
})

const applyDetectionControls = (
  detected: EslintConfigOptions,
  detection: EslintConfigOptions['detection'],
  defaults?: Partial<Required<DetectionOptions>>
): EslintConfigOptions => {
  const controls = resolveDetectionOptions(detection, defaults)

  return { ...detected, ...applyArrayControls(controls, detected), ...applyScalarControls(controls, detected) }
}

const getStrictMode = (
  explicitStrict: EslintConfigOptions['strict'],
  presetStrict: EslintConfigOptions['strict']
): EslintConfigOptions['strict'] => explicitStrict ?? presetStrict ?? false

const applyStrictProfileDefaults = (
  extensions: Extension[],
  strict: EslintConfigOptions['strict']
): Extension[] => {
  if (strict !== 'pedantic') return extensions

  return toUniqueArray([...extensions, Extension.BestPractices])
}

const hasTsconfig = (rootDir: string): boolean => [
  'tsconfig.eslint.json',
  'tsconfig.json',
  'tsconfig.base.json',
  'tsconfig.app.json',
  'tsconfig.node.json'
].some(fileName => existsSync(join(rootDir, fileName)))

const resolveTypescriptOptions = (
  typescript: EslintConfigOptions['typescript']
): false | (TypeScriptOptions & { mode: Exclude<TypeScriptMode, 'off'> }) => {
  if (!typescript || typescript === 'off') return false

  if (typescript === true) return { mode: 'type-aware' }

  if (typeof typescript === 'string') return { mode: typescript }

  if (typescript.mode === 'off') return false

  return {
    ...typescript,
    mode: typescript.mode ?? 'type-aware'
  }
}

const resolveTsconfigRootDir = (
  rootDir: string,
  typescript: EslintConfigOptions['typescript'],
  explicitRootDir: string | undefined
): string | undefined => {
  if (explicitRootDir) return explicitRootDir

  return resolveTypescriptOptions(typescript) && hasTsconfig(rootDir) ? rootDir : undefined
}

const findTailwindEntryPoint = (rootDir: string): string | undefined => TAILWIND_ENTRYPOINT_CANDIDATES.find(
  candidate => existsSync(join(rootDir, candidate))
)

const buildTailwindResult = (options: TailwindOptions, entryPoint: string | undefined): TailwindOptions => ({
  detectComponentClasses: options.detectComponentClasses ?? true,
  ...(entryPoint ? { entryPoint } : {}),
  ...(options.ignore?.length ? { ignore: options.ignore } : {}),
  ...(options.noUnknownClasses === undefined ? {} : { noUnknownClasses: options.noUnknownClasses })
})

const resolveTailwindOptions = (
  rootDir: string,
  tailwind: EslintConfigOptions['tailwind']
): TailwindOptions | undefined => {
  if (tailwind === false) return undefined

  const options = tailwind ?? {}
  const entryPoint = options.entryPoint ?? findTailwindEntryPoint(rootDir)

  if (!entryPoint &&
    options.detectComponentClasses === undefined &&
    !options.ignore?.length &&
    options.noUnknownClasses === undefined) return undefined

  return buildTailwindResult(options, entryPoint)
}

const createNoUnknownClassesRule = (
  tailwindOptions: TailwindOptions,
  unknownClassOptions: Record<string, string | string[]>,
  hasUnknownClassOptions: boolean
): TSESLint.FlatConfig.RuleEntry | undefined => {
  if (!hasUnknownClassOptions && tailwindOptions.noUnknownClasses === undefined) return undefined

  const severity = tailwindOptions.noUnknownClasses ?? 'error'

  if (severity === false) return 'off'

  return hasUnknownClassOptions ? [severity, unknownClassOptions] : severity
}

const loadTailwindPlugins = async (): Promise<NonNullable<TSESLint.FlatConfig.Config['plugins']>> => {
  const tailwindConfigs = await tailwindIntegration()
  const pluginConfig = tailwindConfigs.find(config => config.plugins?.['better-tailwindcss'])

  return pluginConfig?.plugins ?? {}
}

const createTailwindSettingsConfig = async (
  tailwindOptions: TailwindOptions
): Promise<TSESLint.FlatConfig.Config> => {
  const { noUnknownClasses: _noUnknownClasses, ...settingsOptions } = tailwindOptions

  const unknownClassOptions = {
    ...(tailwindOptions.entryPoint ? { entryPoint: tailwindOptions.entryPoint } : {}),
    ...(tailwindOptions.ignore?.length ? { ignore: tailwindOptions.ignore } : {})
  }

  const hasUnknownClassOptions = Object.keys(unknownClassOptions).length > 0
  const noUnknownClassesRule = createNoUnknownClassesRule(tailwindOptions, unknownClassOptions, hasUnknownClassOptions)

  return {
    name: 'eslint-config-basic/tailwind-settings',
    plugins: await loadTailwindPlugins(),
    ...(noUnknownClassesRule === undefined ?
      {} :
      { rules: { 'better-tailwindcss/no-unknown-classes': noUnknownClassesRule } }),
    settings: {
      'better-tailwindcss': settingsOptions
    }
  }
}

const scopeFilePattern = (projectPath: string, pattern: unknown): unknown => {
  if (typeof pattern === 'string') {
    const isNegated = pattern.startsWith('!')
    const basePattern = (isNegated ? pattern.slice(1) : pattern).replace(/^\.\//, '')
    const scoped = `${projectPath.replace(/\/$/, '')}/${basePattern}`

    return isNegated ? `!${scoped}` : scoped
  }

  if (Array.isArray(pattern)) {
    return pattern.map(item => scopeFilePattern(projectPath, item))
  }

  return pattern
}

const scopeConfigToProject = (
  config: TSESLint.FlatConfig.Config,
  projectPath: string
): TSESLint.FlatConfig.Config => {
  if ('ignores' in config && !config.files) {
    return {
      ...config,
      ignores: config.ignores?.map(pattern => scopeFilePattern(projectPath, pattern) as string)
    }
  }

  return {
    ...config,
    files: Array.isArray(config.files) ?
      config.files.map((pattern: unknown) => scopeFilePattern(projectPath, pattern)) as TSESLint.FlatConfig.Config['files'] :
      [`${projectPath.replace(/\/$/, '')}/**/*`]
  }
}


const patchImportGroupsConfig = (
  config: TSESLint.FlatConfig.Config,
  workspacePatterns: string[]
): TSESLint.FlatConfig.Config => {
  const rule = config.rules?.['simple-import-sort/imports']

  if (!Array.isArray(rule) || !rule[1]) return config

  const ruleOpts = rule[1] as { groups?: string[][] }
  const existingGroups = ruleOpts.groups ?? []

  if (existingGroups.length === 0) return config

  const externalIdx = existingGroups.findIndex(g => g.some(p => p.includes('^@?\\w')))
  const insertAt = externalIdx >= 0 ? externalIdx : existingGroups.length

  return {
    ...config,
    rules: {
      ...config.rules,
      'simple-import-sort/imports': [
        rule[0],
        { ...ruleOpts, groups: [...existingGroups.slice(0, insertAt), workspacePatterns, ...existingGroups.slice(insertAt)] }
      ] as TSESLint.FlatConfig.RuleEntry
    }
  }
}

const patchImportGroups = (
  allConfigs: TSESLint.FlatConfig.ConfigArray,
  workspacePrefixes: string[]
): TSESLint.FlatConfig.ConfigArray => {
  const workspacePatterns = workspacePrefixes.map(
    p => `^${p.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&')}(/.*|$)`
  )

  return allConfigs.map(item =>
    Array.isArray(item) ? item : patchImportGroupsConfig(item, workspacePatterns)
  )
}

const TESTING_CONFIG_NAMES: Partial<Record<Testing, string[]>> = {
  [Testing.Cypress]: ['integrations/cypress'],
  [Testing.Jest]: ['integrations/jest'],
  [Testing.JestDom]: ['eslint-config-integrations/jest-dom'],
  [Testing.Playwright]: ['integrations/playwright'],
  [Testing.TestingLibrary]: ['integrations/testing-library'],
  [Testing.Vitest]: ['integrations/vitest']
}

const applyTestingFileOverrides = (
  configs: FlatConfigArray,
  testingFiles: EslintConfigOptions['testingFiles']
): FlatConfigArray => {
  if (!testingFiles) return configs

  const entries = Object.entries(testingFiles).filter(([, files]) => files.length > 0)

  if (entries.length === 0) return configs

  return configs.map(config => {
    const match = entries.find(([testingName]) =>
      (TESTING_CONFIG_NAMES[testingName as Testing] ?? []).includes(config.name ?? '')
    )

    if (!match) return config

    const [, files] = match

    return {
      ...config,
      files
    }
  })
}

const resolveConfigSetup = (options: EslintConfigOptions | undefined) => ({
  autoFrameworks: options?.autoFrameworks ?? true,
  detectRootDir: options?.detectRootDir ?? options?.tsconfigRootDir,
  optionMergeStrategy: options?.optionMergeStrategy ?? 'merge',
  requestedPreset: options?.preset
})

const resolveUniqueLibraries = (
  libraries: Library[],
  tailwind: EslintConfigOptions['tailwind']
): Library[] => {
  const uniqueLibraries = [...new Set(libraries)]

  if (tailwind === false) return uniqueLibraries.filter(library => library !== Library.Tailwind)

  if (!tailwind) return uniqueLibraries

  return [...new Set([...uniqueLibraries, Library.Tailwind])]
}

const resolvePresetMeta = (
  requestedPreset: EslintConfigOptions['preset'],
  detected: EslintConfigOptions,
  autoFrameworks: boolean
) => {
  const preset = requestedPreset ?? detected.preset
  const presetDefaults = preset ? resolvePreset(preset as Preset) : {}
  const frameworkDefaults = autoFrameworks ? createDetectedFrameworkFlags(detected.detectedFrameworks) : {}

  return { frameworkDefaults, preset, presetDefaults }
}

const resolveConfiguredProjects = (
  detected: EslintConfigOptions,
  options: EslintConfigOptions | undefined
): Record<string, EslintConfigOptions> => ({
  ...(detected.projects ?? {}),
  ...(options?.projects ?? {})
})

const resolveBucketDefaults = (detected: EslintConfigOptions) => ({
  detectedExtensions: detected.extensions ?? [],
  detectedFormats: detected.formats ?? [],
  detectedLibraries: detected.libraries ?? [],
  detectedTesting: detected.testing ?? [],
  detectedTools: detected.tools ?? []
})

const resolveNextModeValue = (
  options: EslintConfigOptions | undefined,
  presetDefaults: Partial<EslintConfigOptions>,
  detected: EslintConfigOptions
): NextMode => (options?.nextMode ?? presetDefaults.nextMode ?? detected.nextMode ?? NextMode.Pages) as NextMode

const resolveRuntimeValue = (
  options: EslintConfigOptions | undefined,
  presetDefaults: Partial<EslintConfigOptions>,
  detected: EslintConfigOptions
): Runtime => (options?.runtime ?? presetDefaults.runtime ?? detected.runtime ?? Runtime.Universal) as Runtime

const resolveSettingsValue = (
  options: EslintConfigOptions | undefined,
  detected: EslintConfigOptions
): Setting[] => (options?.settings ?? detected.settings ?? []) as Setting[]

const resolveTypescriptValue = (
  options: EslintConfigOptions | undefined,
  presetDefaults: Partial<EslintConfigOptions>,
  detected: EslintConfigOptions
): EslintConfigOptions['typescript'] => options?.typescript ?? presetDefaults.typescript ?? detected.typescript ?? false

const needsReactAutoAdd = (
  frameworks: NonNullable<EslintConfigOptions['frameworks']>
): boolean =>
  Boolean(
    frameworks.next ??
    frameworks.expo ??
    (frameworks as Record<string, unknown>).remix ??
    frameworks['react-router'] ??
    (frameworks['tanstack-start'] && !frameworks.solid)
  ) && !frameworks.react

const applyFrameworkImpliedDeps = (
  frameworks: NonNullable<EslintConfigOptions['frameworks']>
): NonNullable<EslintConfigOptions['frameworks']> => {
  const result = { ...frameworks }

  if (needsReactAutoAdd(result)) result.react = true

  if (result.slidev && !result.vue) result.vue = true

  if (result.nuxt && !result.vue) result.vue = true

  return result
}

const buildIgnoresConfig = (
  useDefaultIgnores: boolean,
  useGeneratedCodeIgnores: boolean,
  useGitignore: boolean,
  options: EslintConfigOptions | undefined
) => ({
  defaultIgnores: useDefaultIgnores ? [{
    ignores: [...DEFAULT_IGNORES, ...(useGeneratedCodeIgnores ? GENERATED_CODE_IGNORES : [])],
    name: 'eslint-config-basic/default-ignores'
  } as TSESLint.FlatConfig.Config] : [],
  gitignoreConfig: useGitignore ? gitignore : [] as FlatConfigArray,
  userIgnores: options?.ignores?.length ? [{
    ignores: options.ignores,
    name: 'eslint-config-basic/ignores'
  } as TSESLint.FlatConfig.Config] : []
})

const FRAMEWORK_EXTRA_OPTS: Partial<Record<string, (ctx: { hasReact: boolean, hasSolid: boolean, hasSvelte: boolean, hasVue: boolean, runtime: Runtime }) => FrameworkOptions>> = {
  astro: ctx => ({ hasReact: ctx.hasReact, hasSolid: ctx.hasSolid, hasSvelte: ctx.hasSvelte, hasVue: ctx.hasVue }),
  hono: ctx => ({ runtime: ctx.runtime }),
  slidev: ctx => ({ runtime: ctx.runtime }),
  vite: ctx => ({ runtime: ctx.runtime })
}

const resolveEnabledFrameworks = async (
  frameworks: NonNullable<EslintConfigOptions['frameworks']>,
  ctx: { hasReact: boolean, hasSolid: boolean, hasSvelte: boolean, hasVue: boolean, runtime: Runtime }
): Promise<Record<string, FlatConfigArray>> => {
  const entries = await Promise.all(
    (Object.entries(frameworks) as [DetectedFrameworkName, ImportedFramework][])
      .filter((entry): entry is [DetectedFrameworkName, ImportedFramework] => Boolean(entry[1]))
      .map(([name, value]) =>
        // eslint-disable-next-line security/detect-object-injection
        resolveFramework(name, value, FRAMEWORK_EXTRA_OPTS[name]?.(ctx)).then(config => [name, config] as const)
      )
  )

  return Object.fromEntries(entries)
}

interface BuildConfigsParams {
  astroOptions: { hasReact: boolean, hasSolid: boolean, hasSvelte: boolean, hasVue: boolean }
  defaultIgnores: TSESLint.FlatConfig.Config[]
  gitignoreConfig: FlatConfigArray
  nextMode: NextMode
  resolvedFrameworks: NonNullable<EslintConfigOptions['frameworks']>
  resolvedTypescript: false | (TypeScriptOptions & { mode: Exclude<TypeScriptMode, 'off'> })
  rootDir: string
  runtime: Runtime
  runtimeCoreConfig: FlatConfigArray
  tailwindOptions: TailwindOptions | undefined
  testingFiles: EslintConfigOptions['testingFiles']
  tsconfigRootDir: string | undefined
  uniqueExtensions: Extension[]
  uniqueFormats: Format[]
  uniqueLibraries: Library[]
  uniqueTesting: Testing[]
  uniqueTools: Tool[]
  userIgnores: TSESLint.FlatConfig.Config[]
}

const buildEslintConfigs = async (params: BuildConfigsParams): Promise<FlatConfigArray> => {
  const {
    astroOptions, defaultIgnores, gitignoreConfig, nextMode, resolvedFrameworks,
    resolvedTypescript, rootDir: _rootDir, runtime, runtimeCoreConfig, tailwindOptions,
    testingFiles, tsconfigRootDir, uniqueExtensions, uniqueFormats, uniqueLibraries,
    uniqueTesting, uniqueTools, userIgnores
  } = params

  const { hasReact, hasSolid, hasSvelte, hasVue } = astroOptions
  const fw = await resolveEnabledFrameworks(resolvedFrameworks, { hasReact, hasSolid, hasSvelte, hasVue, runtime })
  // eslint-disable-next-line security/detect-object-injection
  const get = (name: string): FlatConfigArray => fw[name] ?? []

  return [
    ...defaultIgnores,
    ...userIgnores,
    ...gitignoreConfig,
    ...(tsconfigRootDir ?
      [{
        languageOptions: { parserOptions: { tsconfigRootDir } },
        name: 'eslint-config-basic/tsconfig-root-dir'
      }] :
      []),
    {
      files: ['**/*.cjs', '**/*.cts'],
      languageOptions: {
        globals: {
          __dirname: 'readonly',
          __filename: 'readonly',
          exports: 'readonly',
          module: 'readonly',
          require: 'readonly'
        },
        sourceType: 'commonjs'
      },
      name: 'eslint-config-basic/commonjs'
    },
    ...runtimeCoreConfig,
    ...(hasReact ? get('react') : []),
    ...get('next'),
    ...get('expo'),
    ...get('nest'),
    ...get('hono'),
    ...get('vue'),
    ...get('svelte'),
    ...get('solid'),
    ...get('angular'),
    ...get('qwik'),
    ...get('remix'),
    ...get('react-router'),
    ...get('tanstack-start'),
    ...get('nuxt'),
    ...get('preact'),
    ...get('lit'),
    ...get('slidev'),
    ...get('vite'),
    ...(resolvedTypescript ?
      createTypescriptConfig({
        ...resolvedTypescript,
        tsconfigRootDir: resolvedTypescript.tsconfigRootDir ?? tsconfigRootDir
      }) :
      []),
    ...get('astro'),
    ...(resolvedFrameworks.next && nextMode === NextMode.AppRouter ?
      [{
        files: ['app/**/*.{ts,tsx}', 'src/**/*.{ts,tsx}'],
        name: 'eslint-config-next/app-router-overrides',
        rules: { '@next/next/no-html-link-for-pages': 'off' }
      } as TSESLint.FlatConfig.Config] :
      []),
    ...applyTestingFileOverrides(
      await getIntegrationConfigs(uniqueLibraries, uniqueTools, uniqueTesting, uniqueFormats, uniqueExtensions),
      testingFiles
    ),
    ...(tailwindOptions ? [await createTailwindSettingsConfig(tailwindOptions)] : []),
    ...(await getPrettierConfig(uniqueTools))
  ]
}

interface EslintDebugInfo {
  autoFrameworks: boolean
  detectRootDir: string | undefined
  nextMode: NextMode
  optionMergeStrategy: 'merge' | 'replace'
  preset: EslintConfigOptions['preset']
  resolvedFrameworks: NonNullable<EslintConfigOptions['frameworks']>
  resolvedTypescript: BuildConfigsParams['resolvedTypescript']
  runtime: Runtime
  tsconfigRootDir: string | undefined
  uniqueExtensions: Extension[]
  uniqueFormats: Format[]
  uniqueLibraries: Library[]
  uniqueTesting: Testing[]
  uniqueTools: Tool[]
}

const logEslintDebug = ({
  autoFrameworks,
  detectRootDir,
  nextMode,
  optionMergeStrategy,
  preset,
  resolvedFrameworks,
  resolvedTypescript,
  runtime,
  tsconfigRootDir,
  uniqueExtensions,
  uniqueFormats,
  uniqueLibraries,
  uniqueTesting,
  uniqueTools
}: EslintDebugInfo) => {
  if (!process.env.ESLINT_BASIC_DEBUG) return

  process.stdout.write(`[ESLint Basic] Resolved options: ${JSON.stringify({
    autoFrameworks,
    detectRootDir: detectRootDir ?? process.cwd(),
    extensions: uniqueExtensions,
    formats: uniqueFormats,
    frameworks: Object.entries(resolvedFrameworks)
      .filter(([, value]) => Boolean(value))
      .map(([key]) => key),
    libraries: uniqueLibraries,
    nextMode,
    optionMergeStrategy,
    preset,
    runtime,
    testing: uniqueTesting,
    tools: uniqueTools,
    tsconfigRootDir,
    typescript: resolvedTypescript ? resolvedTypescript.mode : false
  }, null, 2)}\n`)
}

/**
 * Generates the ESLint configuration array, applying configurations
 * and integration settings based on the input configuration.
 *
 * @param {EslintConfigOptions} options - Configuration and integration settings
 * @param {ConfigInput[]} extraConfigs - Local flat-config overrides appended after generated config
 * @returns {FlatConfigArray} The final ESLint configuration array
 */
export const eslintConfig = async (
  options?: EslintConfigOptions,
  ...extraConfigs: ConfigInput[]
): Promise<FlatConfigArray> => {
  const {
    detection,
    extensions: optExtensions,
    formats: optFormats,
    frameworks: optFrameworks,
    libraries: optLibraries,
    strict: optStrict,
    testing: optTesting,
    tools: optTools,
    tsconfigRootDir: optTsconfigRootDir,
    workspacePrefixes
  } = options ?? {}

  if (options?.frameworks && 'remix' in options.frameworks) {
    process.emitWarning('[eslint-config-basic] Warning: `frameworks.remix` is deprecated and will be removed in the next major. Please use `frameworks["react-router"]` instead.')
  }

  if (options?.typescript && typeof options.typescript === 'object' && 'project' in options.typescript) {
    process.emitWarning('[eslint-config-basic] Warning: `typescript.project` is ignored in v2. Type-aware linting now relies on typescript-eslint projectService.')
  }

  const { autoFrameworks, detectRootDir, optionMergeStrategy, requestedPreset } = resolveConfigSetup(options)
  const shouldDefaultProjectDetection = requestedPreset === Preset.Monorepo

  const detected = applyDetectionControls(
    detectProjectOptions(detectRootDir),
    detection,
    { projects: shouldDefaultProjectDetection }
  )

  const { frameworkDefaults, preset, presetDefaults } = resolvePresetMeta(requestedPreset, detected, autoFrameworks)
  const configuredProjects = resolveConfiguredProjects(detected, options)
  const { detectedExtensions, detectedFormats, detectedLibraries, detectedTesting, detectedTools } = resolveBucketDefaults(detected)

  // NOTE: these must be computed unconditionally (not via destructuring defaults)
  // so that `optionMergeStrategy: 'merge'` actually unions explicit values with
  // detected/preset values. Destructuring defaults are skipped whenever the
  // option is provided, which silently turned 'merge' into 'replace'.
  const configuredExtensions = mergeOptionalBucket(
    'extensions', detectedExtensions, presetDefaults.extensions, optExtensions, options, optionMergeStrategy
  ) as Extension[]

  const formats = mergeOptionalBucket(
    'formats', detectedFormats, presetDefaults.formats, optFormats, options, optionMergeStrategy
  ) as Format[]

  const frameworks = mergeFrameworkOption(frameworkDefaults, presetDefaults.frameworks, optFrameworks, optionMergeStrategy)

  const libraries = mergeOptionalBucket(
    'libraries', detectedLibraries, presetDefaults.libraries, optLibraries, options, optionMergeStrategy
  ) as Library[]

  const nextMode = resolveNextModeValue(options, presetDefaults, detected)
  const runtime = resolveRuntimeValue(options, presetDefaults, detected)
  const settings = resolveSettingsValue(options, detected)
  const strict = getStrictMode(optStrict, presetDefaults.strict)

  const testing = mergeOptionalBucket(
    'testing', detectedTesting, presetDefaults.testing, optTesting, options, optionMergeStrategy
  ) as Testing[]

  const tools = mergeOptionalBucket(
    'tools', detectedTools, presetDefaults.tools, optTools, options, optionMergeStrategy
  ) as Tool[]

  const typescript = resolveTypescriptValue(options, presetDefaults, detected)
  const resolvedTypescript = resolveTypescriptOptions(typescript)
  const rootDir = detectRootDir ?? process.cwd()
  const tsconfigRootDir = resolveTsconfigRootDir(rootDir, typescript, optTsconfigRootDir)
  const extensions = applyStrictProfileDefaults(configuredExtensions, strict)
  const resolvedFrameworks = applyFrameworkImpliedDeps({ ...frameworks })
  const uniqueLibraries = resolveUniqueLibraries(libraries, options?.tailwind)
  const uniqueTesting = [...new Set(testing)]
  const uniqueFormats = [...new Set(formats)]
  const uniqueTools = [...new Set(tools)]
  const uniqueExtensions = [...new Set(extensions)]
  const uniqueSettings = [...new Set(settings)]
  const hasReact = !!resolvedFrameworks.react
  const hasVue = !!resolvedFrameworks.vue
  const hasSvelte = !!resolvedFrameworks.svelte
  const hasSolid = !!resolvedFrameworks.solid
  const useGitignore = !uniqueSettings.includes(Setting.NoGitignore)
  const useDefaultIgnores = !uniqueSettings.includes(Setting.NoDefaultIgnores)
  const useGeneratedCodeIgnores = !uniqueSettings.includes(Setting.NoGeneratedCodeIgnores)

  const tailwindOptions = uniqueLibraries.includes(Library.Tailwind) ?
    resolveTailwindOptions(rootDir, options?.tailwind) :
    undefined

  const runtimeCoreConfig = runtime === Runtime.Universal ? coreConfig : createCoreConfig(runtime)
  const { defaultIgnores, gitignoreConfig, userIgnores } = buildIgnoresConfig(useDefaultIgnores, useGeneratedCodeIgnores, useGitignore, options)

  const configs = await buildEslintConfigs({
    astroOptions: { hasReact, hasSolid, hasSvelte, hasVue },
    defaultIgnores,
    gitignoreConfig,
    nextMode,
    resolvedFrameworks,
    resolvedTypescript,
    rootDir,
    runtime,
    runtimeCoreConfig,
    tailwindOptions,
    testingFiles: options?.testingFiles,
    tsconfigRootDir,
    uniqueExtensions,
    uniqueFormats,
    uniqueLibraries,
    uniqueTesting,
    uniqueTools,
    userIgnores
  })

  logEslintDebug({
    autoFrameworks, detectRootDir, nextMode, optionMergeStrategy, preset,
    resolvedFrameworks, resolvedTypescript, runtime, tsconfigRootDir,
    uniqueExtensions, uniqueFormats, uniqueLibraries, uniqueTesting, uniqueTools
  })

  const projectConfigs = await Promise.all(
    Object.entries(configuredProjects).map(async ([projectPath, projectOptions]) => {
      const projectRoot = join(detectRootDir ?? process.cwd(), projectPath)

      const scopedConfigs = await eslintConfig({
        ...projectOptions,
        detectRootDir: projectOptions.detectRootDir ?? projectRoot,
        projects: undefined,
        tsconfigRootDir: projectOptions.tsconfigRootDir ?? projectRoot
      })

      return scopedConfigs.map(config => scopeConfigToProject(config, projectPath))
    })
  )

  // Merge workspace import group into any existing simple-import-sort/imports rules
  // so framework-specific group ordering (e.g. React-first) is preserved.
  const allConfigs = [...configs, ...projectConfigs.flat(), ...flattenConfigInputs(extraConfigs)]

  const patchedConfigs = workspacePrefixes?.length
    ? patchImportGroups(allConfigs, workspacePrefixes)
    : allConfigs

  return applyStrictMode(patchedConfigs, strict)
}

/**
 * Alias for `eslintConfig()` that reads naturally in `eslint.config.*` files.
 */
export const defineConfig = eslintConfig
