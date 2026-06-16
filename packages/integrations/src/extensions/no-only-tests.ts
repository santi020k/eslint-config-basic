import { GLOB_JS_TS } from '@santi020k/eslint-config-core'

import type { TSESLint } from '@typescript-eslint/utils'

import { defineLazyConfig, type FlatPlugin,loadModule } from '../lazy.js'

/**
 * Prevents `test.only` / `describe.only` from being committed to version
 * control. Uses `eslint-plugin-no-only-tests`.
 */
export const noOnlyTests: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('no-only-tests', async () => {
  const plugin = (await loadModule<{ default: FlatPlugin }>('eslint-plugin-no-only-tests')).default

  return [
    {
      files: GLOB_JS_TS,
      name: 'eslint-config-integrations/no-only-tests',
      plugins: {
        'no-only-tests': plugin
      },
      rules: {
        'no-only-tests/no-only-tests': 'error'
      }
    }
  ]
})
