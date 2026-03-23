import pluginJsdoc from 'eslint-plugin-jsdoc'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * JSDoc ESLint configuration
 * Provides rules for TSDoc/JSDoc validation and formatting.
 */
export const jsdoc: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config-optionals/jsdoc',
    plugins: {
      jsdoc: pluginJsdoc
    },
    rules: {
      ...pluginJsdoc.configs['flat/recommended-error'].rules
    }
  }
]
