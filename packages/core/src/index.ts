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
import {
  RuntimeOption
} from './types.js'

import eslint from '@eslint/js'
import pluginStylistic from '@stylistic/eslint-plugin'
import type { TSESLint } from '@typescript-eslint/utils'

// Re-export types and utilities
export * from './types.js'

export * from './utils/index.js'

/**
 * Returns the appropriate globals for the given runtime option
 */
export const getGlobalsForRuntime = (runtime: RuntimeOption = RuntimeOption.Universal): TSESLint.FlatConfig.LanguageOptions['globals'] => {
  switch (runtime) {
    case RuntimeOption.Node:
      return { ...globals.node }

    case RuntimeOption.Browser:
      return { ...globals.browser }

    case RuntimeOption.Universal:

    default:
      return {
        ...globals.browser,
        ...globals.node
      }
  }
}

/**
 * Creates the core config with the specified runtime globals
 */
export const createCoreConfig = (runtime: RuntimeOption = RuntimeOption.Universal): TSESLint.FlatConfig.ConfigArray => {
  const languageOptions: TSESLint.FlatConfig.LanguageOptions = {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: getGlobalsForRuntime(runtime)
  }

  return [
    {
      name: '@eslint/js/recommended',
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
      name: 'eslint-config/custom-rules',
      languageOptions,
      rules
    }
  ]
}

/**
 * Core JavaScript ESLint configuration (Universal runtime by default)
 * This is included by default in all configurations
 */
export const coreConfig: TSESLint.FlatConfig.ConfigArray = createCoreConfig()

// Legacy export for backwards compatibility
export { coreConfig as jsConfig }

// Export rules and groups for use by other packages
export { rules, groups } from './rules.js'

// Export settings
export { gitignore } from './settings/index.js'
