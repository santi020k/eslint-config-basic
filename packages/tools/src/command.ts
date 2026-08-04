import { GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'
import type PluginCommand from 'eslint-plugin-command/config'

import { defineLazyConfig, loadDefault } from './lazy.js'

/**
 * Command ESLint configuration
 * Provides in-editor micro-fixes via magic comments (e.g., /// \@keep)
 */
export const command: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('command', async () => {
  const pluginCommandConfig = await loadDefault<typeof PluginCommand>('eslint-plugin-command/config')

  return [
    {
      files: GLOB_JS_TS_ALL,
      name: 'eslint-config-integrations/command',
      ...pluginCommandConfig()
    }
  ]
})
