import pluginSvelte from 'eslint-plugin-svelte'
import tsEslint from 'typescript-eslint'

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
    name: 'eslint-config-svelte/disable-type-checked',
    files: ['**/*.svelte/*.ts', '**/*.svelte/*.tsx'],
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

export default svelteConfig
