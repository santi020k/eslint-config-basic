import type PluginPerfectionist from 'eslint-plugin-perfectionist'

import { defineLazyConfig, loadDefault } from '../lazy.js'

import { GLOB_JS_TS } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Perfectionist ESLint configuration
 * Provides rules for sorting and organizing code (imports, exports, object keys, etc.)
 */
export const perfectionist: Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('perfectionist', async () => {
  const pluginPerfectionist = await loadDefault<typeof PluginPerfectionist>('eslint-plugin-perfectionist')

  return [
    {
      files: GLOB_JS_TS,
      name: 'eslint-config-integrations/perfectionist',
      plugins: {
        perfectionist: pluginPerfectionist
      },
      rules: {
        ...pluginPerfectionist.configs['recommended-natural'].rules,
        // Disabled: simple-import-sort handles import ordering to avoid circular fix conflicts
        'perfectionist/sort-imports': 'off',
        'perfectionist/sort-named-imports': 'off'
      }
    }
  ]
})
