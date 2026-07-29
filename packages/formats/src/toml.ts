import type { TSESLint } from '@typescript-eslint/utils'
import type PluginToml from 'eslint-plugin-toml'

import { defineLazyConfig, loadDefault } from './lazy.js'

/**
 * TOML ESLint configuration
 * Provides rules for TOML file linting
 */
export const toml: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('toml', async () => {
  const pluginToml = await loadDefault<typeof PluginToml>('eslint-plugin-toml')

  return (pluginToml.configs['flat/recommended'] as TSESLint.FlatConfig.ConfigArray).map((config, index) => ({
    ...config,
    name: config.name ?? `integrations/toml/${index}`
  }))
})
