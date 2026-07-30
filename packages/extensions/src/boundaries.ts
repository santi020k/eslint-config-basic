import { GLOB_JS_TS } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Import-boundary ESLint configuration
 *
 * Prevents importing generated modules or test modules from production source.
 * Relies on import/no-relative-packages and import/no-self-import from
 * eslint-plugin-import-x, which the base config already loads.
 */
export const boundaries: TSESLint.FlatConfig.ConfigArray = [
  {
    files: GLOB_JS_TS,
    name: 'eslint-config-integrations/import-boundaries',
    rules: {
      'import/no-relative-packages': 'warn',
      'import/no-self-import': 'error',
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: [
              '**/__generated__/**',
              '**/generated/**',
              '**/*.generated',
              '**/*.generated.*',
              '**/*.gen',
              '**/*.gen.*'
            ],
            message: 'Generated modules should stay behind stable source exports.'
          },
          {
            group: [
              '**/*.test',
              '**/*.spec',
              '**/__tests__/**',
              '**/test/**',
              '**/tests/**'
            ],
            message: 'Test modules should not be imported by production source.'
          }
        ]
      }]
    }
  }
]
