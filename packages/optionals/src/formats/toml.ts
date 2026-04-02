import pluginToml from 'eslint-plugin-toml'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * TOML ESLint configuration
 * Provides rules for TOML file linting
 */
export const toml: TSESLint.FlatConfig.ConfigArray = [
  ...(pluginToml.configs['flat/recommended'] as TSESLint.FlatConfig.ConfigArray).map((config, index) => ({
    ...config,
    name: config.name ?? `optionals/toml/${index}`
  }))
]
