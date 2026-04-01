import pluginVue from 'eslint-plugin-vue'
import tsEslint from 'typescript-eslint'
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
    name: 'eslint-config-vue/disable-type-checked',
    files: ['**/*.vue/*.ts', '**/*.vue/*.tsx'],
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

// Re-export rules for direct access
export { rules }

export default vueConfig
