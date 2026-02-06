import { getDirname } from 'cross-dirname'

import { FlatCompat } from '@eslint/eslintrc'
import { fixupConfigRules } from '@eslint/compat'
import type { TSESLint } from '@typescript-eslint/utils'

// Initialize FlatCompat with the base directory
const flatCompat = new FlatCompat({
  baseDirectory: getDirname(),
  recommendedConfig: {}
})

/**
 * i18next ESLint configuration
 * Enables i18next plugin for internationalization
 */
export const i18next: TSESLint.FlatConfig.ConfigArray = [
  ...(fixupConfigRules(flatCompat.plugins('i18next')) as unknown as TSESLint.FlatConfig.ConfigArray)
]
