import pluginPerfectionist from 'eslint-plugin-perfectionist'

import { GLOB_JS_TS } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Perfectionist ESLint configuration
 * Provides rules for sorting and organizing code (imports, exports, object keys, etc.)
 */
export const perfectionist: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config-optionals/perfectionist',
    files: GLOB_JS_TS,
    plugins: {
      perfectionist: pluginPerfectionist
    },
    rules: {
      ...pluginPerfectionist.configs['recommended-natural'].rules
    }
  }
]
