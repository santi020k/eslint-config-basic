import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { applyStrictMode } from './compose.js'
import { createDetectedFrameworkFlags } from './frameworks.js'
import { getIntegrationConfigs, getPrettierConfig } from './integrations.js'
import { resolveFramework, resolvePreset } from './resolvers.js'

import {
  coreConfig,
  createCoreConfig,
  type DetectionOptions,
  detectProjectOptions,
  type EslintConfigOptions,
  Extension,
  type FlatConfigArray,
  gitignore,
  type ImportedFramework,
  Library,
  NextMode,
  Runtime,
  Setting
} from '@santi020k/eslint-config-core'
import { createTypescriptConfig } from '@santi020k/eslint-config-typescript'
import type { TSESLint } from '@typescript-eslint/utils'

export type { AgentTarget, GenerateSkillOptions, GenerateSkillResult } from './agent-skill-generator.js'
export {
  AGENT_TARGETS,
  generateAgentSkills,
  generateSkillContent
} from './agent-skill-generator.js'
export {
  angularConfig,
  astro,
  expoConfig,
  hono,
  nestConfig,
  nextConfig,
  qwik,
  reactConfig,
  remix,
  slidev,
  solidConfig,
  svelteConfig,
  vite,
  vueConfig
} from './frameworks.js'

// Re-export core types and utilities
export type {
  DetectedFrameworkName,
  DetectionOptions,
  EslintConfigOptions,
  FlatConfigArray,
  ImportedFramework,
  StrictMode
} from '@santi020k/eslint-config-core'
export {
  coreConfig,
  createCoreConfig,
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

// Re-export integrations
export {
  aiSdk,
  bestPractices,
  cspell,
  cypress,
  drizzle,
  graphql,
  i18next,
  jest,
  jsdoc,
  jsonc,
  langchain,
  llamaIndex,
  markdown,
  mastra,
  mcp,
  mdx,
  mikroOrm,
  openAiAgents,
  perfectionist,
  playwright,
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
  typeorm,
  unicorn,
  vitest,
  yaml
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

const TAILWIND_ENTRYPOINT_CANDIDATES = [
  'src/styles/global.css',
  'src/app/globals.css',
  'src/globals.css',
  'src/index.css',
  'app/globals.css',
  'styles/global.css'
]

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
  detection: EslintConfigOptions['detection']
): Required<DetectionOptions> => {
  const defaults = {
    extensions: true,
    formats: true,
    frameworks: true,
    libraries: true,
    nextMode: true,
    runtime: true,
    testing: true,
    tools: true,
    typescript: true
  }

  if (detection === false) {
    return Object.fromEntries(
      Object.keys(defaults).map(key => [key, false])
    ) as Required<DetectionOptions>
  }

  if (detection === true || detection === undefined) {
    return defaults
  }

  return {
    ...defaults,
    ...detection
  }
}

const applyDetectionControls = (
  detected: EslintConfigOptions,
  detection: EslintConfigOptions['detection']
): EslintConfigOptions => {
  const controls = resolveDetectionOptions(detection)

  return {
    ...detected,
    detectedFrameworks: controls.frameworks ? detected.detectedFrameworks : [],
    extensions: controls.extensions ? detected.extensions : [],
    formats: controls.formats ? detected.formats : [],
    libraries: controls.libraries ? detected.libraries : [],
    nextMode: controls.nextMode ? detected.nextMode : undefined,
    preset: controls.typescript && controls.runtime ? detected.preset : undefined,
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
  'tsconfig.base.json'
].some(fileName => existsSync(join(rootDir, fileName)))

const resolveTsconfigRootDir = (
  rootDir: string,
  typescript: EslintConfigOptions['typescript'],
  explicitRootDir: string | undefined
): string | undefined => {
  if (explicitRootDir) return explicitRootDir

  return typescript && hasTsconfig(rootDir) ? rootDir : undefined
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
    return config
  }

  return {
    ...config,
    files: Array.isArray(config.files) ?
      config.files.map((pattern: unknown) => scopeFilePattern(projectPath, pattern)) as TSESLint.FlatConfig.Config['files'] :
      [`${projectPath.replace(/\/$/, '')}/**/*`]
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
  const detectRootDir = options?.detectRootDir ?? options?.tsconfigRootDir

  const detected = applyDetectionControls(
    detectProjectOptions(detectRootDir), options?.detection
  )

  const preset = options?.preset ?? detected.preset
  const presetDefaults = preset ? resolvePreset(preset) : {}
  const optionMergeStrategy = options?.optionMergeStrategy ?? 'merge'
  const autoFrameworks = options?.autoFrameworks ?? true

  const frameworkDefaults = autoFrameworks ?
    createDetectedFrameworkFlags(detected.detectedFrameworks) :
    {}

  // NOTE: these must be computed unconditionally (not via destructuring defaults)
  // so that `optionMergeStrategy: 'merge'` actually unions explicit values with
  // detected/preset values. Destructuring defaults are skipped whenever the
  // option is provided, which silently turned 'merge' into 'replace'.
  const configuredExtensions = mergeArrayOption(
    detected.extensions ?? [], presetDefaults.extensions, options?.extensions, optionMergeStrategy
  )

  const formats = mergeArrayOption(
    detected.formats ?? [], presetDefaults.formats, options?.formats, optionMergeStrategy
  )

  const frameworks = mergeFrameworkOption(
    frameworkDefaults, presetDefaults.frameworks, options?.frameworks, optionMergeStrategy
  )

  const libraries = mergeArrayOption(
    detected.libraries ?? [], presetDefaults.libraries, options?.libraries, optionMergeStrategy
  )

  const nextMode = options?.nextMode ?? presetDefaults.nextMode ?? detected.nextMode ?? NextMode.Pages
  const runtime = options?.runtime ?? presetDefaults.runtime ?? detected.runtime ?? Runtime.Universal
  const settings = options?.settings ?? detected.settings ?? []
  const strict = getStrictMode(options?.strict, presetDefaults.strict)

  const testing = mergeArrayOption(
    detected.testing ?? [], presetDefaults.testing, options?.testing, optionMergeStrategy
  )

  const tools = mergeArrayOption(
    detected.tools ?? [], presetDefaults.tools, options?.tools, optionMergeStrategy
  )

  const typescript = options?.typescript ?? presetDefaults.typescript ?? detected.typescript ?? false
  const rootDir = detectRootDir ?? process.cwd()
  const tsconfigRootDir = resolveTsconfigRootDir(rootDir, typescript, options?.tsconfigRootDir)
  const extensions = applyStrictProfileDefaults(configuredExtensions, strict)
  const resolvedFrameworks = { ...frameworks }

  if ((resolvedFrameworks.next || resolvedFrameworks.expo || resolvedFrameworks.remix) && !resolvedFrameworks.react) {
    resolvedFrameworks.react = true
  }

  if (resolvedFrameworks.slidev && !resolvedFrameworks.vue) {
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
  const tailwindEntryPoint = uniqueLibraries.includes(Library.Tailwind) ? findTailwindEntryPoint(rootDir) : undefined
  // Resolve Frameworks
  const reactParam = resolveFramework('react', resolvedFrameworks.react)
  const nextParam = resolveFramework('next', resolvedFrameworks.next)

  const astroParam = resolveFramework('astro', resolvedFrameworks.astro, {
    hasReact,
    hasSolid,
    hasSvelte,
    hasVue
  })

  const expoParam = resolveFramework('expo', resolvedFrameworks.expo)
  const nestParam = resolveFramework('nest', resolvedFrameworks.nest)
  const honoParam = resolveFramework('hono', resolvedFrameworks.hono, { runtime })
  const vueParam = resolveFramework('vue', resolvedFrameworks.vue)
  const svelteParam = resolveFramework('svelte', resolvedFrameworks.svelte)
  const solidParam = resolveFramework('solid', resolvedFrameworks.solid)
  const angularParam = resolveFramework('angular', resolvedFrameworks.angular)
  const qwikParam = resolveFramework('qwik', resolvedFrameworks.qwik)
  const remixParam = resolveFramework('remix', resolvedFrameworks.remix)
  const slidevParam = resolveFramework('slidev', resolvedFrameworks.slidev, { runtime })
  const viteParam = resolveFramework('vite', resolvedFrameworks.vite, { runtime })

  // Use runtime-aware core config
  const runtimeCoreConfig = runtime !== Runtime.Universal ?
    createCoreConfig(runtime) :
    coreConfig

  const defaultIgnores = useDefaultIgnores ?
    [{
      ignores: DEFAULT_IGNORES,
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
    ...slidevParam,
    ...viteParam,

    ...(typescript ? createTypescriptConfig({ tsconfigRootDir }) : []),

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
      typescript
    })
  }

  const projectConfigs = await Promise.all(
    Object.entries(options?.projects ?? {}).map(async ([projectPath, projectOptions]) => {
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

  return applyStrictMode([...configs, ...projectConfigs.flat()], strict)
}

/**
 * Alias for `eslintConfig()` that reads naturally in `eslint.config.*` files.
 */
export const defineConfig = eslintConfig
