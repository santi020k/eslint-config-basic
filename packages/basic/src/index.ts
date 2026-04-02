import { applyStrictMode } from './compose.js'
import { getOptionalConfigs, getPrettierConfig } from './optionals.js'
import { resolveFramework, resolvePreset } from './resolvers.js'

import {
  coreConfig,
  createCoreConfig,
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

export type { EslintConfigOptions, FlatConfigArray, ImportedFramework }

// Re-export framework configs
export { tsConfig, typescriptConfig } from '@santi020k/eslint-config-typescript'

// Re-export optionals
export {
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
} from '@santi020k/eslint-config-optionals'

/**
 * Generates the ESLint configuration array, applying configurations
 * and optional settings based on the input configuration.
 *
 * @param {EslintConfigOptions} options - Configuration and optional settings
 * @returns {FlatConfigArray} The final ESLint configuration array
 */
export const eslintConfig = (options?: EslintConfigOptions): FlatConfigArray => {
  const detected = detectProjectOptions()
  const preset = options?.preset ?? detected.preset
  const presetDefaults = preset ? resolvePreset(preset) : {}

  const {
    typescript = (presetDefaults.typescript ?? detected.typescript ?? false),
    libraries = (presetDefaults.libraries ?? detected.libraries ?? []),
    testing = (presetDefaults.testing ?? detected.testing ?? []),
    formats = (presetDefaults.formats ?? detected.formats ?? []),
    tools = (presetDefaults.tools ?? detected.tools ?? []),
    extensions = (presetDefaults.extensions ?? detected.extensions ?? []),
    settings = options?.settings ?? detected.settings ?? [],
    strict = options?.strict ?? false,
    runtime = (presetDefaults.runtime ?? detected.runtime ?? Runtime.Universal),
    tsconfigRootDir = options?.tsconfigRootDir,
    nextMode = (presetDefaults.nextMode ?? detected.nextMode ?? NextMode.Pages),
    frameworks = { ...presetDefaults.frameworks, ...options?.frameworks }
  } = options ?? {}

  // Deduplicate and filter entries
  const uniqueLibraries = [...new Set(libraries)]
  const uniqueTesting = [...new Set(testing)]
  const uniqueFormats = [...new Set(formats)]
  const uniqueTools = [...new Set(tools)]
  const uniqueExtensions = [...new Set(extensions)]
  const uniqueSettings = [...new Set(settings)]

  if ((frameworks.next || frameworks.expo) && !frameworks.react) {
    throw new TypeError(
      'Next and Expo configurations require frameworks.react. Import @santi020k/eslint-config-react and pass it via frameworks.react.'
    )
  }

  const hasReact = !!frameworks.react
  const hasVue = !!frameworks.vue
  const hasSvelte = !!frameworks.svelte
  const hasSolid = !!frameworks.solid
  const useGitignore = !uniqueSettings.includes(Setting.NoGitignore)
  // Resolve Frameworks
  const reactParam = resolveFramework('react', frameworks.react)
  const nextParam = resolveFramework('next', frameworks.next)

  const astroParam = resolveFramework('astro', frameworks.astro, {
    hasReact,
    hasVue,
    hasSvelte,
    hasSolid
  })

  const expoParam = resolveFramework('expo', frameworks.expo)
  const nestParam = resolveFramework('nest', frameworks.nest)
  const vueParam = resolveFramework('vue', frameworks.vue)
  const svelteParam = resolveFramework('svelte', frameworks.svelte)
  const solidParam = resolveFramework('solid', frameworks.solid)
  const angularParam = resolveFramework('angular', frameworks.angular)
  const qwikParam = resolveFramework('qwik', frameworks.qwik)
  const remixParam = resolveFramework('remix', frameworks.remix)

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
    ...astroParam,
    ...expoParam,
    ...nestParam,
    ...vueParam,
    ...svelteParam,
    ...solidParam,
    ...angularParam,
    ...qwikParam,
    ...remixParam,

    ...(typescript ? createTypescriptConfig({ tsconfigRootDir }) : []),

    // Next.js App Router overrides (#12)
    ...(frameworks.next && nextMode === NextMode.AppRouter ?
      [
        {
          name: 'eslint-config-next/app-router-overrides',
          files: ['app/**/*.{ts,tsx}'],
          rules: {
            '@next/next/no-html-link-for-pages': 'off'
          }
        } as TSESLint.FlatConfig.Config
      ] :
      []),

    // Optionals
    ...getOptionalConfigs(
      uniqueLibraries, uniqueTools, uniqueTesting, uniqueFormats, uniqueExtensions
    ),

    // Prettier always last
    ...getPrettierConfig(uniqueTools)
  ]

  return applyStrictMode(configs, strict)
}
