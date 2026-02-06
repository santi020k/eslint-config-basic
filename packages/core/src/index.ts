// @ts-check
import configStandard from 'eslint-config-standard'
import pluginImport from 'eslint-plugin-import'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginN from 'eslint-plugin-n'
import pluginPromise from 'eslint-plugin-promise'
import pluginSimpleImport from 'eslint-plugin-simple-import-sort'
import pluginUnusedImport from 'eslint-plugin-unused-imports'
import globals from 'globals'

import { rules } from './rules.js'

import eslint from '@eslint/js'
import pluginStylistic from '@stylistic/eslint-plugin'
import type { TSESLint } from '@typescript-eslint/utils'

// Re-export types and utilities
export * from './types.js'

export * from './utils/index.js'

const languageOptions: TSESLint.FlatConfig.LanguageOptions = {
  ecmaVersion: 'latest',
  sourceType: 'module',
  globals: {
    ...globals.browser,
    ...globals.node
  }
}

/**
 * Core JavaScript ESLint configuration
 * This is included by default in all configurations
 */
export const coreConfig: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config/recommended',
    ...eslint.configs.recommended
  },
  {
    name: 'eslint-config/plugins',
    plugins: {
      n: pluginN,
      promise: pluginPromise,
      import: { rules: pluginImport.rules },
      'simple-import-sort': pluginSimpleImport,
      'jsx-a11y': pluginJsxA11y,
      'unused-imports': pluginUnusedImport
    },
    languageOptions,
    rules: {
      ...configStandard.rules,
      'import/first': 'off'
    }
  },
  {
    name: 'eslint-config/stylistic',
    ...pluginStylistic.configs.recommended
  },
  {
    name: 'eslint-config/custom-js',
    languageOptions,
    files: ['**/*.{js,jsx,mjs,cjs}'],
    rules
  }
]

// Legacy export for backwards compatibility
export { coreConfig as jsConfig }

// Export rules and groups for use by other packages
export { rules, groups } from './rules.js'
