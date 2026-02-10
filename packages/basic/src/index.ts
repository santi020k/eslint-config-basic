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

// Re-export optionals
export {
  cspell,
  i18next,
  markdown,
  mdx,
  stencil,
  tailwind,
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
  stencil,
  tailwind,
  vitest
} from '@santi020k/eslint-config-optionals'
import { reactConfig } from '@santi020k/eslint-config-react'
import { typescriptConfig } from '@santi020k/eslint-config-typescript'

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
  const hasReact = hasReactConfig(config)

  return [
    // Settings
    ...(settings.includes(SettingOption.Gitignore) ? gitignore : []),

    // Core JS config (always included)
    ...coreConfig,

    // React config (included if any React-based framework is used)
    ...(hasReact ? reactConfig : []),

    // Framework-specific configs
    ...applyConfigIfOptionPresent(config, ConfigOption.Ts, typescriptConfig),
    ...applyConfigIfOptionPresent(config, ConfigOption.Next, nextConfig),
    ...applyConfigIfOptionPresent(config, ConfigOption.Astro, astroConfig),
    ...applyConfigIfOptionPresent(config, ConfigOption.Expo, expoConfig),
    ...applyConfigIfOptionPresent(config, ConfigOption.Nest, nestConfig),

    // Optionals
    ...(optionals.includes(OptionalOption.Cspell) ? cspell : []),
    ...(optionals.includes(OptionalOption.Tailwind) ? tailwind : []),
    ...(optionals.includes(OptionalOption.Vitest) ? vitest : []),
    ...(optionals.includes(OptionalOption.I18next) ? i18next : []),
    ...(optionals.includes(OptionalOption.Stencil) ? stencil : []),
    ...(optionals.includes(OptionalOption.Mdx) ? mdx : []),
    ...(optionals.includes(OptionalOption.Markdown) ? markdown : [])
  ]
}
