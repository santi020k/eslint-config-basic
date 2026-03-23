import pluginCypress from 'eslint-plugin-cypress'

import { fixupPluginRules } from '@eslint/compat'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Cypress ESLint configuration
 * Provides linting rules for Cypress end-to-end test files
 */
export const cypress: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'optionals/cypress',
    files: [
      '**/cypress/**/*.{js,ts,jsx,tsx}',
      '**/*.cy.{js,ts,jsx,tsx}'
    ],
    plugins: {
      cypress: fixupPluginRules(pluginCypress as any) as unknown as TSESLint.FlatConfig.Plugin
    },
    rules: {
      ...pluginCypress.configs.recommended.rules
    }
  }
]
