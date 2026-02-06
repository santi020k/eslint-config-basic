import pluginCspell from '@cspell/eslint-plugin'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * CSpell ESLint configuration
 * Enables spell checking in your codebase
 */
export const cspell: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'optionals/cspell',
    plugins: { '@cspell': pluginCspell }
  }
]
