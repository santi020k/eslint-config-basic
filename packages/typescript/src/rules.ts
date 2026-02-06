import { rules as coreRules } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

export const rules: TSESLint.Linter.RulesRecord = {
  // Include core JS rules for TS files
  ...coreRules,
  // Disable conflicting rules
  semi: 'off',
  'no-unused-vars': 'off',
  '@typescript-eslint/indent': 'off',
  // TypeScript-specific rules
  '@typescript-eslint/no-unused-vars': [
    'warn',
    {
      vars: 'all',
      varsIgnorePattern: '^_',
      args: 'after-used',
      argsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
      ignoreRestSiblings: true
    }
  ],
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-empty-function': 'warn',
  '@typescript-eslint/no-empty-object-type': 'warn',
  '@typescript-eslint/no-unsafe-function-type': 'warn',
  '@typescript-eslint/no-wrapper-object-types': 'warn',
  '@typescript-eslint/no-var-requires': 'warn',
  '@typescript-eslint/ban-ts-comment': 'warn',
  '@typescript-eslint/no-non-null-assertion': 'warn',
  '@typescript-eslint/no-invalid-void-type': 'warn',
  '@typescript-eslint/no-dynamic-delete': 'warn',
  '@typescript-eslint/no-useless-constructor': 'warn',
  '@typescript-eslint/prefer-for-of': 'warn',
  '@typescript-eslint/no-duplicate-enum-values': 'warn'
}
