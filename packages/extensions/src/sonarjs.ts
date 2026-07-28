import { GLOB_JS_TS } from '@santi020k/eslint-config-core'

import type { TSESLint } from '@typescript-eslint/utils'

import { defineLazyConfig, loadDefault, type PluginWithConfigs } from './lazy.js'

export const sonarjs: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('sonarjs', async () => {
  const sonarjsPlugin = await loadDefault<PluginWithConfigs<'recommended'>>('eslint-plugin-sonarjs')

  return [
    {
      ...sonarjsPlugin.configs.recommended,
      files: GLOB_JS_TS,
      name: 'eslint-config/sonarjs'
    }
  ]
})
