import pluginJsxA11y from 'eslint-plugin-jsx-a11y'

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
    // Disable rules that cause false positives in Remix virtual script blocks.
    // Type-checked rule disabling is handled by @santi020k/eslint-config-typescript.
    name: 'eslint-config-remix/virtual-script-rules',
    files: ['**/*.tsx/*.ts', '**/*.ts/*.ts'],
    rules: {
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  }
]

export default remix
