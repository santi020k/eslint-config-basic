import { GLOB_JS_TS } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

import { defineLazyConfig, loadDefault, type PluginWithConfigs } from '../lazy.js'

/**
 * Security ESLint configuration
 * Provides rules for catching common security vulnerabilities.
 */
export const security: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('security', async () => {
  const pluginSecurity = await loadDefault<PluginWithConfigs<'recommended'>>('eslint-plugin-security')

  return [
    {
      files: GLOB_JS_TS,
      name: 'eslint-config-integrations/security',
      plugins: {
        security: pluginSecurity
      },
      rules: {
        ...pluginSecurity.configs.recommended.rules
      }
    }
  ]
})
