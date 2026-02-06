import { getDirname } from 'cross-dirname'

import { FlatCompat } from '@eslint/eslintrc'
import { fixupConfigRules } from '@eslint/compat'
import type { TSESLint } from '@typescript-eslint/utils'

import { groups } from '@santi020k/eslint-config-core'

// Initialize FlatCompat with the base directory
const flatCompat = new FlatCompat({
  baseDirectory: getDirname(),
  recommendedConfig: {}
})

const rules: TSESLint.Linter.RulesRecord = {
  'simple-import-sort/imports': [
    'warn',
    {
      groups: [
        // Packages `react` related packages come first.
        ['^react'],
        ['^(expo)(/.*|$)?'],
        ...groups
      ]
    }
  ]
}

/**
 * Expo ESLint configuration
 * Extends the expo config with custom import sorting
 */
export const expoConfig: TSESLint.FlatConfig.ConfigArray = [
  ...(fixupConfigRules(flatCompat.extends('expo')) as unknown as TSESLint.FlatConfig.ConfigArray),
  {
    name: 'eslint-config-expo/custom',
    rules
  }
]
