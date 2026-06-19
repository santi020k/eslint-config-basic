import { GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'

import { fixupPluginRules } from '@eslint/compat'
import type { TSESLint } from '@typescript-eslint/utils'
import type PluginI18next from 'eslint-plugin-i18next'

import { defineLazyConfig, loadDefault } from '../lazy.js'

/**
 * i18next ESLint configuration
 * Enables i18next plugin for internationalization best practices
 */
export const i18next: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('i18next', async () => {
  const pluginI18next = await loadDefault<typeof PluginI18next>('eslint-plugin-i18next')

  return [
    {
      files: GLOB_JS_TS_ALL,
      name: 'integrations/i18next',
      plugins: {
        i18next: fixupPluginRules(
          pluginI18next
        )
      },
      rules: {
        'i18next/no-literal-string': ['warn', {
          'jsx-attributes': {
            include: ['label', 'placeholder', 'alt', 'title', 'aria-label']
          },
          mode: 'jsx-text-only'
        }]
      }
    }
  ]
})
