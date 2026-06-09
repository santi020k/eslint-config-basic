import { groups } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

export const rules: TSESLint.Linter.RulesRecord = {
  'react-hooks/exhaustive-deps': 'warn',
  'react/boolean-prop-naming': 'warn',
  'react/button-has-type': 'warn',
  'react/destructuring-assignment': 'warn',
  'react/display-name': 'warn',
  'react/hook-use-state': 'warn',
  'react/jsx-boolean-value': 'warn',
  'react/jsx-closing-bracket-location': 'warn',
  'react/jsx-closing-tag-location': 'warn',
  'react/jsx-curly-brace-presence': [
    'warn',
    { children: 'never', props: 'never' }
  ],
  'react/jsx-curly-newline': 'warn',
  'react/jsx-fragments': 'warn',
  'react/jsx-handler-names': 'warn',
  'react/jsx-max-depth': ['warn', { max: 7 }],
  'react/jsx-no-leaked-render': 'warn',
  'react/jsx-no-target-blank': 'warn',
  'react/jsx-no-undef': 'warn',
  'react/jsx-pascal-case': 'warn',
  'react/jsx-wrap-multilines': 'warn',
  'react/no-children-prop': 'warn',
  'react/no-danger-with-children': 'warn',
  'react/no-deprecated': 'warn',
  'react/no-multi-comp': 'warn',
  'react/no-unescaped-entities': 'warn',
  'react/no-unknown-property': 'warn',
  'react/no-unstable-nested-components': 'warn',
  'react/prop-types': 'off',
  'react/react-in-jsx-scope': 'off',
  'react/self-closing-comp': ['warn', { component: true, html: true }],
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
