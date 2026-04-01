import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

import { rules } from './rules.js'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Vue ESLint configuration
 * Extends eslint-plugin-vue recommended config with custom rules
 */
export const vueConfig: TSESLint.FlatConfig.ConfigArray = [
  ...(pluginVue.configs['flat/recommended'] as TSESLint.FlatConfig.ConfigArray),
  {
    name: 'eslint-config-vue/rules',
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules
  },
  {
    // Disable rules that cause false positives in Vue virtual script blocks.
    // Type-checked rule disabling is handled by @santi020k/eslint-config-typescript.
    name: 'eslint-config-vue/virtual-script-rules',
    files: ['**/*.vue/*.ts', '**/*.vue/*.tsx'],
    rules: {
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  }
]

// Re-export rules for direct access
export { rules }

export default vueConfig
