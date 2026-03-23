import pluginJest from 'eslint-plugin-jest'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Jest ESLint configuration
 * Provides linting rules for Jest test files
 */
export const jest: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'optionals/jest',
    files: [
      '**/*.test.{js,ts,jsx,tsx}',
      '**/*.spec.{js,ts,jsx,tsx}',
      '**/__tests__/**/*.{js,ts,jsx,tsx}'
    ],
    plugins: {
      jest: pluginJest
    },
    rules: {
      ...pluginJest.configs['flat/recommended'].rules
    }
  }
]
