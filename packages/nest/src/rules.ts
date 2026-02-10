import { groups } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

export const rules: TSESLint.Linter.RulesRecord = {
  'simple-import-sort/imports': [
    'warn',
    {
      groups: [
        // NestJS packages come first.
        ['^@nestjs'],
        ...groups
      ]
    }
  ]
}
