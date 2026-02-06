import testingLibrary from 'eslint-plugin-testing-library'
import pluginVitest from 'eslint-plugin-vitest'
import globals from 'globals'

import { fixupPluginRules } from '@eslint/compat'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Vitest ESLint configuration
 * Provides linting rules for Vitest test files with best practices
 */
export const vitest: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'optionals/vitest',
    files: [
      'tests/**/*.{js,ts,jsx,tsx}',
      '**/__tests__/**/*.{js,ts,jsx,tsx}',
      '**/__mocks__/**/*.{js,ts,jsx,tsx}',
      '**/test/**/*.{js,ts,jsx,tsx}',
      '**/spec/**/*.{js,ts,jsx,tsx}',
      '**/__spec__/**/*.{js,ts,jsx,tsx}',
      '**/*.test.{js,ts,jsx,tsx}',
      '**/*.spec.{js,ts,jsx,tsx}',
      'vitest.config.{js,ts}'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    plugins: {
      vitest: pluginVitest,
      'testing-library': fixupPluginRules({
        rules: testingLibrary.rules
      } as unknown as Parameters<typeof fixupPluginRules>[0]) as unknown as TSESLint.FlatConfig.Plugin
    },
    rules: {
      // Vitest recommended rules
      ...pluginVitest.configs.recommended.rules,

      // Best practice rules for testing
      'vitest/max-nested-describe': ['error', { max: 3 }],
      'vitest/expect-expect': [
        'error',
        {
          assertFunctionNames: ['expect', 'assert', 'should']
        }
      ],
      'vitest/no-identical-title': 'error',
      'vitest/no-focused-tests': 'error',
      'vitest/no-disabled-tests': 'warn',
      'vitest/prefer-to-be': 'warn',
      'vitest/prefer-to-have-length': 'warn',
      'vitest/valid-expect': 'error',

      // Disable some rules that conflict with test patterns
      '@typescript-eslint/no-explicit-any': 'off',
      '@stylistic/padding-line-between-statements': 'off'
    }
  }
]
