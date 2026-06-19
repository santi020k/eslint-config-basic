import type { TSESLint } from '@typescript-eslint/utils'

export const standardRules: TSESLint.Linter.RulesRecord = {
  '@typescript-eslint/ban-ts-comment': 'warn',
  '@typescript-eslint/indent': 'off',
  '@typescript-eslint/no-duplicate-enum-values': 'warn',
  '@typescript-eslint/no-dynamic-delete': 'warn',

  '@typescript-eslint/no-empty-function': 'warn',
  '@typescript-eslint/no-empty-object-type': 'warn',
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-invalid-void-type': 'warn',
  '@typescript-eslint/no-non-null-assertion': 'warn',
  '@typescript-eslint/no-unsafe-function-type': 'warn',
  // TypeScript-specific rules
  '@typescript-eslint/no-unused-vars': [
    'warn',
    {
      args: 'after-used',
      argsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
      ignoreRestSiblings: true,
      vars: 'all',
      varsIgnorePattern: '^_'
    }
  ],
  '@typescript-eslint/no-useless-constructor': 'warn',
  '@typescript-eslint/no-var-requires': 'warn',
  '@typescript-eslint/no-wrapper-object-types': 'warn',
  '@typescript-eslint/prefer-for-of': 'warn',
  'no-undef': 'off',
  'no-unused-vars': 'off',
  // Disable rules that conflict with TypeScript
  semi: 'off'
}

export const typeCheckedRules: TSESLint.Linter.RulesRecord = {
  '@typescript-eslint/await-thenable': 'error',
  '@typescript-eslint/consistent-type-exports': ['warn', {
    fixMixedExportsWithInlineTypeSpecifier: true
  }],
  '@typescript-eslint/consistent-type-imports': ['warn', {
    fixStyle: 'inline-type-imports',
    prefer: 'type-imports'
  }],
  // Type-aware correctness rules (high-value, require parserOptions.project)
  '@typescript-eslint/no-deprecated': 'warn',
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/no-misused-promises': ['error', {
    checksVoidReturn: { attributes: false }
  }],
  '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
  '@typescript-eslint/no-unsafe-argument': 'warn',
  '@typescript-eslint/no-unsafe-assignment': 'warn',
  '@typescript-eslint/no-unsafe-call': 'warn',
  '@typescript-eslint/no-unsafe-member-access': 'warn',
  '@typescript-eslint/no-unsafe-return': 'warn',
  '@typescript-eslint/prefer-nullish-coalescing': ['warn', {
    ignorePrimitives: { string: true }
  }],
  '@typescript-eslint/prefer-optional-chain': 'warn',
  '@typescript-eslint/require-await': 'warn',
  '@typescript-eslint/restrict-template-expressions': ['warn', {
    allowBoolean: true,
    allowNullish: false,
    allowNumber: true
  }],
  '@typescript-eslint/unbound-method': ['warn', {
    ignoreStatic: true
  }]
}

export const rules: TSESLint.Linter.RulesRecord = {
  ...standardRules,
  ...typeCheckedRules
}
