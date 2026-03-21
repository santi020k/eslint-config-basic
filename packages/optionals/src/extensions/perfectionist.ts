import pluginPerfectionist from 'eslint-plugin-perfectionist'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Perfectionist ESLint configuration
 * Provides rules for sorting and organizing code (imports, exports, object keys, etc.)
 */
export const perfectionist: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config-optionals/perfectionist',
    plugins: {
      perfectionist: pluginPerfectionist
    },
    rules: {
      ...pluginPerfectionist.configs['recommended-natural'].rules
    }
  }
]
