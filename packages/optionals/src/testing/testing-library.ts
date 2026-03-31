import pluginTestingLibrary from 'eslint-plugin-testing-library'

import { fixupPluginRules } from '@eslint/compat'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Testing Library ESLint configuration
 * Provides linting rules for Testing Library usage in tests
 */
export const testingLibrary: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'optionals/testing-library',
    files: [
      '**/*.test.{js,ts,jsx,tsx}',
      '**/*.spec.{js,ts,jsx,tsx}',
      '**/__tests__/**/*.{js,ts,jsx,tsx}'
    ],
    plugins: {
      'testing-library': fixupPluginRules(
        pluginTestingLibrary as unknown as Record<string, unknown>
      )
    },
    rules: {
      // Testing Library recommended rules
      'testing-library/await-async-queries': 'error',
      'testing-library/no-await-sync-queries': 'error',
      'testing-library/no-debugging-utils': 'warn',
      'testing-library/no-dom-import': ['error', 'react'],
      'testing-library/prefer-screen-queries': 'error'
    }
  }
]
