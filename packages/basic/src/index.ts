import { applyStrictMode } from './compose.js'
import { createDetectedFrameworkFlags } from './frameworks.js'
import { getIntegrationConfigs, getPrettierConfig } from './integrations.js'
import { resolveFramework, resolvePreset } from './resolvers.js'

import {
  coreConfig,
  createCoreConfig,
  type DetectedFrameworkName,
  detectProjectOptions,
  type EslintConfigOptions,
  type FlatConfigArray,
  gitignore,
  type ImportedFramework,
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
  solidConfig,
  svelteConfig,
  vueConfig
} from './frameworks.js'

// Re-export core types and utilities
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

export type { DetectedFrameworkName, EslintConfigOptions, FlatConfigArray, ImportedFramework }

// Re-export framework configs
export { tsConfig, typescriptConfig } from '@santi020k/eslint-config-typescript'

// Re-export integrations
export {
  bestPractices,
  cspell,
  cypress,
  graphql,
  i18next,
  jest,
  jsdoc,
  jsonc,
  markdown,
  mdx,
  perfectionist,
  playwright,
  prettier,
  regexp,
  security,
  sonarjs,
  stencil,
  storybook,
  swagger,
  tailwind,
  tanstackQuery,
  tanstackRouter,
  testingLibrary,
  toml,
  unicorn,
  vitest,
  yaml
} from '@santi020k/eslint-config-integrations'

const toUniqueArray = <T>(values: T[]): T[] => [...new Set(values)]

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

/**
 * Generates the ESLint configuration array, applying configurations
 * and integration settings based on the input configuration.
 *
 * @param {EslintConfigOptions} options - Configuration and integration settings
 * @returns {FlatConfigArray} The final ESLint configuration array
 */
export const eslintConfig = (options?: EslintConfigOptions): FlatConfigArray => {
  const detectRootDir = options?.detectRootDir
  const detected = detectProjectOptions(detectRootDir)
  const preset = options?.preset ?? detected.preset
  const presetDefaults = preset ? resolvePreset(preset) : {}
  const optionMergeStrategy = options?.optionMergeStrategy ?? 'merge'
  const autoFrameworks = options?.autoFrameworks ?? true

  const frameworkDefaults = autoFrameworks ?
    createDetectedFrameworkFlags(detected.detectedFrameworks) :
    {}

  const {
    typescript = (options?.typescript ?? presetDefaults.typescript ?? detected.typescript ?? false),
    libraries = mergeArrayOption(
      detected.libraries ?? [],
      presetDefaults.libraries,
      options?.libraries,
      optionMergeStrategy
    ),
    testing = mergeArrayOption(
      detected.testing ?? [],
      presetDefaults.testing,
      options?.testing,
      optionMergeStrategy
    ),
    formats = mergeArrayOption(
      detected.formats ?? [],
      presetDefaults.formats,
      options?.formats,
      optionMergeStrategy
    ),
    tools = mergeArrayOption(
      detected.tools ?? [],
      presetDefaults.tools,
      options?.tools,
      optionMergeStrategy
    ),
    extensions = mergeArrayOption(
      detected.extensions ?? [],
      presetDefaults.extensions,
      options?.extensions,
      optionMergeStrategy
    ),
    settings = options?.settings ?? detected.settings ?? [],
    strict = options?.strict ?? false,
    runtime = (options?.runtime ?? presetDefaults.runtime ?? detected.runtime ?? Runtime.Universal),
    tsconfigRootDir = options?.tsconfigRootDir,
    nextMode = (options?.nextMode ?? presetDefaults.nextMode ?? detected.nextMode ?? NextMode.Pages),
    frameworks = mergeFrameworkOption(
      frameworkDefaults,
      presetDefaults.frameworks as Record<string, ImportedFramework> | undefined,
      options?.frameworks as Record<string, ImportedFramework> | undefined,
      optionMergeStrategy
    )
  } = options ?? {}

  const resolvedFrameworks = frameworks ?? {}

  if ((resolvedFrameworks.next || resolvedFrameworks.expo || resolvedFrameworks.remix) && !resolvedFrameworks.react) {
    resolvedFrameworks.react = true
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
  // Resolve Frameworks
  const reactParam = resolveFramework('react', resolvedFrameworks.react)
  const nextParam = resolveFramework('next', resolvedFrameworks.next)

  const astroParam = resolveFramework('astro', resolvedFrameworks.astro, {
    hasReact,
    hasVue,
    hasSvelte,
    hasSolid
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

  // Use runtime-aware core config
  const runtimeCoreConfig = runtime !== Runtime.Universal ?
    createCoreConfig(runtime) :
    coreConfig

  const configs: FlatConfigArray = [
    // Settings
    ...(useGitignore ? gitignore : []),

    // Global TSConfig Root Dir fix
    ...(tsconfigRootDir ?
      [{
        name: 'eslint-config-basic/tsconfig-root-dir',
        languageOptions: {
          parserOptions: {
            tsconfigRootDir
          }
        }
      }] :
      []),

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

    ...(typescript ? createTypescriptConfig({ tsconfigRootDir }) : []),

    // Astro needs to run after generic TypeScript so its parser and false-positive
    // workarounds win for .astro files and embedded expressions.
    ...astroParam,

    // Next.js App Router overrides (#12)
    ...(resolvedFrameworks.next && nextMode === NextMode.AppRouter ?
      [
        {
          name: 'eslint-config-next/app-router-overrides',
          files: ['app/**/*.{ts,tsx}', 'src/**/*.{ts,tsx}'],
          rules: {
            '@next/next/no-html-link-for-pages': 'off'
          }
        } as TSESLint.FlatConfig.Config
      ] :
      []),

    // Integrations
    ...getIntegrationConfigs(
      uniqueLibraries, uniqueTools, uniqueTesting, uniqueFormats, uniqueExtensions
    ),

    // Prettier always last
    ...getPrettierConfig(uniqueTools)
  ]

  if (process.env.ESLINT_BASIC_DEBUG) {
    console.info('[ESLint Basic] Resolved options:', {
      detectRootDir: detectRootDir ?? process.cwd(),
      tsconfigRootDir,
      preset,
      optionMergeStrategy,
      autoFrameworks,
      runtime,
      nextMode,
      typescript,
      frameworks: Object.keys(resolvedFrameworks).filter(
        key => Boolean((resolvedFrameworks as Record<string, unknown>)[key])
      ),
      libraries: uniqueLibraries,
      testing: uniqueTesting,
      formats: uniqueFormats,
      tools: uniqueTools,
      extensions: uniqueExtensions
    })
  }

  return applyStrictMode(configs, strict)
}
