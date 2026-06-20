import { join } from 'node:path'

import {
  applyDetectionControls,
  applyStrictMode,
  applyStrictProfileDefaults,
  type ConfigInput,
  coreConfig,
  createCoreConfig,
  DEFAULT_IGNORES,
  type DetectedFrameworkName,
  detectProjectOptions,
  type EslintConfigOptions,
  type Extension,
  findTailwindEntryPoint,
  type FlatConfigArray,
  flattenConfigInputs,
  type Format,
  GENERATED_CODE_IGNORES,
  getStrictMode,
  gitignore,
  type ImportedFramework,
  Library,
  mergeFrameworkOption,
  mergeOptionalBucket,
  NextMode,
  patchImportGroups,
  Preset,
  resolveTsconfigRootDir,
  resolveTypescriptOptions,
  Runtime,
  scopeConfigToProject,
  Setting,
  type TailwindOptions,
  Testing,
  type Tool,
  type TypeScriptMode,
  type TypeScriptOptions
} from '@santi020k/eslint-config-core'
import { tailwind as tailwindIntegration } from '@santi020k/eslint-config-integrations'
import { createTypescriptConfig } from '@santi020k/eslint-config-typescript'

import type { TSESLint } from '@typescript-eslint/utils'

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

const emitBasicWarnings = (options?: EslintConfigOptions) => {
  if (options?.frameworks && 'remix' in options.frameworks) {
    process.emitWarning('[eslint-config-basic] Warning: `frameworks.remix` is deprecated and will be removed in the next major. Please use `frameworks["react-router"]` instead.')
  }

  if (options?.typescript && typeof options.typescript === 'object' && 'project' in options.typescript) {
    process.emitWarning('[eslint-config-basic] Warning: `typescript.project` is ignored in v2. Type-aware linting now relies on typescript-eslint projectService.')
  }
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
  emitBasicWarnings(options)

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
        autoFrameworks: options?.autoFrameworks,
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
