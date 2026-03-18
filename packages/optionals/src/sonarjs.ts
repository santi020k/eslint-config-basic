import sonarjsPlugin from 'eslint-plugin-sonarjs'

import type { TSESLint } from '@typescript-eslint/utils'

export const sonarjs: TSESLint.FlatConfig.ConfigArray = [
  sonarjsPlugin.configs.recommended,
  {
    name: 'eslint-config/sonarjs',
    rules: {}
  }
]
