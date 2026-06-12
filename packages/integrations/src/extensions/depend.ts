import { defineLazyConfig, loadDefault, type PluginWithConfigs } from '../lazy.js'

import { GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Depend extension configuration
 * Suggests lighter or native alternatives to heavy dependencies using
 * `eslint-plugin-depend`
 */
export const depend: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('depend', async () => {
  const pluginDepend = await loadDefault<PluginWithConfigs<'flat/recommended'>>('eslint-plugin-depend')

  return [
    {
      ...pluginDepend.configs['flat/recommended'],
      files: GLOB_JS_TS_ALL,
      name: 'integrations/depend/recommended'
    }
  ]
})
