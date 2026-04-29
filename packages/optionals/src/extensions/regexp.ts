import type PluginRegexp from 'eslint-plugin-regexp'

import { defineLazyConfig, loadModule } from '../lazy.js'

import { GLOB_JS_TS } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * RegExp ESLint configuration
 * Catches common regex mistakes like exponential backtracking,
 * unnecessary escapes, and optimizable character classes
 */
export const regexp: TSESLint.FlatConfig.ConfigArray = defineLazyConfig('regexp', () => {
  const pluginRegexp = loadModule<typeof PluginRegexp>('eslint-plugin-regexp')

  return [
    {
      name: 'optionals/regexp',
      files: GLOB_JS_TS,
      plugins: {
        regexp: pluginRegexp
      },
      rules: {
        // Use recommended rules as base
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        ...pluginRegexp.configs?.['flat/recommended']?.rules,

        // Downgrade some rules to warnings for a smoother adoption
        'regexp/no-unused-capturing-group': 'warn',
        'regexp/no-useless-escape': 'warn',
        'regexp/prefer-character-class': 'warn',
        'regexp/no-super-linear-backtracking': 'error'
      }
    }
  ]
})
