import pluginUnicorn from 'eslint-plugin-unicorn'

import { GLOB_JS_TS } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Unicorn ESLint configuration
 * Modern JavaScript best practices from eslint-plugin-unicorn
 */
export const unicorn: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config/unicorn',
    files: GLOB_JS_TS,
    plugins: {
      unicorn: pluginUnicorn as unknown as TSESLint.FlatConfig.Plugin
    },
    rules: {
      'unicorn/better-regex': 'warn',
      'unicorn/catch-error-name': 'warn',
      'unicorn/consistent-function-scoping': 'warn',
      'unicorn/no-abusive-eslint-disable': 'warn',
      'unicorn/no-array-for-each': 'warn',
      'unicorn/no-for-loop': 'warn',
      'unicorn/no-lonely-if': 'warn',
      'unicorn/no-useless-spread': 'warn',
      'unicorn/no-useless-undefined': 'warn',
      'unicorn/prefer-array-find': 'warn',
      'unicorn/prefer-array-flat': 'warn',
      'unicorn/prefer-array-flat-map': 'warn',
      'unicorn/prefer-array-some': 'warn',
      'unicorn/prefer-includes': 'warn',
      'unicorn/prefer-number-properties': 'warn',
      'unicorn/prefer-optional-catch-binding': 'warn',
      'unicorn/prefer-spread': 'warn',
      'unicorn/prefer-string-replace-all': 'warn',
      'unicorn/prefer-string-slice': 'warn',
      'unicorn/prefer-string-starts-ends-with': 'warn',
      'unicorn/prefer-string-trim-start-end': 'warn',
      'unicorn/prefer-switch': 'warn',
      'unicorn/prefer-ternary': 'warn',
      'unicorn/throw-new-error': 'warn'
    }
  }
]
