import type PluginCspell from '@cspell/eslint-plugin'
import { GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

import { defineLazyConfig, loadDefault } from './lazy.js'

/**
 * CSpell ESLint configuration
 * Enables spell checking in your codebase
 */
export const cspell: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('cspell', async () => {
  const pluginCspell = await loadDefault<typeof PluginCspell>('@cspell/eslint-plugin')

  return [
    {
      files: GLOB_JS_TS_ALL,
      name: 'integrations/cspell',
      plugins: { '@cspell': pluginCspell },
      rules: {
        '@cspell/spellchecker': ['warn', {
          autoFix: false,
          checkComments: true,
          checkIdentifiers: true,
          checkStrings: true,
          checkStringTemplates: true,
          numSuggestions: 3
        }]
      }
    }
  ]
})
