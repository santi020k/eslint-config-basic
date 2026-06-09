import type Globals from 'globals'

import { defineLazyConfig, loadDefault, type PluginWithConfigs } from '../lazy.js'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Vitest ESLint configuration
 * Provides linting rules for Vitest test files with best practices
 */
export const vitest: Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('vitest', async () => {
  const globals = await loadDefault<typeof Globals>('globals')
  const pluginVitest = await loadDefault<PluginWithConfigs<'recommended'>>('@vitest/eslint-plugin')

  return [
    {
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
      name: 'integrations/vitest',
      plugins: {
        vitest: pluginVitest
      },
      rules: {
        // Vitest recommended rules
        ...pluginVitest.configs.recommended.rules,

        '@stylistic/padding-line-between-statements': 'off',
        // Disable some rules that conflict with test patterns
        '@typescript-eslint/no-explicit-any': 'off',
        'vitest/expect-expect': [
          'error',
          {
            assertFunctionNames: ['expect', 'assert', 'should']
          }
        ],
        // Best practice rules for testing
        'vitest/max-nested-describe': ['error', { max: 3 }],
        'vitest/no-disabled-tests': 'warn',
        'vitest/no-focused-tests': 'error',
        'vitest/no-identical-title': 'error',
        'vitest/prefer-to-be': 'warn',

        'vitest/prefer-to-have-length': 'warn',
        'vitest/valid-expect': 'error'
      }
    }
  ]
})
