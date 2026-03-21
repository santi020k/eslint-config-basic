import tsEslint from 'typescript-eslint'

import { rules } from './rules.js'

import tsParser from '@typescript-eslint/parser'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * TypeScript ESLint configuration
 * Extends typescript-eslint strict + stylistic type-checked presets with custom rules
 */
export const typescriptConfig: TSESLint.FlatConfig.ConfigArray = [
  ...(tsEslint.configs.strictTypeChecked as TSESLint.FlatConfig.ConfigArray).map(c => ({
    ...c,
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts']
  })),
  ...(tsEslint.configs.stylisticTypeChecked as TSESLint.FlatConfig.ConfigArray).map(c => ({
    ...c,
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts']
  })),
  {
    name: 'eslint-config-typescript/rules',
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true
      },
      ecmaVersion: 'latest'
    },
    rules
  }
]

// Legacy export for backwards compatibility
export { typescriptConfig as tsConfig }

// Re-export rules for direct access
export { rules }

export default typescriptConfig
