import type PluginCypress from 'eslint-plugin-cypress'

import { defineLazyConfig, loadDefault } from '../lazy.js'

import { fixupPluginRules } from '@eslint/compat'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Cypress ESLint configuration
 * Provides linting rules for Cypress end-to-end test files
 */
export const cypress: TSESLint.FlatConfig.ConfigArray = defineLazyConfig('cypress', () => {
  const pluginCypress = loadDefault<typeof PluginCypress>('eslint-plugin-cypress')

  return [
    {
      name: 'optionals/cypress',
      files: [
        '**/cypress/**/*.{js,ts,jsx,tsx}',
        '**/*.cy.{js,ts,jsx,tsx}'
      ],
      plugins: {
        cypress: fixupPluginRules(
          pluginCypress
        )
      },
      rules: {
        ...pluginCypress.configs.recommended.rules
      }
    }
  ]
})
