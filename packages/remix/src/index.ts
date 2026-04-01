import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import tsEslint from 'typescript-eslint'

import type { TSESLint } from '@typescript-eslint/utils'

export const remix: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config-remix/jsx-a11y',
    plugins: {
      'jsx-a11y': pluginJsxA11y
    },
    rules: {
      ...pluginJsxA11y.flatConfigs.recommended.rules
    }
  },
  {
    name: 'eslint-config-remix/disable-type-checked',
    files: ['**/*.tsx/*.ts', '**/*.ts/*.ts'],
    languageOptions: {
      parserOptions: {
        project: null,
        program: null,
        projectService: false,
        allowDefaultProject: true
      }
    },
    rules: {
      ...tsEslint.configs.disableTypeChecked.rules,
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  }
]

export default remix
