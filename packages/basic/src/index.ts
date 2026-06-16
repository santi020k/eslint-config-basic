import { existsSync } from 'node:fs'
import { join } from 'node:path'

import {
  coreConfig,
  createCoreConfig,
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
  Testing,
  Tool,
  type TypeScriptMode,
  type TypeScriptOptions
} from '@santi020k/eslint-config-core'
import { createTypescriptConfig } from '@santi020k/eslint-config-typescript'

import type { TSESLint } from '@typescript-eslint/utils'

import { applyStrictMode } from './compose.js'
import { createDetectedFrameworkFlags } from './frameworks.js'
import { getIntegrationConfigs, getPrettierConfig } from './integrations.js'
import { resolveFramework, resolvePreset } from './resolvers.js'

export type { AgentTarget, GenerateSkillOptions, GenerateSkillResult } from './agent-skill-generator.js'
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
// eslint-disable-next-line security/detect-object-injection
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
): T[] => applyFeatureDisables(
  mergeArrayOption(
    detectedValues,
    presetValues,
    [
      ...(explicitValues ?? []),
      ...getFeatureEntries(options, bucket, true) as T[]
    ],
    strategy
  ),
  options,
  bucket
)

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

const applyDetectionControls = (
  detected: EslintConfigOptions,
  detection: EslintConfigOptions['detection'],
  defaults?: Partial<Required<DetectionOptions>>
): EslintConfigOptions => {
  const controls = resolveDetectionOptions(detection, defaults)

  return {
    ...detected,
    detectedFrameworks: controls.frameworks ? detected.detectedFrameworks : [],
    extensions: controls.extensions ? detected.extensions : [],
    formats: controls.formats ? detected.formats : [],
    libraries: controls.libraries ? detected.libraries : [],
    nextMode: controls.nextMode ? detected.nextMode : undefined,
    preset: controls.typescript && controls.runtime ? detected.preset : undefined,
    projects: controls.projects ? detected.projects : undefined,
    runtime: controls.runtime ? detected.runtime : undefined,
    testing: controls.testing ? detected.testing : [],
    tools: controls.tools ? detected.tools : [],
    typescript: controls.typescript ? detected.typescript : false
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
].some(fileName => existsSync(join(rootDir, fileName)))

const resolveTypescriptOptions = (
  typescript: EslintConfigOptions['typescript']
): false | (TypeScriptOptions & { mode: Exclude<TypeScriptMode, 'off'> }) => {
  if (!typescript || typescript === 'off') return false

  if (typescript === true) return { mode: 'type-aware' }

  if (typeof typescript === 'string') return { mode: typescript }

  return {
    ...typescript,
    mode: typescript.mode === 'off' || !typescript.mode ? 'type-aware' : typescript.mode
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

const createBoundaryConfig = (): TSESLint.FlatConfig.Config => ({
  files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
  name: 'eslint-config-basic/import-boundaries',
  rules: {
    'import/no-relative-packages': 'warn',
    'import/no-self-import': 'error',
    'no-restricted-imports': ['error', {
      patterns: [
        {
          group: [
            '**/__generated__/**',
            '**/generated/**',
            '**/*.generated',
            '**/*.generated.*',
            '**/*.gen',
            '**/*.gen.*'
          ],
          message: 'Generated modules should stay behind stable source exports.'
        },
        {
          group: [
            '**/*.test',
            '**/*.spec',
            '**/__tests__/**',
            '**/test/**',
            '**/tests/**'
          ],
          message: 'Test modules should not be imported by production source.'
        }
      ]
    }]
  }
})

/**
 * Generates the ESLint configuration array, applying configurations
 * and integration settings based on the input configuration.
 *
 * @param {EslintConfigOptions} options - Configuration and integration settings
 * @returns {FlatConfigArray} The final ESLint configuration array
 */
export const eslintConfig = async (options?: EslintConfigOptions): Promise<FlatConfigArray> => {
  const detectRootDir = options?.detectRootDir ?? options?.tsconfigRootDir
  const requestedPreset = options?.preset
  const shouldDefaultProjectDetection = requestedPreset === Preset.Monorepo

  const detected = applyDetectionControls(
    detectProjectOptions(detectRootDir),
    options?.detection,
    { projects: shouldDefaultProjectDetection }
  )

  const preset = requestedPreset ?? detected.preset
  const presetDefaults = preset ? resolvePreset(preset as Preset) : {}
  const optionMergeStrategy = options?.optionMergeStrategy ?? 'merge'
  const autoFrameworks = options?.autoFrameworks ?? true

  const configuredProjects = {
    ...(detected.projects ?? {}),
    ...(options?.projects ?? {})
  }

  const frameworkDefaults = autoFrameworks ?
    createDetectedFrameworkFlags(detected.detectedFrameworks) :
    {}

  // NOTE: these must be computed unconditionally (not via destructuring defaults)
  // so that `optionMergeStrategy: 'merge'` actually unions explicit values with
  // detected/preset values. Destructuring defaults are skipped whenever the
  // option is provided, which silently turned 'merge' into 'replace'.
  const configuredExtensions = mergeOptionalBucket(
    'extensions',
    detected.extensions ?? [],
    presetDefaults.extensions,
    options?.extensions,
    options,
    optionMergeStrategy
  ) as Extension[]

  const formats = mergeOptionalBucket(
    'formats',
    detected.formats ?? [],
    presetDefaults.formats,
    options?.formats,
    options,
    optionMergeStrategy
  ) as Format[]

  const frameworks = mergeFrameworkOption(
    frameworkDefaults, presetDefaults.frameworks, options?.frameworks, optionMergeStrategy
  )

  const libraries = mergeOptionalBucket(
    'libraries',
    detected.libraries ?? [],
    presetDefaults.libraries,
    options?.libraries,
    options,
    optionMergeStrategy
  ) as Library[]

  const nextMode = options?.nextMode ?? presetDefaults.nextMode ?? detected.nextMode ?? NextMode.Pages
  const runtime = (options?.runtime ?? presetDefaults.runtime ?? detected.runtime ?? Runtime.Universal) as Runtime
  const settings = options?.settings ?? detected.settings ?? []
  const strict = getStrictMode(options?.strict, presetDefaults.strict)

  const testing = mergeOptionalBucket(
    'testing',
    detected.testing ?? [],
    presetDefaults.testing,
    options?.testing,
    options,
    optionMergeStrategy
  ) as Testing[]

  const tools = mergeOptionalBucket(
    'tools',
    detected.tools ?? [],
    presetDefaults.tools,
    options?.tools,
    options,
    optionMergeStrategy
  ) as Tool[]

  const typescript = options?.typescript ?? presetDefaults.typescript ?? detected.typescript ?? false
  const resolvedTypescript = resolveTypescriptOptions(typescript)
  const rootDir = detectRootDir ?? process.cwd()
  const tsconfigRootDir = resolveTsconfigRootDir(rootDir, typescript, options?.tsconfigRootDir)
  const extensions = applyStrictProfileDefaults(configuredExtensions, strict)
  const resolvedFrameworks = { ...frameworks }

  if (
    (
      resolvedFrameworks.next ||
      resolvedFrameworks.expo ||
      (resolvedFrameworks as Record<string, unknown>).remix ||
      resolvedFrameworks['react-router'] ||
      resolvedFrameworks['tanstack-start']
    ) &&
    !resolvedFrameworks.react
  ) {
    resolvedFrameworks.react = true
  }

  if (resolvedFrameworks.slidev && !resolvedFrameworks.vue) {
    resolvedFrameworks.vue = true
  }

  if (resolvedFrameworks.nuxt && !resolvedFrameworks.vue) {
    resolvedFrameworks.vue = true
  }

  // Deduplicate and filter entries
  const uniqueLibraries = [...new Set(libraries)]
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
  const tailwindEntryPoint = uniqueLibraries.includes(Library.Tailwind) ? findTailwindEntryPoint(rootDir) : undefined

  // Resolve Frameworks (lazily — only enabled frameworks import their packages)
  const [
    reactParam,
    nextParam,
    astroParam,
    expoParam,
    nestParam,
    honoParam,
    vueParam,
    svelteParam,
    solidParam,
    angularParam,
    qwikParam,
    remixParam,
    reactRouterParam,
    tanstackStartParam,
    nuxtParam,
    preactParam,
    litParam,
    slidevParam,
    viteParam
  ] = await Promise.all([
    resolveFramework('react', resolvedFrameworks.react),
    resolveFramework('next', resolvedFrameworks.next),
    resolveFramework('astro', resolvedFrameworks.astro, {
      hasReact,
      hasSolid,
      hasSvelte,
      hasVue
    }),
    resolveFramework('expo', resolvedFrameworks.expo),
    resolveFramework('nest', resolvedFrameworks.nest),
    resolveFramework('hono', resolvedFrameworks.hono, { runtime }),
    resolveFramework('vue', resolvedFrameworks.vue),
    resolveFramework('svelte', resolvedFrameworks.svelte),
    resolveFramework('solid', resolvedFrameworks.solid),
    resolveFramework('angular', resolvedFrameworks.angular),
    resolveFramework('qwik', resolvedFrameworks.qwik),
    resolveFramework('remix', (resolvedFrameworks as Record<string, unknown>).remix as ImportedFramework | undefined),
    resolveFramework('react-router', resolvedFrameworks['react-router']),
    resolveFramework('tanstack-start', resolvedFrameworks['tanstack-start']),
    resolveFramework('nuxt', resolvedFrameworks.nuxt),
    resolveFramework('preact', resolvedFrameworks.preact),
    resolveFramework('lit', resolvedFrameworks.lit),
    resolveFramework('slidev', resolvedFrameworks.slidev, { runtime }),
    resolveFramework('vite', resolvedFrameworks.vite, { runtime })
  ])

  // Use runtime-aware core config
  const runtimeCoreConfig = runtime === Runtime.Universal ?
    coreConfig :
    createCoreConfig(runtime)

  const defaultIgnores = useDefaultIgnores ?
    [{
      ignores: [
        ...DEFAULT_IGNORES,
        ...(useGeneratedCodeIgnores ? GENERATED_CODE_IGNORES : [])
      ],
      name: 'eslint-config-basic/default-ignores'
    } as TSESLint.FlatConfig.Config] :
    []

  const userIgnores = options?.ignores?.length ?
    [{
      ignores: options.ignores,
      name: 'eslint-config-basic/ignores'
    } as TSESLint.FlatConfig.Config] :
    []

  const configs: FlatConfigArray = [
    ...defaultIgnores,
    ...userIgnores,

    // Settings
    ...(useGitignore ? gitignore : []),

    // Global TSConfig Root Dir fix
    ...(tsconfigRootDir ?
      [{
        languageOptions: {
          parserOptions: {
            tsconfigRootDir
          }
        },
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

    // Core JS config with runtime-aware globals
    ...runtimeCoreConfig,

    // React config (included if any React-based framework is used/passed)
    ...(hasReact ? reactParam : []),

    ...nextParam,
    ...expoParam,
    ...nestParam,
    ...honoParam,
    ...vueParam,
    ...svelteParam,
    ...solidParam,
    ...angularParam,
    ...qwikParam,
    ...remixParam,
    ...reactRouterParam,
    ...tanstackStartParam,
    ...nuxtParam,
    ...preactParam,
    ...litParam,
    ...slidevParam,
    ...viteParam,

    ...(resolvedTypescript ?
      createTypescriptConfig({
        ...resolvedTypescript,
        tsconfigRootDir: resolvedTypescript.tsconfigRootDir ?? tsconfigRootDir
      }) :
      []),

    // Astro needs to run after generic TypeScript so its parser and false-positive
    // workarounds win for .astro files and embedded expressions.
    ...astroParam,

    // Next.js App Router overrides (#12)
    ...(resolvedFrameworks.next && nextMode === NextMode.AppRouter ?
      [
        {
          files: ['app/**/*.{ts,tsx}', 'src/**/*.{ts,tsx}'],
          name: 'eslint-config-next/app-router-overrides',
          rules: {
            '@next/next/no-html-link-for-pages': 'off'
          }
        } as TSESLint.FlatConfig.Config
      ] :
      []),

    ...(uniqueExtensions.includes(Extension.Boundaries) ? [createBoundaryConfig()] : []),

    // Integrations
    ...(await getIntegrationConfigs(
      uniqueLibraries, uniqueTools, uniqueTesting, uniqueFormats, uniqueExtensions
    )),

    ...(tailwindEntryPoint ?
      [{
        name: 'eslint-config-basic/tailwind-settings',
        settings: {
          'better-tailwindcss': {
            detectComponentClasses: true,
            entryPoint: tailwindEntryPoint
          }
        }
      } as TSESLint.FlatConfig.Config] :
      []),

    // Prettier always last
    ...(await getPrettierConfig(uniqueTools))
  ]

  if (process.env.ESLINT_BASIC_DEBUG) {
    console.info('[ESLint Basic] Resolved options:', {
      autoFrameworks,
      detectRootDir: detectRootDir ?? process.cwd(),
      extensions: uniqueExtensions,
      formats: uniqueFormats,
      frameworks: Object.entries(resolvedFrameworks)
        .filter(([_, value]) => Boolean(value))
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
    })
  }

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
  const workspacePrefixes = options?.workspacePrefixes
  const allConfigs = [...configs, ...projectConfigs.flat()]

  if (workspacePrefixes?.length) {
    const workspacePatterns = workspacePrefixes.map(
      p => `^${p.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&')}(/.*|$)`
    )

    for (let i = 0; i < allConfigs.length; i++) {
      const item = allConfigs[i]

      if (Array.isArray(item)) continue

      const rule = item.rules?.['simple-import-sort/imports']

      // Only patch array-form rules that carry an explicit groups list — skip
      // string-severity rules and option-less arrays to avoid overwriting defaults.
      if (!Array.isArray(rule) || !rule[1]) continue

      const ruleOpts = rule[1] as { groups?: string[][] }
      const existingGroups = ruleOpts.groups ?? []

      if (existingGroups.length === 0) continue

      const externalIdx = existingGroups.findIndex(g => g.some(p => p.includes('^@?\\w')))
      const insertAt = externalIdx >= 0 ? externalIdx : existingGroups.length

      allConfigs[i] = {
        ...item,
        rules: {
          ...item.rules,
          'simple-import-sort/imports': [
            rule[0],
            { ...ruleOpts, groups: [...existingGroups.slice(0, insertAt), workspacePatterns, ...existingGroups.slice(insertAt)] }
          ] as TSESLint.FlatConfig.RuleEntry
        }
      }
    }
  }

  return applyStrictMode(allConfigs, strict)
}

/**
 * Alias for `eslintConfig()` that reads naturally in `eslint.config.*` files.
 */
export const defineConfig = eslintConfig
