import pluginI18next from 'eslint-plugin-i18next'

import { fixupPluginRules } from '@eslint/compat'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * i18next ESLint configuration
 * Enables i18next plugin for internationalization best practices
 */
export const i18next: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'optionals/i18next',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    plugins: { i18next: fixupPluginRules(pluginI18next as any) as unknown as TSESLint.FlatConfig.Plugin },
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
