import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  applyDetectionControls,
  applyStrictMode,
  applyStrictProfileDefaults,
  type ConfigInput,
  coreConfig,
  createCoreConfig,
  createGitignoreConfig,
  DEFAULT_IGNORES,
  type DetectedFrameworkName,
  detectProjectOptions,
  type EslintConfigOptions,
  Extension,
  findTailwindEntryPoint,
  type FlatConfigArray,
  flattenConfigInputs,
  type Format,
  GENERATED_CODE_IGNORES,
  getStrictMode,
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
  Testing,
  type Tool,
  type TypeScriptMode,
  type TypeScriptOptions
} from '@santi020k/eslint-config-core'
import { createTypescriptConfig } from '@santi020k/eslint-config-typescript'
import type { TSESLint } from '@typescript-eslint/utils'

import { attachDefineConfigMetadata } from './define-config-metadata.js'
import { createDetectedFrameworkFlags, type FrameworkOptions } from './frameworks.js'
import { getIntegrationConfigs, getPrettierConfig } from './integrations.js'
import { resolveFramework, resolvePreset } from './resolvers.js'
import { buildTailwindSettingsConfig } from './tailwind.js'

const SCRIPT_FILE_GLOBS = ['**/scripts/**/*.{js,mjs,cjs,ts,mts,cts}']

const getCliEntryFiles = (rootDir: string): string[] => {
  const manifestPath = join(rootDir, 'package.json')

  if (!existsSync(manifestPath)) return SCRIPT_FILE_GLOBS

  try {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as {
      bin?: Record<string, string> | string
    }

    const binFiles = typeof manifest.bin === 'string' ?
      [manifest.bin] :
      Object.values(manifest.bin ?? {})

    return [...new Set([
      ...SCRIPT_FILE_GLOBS,
      ...binFiles.map(file => file.replace(/^\.\//, ''))
    ])]
  } catch {
    return SCRIPT_FILE_GLOBS
  }
}

// Lazy framework factories.
export {
  angular,
  astro,
  expo,
  hono,
  lit,
  nest,
  next,
  nuxt,
  preact,
  qwik,
  react,
  reactRouter,
  slidev,
  solid,
  svelte,
  tanstackStart,
  vite,
  vue
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
  ImportGroupOptions,
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
  createGitignoreConfig,
  createImportGroups,
  detectProjectOptions,
  Extension,
  Format,
  getGlobalsForRuntime,
  groups,
  hasReactConfig,
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
export { typescriptConfig } from '@santi020k/eslint-config-typescript'

const buildTailwindResult = (
  options: TailwindOptions,
  entryPoint: string | undefined,
  rootDir: string
): TailwindOptions => ({
  cwd: options.cwd ?? rootDir,
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

  const resolvedOptions: TailwindOptions = !entryPoint && options.noUnknownClasses === undefined ?
    { ...options, noUnknownClasses: false } :
    options

  return buildTailwindResult(resolvedOptions, entryPoint, rootDir)
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
    const match = entries.find(([testingName]) => (TESTING_CONFIG_NAMES[testingName as Testing] ?? []).includes(config.name ?? ''))

    if (!match) return config

    const [, files] = match

    return {
      ...config,
      files
    }
  })
}

const ESLINT_CONFIG_FILENAMES = [
  'eslint.config.js',
  'eslint.config.cjs',
  'eslint.config.mjs',
  'eslint.config.ts',
  'eslint.config.cts',
  'eslint.config.mts'
]

// A direct defineConfig() call retains the eslint.config.* frame in Node's
// stack. Prefer that location over cwd because editor ESLint processes may be
// launched from outside the project.
const findConfigRootFromStack = (stack: string | undefined = new Error().stack): string | undefined => {
  if (!stack) return undefined

  for (const line of stack.split('\n')) {
    const configFilename = ESLINT_CONFIG_FILENAMES.find(filename => line.includes(filename))

    if (!configFilename) continue

    const filenameStart = line.indexOf(configFilename)
    const fileUrlStart = line.lastIndexOf('file://', filenameStart)
    const windowsPathStart = line.slice(0, filenameStart).search(/[A-Za-z]:[\\/]/)
    const absolutePathStart = line.indexOf('/')
    let configPathStart = absolutePathStart

    if (windowsPathStart >= 0) configPathStart = windowsPathStart

    if (fileUrlStart >= 0) configPathStart = fileUrlStart

    try {
      if (configPathStart < 0) continue

      const configPath = line.slice(configPathStart, filenameStart + configFilename.length)

      return dirname(configPath.startsWith('file:') ? fileURLToPath(configPath) : configPath)
    } catch {
      // Ignore malformed or non-local stack URLs and retain the cwd fallback.
    }
  }

  return undefined
}

const resolveConfigSetup = (options: EslintConfigOptions | undefined) => {
  const {
    autoFrameworks = true,
    detectRootDir,
    optionMergeStrategy = 'merge',
    preset: requestedPreset,
    root,
    tsconfigRootDir
  } = options ?? {}

  const implicitRootDir = root ?? detectRootDir ?? tsconfigRootDir ?? findConfigRootFromStack()

  return {
    autoFrameworks,
    detectRootDir: implicitRootDir,
    optionMergeStrategy,
    requestedPreset
  }
}

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

const scopeWorkspaceDetection = (
  detected: EslintConfigOptions,
  isWorkspace: boolean
): EslintConfigOptions => isWorkspace ?
  {
    ...detected,
    detectedFrameworks: [],
    libraries: [],
    nextMode: undefined,
    runtime: Runtime.Universal
  } :
  detected

const resolveDetectedOptions = (
  detectRootDir: string | undefined,
  detection: EslintConfigOptions['detection'],
  requestedPreset: EslintConfigOptions['preset']
): EslintConfigOptions => {
  const rawDetected = detectProjectOptions(detectRootDir)

  const shouldDetectProjects = requestedPreset === Preset.Monorepo ||
    rawDetected.preset === Preset.Monorepo

  const detected = applyDetectionControls(rawDetected, detection, { projects: shouldDetectProjects })
  const hasDetectedProjects = Object.keys(detected.projects ?? {}).length > 0

  // Root devDependencies in a workspace commonly contain frameworks and
  // libraries used by only one package. Keep those detections package-scoped;
  // explicit root options still apply normally.
  return scopeWorkspaceDetection(detected, hasDetectedProjects)
}

const resolveNextModeValue = (
  options: EslintConfigOptions | undefined,
  presetDefaults: Partial<EslintConfigOptions>,
  detected: EslintConfigOptions
): NextMode => (options?.nextMode ?? presetDefaults.nextMode ?? detected.nextMode ?? NextMode.Pages) as NextMode

const resolveRuntimeValue = (
  options: EslintConfigOptions | undefined,
  presetDefaults: Partial<EslintConfigOptions>,
  detected: EslintConfigOptions,
  usePresetRuntime: boolean
): Runtime => (
  options?.runtime ??
  (usePresetRuntime ? presetDefaults.runtime : undefined) ??
  detected.runtime ??
  Runtime.Universal
) as Runtime

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
): boolean => Boolean(
  frameworks.next ??
  frameworks.expo ??
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
  options: EslintConfigOptions | undefined,
  rootDir: string
) => ({
  defaultIgnores: useDefaultIgnores ?
    [{
      ignores: [...DEFAULT_IGNORES, ...(useGeneratedCodeIgnores ? GENERATED_CODE_IGNORES : [])],
      name: 'eslint-config-basic/default-ignores'
    } as TSESLint.FlatConfig.Config] :
    [],
  gitignoreConfig: useGitignore ? createGitignoreConfig(rootDir) : [] as FlatConfigArray,
  userIgnores: options?.ignores?.length ?
    [{
      ignores: options.ignores,
      name: 'eslint-config-basic/ignores'
    } as TSESLint.FlatConfig.Config] :
    []
})

interface FrameworkResolutionContext {
  hasReact: boolean
  hasSolid: boolean
  hasSvelte: boolean
  hasVue: boolean
  runtime: Runtime
  tsconfigRootDir?: string
}

const FRAMEWORK_EXTRA_OPTS: Partial<Record<string, (ctx: FrameworkResolutionContext) => FrameworkOptions>> = {
  astro: ctx => ({
    hasReact: ctx.hasReact,
    hasSolid: ctx.hasSolid,
    hasSvelte: ctx.hasSvelte,
    hasVue: ctx.hasVue,
    tsconfigRootDir: ctx.tsconfigRootDir
  }),
  hono: ctx => ({ runtime: ctx.runtime }),
  slidev: ctx => ({ runtime: ctx.runtime }),
  vite: ctx => ({ runtime: ctx.runtime })
}

const resolveEnabledFrameworks = async (
  frameworks: NonNullable<EslintConfigOptions['frameworks']>,
  ctx: FrameworkResolutionContext
): Promise<Record<string, FlatConfigArray>> => {
  const entries = await Promise.all(
    (Object.entries(frameworks) as [DetectedFrameworkName, ImportedFramework][])
      .filter((entry): entry is [DetectedFrameworkName, ImportedFramework] => Boolean(entry[1]))
      .map(([name, value]) => resolveFramework(name, value, FRAMEWORK_EXTRA_OPTS[name]?.(ctx))
        .then(config => [name, config] as const))
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
    resolvedTypescript, rootDir, runtime, runtimeCoreConfig, tailwindOptions,
    testingFiles, tsconfigRootDir, uniqueExtensions, uniqueFormats, uniqueLibraries,
    uniqueTesting, uniqueTools, userIgnores
  } = params

  const { hasReact, hasSolid, hasSvelte, hasVue } = astroOptions

  const fw = await resolveEnabledFrameworks(
    resolvedFrameworks, { hasReact, hasSolid, hasSvelte, hasVue, runtime, tsconfigRootDir }
  )

  const get = (name: string): FlatConfigArray => fw[name] ?? []

  const typescriptConfigs = resolvedTypescript ?
    createTypescriptConfig({
      ...resolvedTypescript,
      tsconfigRootDir: resolvedTypescript.tsconfigRootDir ?? tsconfigRootDir
    }) :
    []

  const untypedTypescriptConfigs = typescriptConfigs.filter(
    config => config.name === 'eslint-config-typescript/untyped-files'
  )

  const typedTypescriptConfigs = typescriptConfigs.filter(
    config => config.name !== 'eslint-config-typescript/untyped-files'
  )

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
    ...get('react-router'),
    ...get('tanstack-start'),
    ...get('nuxt'),
    ...get('preact'),
    ...get('lit'),
    ...get('slidev'),
    ...get('vite'),
    ...typedTypescriptConfigs,
    ...get('astro'),
    ...(resolvedFrameworks.next && nextMode === NextMode.AppRouter ?
      [{
        files: ['app/**/*.{ts,tsx}', 'src/**/*.{ts,tsx}'],
        name: 'eslint-config-next/app-router-overrides',
        rules: { '@next/next/no-html-link-for-pages': 'off' }
      } as TSESLint.FlatConfig.Config] :
      []),
    ...applyTestingFileOverrides(
      await getIntegrationConfigs(
        uniqueLibraries, uniqueTools, uniqueTesting, uniqueFormats, uniqueExtensions
      ),
      testingFiles
    ),
    ...(resolvedFrameworks.next ?
      [{
        files: ['next-env.d.ts'],
        name: 'eslint-config-next/generated-declaration',
        rules: {
          '@stylistic/quotes': 'off',
          '@stylistic/semi': 'off'
        }
      } as TSESLint.FlatConfig.Config] :
      []),
    {
      files: [
        '**/*.{test,spec}.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
        '**/{test,tests,__tests__}/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'
      ],
      name: 'eslint-config-basic/test-file-overrides',
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
        'no-use-before-define': 'off'
      }
    },
    {
      files: getCliEntryFiles(rootDir),
      name: 'eslint-config-basic/scripts-overrides',
      rules: {
        'n/no-unpublished-import': 'off',
        'n/no-process-exit': 'off',
        'no-console': 'off'
      }
    },
    ...(tailwindOptions ? [buildTailwindSettingsConfig(tailwindOptions)] : []),
    ...untypedTypescriptConfigs,
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

const emitAstroDoctorWarning = (
  extensions: Extension[],
  frameworks: Record<string, unknown>
): void => {
  if (!extensions.includes(Extension.AstroDoctor) || frameworks.astro) return

  process.emitWarning(
    '[eslint-config-basic] Warning: Astro Doctor is enabled without the Astro framework config. ' +
    'Enable `frameworks: { astro: true }` or remove the `astro-doctor` feature.'
  )
}

type ConfigComposer = (
  options?: EslintConfigOptions,
  ...extraConfigs: ConfigInput[]
) => Promise<FlatConfigArray>

const resolveProjectConfigs = async (
  configuredProjects: Record<string, EslintConfigOptions>,
  projectDefaults: EslintConfigOptions['projectDefaults'],
  detectRootDir: string | undefined,
  autoFrameworks: boolean | undefined,
  composeConfig: ConfigComposer
) => Promise.all(
  Object.entries(configuredProjects).map(async ([projectPath, projectOptions]) => {
    const projectRoot = join(detectRootDir ?? process.cwd(), projectPath)
    const inheritedOptions = mergeProjectOptions(projectDefaults ?? {}, projectOptions)

    const scopedConfigs = await composeConfig({
      autoFrameworks,
      ...inheritedOptions,
      projectDefaults: undefined,
      projects: undefined,
      root: inheritedOptions.root ?? inheritedOptions.detectRootDir ?? projectRoot
    })

    return scopedConfigs.map(config => config.name === 'eslint-config/gitignore' ? config : scopeConfigToProject(config, projectPath))
  })
)

const resolveInheritedProjectDefaults = (
  options: EslintConfigOptions | undefined
): EslintConfigOptions['projectDefaults'] => mergeProjectOptions(
  {
    ...(options?.detection === undefined ? {} : { detection: options.detection }),
    ...(options?.tailwind === undefined ? {} : { tailwind: options.tailwind }),
    ...(typeof options?.typescript === 'object' && options.typescript.untypedFiles !== undefined ?
      { typescript: { untypedFiles: options.typescript.untypedFiles } } :
      {})
  },
  options?.projectDefaults ?? {}
)

const getPluginNameFromRule = (
  ruleName: string,
  availablePluginNames: Iterable<string>
): string | undefined => {
  const segments = ruleName.split('/')

  if (segments.length < 2) return undefined

  const registeredPrefix = [...availablePluginNames]
    .filter(pluginName => ruleName.startsWith(`${pluginName}/`))
    .sort((left, right) => right.length - left.length)[0]

  if (registeredPrefix) return registeredPrefix

  return ruleName.startsWith('@') && segments.length > 2 ?
    segments.slice(0, 2).join('/') :
    segments[0]
}

/**
 * Copies already-loaded plugin objects onto rule blocks that reference them.
 * ESLint 10 validates plugin availability per effective config object, while
 * feature packs often keep plugin setup and consumer overrides separate.
 */
export const attachReferencedPlugins = (configs: FlatConfigArray): FlatConfigArray => {
  const availablePlugins = new Map<string, NonNullable<TSESLint.FlatConfig.Config['plugins']>[string]>()
  const ambiguousPluginNames = new Set<string>()

  for (const config of configs) {
    for (const [pluginName, plugin] of Object.entries(config.plugins ?? {})) {
      const existingPlugin = availablePlugins.get(pluginName)

      if (existingPlugin && existingPlugin !== plugin) {
        availablePlugins.delete(pluginName)

        ambiguousPluginNames.add(pluginName)
      } else if (!ambiguousPluginNames.has(pluginName)) {
        availablePlugins.set(pluginName, plugin)
      }
    }
  }

  return configs.map(config => {
    const requiredPlugins = new Set(
      Object.keys(config.rules ?? {})
        .map(ruleName => getPluginNameFromRule(ruleName, availablePlugins.keys()))
        .filter((pluginName): pluginName is string => pluginName !== undefined)
    )

    const missingPluginEntries = [...requiredPlugins].flatMap(pluginName => {
      const plugin = availablePlugins.get(pluginName)

      return !Object.hasOwn(config.plugins ?? {}, pluginName) && plugin ?
        [[pluginName, plugin] as const] :
        []
    })

    if (missingPluginEntries.length === 0) return config

    return {
      ...config,
      plugins: {
        ...config.plugins,
        ...Object.fromEntries(missingPluginEntries)
      }
    }
  })
}

const getConfigsParams = (
  options: EslintConfigOptions | undefined,
  rootDir: string,
  runtime: Runtime,
  uniqueLibraries: Library[],
  uniqueSettings: Setting[],
  resolvedFrameworks: NonNullable<EslintConfigOptions['frameworks']>
) => {
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

  const { defaultIgnores, gitignoreConfig, userIgnores } = buildIgnoresConfig(
    useDefaultIgnores, useGeneratedCodeIgnores, useGitignore, options, rootDir
  )

  return {
    astroOptions: { hasReact, hasSolid, hasSvelte, hasVue },
    defaultIgnores,
    gitignoreConfig,
    runtimeCoreConfig,
    tailwindOptions,
    userIgnores
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
export const defineConfig: ConfigComposer = async function defineConfig(
  options?: EslintConfigOptions,
  ...extraConfigs: ConfigInput[]
): Promise<FlatConfigArray> {
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
  const detected = resolveDetectedOptions(detectRootDir, detection, requestedPreset)
  const { frameworkDefaults, preset, presetDefaults } = resolvePresetMeta(requestedPreset, detected, autoFrameworks)
  const configuredProjects = resolveConfiguredProjects(detected, options)

  const {
    detectedExtensions,
    detectedFormats,
    detectedLibraries,
    detectedTesting,
    detectedTools
  } = resolveBucketDefaults(detected)

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

  const frameworks = mergeFrameworkOption(
    frameworkDefaults, presetDefaults.frameworks, optFrameworks, optionMergeStrategy
  )

  const libraries = mergeOptionalBucket(
    'libraries', detectedLibraries, presetDefaults.libraries, optLibraries, options, optionMergeStrategy
  ) as Library[]

  const nextMode = resolveNextModeValue(options, presetDefaults, detected)
  const runtime = resolveRuntimeValue(options, presetDefaults, detected, requestedPreset !== undefined)
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

  emitAstroDoctorWarning(uniqueExtensions, resolvedFrameworks)

  const params = getConfigsParams(options, rootDir, runtime, uniqueLibraries, uniqueSettings, resolvedFrameworks)

  const configs = await buildEslintConfigs({
    astroOptions: params.astroOptions,
    defaultIgnores: params.defaultIgnores,
    gitignoreConfig: params.gitignoreConfig,
    nextMode,
    resolvedFrameworks,
    resolvedTypescript,
    rootDir,
    runtime,
    runtimeCoreConfig: params.runtimeCoreConfig,
    tailwindOptions: params.tailwindOptions,
    testingFiles: options?.testingFiles,
    tsconfigRootDir,
    uniqueExtensions,
    uniqueFormats,
    uniqueLibraries,
    uniqueTesting,
    uniqueTools,
    userIgnores: params.userIgnores
  })

  logEslintDebug({
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
  })

  const projectConfigs = await resolveProjectConfigs(
    configuredProjects,
    resolveInheritedProjectDefaults(options),
    detectRootDir,
    options?.autoFrameworks,
    defineConfig
  )

  // Merge workspace import group into any existing simple-import-sort/imports rules
  // so framework-specific group ordering (e.g. React-first) is preserved.
  const allConfigs = [
    ...configs,
    ...projectConfigs.flat(),
    ...flattenConfigInputs(extraConfigs)
  ]

  const patchedConfigs = workspacePrefixes?.length ?
    patchImportGroups(allConfigs, workspacePrefixes) :
    allConfigs

  const finalConfig = attachReferencedPlugins(applyStrictMode(patchedConfigs, strict))

  return attachDefineConfigMetadata(finalConfig, { extraConfigs, options })
}
