import type { TSESLint } from '@typescript-eslint/utils'
import pluginSvelte from 'eslint-plugin-svelte'

/**
 * Svelte ESLint configuration
 * Extends eslint-plugin-svelte recommended flat config
 */
export const svelteConfig: TSESLint.FlatConfig.ConfigArray = [
  ...(pluginSvelte.configs['flat/recommended']),
  {
    files: ['**/*.svelte'],
    name: 'eslint-config-svelte/rules',
    rules: {
      'svelte/no-at-html-tags': 'warn',
      'svelte/require-each-key': 'warn'
    }
  },
  {
    files: ['**/*.svelte/*.ts', '**/*.svelte/*.tsx'],
    // Disable rules that cause false positives in Svelte virtual script blocks.
    // Type-checked rule disabling is handled by @santi020k/eslint-config-typescript.
    name: 'eslint-config-svelte/virtual-script-rules',
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
      'no-unused-expressions': 'off'
    }
  }
]

export default svelteConfig
