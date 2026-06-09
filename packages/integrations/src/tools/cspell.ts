import { defineLazyConfig, loadDefault } from '../lazy.js'

import type PluginCspell from '@cspell/eslint-plugin'
import { GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * CSpell ESLint configuration
 * Enables spell checking in your codebase
 */
export const cspell: TSESLint.FlatConfig.ConfigArray = defineLazyConfig('cspell', () => {
  const pluginCspell = loadDefault<typeof PluginCspell>('@cspell/eslint-plugin')

  return [
    {
      name: 'integrations/cspell',
      files: GLOB_JS_TS_ALL,
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
