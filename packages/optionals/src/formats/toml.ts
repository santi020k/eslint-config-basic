import type PluginToml from 'eslint-plugin-toml'

import { defineLazyConfig, loadDefault } from '../lazy.js'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * TOML ESLint configuration
 * Provides rules for TOML file linting
 */
export const toml: TSESLint.FlatConfig.ConfigArray = defineLazyConfig('toml', () => {
  const pluginToml = loadDefault<typeof PluginToml>('eslint-plugin-toml')

  return [
    ...(pluginToml.configs['flat/recommended'] as TSESLint.FlatConfig.ConfigArray).map((config, index) => ({
      ...config,
      name: config.name ?? `optionals/toml/${index}`
    }))
  ]
})
