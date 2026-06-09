import type { TSESLint } from '@typescript-eslint/utils'

export const rules: TSESLint.Linter.RulesRecord = {
  'vue/block-order': ['warn', {
    order: ['script', 'template', 'style']
  }],
  'vue/component-definition-name-casing': ['warn', 'PascalCase'],
  'vue/html-self-closing': ['warn', {
    html: {
      component: 'always',
      normal: 'always',
      void: 'always'
    },
    math: 'always',
    svg: 'always'
  }],
  'vue/multi-word-component-names': 'warn',
  'vue/no-mutating-props': 'warn',
  'vue/no-unused-vars': 'warn',
  'vue/padding-line-between-blocks': 'warn',
  'vue/require-default-prop': 'warn',
  'vue/require-prop-types': 'warn'
}
