import { defineLazyConfig, loadDefault } from '../lazy.js'

import type PluginCspell from '@cspell/eslint-plugin'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * CSpell ESLint configuration
 * Enables spell checking in your codebase
 */
export const cspell: TSESLint.FlatConfig.ConfigArray = defineLazyConfig('cspell', () => {
  const pluginCspell = loadDefault<typeof PluginCspell>('@cspell/eslint-plugin')

  return [
    {
      name: 'optionals/cspell',
      plugins: { '@cspell': pluginCspell },
      rules: {
        '@cspell/spellchecker': ['warn', {
          autoFix: false,
          numSuggestions: 3,
          checkComments: true,
          checkIdentifiers: true,
          checkStrings: true,
          checkStringTemplates: true
        }]
      }
    }
  ]
})
