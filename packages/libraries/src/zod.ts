import { GLOB_JS_TS } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

import { defineLazyConfig, loadDefault, type PluginWithConfigs } from './lazy.js'

/**
 * Zod ESLint configuration
 * Provides validation rules for Zod schemas
 */
export const zod: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('zod', async () => {
  const pluginZod = await loadDefault<PluginWithConfigs<'recommended'>>('eslint-plugin-zod')

  return [
    {
      files: GLOB_JS_TS,
      name: 'eslint-config-integrations/zod',
      plugins: {
        zod: pluginZod
      },
      rules: {
        ...pluginZod.configs.recommended.rules,
        // Zod 5 split these established defaults into strict and stylistic presets.
        'zod/array-style': 'error',
        'zod/prefer-enum-over-literal-union': 'error',
        'zod/prefer-loose-object': 'error',
        'zod/prefer-meta': 'error',
        'zod/prefer-meta-last': 'error',
        'zod/prefer-nullish': 'error',
        'zod/prefer-strict-object': 'error',
        'zod/prefer-string-schema-with-trim': 'error',
        'zod/prefer-trim-before-string-length-checks': 'error'
      }
    }
  ]
})
