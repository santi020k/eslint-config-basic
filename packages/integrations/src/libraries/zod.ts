import { defineLazyConfig, loadDefault, type PluginWithConfigs } from '../lazy.js'

import { GLOB_JS_TS } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

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
        ...pluginZod.configs.recommended.rules
      }
    }
  ]
})
