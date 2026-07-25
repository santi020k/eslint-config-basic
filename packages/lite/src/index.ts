import { join } from 'node:path'

import {
  applyDetectionControls,
  applyStrictMode,
  applyStrictProfileDefaults,
  coreConfig,
  createCoreConfig,
  DEFAULT_IGNORES,
  type DetectedFrameworkName,
  detectProjectOptions,
  type EslintConfigOptions,
  Extension,
  findTailwindEntryPoint,
  type FlatConfigArray,
  type Format,
  GENERATED_CODE_IGNORES,
  getStrictMode,
  gitignore,
  type ImportedFramework,
  Library,
  mergeFrameworkOption,
  mergeOptionalBucket,
  mergeProjectOptions,
  NextMode,
  patchImportGroups,
  Preset,
  resolveTsconfigRootDir,
  resolveTypescriptOptions,
  Runtime,
  scopeConfigToProject,
  Setting,
  type TailwindOptions,
  type Testing,
  type Tool,
  type TypeScriptMode,
  type TypeScriptOptions
} from '@santi020k/eslint-config-core'
import { createTypescriptConfig } from '@santi020k/eslint-config-typescript'

import type { TSESLint } from '@typescript-eslint/utils'

import { createDetectedFrameworkFlags, type FrameworkOptions } from './frameworks.js'
import { getIntegrationConfigs, getPrettierConfig } from './integrations.js'
import { resolveFramework, resolvePreset } from './resolvers.js'
import { buildTailwindSettingsConfig } from './tailwind.js'

// Lazy framework factories (v2 naming: bare framework names) plus
// deprecated *Config aliases for the old mixed naming.
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
  ProjectConfigOptions,
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

const buildLiteTailwindResult = (options: TailwindOptions, entryPoint: string | undefined): TailwindOptions => {
  const result: TailwindOptions = {
    detectComponentClasses: options.detectComponentClasses ?? true
  }

  if (entryPoint) result.entryPoint = entryPoint

  if (options.ignore?.length) result.ignore = options.ignore

  if (options.noUnknownClasses !== undefined) result.noUnknownClasses = options.noUnknownClasses

  return result
}

const hasLiteTailwindSettings = (options: TailwindOptions, entryPoint: string | undefined): boolean => {
  if (entryPoint) return true

  if (options.detectComponentClasses !== undefined) return true

  if (options.ignore?.length) return true

  return options.noUnknownClasses !== undefined
}

const resolveLiteTailwindOptions = (
  rootDir: string,
  tailwind: EslintConfigOptions['tailwind'],
  uniqueLibraries: Library[]
): TailwindOptions | undefined => {
  if (!uniqueLibraries.includes(Library.Tailwind)) return undefined

  const options: TailwindOptions = typeof tailwind === 'object' ? tailwind : {}
  const entryPoint = options.entryPoint ?? findTailwindEntryPoint(rootDir)

  if (!hasLiteTailwindSettings(options, entryPoint)) return undefined

  return buildLiteTailwindResult(options, entryPoint)
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

interface BuildLiteConfigsParams {
  defaultIgnores: TSESLint.FlatConfig.Config[]
  frameworkConfigs: Record<string, FlatConfigArray>
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

  const get = (name: string): FlatConfigArray => {
    const entry = Object.entries(frameworkConfigs).find(([k]) => k === name)

    return entry ? entry[1] : []
  }

  const tailwindSettingsConfig = buildTailwindSettingsConfig(tailwindOptions)

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
    {
      files: ['**/scripts/**/*.{js,mjs,cjs,ts,mts,cts}'],
      name: 'eslint-config-lite/scripts-overrides',
      rules: {
        'n/no-unpublished-import': 'off',
        ...(uniqueExtensions.includes(Extension.Security) ? { 'security/detect-non-literal-fs-filename': 'off' } : {})
      }
    },
    ...(tailwindSettingsConfig ? [tailwindSettingsConfig] : []),
    ...(await getPrettierConfig(uniqueTools))
  ]
}

const emitLiteWarnings = (options?: EslintConfigOptions) => {
  if (options?.frameworks && 'remix' in options.frameworks) {
    process.emitWarning('`frameworks.remix` is deprecated and will be removed in the next major. Please use `frameworks["react-router"]` instead.', 'eslint-config-lite')
  }

  if (options?.typescript && typeof options.typescript === 'object' && 'project' in options.typescript) {
    process.emitWarning('`typescript.project` is ignored in v2. Type-aware linting now relies on typescript-eslint projectService.', 'eslint-config-lite')
  }
}

/**
 * Generates the ESLint configuration array, applying configurations
 * and integration settings based on the input configuration.
 *
 * @param {EslintConfigOptions} options - Configuration and integration settings
 * @returns {FlatConfigArray} The final ESLint configuration array
 */
export const eslintConfig = async (options?: EslintConfigOptions): Promise<FlatConfigArray> => {
  emitLiteWarnings(options)

  const {
    detection,
    extensions: optExtensions,
    formats: optFormats,
    frameworks: optFrameworks,
    ignores: optIgnores,
    libraries: optLibraries,
    nextMode: optNextMode,
    projectDefaults,
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
  const tailwindOptions = resolveLiteTailwindOptions(rootDir, optTailwind, uniqueLibraries)
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
      const inheritedOptions = mergeProjectOptions(projectDefaults ?? {}, projectOptions)

      const scopedConfigs = await eslintConfig({
        ...inheritedOptions,
        detectRootDir: inheritedOptions.detectRootDir ?? projectRoot,
        projectDefaults: undefined,
        projects: undefined,
        tsconfigRootDir: inheritedOptions.tsconfigRootDir ?? projectRoot
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
