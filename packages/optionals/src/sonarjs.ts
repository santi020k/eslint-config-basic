import sonarjsPlugin from 'eslint-plugin-sonarjs'

import type { TSESLint } from '@typescript-eslint/utils'

interface SonarConfigs { configs: { recommended: TSESLint.FlatConfig.Config } }

export const sonarjs: TSESLint.FlatConfig.ConfigArray = [
  (sonarjsPlugin as SonarConfigs).configs.recommended,
  {
    name: 'eslint-config/sonarjs',
    rules: {}
  }
]
