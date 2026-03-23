import eslintConfigPrettier from 'eslint-config-prettier'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Prettier interop configuration
 * Disables all ESLint rules that conflict with Prettier formatting
 */
export const prettier: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config/prettier',
    ...eslintConfigPrettier
  }
]
