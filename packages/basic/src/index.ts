// Re-export types and utilities from core
export {
  ConfigOption,
  OptionalOption,
  SettingOption,
  ReactConfigs,
  applyConfigIfOptionPresent,
  hasReactConfig,
  coreConfig,
  jsConfig,
  gitignore
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
  vitest
} from '@santi020k/eslint-config-optionals'

// Import for composition
import { astroConfig } from '@santi020k/eslint-config-astro'
import type { EslintConfigOptions, FlatConfigArray } from '@santi020k/eslint-config-core'
import {
  applyConfigIfOptionPresent,
  ConfigOption,
  coreConfig,
  gitignore,
  hasReactConfig,
  OptionalOption,
  SettingOption
} from '@santi020k/eslint-config-core'
import { expoConfig } from '@santi020k/eslint-config-expo'
import { nestConfig } from '@santi020k/eslint-config-nest'
import { nextConfig } from '@santi020k/eslint-config-next'
import {
  cspell,
  i18next,
  markdown,
  mdx,
  prettier,
  regexp,
  stencil,
  tailwind,
  unicorn,
  vitest
} from '@santi020k/eslint-config-optionals'
import { reactConfig } from '@santi020k/eslint-config-react'
import { typescriptConfig } from '@santi020k/eslint-config-typescript'
import { vueConfig } from '@santi020k/eslint-config-vue'

/**
 * Generates the ESLint configuration array, applying configurations
 * and optional settings based on the input configuration.
 *
 * @param {EslintConfigOptions} options - Configuration and optional settings
 * @returns {FlatConfigArray} The final ESLint configuration array
 */
export const eslintConfig = ({
  config = [],
  optionals = [],
  settings = []
}: EslintConfigOptions = {}): FlatConfigArray => {
  // Deduplicate entries to prevent double-applying configs (#4)
  const uniqueConfig = [...new Set(config)]
  const uniqueOptionals = [...new Set(optionals)]
  const uniqueSettings = [...new Set(settings)]
  const hasReact = hasReactConfig(uniqueConfig)
  // Gitignore is enabled by default unless NoGitignore is specified (#8)
  const useGitignore = !uniqueSettings.includes(SettingOption.NoGitignore)

  return [
    // Settings
    ...(useGitignore ? gitignore : []),

    // Core JS config (always included)
    ...coreConfig,

    // React config (included if any React-based framework is used)
    ...(hasReact ? reactConfig : []),

    // Framework-specific configs
    ...applyConfigIfOptionPresent(uniqueConfig, ConfigOption.Ts, typescriptConfig),
    ...applyConfigIfOptionPresent(uniqueConfig, ConfigOption.Next, nextConfig),
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

    // Prettier must be last to override stylistic rules
    ...(uniqueOptionals.includes(OptionalOption.Prettier) ? prettier : [])
  ]
}
