import pluginPlaywright from 'eslint-plugin-playwright'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Playwright ESLint configuration
 * Provides linting rules for Playwright end-to-end test files
 */
export const playwright: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'optionals/playwright',
    files: [
      '**/e2e/**/*.{js,ts,jsx,tsx}',
      '**/*.e2e.{js,ts,jsx,tsx}',
      '**/tests/e2e/**/*.{js,ts,jsx,tsx}',
      '**/playwright/**/*.{js,ts,jsx,tsx}'
    ],
    ...pluginPlaywright.configs['flat/recommended']
  }
]
