import type { TSESLint } from '@typescript-eslint/utils'
import pluginQwik from 'eslint-plugin-qwik'

export const qwik: TSESLint.FlatConfig.ConfigArray = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    name: 'eslint-config-qwik/rules',
    plugins: {
      qwik: pluginQwik
    },
    rules: {
      'qwik/jsx-a': 'warn',
      'qwik/jsx-img': 'warn',
      'qwik/jsx-key': 'warn',
      'qwik/jsx-no-script-url': 'warn',
      'qwik/loader-location': 'warn',
      'qwik/no-async-prevent-default': 'warn',
      'qwik/no-react-props': 'error',
      'qwik/no-use-visible-task': 'warn',
      'qwik/prefer-classlist': 'warn',
      'qwik/unused-server': 'error',
      'qwik/use-method-usage': 'error',
      'qwik/valid-lexical-scope': 'error'
    }
  },
  {
    files: ['**/*.tsx/*.ts', '**/*.ts/*.ts'],
    // Disable rules that cause false positives in Qwik virtual script blocks.
    // Type-checked rule disabling is handled by @santi020k/eslint-config-typescript.
    name: 'eslint-config-qwik/virtual-script-rules',
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
      'no-unused-expressions': 'off'
    }
  }
]

export default qwik
