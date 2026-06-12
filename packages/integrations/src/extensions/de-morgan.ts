import { defineLazyConfig, loadDefault, type PluginWithConfigs } from '../lazy.js'

import { GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * De Morgan extension configuration
 * Simplifies negated logical expressions using `eslint-plugin-de-morgan`
 */
export const deMorgan: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('de-morgan', async () => {
  const pluginDeMorgan = await loadDefault<PluginWithConfigs<'recommended'>>('eslint-plugin-de-morgan')

  return [
    {
      ...pluginDeMorgan.configs.recommended,
      files: GLOB_JS_TS_ALL,
      name: 'integrations/de-morgan/recommended'
    }
  ]
})
