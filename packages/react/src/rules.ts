import { groups } from '@santi020k/eslint-config-core'

import type { TSESLint } from '@typescript-eslint/utils'

export const rules: TSESLint.Linter.RulesRecord = {
  '@eslint-react/dom-no-missing-button-type': 'warn',
  '@eslint-react/dom-no-unsafe-target-blank': 'warn',
  '@eslint-react/exhaustive-deps': 'warn',
  '@eslint-react/no-array-index-key': 'warn',
  '@eslint-react/no-unstable-default-props': 'warn',
  'simple-import-sort/imports': [
    'warn',
    {
      groups: [
        // Packages `react` related packages come first.
        ['^react'],
        ...groups
      ]
    }
  ]
}
