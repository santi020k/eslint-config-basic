import type PluginI18next from 'eslint-plugin-i18next'

import { defineLazyConfig, loadDefault } from '../lazy.js'

import { fixupPluginRules } from '@eslint/compat'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * i18next ESLint configuration
 * Enables i18next plugin for internationalization best practices
 */
export const i18next: TSESLint.FlatConfig.ConfigArray = defineLazyConfig('i18next', () => {
  const pluginI18next = loadDefault<typeof PluginI18next>('eslint-plugin-i18next')

  return [
    {
      name: 'optionals/i18next',
      plugins: {
        i18next: fixupPluginRules(
          pluginI18next
        )
      },
      rules: {
        'i18next/no-literal-string': ['warn', {
          mode: 'jsx-text-only',
          'jsx-attributes': {
            include: ['label', 'placeholder', 'alt', 'title', 'aria-label']
          }
        }]
      }
    }
  ]
})
