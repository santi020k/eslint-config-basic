import pluginSecurity from 'eslint-plugin-security'

import { GLOB_JS_TS } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Security ESLint configuration
 * Provides rules for catching common security vulnerabilities.
 */
export const security: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config-optionals/security',
    files: GLOB_JS_TS,
    plugins: {
      security: pluginSecurity
    },
    rules: {
      ...pluginSecurity.configs.recommended.rules
    }
  }
]
