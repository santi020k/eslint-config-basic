import type { TSESLint } from '@typescript-eslint/utils'

import { groups } from '@santi020k/eslint-config-core'

export const rules: TSESLint.Linter.RulesRecord = {
  'simple-import-sort/imports': [
    'warn',
    {
      groups: [
        // Packages `react` related packages come first.
        ['^react'],
        ['^(next)(/.*|$)?'],
        ...groups
      ]
    }
  ]
}
