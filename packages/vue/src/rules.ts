import type { TSESLint } from '@typescript-eslint/utils'

export const rules: TSESLint.Linter.RulesRecord = {
  'vue/multi-word-component-names': 'warn',
  'vue/no-unused-vars': 'warn',
  'vue/no-mutating-props': 'warn',
  'vue/require-default-prop': 'warn',
  'vue/require-prop-types': 'warn',
  'vue/component-definition-name-casing': ['warn', 'PascalCase'],
  'vue/html-self-closing': ['warn', {
    html: {
      void: 'always',
      normal: 'always',
      component: 'always'
    },
    svg: 'always',
    math: 'always'
  }],
  'vue/padding-line-between-blocks': 'warn',
  'vue/block-order': ['warn', {
    order: ['script', 'template', 'style']
  }]
}
