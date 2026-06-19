import { fixupPluginRules } from '@eslint/compat'
import type { TSESLint } from '@typescript-eslint/utils'
import type PluginTestingLibrary from 'eslint-plugin-testing-library'

import { defineLazyConfig, loadDefault } from '../lazy.js'

/**
 * Testing Library ESLint configuration
 * Provides linting rules for Testing Library usage in tests
 */
export const testingLibrary: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('testing-library', async () => {
  const pluginTestingLibrary = await loadDefault<typeof PluginTestingLibrary>('eslint-plugin-testing-library')

  return [
    {
      files: [
        '**/*.test.{js,ts,jsx,tsx}',
        '**/*.spec.{js,ts,jsx,tsx}',
        '**/__tests__/**/*.{js,ts,jsx,tsx}'
      ],
      name: 'integrations/testing-library',
      plugins: {
        'testing-library': fixupPluginRules(
          pluginTestingLibrary
        )
      },
      rules: {
        // Testing Library recommended rules
        'testing-library/await-async-queries': 'error',
        'testing-library/no-await-sync-queries': 'error',
        'testing-library/no-debugging-utils': 'warn',
        'testing-library/no-dom-import': 'error',
        'testing-library/no-unnecessary-act': 'warn',
        'testing-library/prefer-find-by': 'warn',
        'testing-library/prefer-screen-queries': 'error'
      }
    }
  ]
})
