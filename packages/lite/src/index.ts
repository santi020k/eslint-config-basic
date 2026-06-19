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
import { createTypescriptConfig } from '@santi020k/eslint-config-typescript'

import type { TSESLint } from '@typescript-eslint/utils'

import { applyStrictMode } from './compose.js'
import { createDetectedFrameworkFlags, type FrameworkOptions } from './frameworks.js'
import { getIntegrationConfigs, getPrettierConfig } from './integrations.js'
import { resolveFramework, resolvePreset } from './resolvers.js'

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

type OptionalBucket = 'extensions' | 'formats' | 'libraries' | 'testing' | 'tools'

const OPTIONAL_BUCKETS = {
  extensions: Object.values(Extension),
  formats: Object.values(Format),
  libraries: Object.values(Library),
  testing: Object.values(Testing),
  tools: Object.values(Tool)
} as const

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
  const hasExplicitInput = explicitValues !== undefined || featureEntries.length > 0
  const mergedExplicit = hasExplicitInput ? [...(explicitValues ?? []), ...featureEntries] : undefined

  return applyFeatureDisables(
    mergeArrayOption(detectedValues, presetValues, mergedExplicit, strategy),
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

const applyArrayDetectionControls = (
  controls: Required<DetectionOptions>,
  detected: EslintConfigOptions
) => ({
  detectedFrameworks: controls.frameworks ? detected.detectedFrameworks : [],
  extensions: controls.extensions ? detected.extensions : [],
  formats: controls.formats ? detected.formats : [],
  libraries: controls.libraries ? detected.libraries : [],
  testing: controls.testing ? detected.testing : [],
  tools: controls.tools ? detected.tools : []
})

const applyScalarDetectionControls = (
  controls: Required<DetectionOptions>,
  detected: EslintConfigOptions
) => ({
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

  return {
    ...detected,
    ...applyArrayDetectionControls(controls, detected),
    ...applyScalarDetectionControls(controls, detected)
  }
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
  // eslint-disable-next-line security/detect-non-literal-fs-filename -- config root is user-selected project context
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
  // eslint-disable-next-line security/detect-non-literal-fs-filename -- probes known stylesheet candidates under project root
  candidate => existsSync(join(rootDir, candidate))
)

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
      ignores: config.ignores?.map(pattern => scopeFilePattern(projectPath, pattern)) as TSESLint.FlatConfig.Config['ignores']
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


const resolveLiteSetup = (options: EslintConfigOptions | undefined) => ({
  autoFrameworks: options?.autoFrameworks ?? true,
  detectRootDir: options?.detectRootDir ?? options?.tsconfigRootDir,
  optionMergeStrategy: (options?.optionMergeStrategy ?? 'merge'),
  requestedPreset: options?.preset
})

const resolveLitePresetMeta = (
  requestedPreset: EslintConfigOptions['preset'],
  detected: EslintConfigOptions,
  autoFrameworks: boolean,
  optProjects: EslintConfigOptions['projects']
) => {
  const preset = requestedPreset ?? detected.preset
  const presetDefaults = preset ? resolvePreset(preset as Preset) : {}
  const frameworkDefaults = autoFrameworks ? createDetectedFrameworkFlags(detected.detectedFrameworks ?? []) : {}
  const configuredProjects = { ...(detected.projects ?? {}), ...(optProjects ?? {}) }

  return { configuredProjects, frameworkDefaults, preset, presetDefaults }
}

const resolveLiteBucketDefaults = (detected: EslintConfigOptions) => ({
  detectedExtensions: detected.extensions ?? [],
  detectedFormats: detected.formats ?? [],
  detectedLibraries: detected.libraries ?? [],
  detectedTesting: detected.testing ?? [],
  detectedTools: detected.tools ?? []
})

const resolveLiteNextMode = (
  optNextMode: EslintConfigOptions['nextMode'],
  presetNextMode: EslintConfigOptions['nextMode'],
  detectedNextMode: EslintConfigOptions['nextMode']
): NextMode => (optNextMode ?? presetNextMode ?? detectedNextMode ?? NextMode.Pages) as NextMode

const resolveLiteRuntime = (
  optRuntime: EslintConfigOptions['runtime'],
  presetRuntime: EslintConfigOptions['runtime'],
  detectedRuntime: EslintConfigOptions['runtime']
): Runtime => (optRuntime ?? presetRuntime ?? detectedRuntime ?? Runtime.Universal) as Runtime

const resolveLiteTypescript = (
  optTypescript: EslintConfigOptions['typescript'],
  presetTypescript: EslintConfigOptions['typescript'],
  detectedTypescript: EslintConfigOptions['typescript']
): EslintConfigOptions['typescript'] => optTypescript ?? presetTypescript ?? detectedTypescript ?? false

const resolveLiteScalars = (
  opts: {
    nextMode?: EslintConfigOptions['nextMode']
    runtime?: EslintConfigOptions['runtime']
    settings?: EslintConfigOptions['settings']
    strict?: EslintConfigOptions['strict']
    typescript?: EslintConfigOptions['typescript']
  },
  presetDefaults: Partial<EslintConfigOptions>,
  detected: EslintConfigOptions
) => ({
  nextMode: resolveLiteNextMode(opts.nextMode, presetDefaults.nextMode, detected.nextMode),
  runtime: resolveLiteRuntime(opts.runtime, presetDefaults.runtime, detected.runtime),
  settings: (opts.settings ?? detected.settings ?? []) as EslintConfigOptions['settings'],
  strict: getStrictMode(opts.strict, presetDefaults.strict),
  typescript: resolveLiteTypescript(opts.typescript, presetDefaults.typescript, detected.typescript)
})

const hasReactImplyingFramework = (
  result: NonNullable<EslintConfigOptions['frameworks']>
): boolean => Boolean(
  result.next ??
  result.expo ??
  (result as Record<string, unknown>).remix ??
  result['react-router'] ??
  (result['tanstack-start'] && !result.solid)
)

const applyLiteFrameworkImpliedDeps = (
  frameworks: NonNullable<EslintConfigOptions['frameworks']>
): NonNullable<EslintConfigOptions['frameworks']> => {
  const result = { ...frameworks }

  if (hasReactImplyingFramework(result) && !result.react) result.react = true

  if (result.slidev && !result.vue) result.vue = true

  if (result.nuxt && !result.vue) result.vue = true

  return result
}

const buildLiteIgnoresConfig = (
  useDefaultIgnores: boolean,
  useGeneratedCodeIgnores: boolean,
  useGitignore: boolean,
  optIgnores: EslintConfigOptions['ignores']
) => ({
  defaultIgnores: useDefaultIgnores ? [{
    ignores: [...DEFAULT_IGNORES, ...(useGeneratedCodeIgnores ? GENERATED_CODE_IGNORES : [])],
    name: 'eslint-config-lite/default-ignores'
  } as TSESLint.FlatConfig.Config] : [],
  gitignoreConfig: useGitignore ? gitignore : [] as FlatConfigArray,
  userIgnores: optIgnores?.length ? [{
    ignores: optIgnores,
    name: 'eslint-config-lite/ignores'
  } as TSESLint.FlatConfig.Config] : []
})

interface LiteDebugInfo {
  autoFrameworks: boolean
  detectRootDir: string | undefined
  nextMode: NextMode
  optionMergeStrategy: 'merge' | 'replace'
  preset: EslintConfigOptions['preset']
  resolvedFrameworks: NonNullable<EslintConfigOptions['frameworks']>
  resolvedTypescript: false | (TypeScriptOptions & { mode: Exclude<TypeScriptMode, 'off'> })
  runtime: Runtime
  tsconfigRootDir: string | undefined
  uniqueExtensions: Extension[]
  uniqueFormats: Format[]
  uniqueLibraries: Library[]
  uniqueTesting: Testing[]
  uniqueTools: Tool[]
}

const logLiteDebug = ({
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
}: LiteDebugInfo) => {
  if (!process.env.ESLINT_CONFIG_LITE_DEBUG && !process.env.ESLINT_BASIC_DEBUG) return

  process.stdout.write(`[ESLint Config Lite] Resolved options: ${JSON.stringify({
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

const LITE_FRAMEWORK_EXTRA_OPTS = new Map<string, (ctx: { hasReact: boolean, hasSolid: boolean, hasSvelte: boolean, hasVue: boolean, runtime: Runtime }) => FrameworkOptions>([
  ['astro', ctx => ({ hasReact: ctx.hasReact, hasSolid: ctx.hasSolid, hasSvelte: ctx.hasSvelte, hasVue: ctx.hasVue })],
  ['hono', ctx => ({ runtime: ctx.runtime })],
  ['slidev', ctx => ({ runtime: ctx.runtime })],
  ['vite', ctx => ({ runtime: ctx.runtime })]
])

const resolveEnabledFrameworks = async (
  frameworks: NonNullable<EslintConfigOptions['frameworks']>,
  ctx: { hasReact: boolean, hasSolid: boolean, hasSvelte: boolean, hasVue: boolean, runtime: Runtime }
): Promise<Map<string, FlatConfigArray>> => {
  const entries = await Promise.all(
    (Object.entries(frameworks) as [DetectedFrameworkName, ImportedFramework][])
      .filter((entry): entry is [DetectedFrameworkName, ImportedFramework] => Boolean(entry[1]))
      .map(([name, value]) =>
        resolveFramework(name, value, LITE_FRAMEWORK_EXTRA_OPTS.get(name)?.(ctx)).then(config => [name, config] as const)
      )
  )

  return new Map(entries)
}

interface BuildLiteConfigsParams {
  defaultIgnores: TSESLint.FlatConfig.Config[]
  frameworkConfigs: Map<string, FlatConfigArray>
  gitignoreConfig: FlatConfigArray
  hasReact: boolean
  nextMode: NextMode
  resolvedFrameworks: NonNullable<EslintConfigOptions['frameworks']>
  resolvedTypescript: false | (TypeScriptOptions & { mode: Exclude<TypeScriptMode, 'off'> })
  runtimeCoreConfig: FlatConfigArray
  tailwindOptions: TailwindOptions | undefined
  tsconfigRootDir: string | undefined
  uniqueExtensions: Extension[]
  uniqueFormats: Format[]
  uniqueLibraries: Library[]
  uniqueTesting: Testing[]
  uniqueTools: Tool[]
  userIgnores: TSESLint.FlatConfig.Config[]
}

const buildLiteEslintConfigs = async (params: BuildLiteConfigsParams): Promise<FlatConfigArray> => {
  const {
    defaultIgnores,
    frameworkConfigs,
    gitignoreConfig,
    hasReact,
    nextMode,
    resolvedFrameworks,
    resolvedTypescript,
    runtimeCoreConfig,
    tailwindOptions,
    tsconfigRootDir,
    uniqueExtensions,
    uniqueFormats,
    uniqueLibraries,
    uniqueTesting,
    uniqueTools,
    userIgnores
  } = params

  const get = (name: string): FlatConfigArray => frameworkConfigs.get(name) ?? []

  const tailwindSettingsConfig = ((): TSESLint.FlatConfig.Config | undefined => {
    if (!tailwindOptions) return undefined

    const { noUnknownClasses, ...settingsOptions } = tailwindOptions
    const unknownClassOptions: { entryPoint?: string, ignore?: string[] } = {}

    if (tailwindOptions.entryPoint) unknownClassOptions.entryPoint = tailwindOptions.entryPoint

    if (tailwindOptions.ignore?.length) unknownClassOptions.ignore = tailwindOptions.ignore

    const hasUnknownClassOptions = Object.keys(unknownClassOptions).length > 0
    let noUnknownClassesRule: TSESLint.FlatConfig.RuleEntry | undefined

    if (hasUnknownClassOptions || noUnknownClasses !== undefined) {
      const severity = noUnknownClasses ?? 'error'

      if (severity === false) {
        noUnknownClassesRule = 'off'
      } else if (hasUnknownClassOptions) {
        noUnknownClassesRule = [severity, unknownClassOptions]
      } else {
        noUnknownClassesRule = severity
      }
    }

    const config: TSESLint.FlatConfig.Config = {
      name: 'eslint-config-lite/tailwind-settings',
      settings: { 'better-tailwindcss': settingsOptions }
    }

    if (noUnknownClassesRule !== undefined) {
      config.rules = { 'better-tailwindcss/no-unknown-classes': noUnknownClassesRule }
    }

    return config
  })()

  return [
    ...defaultIgnores,
    ...userIgnores,
    ...gitignoreConfig,
    ...(tsconfigRootDir ?
      [{
        languageOptions: { parserOptions: { tsconfigRootDir } },
        name: 'eslint-config-lite/tsconfig-root-dir'
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
      name: 'eslint-config-lite/commonjs'
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
    // Astro runs after TypeScript so its parser wins for .astro files and embedded expressions.
    ...get('astro'),
    ...(resolvedFrameworks.next && nextMode === NextMode.AppRouter ?
      [{
        files: ['app/**/*.{ts,tsx}', 'src/**/*.{ts,tsx}'],
        name: 'eslint-config-next/app-router-overrides',
        rules: { '@next/next/no-html-link-for-pages': 'off' }
      } as TSESLint.FlatConfig.Config] :
      []),
    ...(await getIntegrationConfigs(uniqueLibraries, uniqueTools, uniqueTesting, uniqueFormats, uniqueExtensions)),
    ...(tailwindSettingsConfig ? [tailwindSettingsConfig] : []),
    ...(await getPrettierConfig(uniqueTools))
  ]
}

/**
 * Generates the ESLint configuration array, applying configurations
 * and integration settings based on the input configuration.
 *
 * @param {EslintConfigOptions} options - Configuration and integration settings
 * @returns {FlatConfigArray} The final ESLint configuration array
 */
export const eslintConfig = async (options?: EslintConfigOptions): Promise<FlatConfigArray> => {
  const {
    detection,
    extensions: optExtensions,
    formats: optFormats,
    frameworks: optFrameworks,
    ignores: optIgnores,
    libraries: optLibraries,
    nextMode: optNextMode,
    projects: optProjects,
    runtime: optRuntime,
    settings: optSettings,
    strict: optStrict,
    tailwind: optTailwind,
    testing: optTesting,
    tools: optTools,
    tsconfigRootDir: optTsconfigRootDir,
    typescript: optTypescript,
    workspacePrefixes
  } = options ?? {}

  if (options?.frameworks && 'remix' in options.frameworks) {
    process.emitWarning('[eslint-config-lite] Warning: `frameworks.remix` is deprecated and will be removed in the next major. Please use `frameworks["react-router"]` instead.')
  }

  if (options?.typescript && typeof options.typescript === 'object' && 'project' in options.typescript) {
    process.emitWarning('[eslint-config-lite] Warning: `typescript.project` is ignored in v2. Type-aware linting now relies on typescript-eslint projectService.')
  }

  const { autoFrameworks, detectRootDir, optionMergeStrategy, requestedPreset } = resolveLiteSetup(options)
  const shouldDefaultProjectDetection = requestedPreset === Preset.Monorepo

  const detected = applyDetectionControls(
    detectProjectOptions(detectRootDir),
    detection,
    { projects: shouldDefaultProjectDetection }
  )

  const { configuredProjects, frameworkDefaults, preset, presetDefaults } = resolveLitePresetMeta(
    requestedPreset, detected, autoFrameworks, optProjects
  )

  const { detectedExtensions, detectedFormats, detectedLibraries, detectedTesting, detectedTools } = resolveLiteBucketDefaults(detected)

  const { nextMode, runtime, settings, strict, typescript } = resolveLiteScalars(
    { nextMode: optNextMode, runtime: optRuntime, settings: optSettings, strict: optStrict, typescript: optTypescript },
    presetDefaults,
    detected
  )

  // NOTE: these must be computed unconditionally (not via destructuring defaults)
  // so that `optionMergeStrategy: 'merge'` actually unions explicit values with
  // detected/preset values. Destructuring defaults are skipped whenever the
  // option is provided, which silently turned 'merge' into 'replace'.
  const configuredExtensions = mergeOptionalBucket('extensions', detectedExtensions, presetDefaults.extensions, optExtensions, options, optionMergeStrategy) as Extension[]
  const formats = mergeOptionalBucket('formats', detectedFormats, presetDefaults.formats, optFormats, options, optionMergeStrategy) as Format[]
  const frameworks = mergeFrameworkOption(frameworkDefaults, presetDefaults.frameworks, optFrameworks, optionMergeStrategy)
  const libraries = mergeOptionalBucket('libraries', detectedLibraries, presetDefaults.libraries, optLibraries, options, optionMergeStrategy) as Library[]
  const testing = mergeOptionalBucket('testing', detectedTesting, presetDefaults.testing, optTesting, options, optionMergeStrategy) as Testing[]
  const tools = mergeOptionalBucket('tools', detectedTools, presetDefaults.tools, optTools, options, optionMergeStrategy) as Tool[]
  const resolvedTypescript = resolveTypescriptOptions(typescript)
  const rootDir = detectRootDir ?? process.cwd()
  const tsconfigRootDir = resolveTsconfigRootDir(rootDir, typescript, optTsconfigRootDir)
  const extensions = applyStrictProfileDefaults(configuredExtensions, strict)
  const resolvedFrameworks = applyLiteFrameworkImpliedDeps({ ...frameworks })

  const uniqueLibraries = ((): Library[] => {
    const libs = [...new Set(libraries)]

    if (optTailwind === false) return libs.filter(l => l !== Library.Tailwind)

    if (!optTailwind) return libs

    return [...new Set([...libs, Library.Tailwind])]
  })()

  const uniqueTesting = [...new Set(testing)]
  const uniqueFormats = [...new Set(formats)]
  const uniqueTools = [...new Set(tools)]
  const uniqueExtensions = [...new Set(extensions)]
  const uniqueSettings = [...new Set(settings as string[])]
  const hasReact = !!resolvedFrameworks.react
  const hasVue = !!resolvedFrameworks.vue
  const hasSvelte = !!resolvedFrameworks.svelte
  const hasSolid = !!resolvedFrameworks.solid
  const useGitignore = !uniqueSettings.includes(Setting.NoGitignore)
  const useDefaultIgnores = !uniqueSettings.includes(Setting.NoDefaultIgnores)
  const useGeneratedCodeIgnores = !uniqueSettings.includes(Setting.NoGeneratedCodeIgnores)

  const tailwindOptions = ((): TailwindOptions | undefined => {
    if (optTailwind === false || !uniqueLibraries.includes(Library.Tailwind)) return undefined

    const opts = optTailwind ?? {}
    const entryPoint = opts.entryPoint ?? findTailwindEntryPoint(rootDir)

    if (!entryPoint && opts.detectComponentClasses === undefined && !opts.ignore?.length && opts.noUnknownClasses === undefined) return undefined

    return {
      detectComponentClasses: opts.detectComponentClasses ?? true,
      ...(entryPoint ? { entryPoint } : {}),
      ...(opts.ignore?.length ? { ignore: opts.ignore } : {}),
      ...(opts.noUnknownClasses === undefined ? {} : { noUnknownClasses: opts.noUnknownClasses })
    }
  })()

  const runtimeCoreConfig = runtime === Runtime.Universal ? coreConfig : createCoreConfig(runtime)

  const { defaultIgnores, gitignoreConfig, userIgnores } = buildLiteIgnoresConfig(
    useDefaultIgnores, useGeneratedCodeIgnores, useGitignore, optIgnores
  )

  const frameworkConfigs = await resolveEnabledFrameworks(
    resolvedFrameworks,
    { hasReact, hasSolid, hasSvelte, hasVue, runtime }
  )

  const configs = await buildLiteEslintConfigs({
    defaultIgnores,
    frameworkConfigs,
    gitignoreConfig,
    hasReact,
    nextMode,
    resolvedFrameworks,
    resolvedTypescript,
    runtimeCoreConfig,
    tailwindOptions,
    tsconfigRootDir,
    uniqueExtensions,
    uniqueFormats,
    uniqueLibraries,
    uniqueTesting,
    uniqueTools,
    userIgnores
  })

  logLiteDebug({
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

  const allConfigs = [...configs, ...projectConfigs.flat()]

  const patchedConfigs = workspacePrefixes?.length
    ? patchImportGroups(allConfigs, workspacePrefixes)
    : allConfigs

  return applyStrictMode(patchedConfigs, strict)
}

/**
 * Alias for `eslintConfig()` that reads naturally in `eslint.config.*` files.
 */
export const defineConfig = eslintConfig
