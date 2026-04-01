import sonarjsPlugin from 'eslint-plugin-sonarjs'

import { GLOB_JS_TS } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

interface SonarConfigs { configs: { recommended: TSESLint.FlatConfig.Config } }

export const sonarjs: TSESLint.FlatConfig.ConfigArray = [
  {
    ...(sonarjsPlugin as SonarConfigs).configs.recommended,
    files: GLOB_JS_TS
  },
  {
    name: 'eslint-config/sonarjs',
    files: GLOB_JS_TS,
    rules: {}
  }
]
