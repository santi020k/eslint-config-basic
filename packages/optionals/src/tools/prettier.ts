import type ConfigPrettier from 'eslint-config-prettier'

import { defineLazyConfig, loadDefault } from '../lazy.js'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Prettier interop configuration
 * Disables all ESLint rules that conflict with Prettier formatting
 */
export const prettier: TSESLint.FlatConfig.ConfigArray = defineLazyConfig('prettier', () => {
  const eslintConfigPrettier = loadDefault<typeof ConfigPrettier>('eslint-config-prettier')

  return [
    {
      name: 'eslint-config/prettier',
      ...eslintConfigPrettier
    }
  ]
})
