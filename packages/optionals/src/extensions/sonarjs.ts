import { defineLazyConfig, loadDefault, type PluginWithConfigs } from '../lazy.js'

import { GLOB_JS_TS } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

export const sonarjs: TSESLint.FlatConfig.ConfigArray = defineLazyConfig('sonarjs', () => {
  const sonarjsPlugin = loadDefault<PluginWithConfigs<'recommended'>>('eslint-plugin-sonarjs')

  return [
    {
      ...sonarjsPlugin.configs.recommended,
      files: GLOB_JS_TS
    },
    {
      name: 'eslint-config/sonarjs',
      files: GLOB_JS_TS,
      rules: {}
    }
  ]
})
