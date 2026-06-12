import pluginJsxA11y from 'eslint-plugin-jsx-a11y'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * React Router v7 (framework mode) ESLint configuration
 * Successor to the Remix config — Remix merged into React Router v7.
 */
export const reactRouter: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config-react-router/jsx-a11y',
    plugins: {
      'jsx-a11y': pluginJsxA11y
    },
    rules: {
      ...pluginJsxA11y.flatConfigs.recommended.rules
    }
  },
  {
    files: ['**/*.tsx/*.ts', '**/*.ts/*.ts'],
    // Disable rules that cause false positives in virtual script blocks.
    // Type-checked rule disabling is handled by @santi020k/eslint-config-typescript.
    name: 'eslint-config-react-router/virtual-script-rules',
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
      'no-unused-expressions': 'off'
    }
  }
]

export default reactRouter
