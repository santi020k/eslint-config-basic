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
  }
]
