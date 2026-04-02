import type { TSESLint } from '@typescript-eslint/utils'

export const standardRules: TSESLint.Linter.RulesRecord = {
  // Disable rules that conflict with TypeScript
  semi: 'off',
  'no-unused-vars': 'off',
  'no-undef': 'off',
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

export const typeCheckedRules: TSESLint.Linter.RulesRecord = {
  // Type-aware correctness rules (high-value, require parserOptions.project)
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/no-misused-promises': ['error', {
    checksVoidReturn: { attributes: false }
  }],
  '@typescript-eslint/await-thenable': 'error',
  '@typescript-eslint/require-await': 'warn',
  '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
  '@typescript-eslint/no-unsafe-assignment': 'warn',
  '@typescript-eslint/no-unsafe-member-access': 'warn',
  '@typescript-eslint/no-unsafe-call': 'warn',
  '@typescript-eslint/no-unsafe-return': 'warn',
  '@typescript-eslint/no-unsafe-argument': 'warn',
  '@typescript-eslint/restrict-template-expressions': ['warn', {
    allowNumber: true,
    allowBoolean: true,
    allowNullish: false
  }],
  '@typescript-eslint/unbound-method': ['warn', {
    ignoreStatic: true
  }],
  '@typescript-eslint/consistent-type-imports': ['warn', {
    prefer: 'type-imports',
    fixStyle: 'inline-type-imports'
  }]
}

export const rules: TSESLint.Linter.RulesRecord = {
  ...standardRules,
  ...typeCheckedRules
}
