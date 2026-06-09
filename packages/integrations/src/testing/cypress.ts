import type PluginCypress from 'eslint-plugin-cypress'

import { defineLazyConfig, loadDefault } from '../lazy.js'

import { fixupPluginRules } from '@eslint/compat'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Cypress ESLint configuration
 * Provides linting rules for Cypress end-to-end test files
 */
export const cypress: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('cypress', async () => {
  const pluginCypress = await loadDefault<typeof PluginCypress>('eslint-plugin-cypress')

  return [
    {
      files: [
        '**/cypress/**/*.{js,ts,jsx,tsx}',
        '**/*.cy.{js,ts,jsx,tsx}'
      ],
      name: 'integrations/cypress',
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
