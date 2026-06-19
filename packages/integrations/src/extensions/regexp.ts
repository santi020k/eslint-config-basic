import { GLOB_JS_TS } from '@santi020k/eslint-config-core'

import type { TSESLint } from '@typescript-eslint/utils'
import type PluginRegexp from 'eslint-plugin-regexp'

import { defineLazyConfig, loadModule } from '../lazy.js'

/**
 * RegExp ESLint configuration
 * Catches common regex mistakes like exponential backtracking,
 * unnecessary escapes, and optimizable character classes
 */
export const regexp: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('regexp', async () => {
  const pluginRegexp = await loadModule<typeof PluginRegexp>('eslint-plugin-regexp')

  return [
    {
      files: GLOB_JS_TS,
      name: 'integrations/regexp',
      plugins: {
        regexp: pluginRegexp
      },
      rules: {
        // Use recommended rules as base
        ...pluginRegexp.configs['flat/recommended'].rules,

        'regexp/no-super-linear-backtracking': 'error',
        // Downgrade some rules to warnings for a smoother adoption
        'regexp/no-unused-capturing-group': 'warn',
        'regexp/no-useless-escape': 'warn',
        'regexp/prefer-character-class': 'warn'
      }
    }
  ]
})
