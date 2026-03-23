import pluginSolid from 'eslint-plugin-solid'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * SolidJS ESLint configuration
 * Extends eslint-plugin-solid recommended rules
 */
export const solidConfig: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config-solid/rules',
    ...(pluginSolid.configs['flat/recommended'] as any)
  }
]

export default solidConfig
