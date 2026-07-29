import { GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'

import type { TSESLint } from '@typescript-eslint/utils'

import { defineLazyConfig, loadDefault, type PluginWithConfigs } from './lazy.js'

/**
 * Browser compatibility extension configuration
 * Checks code against the project browserslist using `eslint-plugin-compat`
 */
export const compat: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('compat', async () => {
  const pluginCompat = await loadDefault<PluginWithConfigs<'flat/recommended'>>('eslint-plugin-compat')

  return [
    {
      ...pluginCompat.configs['flat/recommended'],
      files: GLOB_JS_TS_ALL,
      name: 'integrations/compat/recommended'
    }
  ]
})
