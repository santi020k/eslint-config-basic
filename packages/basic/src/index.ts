import type { TSESLint } from '@typescript-eslint/utils'

// Re-export types and utilities from core
export {
  ConfigOption,
  OptionalOption,
  SettingOption,
  RuntimeOption,
  PresetOption,
  NextMode,
  ReactConfigs,
  applyConfigIfOptionPresent,
  hasReactConfig,
  coreConfig,
  createCoreConfig,
  getGlobalsForRuntime,
  jsConfig,
  gitignore,
  detectProjectOptions
} from '@santi020k/eslint-config-core'

export type {
  EslintConfigOptions,
  FlatConfigArray
} from '@santi020k/eslint-config-core'

// Re-export framework configs
export { typescriptConfig, tsConfig } from '@santi020k/eslint-config-typescript'

export { reactConfig } from '@santi020k/eslint-config-react'

export { nextConfig } from '@santi020k/eslint-config-next'

export { astroConfig } from '@santi020k/eslint-config-astro'

export { expoConfig } from '@santi020k/eslint-config-expo'

export { nestConfig } from '@santi020k/eslint-config-nest'

export { vueConfig } from '@santi020k/eslint-config-vue'

// Re-export optionals
export {
  cspell,
  i18next,
  markdown,
  mdx,
  prettier,
  regexp,
  stencil,
  tailwind,
  unicorn,
  vitest,
  playwright,
  sonarjs,
  security,
  tanstackQuery,
  tanstackRouter,
  perfectionist,
  jsdoc,
  swagger,
  storybook,
  jsonc,
  yaml,
  toml
} from '@santi020k/eslint-config-optionals'

// Import for composition
import { astroConfig } from '@santi020k/eslint-config-astro'
import type {
  EslintConfigOptions,
  FlatConfigArray
} from '@santi020k/eslint-config-core'
import {
  applyConfigIfOptionPresent,
  ConfigOption,
  coreConfig,
  createCoreConfig,
  detectProjectOptions,
  gitignore,
  hasReactConfig,
  NextMode,
  OptionalOption,
  PresetOption,
  RuntimeOption,
  SettingOption
} from '@santi020k/eslint-config-core'
import { expoConfig } from '@santi020k/eslint-config-expo'
import { nestConfig } from '@santi020k/eslint-config-nest'
import { nextConfig } from '@santi020k/eslint-config-next'
import {
  cspell,
  i18next,
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
  toml,
  unicorn,
  vitest,
  yaml
} from '@santi020k/eslint-config-optionals'
import { reactConfig } from '@santi020k/eslint-config-react'
import { typescriptConfig } from '@santi020k/eslint-config-typescript'
import { vueConfig } from '@santi020k/eslint-config-vue'

/**
 * Safely loads a framework config at runtime.
 * Returns empty array if the framework's peer deps aren't installed.
 */
const loadFrameworkConfig = async (
  packageName: string
): Promise<TSESLint.FlatConfig.ConfigArray> => {
  try {
    const mod = await import(packageName) as Record<string, TSESLint.FlatConfig.ConfigArray>

    // Return the first exported config array
    const key = Object.keys(mod).find(
      k => k !== 'default' && Array.isArray(mod[k])
    )

    return key ? mod[key] : []
  } catch {
    return []
  }
}

/**
 * Resolves a preset into config and optional arrays
 */
const resolvePreset = (preset: PresetOption): Partial<EslintConfigOptions> => {
  switch (preset) {
    case PresetOption.Basic:
      return { runtime: RuntimeOption.Universal }

    case PresetOption.Node:
      return {
        config: [ConfigOption.Ts],
        runtime: RuntimeOption.Node
      }

    case PresetOption.Browser:
      return {
        config: [ConfigOption.Ts, ConfigOption.React],
        runtime: RuntimeOption.Browser
      }

    case PresetOption.All:
      return {
        config: Object.values(ConfigOption),
        optionals: Object.values(OptionalOption),
        runtime: RuntimeOption.Universal
      }

    default:
      return {}
  }
}

/**
 * Generates the ESLint configuration array, applying configurations
 * and optional settings based on the input configuration.
 *
 * @param {EslintConfigOptions} options - Configuration and optional settings
 * @returns {FlatConfigArray} The final ESLint configuration array
 */
export const eslintConfig = (options?: EslintConfigOptions): FlatConfigArray => {
  const detected: Partial<EslintConfigOptions> = options === undefined ? detectProjectOptions() : {}
  const presetDefaults = options?.preset ? resolvePreset(options.preset) : {}

  const {
    config = (presetDefaults.config ?? detected.config ?? []),
    optionals = (presetDefaults.optionals ?? detected.optionals ?? []),
    settings = (detected.settings ?? []),
    strict = options?.strict ?? false,
    runtime = (presetDefaults.runtime ?? detected.runtime ?? RuntimeOption.Universal),
    nextMode = (presetDefaults.nextMode ?? detected.nextMode ?? NextMode.Pages)
  } = options ?? {}

  // Deduplicate entries to prevent double-applying configs (#4)
  const uniqueConfig = [...new Set(config)]
  const uniqueOptionals = [...new Set(optionals)]
  const uniqueSettings = [...new Set(settings)]
  const hasReact = hasReactConfig(uniqueConfig)
  // Gitignore is enabled by default unless NoGitignore is specified (#8)
  const useGitignore = !uniqueSettings.includes(SettingOption.NoGitignore)

  // Use runtime-aware core config
  const runtimeCoreConfig = runtime !== RuntimeOption.Universal ?
    createCoreConfig(runtime) :
    coreConfig

  return [
    // Settings
    ...(useGitignore ? gitignore : []),

    // Core JS config with runtime-aware globals
    ...runtimeCoreConfig,

    // React config (included if any React-based framework is used)
    ...(hasReact ? reactConfig : []),

    // Framework-specific configs
    ...applyConfigIfOptionPresent(uniqueConfig, ConfigOption.Ts, typescriptConfig),
    ...applyConfigIfOptionPresent(uniqueConfig, ConfigOption.Next, nextConfig),

    // Next.js App Router overrides (#12)
    ...(uniqueConfig.includes(ConfigOption.Next) && nextMode === NextMode.AppRouter ?
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

    ...applyConfigIfOptionPresent(uniqueConfig, ConfigOption.Astro, astroConfig),
    ...applyConfigIfOptionPresent(uniqueConfig, ConfigOption.Expo, expoConfig),
    ...applyConfigIfOptionPresent(uniqueConfig, ConfigOption.Nest, nestConfig),
    ...applyConfigIfOptionPresent(uniqueConfig, ConfigOption.Vue, vueConfig),

    // Optionals
    ...(uniqueOptionals.includes(OptionalOption.Cspell) ? cspell : []),
    ...(uniqueOptionals.includes(OptionalOption.Tailwind) ? tailwind : []),
    ...(uniqueOptionals.includes(OptionalOption.Vitest) ? vitest : []),
    ...(uniqueOptionals.includes(OptionalOption.I18next) ? i18next : []),
    ...(uniqueOptionals.includes(OptionalOption.Stencil) ? stencil : []),
    ...(uniqueOptionals.includes(OptionalOption.Regexp) ? regexp : []),
    ...(uniqueOptionals.includes(OptionalOption.Mdx) ? mdx : []),
    ...(uniqueOptionals.includes(OptionalOption.Markdown) ? markdown : []),
    ...(uniqueOptionals.includes(OptionalOption.Unicorn) ? unicorn : []),
    ...(uniqueOptionals.includes(OptionalOption.Sonarjs) ? sonarjs : []),
    ...(uniqueOptionals.includes(OptionalOption.Playwright) ? playwright : []),
    ...(uniqueOptionals.includes(OptionalOption.Security) ? security : []),
    ...(uniqueOptionals.includes(OptionalOption.TanstackQuery) ? tanstackQuery : []),
    ...(uniqueOptionals.includes(OptionalOption.TanstackRouter) ? tanstackRouter : []),
    ...(uniqueOptionals.includes(OptionalOption.Perfectionist) ? perfectionist : []),
    ...(uniqueOptionals.includes(OptionalOption.Jsdoc) ? jsdoc : []),
    ...(uniqueOptionals.includes(OptionalOption.Swagger) ? swagger : []),
    ...(uniqueOptionals.includes(OptionalOption.Storybook) ? storybook : []),
    ...(uniqueOptionals.includes(OptionalOption.Jsonc) ? jsonc : []),
    ...(uniqueOptionals.includes(OptionalOption.Yaml) ? yaml : []),
    ...(uniqueOptionals.includes(OptionalOption.Toml) ? toml : []),

    ...(uniqueOptionals.includes(OptionalOption.Prettier) ? prettier : []),

    // Global overrides for non-TS files to prevent typed rules errors (#15)
    {
      name: 'eslint-config-basic/typed-rules-overrides',
      files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs', '**/*.md', '**/*.mdx'],
      rules: {
        '@typescript-eslint/await-thenable': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/require-await': 'off'
      }
    } as TSESLint.FlatConfig.Config
  ].map((config: TSESLint.FlatConfig.Config) => {
    if (strict && config.rules) {
      const strictRules: TSESLint.FlatConfig.Rules = Object.fromEntries(
        Object.entries(config.rules).map(([key, value]) => {
          if (value === 'warn') return [key, 'error']

          return [key, value]
        })
      )

      return { ...config, rules: strictRules }
    }

    return config
  }) as FlatConfigArray
}

// Lazy-loaded framework configs for frameworks with heavy peer dependencies
// These are exported as async getters to avoid breaking when peer deps aren't installed
export { loadFrameworkConfig }
