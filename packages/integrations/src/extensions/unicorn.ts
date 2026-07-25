import { GLOB_JS_TS } from '@santi020k/eslint-config-core'

import type { TSESLint } from '@typescript-eslint/utils'
import type PluginUnicorn from 'eslint-plugin-unicorn'

import { defineLazyConfig, loadDefault } from '../lazy.js'

/**
 * Unicorn ESLint configuration
 * Modern JavaScript best practices from eslint-plugin-unicorn
 */
export const unicorn: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('unicorn', async () => {
  const pluginUnicorn = await loadDefault<typeof PluginUnicorn>('eslint-plugin-unicorn')

  return [
    {
      files: GLOB_JS_TS,
      name: 'eslint-config/unicorn',
      plugins: {
        unicorn: pluginUnicorn
      },
      rules: {
        'unicorn/catch-error-name': 'warn',
        'unicorn/consistent-destructuring': 'warn',
        'unicorn/consistent-function-scoping': 'warn',
        'unicorn/no-abusive-eslint-disable': 'warn',
        'unicorn/no-for-loop': 'warn',
        'unicorn/no-lonely-if': 'warn',
        'unicorn/no-negated-condition': 'warn',
        'unicorn/no-typeof-undefined': 'warn',
        'unicorn/no-useless-spread': 'warn',
        'unicorn/no-useless-undefined': 'warn',
        'unicorn/prefer-array-find': 'warn',
        'unicorn/prefer-array-flat': 'warn',
        'unicorn/prefer-array-flat-map': 'warn',
        'unicorn/prefer-array-some': 'warn',
        'unicorn/prefer-includes': 'warn',
        'unicorn/prefer-logical-operator-over-ternary': 'warn',
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
})
