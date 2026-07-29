import type { TSESLint } from '@typescript-eslint/utils'
import type ConfigPrettier from 'eslint-config-prettier'

import { defineLazyConfig, loadDefault } from './lazy.js'

/**
 * Prettier interop configuration
 * Disables all ESLint rules that conflict with Prettier formatting
 */
export const prettier: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('prettier', async () => {
  const eslintConfigPrettier = await loadDefault<typeof ConfigPrettier>('eslint-config-prettier')

  return [
    {
      name: 'eslint-config/prettier',
      ...eslintConfigPrettier
    }
  ]
})
