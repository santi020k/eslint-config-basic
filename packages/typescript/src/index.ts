import tsEslint from 'typescript-eslint'

import { rules } from './rules.js'

import tsParser from '@typescript-eslint/parser'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * TypeScript ESLint configuration
 * Extends typescript-eslint stylistic config with custom rules
 */
export const typescriptConfig: TSESLint.FlatConfig.ConfigArray = [
  ...tsEslint.configs.stylistic as TSESLint.FlatConfig.ConfigArray,
  {
    name: 'eslint-config-typescript/rules',
    files: ['**/*.{ts,tsx,mts,cts}'],
    rules,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true
      },
      ecmaVersion: 'latest'
    }
  }
]

// Legacy export for backwards compatibility
export { typescriptConfig as tsConfig }

// Re-export rules for direct access
export { rules }
