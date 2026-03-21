import pluginSecurity from 'eslint-plugin-security'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Security ESLint configuration
 * Provides rules for catching common security vulnerabilities.
 */
export const security: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config-optionals/security',
    plugins: {
      security: pluginSecurity
    },
    rules: {
      ...pluginSecurity.configs.recommended.rules
    }
  }
]
