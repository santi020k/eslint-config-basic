import pluginQwik from 'eslint-plugin-qwik'

import type { TSESLint } from '@typescript-eslint/utils'

export const qwik: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config-qwik/rules',
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      qwik: pluginQwik
    },
    rules: {
      'qwik/use-method-usage': 'error',
      'qwik/valid-lexical-scope': 'error',
      'qwik/no-react-props': 'error',
      'qwik/prefer-classlist': 'warn',
      'qwik/loader-location': 'warn',
      'qwik/jsx-no-script-url': 'warn',
      'qwik/jsx-key': 'warn',
      'qwik/unused-server': 'error',
      'qwik/jsx-img': 'warn',
      'qwik/jsx-a': 'warn',
      'qwik/no-use-visible-task': 'warn',
      'qwik/no-async-prevent-default': 'warn'
    }
  },
  {
    // Disable rules that cause false positives in Qwik virtual script blocks.
    // Type-checked rule disabling is handled by @santi020k/eslint-config-typescript.
    name: 'eslint-config-qwik/virtual-script-rules',
    files: ['**/*.tsx/*.ts', '**/*.ts/*.ts'],
    rules: {
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  }
]

export default qwik
