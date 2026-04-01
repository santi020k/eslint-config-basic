import pluginSvelte from 'eslint-plugin-svelte'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Svelte ESLint configuration
 * Extends eslint-plugin-svelte recommended flat config
 */
export const svelteConfig: TSESLint.FlatConfig.ConfigArray = [
  ...(pluginSvelte.configs['flat/recommended']),
  {
    name: 'eslint-config-svelte/rules',
    files: ['**/*.svelte'],
    rules: {
      'svelte/no-at-html-tags': 'warn',
      'svelte/require-each-key': 'warn'
    }
  },
  {
    // Disable rules that cause false positives in Svelte virtual script blocks.
    // Type-checked rule disabling is handled by @santi020k/eslint-config-typescript.
    name: 'eslint-config-svelte/virtual-script-rules',
    files: ['**/*.svelte/*.ts', '**/*.svelte/*.tsx'],
    rules: {
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  }
]

export default svelteConfig
