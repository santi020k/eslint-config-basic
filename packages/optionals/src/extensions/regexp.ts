import * as pluginRegexp from 'eslint-plugin-regexp'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * RegExp ESLint configuration
 * Catches common regex mistakes like exponential backtracking,
 * unnecessary escapes, and optimizable character classes
 */
export const regexp: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'optionals/regexp',
    plugins: {
      regexp: pluginRegexp as TSESLint.FlatConfig.Plugin
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
