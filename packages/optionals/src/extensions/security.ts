import { defineLazyConfig, loadDefault, type PluginWithConfigs } from '../lazy.js'

import { GLOB_JS_TS } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Security ESLint configuration
 * Provides rules for catching common security vulnerabilities.
 */
export const security: TSESLint.FlatConfig.ConfigArray = defineLazyConfig('security', () => {
  const pluginSecurity = loadDefault<PluginWithConfigs<'recommended'>>('eslint-plugin-security')

  return [
    {
      name: 'eslint-config-optionals/security',
      files: GLOB_JS_TS,
      plugins: {
        security: pluginSecurity
      },
      rules: {
        ...pluginSecurity.configs.recommended.rules
      }
    }
  ]
})
